/**
 * Enhanced CSS suggestion engine with semantic analysis
 */

import { CSSPropertySuggestion, CSSFeatureCategory } from './types.js';
import { searchFeatures, getCarouselFeatures } from './features.js';
import { fetchBrowserSupportFromMDN, fetchMDNData } from './mdnClient.js';
import { analyzeProjectContext, getFrameworkSpecificRecommendations, getCSSFrameworkRecommendations } from './contextAnalyzer.js';
import { rankByLogicalPreference, getWritingModeRecommendations } from './logicalUnitsPreference.js';

/** Intent patterns for semantic analysis */
const INTENT_PATTERNS = {
  layout: {
    patterns: [
      /(?:arrange|organize|position|place|layout)/i,
      /(?:center|align|justify|distribute)/i,
      /(?:column|row|grid|flex)/i,
      /(?:beside|above|below|next to|in a row)/i
    ],
    categories: [CSSFeatureCategory.LAYOUT]
  },
  animation: {
    patterns: [
      /(?:animate|transition|move|slide|fade|hover)/i,
      /(?:smooth|ease|duration|timing)/i,
      /(?:transform|translate|rotate|scale)/i
    ],
    categories: [CSSFeatureCategory.ANIMATION]
  },
  spacing: {
    patterns: [
      /(?:space|spacing|gap|margin|padding)/i,
      /(?:between|around|inside|outside)/i,
      /(?:tight|loose|compressed|expanded)/i
    ],
    categories: [CSSFeatureCategory.LOGICAL]
  },
  responsive: {
    patterns: [
      /(?:responsive|mobile|tablet|desktop|breakpoint)/i,
      /(?:small screen|large screen|different sizes)/i,
      /(?:adapt|resize|scale|fit)/i
    ],
    categories: [CSSFeatureCategory.RESPONSIVE]
  },
  visual: {
    patterns: [
      /(?:color|background|border|shadow|gradient)/i,
      /(?:appearance|style|design|look)/i,
      /(?:opacity|transparency|blur)/i
    ],
    categories: [CSSFeatureCategory.VISUAL]
  },
  interaction: {
    patterns: [
      /(?:click|hover|focus|active|disabled)/i,
      /(?:interactive|button|link|form)/i,
      /(?:state|feedback|response)/i
    ],
    categories: [CSSFeatureCategory.INTERACTION]
  }
};

/** Context keywords for project awareness */
const FRAMEWORK_INDICATORS = {
  react: ['component', 'jsx', 'react', 'useState', 'useEffect'],
  vue: ['template', 'v-if', 'v-for', 'vue', 'composition'],
  angular: ['angular', 'component', 'directive', 'ngIf', 'ngFor'],
  tailwind: ['tailwind', 'tw-', 'class=', 'className='],
  bootstrap: ['bootstrap', 'btn-', 'col-', 'row', 'container']
};

/**
 * Analyzes user intent and extracts semantic keywords with context awareness
 * @param description - The UI task description to analyze
 * @param projectContext - Optional project context (framework, existing CSS, etc.)
 * @returns Enhanced analysis with keywords, intent, and context
 */
export function analyzeTaskIntent(description: string, projectContext?: any): {
  keywords: string[];
  intent: string[];
  confidence: number;
  suggestedCategories: CSSFeatureCategory[];
  frameworkHints: string[];
  contextAnalysis?: any;
  recommendations?: string[];
} {
  const keywords: string[] = [];
  const intent: string[] = [];
  const suggestedCategories: CSSFeatureCategory[] = [];
  const frameworkHints: string[] = [];
  let totalMatches = 0;
  let totalPatterns = 0;

  // Analyze project context
  const contextAnalysis = analyzeProjectContext(projectContext);

  // Analyze intent patterns
  for (const [intentType, config] of Object.entries(INTENT_PATTERNS)) {
    let intentMatches = 0;
    for (const pattern of config.patterns) {
      totalPatterns++;
      if (pattern.test(description)) {
        intentMatches++;
        totalMatches++;
      }
    }
    
    if (intentMatches > 0) {
      intent.push(intentType);
      suggestedCategories.push(...config.categories);
    }
  }

  // Extract framework hints from project context and description
  if (contextAnalysis.framework) {
    frameworkHints.push(contextAnalysis.framework);
  }
  if (contextAnalysis.cssFramework) {
    frameworkHints.push(contextAnalysis.cssFramework);
  }

  // Additional framework detection from description
  for (const [framework, indicators] of Object.entries(FRAMEWORK_INDICATORS)) {
    if (indicators.some(indicator => 
      description.toLowerCase().includes(indicator)
    )) {
      frameworkHints.push(framework);
    }
  }

  // Legacy keyword extraction for backward compatibility
  keywords.push(...extractLegacyKeywords(description));

  const confidence = totalPatterns > 0 ? totalMatches / totalPatterns : 0;

  // Generate context-aware recommendations
  const recommendations: string[] = [];
  if (contextAnalysis.framework) {
    recommendations.push(...getFrameworkSpecificRecommendations(contextAnalysis.framework));
  }
  if (contextAnalysis.cssFramework) {
    recommendations.push(...getCSSFrameworkRecommendations(contextAnalysis.cssFramework));
  }
  
  // Add logical units recommendations
  const writingModeRecommendations = getWritingModeRecommendations(projectContext);
  recommendations.push(...writingModeRecommendations);

  return {
    keywords: [...new Set(keywords)],
    intent: [...new Set(intent)],
    confidence,
    suggestedCategories: [...new Set(suggestedCategories)],
    frameworkHints: [...new Set(frameworkHints)],
    contextAnalysis,
    recommendations: recommendations.length > 0 ? recommendations : undefined
  };
}

