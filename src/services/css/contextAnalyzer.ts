/**
 * Project Context Analyzer for better CSS suggestions
 */

export interface ProjectContext {
  framework?: string;
  cssFramework?: string;
  buildTool?: string;
  targetBrowsers?: string[];
  existingPatterns?: string[];
  constraints?: string[];
}

/**
 * Analyzes project context from various sources
 */
export function analyzeProjectContext(contextString?: string): ProjectContext {
  if (!contextString) return {};

  const context: ProjectContext = {};
  const lowerContext = contextString.toLowerCase();

  // Framework detection
  if (lowerContext.includes('react') || lowerContext.includes('jsx')) {
    context.framework = 'react';
  } else if (lowerContext.includes('vue')) {
    context.framework = 'vue';
  } else if (lowerContext.includes('angular')) {
    context.framework = 'angular';
  } else if (lowerContext.includes('svelte')) {
    context.framework = 'svelte';
  }

  // CSS Framework detection
  if (lowerContext.includes('tailwind')) {
    context.cssFramework = 'tailwind';
  } else if (lowerContext.includes('bootstrap')) {
    context.cssFramework = 'bootstrap';
  } else if (lowerContext.includes('material') || lowerContext.includes('mui')) {
    context.cssFramework = 'material-ui';
  } else if (lowerContext.includes('chakra')) {
    context.cssFramework = 'chakra-ui';
  }

  // Build tool detection
  if (lowerContext.includes('webpack')) {
    context.buildTool = 'webpack';
  } else if (lowerContext.includes('vite')) {
    context.buildTool = 'vite';
  } else if (lowerContext.includes('parcel')) {
    context.buildTool = 'parcel';
  } else if (lowerContext.includes('rollup')) {
    context.buildTool = 'rollup';
  }

  // Browser support patterns
  const browserMatches = contextString.match(/(?:chrome|firefox|safari|edge)\s*\d+\+?/gi);
  if (browserMatches) {
    context.targetBrowsers = browserMatches;
  }

  // Constraint detection
  const constraints: string[] = [];
  if (lowerContext.includes('no javascript') || lowerContext.includes('css only')) {
    constraints.push('css-only');
  }
  if (lowerContext.includes('performance') || lowerContext.includes('lightweight')) {
    constraints.push('performance-critical');
  }
  if (lowerContext.includes('accessible') || lowerContext.includes('a11y')) {
    constraints.push('accessibility-focused');
  }
  if (lowerContext.includes('responsive') || lowerContext.includes('mobile-first')) {
    constraints.push('responsive-required');
  }

  if (constraints.length > 0) {
    context.constraints = constraints;
  }

  return context;
}

/**
 * Gets framework-specific CSS recommendations
 */
export function getFrameworkSpecificRecommendations(framework?: string): string[] {
  switch (framework) {
    case 'react':
      return [
        'Consider CSS-in-JS solutions like styled-components',
        'Use className for CSS classes',
        'Flexbox works well with React component layouts',
        'CSS Modules can help with scoping'
      ];
    case 'vue':
      return [
        'Use scoped styles in single-file components',
        'CSS Grid works well with Vue\'s template system',
        'Consider Vue-specific CSS frameworks',
        'Transition components work well with CSS animations'
      ];
    case 'angular':
      return [
        'Use ViewEncapsulation for component styling',
        'CSS Grid and Flexbox work well with Angular Material',
        'Consider Angular CDK for advanced layouts',
        'Use CSS custom properties for theming'
      ];
    case 'svelte':
      return [
        'Leverage Svelte\'s built-in scoped styling',
        'CSS animations work seamlessly with Svelte transitions',
        'Use CSS custom properties for reactive styling',
        'Consider SvelteKit for full-stack CSS organization'
      ];
    default:
      return [];
  }
}

/**
 * Gets CSS framework compatibility recommendations
 */
export function getCSSFrameworkRecommendations(cssFramework?: string): string[] {
  switch (cssFramework) {
    case 'tailwind':
      return [
        'Use utility-first approach',
        'Consider @apply directive for custom components',
        'Leverage Tailwind\'s responsive prefixes',
        'Use arbitrary value syntax for custom values'
      ];
    case 'bootstrap':
      return [
        'Use Bootstrap\'s grid system',
        'Leverage utility classes',
        'Consider custom SCSS variables for theming',
        'Use Bootstrap components as base for custom designs'
      ];
    case 'material-ui':
      return [
        'Use Material Design principles',
        'Leverage theme customization',
        'Consider sx prop for inline styling',
        'Use Material-UI\'s responsive breakpoints'
      ];
    default:
      return [];
  }
}