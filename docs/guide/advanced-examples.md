# Advanced Examples

Real-world usage scenarios and advanced configurations for MCP Server Manager.

## Multi-Project Setup with Profiles

Manage different server configurations for different projects using profiles.

### Scenario: Web Developer with Multiple Projects

```bash
# Create profiles for different project types
mcpsm profile create frontend
mcpsm profile create backend
mcpsm profile create fullstack

# Add servers to frontend profile
mcpsm profile add frontend filesystem
mcpsm profile add frontend github

# Add servers to backend profile
mcpsm profile add backend postgres
mcpsm profile add backend redis
mcpsm profile add backend docker

# Fullstack gets everything
mcpsm profile add fullstack filesystem
mcpsm profile add fullstack github
mcpsm profile add fullstack postgres
mcpsm profile add fullstack docker

# Switch between profiles as needed
mcpsm profile use frontend    # When working on React app
mcpsm profile use backend     # When working on API
mcpsm profile use fullstack   # When working on everything
```

## Remote Server Configuration

### HTTP Server with Bearer Token

```bash
mcpsm add stripe \
  --type http \
  --url "https://mcp.stripe.com" \
  --token "sk_live_..."
```

### Xquik Remote MCP with Bearer Token

```bash
mcpsm add xquik \
  --type http \
  --url "https://xquik.com/mcp" \
  --token "<XQUIK_API_KEY>"
```

### SSE Server with OAuth

```bash
mcpsm add company-api \
  --type sse \
  --url "https://api.company.com/mcp/sse" \
  --oauth
```

Then authenticate:

```bash
mcpsm auth login company-api
```

### Custom Headers

For servers requiring custom headers, edit the config directly:

```bash
mcpsm config
```

```json
{
  "remoteServers": [
    {
      "id": "custom-api",
      "name": "Custom API",
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "X-API-Key": "your-api-key",
        "X-Custom-Header": "value"
      }
    }
  ]
}
```

## Tool Filtering for Token Optimization

Reduce context token usage by disabling unnecessary tools.

### View token usage by tool

```bash
mcpsm tokens --detailed
```

Output:

```
Server: filesystem (4,250 tokens)
  ├─ read_file       1,200 tokens  ✓ enabled
  ├─ write_file      1,100 tokens  ✓ enabled
  ├─ list_directory    800 tokens  ✓ enabled
  ├─ search_files      750 tokens  ✗ disabled
  └─ get_file_info     400 tokens  ✓ enabled
```

### Disable high-token tools you don't need

```bash
# Disable specific tools
mcpsm tools disable filesystem search_files
mcpsm tools disable github list_commits

# Or use TUI for visual selection
mcpsm
# Press T to open tools screen
```

### Create a minimal tool set

```bash
# Disable all tools first
mcpsm tools disable filesystem --all

# Enable only what you need
mcpsm tools enable filesystem read_file
mcpsm tools enable filesystem write_file
mcpsm tools enable filesystem list_directory
```

## Automation and CI/CD Integration

### Export configuration for backup

```bash
# Export to JSON file
mcpsm export -o ~/backups/mcp-config-$(date +%Y%m%d).json

# Export in Claude format
mcpsm export --format claude -o claude-config.json
```

### Import on a new machine

```bash
# From backup file
mcpsm import ~/backups/mcp-config-20240115.json

# From existing client
mcpsm import --from claude
mcpsm import --from cursor
```

### CI/CD Pipeline Script

```bash
#!/bin/bash
# setup-mcp.sh - Run on new development machines

# Install mcpsm
npm install -g mcp-server-manager

# Import standard config from URL or local file
mcpsm import ./team-mcp-config.json

# Enable required clients
mcpsm clients enable claude
mcpsm clients enable cursor

# Sync to all enabled clients
mcpsm clients sync

# Test all servers
mcpsm test

# Start daemon with auto-startup
mcpsm start
mcpsm startup enable
```

### JSON Output for Scripts

```bash
# List servers as JSON
mcpsm list --json | jq '.servers[].name'

# Check specific server status
mcpsm test filesystem --json | jq '.status'

# Get client sync status
mcpsm clients --json | jq '.[] | select(.enabled == true)'
```

## Daemon and Gateway Configuration

### Running as Background Service

```bash
# Start daemon
mcpsm start

# Enable auto-start on boot
mcpsm startup enable

# View live logs
mcpsm logs -f

# Check status
mcpsm status
```

### Custom Port Configuration

```bash
# Change gateway port
mcpsm port 9000

# Verify the change
mcpsm settings get port
```

### Using with Multiple Claude Desktop Windows

The daemon allows multiple Claude Desktop windows to share the same MCP servers:

1. Start the daemon: `mcpsm start`
2. All Claude windows connect to the same gateway
3. Server state is shared across windows

## Multi-Client Synchronization

### Sync specific servers to specific clients

```bash
# Enable clients
mcpsm clients enable claude
mcpsm clients enable cursor
mcpsm clients enable windsurf

# Sync all servers to all enabled clients
mcpsm clients sync

# Or sync to specific client
mcpsm clients sync claude
```

### Different configurations per client

Use profiles combined with manual sync:

```bash
# Set up work profile
mcpsm profile use work
mcpsm clients sync cursor

# Set up personal profile
mcpsm profile use personal
mcpsm clients sync claude
```

## Local Development Servers

### Filesystem server with specific paths

```bash
mcpsm add project-files \
  --type stdio \
  --command "npx" \
  --args "-y @modelcontextprotocol/server-filesystem /Users/me/projects"
```

### Multiple filesystem servers for different directories

```bash
# Documents
mcpsm add docs \
  --type stdio \
  --command "npx" \
  --args "-y @modelcontextprotocol/server-filesystem ~/Documents"

# Code
mcpsm add code \
  --type stdio \
  --command "npx" \
  --args "-y @modelcontextprotocol/server-filesystem ~/Code"

# Downloads (disabled by default)
mcpsm add downloads \
  --type stdio \
  --command "npx" \
  --args "-y @modelcontextprotocol/server-filesystem ~/Downloads"
mcpsm disable downloads
```

### GitHub server with personal token

```bash
mcpsm add github \
  --type stdio \
  --command "npx" \
  --args "-y @modelcontextprotocol/server-github" \
  --env "GITHUB_PERSONAL_ACCESS_TOKEN=ghp_..."
```

## Health Monitoring

### Regular health checks

```bash
# Run comprehensive health check
mcpsm doctor

# Test all servers
mcpsm test

# View server status with token counts
mcpsm list --tokens
```

### Create a monitoring script

```bash
#!/bin/bash
# monitor-mcp.sh

# Test servers
result=$(mcpsm test --json)

# Check for failures
failures=$(echo $result | jq '[.[] | select(.status == "failed")] | length')

if [ "$failures" -gt 0 ]; then
  echo "MCP Server Alert: $failures server(s) failed"
  echo $result | jq '.[] | select(.status == "failed")'
  # Send notification, write to log, etc.
fi
```

## Tips and Best Practices

### 1. Start with minimal servers

Only add servers you actually need. More servers = more tokens = higher costs.

### 2. Use profiles

Group servers by context. Switch profiles instead of enabling/disabling individual servers.

### 3. Monitor token usage

Run `mcpsm tokens` regularly to see which servers and tools consume the most tokens.

### 4. Keep daemon running

Use `mcpsm startup enable` to ensure the gateway is always available.

### 5. Export regularly

Back up your configuration: `mcpsm export -o backup.json`

### 6. Test before syncing

Always run `mcpsm test` before syncing to clients to catch broken servers.
