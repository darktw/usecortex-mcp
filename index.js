#!/usr/bin/env node

/**
 * UseCortex MCP Server — stdio proxy
 *
 * Proxies MCP JSON-RPC requests from stdin/stdout to the
 * remote HTTP endpoint at https://api.usecortex.net/mcp
 *
 * Environment variables:
 *   API_KEY — your UseCortex API key (ctx_sk_...)
 */

const API_URL = "https://api.usecortex.net/mcp";

const readline = require("readline");
const https = require("https");
const http = require("http");

const apiKey = process.env.API_KEY || "";

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on("line", async (line) => {
  let parsed;
  try {
    parsed = JSON.parse(line.trim());
  } catch {
    return;
  }

  try {
    const result = await rpc(parsed);
    if (result !== null) {
      process.stdout.write(JSON.stringify(result) + "\n");
    }
  } catch (err) {
    if (parsed.id !== undefined) {
      process.stdout.write(JSON.stringify({
        jsonrpc: "2.0",
        id: parsed.id,
        error: { code: -32000, message: err.message }
      }) + "\n");
    }
  }
});

async function rpc(body) {
  // notifications don't expect a response
  if (body.method && body.method.startsWith("notifications/")) {
    await post(body);
    return null;
  }

  return await post(body);
}

function post(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const url = new URL(API_URL);
    const mod = url.protocol === "https:" ? https : http;

    const req = mod.request({
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        ...(apiKey ? { "Authorization": "Bearer " + apiKey } : {})
      }
    }, (res) => {
      let chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode === 204) return resolve(null);
        try {
          resolve(JSON.parse(text));
        } catch {
          reject(new Error("Invalid response: " + text.slice(0, 200)));
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}
