# DevDocs AI — Google Stitch Design Guide
**Anthropic Design System - Academic Journal on Vellum**  
**Version:** 2.0  
**Last Updated:** 2026-05-08

---

## Quick Reference

### Core Design Principles
```
Style: Academic journal aesthetic, understated elegance
Aesthetic: Warm, inviting, sophisticated, minimal decoration
Tone: Intellectual, approachable, precise
Theme: Light mode with creamy backgrounds
```

### Essential Colors
```css
/* Anthropic Color Palette */
--vellum-white: #faf9f5      /* Page backgrounds, cards */
--ink-black: #141413          /* Primary text, headings */
--onyx: #1f1e1d              /* Borders, secondary text */
--graphite: #3d3d3a          /* Body copy, navigation */
--dusty-gray: #73726c        /* Tertiary text, labels */
--stone: #9c9a92             /* Placeholder, inactive */
--parchment: #dedcd1         /* Subtle borders, dividers */
--snow-white: #ffffff        /* Input fields, selected states */
--pale-azure: #ccdbe8        /* Border accents, highlights */
--terra-cotta: #d97757       /* Decorative icon accents */
```

### Typography
```
Headings: Lora (Anthropic Serif substitute)
  - Display (56px): weight 330 (very light)
  - Headings (18-30px): weight 400
  - Line height: 1.2-1.33

Body: Inter (Anthropic Sans substitute)
  - Sizes: 11px, 12px, 14px, 15px, 16px
  - Weights: 400 (regular), 430 (emphasis), 500 (CTA), 600 (strong)
  - Line height: 1.33-1.50
```

### Spacing
```
Base unit: 8px
Element gap: 8-24px
Card padding: 24px
Section gap: 32-40px
Use multiples of 8px for consistency
```

### Border Radius
```
Standard: 9.6px (buttons, inputs, cards)
Hero elements: 24px
Large containers: 16px
Jumbo separators: 32px
Navigation: 0px (sharp edges)
```

---

## Component Library

### Buttons
```
Primary CTA (Dark Filled):
  bg: #141413, text: #ffffff, padding: 20px horizontal, 24px vertical
  height: auto, radius: 9.6px, font: Inter 500 (medium)
  hover: subtle opacity change

Secondary Button:
  bg: transparent, text: #141413, border: rgba(31,30,29,0.3)
  radius: 9.6px, padding: 20px horizontal
  font: Inter 400

Primary Navigation:
  bg: transparent, text: #3d3d3a
  radius: 0px (sharp), font: Inter 400
  hover: underline or subtle background

Destructive/Prominent:
  bg: transparent, text: #141413, border: #1f1e1d
  radius: 8px, padding: 24px horizontal
```

### Inputs
```
Form Input Field:
  bg: #ffffff, text: #141413
  border: rgba(31,30,29,0.15), radius: 9.6px
  padding: 12px horizontal
  font: Inter 400
  placeholder: lighter neutral (#9c9a92)
  focus: border darkens slightly
```

### Cards
```
Standard Card:
  bg: #faf9f5, border: #dedcd1
  radius: 9.6px, padding: 24px
  shadow: none (use subtle borders only)
  title: Lora (serif), body: Inter
```

### Typography Hierarchy
```
Display Heading (H1):
  font: Lora, size: 56px, weight: 330 (very light)
  color: #141413, line-height: 1.2
  
Large Heading (H2):
  font: Lora, size: 30px, weight: 400
  color: #141413, line-height: 1.33

Medium Heading (H3):
  font: Lora, size: 24px, weight: 400
  color: #141413, line-height: 1.33

Small Heading (H4):
  font: Lora, size: 18px, weight: 400
  color: #141413, line-height: 1.33

Body Text:
  font: Inter, size: 15-16px, weight: 400
  color: #3d3d3a, line-height: 1.33-1.40

Secondary Text:
  font: Inter, size: 14px, weight: 400
  color: #73726c, line-height: 1.40

Caption:
  font: Inter, size: 11-12px, weight: 400
  color: #9c9a92, line-height: 1.33
```

