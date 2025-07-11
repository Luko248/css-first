/**
 * CSS Grid Guidance - Implementation guidance for grid properties
 */

import { ImplementationGuidance } from '../../../types.js';

export const GRID_GUIDANCE: Record<string, ImplementationGuidance> = {
  'display': {
    basic_usage: '.container { display: grid; }',
    best_practices: [
      'Use grid for two-dimensional layouts',
      'Use flexbox for one-dimensional layouts',
      'Define explicit grid areas for complex layouts',
      'Use subgrid when available for nested grids'
    ],
    fallbacks: [
      'Use flexbox for simpler grid layouts',
      'Provide float-based fallbacks for older browsers',
      'Use CSS feature queries for progressive enhancement'
    ],
    example_code: `
.layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.layout-areas {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 1rem;
}

/* Fallback for older browsers */
@supports not (display: grid) {
  .layout {
    display: flex;
    flex-direction: column;
  }
}`
  },
  'grid-template-columns': {
    basic_usage: '.container { grid-template-columns: repeat(3, 1fr); }',
    best_practices: [
      'Use fr units for flexible columns',
      'Use minmax() for responsive column sizing',
      'Use auto-fit/auto-fill for dynamic columns',
      'Combine fixed and flexible units'
    ],
    fallbacks: [
      'Use percentage widths for older browsers',
      'Provide flexbox fallbacks',
      'Use CSS calc() for complex calculations'
    ],
    example_code: `
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.sidebar-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}

.complex-layout {
  display: grid;
  grid-template-columns: 
    [full-start] minmax(1rem, 1fr) 
    [content-start] minmax(0, 60ch) 
    [content-end] minmax(1rem, 1fr) 
    [full-end];
}`
  },
  'grid-template-areas': {
    basic_usage: '.container { grid-template-areas: "header header" "sidebar main"; }',
    best_practices: [
      'Use descriptive area names',
      'Keep area definitions readable',
      'Use dots (.) for empty cells',
      'Combine with grid-area on child elements'
    ],
    fallbacks: [
      'Use grid-column and grid-row for positioning',
      'Provide flexbox-based layout fallbacks',
      'Use CSS positioning for complex layouts'
    ],
    example_code: `
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive layout */
@media (max-width: 768px) {
  .page-layout {
    grid-template-areas: 
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}`
  },
  'gap': {
    basic_usage: '.container { gap: 1rem; }',
    best_practices: [
      'Use gap instead of margins between grid items',
      'Combine with rem units for consistent spacing',
      'Use row-gap and column-gap for different spacing',
      'Consider responsive gap values'
    ],
    fallbacks: [
      'Use margins on grid items',
      'Use padding on container',
      'Provide spacing with pseudo-elements'
    ],
    example_code: `
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem; /* row-gap column-gap */
}

/* Responsive gap */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 3vw, 2rem);
}`
  }
};

export function getGridGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = GRID_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}