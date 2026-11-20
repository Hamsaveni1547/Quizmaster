# QuizMaster – Online Examination & Quiz Management System
React + Vite + Recharts + Lucide, LocalStorage persistence, Docker/Nginx, Jenkins CI/CD.
**Auth is a frontend-only simulation for academic demo — not production-grade.**

## Demo logins
| Role | Email | Password |
|---|---|---|
| Admin | admin@quiz.com | admin123 |
| Student | asha, ben, chen, dia, eli @quiz.com | stud123 |

## Run
```
npm install && npm run dev      # dev
npm test && npm run build       # tests + build
./build-image.sh                # Docker build + run -> http://localhost:8080
docker compose up -d --build    # alternative
```
## Jenkins
New Pipeline job → *Pipeline script from SCM* → Git → your GitHub repo URL, branch `main`, script path `Jenkinsfile`. Enable *GitHub hook trigger for GITScm polling*, then in GitHub: Settings → Webhooks → `http://<jenkins-host>/github-webhook/` (push events). Jenkins agent needs Node 20 and Docker. No credentials are hardcoded.
## Screenshots
Add your own under `docs/` after running the app.
