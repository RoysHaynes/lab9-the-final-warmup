# ADR 0001 – Use Lit + MVC for the Task App

## Status
**Accepted** — November 5, 2025

---

## Context
The provided AI-generated Task App (“brownfield” code) is functional but lacks professional structure, documentation, testing, and CI/CD.  
Without a clear architecture, logic, rendering, and persistence are mixed together, making maintenance and testing difficult.

We need to:
- Introduce a maintainable structure that separates concerns
- Choose a lightweight framework to simplify rendering
- Ensure the app can be tested, linted, documented, and deployed

---

## Decision
Adopt **Lit** for rendering web components and apply an **MVC (Model-View-Controller)** architecture.

### Implementation outline
- **Model:** Handles task logic (CRUD, filters, persistence)
- **View:** Lit components for UI and event dispatching
- **Controller:** App shell mediates between model and view
- **Service Layer:** LocalStorage handled by `storage-service.js`


---

## Consequences
### ✅ Easier
- Code is modular, testable, and readable
- Unit tests target models/services without DOM complexity
- Components are lightweight and reusable
- Aligns with course goals (linting, testing, CI/CD, documentation)

### ⚠️ More Difficult
- Requires learning basic Lit syntax and lifecycle
- Initial refactor effort to separate logic from components
- Controller component must stay disciplined to avoid complexity

---

**Author:** Roy Haynes  
**Repository:** `RoysHaynes/lab9-the-final-warmup`
