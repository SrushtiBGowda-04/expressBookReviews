#!/usr/bin/env bash
# Run from final_project AFTER starting the server.
set -euo pipefail
mkdir -p evidence
save() {
  name="$1"; shift
  {
    printf 'COMMAND:\n'; printf '%q ' "$@"; printf '\n\nOUTPUT:\n'
    "$@"
  } > "evidence/$name" 2>&1
}
save getallbooks curl -i http://localhost:5000/
save getbooksbyISBN curl -i http://localhost:5000/isbn/1
save getbooksbyauthor curl -i 'http://localhost:5000/author/Chinua%20Achebe'
save getbooksbytitle curl -i 'http://localhost:5000/title/Things%20Fall%20Apart'
save getbookreview curl -i http://localhost:5000/review/1
echo "Saved Questions 2-6 outputs in final_project/evidence."
echo "For Questions 1 and 7-10, follow COMMANDS.md."
