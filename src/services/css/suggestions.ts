/**
 * CSS suggestion engine for UI tasks
 */

import { CSSPropertySuggestion, CSSFeatureCategory } from './types.js';
import { searchFeatures, getCarouselFeatures } from './features.js';
import { fetchBrowserSupportFromMDN } from './mdnClient.js';

/**
 * Extracts relevant CSS keywords from a task description
 * @param description - The UI task description to analyze
 * @returns Array of CSS-related keywords that match the description
 */
export function extractCSSKeywords(description: string): string[] {
  const keywords: string[] = [];
  const lowerDescription = description.toLowerCase();
  
  // Layout keywords
  if (lowerDescription.includes('center') || lowerDescription.includes('align')) {
    keywords.push('center', 'align', 'justify');
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
 * Searches for CSS properties that match the given keywords and approach
 * @param keywords - Array of CSS keywords to search for
 * @param approach - Preferred CSS approach (modern, compatible, progressive)
 * @returns Promise that resolves to an array of CSS property suggestions
 */
export async function searchMDNForCSSProperties(
  keywords: string[],
  approach: 'modern' | 'compatible' | 'progressive' = 'modern'
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
 * Determines if a feature should be included based on the approach
 */
function shouldIncludeBasedOnApproach(
  supportLevel: 'excellent' | 'good' | 'moderate' | 'limited',
  approach: 'modern' | 'compatible' | 'progressive'
): boolean {
  switch (approach) {
    case 'modern':
      return ['excellent', 'good'].includes(supportLevel);
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