/**
 * Automated CSS Feature Discovery using context7 MCP
 * Discovers and categorizes recent CSS features from MDN documentation
 */

import { CSSFeature, CSSFeatureCategory } from './types.js';

/** Context7 MCP integration for MDN documentation */
interface Context7Response {
  content: string;
  metadata?: {
    title?: string;
    lastModified?: string;
    browserSupport?: any;
  };
}

/** Recent CSS features discovered from MDN (2021-2025) */
interface DiscoveredFeature {
  name: string;
  properties: string[];
  description: string;
  category: CSSFeatureCategory;
  support_level: 'excellent' | 'good' | 'moderate' | 'limited' | 'experimental';
  mdn_url: string;
  year_introduced?: number;
  specification?: string;
}

/**
 * CSS feature discovery patterns for categorization
 */
const DISCOVERY_PATTERNS = {
  [CSSFeatureCategory.LAYOUT]: {
    keywords: ['layout', 'grid', 'flex', 'container', 'subgrid', 'masonry'],
    properties: ['display', 'grid-', 'flex-', 'container-', 'subgrid', 'masonry']
  },
  [CSSFeatureCategory.ANIMATION]: {
    keywords: ['animation', 'transition', 'transform', 'scroll', 'timeline', 'view'],
    properties: ['animation-', 'transition-', 'transform-', 'scroll-timeline', 'view-timeline']
  },
  [CSSFeatureCategory.RESPONSIVE]: {
    keywords: ['responsive', 'container', 'query', 'viewport', 'dynamic'],
    properties: ['container-', '@container', 'cq-', 'dvh', 'svh', 'lvh']
  },
  [CSSFeatureCategory.VISUAL]: {
    keywords: ['color', 'gradient', 'shadow', 'filter', 'backdrop', 'accent'],
    properties: ['color-', 'gradient-', 'shadow-', 'filter-', 'backdrop-', 'accent-color']
  },
  [CSSFeatureCategory.INTERACTION]: {
    keywords: ['focus', 'hover', 'user', 'pointer', 'touch', 'selection'],
    properties: ['focus-', 'user-', 'pointer-', 'touch-', 'selection-']
  },
  [CSSFeatureCategory.LOGICAL]: {
    keywords: ['logical', 'inline', 'block', 'start', 'end', 'writing'],
    properties: ['inline-', 'block-', '-inline-', '-block-', 'writing-mode']
  }
};

/**
 * Recent CSS features to discover and integrate
 */
const RECENT_CSS_FEATURES_TO_DISCOVER = [
  // Container Queries (2022)
  'CSS_Container_Queries',
  'container-type',
  'container-name', 
  '@container',
  
  // CSS Cascade Layers (2022)
  'CSS_Cascade_Layers',
  '@layer',
  
  // CSS Grid Level 2 (2021-2023)
  'CSS_Grid_Layout_2',
  'subgrid',
  'masonry',
  
  // CSS Color Level 4 & 5 (2021-2024)
  'CSS_Color_4',
  'CSS_Color_5',
  'color-mix',
  'color-contrast',
  'accent-color',
  'color-scheme',
  
  // CSS Viewport Units (2022-2023)
  'CSS_Values_4',
  'dvh',
  'dvw',
  'svh',
  'svw',
  'lvh',
  'lvw',
  
  // CSS Scroll-driven Animations (2023-2024)
  'CSS_Scroll_driven_Animations',
  'scroll-timeline',
  'view-timeline',
  'animation-timeline',
  
  // CSS Nesting (2023)
  'CSS_Nesting',
  
  // CSS :has() selector (2022)
  ':has',
  
  // CSS Math Functions (2021-2023)
  'CSS_Functions',
  'clamp',
  'min',
  'max',
  'round',
  'mod',
  'rem',
  
  // CSS Logical Properties Level 1 (2021-2022)
  'CSS_Logical_Properties',
  'margin-inline',
  'margin-block',
  'padding-inline',
  'padding-block',
  'border-inline',
  'border-block',
  
  // CSS Flexbox Gap (2021)
  'gap',
  'row-gap',
  'column-gap',
  
  // CSS aspect-ratio (2021)
  'aspect-ratio',
  
  // CSS text-decoration-thickness (2021)
  'text-decoration-thickness',
  'text-underline-offset',
  
  // CSS backdrop-filter wider support (2021-2022)
  'backdrop-filter',
  
  // CSS font-variant-* properties (2021-2023)
  'font-variant-alternates',
  'font-variant-east-asian',
  'font-variant-ligatures',
  
  // CSS overscroll-behavior (2021)
  'overscroll-behavior',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  
  // CSS scroll-behavior: smooth (2021)
  'scroll-behavior',
  
  // CSS conic-gradient (2021)
  'conic-gradient',
  
  // CSS image-set() (2021-2022)
  'image-set',
  
  // CSS env() function (2021-2022)
  'env',
  
  // CSS prefers-* media queries (2021-2023)
  'prefers-color-scheme',
  'prefers-reduced-motion',
  'prefers-contrast',
  'prefers-reduced-transparency',
  
  // CSS forced-colors (2022)
  'forced-colors',
  
  // CSS light-dark() function (2024)
  'light-dark',
  
  // CSS anchor positioning (2024)
  'CSS_Anchor_Positioning',
  'anchor',
  'position-anchor',
  'anchor-name',
  
  // CSS view-transition-name (2023-2024)
  'view-transition-name',
  'view-transition-class'
];

