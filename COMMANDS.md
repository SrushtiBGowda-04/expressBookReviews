# cURL commands for the assignment

Start the server first with `npm start`. Open a second terminal. These are
commands for the local starter server at `http://localhost:5000`.

## Questions 1–6
Question 1 is separate: fork the required IBM repository, then run:
```bash
curl -H "Accept: application/vnd.github+json" https://api.github.com/repos/YOUR_GITHUB_USERNAME/expressBookReview
```
The JSON must show `"fork": true` and
`"parent": {"full_name": "ibm-developer-skills-network/expressBookReview"}`.

Local API commands:
```bash
curl http://localhost:5000/
curl http://localhost:5000/isbn/1
curl http://localhost:5000/author/Chinua%20Achebe
curl http://localhost:5000/title/Things%20Fall%20Apart
curl http://localhost:5000/review/1
```

## Questions 7–10
Register:
```bash
curl -i -c cookies.txt -X POST http://localhost:5000/customer/register -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"pass123\"}"
```
Login (save the session cookie):
```bash
curl -i -c cookies.txt -b cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"student1\",\"password\":\"pass123\"}"
```
Add/update review:
```bash
curl -i -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d "{\"review\":\"Excellent book!\"}"
```
Delete review:
```bash
curl -i -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1
```

## Question 11
After pushing your fork, open `final_project/router/general.js` on GitHub and
submit its public URL. Do not submit a URL until the file is pushed and public.
