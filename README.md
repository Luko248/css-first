# CSS First

An advanced MCP (Model Context Protocol) server that provides intelligent, context-aware CSS-first solutions for UI implementation tasks. Features semantic analysis, framework detection, and intelligent ranking with hybrid MDN integration including context7 support.

## Setup

Add to your MCP configuration:

### Cursor

Add to your MCP settings:

```json
{
  "mcpServers": {
    "css-first": {
      "command": "npx",
      "args": ["-y", "@depthark/css-first"]
    }
  }
}
```

### Windsurf

Configure in your MCP settings:

```json
{
  "mcpServers": {
    "css-first": {
      "command": "npx",
      "args": ["-y", "@depthark/css-first"]
    }
  }
}
```

### GitHub Copilot / VS Code

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "css-first": {
      "command": "npx",
      "args": ["-y", "@depthark/css-first"]
    }
  }
}
```

### Claude Code CLI

Add the MCP server:

```bash
claude mcp add css-first npx -y @depthark/css-first
```

### Codex

Add config to your `mcp_servers.toml`:

```toml
[mcp_servers.css-first]
command = "npx"
args = ["-y", "@depthark/css-first"]
```

## Usage

After adding the configuration:

1. Restart your MCP client
2. Ask CSS questions like:
   - "Create a responsive card layout"
   - "Center a div vertically and horizontally"
   - "Add dark mode support"
   - "Make a sticky header"
   - "Create organic rounded corners with corner-shape"
   - "Design modern buttons with superellipse curves"

## 🚀 Key Features

### **Intelligent Analysis**

- **Semantic Intent Recognition**: Understands user intent through advanced pattern matching (layout, animation, spacing, etc.)
- **Confidence Scoring**: Provides transparency with confidence levels for suggestions
- **Context-Aware Keywords**: Enhanced keyword extraction with semantic understanding

### **Project Context Awareness**

- **Framework Detection**: Automatically detects React, Vue, Angular, Svelte projects
- **CSS Framework Recognition**: Supports Tailwind, Bootstrap, Material-UI, Chakra UI
- **Build Tool Integration**: Recognizes Webpack, Vite, Parcel, Rollup environments
- **Constraint Analysis**: Understands project constraints (performance, accessibility, responsive)

### **Enhanced MDN Integration**

- **Hybrid Data Sources**: Primary context7 integration with MDN fallback
- **Performance Caching**: 1-hour intelligent caching for improved response times
- **Real-time Browser Support**: Accurate compatibility data from MDN
- **Graceful Degradation**: Fallback mechanisms ensure reliability

### **Intelligent Ranking**

- **Relevance Scoring**: Suggestions ranked by intent match, browser support, and framework compatibility
- **Category-Prioritized Search**: Focuses on most relevant CSS feature categories
- **Framework-Specific Recommendations**: Tailored advice for your tech stack

### **User Experience**

- **Consent-Driven Workflow**: User approval required before property recommendations
- **Detailed Analysis**: Optional semantic analysis breakdown for transparency
- **Implementation Guidance**: Framework-specific best practices and code examples

## Development Installation

For contributors and advanced users who want to modify the source:

```bash
git clone https://github.com/luko248/css-first
cd css-first
pnpm install
pnpm run build
```

## Development Usage

For development/testing with local builds:

```json
{
  "mcpServers": {
    "@depthark/css-first": {
      "command": "node",
      "args": ["/absolute/path/to/css-first/dist/cli.js"]
    }
  }
}
```

## Available Tools

### 1. `suggest_css_solution` ⭐

Enhanced CSS-first solution suggester with semantic analysis, context awareness, and intelligent ranking.

**Parameters:**

- `task_description` (string): Description of the UI task or problem to solve
- `preferred_approach` (optional): 'modern', 'compatible', or 'progressive'
- `target_browsers` (optional): Array of target browsers/versions
- `project_context` (optional): Project context (framework, existing CSS patterns, constraints) **NEW**
- `include_analysis` (optional): Include semantic analysis details in response **NEW**

**Examples:**

**Basic Usage:**

```json
{
  "task_description": "I need to center a div horizontally and vertically",
  "preferred_approach": "modern"
}
```

**With Project Context:**

```json
{
  "task_description": "Create a responsive card layout with hover animations",
  "preferred_approach": "modern",
  "project_context": "React project using Tailwind CSS, targeting Chrome 90+, performance-critical",
  "include_analysis": true
}
```

**Response includes:**

- Intelligently ranked CSS suggestions
- Framework-specific recommendations
- Semantic analysis breakdown (optional)
- Confidence scoring and intent detection

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

## 🧠 How It Works

### **Intelligent Analysis Pipeline**

1. **Semantic Intent Recognition**: Advanced regex patterns analyze task descriptions to understand user intent (layout, animation, spacing, responsive, visual, interaction)

2. **Project Context Analysis**: Detects frameworks, CSS libraries, build tools, and constraints from project context string

3. **Hybrid MDN Integration**:

   - Primary: Context7 tool for structured MDN data
   - Fallback: Direct MDN API scraping
   - Caching: 1-hour intelligent cache for performance

4. **Intelligent Ranking**: Scores suggestions based on:

   - Intent match relevance
   - Browser support level
   - Framework compatibility
   - User confidence multiplier

5. **Context-Aware Recommendations**: Provides framework-specific guidance and best practices

6. **User Consent & Implementation**: Consent-driven workflow with detailed implementation guidance

### **Example Analysis Flow**

```
Input: "Create a responsive navigation menu with smooth animations"
↓
Intent Detection: layout + responsive + animation (85% confidence)
↓
Context: React + Tailwind detected
↓
Ranked Suggestions:
1. Flexbox layout (95% support) + CSS transitions
2. CSS Grid (92% support) + transform animations
3. Container queries (75% support) with fallbacks
↓
Framework Recommendations: "Use Tailwind's responsive prefixes", "Consider React transition components"
```

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

## 📁 Project Structure

```
src/
├── index.ts                     # Main MCP server with enhanced tools
├── services/
│   ├── mdnApi.ts               # Legacy API exports and backwards compatibility
│   └── css/
│       ├── index.ts            # CSS services entry point
│       ├── types.ts            # TypeScript interfaces and enums
│       ├── mdnClient.ts        # Hybrid MDN client with context7 integration
│       ├── suggestions.ts      # Semantic analysis and intelligent ranking
│       ├── guidance.ts         # Implementation guidance and recommendations
│       ├── contextAnalyzer.ts  # Project context detection and analysis
│       └── features/           # Modular CSS feature definitions
│           ├── index.ts        # Feature registry and exports
│           ├── animation/      # Animation and transition features
│           ├── layout/         # Flexbox, Grid, positioning features
│           │   ├── flexbox/    # Dedicated flexbox module
│           │   └── grid/       # Dedicated grid module
│           ├── logical/        # Logical properties and values
│           ├── logical-spacing/# Logical spacing and sizing
│           ├── responsive/     # Responsive design features
│           ├── visual/         # Visual effects and styling
│           ├── interaction/    # User interaction states
│           ├── positioning/    # CSS positioning features
│           └── display/        # Display and layout modes
```

### **Key Architecture Benefits**

- **Modular Design**: Each CSS category has dedicated modules for maintainability
- **Semantic Analysis**: Intent recognition and confidence scoring for accuracy
- **Context Awareness**: Framework and project constraint detection
- **Performance Optimized**: Intelligent caching and ranked results
- **Extensible**: Easy to add new frameworks, patterns, and CSS features

## 🎯 CSS Feature Coverage

### **Intelligent Categories**

The enhanced system provides context-aware suggestions across:

- **Layout** 🏗️: Flexbox, Grid, positioning, display modes
- **Animation** ✨: CSS animations, transitions, transforms
- **Responsive** 📱: Container queries, media queries, viewport units
- **Visual** 🎨: Shadows, gradients, borders, effects
- **Interaction** 🖱️: Hover states, focus, active, disabled
- **Logical Properties** 📐: Writing-mode aware spacing and sizing
- **Typography** 📝: Font properties, text alignment, spacing
- **Positioning** 📍: Static, relative, absolute, fixed, sticky

### **Framework-Specific Features**

- **React**: Component-scoped styling, CSS-in-JS patterns
- **Vue**: Scoped styles, transition components
- **Angular**: ViewEncapsulation, Material Design integration
- **Svelte**: Built-in scoped styling, reactive CSS

### **CSS Framework Integration**

- **Tailwind**: Utility-first patterns, responsive prefixes
- **Bootstrap**: Grid system, utility classes
- **Material-UI**: Theme customization, sx props
- **Chakra UI**: Design system tokens

## 📊 Enhanced Browser Support Levels

- **Excellent** (95%+): ✅ Safe for production use
- **Good** (85%+): ⚠️ Consider fallbacks for legacy browsers
- **Moderate** (70%+): ⚡ Use with caution and provide fallbacks
- **Limited** (<70%): 🔄 Consider alternative approaches
- **Experimental** (varies): 🧪 Cutting-edge features with progressive enhancement

## 🔧 Context7 Integration & Automated Feature Discovery

This MCP features **automated CSS feature discovery** using context7 MCP for MDN documentation. The system continuously discovers and integrates recent CSS features (2021-2025) with intelligent categorization.

### **Context7 Benefits**

- **Faster Response Times**: Pre-processed MDN data with intelligent caching
- **Structured Information**: Better parsing of CSS property details and browser support
- **Reduced API Calls**: Less reliance on direct MDN scraping
- **Enhanced Reliability**: Multi-layered fallback mechanisms ensure service continuity

### **Automated Feature Discovery**

- **🤖 Auto-Discovery**: Automatically finds and categorizes new CSS features from MDN
- **📊 Intelligent Categorization**: Uses semantic analysis to categorize features by type
- **🔄 Continuous Updates**: Built-in mechanisms for ongoing feature maintenance
- **📈 Browser Support Analysis**: Automatic extraction of compatibility information

### **Recently Integrated Features (2021-2025)**

#### **🆕 Major CSS Features Added**

- **Container Queries** (2022): Element-based responsive design with logical units (`cqi`, `cqb`) and style/scroll queries
- **CSS Nesting** (2023): Native CSS nesting without preprocessors
- **:has() Pseudo-class** (2022): Parent selection based on children
- **Dynamic Viewport Units** (2022-2023): Complete logical viewport units (`dvi`, `dvb`, `svi`, `svb`, `lvi`, `lvb`) with physical fallbacks
- **color-mix() Function** (2021-2024): Advanced color mixing in different color spaces
- **Scroll-driven Animations** (2023-2024): Animations driven by scroll progress
- **CSS Cascade Layers** (2022): Better style organization with @layer
- **Subgrid** (2021-2023): Grid items participating in parent grid
- **aspect-ratio Property** (2021): Native aspect ratio control
- **Enhanced Math Functions** (2021-2023): clamp(), round(), trigonometric functions

#### **📱 Responsive & Modern Layout**

- **CSS Anchor Positioning** (2024): Position elements relative to other elements
- **View Transitions** (2023-2024): Smooth page/view transitions
- **Enhanced Logical Properties**: Complete writing-mode aware spacing, sizing, and positioning
- **Container Style Queries**: Query container's computed style values
- **Container Scroll State Queries**: Query container's scroll state
- **Masonry Layout** (Experimental): Pinterest-style layouts

#### **🎨 Visual & Color Enhancements**

- **accent-color**: Customize form control colors
- **color-scheme**: Light/dark mode indication
- **light-dark() Function**: Theme-aware color values
- **backdrop-filter**: Glass morphism effects
- **conic-gradient**: Conical gradients for complex designs
- **corner-shape** (Experimental): Superellipse curves for organic, Apple-like rounded corners

### **Automated Update Commands**

```bash
# Discover and integrate new CSS features from MDN
npm run update-features

