$DataDir = 'C:\Users\quoct\mysql-data-newweb'

$processes = Get-CimInstance Win32_Process | Where-Object {
  $_.Name -eq 'mysqld.exe' -and $_.CommandLine -like "*$DataDir*"
}

if (-not $processes) {
  Write-Output 'MySQL is not running.'
  exit 0
}

$processes | ForEach-Object {
  Stop-Process -Id $_.ProcessId -Force
}

Write-Output 'MySQL stopped.'
