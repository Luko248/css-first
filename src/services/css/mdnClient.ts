/**
 * MDN API client for fetching CSS documentation
 */

import { BrowserSupportInfo, CSSPropertyDetails } from './types.js';

/** Base URL for MDN CSS documentation */
const MDN_CSS_BASE_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

/**
 * Fetches an MDN page for a specific CSS property
 * @param cssProperty - The CSS property name to fetch documentation for
 * @returns Promise that resolves to the HTML content of the MDN page
 * @throws Error if the MDN page cannot be fetched
 */
export async function fetchMDNPage(cssProperty: string): Promise<string> {
  const url = `${MDN_CSS_BASE_URL}/${cssProperty}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch MDN page for ${cssProperty}`);
  }
  return await response.text();
}

/**
 * Fetches browser support information for a CSS property from MDN
 * @param cssProperty - The CSS property to check support for
 * @param includeExperimental - Whether to include experimental features
 * @returns Promise that resolves to browser support information
 */
export async function fetchBrowserSupportFromMDN(
  cssProperty: string,
  includeExperimental: boolean = false
): Promise<BrowserSupportInfo> {
  // Mock implementation - in real scenario, this would parse MDN's browser compatibility data
  const mockSupport: BrowserSupportInfo = {
    overall_support: getBrowserSupportPercentage(cssProperty),
    browsers: {
      chrome: { version: '90+', support: 'full' },
      firefox: { version: '88+', support: 'full' },
      safari: { version: '14+', support: 'full' },
      edge: { version: '90+', support: 'full' }
    },
    experimental_features: includeExperimental ? getExperimentalFeatures(cssProperty) : []
  };
  
  return mockSupport;
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
    '@container': 75
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