/**
 * Fetches MDN documentation using context7 MCP
 */
async function fetchMDNWithContext7(topic: string): Promise<Context7Response | null> {
  try {
    // This would be the actual context7 integration
    // For now, we'll simulate the response structure
    const mdnUrl = `https://developer.mozilla.org/en-US/docs/Web/CSS/${topic}`;
    
    // Simulate context7 response with structured MDN data
    // In real implementation, this would use the actual context7 MCP
    const simulatedResponse: Context7Response = {
      content: await simulateContext7Response(topic),
      metadata: {
        title: `CSS: ${topic}`,
        lastModified: new Date().toISOString(),
        browserSupport: {}
      }
    };
    
    return simulatedResponse;
  } catch (error) {
    console.warn(`Failed to fetch ${topic} from context7:`, error);
    return null;
  }
}

/**
 * Simulates context7 response for development
 * In production, this would be replaced with actual context7 integration
 */
async function simulateContext7Response(topic: string): Promise<string> {
  // This simulates structured MDN content that context7 would provide
  const mockResponses: Record<string, string> = {
    'CSS_Container_Queries': `
Container queries allow you to apply styles based on the size of a containing element rather than the viewport.

## Properties:
- container-type: Sets the type of containment for container queries
- container-name: Establishes container query names
- container: Shorthand for container-type and container-name

## Browser Support:
Chrome 105+, Firefox 110+, Safari 16+

## Examples:
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
    `,
    'subgrid': `
CSS Subgrid allows grid items to participate in the sizing of their parent grid.

## Properties:
- grid-template-columns: subgrid
- grid-template-rows: subgrid

## Browser Support:
Firefox 71+, Safari 16+, Chrome 117+

## Examples:
.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
    `,
    'color-mix': `
The color-mix() function mixes two colors in a specified color space.

## Properties:
- color-mix()

## Browser Support:
Chrome 111+, Firefox 113+, Safari 16.2+

## Examples:
.element {
  background-color: color-mix(in srgb, red 50%, blue);
  color: color-mix(in oklch, var(--primary) 80%, white);
}
    `,
    'dvh': `
Dynamic viewport units adjust to the actual viewport size, accounting for mobile browser UI.

## Properties:
- dvh (dynamic viewport height)
- dvw (dynamic viewport width)
- svh (small viewport height)
- svw (small viewport width)
- lvh (large viewport height)
- lvw (large viewport width)

## Browser Support:
Chrome 108+, Firefox 101+, Safari 15.4+

## Examples:
.hero {
  height: 100dvh; /* Adjusts for mobile browser UI */
}

.sidebar {
  min-height: 100svh; /* Small viewport height */
}
    `,
    'scroll-timeline': `
Scroll-driven animations allow CSS animations to be driven by scroll progress.

## Properties:
- scroll-timeline
- scroll-timeline-name
- scroll-timeline-axis
- animation-timeline

## Browser Support:
Chrome 115+ (experimental), Firefox (experimental)

## Examples:
.progress {
  scroll-timeline: --page-scroll block;
}

.indicator {
  animation: grow 1s linear;
  animation-timeline: --page-scroll;
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
    `,
    ':has': `
The :has() pseudo-class represents elements that contain specific descendants.

## Selectors:
- :has()

## Browser Support:
Chrome 105+, Firefox 121+, Safari 15.4+

## Examples:
/* Style cards that contain images */
.card:has(img) {
  border: 2px solid blue;
}

/* Style forms with invalid inputs */
form:has(input:invalid) {
  border-color: red;
}

/* Parent styling based on child state */
article:has(h2) {
  margin-top: 2rem;
}
    `,
    'CSS_Nesting': `
CSS Nesting allows writing nested CSS rules, similar to preprocessors.

## Browser Support:
Chrome 112+, Firefox 117+, Safari 16.5+

## Examples:
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  
  & h2 {
    margin-top: 0;
    color: #333;
  }
  
  & .content {
    margin: 1rem 0;
    
    & p {
      line-height: 1.6;
    }
  }
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}
    `,
    'accent-color': `
The accent-color property allows customizing the accent color of form controls.

## Properties:
- accent-color

## Browser Support:
Chrome 93+, Firefox 92+, Safari 15.4+

## Examples:
:root {
  accent-color: #007acc;
}

input[type="checkbox"] {
  accent-color: green;
}

input[type="radio"] {
  accent-color: red;
}
    `,
    'aspect-ratio': `
The aspect-ratio property sets the preferred aspect ratio for an element.

## Properties:
- aspect-ratio

## Browser Support:
Chrome 88+, Firefox 89+, Safari 15+

## Examples:
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square {
  aspect-ratio: 1;
  width: 200px;
}

.golden-ratio {
  aspect-ratio: 1.618;
}
    `,
    'backdrop-filter': `
The backdrop-filter property applies graphical effects to the area behind an element.

## Properties:
- backdrop-filter

## Browser Support:
Chrome 76+, Firefox 103+, Safari 9+

## Examples:
.glass {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

.frosted {
  backdrop-filter: blur(5px) saturate(180%);
}
    `
  };

  return mockResponses[topic] || `No documentation found for ${topic}`;
}

