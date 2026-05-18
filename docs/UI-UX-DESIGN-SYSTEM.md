# DevDocs AI — UI/UX Design System
**Version:** 1.0  
**Last Updated:** 2026-05-08  
**Purpose:** Comprehensive design reference for UI generation tools

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Page Layouts](#page-layouts)
7. [User Flows](#user-flows)
8. [Interaction Patterns](#interaction-patterns)
9. [Accessibility](#accessibility)
10. [Responsive Design](#responsive-design)

---

## Design Philosophy

### Core Principles
1. **Clarity Over Cleverness** — Every element serves a clear purpose
2. **Progressive Disclosure** — Show complexity only when needed
3. **Feedback-Rich** — Users always know what's happening
4. **Professional & Trustworthy** — This is a developer tool, not a consumer app
5. **Speed Matters** — Fast interactions, instant feedback, no unnecessary animations

### Visual Style
- **Modern Minimalism** — Clean, spacious, uncluttered
- **Developer-Focused** — Monospace fonts for code, technical aesthetic
- **Dark Mode First** — Optimized for long coding sessions
- **Subtle Depth** — Minimal shadows, border-based hierarchy

### Tone
- Professional but approachable
- Technical but not intimidating
- Confident but not arrogant

---

## Color System

### Primary Palette

**Light Mode:**
```
Background:     #FFFFFF (white)
Surface:        #F9FAFB (gray-50)
Border:         #E5E7EB (gray-200)
Muted:          #F3F4F6 (gray-100)
Text Primary:   #111827 (gray-900)
Text Secondary: #6B7280 (gray-500)
```

**Dark Mode:**
```
Background:     #0A0A0A (near-black)
Surface:        #1A1A1A (dark-gray)
Border:         #2A2A2A (medium-gray)
Muted:          #151515 (darker-gray)
Text Primary:   #F9FAFB (off-white)
Text Secondary: #9CA3AF (gray-400)
```

### Accent Colors

**Primary (Blue):**
```
Light Mode: #2563EB (blue-600)
Dark Mode:  #3B82F6 (blue-500)
Hover:      #1D4ED8 (blue-700)
```

**Success (Green):**
```
Light Mode: #059669 (emerald-600)
Dark Mode:  #10B981 (emerald-500)
Background: #ECFDF5 (emerald-50) / #064E3B20 (dark)
```

**Error (Red):**
```
Light Mode: #DC2626 (red-600)
Dark Mode:  #EF4444 (red-500)
Background: #FEF2F2 (red-50) / #7F1D1D20 (dark)
```

**Warning (Amber):**
```
Light Mode: #D97706 (amber-600)
Dark Mode:  #F59E0B (amber-500)
Background: #FFFBEB (amber-50) / #78350F20 (dark)
```

### Semantic Colors

**Interview Streaming:**
```
Streaming Indicator: #3B82F6 (blue-500)
Cursor Blink:        #3B82F6 with opacity animation
Token Highlight:     #DBEAFE (blue-100) / #1E3A8A20 (dark)
```

**Domain Progress:**
```
Complete:    #10B981 (emerald-500)
In Progress: #3B82F6 (blue-500)
Pending:     #6B7280 (gray-500)
```

---

## Typography

### Font Families

**Sans-Serif (UI Text):**
```
Primary: Inter, system-ui, -apple-system, sans-serif
Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```

**Monospace (Code & Technical):**
```
Primary: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace
Weights: 400 (regular), 500 (medium)
Use for: API keys, code snippets, file names, technical identifiers
```

### Type Scale

**Headings:**
```
H1: 36px / 2.25rem — font-bold — line-height: 1.2 — letter-spacing: -0.02em
H2: 30px / 1.875rem — font-bold — line-height: 1.3 — letter-spacing: -0.01em
H3: 24px / 1.5rem — font-semibold — line-height: 1.4
H4: 20px / 1.25rem — font-semibold — line-height: 1.5
H5: 18px / 1.125rem — font-medium — line-height: 1.5
H6: 16px / 1rem — font-medium — line-height: 1.5
```

**Body Text:**
```
Large:   18px / 1.125rem — font-regular — line-height: 1.6
Base:    16px / 1rem — font-regular — line-height: 1.5
Small:   14px / 0.875rem — font-regular — line-height: 1.5
XSmall:  12px / 0.75rem — font-regular — line-height: 1.4
```

**Special:**
```
Code Inline:  14px / 0.875rem — monospace — background: muted — padding: 2px 6px — border-radius: 4px
Code Block:   14px / 0.875rem — monospace — line-height: 1.6
Button Text:  14px / 0.875rem — font-medium — letter-spacing: 0.01em
Label:        14px / 0.875rem — font-medium — text-transform: none
```

---

## Spacing & Layout

### Spacing Scale (Tailwind-based)
```
0:   0px
1:   4px    (0.25rem)
2:   8px    (0.5rem)
3:   12px   (0.75rem)
4:   16px   (1rem)
5:   20px   (1.25rem)
6:   24px   (1.5rem)
8:   32px   (2rem)
10:  40px   (2.5rem)
12:  48px   (3rem)
16:  64px   (4rem)
20:  80px   (5rem)
24:  96px   (6rem)
```

### Layout Grid
```
Container Max Width: 1280px (xl)
Gutter: 24px (desktop) / 16px (mobile)
Columns: 12-column grid
Gap: 24px
```

### Component Spacing Patterns

**Card Padding:**
```
Small:  16px (p-4)
Medium: 24px (p-6)
Large:  32px (p-8)
```

**Section Spacing:**
```
Between sections: 64px (space-y-16)
Between elements: 24px (space-y-6)
Between related items: 16px (space-y-4)
```

**Form Spacing:**
```
Between fields: 16px (space-y-4)
Label to input: 8px (mt-2)
Input to helper text: 8px (mt-2)
```

---

## Components

### 1. Buttons

**Primary Button:**
```
Background: Primary color (#2563EB)
Text: White
Padding: 8px 16px (py-2 px-4)
Border Radius: 6px (rounded-md)
Font: 14px medium
Height: 40px
Hover: Darken 10%
Active: Darken 15%
Disabled: Opacity 50%
Focus: Ring 2px primary color with 50% opacity
```

**Secondary Button:**
```
Background: Transparent
Border: 1px solid border color
Text: Primary text color
Padding: 8px 16px
Border Radius: 6px
Hover: Background muted
```

**Ghost Button:**
```
Background: Transparent
Text: Primary text color
Padding: 8px 16px
Hover: Background muted
```

**Icon Button:**
```
Size: 40x40px
Padding: 8px
Border Radius: 6px
Icon Size: 20px
Hover: Background muted
```

### 2. Input Fields

**Text Input:**
```
Height: 40px
Padding: 8px 12px
Border: 1px solid border color
Border Radius: 6px
Font: 14px regular
Background: Background color
Focus: Border primary color + ring 1px
Error: Border error color + ring 1px error
Disabled: Background muted + opacity 60%
```

**Textarea:**
```
Min Height: 120px
Padding: 12px
Border: 1px solid border color
Border Radius: 6px
Resize: Vertical only
```

**Select Dropdown:**
```
Height: 40px
Padding: 8px 12px
Border: 1px solid border color
Border Radius: 6px
Icon: Chevron down (16px) on right
```

### 3. Cards

**Standard Card:**
```
Background: Surface color
Border: 1px solid border color
Border Radius: 8px (rounded-lg)
Padding: 24px (p-6)
Shadow: None (border-based design)
Hover: Border color slightly darker
```

**Interactive Card (Clickable):**
```
Same as standard card
Hover: Border primary color + slight scale (1.01)
Cursor: Pointer
Transition: All 150ms ease
```

**Project Card:**
```
Background: Surface
Border: 1px solid border
Border Radius: 8px
Padding: 20px
Layout:
  - Header: Project name (H4) + Type badge
  - Body: Status indicator + Last modified
  - Footer: Action buttons (Edit, Delete)
Hover: Border primary color
```

### 4. Badges

**Status Badge:**
```
Padding: 4px 12px (py-1 px-3)
Border Radius: 12px (rounded-full)
Font: 12px medium
Text Transform: Capitalize

Variants:
- In Progress: Blue background + blue text
- Complete: Green background + green text
- Archived: Gray background + gray text
```

**Type Badge:**
```
Padding: 4px 8px
Border Radius: 4px
Font: 11px medium
Text Transform: Uppercase
Letter Spacing: 0.05em

Variants:
- SaaS: Purple
- API: Blue
- Mobile: Green
- Internal Tool: Orange
- Landing Page: Pink
```

### 5. Toast Notifications

**Toast Container:**
```
Position: Fixed bottom-right
Offset: 24px from edges
Max Width: 400px
Z-Index: 9999
```

**Toast Item:**
```
Background: Surface (elevated)
Border: 1px solid border
Border Radius: 8px
Padding: 16px
Shadow: 0 10px 25px rgba(0,0,0,0.1)
Animation: Slide in from right + fade in (200ms)

Layout:
- Icon (20px) on left
- Message text (14px)
- Close button (icon) on right

Variants:
- Success: Green icon + green border-left (4px)
- Error: Red icon + red border-left
- Warning: Amber icon + amber border-left
- Info: Blue icon + blue border-left

Auto-dismiss: 5 seconds
```

### 6. Modal/Dialog

**Overlay:**
```
Background: rgba(0, 0, 0, 0.5) dark mode / rgba(0, 0, 0, 0.3) light mode
Backdrop Blur: 4px
Z-Index: 1000
Animation: Fade in (200ms)
```

**Modal Container:**
```
Background: Background color
Border: 1px solid border
Border Radius: 12px
Max Width: 600px
Padding: 32px
Shadow: 0 20px 50px rgba(0,0,0,0.2)
Animation: Scale from 0.95 + fade in (200ms)

Layout:
- Header: Title (H3) + Close button
- Body: Content with 24px spacing
- Footer: Action buttons (right-aligned)
```

### 7. Progress Indicators

**Domain Progress Bar:**
```
Height: 8px
Background: Muted color
Border Radius: 4px
Fill: Primary color
Animation: Smooth width transition (300ms)
Label: "X / 10 domains" below bar
```

**Spinner:**
```
Size: 24px
Border: 3px
Color: Primary color
Animation: Rotate 360deg (1s linear infinite)
```

**Streaming Indicator:**
```
Type: Blinking cursor
Size: 2px width × 16px height
Color: Primary color
Animation: Opacity 0 → 1 (500ms ease-in-out infinite)
Position: After last token
```

### 8. Navigation

**Top Navigation Bar:**
```
Height: 64px
Background: Surface color
Border Bottom: 1px solid border
Padding: 0 24px
Layout: Logo (left) + Nav items (center) + User menu (right)
Sticky: Yes (top: 0)
Z-Index: 100
```

**Sidebar Navigation:**
```
Width: 256px
Background: Surface color
Border Right: 1px solid border
Padding: 24px 16px
Layout: Vertical list of nav items

Nav Item:
- Padding: 12px 16px
- Border Radius: 6px
- Font: 14px medium
- Icon: 20px on left
- Hover: Background muted
- Active: Background primary (10% opacity) + text primary color
```

---

## Page Layouts

### 1. Landing Page (/)

**Hero Section:**
```
Layout: Centered content
Max Width: 800px
Padding: 96px 24px
Spacing: 32px between elements

Elements:
- H1: "DevDocs AI" (36px bold)
- Tagline: "AI-powered pre-build planning assistant" (18px)
- Description: 2-3 sentences (16px, max-width 600px)
- CTA Buttons: "Get Started" (primary) + "Sign In" (secondary)
- Features List: 3 checkmarks with text (14px)
```

### 2. Authentication Pages (/login, /signup)

**Layout:**
```
Full-height centered card
Card Max Width: 448px
Card Padding: 48px
Background: Subtle gradient or pattern

Elements:
- Logo + App Name (centered)
- Page Title (H2)
- Form Fields (stacked, 16px spacing)
- Submit Button (full width)
- Divider: "Or continue with"
- OAuth Buttons (full width)
- Footer Link: "Don't have an account? Sign up"
```

### 3. Onboarding Page (/onboarding)

**Layout:**
```
Centered card with stepper
Card Max Width: 600px
Card Padding: 48px

Step Indicator:
- Horizontal dots or numbers
- Current step highlighted
- 24px spacing between steps

Step 1 - API Key:
- Title: "Step 1: API Key Setup"
- Input field (password type)
- Helper text below
- Security explanation card
- "Verify Key" button
- "Use Mock Mode" button (secondary)

Step 2 - Project Creation:
- Title: "Step 2: Create Your First Project"
- Project name input
- Project type selector (5 cards in grid)
- "Create Project" button
```

### 4. Dashboard (/dashboard)

**Layout:**
```
Full-width with sidebar
Sidebar: 256px (navigation)
Main: Remaining width

Header:
- Title: "Your Projects" (H2)
- "New Project" button (right)
- Padding: 32px

Content:
- Empty State (if no projects):
  - Icon (96px)
  - Title: "No projects yet"
  - Description
  - "Create Project" button

- Project Grid (if projects exist):
  - Grid: 3 columns (desktop) / 2 (tablet) / 1 (mobile)
  - Gap: 24px
  - Each: Project Card component
```

### 5. Interview Page (/project/[id]/interview)

**Layout:**
```
Full-height split-pane with sidebar

Sidebar (Left):
- Width: 256px
- Background: Muted
- Padding: 24px
- Content: Domain Progress component

Main Content (Center-Right):
- Split 50/50 horizontally
- No gap (border between)

Left Pane - Chat:
- Header: Project name + status
- Messages: Scrollable area
- Input: Fixed at bottom (textarea + send button)

Right Pane - Preview:
- Header: "Documentation Preview"
- Content: Markdown-rendered documentation
- Tabs: One per completed domain
- Scrollable
```

### 6. Review Page (/project/[id]/review)

**Layout:**
```
Full-width split-pane

Left Pane (40%):
- Markdown preview (rendered)
- Padding: 32px
- Background: Surface

Right Pane (60%):
- Code editor (markdown source)
- Padding: 0 (editor fills space)
- Background: Darker surface

Top Bar:
- File tabs (horizontal scroll)
- Export ZIP button (right)
- Share button (right)
```

---

## User Flows

### Flow 1: New User Onboarding

```
1. Landing Page
   ↓ Click "Get Started"
2. Sign Up Page
   ↓ Enter email + password → Submit
3. Email Verification
   ↓ Click link in email
4. Onboarding - Step 1 (API Key)
   ↓ Enter key OR click "Use Mock Mode"
5. Onboarding - Step 2 (Project Creation)
   ↓ Enter name + select type → Create
6. Interview Page
   ↓ Start conversation
```

### Flow 2: Returning User

```
1. Landing Page
   ↓ Click "Sign In"
2. Login Page
   ↓ Enter credentials
3. Dashboard
   ↓ Click existing project OR create new
4. Interview Page (resume) OR Review Page (if complete)
```

### Flow 3: Complete Interview

```
1. Interview Page
   ↓ Answer questions across 10 domains
2. Domain completes → Preview updates
   ↓ Repeat for all domains
3. All domains complete → Prompt to review
   ↓ Click "Review Documentation"
4. Review Page
   ↓ Edit files, export ZIP, or share
```

---

## Interaction Patterns

### 1. Streaming Text Animation

**Behavior:**
```
- Tokens appear word-by-word (not character-by-character)
- Delay: 30-50ms between words
- Cursor blinks at end of stream
- Smooth scroll to keep latest text visible
- User can scroll up without interrupting stream
```

**Visual:**
```
- New tokens fade in slightly (opacity 0.7 → 1.0 over 100ms)
- Cursor: 2px wide vertical line, blinks every 500ms
- Background highlight on current streaming message (subtle)
```

### 2. Domain Completion

**Behavior:**
```
1. AI outputs [DOMAIN_COMPLETE: domain_name]
2. System detects signal
3. Preview panel updates with new section
4. Progress bar animates to next step
5. Toast notification: "✓ Planning domain complete"
6. Sidebar domain item changes from blue → green
```

**Animation:**
```
- Preview content slides in from right (200ms)
- Progress bar width animates smoothly (300ms)
- Domain item color transition (200ms)
```

### 3. Form Validation

**Real-time Validation:**
```
- Validate on blur (not on every keystroke)
- Show error state immediately
- Error message appears below field
- Icon changes to error icon (red X)
- Border color changes to error color
```

**Success State:**
```
- Green checkmark icon appears
- Border color changes to success color
- Success message (optional)
```

### 4. Loading States

**Button Loading:**
```
- Text changes to "Loading..." or specific action
- Spinner appears on left of text
- Button disabled
- Cursor: not-allowed
```

**Page Loading:**
```
- Full-page spinner (centered)
- Text: "Loading..." below spinner
- Background: Slightly dimmed
```

**Skeleton Loading:**
```
- Use for lists and cards
- Animated gradient shimmer (left to right)
- Matches final content dimensions
```

### 5. Hover States

**Interactive Elements:**
```
- Cursor: pointer
- Transition: all 150ms ease
- Scale: 1.01 (subtle)
- Border color change
- Background color change (subtle)
```

**Non-Interactive Elements:**
```
- Cursor: default
- No hover effect
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast:**
```
- Text on background: Minimum 4.5:1
- Large text (18px+): Minimum 3:1
- Interactive elements: Minimum 3:1
- Test all color combinations
```

**Keyboard Navigation:**
```
- All interactive elements focusable
- Focus indicator: 2px solid ring, primary color
- Tab order: Logical (top to bottom, left to right)
- Escape key: Close modals/dropdowns
- Enter key: Submit forms, activate buttons
- Arrow keys: Navigate lists/tabs
```

**Screen Reader Support:**
```
- All images have alt text
- All form inputs have labels
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content (streaming, toasts)
- Semantic HTML (nav, main, article, aside)
- Heading hierarchy (h1 → h2 → h3, no skips)
```

**Focus Management:**
```
- Focus trapped in modals
- Focus returns to trigger after modal close
- Skip to main content link
- Focus visible on all interactive elements
```

---

## Responsive Design

### Breakpoints
```
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md-lg)
Desktop: > 1024px   (xl)
```

### Mobile Adaptations

**Navigation:**
```
- Top nav becomes hamburger menu
- Sidebar collapses to overlay
- User menu becomes dropdown
```

**Interview Page:**
```
- Split-pane becomes tabbed view
- Tabs: "Chat" and "Preview"
- Sidebar becomes bottom sheet (swipe up)
```

**Dashboard:**
```
- Project grid: 1 column
- Cards: Full width
- Padding reduced to 16px
```

**Forms:**
```
- Inputs: Full width
- Buttons: Full width
- Reduced padding (16px instead of 24px)
```

### Touch Targets
```
Minimum: 44x44px (iOS) / 48x48px (Android)
Spacing: 8px minimum between targets
```

---

## Animation Guidelines

### Timing
```
Fast:   100-150ms (hover, focus)
Medium: 200-300ms (transitions, slides)
Slow:   400-500ms (page transitions)
```

### Easing
```
Standard: ease-in-out
Enter:    ease-out
Exit:     ease-in
Bounce:   cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Performance
```
- Use transform and opacity only (GPU-accelerated)
- Avoid animating width, height, top, left
- Use will-change sparingly
- Reduce motion for users with prefers-reduced-motion
```

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-success: #059669;
  --color-error: #DC2626;
  --color-warning: #D97706;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-sans: Inter, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## Implementation Notes for Design Tools

### For Google Stitch / AI Design Generators:

1. **Use this document as context** when generating designs
2. **Prioritize consistency** — all components should feel cohesive
3. **Follow the spacing scale** — don't invent new spacing values
4. **Respect the color system** — use defined colors only
5. **Typography hierarchy** — maintain the type scale
6. **Component reuse** — use the same button/input/card styles throughout
7. **Accessibility first** — ensure contrast ratios and focus states
8. **Mobile-first** — design for mobile, then scale up

### Design Generation Prompts:

**Example 1: Landing Page**
```
"Create a landing page for DevDocs AI following the design system. 
Include: centered hero with H1 'DevDocs AI', tagline, description, 
two CTA buttons (primary 'Get Started', secondary 'Sign In'), 
and a features list with checkmarks. Use the defined color palette, 
Inter font, and spacing scale. Dark mode optimized."
```

**Example 2: Interview Page**
```
"Design the interview page with three-column layout: left sidebar (256px) 
with domain progress, center pane (50%) with chat interface, right pane (50%) 
with markdown preview. Use surface colors, border-based design, no shadows. 
Include streaming text animation and domain completion states."
```

---

## Version History

- **v1.0** (2026-05-08) — Initial design system documentation

---

**Questions or Clarifications?**
Refer to the existing codebase in `components/` and `app/` directories for implementation examples.