### Badges
```
Status:
  padding: 4px 12px, radius: 12px, font: 12px medium
  Complete: bg #10B98120, text #10B981
  In Progress: bg #3B82F620, text #3B82F6
  Pending: bg #6B728020, text #6B7280
```

---

## Animation Specifications

### Timing Functions
```css
--ease-fast: cubic-bezier(0.4, 0, 0.2, 1)     /* 100-150ms */
--ease-base: cubic-bezier(0.4, 0, 0.2, 1)     /* 200-300ms */
--ease-slow: cubic-bezier(0.4, 0, 0.1, 1)     /* 400-500ms */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Hover Animations
```css
/* Button Hover */
transition: all 150ms ease;
transform: scale(1.01);
background: darken(10%);

/* Card Hover */
transition: border-color 200ms ease;
border-color: var(--primary);

/* Icon Button Hover */
transition: background 150ms ease;
background: var(--surface);
```

### Streaming Text Animation
```css
/* Token Appearance */
@keyframes fadeIn {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
animation: fadeIn 100ms ease;

/* Cursor Blink */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
animation: blink 500ms ease-in-out infinite;
width: 2px;
height: 16px;
background: var(--primary);
```

### Modal Animations
```css
/* Overlay Fade In */
@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: overlayFadeIn 200ms ease;

/* Modal Scale In */
@keyframes modalScaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}
animation: modalScaleIn 200ms ease;
```

### Toast Slide In
```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
animation: slideInRight 200ms ease;
```

### Progress Bar Fill
```css
transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Domain Completion
```css
/* Preview Panel Slide In */
@keyframes slideInFromRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
animation: slideInFromRight 200ms ease;

/* Progress Item Color Change */
transition: color 200ms ease, background 200ms ease;
```

---

## Component Variants

### Button Variants
```
1. Primary (default)
2. Secondary (outlined)
3. Ghost (transparent)
4. Destructive (red, for delete actions)
5. Icon Only (40x40px square)
6. Loading (with spinner)
7. Disabled (50% opacity)
8. Small (32px height, 12px font)
9. Large (48px height, 16px font)
```

### Input Variants
```
1. Text (default)
2. Password (with show/hide toggle)
3. Email (with validation icon)
4. Textarea (multi-line)
5. Select (with dropdown icon)
6. Search (with search icon)
7. With Prefix (icon on left)
8. With Suffix (icon on right)
9. Error State (red border + message)
10. Success State (green border + checkmark)
11. Disabled (muted background)
```

### Card Variants
```
1. Standard (static)
2. Interactive (clickable, hover effect)
3. Selected (primary border)
4. With Header (title + actions)
5. With Footer (buttons)
6. Elevated (subtle shadow)
7. Outlined (border only, no background)
8. Compact (16px padding)
```

### Badge Variants
```
1. Status (rounded-full, colored background)
2. Type (rounded, uppercase, small)
3. Count (circular, number inside)
4. Dot (small circle indicator)
5. Removable (with X button)
```

### Modal Variants
```
1. Standard (centered, 600px max-width)
2. Small (400px max-width)
3. Large (800px max-width)
4. Full Screen (mobile)
5. Side Panel (slides from right)
6. Confirmation (with icon, centered text)
7. Form Modal (with form fields)
```

### Toast Variants
```
1. Success (green icon + border)
2. Error (red icon + border)
3. Warning (amber icon + border)
4. Info (blue icon + border)
5. Loading (spinner + text)
6. With Action (button on right)
```

---

## Google Stitch Prompts

### 1. Landing Page

