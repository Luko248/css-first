/**
 * Logical Units Preference System
 * Prioritizes logical CSS units over physical units for better internationalization
 */

export interface UnitMapping {
  physical: string;
  logical: string;
  description: string;
  category: 'viewport' | 'container' | 'property';
}

/**
 * Comprehensive mapping of physical to logical units
 */
export const LOGICAL_UNIT_MAPPINGS: UnitMapping[] = [
  // Viewport Units
  { physical: 'vw', logical: 'vi', description: 'Viewport width → inline', category: 'viewport' },
  { physical: 'vh', logical: 'vb', description: 'Viewport height → block', category: 'viewport' },
  { physical: 'dvw', logical: 'dvi', description: 'Dynamic viewport width → inline', category: 'viewport' },
  { physical: 'dvh', logical: 'dvb', description: 'Dynamic viewport height → block', category: 'viewport' },
  { physical: 'svw', logical: 'svi', description: 'Small viewport width → inline', category: 'viewport' },
  { physical: 'svh', logical: 'svb', description: 'Small viewport height → block', category: 'viewport' },
  { physical: 'lvw', logical: 'lvi', description: 'Large viewport width → inline', category: 'viewport' },
  { physical: 'lvh', logical: 'lvb', description: 'Large viewport height → block', category: 'viewport' },
  
  // Container Query Units
  { physical: 'cqw', logical: 'cqi', description: 'Container query width → inline', category: 'container' },
  { physical: 'cqh', logical: 'cqb', description: 'Container query height → block', category: 'container' },
  
  // CSS Properties
  { physical: 'width', logical: 'inline-size', description: 'Width → inline size', category: 'property' },
  { physical: 'height', logical: 'block-size', description: 'Height → block size', category: 'property' },
  { physical: 'min-width', logical: 'min-inline-size', description: 'Min width → min inline size', category: 'property' },
  { physical: 'min-height', logical: 'min-block-size', description: 'Min height → min block size', category: 'property' },
  { physical: 'max-width', logical: 'max-inline-size', description: 'Max width → max inline size', category: 'property' },
  { physical: 'max-height', logical: 'max-block-size', description: 'Max height → max block size', category: 'property' },
  { physical: 'margin-left', logical: 'margin-inline-start', description: 'Left margin → inline start margin', category: 'property' },
  { physical: 'margin-right', logical: 'margin-inline-end', description: 'Right margin → inline end margin', category: 'property' },
  { physical: 'margin-top', logical: 'margin-block-start', description: 'Top margin → block start margin', category: 'property' },
  { physical: 'margin-bottom', logical: 'margin-block-end', description: 'Bottom margin → block end margin', category: 'property' },
  { physical: 'padding-left', logical: 'padding-inline-start', description: 'Left padding → inline start padding', category: 'property' },
  { physical: 'padding-right', logical: 'padding-inline-end', description: 'Right padding → inline end padding', category: 'property' },
  { physical: 'padding-top', logical: 'padding-block-start', description: 'Top padding → block start padding', category: 'property' },
  { physical: 'padding-bottom', logical: 'padding-block-end', description: 'Bottom padding → block end padding', category: 'property' },
  { physical: 'border-left', logical: 'border-inline-start', description: 'Left border → inline start border', category: 'property' },
  { physical: 'border-right', logical: 'border-inline-end', description: 'Right border → inline end border', category: 'property' },
  { physical: 'border-top', logical: 'border-block-start', description: 'Top border → block start border', category: 'property' },
  { physical: 'border-bottom', logical: 'border-block-end', description: 'Bottom border → block end border', category: 'property' },
  { physical: 'left', logical: 'inset-inline-start', description: 'Left position → inline start inset', category: 'property' },
  { physical: 'right', logical: 'inset-inline-end', description: 'Right position → inline end inset', category: 'property' },
  { physical: 'top', logical: 'inset-block-start', description: 'Top position → block start inset', category: 'property' },
  { physical: 'bottom', logical: 'inset-block-end', description: 'Bottom position → block end inset', category: 'property' }
];

/**
 * Shorthand logical properties
 */
export const LOGICAL_SHORTHAND_MAPPINGS = [
  { physical: 'margin', logical: 'margin-inline, margin-block', description: 'Use logical margin shorthands' },
  { physical: 'padding', logical: 'padding-inline, padding-block', description: 'Use logical padding shorthands' },
  { physical: 'border', logical: 'border-inline, border-block', description: 'Use logical border shorthands' },
  { physical: 'inset', logical: 'inset-inline, inset-block', description: 'Use logical inset shorthands' }
];

/**
 * Convert physical units to logical equivalents
 */
