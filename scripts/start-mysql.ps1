$BaseDir = 'C:\Users\quoct\mysql-commercial-9.7.0-winx64'
$DataDir = 'C:\Users\quoct\mysql-data-newweb'
$Mysqld = Join-Path $BaseDir 'bin\mysqld.exe'
$Log = 'C:\Users\quoct\mysql-newweb.log'
$ErrorLog = 'C:\Users\quoct\mysql-newweb.err.log'

$existing = Get-CimInstance Win32_Process | Where-Object {
  $_.Name -eq 'mysqld.exe' -and $_.CommandLine -like "*$DataDir*"
}

if ($existing) {
  Write-Output 'MySQL is already running.'
  exit 0
}

Start-Process `
  -FilePath $Mysqld `
  -ArgumentList @("--basedir=$BaseDir", "--datadir=$DataDir", '--bind-address=127.0.0.1', '--port=3306') `
  -RedirectStandardOutput $Log `
  -RedirectStandardError $ErrorLog `
  -WindowStyle Hidden

Start-Sleep -Seconds 3

$listener = Get-NetTCPConnection -LocalPort 3306 -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  Write-Output 'MySQL running at 127.0.0.1:3306'
} else {
  Write-Output 'MySQL did not start. Check C:\Users\quoct\mysql-newweb.err.log'
  exit 1
}
