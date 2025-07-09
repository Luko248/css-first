/**
 * Service for MDN API integration and CSS property management
 *
 * This service has been restructured into smaller, more focused modules:
 * - css/types.ts: Type definitions
 * - css/features.ts: CSS feature database and categorization
 * - css/suggestions.ts: CSS suggestion engine
 * - css/mdnClient.ts: MDN API client
 * - css/guidance.ts: Implementation guidance
 */

// Re-export all CSS services for backward compatibility
export * from "./css/index.js";

// Legacy exports for backward compatibility
export {
  type CSSPropertySuggestion,
  type BrowserSupportInfo,
  type CSSPropertyDetails,
  type ImplementationGuidance,
} from "./css/types.js";

export {
  extractCSSKeywords,
  searchMDNForCSSProperties,
} from "./css/suggestions.js";

export {
  fetchMDNPage,
  fetchBrowserSupportFromMDN,
  fetchCSSPropertyDetailsFromMDN,
} from "./css/mdnClient.js";

export {
  generateBrowserSupportRecommendation,
  getAlternativeCSSProperties,
  getImplementationGuidance,
} from "./css/guidance.js";
