$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

$NodeDir = "C:\Program Files\nodejs"
$env:Path = "$NodeDir;$env:Path"

Write-Host "Starting Voyante dev server..." -ForegroundColor Green
Write-Host "Check the 'Local:' URL in the output (3000, 3001, ...)" -ForegroundColor Cyan
Write-Host "If 3000 is busy, run .\stop-dev.ps1 first" -ForegroundColor DarkGray
Write-Host "Press Ctrl+C to stop" -ForegroundColor DarkGray

& "$NodeDir\npm.cmd" run dev
