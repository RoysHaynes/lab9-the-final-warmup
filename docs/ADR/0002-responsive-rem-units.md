# ADR 0002 – Use `rem` for All Spacing & Font Sizes

**Status:** Accepted  
**Date:** 2025‑11‑05  
**Author:** Roy Haynes

## Context
Original code used `px`.  
Not accessible, not scalable.

## Decision
Convert **all** `px` → `rem` (and `em` for font‑related).

## Rationale
| Benefit | Explanation |
|--------|-------------|
| **Accessibility** | Scales with user’s root font size |
| **Consistency** | One base unit = predictable layout |
| **Responsive** | Works on mobile, desktop, large text |

## Trade‑offs
- Slightly more math (`16px` → `1rem`) → solved with comments
- No downside

## My Flair
> **Hover lift + gradient** on buttons — feels premium.

## References
- [CSS `rem` vs `px`](https://css-tricks.com/theres-more-to-the-css-rem-than-you-think/)