export function convertToLogicalUnits(cssText: string): string {
  let logicalCSS = cssText;
  
  // Replace units and properties
  LOGICAL_UNIT_MAPPINGS.forEach(mapping => {
    const physicalRegex = new RegExp(`\\b${mapping.physical}\\b`, 'g');
    logicalCSS = logicalCSS.replace(physicalRegex, mapping.logical);
  });
  
  return logicalCSS;
}

/**
 * Get logical alternative for a physical unit/property
 */
export function getLogicalAlternative(physical: string): UnitMapping | null {
  return LOGICAL_UNIT_MAPPINGS.find(mapping => mapping.physical === physical) || null;
}

/**
 * Get all logical units for a specific category
 */
export function getLogicalUnitsByCategory(category: 'viewport' | 'container' | 'property'): UnitMapping[] {
  return LOGICAL_UNIT_MAPPINGS.filter(mapping => mapping.category === category);
}

/**
 * Generate logical-first CSS suggestion
 */
export function generateLogicalFirstCSS(physicalCSS: string): {
  logical: string;
  fallback: string;
  explanation: string;
} {
  const logical = convertToLogicalUnits(physicalCSS);
  
  // Create layered fallback approach
  const fallback = `/* Logical properties (preferred) */\n${logical}\n\n/* Physical fallbacks */\n${physicalCSS}`;
  
  const explanation = `This approach uses logical properties for writing-mode awareness, with physical properties as fallbacks for older browsers.`;
  
  return {
    logical,
    fallback,
    explanation
  };
}

/**
 * Rank suggestions by logical unit preference
 */
export function rankByLogicalPreference(suggestions: any[]): any[] {
  return suggestions.sort((a, b) => {
    const aLogicalScore = calculateLogicalScore(a.properties || []);
    const bLogicalScore = calculateLogicalScore(b.properties || []);
    
    // Higher logical score = better ranking
    return bLogicalScore - aLogicalScore;
  });
}

/**
 * Calculate logical unit preference score
 */
function calculateLogicalScore(properties: string[]): number {
  let score = 0;
  
  properties.forEach(prop => {
    // Logical viewport units get highest score
    if (['dvi', 'dvb', 'svi', 'svb', 'lvi', 'lvb'].includes(prop)) {
      score += 10;
    }
    // Container query logical units
    else if (['cqi', 'cqb'].includes(prop)) {
      score += 8;
    }
    // Logical properties
    else if (prop.includes('inline') || prop.includes('block')) {
      score += 6;
    }
    // Physical viewport units get lower score
    else if (['dvw', 'dvh', 'svw', 'svh', 'lvw', 'lvh'].includes(prop)) {
      score += 3;
    }
    // Container query physical units
    else if (['cqw', 'cqh'].includes(prop)) {
      score += 2;
    }
    // Physical properties get lowest score
    else if (['width', 'height', 'left', 'right', 'top', 'bottom'].includes(prop)) {
      score += 1;
    }
  });
  
  return score;
}

/**
 * Generate writing-mode aware recommendations
 */
export function getWritingModeRecommendations(context?: string): string[] {
  const recommendations = [
    'Use logical properties (inline-size, block-size) for writing-mode compatibility',
    'Prefer logical viewport units (dvi, dvb) over physical units (dvw, dvh)',
    'Use container query logical units (cqi, cqb) for component-based responsive design',
    'Test layouts in both LTR and RTL languages',
    'Consider vertical writing modes (writing-mode: vertical-rl)'
  ];
  
  // Add context-specific recommendations
  if (context?.toLowerCase().includes('rtl')) {
    recommendations.unshift('Essential for RTL languages: Use logical properties exclusively');
  }
  
  if (context?.toLowerCase().includes('international')) {
    recommendations.unshift('For international sites: Logical properties are critical for proper localization');
  }
  
  return recommendations;
}

/**
 * Detect if code uses physical units and suggest logical alternatives
 */
export function analyzeAndSuggestLogical(cssCode: string): {
  hasPhysicalUnits: boolean;
  suggestions: Array<{
    physical: string;
    logical: string;
    line?: number;
    description: string;
  }>;
  logicalizedCode: string;
} {
  const suggestions: Array<{
    physical: string;
    logical: string;
    line?: number;
    description: string;
  }> = [];
  
  let hasPhysicalUnits = false;
  
  // Analyze each line
  const lines = cssCode.split('\n');
  lines.forEach((line, index) => {
    LOGICAL_UNIT_MAPPINGS.forEach(mapping => {
      const regex = new RegExp(`\\b${mapping.physical}\\b`, 'g');
      if (regex.test(line)) {
        hasPhysicalUnits = true;
        suggestions.push({
          physical: mapping.physical,
          logical: mapping.logical,
          line: index + 1,
          description: mapping.description
        });
      }
    });
  });
  
  const logicalizedCode = convertToLogicalUnits(cssCode);
  
  return {
    hasPhysicalUnits,
    suggestions,
    logicalizedCode
  };
}