```
Create a light mode landing page for DevDocs AI with an academic journal aesthetic.

Layout:
- Full-height centered hero section
- Max width 1200px, content centered
- Vertical stack with 40px spacing between sections

Elements:
- H1: "DevDocs AI" (56px Lora weight 330, #141413)
  * Very light, elegant serif heading
  * Line height 1.2
- Tagline: "AI-powered pre-build planning assistant for developers" (18px Lora weight 400, #3d3d3a)
  * Serif for emphasis, slightly lighter than display
- Description: "Interview with AI before you code. Get a complete 10-file documentation bundle covering architecture, database, API contracts, testing, and deployment." (16px Inter weight 400, #3d3d3a, max-width 600px)
  * Sans-serif for body text
  * Line height 1.4
- Two buttons side-by-side (16px gap):
  * "Get Started" (bg #141413, text #ffffff, 9.6px radius, 20px horizontal padding, 24px vertical padding, Inter weight 500)
  * "Sign In" (bg transparent, text #141413, border rgba(31,30,29,0.3), 9.6px radius, 20px horizontal padding)
- Feature list (3 items, 14px Inter weight 400, #73726c):
  * "✓ Bring Your Own API Key (BYOK)"
  * "✓ Your key never leaves your browser"
  * "✓ Free tier: 3 projects"

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings), Inter (body)
- Border radius: 9.6px (buttons)
- Spacing: multiples of 8px
- No shadows, use subtle borders (#dedcd1)
- Warm, inviting, sophisticated
```

### 2. Login Page

```
Create a light mode login page for DevDocs AI with academic journal aesthetic.

Layout:
- Centered card on full-height page
- Card: 448px max-width, 24px padding, #faf9f5 background, 1px #dedcd1 border, 9.6px radius
- Vertical stack with 24px spacing

Elements:
- Logo + "DevDocs AI" text (centered, 24px Lora weight 400, #141413)
- H2: "Sign in to your account" (24px Lora weight 400, #141413)
  * Serif heading, elegant
  * Line height 1.33
- Email input:
  * Label: "Email address" (14px Inter weight 400, #141413)
  * Input: auto height, #ffffff background, border rgba(31,30,29,0.15), 9.6px radius
  * Padding: 12px horizontal
  * Placeholder: "you@example.com" (#9c9a92)
  * Font: Inter 400
- Password input:
  * Label: "Password" (14px Inter weight 400, #141413)
  * Input: same styling as email
  * Placeholder: "••••••••"
- Submit button:
  * Text: "Sign in"
  * Full width, bg #141413, text #ffffff
  * 9.6px radius, 20px horizontal padding, 24px vertical padding
  * Font: Inter weight 500
- Divider: horizontal line (#dedcd1) with "Or continue with" text in center (12px Inter, #73726c)
- Google OAuth button:
  * Full width, bg transparent, border rgba(31,30,29,0.3)
  * 9.6px radius, 20px horizontal padding
  * Google icon + "Google" text (Inter 400, #141413)
- Footer text: "Don't have an account? Sign up" (14px Inter, #3d3d3a, "Sign up" is underlined on hover)

Style:
- Page background: #faf9f5 (Vellum White)
- Card background: #faf9f5 (same, or slightly lighter)
- Fonts: Lora (headings), Inter (body/inputs)
- Input focus: border darkens to rgba(31,30,29,0.3)
- All spacing: multiples of 8px
- No shadows, subtle borders only
- Warm, approachable, sophisticated
```

### 3. Onboarding Page - Step 1 (API Key)

