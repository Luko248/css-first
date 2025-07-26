/**
 * Enhanced CSS suggestion engine with semantic analysis
 */

import { CSSPropertySuggestion, CSSFeatureCategory } from './types.js';
import { searchFeatures, getCarouselFeatures } from './features.js';
import { fetchBrowserSupportFromMDN, fetchMDNData } from './mdnClient.js';
import { analyzeProjectContext, getFrameworkSpecificRecommendations, getCSSFrameworkRecommendations } from './contextAnalyzer.js';

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
 * Legacy keyword extraction for backward compatibility
 */
function extractLegacyKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  // Layout keywords
  if (lowerDescription.includes('center') || lowerDescription.includes('align')) {
    keywords.push('center', 'align', 'justify', 'logical-spacing');
  }
  
  // Spacing keywords
  if (lowerDescription.includes('padding') || lowerDescription.includes('margin') || lowerDescription.includes('spacing')) {
    keywords.push('logical-spacing', 'spacing-units', 'padding', 'margin');
  }
  
  // Border keywords
  if (lowerDescription.includes('border') || lowerDescription.includes('outline')) {
    keywords.push('border-logical', 'border');
  }
  
  // Overflow keywords
  if (lowerDescription.includes('overflow') || lowerDescription.includes('scroll') || lowerDescription.includes('clip')) {
    keywords.push('overflow-logical', 'overflow');
  }
  
  // Carousel-specific keywords
  if (lowerDescription.includes('carousel') || lowerDescription.includes('slider') || lowerDescription.includes('gallery')) {
    keywords.push('carousel', 'scroll', 'snap', 'overflow');
  }
  
  // Animation keywords
  if (lowerDescription.includes('animate') || lowerDescription.includes('transition') || lowerDescription.includes('smooth')) {
    keywords.push('animation', 'transition', 'transform');
  }
  
  // Layout keywords
  if (lowerDescription.includes('layout') || lowerDescription.includes('grid') || lowerDescription.includes('flex')) {
    keywords.push('layout', 'grid', 'flex');
  }
  
  // Responsive keywords
  if (lowerDescription.includes('responsive') || lowerDescription.includes('mobile') || lowerDescription.includes('tablet')) {
    keywords.push('responsive', 'media', 'container');
  }
  
  return keywords;
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
  for (const category of analysis.suggestedCategories) {
    const categoryFeatures = searchFeatures(analysis.keywords);
    
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
  
  // Sort by relevance score
  return suggestions
    .sort((a, b) => ((b as any).relevanceScore || 0) - ((a as any).relevanceScore || 0))
    .slice(0, 5);
}

/**
 * Calculate relevance score for intelligent ranking
 */
function calculateRelevanceScore(
  feature: any,
  analysis: any,
  projectContext?: any
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
 * Gets syntax example for a CSS feature
 */
function getFeatureSyntax(featureName: string): string {
  const syntaxMap: Record<string, string> = {
    'Logical Spacing Properties': `
.element {
  padding-inline: 1rem;
  padding-block: 0.5rem;
  margin-inline: auto;
  margin-block: 1rem;
  scroll-margin-inline: 1rem;
}

/* Fine-grained control */
.asymmetric {
  padding-inline-start: 2rem;
  padding-inline-end: 1rem;
  margin-block-start: 2rem;
}`,
    'Modern CSS Units': `
.container {
  width: 60ch;
  padding: 1rem;
  margin-inline: auto;
  height: 100vh;
}

.responsive {
  width: clamp(16rem, 50vw, 60rem);
  padding: 1rem 2rem;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}`,
    'Logical Border Properties': `
.element {
  border-inline: 1px solid #ccc;
  border-block-start: 2px solid blue;
}

.sidebar {
  border-inline-end: 1px solid var(--border-color);
  border-block: none;
}`,
    'Logical Overflow Properties': `
.horizontal-scroll {
  overflow-inline: scroll;
  overflow-block: hidden;
  scroll-snap-type: inline mandatory;
}

.text-content {
  overflow-wrap: break-word;
  text-overflow: ellipsis;
}`,
    'Modern CSS Carousel with Pseudo-Elements': `
.carousel {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
}
.carousel::scroll-button(inline-start),
.carousel::scroll-button(inline-end) {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
}
.carousel::scroll-marker-group {
  position: absolute;
  bottom: -40px;
  display: flex;
  gap: 8px;
}
.carousel::scroll-marker {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
}
.carousel::scroll-marker:target-current {
  background: #007bff;
}`,
    'CSS Carousel': `
.carousel {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  display: flex;
}
.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: center;
}`,
    'Scroll Snap': `
.container {
  scroll-snap-type: x mandatory;
}
.item {
  scroll-snap-align: center;
}`,
    'Flexbox': `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    'CSS Grid': `
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,
    'CSS Transitions': `
.element {
  transition: all 0.3s ease;
}
.element:hover {
  transform: scale(1.05);
}`
  };
  
  return syntaxMap[featureName] || `${featureName}: value;`;
}

/**
 * Gets use cases for a CSS feature
 */
function getFeatureUseCases(featureName: string): string[] {
  const useCasesMap: Record<string, string[]> = {
    'Logical Spacing Properties': [
      'International layouts with RTL support',
      'Responsive spacing that adapts to writing direction',
      'Accessible spacing with relative units',
      'Scroll-aware spacing for carousels',
      'Direction-agnostic component design'
    ],
    'Modern CSS Units': [
      'Responsive typography with rem/em',
      'Content-aware sizing with ch units',
      'Viewport-based responsive layouts',
      'Logical viewport units for mobile',
      'Accessible spacing with relative units'
    ],
    'Logical Border Properties': [
      'International border styling',
      'Direction-aware component borders',
      'Responsive border designs',
      'Accessible focus indicators',
      'Dynamic border styling'
    ],
    'Logical Overflow Properties': [
      'Direction-aware scrolling',
      'International text overflow handling',
      'Responsive overflow management',
      'Accessible scrolling experiences',
      'Dynamic content clipping'
    ],
    'Modern CSS Carousel with Pseudo-Elements': [
      'Auto-generated carousel navigation',
      'Accessible carousel indicators',
      'Column-based content sliders',
      'Zero-JavaScript carousels',
      'Progressive enhancement carousels'
    ],
    'CSS Carousel': [
      'Image galleries',
      'Product showcases',
      'Testimonial sliders',
      'Content carousels',
      'Mobile-friendly navigation'
    ],
    'Scroll Snap': [
      'Smooth scrolling sections',
      'Paginated content',
      'Mobile carousels',
      'Full-screen slides'
    ],
    'Flexbox': [
      'Component layout',
      'Centering content',
      'Responsive navigation',
      'Card layouts'
    ],
    'CSS Grid': [
      'Page layouts',
      'Complex grids',
      'Responsive designs',
      'Dashboard layouts'
    ],
    'CSS Transitions': [
      'Hover effects',
      'Smooth state changes',
      'Loading animations',
      'Interactive feedback'
    ]
  };
  
  return useCasesMap[featureName] || ['General styling', 'UI enhancement'];
}