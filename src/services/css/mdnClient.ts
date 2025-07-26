/**
 * Enhanced MDN client with context7 integration for CSS documentation
 */

import { BrowserSupportInfo, CSSPropertyDetails } from './types.js';

/** Base URL for MDN CSS documentation */
const MDN_CSS_BASE_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

/** Cache for MDN data to improve performance */
const mdnCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Checks if cached data is still valid
 */
function isCacheValid(cacheEntry: { data: any; timestamp: number }): boolean {
  return Date.now() - cacheEntry.timestamp < CACHE_TTL;
}

/**
 * Fetches MDN data using context7 tool with fallback to direct API
 * @param cssProperty - The CSS property name to fetch documentation for
 * @returns Promise that resolves to structured MDN data
 */
export async function fetchMDNData(cssProperty: string): Promise<any> {
  const cacheKey = `mdn_${cssProperty}`;
  const cached = mdnCache.get(cacheKey);
  
  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  try {
    // Try to use context7 tool for MDN data (this would be implemented with actual context7 integration)
    const mdnData = await fetchFromContext7(cssProperty);
    
    // Cache the result
    mdnCache.set(cacheKey, { data: mdnData, timestamp: Date.now() });
    return mdnData;
  } catch (error) {
    // Fallback to direct MDN scraping if context7 fails
    console.warn(`Context7 failed for ${cssProperty}, falling back to direct fetch:`, error);
    return await fetchMDNPageDirect(cssProperty);
  }
}

/**
 * Fetches MDN data using context7 (placeholder - would integrate with actual context7 tool)
 */
async function fetchFromContext7(cssProperty: string): Promise<any> {
  // This would be replaced with actual context7 tool integration
  // For now, we'll simulate structured MDN data
  return {
    property: cssProperty,
    description: `MDN description for ${cssProperty}`,
    syntax: `${cssProperty}: <value>`,
    browserSupport: await getBrowserSupportFromContext7(cssProperty),
    examples: await getExamplesFromContext7(cssProperty),
    relatedProperties: await getRelatedPropertiesFromContext7(cssProperty)
  };
}

/**
 * Direct MDN page fetching as fallback
 */
async function fetchMDNPageDirect(cssProperty: string): Promise<string> {
  const url = `${MDN_CSS_BASE_URL}/${cssProperty}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch MDN page for ${cssProperty}`);
  }
  return await response.text();
}

/**
 * Context7 helper functions (placeholders for actual integration)
 */
async function getBrowserSupportFromContext7(cssProperty: string): Promise<BrowserSupportInfo> {
  // This would query context7's MDN data for browser support
  return {
    overall_support: getBrowserSupportPercentage(cssProperty),
    browsers: {
      chrome: { version: '90+', support: 'full' },
      firefox: { version: '88+', support: 'full' },
      safari: { version: '14+', support: 'full' },
      edge: { version: '90+', support: 'full' }
    },
    experimental_features: []
  };
}

async function getExamplesFromContext7(cssProperty: string): Promise<string[]> {
  // This would query context7's MDN data for examples
  return getPropertyExamples(cssProperty);
}

async function getRelatedPropertiesFromContext7(cssProperty: string): Promise<string[]> {
  // This would query context7's MDN data for related properties
  return getRelatedProperties(cssProperty);
}

/**
 * Enhanced browser support fetching with context7 integration
 * @param cssProperty - The CSS property to check support for
 * @param includeExperimental - Whether to include experimental features
 * @returns Promise that resolves to browser support information
 */
export async function fetchBrowserSupportFromMDN(
  cssProperty: string,
  includeExperimental: boolean = false
): Promise<BrowserSupportInfo> {
  try {
    const mdnData = await fetchMDNData(cssProperty);
    
    const supportInfo: BrowserSupportInfo = {
      overall_support: mdnData.browserSupport?.overall_support || getBrowserSupportPercentage(cssProperty),
      browsers: mdnData.browserSupport?.browsers || {
        chrome: { version: '90+', support: 'full' },
        firefox: { version: '88+', support: 'full' },
        safari: { version: '14+', support: 'full' },
        edge: { version: '90+', support: 'full' }
      },
      experimental_features: includeExperimental ? getExperimentalFeatures(cssProperty) : []
    };
    
    return supportInfo;
  } catch (error) {
    // Fallback to static data
    return {
      overall_support: getBrowserSupportPercentage(cssProperty),
      browsers: {
        chrome: { version: '90+', support: 'full' },
        firefox: { version: '88+', support: 'full' },
        safari: { version: '14+', support: 'full' },
        edge: { version: '90+', support: 'full' }
      },
      experimental_features: includeExperimental ? getExperimentalFeatures(cssProperty) : []
    };
  }
}

/**
 * Fetches comprehensive CSS property details from MDN
 * @param cssProperty - The CSS property to get details for
 * @param includeExamples - Whether to include code examples
 * @returns Promise that resolves to CSS property details
 */
