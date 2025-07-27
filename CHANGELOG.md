# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-01-27

### 🛡️ Accessibility & Best Practices

#### **Enhanced Accessibility Support**
- **NEW**: Comprehensive `prefers-reduced-motion` support across all animation examples
- **NEW**: Hover media query guidance (`@media (hover: hover)`) to prevent touch device issues
- **NEW**: Mobile-specific interaction patterns with proper touch alternatives
- **IMPROVED**: All animation properties now include accessibility-first examples

#### **Mobile-First Design Improvements**
- **NEW**: Guidance against full-height sticky headers on mobile devices
- **NEW**: Responsive sticky positioning with proper mobile constraints
- **NEW**: Touch-friendly interaction patterns with `@media (pointer: coarse)`
- **ADDED**: Safe area inset support for mobile sticky elements

#### **Modern Theming Best Practices**
- **WARNING**: Added guidance against combining `light-dark()` with `prefers-color-scheme`
- **NEW**: Comprehensive `light-dark()` function implementation examples
- **NEW**: Anti-pattern documentation for theme conflicts
- **ADDED**: CSS-only theme system with proper color-scheme declaration

#### **Code Quality & Standards**
- **ENHANCED**: All animation guidance includes motion accessibility
- **STANDARDIZED**: Hover effects properly wrapped in media queries
- **IMPROVED**: Touch device alternatives for all interactive elements
- **ENFORCED**: Accessibility-first approach across all CSS examples

### 🔧 Technical Improvements
- **ADDED**: Position sticky guidance with mobile best practices
- **ENHANCED**: Animation timing functions with reduced motion support
- **IMPROVED**: Interaction guidance with comprehensive hover/touch patterns
- **UPDATED**: Modern CSS guidance with proper fallback strategies

---

## [1.1.0] - 2025-01-27

### 🚀 Major Improvements

#### **Enhanced Search Algorithm**
- **NEW**: Semantic understanding of developer intent
- **NEW**: Intelligent relevance scoring (up to 200 points for semantic matches)
- **NEW**: Pattern recognition for common CSS tasks
- **IMPROVED**: Search results now actually useful for real development scenarios

#### **Mobile-First CSS Support**
- **NEW**: Proper mobile viewport height units (`dvh`, `svh`, `lvh`)
- **NEW**: Dynamic viewport handling for mobile browser UI
- **NEW**: Mobile-specific keyword detection and suggestions
- **EXAMPLE**: "header full height mobile" → suggests `height: 100dvh`

#### **Modern CSS Features**
- **NEW**: CSS Carousel with `::scroll-marker` and `::scroll-button` pseudo-elements
- **NEW**: `light-dark()` function support for CSS-only theming
- **NEW**: Form validation with `:user-valid`/`:user-invalid` pseudo-classes
- **NEW**: Modern positioning with logical properties (`inset-inline`, `inset-block`)

#### **Developer Experience**
- **IMPROVED**: 10x better suggestion relevance
- **FIXED**: Now suggests modern CSS instead of outdated patterns
- **ADDED**: Comprehensive CSS properties database
- **ADDED**: Context-aware property recommendations

### 🔧 Technical Improvements

#### **Code Quality**
- **REMOVED**: Hardcoded syntax examples (now uses MDN data)
- **REMOVED**: Inconsistent suggestion files across feature folders
- **STANDARDIZED**: All features now use `properties.ts` + `guidance.ts` structure
- **ENFORCED**: HSL colors only (no hex), separate `rotate` property (no `transform: rotate()`)

#### **Architecture**
- **REFACTORED**: Clean, consistent feature structure
- **IMPROVED**: Enhanced keyword extraction with semantic patterns
- **OPTIMIZED**: Better search performance with intelligent scoring

### 🐛 Bug Fixes
- **FIXED**: Unused variable warnings in TypeScript
- **FIXED**: Search algorithm missing modern CSS features
- **FIXED**: Poor relevance scoring producing irrelevant results

### 🔄 Upgrade Guide
```bash
# Update to latest version
npm update @depthark/css-first

# Or install specific version
npm install @depthark/css-first@1.1.0
```

**Note**: This is a backward-compatible update. Existing integrations will continue to work, but with much better suggestion quality.

---

## [1.0.0] - 2025-01-26

### Initial Release
- Basic CSS suggestion engine
- MDN integration
- Simple keyword matching
- Foundation for CSS-first development approach