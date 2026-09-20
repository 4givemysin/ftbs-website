# Repair empty Phantom Connect Cursor plugin cache on Windows
# Run in PowerShell (as your user):
#   powershell -ExecutionPolicy Bypass -File repair-phantom-plugin.ps1

$ErrorActionPreference = "Stop"
$CacheRoot = Join-Path $env:USERPROFILE ".cursor\plugins\cache\cursor-public\phantom-connect"
$Tmp = Join-Path $env:TEMP "phantom-connect-cursor-plugin"

Write-Host "Cache target: $CacheRoot"

if (Test-Path $Tmp) { Remove-Item -Recurse -Force $Tmp }
git clone --depth 1 https://github.com/phantom/phantom-connect-cursor-plugin.git $Tmp

if (Test-Path $CacheRoot) { Remove-Item -Recurse -Force $CacheRoot }
New-Item -ItemType Directory -Force -Path $CacheRoot | Out-Null
Copy-Item -Path (Join-Path $Tmp '*') -Destination $CacheRoot -Recurse -Force
# Also keep a versioned copy
$VersionDir = Join-Path $CacheRoot "1.1.0"
New-Item -ItemType Directory -Force -Path $VersionDir | Out-Null
Copy-Item -Path (Join-Path $Tmp '*') -Destination $VersionDir -Recurse -Force

$Mcps = @(
  @{ Name = "phantom-mcp"; Body = @"
# phantom-mcp

Status: configured (pending first auth)

Command: ``npx -y @phantom/mcp-server@latest``

On first wallet tool call, complete Phantom device-code authentication in the browser.
Session persists at ``%USERPROFILE%\.phantom-mcp\session.json``.
"@ },
  @{ Name = "phantom-connect-sdk"; Body = @"
# phantom-connect-sdk

Status: ready (docs SSE)

URL: ``https://docs.phantom.com/mcp``

No authentication required for documentation search.
"@ }
)
foreach ($m in $Mcps) {
  $dir = Join-Path $CacheRoot ("mcps\" + $m.Name)
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Set-Content -Path (Join-Path $dir "STATUS.md") -Value $m.Body -Encoding UTF8
}

# Ensure user mcp.json has both servers
$McpJsonPath = Join-Path $env:USERPROFILE ".cursor\mcp.json"
$PhantomBlock = @{
  mcpServers = @{
    "phantom-connect-sdk" = @{ type = "sse"; url = "https://docs.phantom.com/mcp" }
    "phantom-mcp" = @{ command = "npx"; args = @("-y", "@phantom/mcp-server@latest") }
  }
}
if (Test-Path $McpJsonPath) {
  try {
    $existing = Get-Content $McpJsonPath -Raw | ConvertFrom-Json
  } catch { $existing = [pscustomobject]@{ mcpServers = [pscustomobject]@{} } }
  if (-not $existing.mcpServers) { $existing | Add-Member -NotePropertyName mcpServers -NotePropertyValue ([pscustomobject]@{}) }
  $existing.mcpServers | Add-Member -NotePropertyName "phantom-connect-sdk" -NotePropertyValue $PhantomBlock.mcpServers["phantom-connect-sdk"] -Force
  $existing.mcpServers | Add-Member -NotePropertyName "phantom-mcp" -NotePropertyValue $PhantomBlock.mcpServers["phantom-mcp"] -Force
  $existing | ConvertTo-Json -Depth 10 | Set-Content $McpJsonPath -Encoding UTF8
} else {
  $PhantomBlock | ConvertTo-Json -Depth 10 | Set-Content $McpJsonPath -Encoding UTF8
}

Write-Host ""
Write-Host "Repaired plugin cache. File count:" (Get-ChildItem -Recurse -File $CacheRoot | Measure-Object).Count
Write-Host "Skills:" (Get-ChildItem (Join-Path $CacheRoot "skills") -Directory | Select-Object -ExpandProperty Name) -join ", "
Write-Host "Wrote/updated: $McpJsonPath"
Write-Host "Next: fully quit Cursor, reopen, then ask the agent to list Phantom MCP tools / get Solana address."
