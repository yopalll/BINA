---
name: Bina Vibrant Learning
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#3e4949'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#6e7979'
  outline-variant: '#bdc9c8'
  surface-tint: '#00696b'
  primary: '#00696b'
  on-primary: '#ffffff'
  primary-container: '#5fb7b9'
  on-primary-container: '#004647'
  inverse-primary: '#7dd5d7'
  secondary: '#924c0d'
  on-secondary: '#ffffff'
  secondary-container: '#fea360'
  on-secondary-container: '#753900'
  tertiary: '#316768'
  on-tertiary: '#ffffff'
  tertiary-container: '#7eb3b4'
  on-tertiary-container: '#064647'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9af1f3'
  primary-fixed-dim: '#7dd5d7'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#004f51'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb784'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#713700'
  tertiary-fixed: '#b6eced'
  tertiary-fixed-dim: '#9ad0d1'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#144e50'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system focuses on creating a high-energy, inclusive, and modern educational environment. It balances professional reliability with a friendly, approachable spirit tailored for the dynamic relationship between students and teachers.

The visual style is a fusion of **Corporate Modern** and **Soft Minimalism**. It utilizes generous whitespace to reduce cognitive load while employing bold splashes of color and highly rounded geometry to evoke a sense of playfulness and safety. The primary emotional response should be one of clarity, optimism, and motivation. Key visual motifs include large, readable headers and tactile, "bubbly" interface elements that feel responsive to touch.

## Colors
The palette is derived from the core identity to ensure brand cohesion.
- **Primary (#5FB7B9):** A calm, studious teal used for primary actions, navigation, and brand-heavy elements.
- **Secondary (#E8914F):** A vibrant orange used as a functional accent for notifications, highlights, and secondary calls-to-action to spark energy.
- **Tertiary (#A2D8D9):** A softer, desaturated teal used for backgrounds, chip containers, and subtle UI layering.
- **Neutrals:** The system uses a deep charcoal (#1A1C1E) for high-contrast typography and a series of soft off-whites/light grays (#F8FAFA, #EDF2F2) for surface backgrounds.

This system prioritizes WCAG 2.1 AA compliance, ensuring that all text-on-color combinations provide sufficient contrast for users with visual impairments.

## Typography
**Inter** is selected for its exceptional legibility and neutral, systematic tone. It provides the clarity needed for long-form educational content while remaining modern.

The type scale is generous to accommodate varied reading speeds and accessibility needs. Headlines are bold and slightly condensed in tracking to create a strong visual hierarchy. Body text utilizes a standard 16px base for optimal readability on mobile devices. For labels and captions, we use a medium weight to ensure visibility even at smaller scales.

## Layout & Spacing
This design system employs a **Fluid Grid** model based on an 8px rhythm. 

- **Mobile:** A 4-column grid with 20px side margins and 16px gutters.
- **Tablet:** An 8-column grid with 32px margins.
- **Reflow:** Components like cards and input fields should span the full width of the grid on mobile, while larger layouts can utilize side-by-side positioning on wider viewports.

Spacing between functional groups should be kept at 24px (lg) or 32px (xl) to create a sense of openness and prevent the UI from feeling cluttered, which is vital for maintaining focus in an educational context.

## Elevation & Depth
The system uses **Tonal Layers** and **Ambient Shadows** to define hierarchy. 

Depth is primarily communicated through color-value shifts (using the Tertiary teal for cards against an off-white background). Where elevation is required (e.g., floating action buttons or primary modals), use an extremely soft, diffused shadow:
- **Shadow Soft:** `0px 4px 20px rgba(95, 183, 185, 0.08)` — A primary-tinted shadow that feels integrated into the interface rather than hovering detachedly.
- Avoid harsh black shadows; always tint shadows with the primary or neutral-blue tones to maintain a modern, "clean" look.

## Shapes
To reinforce the friendly and approachable brand personality, this design system uses a **Pill-shaped (3)** roundedness logic. 

- Standard components (buttons, small inputs) use a 1rem (16px) radius.
- Large containers (cards, content blocks) use `rounded-2xl` (24px) or `rounded-3xl` (32px) to create a soft, organic feel.
- This extreme roundedness removes "sharpness" from the learning experience, making the app feel more like a tool for growth and less like a rigid institutional platform.

## Components

- **Buttons:** Primary buttons are high-contrast teal with white text, utilizing 16px of vertical padding and rounded-full (pill) shapes. Secondary buttons use an orange outline or light orange background.
- **Cards:** Cards use a `rounded-3xl` radius. They should have a subtle 1px border in a light teal-gray or a very soft ambient shadow to distinguish them from the background.
- **Inputs:** Input fields are large (min-height 56px) with 16px rounded corners. Use the Primary teal for the focus state border (2px) to ensure clear interactive feedback.
- **Chips/Tags:** Used for categories or status. These should be `rounded-full` with a light tertiary background and primary-colored text.
- **Progress Bars:** In keeping with the "vibrant" theme, progress bars use a thick 8px stroke with rounded ends, utilizing the orange accent color to show completion/achievement.
- **Lists:** List items should be separated by whitespace rather than lines where possible, using a `rounded-2xl` background on press/hover states.