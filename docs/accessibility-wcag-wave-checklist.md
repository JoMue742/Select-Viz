# Accessibility Report (WCAG 2.1 AA + WAVE)

## Scope
- Project: Select-Viz (React app)
- Target: Assignment 3 accessibility evidence
- Standard: WCAG 2.1 AA (selected criteria relevant for this project)
- Tooling: WAVE (WebAIM), manual keyboard test, color-contrast spot checks

## Selected WCAG Criteria and Evidence

### 1.3.1 Info and Relationships
- Status: Partial
- Evidence:
  - Semantic layout with `header`, `nav`, `main`, `article`, `section`, `footer`.
  - Form controls in the filter panel use explicit labels or `aria-label`.
- Follow-up:
  - Validate full heading hierarchy on deployed page after final content freeze.

### 1.4.3 Contrast (Minimum)
- Status: Partial
- Evidence:
  - Dark and light themes were designed with readable text/background combinations.
  - Interactive focus outlines added for keyboard visibility.
- Follow-up:
  - Record final contrast ratios for at least: body text, muted text, accent text, active buttons.

### 2.1.1 Keyboard
- Status: Partial
- Evidence:
  - Clickable filter list entries were converted from `div` to `button`.
  - Timeline and navigation controls are keyboard reachable.
- Follow-up:
  - Verify complete tab order on mobile viewport and map interactions.

### 2.4.7 Focus Visible
- Status: Done
- Evidence:
  - Global `:focus-visible` outline style implemented for links, inputs, and buttons.

### 3.3.2 Labels or Instructions
- Status: Done
- Evidence:
  - Search and period inputs provide labels and clearer input semantics.

### 4.1.2 Name, Role, Value
- Status: Partial
- Evidence:
  - Toggle and filter controls include `aria-pressed` where applicable.
  - Timeline slider includes `aria-valuetext`.
- Follow-up:
  - Re-check map marker interaction for assistive technology behavior.

## WAVE Check Log

Run this after final deploy:
- URL: `https://jomue742.github.io/Select-Viz/`
- Tool: `https://wave.webaim.org/`

Fill in results:
- Date:
- Errors:
- Contrast errors:
- Alerts:
- Structural elements:
- ARIA findings:
- Fixed items:
- Remaining known issues:

## Manual Keyboard Test Log
- [ ] Can reach all header controls with Tab
- [ ] Can open and use all filter controls without mouse
- [ ] Can operate timeline slider, play/pause, reset
- [ ] Can switch between Map/About tabs and continue from logical focus point
- [ ] Focus indicator visible at all times

## Remaining Risks
- Leaflet marker interaction is primarily pointer-optimized and may require additional accessibility fallback descriptions.
- Final WAVE report still needs to be captured and documented with exact counts.
