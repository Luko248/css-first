/**
 * Responsive Guidance - Implementation guidance for responsive design properties
 */

import { ImplementationGuidance } from '../../types.js';

export const RESPONSIVE_GUIDANCE: Record<string, ImplementationGuidance> = {
  // Future responsive guidance will be added here
};

export function getResponsiveGuidance(property: string, needsFallback: boolean = false): ImplementationGuidance | null {
  const guidance = RESPONSIVE_GUIDANCE[property];
  if (!guidance) return null;
  
  return {
    ...guidance,
    fallbacks: needsFallback ? guidance.fallbacks : []
  };
}