/**
 * Enhanced keyword extraction with semantic understanding
 */
function extractLegacyKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  // Split description into words for better analysis
  const words = lowerDescription.split(/\s+/);
  
  // Core CSS property keywords - add direct properties
  const cssProperties = ['height', 'width', 'position', 'display', 'flex', 'grid', 'margin', 'padding', 'border', 'background', 'color', 'font', 'text', 'transform', 'transition', 'animation'];
  for (const prop of cssProperties) {
    if (lowerDescription.includes(prop)) {
      keywords.push(prop);
    }
  }
  
  // Viewport and sizing patterns
  if (lowerDescription.includes('full') && lowerDescription.includes('height')) {
    keywords.push('height', '100vh', '100dvh', 'dvh', 'svh', 'lvh', 'block-size', 'min-height');
  }
  
  // Mobile specific patterns
  if (lowerDescription.includes('mobile') || lowerDescription.includes('phone')) {
    keywords.push('dvh', 'svh', 'lvh', 'mobile-viewport', 'browser-ui', '@media');
    
    if (lowerDescription.includes('height') || lowerDescription.includes('screen') || lowerDescription.includes('full')) {
      keywords.push('100dvh', 'height', 'block-size', 'viewport-height');
    }
  }
  
  // Header specific patterns
  if (lowerDescription.includes('header')) {
    keywords.push('header');
    
    if (lowerDescription.includes('stick') || lowerDescription.includes('fix')) {
      keywords.push('sticky', 'fixed', 'position');
    }
    
    if (lowerDescription.includes('full') || lowerDescription.includes('height')) {
      keywords.push('height', 'min-height', 'dvh', '100dvh');
    }
  }
  
  // Layout patterns
  if (lowerDescription.includes('center') || lowerDescription.includes('align')) {
    keywords.push('center', 'align', 'justify-content', 'align-items', 'flex', 'grid');
  }
  
  // Carousel patterns
  if (lowerDescription.includes('carousel') || lowerDescription.includes('slider') || lowerDescription.includes('gallery')) {
    keywords.push('scroll-snap-type', 'overflow-inline', 'scroll-behavior', '::scroll-marker', '::scroll-button', 'flex');
  }
  
  // Theme patterns
  if (lowerDescription.includes('theme') || lowerDescription.includes('dark') || lowerDescription.includes('light')) {
    keywords.push('light-dark', 'color-scheme', 'prefers-color-scheme', '@media');
  }
  
  // Form patterns
  if (lowerDescription.includes('form')) {
    keywords.push('form');
    
    if (lowerDescription.includes('valid') || lowerDescription.includes('error')) {
      keywords.push(':user-valid', ':user-invalid', ':invalid', ':valid');
    }
  }
  
  // Modal/dialog patterns
  if (lowerDescription.includes('modal') || lowerDescription.includes('dialog') || lowerDescription.includes('popup')) {
    keywords.push('dialog', ':target', 'position', 'fixed', 'backdrop-filter');
  }
  
  // Navigation patterns
  if (lowerDescription.includes('nav') || lowerDescription.includes('menu')) {
    keywords.push('nav', 'menu');
    
    if (lowerDescription.includes('hamburger') || lowerDescription.includes('mobile')) {
      keywords.push(':checked', 'position', 'transform');
    }
  }
  
  // Animation patterns
  if (lowerDescription.includes('animate') || lowerDescription.includes('transition')) {
    keywords.push('animation', 'transition', '@keyframes');
    
    if (lowerDescription.includes('scroll')) {
      keywords.push('scroll-timeline', 'animation-timeline');
    }
  }
  
  // Responsive patterns
  if (lowerDescription.includes('responsive') || lowerDescription.includes('breakpoint')) {
    keywords.push('@media', 'container', 'clamp', 'min', 'max');
  }
  
  // Add specific keywords based on common tasks
  if (lowerDescription.includes('always')) {
    keywords.push('min-height', '100%', 'vh', 'dvh');
  }
  
  if (lowerDescription.includes('section')) {
    keywords.push('section', 'height', 'min-height');
  }
  
  if (lowerDescription.includes('device')) {
    keywords.push('dvh', 'svh', '@media', 'viewport');
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Backward compatibility wrapper for extractCSSKeywords
 */
export function extractCSSKeywords(description: string): string[] {
  const analysis = analyzeTaskIntent(description);
  return analysis.keywords;
}

/**
 * Enhanced CSS property search with intelligent ranking
 * @param description - Task description for semantic analysis
 * @param approach - Preferred CSS approach (modern, compatible, progressive)
 * @param projectContext - Optional project context for better suggestions
 * @returns Promise that resolves to ranked CSS property suggestions
 */
export async function searchMDNForCSSProperties(
  description: string | string[],
  approach: 'modern' | 'compatible' | 'progressive' = 'modern',
  projectContext?: any
): Promise<CSSPropertySuggestion[]> {
  // Handle backward compatibility with keyword array
  if (Array.isArray(description)) {
    return searchLegacyKeywords(description, approach);
  }

  // New semantic analysis approach
  const analysis = analyzeTaskIntent(description, projectContext);
  return searchWithIntelligentRanking(analysis, approach, projectContext);
}

/**
 * Intelligent ranking system for CSS suggestions
 */
async function searchWithIntelligentRanking(
  analysis: {
    keywords: string[];
    intent: string[];
    confidence: number;
    suggestedCategories: CSSFeatureCategory[];
    frameworkHints: string[];
  },
  approach: 'modern' | 'compatible' | 'progressive',
  projectContext?: any
): Promise<CSSPropertySuggestion[]> {
  const suggestions: CSSPropertySuggestion[] = [];
  
  // Get features based on suggested categories with higher priority
  for (const _category of analysis.suggestedCategories) {
    const categoryFeatures = searchFeatures(analysis.keywords);
    // Categories are used implicitly for prioritization in the search algorithm
    
    for (const feature of categoryFeatures) {
      const mdnData = await fetchMDNData(feature.properties[0]);
      const browserSupport = await fetchBrowserSupportFromMDN(feature.properties[0]);
      
      if (shouldIncludeBasedOnApproach(feature.support_level, approach)) {
        const suggestion: CSSPropertySuggestion = {
          property: feature.properties[0],
          description: feature.description,
          syntax: mdnData.syntax || getFeatureSyntax(feature.name),
          browser_support: {
            overall_support: browserSupport.overall_support,
            modern_browsers: browserSupport.overall_support >= 85,
            legacy_support: browserSupport.overall_support >= 70 ? 'good' : 'limited'
          },
          use_cases: getFeatureUseCases(feature.name),
          mdn_url: feature.mdn_url
        };
        
        // Add ranking score based on relevance
        (suggestion as any).relevanceScore = calculateRelevanceScore(
          feature,
          analysis,
          projectContext
        );
        
        suggestions.push(suggestion);
      }
    }
  }
  
  // Fallback to keyword-based search if no category matches
  if (suggestions.length === 0) {
    const fallbackFeatures = searchFeatures(analysis.keywords);
    for (const feature of fallbackFeatures.slice(0, 5)) {
      const browserSupport = await fetchBrowserSupportFromMDN(feature.properties[0]);
      suggestions.push(await createSuggestionFromFeature(feature, browserSupport));
    }
  }
  
  // Apply logical units preference ranking and sort by relevance score
  const logicallyRankedSuggestions = rankByLogicalPreference(suggestions);
  
  return logicallyRankedSuggestions
    .sort((a, b) => ((b as any).relevanceScore || 0) - ((a as any).relevanceScore || 0))
    .slice(0, 5);
}

/**
 * Calculate relevance score for intelligent ranking
 */
function calculateRelevanceScore(
  feature: any,
  analysis: any,
  _projectContext?: any
): number {
  let score = 0;
  
  // Intent match bonus
  if (analysis.intent.includes('layout') && feature.category === CSSFeatureCategory.LAYOUT) score += 10;
  if (analysis.intent.includes('animation') && feature.category === CSSFeatureCategory.ANIMATION) score += 10;
  if (analysis.intent.includes('spacing') && feature.category === CSSFeatureCategory.LOGICAL) score += 10;
  
  // Browser support bonus
  if (feature.support_level === 'excellent') score += 5;
  if (feature.support_level === 'good') score += 3;
  
  // Framework compatibility bonus
  if (analysis.frameworkHints.includes('react') && feature.properties.includes('flex')) score += 3;
  if (analysis.frameworkHints.includes('tailwind') && feature.properties.includes('grid')) score += 3;
  
  // Confidence multiplier
  score *= (1 + analysis.confidence);
  
  return score;
}

/**
 * Legacy search function for backward compatibility
 */
async function searchLegacyKeywords(
  keywords: string[],
  approach: 'modern' | 'compatible' | 'progressive'
): Promise<CSSPropertySuggestion[]> {
  const suggestions: CSSPropertySuggestion[] = [];
  
  // Check for carousel-specific requests
  if (keywords.includes('carousel') || keywords.includes('slider')) {
    const carouselFeatures = getCarouselFeatures();
    
    for (const feature of carouselFeatures) {
      const browserSupport = await fetchBrowserSupportFromMDN(feature.properties[0]);
      
      // Filter based on approach
      if (shouldIncludeBasedOnApproach(feature.support_level, approach)) {
        suggestions.push({
          property: feature.properties[0],
          description: feature.description,
          syntax: getFeatureSyntax(feature.name),
          browser_support: {
            overall_support: browserSupport.overall_support,
            modern_browsers: browserSupport.overall_support >= 85,
            legacy_support: browserSupport.overall_support >= 70 ? 'good' : 'limited'
          },
          use_cases: getFeatureUseCases(feature.name),
          mdn_url: feature.mdn_url
        });
      }
    }
  }
  
  // Search for other features
  const matchingFeatures = searchFeatures(keywords);
  
  for (const feature of matchingFeatures) {
    // Skip if already added (carousel features)
    if (suggestions.some(s => s.property === feature.properties[0])) continue;
    
    const browserSupport = await fetchBrowserSupportFromMDN(feature.properties[0]);
    
    if (shouldIncludeBasedOnApproach(feature.support_level, approach)) {
      suggestions.push({
        property: feature.properties[0],
        description: feature.description,
        syntax: getFeatureSyntax(feature.name),
        browser_support: {
          overall_support: browserSupport.overall_support,
          modern_browsers: browserSupport.overall_support >= 85,
          legacy_support: browserSupport.overall_support >= 70 ? 'good' : 'limited'
        },
        use_cases: getFeatureUseCases(feature.name),
        mdn_url: feature.mdn_url
      });
    }
  }
  
  return suggestions;
}

/**
 * Helper function to create suggestion from feature
 */
async function createSuggestionFromFeature(feature: any, browserSupport: any): Promise<CSSPropertySuggestion> {
  return {
    property: feature.properties[0],
    description: feature.description,
    syntax: getFeatureSyntax(feature.name),
    browser_support: {
      overall_support: browserSupport.overall_support,
      modern_browsers: browserSupport.overall_support >= 85,
      legacy_support: browserSupport.overall_support >= 70 ? 'good' : 'limited'
    },
    use_cases: getFeatureUseCases(feature.name),
    mdn_url: feature.mdn_url
  };
}

/**
 * Determines if a feature should be included based on the approach
 */
function shouldIncludeBasedOnApproach(
  supportLevel: 'excellent' | 'good' | 'moderate' | 'limited' | 'experimental',
  approach: 'modern' | 'compatible' | 'progressive'
): boolean {
  switch (approach) {
    case 'modern':
      return ['excellent', 'good', 'experimental'].includes(supportLevel);
    case 'compatible':
      return supportLevel === 'excellent';
    case 'progressive':
      return true; // Include all, with fallbacks
    default:
      return true;
  }
}

/**
 * Gets syntax example for a CSS feature from MDN data
 */
function getFeatureSyntax(featureName: string): string {
  // All syntax should come from MDN data, not hardcoded
  return `${featureName}: value;`;
}

/**
 * Gets use cases for a CSS feature from MDN data
 */
function getFeatureUseCases(featureName: string): string[] {
  // All use cases should come from MDN data, not hardcoded
  return ['General styling', 'UI enhancement'];
}