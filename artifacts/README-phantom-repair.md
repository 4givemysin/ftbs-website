# Repair empty Phantom Connect Cursor plugin cache (Windows)

## Problem
`C:\Users\Cars0\.cursor\plugins\cache\cursor-public\phantom-connect` was empty, so MCP servers never loaded.

## Fix (pick one)

### A) One-command repair (recommended)
In PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\artifacts\repair-phantom-plugin.ps1
```

Then **fully quit and reopen Cursor**.

### B) Manual unzip
1. Unzip `phantom-connect-plugin-cache.zip` into:
   `C:\Users\Cars0\.cursor\plugins\cache\cursor-public\phantom-connect`
2. Ensure `%USERPROFILE%\.cursor\mcp.json` includes both servers from `.cursor\mcp.json` in this repo.
3. Fully quit and reopen Cursor.

## Verify
Ask the agent:
- "List Phantom MCP tools"
- "Search Phantom docs for get_wallet_addresses"
- "Get my Solana address" (completes browser device-code auth)

## Notes
- `phantom-connect-sdk` = docs (no auth)
- `phantom-mcp` = wallet ops (browser device-code auth on first use; creates a dedicated agent wallet)
