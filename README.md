# MCP CSS First

An MCP (Model Context Protocol) server that provides CSS-first solutions for UI implementation tasks. This server integrates with Mozilla Developer Network (MDN) documentation to suggest CSS properties, check browser support, and provide implementation guidance with user consent mechanisms.

## Features

- **CSS Property Suggestions**: Analyzes UI task descriptions and suggests relevant CSS properties from MDN documentation
- **Browser Support Checking**: Provides detailed browser compatibility information for CSS properties
- **User Consent Mechanism**: Asks for user approval before recommending CSS properties with browser support information
- **Implementation Guidance**: Provides code examples, best practices, and fallback strategies
- **MDN Integration**: Fetches information from Mozilla Developer Network for accurate CSS documentation

## Installation

```bash
pnpm install
pnpm run build
```

## Usage

Add to your MCP settings:

```json
{
  "mcpServers": {
    "mcp-css-first": {
      "command": "node",
      "args": ["dist/cli.js"]
    }
  }
}
```

## Available Tools

### 1. `suggest_css_solution`
Suggests CSS-first solutions for UI implementation tasks by searching MDN documentation.

**Parameters:**
- `task_description` (string): Description of the UI task or problem to solve
- `preferred_approach` (optional): 'modern', 'compatible', or 'progressive'
- `target_browsers` (optional): Array of target browsers/versions

**Example:**
```json
{
  "task_description": "I need to center a div horizontally and vertically",
  "preferred_approach": "modern"
}
```

### 2. `check_css_browser_support`
Checks browser support for specific CSS properties using MDN data.

**Parameters:**
- `css_property` (string): CSS property name to check
- `include_experimental` (optional boolean): Include experimental features

**Example:**
```json
{
  "css_property": "flexbox",
  "include_experimental": false
}
```

### 3. `get_css_property_details`
Retrieves comprehensive information about a CSS property from MDN documentation.

**Parameters:**
- `css_property` (string): CSS property name to get details for
- `include_examples` (optional boolean): Include code examples

**Example:**
```json
{
  "css_property": "grid",
  "include_examples": true
}
```

### 4. `confirm_css_property_usage`
Confirms user consent for using a specific CSS property and provides implementation guidance.

**Parameters:**
- `css_property` (string): CSS property name user wants to use
- `user_consent` (boolean): User consent to use this CSS property
- `fallback_needed` (optional boolean): Whether fallback solutions are needed

**Example:**
```json
{
  "css_property": "container-queries",
  "user_consent": true,
  "fallback_needed": true
}
```

## How It Works

1. **Task Analysis**: When you describe a UI task, the server extracts relevant CSS keywords
2. **MDN Integration**: Searches MDN documentation for appropriate CSS properties
3. **Browser Support**: Provides detailed browser compatibility information
4. **User Consent**: Asks for approval before recommending properties with support details
5. **Implementation**: Provides code examples, best practices, and fallback strategies

## Development

```bash
# Install dependencies
pnpm install

# Build for development
pnpm run build:tsc

# Watch for changes
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm test

# Lint code
pnpm run lint
```

## Project Structure

```
src/
├── index.ts              # Main MCP server implementation
├── services/
│   └── mdnApi.ts         # MDN API integration and CSS property logic
└── utils/
    └── tryCatch.ts       # Error handling utilities
```

## CSS Property Coverage

The server currently supports suggestions for:
- **Layout**: Flexbox, Grid, positioning
- **Responsive Design**: Container queries, media queries
- **Animations**: CSS animations, transitions
- **Visual Effects**: Shadows, gradients, borders
- **Typography**: Font properties, text alignment
- **Colors**: Color properties, backgrounds

## Browser Support Levels

- **Excellent** (95%+): Safe for production use
- **Good** (85%+): Consider fallbacks for legacy browsers
- **Moderate** (70%+): Use with caution and provide fallbacks
- **Limited** (<70%): Consider alternative approaches

## License

MIT