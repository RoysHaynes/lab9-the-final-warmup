# 🧠 Lab 9 – The Final Warm-Up
### Course: COMP 305 / Human-Centered Software Engineering
**Author:** Roy Haynes  
**Repository:** [lab9-the-final-warmup](https://github.com/RoysHaynes/lab9-the-final-warmup)

---

## 🎯 Overview

**Lab 9** is designed as the *final individual warm-up* before the team project.  
It challenges students to take an AI-generated brownfield codebase — a simple **Task Management App built with Lit** — and bring it to professional quality.

The main focus is on **process and craftsmanship** rather than heavy coding.  
This lab demonstrates the ability to:
- Work with inherited (“AI-slop”) code
- Apply **MVC principles** and organize a repo
- Integrate **testing**, **linting**, and **CI/CD pipelines**
- Use **GitHub Issues** for planning and documentation
- Write **JSDocs** and **ADRs** to explain architectural decisions

---

## ⚙️ Tech Stack

| Category | Tools |
|-----------|--------|
| Frontend Framework | [Lit](https://lit.dev/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Language | JavaScript (ES Modules) |
| Testing | Vitest / Playwright |
| Linting | ESLint |
| Docs | JSDoc |
| Deployment | Netlify or Cloudflare Pages |
| CI/CD | GitHub Actions |

---

## 🧩 Objectives

1. Refactor and clean up AI-generated code.
2. Organize the project using **MVC architecture**.
3. Integrate **unit tests** and **E2E tests**.
4. Set up **linting**, **CI**, and **deployment automation**.
5. Add clear **documentation**, including README, ADRs, and JSDoc-generated docs.
6. Use **GitHub Issues** to plan and track work.

---

## 📂 Project Structure (After Refactor)
```plaintext
lab9-the-final-warmup/
├─ .github/
│  └─ workflows/ci.yml
├─ src/
│  ├─ components/        # Views (Lit web components)
│  ├─ models/            # Data logic / state
│  ├─ services/          # Local storage, API, helpers
│  ├─ main.js            # Entry point
│  ├─ index.html
│  └─ styles.css
├─ tests/
│  ├─ todo-model.test.js
│  ├─ e2e/
│  │  └─ basic-flow.spec.js
├─ docs/
│  ├─ ADRs/
│  │  └─ 0001-use-lit-and-mvc.md
│  └─ jsdocs/
├─ package.json
└─ README.md
```
## Setup
- git clone https://github.com/RoysHaynes/lab9-the-final-warmup.git 
- cd lab9-the-final-warmup 
- npm install 
- npm run dev 

## Testing
- npm test
- npx playwright test


## License
This project is licensed under the MIT License.

## Author
**Roy Haynes**  
University of San Diego – COMP 305