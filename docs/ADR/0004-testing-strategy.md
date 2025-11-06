
---

### 3. `0004-testing-strategy.md`

```markdown
# ADR 0004 – Testing Strategy (Vitest + Playwright)

**Status:** Accepted  
**Date:** 2025‑11‑05  
**Author:** Roy Haynes  

## Context
AI code had **2 tests**.  
I needed **real confidence**.

## Decision
- **Unit**: Vitest (7 files, 95%+ coverage)  
- **E2E**: Playwright (full user flow)

## Rationale
| Layer | Tool | Why |
|------|------|-----|
| **Unit** | Vitest | Fast, runs in Node, `jsdom` |
| **E2E** | Playwright | Real browser, Shadow DOM support |

## My Flair
> **Split unit tests into 7 focused files** — easier to maintain.

## Coverage
```bash
npm run test:coverage → coverage/index.html