/**
 * Categorizes a CSS feature based on its content and properties
 */
function categorizeCSSFeature(name: string, content: string, properties: string[]): CSSFeatureCategory {
  const lowerContent = content.toLowerCase();
  const lowerName = name.toLowerCase();
  
  // Check each category pattern
  for (const [category, patterns] of Object.entries(DISCOVERY_PATTERNS)) {
    const keywordMatch = patterns.keywords.some(keyword => 
      lowerContent.includes(keyword) || lowerName.includes(keyword)
    );
    
    const propertyMatch = patterns.properties.some(prop => 
      properties.some(p => p.toLowerCase().includes(prop.toLowerCase()))
    );
    
    if (keywordMatch || propertyMatch) {
      return category as CSSFeatureCategory;
    }
  }
  
  // Default categorization based on common patterns
  if (lowerContent.includes('container') || lowerContent.includes('query')) {
    return CSSFeatureCategory.RESPONSIVE;
  }
  if (lowerContent.includes('animation') || lowerContent.includes('scroll')) {
    return CSSFeatureCategory.ANIMATION;
  }
  if (lowerContent.includes('color') || lowerContent.includes('backdrop')) {
    return CSSFeatureCategory.VISUAL;
  }
  if (lowerContent.includes('grid') || lowerContent.includes('flex') || lowerContent.includes('layout')) {
    return CSSFeatureCategory.LAYOUT;
  }
  
  return CSSFeatureCategory.VISUAL; // Default fallback
}

/**
 * Extracts CSS properties from MDN content
 */
