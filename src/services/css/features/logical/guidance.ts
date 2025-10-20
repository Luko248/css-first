/**
 * Logical Guidance - Implementation guidance for logical functions and operators
 */

import { ImplementationGuidance } from '../../types.js';

export const LOGICAL_GUIDANCE: Record<string, ImplementationGuidance> = {
  'if()': {
    basic_usage: 'color: if(style(--theme) = dark, white, black);',
    best_practices: [
      'Use with style() function to query custom property values',
      'Keep conditions simple and readable',
      'Provide meaningful fallback values',
      'Consider performance impact of complex calculations'
    ],
    fallbacks: [
      'Use CSS custom properties with calc() for simpler conditions',
      'Multiple CSS classes with JavaScript toggling',
      'CSS feature queries (@supports) for conditional styling',
      'Traditional CSS cascading for default values'
    ],
    example_code: `
/* Basic conditional value assignment */
:root {
  --theme: light;
  --size: medium;
}

.button {
  background: if(style(--theme) = dark, #333, #fff);
  color: if(style(--theme) = dark, white, black);
  padding: if(style(--size) = large, 1rem 2rem, 0.5rem 1rem);
}

/* Numeric comparisons */
:root {
  --viewport-width: 1200px;
}

.container {
  max-width: if(style(--viewport-width) > 1000px, 1200px, 100%);
  margin: if(style(--viewport-width) > 768px, 2rem auto, 1rem);
}

/* Complex conditional logic */
.card {
  --priority: high;
  --status: active;
  
  border-color: if(
    style(--priority) = high AND style(--status) = active,
    red,
    if(style(--priority) = medium, orange, gray)
  );
}

/* Component state-based styling */
.interactive-element {
  --is-hovered: false;
  --is-focused: false;
  
  transform: if(style(--is-hovered) = true, scale(1.05), scale(1));
  box-shadow: if(
    style(--is-focused) = true,
    0 0 0 2px blue,
    if(style(--is-hovered) = true, 0 4px 8px rgba(0,0,0,0.1), none)
  );
}

/* Responsive design with logical conditions */
:root {
  --screen-size: desktop;
}

@media (max-width: 768px) {
  :root {
    --screen-size: mobile;
  }
}

.navigation {
  display: if(style(--screen-size) = mobile, none, flex);
  position: if(style(--screen-size) = mobile, fixed, static);
  bottom: if(style(--screen-size) = mobile, 0, auto);
}

/* Theme-aware component styling */
.theme-aware {
  --theme: light;
  --accent: blue;
  
  background: if(style(--theme) = dark, hsl(0 0% 10%), hsl(0 0% 98%));
  border: 1px solid if(style(--theme) = dark, hsl(0 0% 30%), hsl(0 0% 80%));
  color: if(style(--theme) = dark, hsl(0 0% 90%), hsl(0 0% 10%));
  
  /* Accent color variations */
  --accent-bg: if(
    style(--accent) = red, #ff4444,
    if(style(--accent) = green, #44ff44, #4444ff)
  );
}

/* Form validation states */
.form-field {
  --validation-state: valid;
  
  border-color: if(
    style(--validation-state) = error, red,
    if(style(--validation-state) = warning, orange, green)
  );
  
  background: if(
    style(--validation-state) = error, rgba(255,0,0,0.1),
    if(style(--validation-state) = warning, rgba(255,165,0,0.1), rgba(0,255,0,0.1))
  );
}

/* Fallback strategies */
@supports not (color: if(true, red, blue)) {
  /* Traditional approach with CSS classes */
  .theme-dark .button {
    background: #333;
    color: white;
  }
  
  .theme-light .button {
    background: #fff;
    color: black;
  }
  
  .size-large .button {
    padding: 1rem 2rem;
  }
  
  .size-medium .button {
    padding: 0.5rem 1rem;
  }
}

/* Progressive enhancement */
.enhanced-component {
  /* Base styles work everywhere */
  background: var(--bg-color, white);
  color: var(--text-color, black);
  padding: var(--padding, 0.5rem 1rem);
}

@supports (color: if(true, red, blue)) {
  .enhanced-component {
    --theme: light;
    --size: medium;
    
    background: if(style(--theme) = dark, black, white);
    color: if(style(--theme) = dark, white, black);
    padding: if(style(--size) = large, 1rem 2rem, 0.5rem 1rem);
  }
}`
  }
};

export function getLogicalGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = LOGICAL_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}