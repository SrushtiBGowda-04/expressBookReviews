# Run from final_project in Windows PowerShell AFTER starting the server.
$ErrorActionPreference = "Stop"
function Save-Request($name, $command, $uri) {
  $output = & curl.exe -sS -i $uri
  "COMMAND:`r`n$command`r`n`r`nOUTPUT:`r`n$($output -join \"`r`n\")" |
    Set-Content -Encoding utf8 (Join-Path $PSScriptRoot "evidence\$name")
}
Save-Request "getallbooks" 'curl.exe -i http://localhost:5000/' 'http://localhost:5000/'
Save-Request "getbooksbyISBN" 'curl.exe -i http://localhost:5000/isbn/1' 'http://localhost:5000/isbn/1'
Save-Request "getbooksbyauthor" 'curl.exe -i http://localhost:5000/author/Chinua%20Achebe' 'http://localhost:5000/author/Chinua%20Achebe'
Save-Request "getbooksbytitle" 'curl.exe -i http://localhost:5000/title/Things%20Fall%20Apart' 'http://localhost:5000/title/Things%20Fall%20Apart'
Save-Request "getbookreview" 'curl.exe -i http://localhost:5000/review/1' 'http://localhost:5000/review/1'
Write-Host "Saved Questions 2-6 outputs in final_project/evidence."
Write-Host "For Questions 1 and 7-10, follow COMMANDS.md so your GitHub username and login cookie are used."
