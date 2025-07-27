/**
 * MCP CSS First - A Model Context Protocol server for CSS-only development
 * 
 * This server enforces CSS-only solutions for UI implementation tasks. It strictly
 * provides modern CSS solutions using:
 * - Modern CSS features (2021-2025) with logical properties as default
 * - CSS-only carousels with modern pseudo-elements (::scroll-marker, ::scroll-button)
 * - light-dark() function for theme switching
 * - Container queries and dynamic viewport units
 * - Zero JavaScript solutions only
 * 
 * @author MCP CSS First Team
 * @version 1.0.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import { version } from '../package.json';
import {
  searchMDNForCSSProperties,
  fetchBrowserSupportFromMDN,
  fetchCSSPropertyDetailsFromMDN,
  generateBrowserSupportRecommendation,
  getAlternativeCSSProperties,
  getImplementationGuidance,
  type CSSPropertySuggestion,
  type BrowserSupportInfo,
  type CSSPropertyDetails,
} from './services/mdnApi.js';

// Export for testing purposes
export { CSS_FEATURES, searchFeatures } from './services/mdnApi.js';

/** The main MCP server instance */
const server = new McpServer({ name: 'MCP CSS First', version });

/**
 * MCP Tool: CSS Property Suggestion
 * 
 * This tool analyzes UI task descriptions and suggests appropriate CSS properties
 * from MDN documentation. It provides comprehensive information including browser
 * support data and asks for user consent before recommending usage.
 */
server.tool(
  'suggest_css_solution',
  'CSS-ONLY solution engine with strict enforcement of modern CSS features. Provides zero-JavaScript solutions using cutting-edge CSS (2021-2025) with logical properties, modern carousels, and light-dark() theming.',
  {
    task_description: z.string().describe('Description of the UI task or problem to solve'),
    preferred_approach: z
      .enum(['modern', 'compatible', 'progressive'])
      .optional()
      .describe('Preferred CSS approach - modern (latest features), compatible (wide browser support), or progressive (with fallbacks)'),
    target_browsers: z.array(z.string()).optional().describe('Target browsers/versions (e.g., ["Chrome 90+", "Firefox 88+", "Safari 14+"])'),
    project_context: z.string().optional().describe('Project context (framework, existing CSS patterns, constraints)'),
    include_analysis: z.boolean().optional().describe('Include semantic analysis details in response'),
  },
  async (args: { 
    task_description: string; 
    preferred_approach?: 'modern' | 'compatible' | 'progressive'; 
    target_browsers?: string[]; 
    project_context?: string;
    include_analysis?: boolean;
  }) => {
    try {
      const { task_description, preferred_approach = 'modern', project_context, include_analysis = false } = args;

      // Enhanced semantic analysis and intelligent search
      const suggestions: CSSPropertySuggestion[] = await searchMDNForCSSProperties(
        task_description, 
        preferred_approach,
        project_context
      );

      // Get analysis details if requested
      let analysisDetails = null;
      if (include_analysis) {
        const { analyzeTaskIntent } = await import('./services/mdnApi.js');
        analysisDetails = analyzeTaskIntent(task_description, project_context);
      }

      const result = suggestions.length === 0 
        ? {
            success: false,
            message: 'No CSS-ONLY solutions found. This tool provides ONLY CSS solutions - no JavaScript alternatives will be suggested. Please rephrase your request to focus on CSS-achievable UI patterns.',
            suggestions: [],
            ...(analysisDetails && { analysis: analysisDetails })
          }
        : {
            success: true,
            message: `Found ${suggestions.length} CSS-ONLY solution(s) using modern CSS features. All solutions are JavaScript-free and use logical properties by default.`,
            suggestions: suggestions.map((suggestion) => ({
              ...suggestion,
              needs_consent: true,
              consent_message: `Do you want to use the CSS property "${suggestion.property}" which has ${suggestion.browser_support.overall_support}% browser support?`,
            })),
            ...(analysisDetails && { 
              analysis: {
                ...analysisDetails,
                explanation: `Analyzed with ${Math.round(analysisDetails.confidence * 100)}% confidence. Detected intent: ${analysisDetails.intent.join(', ')}.`
              }
            })
          };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }, null, 2),
          },
        ],
      };
    }
  },
);

/**
 * MCP Tool: Browser Support Checker
 * 
 * This tool checks browser support for specific CSS properties using MDN data
 * and provides detailed compatibility information across different browsers.
 */
server.tool(
  'check_css_browser_support',
  'Checks browser support for specific CSS properties using MDN data and provides detailed compatibility information.',
  {
    css_property: z.string().describe('CSS property name to check browser support for'),
    include_experimental: z.boolean().optional().describe('Include experimental/draft features in results'),
  },
  async (args: { css_property: string; include_experimental?: boolean }) => {
    try {
      const { css_property, include_experimental = false } = args;

      const supportInfo: BrowserSupportInfo = await fetchBrowserSupportFromMDN(css_property, include_experimental);

      const result = {
        property: css_property,
        browser_support: supportInfo,
        recommendation: generateBrowserSupportRecommendation(supportInfo),
        safe_to_use: supportInfo.overall_support >= 80,
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }, null, 2),
          },
        ],
      };
    }
  },
);

/**
 * MCP Tool: CSS Property Details
 * 
 * This tool retrieves comprehensive information about a CSS property from MDN
 * documentation including syntax, examples, and use cases.
 */
server.tool(
  'get_css_property_details',
  'Retrieves comprehensive information about a CSS property from MDN documentation including syntax, examples, and use cases.',
  {
    css_property: z.string().describe('CSS property name to get details for'),
    include_examples: z.boolean().optional().describe('Include code examples in the response'),
  },
  async (args: { css_property: string; include_examples?: boolean }) => {
    try {
      const { css_property, include_examples = true } = args;

      const details: CSSPropertyDetails = await fetchCSSPropertyDetailsFromMDN(css_property, include_examples);

      const result = {
        property: css_property,
        details,
        mdn_url: `https://developer.mozilla.org/en-US/docs/Web/CSS/${css_property}`,
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }, null, 2),
          },
        ],
      };
    }
  },
);

/**
 * MCP Tool: User Consent Confirmation
 * 
 * This tool confirms user consent for using a specific CSS property and provides
 * implementation guidance including code examples and best practices.
 */
server.tool(
  'confirm_css_property_usage',
  'Confirms user consent for using a specific CSS property and provides implementation guidance.',
  {
    css_property: z.string().describe('CSS property name user wants to use'),
    user_consent: z.boolean().describe('User consent to use this CSS property'),
    fallback_needed: z.boolean().optional().describe('Whether fallback solutions are needed'),
  },
  async (args: { css_property: string; user_consent: boolean; fallback_needed?: boolean }) => {
    try {
      const { css_property, user_consent, fallback_needed = false } = args;

      const result = !user_consent 
        ? {
            message: `User declined to use ${css_property}. Here are alternative CSS-ONLY solutions (JavaScript solutions are not provided by this tool).`,
            alternative_suggestions: await getAlternativeCSSProperties(css_property),
          }
        : {
            message: `User confirmed usage of ${css_property}. Here's the implementation guidance:`,
            implementation_guidance: await getImplementationGuidance(css_property, fallback_needed),
            css_property: css_property,
            approved: true,
          };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }, null, 2),
          },
        ],
      };
    }
  },
);

/**
 * Start the MCP server
 * 
 * Connects the server to the standard input/output transport for communication
 * with the MCP client (usually Claude or other AI assistants).
 */
server.connect(new StdioServerTransport());
