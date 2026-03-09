<p align="center">
  <img src="logo.png" alt="UseCortex" width="300" />
</p>

<h1 align="center">UseCortex MCP Server</h1>

<p align="center">
  <strong>Give your AI coding agent a persistent memory — read and write knowledge from any tool.</strong>
</p>

<p align="center">
  <a href="https://usecortex.net">Website</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#available-tools">Tools</a> &middot;
  <a href="#pricing">Pricing</a>
</p>

---

UseCortex MCP is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI coding agents persistent memory. Your agent can read knowledge you've stored and write new discoveries back — all through a single encrypted endpoint.

No context window limits. No copy-pasting. No outdated docs. Your AI remembers everything.

## How It Works

1. **You chat** — describe your coding standards, architecture decisions, client requirements, anything
2. **UseCortex extracts** — AI automatically organizes facts into structured topics
3. **Your agent recalls** — any MCP-compatible tool can query your knowledge instantly
4. **Knowledge grows** — your agent can push new discoveries back, so your knowledge base stays current

## Features

- **Two-way knowledge flow** — read context into projects, write discoveries back
- **Works with any MCP client** — compatible with any AI coding agent that supports the Model Context Protocol
- **Encrypted at rest** — AES-256 encryption with per-user keys
- **No vendor lock-in** — your knowledge works across every AI tool
- **Structured by topic** — knowledge auto-organized, not dumped in one pile

## Quick Start

### Prerequisites

- A free [UseCortex](https://usecortex.net) account
- An MCP-compatible AI coding agent

### 1. Generate an API key

Sign up at [usecortex.net](https://usecortex.net), then navigate to **Settings → API Keys → Generate**.

> **Note:** Copy the key immediately after generation. It will not be shown again.

### 2. Install (one command)

Run this in your terminal — replace `YOUR_API_KEY` with the key from step 1:

```bash
claude mcp add usecortex --transport url https://api.usecortex.net/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

That's it. Restart your AI coding agent and UseCortex tools are ready.

<details>
<summary>Manual setup (alternative)</summary>

If you prefer to configure manually, add this to your MCP client config file:

```json
{
  "mcpServers": {
    "usecortex": {
      "type": "url",
      "url": "https://api.usecortex.net/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_API_KEY` with the key generated in step 1.

</details>

## Available Tools

### `query_knowledge`

Search your knowledge base. Returns relevant facts organized by topic.

| Parameter | Type     | Required | Description                                    |
|-----------|----------|----------|------------------------------------------------|
| `query`   | `string` | Yes      | Natural language question or search term       |
| `topic`   | `string` | No       | Filter by specific topic                       |
| `format`  | `string` | No       | `"markdown"` (default), `"json"`, or `"text"` |

### `list_topics`

List all knowledge topics. Takes no parameters.

### `add_knowledge`

Write new knowledge back to your base. Your agent can store discoveries, decisions, or patterns it finds.

| Parameter | Type     | Required | Description                                    |
|-----------|----------|----------|------------------------------------------------|
| `content` | `string` | Yes      | The knowledge to store                         |
| `topic`   | `string` | No       | Topic to file under (auto-detected if omitted) |

### `get_topic`

Retrieve all knowledge entries for a specific topic.

| Parameter | Type     | Required | Description                        |
|-----------|----------|----------|------------------------------------|
| `topic`   | `string` | Yes      | Topic name to retrieve             |
| `format`  | `string` | No       | `"markdown"`, `"json"`, or `"text"` |

## Use Cases

| Who               | What                                                                  |
|-------------------|-----------------------------------------------------------------------|
| **Developers**    | Your coding standards, architecture decisions, and project context — automatically available to your AI agent |
| **Support teams** | Feed real policies and procedures to any support bot — it answers with facts, not guesses |
| **Sales teams**   | Store client history, pricing, and objections — pull everything before meetings |
| **Individuals**   | Your personal brain backup — everything you know, encrypted and accessible from any AI tool |
| **HR & Onboarding** | Your company playbook — processes, tools, culture — available to new hires instantly |

## Pricing

|                          | Free       | Pro ($12/mo) | Team ($25/mo) |
|--------------------------|------------|--------------|---------------|
| Knowledge entries        | 100        | Unlimited    | Unlimited     |
| Topics                   | 3          | Unlimited    | Unlimited     |
| API calls/month          | 500        | Unlimited    | Unlimited     |
| Two-way API              | Read only  | Yes          | Yes           |
| API keys                 | 1          | 5            | 20            |
| Team members             | —          | —            | 10            |
| Audit logs               | —          | —            | Yes           |

Manage your plan at [usecortex.net](https://usecortex.net).

## Security

- All communication encrypted over HTTPS
- Knowledge encrypted at rest with AES-256
- Per-user encryption keys — even we can't read your data
- API keys scoped per user with instant revocation

## Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/darktw/usecortex-mcp/issues).

## Links

- [UseCortex](https://usecortex.net) — Create your account and manage knowledge
- [Model Context Protocol](https://modelcontextprotocol.io) — Learn about MCP

## License

[MIT](LICENSE)
