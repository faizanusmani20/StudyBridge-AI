solve CORS error:
(index):815 Live reload enabled.
(index):1 Access to fetch at 'https://api.anthropic.com/v1/messages' from origin 'http://127.0.0.1:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
api.anthropic.com/v1/messages:1  Failed to load resource: net::ERR_FAILED


api key required (closed-source for testing) {app.js section 3}
allow user to set own api key that is stored in local storage

remove student login section; no-registration platform for now. else, we need to make a separate user page with account name (and history feature, stored in localstorage)

remove teacher view

radio based mcq quiz with answer evaluation support (no explanation for now; user may input query in tab 1)

can we add hardcoded resources? ai-generated hardcoded? against problem statement?

add dificulty drop down in tab 2