function extractCSSProperties(content: string): string[] {
  const properties: string[] = [];
  
  // Extract from ## Properties: sections
  const propertySection = content.match(/## Properties:?\s*([\s\S]*?)(?=\n##|\n\n|$)/i);
  if (propertySection) {
    const propertyMatches = propertySection[1].match(/^\s*-\s*([a-zA-Z-]+)/gm);
    if (propertyMatches) {
      properties.push(...propertyMatches.map(match => match.replace(/^\s*-\s*/, '')));
    }
  }
  
  // Extract from ## Selectors: sections
  const selectorSection = content.match(/## Selectors:?\s*([\s\S]*?)(?=\n##|\n\n|$)/i);
  if (selectorSection) {
    const selectorMatches = selectorSection[1].match(/^\s*-\s*([a-zA-Z:()_-]+)/gm);
    if (selectorMatches) {
      properties.push(...selectorMatches.map(match => match.replace(/^\s*-\s*/, '')));
    }
  }
  
  // Extract from code examples
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  for (const block of codeBlocks) {
    const cssProps = block.match(/([a-zA-Z-]+)\s*:/g);
    if (cssProps) {
      properties.push(...cssProps.map(prop => prop.replace(':', '').trim()));
    }
  }
  
  return [...new Set(properties)]; // Remove duplicates
}

/**
 * Determines browser support level from MDN content
 */
function determineSupportLevel(content: string): 'excellent' | 'good' | 'moderate' | 'limited' | 'experimental' {
  const supportSection = content.match(/## Browser Support:?\s*([\s\S]*?)(?=\n##|\n\n|$)/i);
  if (!supportSection) return 'experimental';
  
  const support = supportSection[1].toLowerCase();
  
  // Check for experimental indicators
  if (support.includes('experimental') || support.includes('behind flag') || support.includes('draft')) {
    return 'experimental';
  }
  
  // Count major browsers with support
  const browsers = ['chrome', 'firefox', 'safari', 'edge'];
  const supportedBrowsers = browsers.filter(browser => {
    const regex = new RegExp(`${browser}\\s*\\d+`, 'i');
    return regex.test(support);
  });
  
  const supportRatio = supportedBrowsers.length / browsers.length;
  
  if (supportRatio >= 0.75) return 'excellent';
  if (supportRatio >= 0.5) return 'good';
  if (supportRatio >= 0.25) return 'moderate';
  return 'limited';
}

/**
 * Discovers and categorizes recent CSS features from MDN
 */
export async function discoverRecentCSSFeatures(): Promise<DiscoveredFeature[]> {
  const discoveredFeatures: DiscoveredFeature[] = [];
  
  console.log('🔍 Discovering recent CSS features from MDN...');
  
  for (const feature of RECENT_CSS_FEATURES_TO_DISCOVER) {
    try {
      console.log(`📡 Fetching ${feature}...`);
      const response = await fetchMDNWithContext7(feature);
      
      if (!response) {
        console.warn(`⚠️ No data found for ${feature}`);
        continue;
      }
      
      const properties = extractCSSProperties(response.content);
      const category = categorizeCSSFeature(feature, response.content, properties);
      const supportLevel = determineSupportLevel(response.content);
      
      const discoveredFeature: DiscoveredFeature = {
        name: feature.replace(/_/g, ' '),
        properties: properties.length > 0 ? properties : [feature],
        description: response.content.split('\n')[0] || `CSS feature: ${feature}`,
        category,
        support_level: supportLevel,
        mdn_url: `https://developer.mozilla.org/en-US/docs/Web/CSS/${feature}`,
        year_introduced: 2021 // We could extract this from MDN content
      };
      
      discoveredFeatures.push(discoveredFeature);
      console.log(`✅ Discovered ${feature} -> ${category} (${supportLevel})`);
      
    } catch (error) {
      console.error(`❌ Error discovering ${feature}:`, error);
    }
  }
  
  console.log(`🎉 Discovered ${discoveredFeatures.length} CSS features`);
  return discoveredFeatures;
}

/**
 * Converts discovered features to the standard CSSFeature format
 */
export function convertToStandardFeatures(discoveredFeatures: DiscoveredFeature[]): Record<string, CSSFeature> {
  const features: Record<string, CSSFeature> = {};
  
  for (const discovered of discoveredFeatures) {
    const key = discovered.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    
    features[key] = {
      name: discovered.name,
      category: discovered.category,
      properties: discovered.properties,
      description: discovered.description,
      support_level: discovered.support_level,
      mdn_url: discovered.mdn_url
    };
  }
  
  return features;
}

/**
 * Main function to discover and integrate recent CSS features
 */
export async function updateCSSFeaturesFromMDN(): Promise<Record<string, CSSFeature>> {
  try {
    console.log('🚀 Starting automated CSS feature discovery...');
    
    const discoveredFeatures = await discoverRecentCSSFeatures();
    const standardFeatures = convertToStandardFeatures(discoveredFeatures);
    
    console.log(`📊 Successfully integrated ${Object.keys(standardFeatures).length} features`);
    
    // Log categorization summary
    const categorySummary: Record<string, number> = {};
    Object.values(standardFeatures).forEach(feature => {
      categorySummary[feature.category] = (categorySummary[feature.category] || 0) + 1;
    });
    
    console.log('📋 Feature categorization summary:');
    Object.entries(categorySummary).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} features`);
    });
    
    return standardFeatures;
    
  } catch (error) {
    console.error('❌ Failed to discover CSS features:', error);
    return {};
  }
}