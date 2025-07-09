/**
 * Type definitions for CSS property suggestions and browser support
 */

/**
 * Represents a CSS property suggestion with comprehensive information
 */
export interface CSSPropertySuggestion {
  /** The CSS property name */
  property: string;
  /** Human-readable description of the property */
  description: string;
  /** CSS syntax example */
  syntax: string;
  /** Browser support information */
  browser_support: {
    /** Overall browser support percentage */
    overall_support: number;
    /** Whether modern browsers support this property */
    modern_browsers: boolean;
    /** Level of legacy browser support */
    legacy_support: string;
  };
  /** Common use cases for this property */
  use_cases: string[];
  /** MDN documentation URL */
  mdn_url: string;
}

/**
 * Detailed browser support information for a CSS property
 */
export interface BrowserSupportInfo {
  /** Overall browser support percentage */
  overall_support: number;
  /** Browser-specific support information */
  browsers: {
    /** Chrome browser support */
    chrome: { version: string; support: string };
    /** Firefox browser support */
    firefox: { version: string; support: string };
    /** Safari browser support */
    safari: { version: string; support: string };
    /** Edge browser support */
    edge: { version: string; support: string };
  };
  /** List of experimental features */
  experimental_features: string[];
}

/**
 * Detailed information about a CSS property
 */
export interface CSSPropertyDetails {
  /** Property description */
  description: string;
  /** CSS syntax */
  syntax: string;
  /** Possible values */
  values: string[];
  /** Code examples */
  examples: string[];
  /** Related CSS properties */
  related_properties: string[];
}

/**
 * Implementation guidance for using a CSS property
 */
export interface ImplementationGuidance {
  /** Basic usage example */
  basic_usage: string;
  /** Best practices for using this property */
  best_practices: string[];
  /** Fallback strategies for older browsers */
  fallbacks: string[];
  /** Complete example code */
  example_code: string;
}

/**
 * CSS feature categories for better organization
 */
export enum CSSFeatureCategory {
  LAYOUT = 'layout',
  ANIMATION = 'animation',
  VISUAL = 'visual',
  TYPOGRAPHY = 'typography',
  RESPONSIVE = 'responsive',
  INTERACTION = 'interaction',
  ACCESSIBILITY = 'accessibility'
}

/**
 * CSS feature with category information
 */
export interface CSSFeature {
  /** Feature name */
  name: string;
  /** Category this feature belongs to */
  category: CSSFeatureCategory;
  /** Main CSS properties involved */
  properties: string[];
  /** Feature description */
  description: string;
  /** Browser support level */
  support_level: 'excellent' | 'good' | 'moderate' | 'limited';
  /** MDN documentation URL */
  mdn_url: string;
}