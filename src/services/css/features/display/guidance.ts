/**
 * Display Guidance - Implementation guidance for CSS display properties
 */

import { ImplementationGuidance } from '../../types.js';

export const DISPLAY_GUIDANCE: Record<string, ImplementationGuidance> = {
  "display-contents": {
    basic_usage: `.wrapper {
  display: contents;
}`,
    best_practices: [
      "Use display: contents to make wrapper elements transparent to layout",
      "Particularly useful in grid and flexbox layouts to skip wrapper levels",
      "Be cautious with accessibility - screen readers may not announce contents elements",
      "Test thoroughly across browsers as support varies",
      "Consider semantic HTML structure when using contents"
    ],
    fallbacks: [
      "Use CSS Grid or Flexbox subgrid where available",
      "Restructure HTML to avoid unnecessary wrapper elements",
      "Use JavaScript to move elements when display: contents isn't supported"
    ],
    example_code: `/* Card component where wrapper should be transparent to grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.card-wrapper {
  /* This wrapper becomes transparent to the grid */
  display: contents;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Without display: contents, you'd need: */
.card-grid-alternative {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.card-grid-alternative .card {
  /* Direct child of grid */
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`
  },
  "display-flex": {
    basic_usage: `.container {
  display: flex;
}`,
    best_practices: [
      "Use display: flex for one-dimensional layouts",
      "Consider flex-direction, justify-content, and align-items",
      "Use inline-flex for inline flex containers",
      "Understand flex item behavior and flex property"
    ],
    fallbacks: [
      "Use display: table or display: inline-block for older browsers",
      "Implement with floats and clearfix for legacy support"
    ],
    example_code: `/* Flexible navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.navbar-brand {
  font-weight: bold;
}

.navbar-nav {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}`
  },
  "display-grid": {
    basic_usage: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}`,
    best_practices: [
      "Use display: grid for two-dimensional layouts",
      "Define explicit grid areas with grid-template-areas when appropriate",
      "Use inline-grid for inline grid containers",
      "Consider subgrid for nested grids when supported"
    ],
    fallbacks: [
      "Use display: flex with wrapping for simpler grid-like layouts",
      "Implement with CSS Grid polyfills for older browsers"
    ],
    example_code: `/* Dashboard layout with grid */
.dashboard {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }`
  },
  "display-flow-root": {
    basic_usage: `.clearfix {
  display: flow-root;
}`,
    best_practices: [
      "Use display: flow-root to create new block formatting context",
      "Replaces traditional clearfix techniques",
      "Useful for containing floated elements",
      "Better than overflow: hidden for clearing floats"
    ],
    fallbacks: [
      "Use overflow: hidden for older browsers",
      "Implement traditional clearfix with pseudo-elements"
    ],
    example_code: `/* Container that properly contains floated children */
.card {
  display: flow-root;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card-image {
  float: left;
  margin-right: 1rem;
  width: 100px;
  height: 100px;
}

/* Legacy fallback */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}`
  },
  "display-none": {
    basic_usage: `.hidden {
  display: none;
}`,
    best_practices: [
      "Use display: none to completely remove elements from layout",
      "Consider visibility: hidden if you want to keep space",
      "Use for show/hide functionality with JavaScript",
      "Be mindful of accessibility when hiding content"
    ],
    fallbacks: [
      "No fallbacks needed - universally supported"
    ],
    example_code: `/* Toggle visibility with JavaScript */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none;
}

.modal.show {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* Completely hidden */
.hidden {
  display: none;
}`
  }
};

export function getDisplayGuidance(property: string): ImplementationGuidance | undefined {
  return DISPLAY_GUIDANCE[property];
}