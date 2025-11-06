# ADR 0003 – Confetti on Todo Completion

**Status:** Accepted  
**Date:** 2025‑11‑05  
**Author:** Roy Haynes

## Context
Todo apps are **functional but boring**.  
I wanted **joy**.

## Decision
Trigger **confetti** when a todo is **checked**.

## Rationale
| Benefit | Explanation |
|--------|-------------|
| **Emotional reward** | Dopamine hit = user keeps coming back |
| **Unique** | No other todo app does this |
| **Zero cost** | CDN, 1 line of code |

## Implementation
```js
if (!wasCompleted && e.target.checked) this.launchConfetti();