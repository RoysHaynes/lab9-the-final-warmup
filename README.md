# 🧠 Lab 9 – The Final Warm-Up
### Course: COMP 305 / Human-Centered Software Engineering
**Author:** Roy Haynes  
**Repository:** https://github.com/RoysHaynes/lab9-the-final-warmup.git
**live demo:** 
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
ab9-the-final-warmup/
├── .github/
│   └── workflows/
│       └── ci.yml               # CI/CD: lint, test, docs, deploy
├── docs/
│   ├── ADRs/                    # Architectural Decisions
│   │   └── 0001-use-lit-and-mvc.md
│   └── jsdocs/                  # Generated API docs (npm run docs)
├── src/                         # Source code (Vite root)
│   ├── controller/
│   │   └── todo-app.js          # Root component (MVC Controller)
│   ├── model/
│   │   ├── storage-service.js   # LocalStorage wrapper
│   │   └── todo-model.js        # Business logic + Observer pattern
│   ├── view/
│   │   ├── todo-form.js         # Add new todos
│   │   ├── todo-item.js         # Single todo (with confetti flair!)
│   │   └── todo-list.js         # List rendering + empty state
│   ├── index.html               # Entry point
│   └── styles.css               # Global styles (responsive rem units)
├── tests/
│   ├── unit/                    # Vitest unit tests (7 files, 95%+ coverage)
│   │   ├── add.test.js
│   │   ├── toggle.test.js
│   │   ├── delete.test.js
│   │   ├── update.test.js
│   │   ├── clear.test.js
│   │   ├── stats.test.js
│   │   └── search.test.js
│   └── e2e/                     # Playwright E2E (full user flow)
│       └── app.spec.js
├── .eslintrc.json               # ESLint + JSDoc + Lit rules
├── .prettierrc                  # Formatting rules
├── jsdoc.conf.json              # JSDoc generation
├── playwright.config.js         # E2E test config
├── vite.config.js               # Vite build/dev server
├── package.json                 # Dependencies + scripts
└── README.md                    # This file

```
## Setup
- git clone https://github.com/RoysHaynes/lab9-the-final-warmup.git 
- cd lab9-the-final-warmup 
- npm install 
- npm run dev 

## Testing
- npm test
- npx playwright test

## Scripts 
- npm run dev
- npm test
- npm run e2e
- npm run lint
- npm run format
- npm run docs

## License
This project is licensed under the MIT License.

## Author
**Roy Haynes**  
University of San Diego – COMP 305