```
Create a light mode onboarding page for API key setup with academic aesthetic.

Layout:
- Centered card, 600px max-width, 24px padding
- #faf9f5 background, 1px #dedcd1 border, 9.6px radius
- Vertical stack with 24px spacing

Elements:
- Step indicator: "Step 1 of 2" (11px Inter uppercase, #73726c, letter-spacing 0.05em)
- H2: "API Key Setup" (24px Lora weight 400, #141413)
  * Serif heading, line height 1.33
- Label: "Anthropic API Key" (14px Inter weight 400, #141413)
- Password input:
  * Background #ffffff, border rgba(31,30,29,0.15)
  * 9.6px radius, 12px horizontal padding
  * Placeholder: "sk-ant-api03-..." (#9c9a92)
  * Font: Inter 400
- Helper text: "Your API key is stored locally in your browser and never sent to our servers." (12px Inter, #73726c)
- Info card:
  * Background #faf9f5, border #dedcd1, 9.6px radius, 16px padding
  * Title: "Why do I need an API key?" (14px Inter weight 500, #141413)
  * Body: Explanation text (12px Inter weight 400, #3d3d3a, line height 1.4)
  * Link: "Get your API key from Anthropic →" (12px Inter weight 400, #141413, underline on hover)
- "Verify Key" button:
  * Full width, bg #141413, text #ffffff
  * 9.6px radius, 20px horizontal padding, 24px vertical padding
  * Font: Inter weight 500
- Divider: "Or for testing" text with horizontal lines (#dedcd1)
- "Use Mock Mode (No API Key Required)" button:
  * Full width, bg transparent, border rgba(31,30,29,0.3)
  * 9.6px radius, 20px horizontal padding
  * Text: Inter 400, #141413
- Small text: "Mock mode simulates AI responses for testing the UI" (11px Inter center, #9c9a92)

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings), Inter (body)
- Spacing: 16-24px between form elements (multiples of 8px)
- No shadows, subtle borders only
- Warm, inviting, academic
```
  * #15151580 background, 1px #2A2A2A border, 8px radius, 16px padding
  * Title: "Why do I need an API key?" (14px medium, #F9FAFB)
  * Body: Explanation text (12px, #9CA3AF)
  * Link: "Get your API key from Anthropic →" (12px, #3B82F6)
- "Verify Key" button:
  * Full width, 40px height, #3B82F6 background, white text
- Divider: "Or for testing" text with horizontal lines
- "Use Mock Mode (No API Key Required)" button:
  * Full width, 40px height, outlined (#2A2A2A border), #F9FAFB text
- Small text: "Mock mode simulates AI responses for testing the UI" (12px center, #9CA3AF)

Style:
- Background: #0A0A0A
- Font: Inter
- Spacing: 16px between form elements
```

### 4. Onboarding Page - Step 2 (Project Creation)

```
Create a light mode project creation screen with academic aesthetic.

Layout:
- Same card styling as Step 1
- Vertical stack with 24px spacing

Elements:
- Step indicator: "Step 2 of 2" (11px Inter uppercase, #73726c)
- H2: "Create Your First Project" (24px Lora weight 400, #141413)
- Label: "Project Name" (14px Inter weight 400, #141413)
- Text input:
  * Background #ffffff, border rgba(31,30,29,0.15)
  * 9.6px radius, 12px horizontal padding
  * Placeholder: "My Awesome Project" (#9c9a92)
  * Font: Inter 400
- Label: "Project Type" (14px Inter weight 400, #141413)
- Grid of 5 cards (2 columns on mobile, 3 on desktop, 16px gap):
  * Each card: #faf9f5 background, 1px #dedcd1 border, 9.6px radius, 16px padding
  * Hover: border darkens to #1f1e1d
  * Selected: border #141413, background tint
  * Icon (32px) at top (#141413 or #d97757 for accent)
  * Title (14px Inter weight 500, #141413)
  * Description (12px Inter weight 400, #3d3d3a)
  
  Cards:
  1. SaaS Application (💼 icon)
  2. API Service (🔌 icon)
  3. Internal Tool (🛠️ icon)
  4. Mobile App (📱 icon)
  5. Landing Page (🌐 icon)

- "Create Project" button:
  * Full width, bg #141413, text #ffffff
  * 9.6px radius, 20px horizontal padding, 24px vertical padding
  * Font: Inter weight 500
  * Disabled if no name or type selected (50% opacity)

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings), Inter (body)
- Card cursor: pointer
- Smooth transitions (200ms)
- Spacing: multiples of 8px
- No shadows, subtle borders only
```

### 5. Dashboard Page

```
Create a light mode dashboard for DevDocs AI with academic aesthetic.

Layout:
- Full-width with left sidebar (256px)
- Sidebar: #faf9f5 background, 1px #dedcd1 right border
- Main content: #faf9f5 background, 32px padding

Sidebar:
- Logo + "DevDocs AI" at top (24px Lora weight 400, #141413, 24px padding)
- Navigation items (vertical list, 8px gap):
  * "Projects" (active: subtle background tint, #141413 text)
  * "Settings" (#3d3d3a text)
  * Each: 12px padding, 0px radius (sharp for nav), 14px Inter weight 400
  * Hover: subtle background change
- User menu at bottom:
  * Avatar (32px circle) + name (14px Inter, #141413)
  * Sign out button (12px Inter, #73726c)

Main Content:
- Header:
  * H2: "Your Projects" (24px Lora weight 400, #141413) on left
  * "New Project" button (bg #141413, text #ffffff, 9.6px radius, 20px horizontal padding) on right
  * 32px padding bottom
- Project grid (3 columns, 24px gap):
  * Each card: #faf9f5 background, 1px #dedcd1 border, 9.6px radius, 20px padding
  * Hover: border darkens to #1f1e1d
  * Layout:
    - Header: Project name (16px Lora weight 400, #141413) + Type badge
    - Status badge: "In Progress" or "Complete" (11px Inter uppercase, subtle background)
    - Last modified: "2 hours ago" (12px Inter, #73726c)
    - Footer: "Open" button (transparent, text #3d3d3a, hover underline)

Empty State (if no projects):
- Centered content
- Icon (96px, #dedcd1 or subtle Terra Cotta accent)
- H3: "No projects yet" (20px Lora weight 400, #141413)
- Text: "Create your first project to get started" (14px Inter, #3d3d3a)
- "Create Project" button (bg #141413, text #ffffff)

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings), Inter (body)
- Smooth hover transitions
- No shadows, subtle borders only
- Spacing: multiples of 8px
- Warm, sophisticated, academic
```
- Header:
  * H2: "Your Projects" (24px semibold, #F9FAFB) on left
  * "New Project" button (#3B82F6, white text) on right
  * 32px padding bottom
- Project grid (3 columns, 24px gap):
  * Each card: #1A1A1A background, 1px #2A2A2A border, 8px radius, 20px padding
  * Hover: border #3B82F6
  * Layout:
    - Header: Project name (16px semibold, #F9FAFB) + Type badge
    - Status badge: "In Progress" (blue) or "Complete" (green)
    - Last modified: "2 hours ago" (12px, #9CA3AF)
    - Footer: "Open" button (ghost style)

Empty State (if no projects):
- Centered content
- Icon (96px, #2A2A2A)
- H3: "No projects yet" (20px semibold, #F9FAFB)
- Text: "Create your first project to get started" (14px, #9CA3AF)
- "Create Project" button (#3B82F6)

Style:
- Background: #0A0A0A
- Font: Inter
- Smooth hover transitions
```

### 6. Interview Page

```
Create a light mode interview page with three-column layout and academic aesthetic.

Layout:
- Full-height, three columns, borders between (#dedcd1)
- Left sidebar: 256px, #faf9f5 background
- Center pane: 50% of remaining width, #ffffff background
- Right pane: 50% of remaining width, #faf9f5 background

Left Sidebar (Domain Progress):
- Title: "Progress" (14px Inter weight 500, #141413, 24px padding)
- Progress bar:
  * 8px height, #dedcd1 background, 4px radius
  * Fill: #141413, smooth width transition
  * Label below: "2 / 10 domains" (12px Inter, #73726c)
- Domain list (vertical, 8px gap):
  * Each item: 12px padding, 0px radius (sharp for list items)
  * Icon (16px) + text (14px Inter weight 400)
  * Complete: #141413 icon with checkmark, #141413 text
  * In Progress: #d97757 icon (Terra Cotta accent), #141413 text, subtle background tint
  * Pending: #9c9a92 icon, #73726c text
  
  Domains:
  1. Planning & Scope
  2. Architecture
  3. Database
  4. API Contracts
  5. Environment
  6. Authentication
  7. Testing
  8. Monitoring
  9. Frontend
  10. Deployment

Center Pane (Chat):
- Header: Project name (16px Lora weight 400, #141413, 16px padding, 1px #dedcd1 bottom border)
- Messages area (scrollable, 16px padding):
  * User messages: right-aligned, #faf9f5 background, 12px padding, 9.6px radius
  * AI messages: left-aligned, #ffffff background, 1px #dedcd1 border, 12px padding, 9.6px radius
  * Text: 15px Inter weight 400, #3d3d3a, line height 1.4
  * Streaming cursor: 2px × 16px, #141413, blinking animation
  * 16px gap between messages
- Input area (fixed bottom):
  * Textarea: #ffffff background, 1px rgba(31,30,29,0.15) border, 9.6px radius, 12px padding
  * Placeholder: "Describe your project..." (#9c9a92)
  * Font: Inter 400
  * Send button: #141413 icon button (32px) on right
  * 16px padding around

Right Pane (Preview):
- Header: "Documentation Preview" (16px Lora weight 400, #141413, 16px padding, 1px #dedcd1 bottom border)
- Content area (scrollable, 24px padding):
  * Markdown-rendered content
  * Headings: Lora weight 400, #141413
  * Body text: Inter weight 400, #3d3d3a, line height 1.4
  * Code blocks: #faf9f5 background, #141413 text, 1px #dedcd1 border, Inter Mono font
  * Empty state: "Complete domains to see documentation" (centered, #9c9a92)

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings), Inter (body), Inter Mono (code)
- Smooth scrolling
- Streaming animation: word-by-word appearance
- No shadows, subtle borders only (#dedcd1)
- Warm, academic, sophisticated
```
- Background: #0A0A0A
- Font: Inter (UI), JetBrains Mono (code)
- Smooth scrolling
- Streaming animation: word-by-word appearance
```

### 7. Review Page

```
Create a light mode documentation review page with split-pane layout and academic aesthetic.

Layout:
- Full-height, two columns (40% / 60%)
- 1px #dedcd1 border between

Top Bar (full width):
- File tabs (horizontal scroll, 16px padding):
  * Each tab: 12px padding, 0px radius (sharp for tabs), 14px Inter weight 400
  * Active: #faf9f5 background, #141413 text, subtle bottom border
  * Inactive: transparent, #73726c text
  * Hover: subtle background tint
  * 8px gap between tabs
  
  Tabs:
  - PLANNING.md
  - ARCHITECTURE.md
  - DATABASE.md
  - API-CONTRACTS.md
  - ENV-STRATEGY.md
  - AUTH.md
  - TESTING.md
  - MONITORING.md
  - FRONTEND.md
  - DEPLOYMENT.md

- Actions (right side):
  * "Export ZIP" button (bg #141413, text #ffffff, 9.6px radius, 20px horizontal padding)
  * "Share" button (bg transparent, border rgba(31,30,29,0.3), 9.6px radius, 20px horizontal padding)
  * 8px gap between

Left Pane (Preview):
- Markdown-rendered content
- 32px padding
- #faf9f5 background
- Headings: Lora weight 400, #141413
- Body: Inter weight 400, #3d3d3a, 16px, line-height 1.6
- Code blocks: #ffffff background, #141413 text, 1px #dedcd1 border, 12px padding, 9.6px radius, Inter Mono font

Right Pane (Editor):
- Code editor appearance
- #ffffff background
- Line numbers on left (#9c9a92)
- Markdown syntax highlighting:
  * Headings: #141413 (bold)
  * Bold: #141413
  * Links: #3d3d3a (underlined)
  * Code: #73726c
- Inter Mono font, 14px
- 16px padding
- Cursor: 2px #141413 blinking line

Style:
- Background: #faf9f5 (Vellum White)
- Fonts: Lora (headings in preview), Inter (UI), Inter Mono (editor)
- Smooth tab transitions
- Synchronized scrolling (optional)
- No shadows, subtle borders only
- Academic, sophisticated aesthetic
```

### 8. Modal (Confirmation Dialog)

```
Create a light mode confirmation modal with academic aesthetic.

Overlay:
- Full-screen, rgba(20, 20, 19, 0.3) background (subtle dark overlay)
- Backdrop blur: 4px
- Fade in animation (200ms)

Modal:
- Centered, 400px max-width, 24px padding
- #faf9f5 background, 1px #dedcd1 border, 9.6px radius
- Scale in animation (200ms, from 0.95 to 1.0)
- Vertical stack, 24px spacing

Elements:
- Icon (48px, centered):
  * Warning: #d97757 (Terra Cotta)
  * Error: #d97757 (Terra Cotta - Anthropic uses minimal color)
  * Success: #141413 with checkmark
- H3: "Are you sure?" (20px Lora weight 400, #141413, centered)
  * Serif heading for elegance
- Body text: "This action cannot be undone." (14px Inter weight 400, #3d3d3a, centered, line height 1.4)
- Button group (horizontal, 8px gap):
  * "Cancel" (bg transparent, border rgba(31,30,29,0.3), text #141413, 9.6px radius, 20px horizontal padding)
  * "Confirm" (bg #141413, text #ffffff, 9.6px radius, 20px horizontal padding)
  * Both: Inter weight 500, equal width

Style:
- Background: rgba(20, 20, 19, 0.3) (overlay)
- Fonts: Lora (heading), Inter (body)
- Close on overlay click
- Escape key closes modal
- No shadows, subtle borders only
- Warm, sophisticated, understated
```

### 9. Toast Notification

```
Create a light mode toast notification with academic aesthetic.

Position:
- Fixed bottom-right
- 24px from edges
- Stack vertically (8px gap if multiple)

Toast:
- 400px max-width, 16px padding
- #faf9f5 background, 1px #dedcd1 border, 9.6px radius
- Subtle shadow: 0 4px 12px rgba(20,20,19,0.08)
- Slide in from right animation (200ms)
- Horizontal layout (16px gap)

Elements:
- Icon (20px) on left:
  * Success: #141413 checkmark
  * Error: #d97757 (Terra Cotta) X or exclamation
  * Warning: #d97757 (Terra Cotta) exclamation
  * Info: #141413 i
- Message text (14px Inter weight 400, #141413)
- Close button (icon, 16px, #73726c) on right

Border Left Accent:
- 4px width, colored by type:
  * Success: #141413
  * Error: #d97757 (Terra Cotta)
  * Warning: #d97757 (Terra Cotta)
  * Info: #141413

Behavior:
- Auto-dismiss after 5 seconds
- Fade out animation (200ms)
- Hover pauses auto-dismiss

Style:
- Background: #faf9f5 (Vellum White)
- Font: Inter
- Smooth animations
- Minimal color usage (Anthropic style)
- Subtle, sophisticated, understated
- No harsh shadows, very subtle depth
```

---

## Design Generation Tips

### For Best Results with Google Stitch:

1. **Use Anthropic's Color Palette** — Stick to Vellum White, Ink Black, and subtle neutrals
2. **Typography Hierarchy** — Lora weight 330 for display headings (very light!), Inter for body
3. **Border Radius** — Always 9.6px for interactive elements
4. **Spacing** — Use multiples of 8px only
5. **No Shadows** — Use subtle borders (#dedcd1) for depth instead
6. **Minimal Color** — Terra Cotta (#d97757) is the only accent, use sparingly
7. **Academic Aesthetic** — Think journal, not tech startup

### Example Enhanced Prompt:

```
Create a light mode login page for DevDocs AI following Anthropic's design system:

Background: #faf9f5 (Vellum White)
Card: 448px width, 24px padding, #faf9f5 background, 1px #dedcd1 border, 9.6px radius, centered

Typography: 
- Headings: Lora font (serif), weight 400, #141413
- Body: Inter font (sans-serif), weight 400, #3d3d3a
- Labels: Inter, weight 400, #141413

Inputs: #ffffff background, border rgba(31,30,29,0.15), 9.6px radius, 12px padding
Focus state: border darkens to rgba(31,30,29,0.3)

Primary button: bg #141413, text #ffffff, 9.6px radius, 20px horizontal padding, 24px vertical padding, Inter weight 500
Hover: subtle opacity change, transition 200ms

Secondary button: bg transparent, border rgba(31,30,29,0.3), text #141413

Spacing: 24px between major elements, 8px between related items (multiples of 8px only)

Style: Academic journal aesthetic, warm and inviting, sophisticated, no shadows (use subtle borders only), minimal decoration
```

---

## Version History

- **v2.0** (2026-05-08) — Complete redesign adopting Anthropic's "Academic Journal on Vellum" design system
- **v1.0** (2026-05-08) — Initial dark mode design guide

---

**Ready to Generate!**
All prompts now follow Anthropic's sophisticated, academic design system. Copy any prompt above directly into Google Stitch or similar AI design tools.
- Stack vertically (8px gap if multiple)

Toast:
- 400px max-width, 16px padding
- #1A1A1A background, 1px border, 8px radius
- Shadow: 0 10px 25px rgba(0,0,0,0.2)
- Slide in from right animation (200ms)
- Horizontal layout (16px gap)

Elements:
- Icon (20px) on left:
  * Success: #10B981 checkmark
  * Error: #EF4444 X
  * Warning: #F59E0B exclamation
  * Info: #3B82F6 i
- Message text (14px, #F9FAFB)
- Close button (icon, 16px) on right

Border Left:
- 4px width, colored by type:
  * Success: #10B981
  * Error: #EF4444
  * Warning: #F59E0B
  * Info: #3B82F6

Behavior:
- Auto-dismiss after 5 seconds
- Fade out animation (200ms)
- Hover pauses auto-dismiss

Style:
- Background: #1A1A1A
- Font: Inter
- Smooth animations
```

---

## Design Generation Tips

### For Best Results with Google Stitch:

1. **Be Specific:** Include exact pixel values, colors, and spacing
2. **Reference Components:** Use the component library above
3. **Mention Animations:** Specify hover states and transitions
4. **Dark Mode First:** All designs should be dark mode optimized
5. **Accessibility:** Mention focus states and keyboard navigation
6. **Responsive:** Specify mobile breakpoints when needed

### Example Enhanced Prompt:

```
Create a dark mode login page for DevDocs AI following these exact specifications:

Background: #0A0A0A
Card: 448px width, 48px padding, #1A1A1A background, 1px #2A2A2A border, 12px radius, centered vertically and horizontally

Typography: Inter font family
- Title: 24px semibold, #F9FAFB color
- Labels: 14px medium, #F9FAFB color
- Helper text: 12px regular, #9CA3AF color

Inputs: 40px height, #0A0A0A background, 1px #2A2A2A border, 6px radius, 8px padding
Focus state: #3B82F6 border with 1px ring

Primary button: Full width, 40px height, #3B82F6 background, white text, 6px radius
Hover: darken to #2563EB, transition 150ms

Include Google OAuth button below with same styling but outlined (1px #2A2A2A border, transparent background)

Add "Don't have an account? Sign up" text at bottom (14px, #9CA3AF, "Sign up" in #3B82F6)

Spacing: 24px between all major elements, 8px between label and input
```

---

## Version History

- **v1.0** (2026-05-08) — Initial Google Stitch-optimized guide

---

**Ready to Generate!**
Copy any prompt above directly into Google Stitch or similar AI design tools.