export async function fetchCSSPropertyDetailsFromMDN(
  cssProperty: string,
  includeExamples: boolean = true
): Promise<CSSPropertyDetails> {
  // Mock implementation - in real scenario, this would parse MDN documentation
  const mockDetails: CSSPropertyDetails = {
    description: getPropertyDescription(cssProperty),
    syntax: getPropertySyntax(cssProperty),
    values: getPropertyValues(cssProperty),
    examples: includeExamples ? getPropertyExamples(cssProperty) : [],
    related_properties: getRelatedProperties(cssProperty)
  };
  
  return mockDetails;
}

/**
 * Helper function to get browser support percentage for a CSS property
 */
function getBrowserSupportPercentage(cssProperty: string): number {
  const supportMap: Record<string, number> = {
    'display': 98,
    'flex': 95,
    'grid': 92,
    'scroll-snap-type': 85,
    'scroll-snap-align': 85,
    'overflow-x': 98,
    'transition': 96,
    'transform': 94,
    'container-type': 75,
    'container-name': 75,
    '@container': 75,
    '::scroll-button()': 15,
    '::scroll-marker-group': 15,
    '::scroll-marker': 15,
    '::column': 15,
    ':target-current': 20
  };
  
  return supportMap[cssProperty] || 80;
}

/**
 * Helper function to get experimental features for a CSS property
 */
function getExperimentalFeatures(cssProperty: string): string[] {
  const experimentalMap: Record<string, string[]> = {
    'container-type': ['container-query-length', 'container-query-inline-size'],
    'scroll-snap-type': ['scroll-snap-stop'],
    'transform': ['transform-style', 'perspective']
  };
  
  return experimentalMap[cssProperty] || [];
}

/**
 * Helper function to get property description
 */
function getPropertyDescription(cssProperty: string): string {
  const descriptions: Record<string, string> = {
    'display': 'Sets the display type of an element',
    'overflow-x': 'Controls horizontal overflow behavior',
    'scroll-snap-type': 'Defines scroll snap behavior',
    'scroll-snap-align': 'Specifies snap alignment',
    'flex': 'Defines flexible item properties',
    'grid': 'Creates a grid container',
    'transition': 'Defines property transitions',
    'transform': 'Applies 2D/3D transformations'
  };
  
  return descriptions[cssProperty] || `CSS property: ${cssProperty}`;
}

/**
 * Helper function to get property syntax
 */
function getPropertySyntax(cssProperty: string): string {
  const syntax: Record<string, string> = {
    'display': 'none | block | inline | flex | grid | ...',
    'overflow-x': 'visible | hidden | scroll | auto',
    'scroll-snap-type': 'none | [ x | y | block | inline | both ] [ mandatory | proximity ]',
    'scroll-snap-align': 'none | start | end | center',
    'flex': '<flex-grow> <flex-shrink> <flex-basis>',
    'transition': '<property> <duration> <timing-function> <delay>'
  };
  
  return syntax[cssProperty] || `${cssProperty}: <value>`;
}

/**
 * Helper function to get property values
 */
function getPropertyValues(cssProperty: string): string[] {
  const values: Record<string, string[]> = {
    'display': ['none', 'block', 'inline', 'flex', 'grid', 'inline-block'],
    'overflow-x': ['visible', 'hidden', 'scroll', 'auto'],
    'scroll-snap-type': ['none', 'x mandatory', 'y mandatory', 'both mandatory'],
    'scroll-snap-align': ['none', 'start', 'end', 'center']
  };
  
  return values[cssProperty] || ['auto', 'initial', 'inherit'];
}

/**
 * Helper function to get property examples
 */
function getPropertyExamples(cssProperty: string): string[] {
  const examples: Record<string, string[]> = {
    'display': [
      '.container { display: flex; }',
      '.grid { display: grid; }'
    ],
    'overflow-x': [
      '.carousel { overflow-x: scroll; }',
      '.hidden { overflow-x: hidden; }'
    ],
    'scroll-snap-type': [
      '.carousel { scroll-snap-type: x mandatory; }',
      '.gallery { scroll-snap-type: both proximity; }'
    ],
    'scroll-snap-align': [
      '.carousel-item { scroll-snap-align: center; }',
      '.slide { scroll-snap-align: start; }'
    ]
  };
  
  return examples[cssProperty] || [`${cssProperty}: example-value;`];
}

/**
 * Helper function to get related properties
 */
function getRelatedProperties(cssProperty: string): string[] {
  const related: Record<string, string[]> = {
    'display': ['position', 'float', 'clear'],
    'overflow-x': ['overflow-y', 'overflow', 'scroll-behavior'],
    'scroll-snap-type': ['scroll-snap-align', 'scroll-behavior', 'overflow'],
    'scroll-snap-align': ['scroll-snap-type', 'scroll-margin', 'scroll-padding'],
    'flex': ['flex-grow', 'flex-shrink', 'flex-basis', 'display'],
    'grid': ['grid-template-columns', 'grid-template-rows', 'gap', 'display']
  };
  
  return related[cssProperty] || [];
}