# Run feature discovery (development)
npm run discover-features
```

### **Context7 Setup**

The MCP automatically detects and uses context7 when available:

1. **Automatic Detection**: Checks for context7 MCP in the environment
2. **Graceful Fallback**: Falls back to direct MDN integration if context7 unavailable
3. **Performance Optimization**: Uses caching and intelligent data processing
4. **Error Handling**: Robust error handling with multiple fallback strategies
5. **Logical-First Approach**: Automatically prioritizes logical CSS units and properties for internationalization

## 🌍 Logical Units & Internationalization

This MCP implements a **logical-first approach** to CSS suggestions, prioritizing writing-mode aware properties for better internationalization support.

### **Logical Units Priority System**

#### **Viewport Units (Logical Preferred)**

- `dvi`, `dvb` (dynamic viewport inline/block) → `dvw`, `dvh` (physical fallback)
- `svi`, `svb` (small viewport inline/block) → `svw`, `svh` (physical fallback)
- `lvi`, `lvb` (large viewport inline/block) → `lvw`, `lvh` (physical fallback)

#### **Container Query Units (Logical Preferred)**

- `cqi`, `cqb` (container query inline/block) → `cqw`, `cqh` (physical fallback)

#### **CSS Properties (Logical Preferred)**

- `inline-size`, `block-size` → `width`, `height` (physical fallback)
- `margin-inline`, `margin-block` → `margin-left/right`, `margin-top/bottom`
- `padding-inline`, `padding-block` → `padding-left/right`, `padding-top/bottom`
- `border-inline`, `border-block` → `border-left/right`, `border-top/bottom`
- `inset-inline`, `inset-block` → `left/right`, `top/bottom`

### **Advanced Container Queries**

#### **Size-based Container Queries (Enhanced)**

```css
@container (inline-size > 30cqi) {
  .component {
    gap: 2cqi;
  }
}
```

#### **Style Queries (NEW)**

```css
@container style(--theme: dark) {
  .card {
    background: var(--dark-bg);
  }
}
```

#### **Scroll State Queries (NEW)**

```css
@container scroll-state(stuck: top) {
  .header {
    backdrop-filter: blur(10px);
  }
}
```

### **Writing-Mode Awareness**

- **RTL Language Support**: Logical properties automatically adapt to right-to-left languages
- **Vertical Writing Modes**: Properties work correctly with `writing-mode: vertical-rl`
- **International Compatibility**: Suggestions prioritize globally compatible approaches

## License

MIT
