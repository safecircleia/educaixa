# Design Principles

## Typography
- **Primary Typeface:** GeistSans (as imported in layout.tsx) with fallback to sans-serif.
- **Secondary Typeface:** nothingFont (custom local font) for accent text.
- **Headings:**  
  - H1: 32px, line-height 1.2, bold  
  - H2: 28px, line-height 1.3, bold  
  - H3: 24px, line-height 1.3, bold  
- **Subheadings:** 20px, line-height 1.4, medium weight  
- **Body Text:** 16px, line-height 1.5, regular weight  
- **Captions:** 12px, line-height 1.4, light weight  
- **Guidance:** Use GeistSans for primary content and nothingFont to highlight specific UI elements. Maintain a clear hierarchy with size and weight variations.

## Color Palette
- **Primary Color:**  
  - Defined via CSS variable `--primary` in globals.css  
  - Example: HEX #1a73e8 or equivalent tokens based on your implementation.
- **Secondary Color:**  
  - Defined via CSS variable `--secondary`.
- **Accent Color:**  
  - Defined via CSS variable `--accent`.
- **Neutral Colors:**  
  - Use CSS variables such as `--background`, `--foreground`, and additional grayscale tokens from globals.css.
- **Gradients:** Use subtle gradients combining primary and secondary colors as needed.

## Spacing and Layout
- **Grid System:** 12-column grid with flexible column widths.
- **Gutters/Margins:** Default gutter width is 16px; use an 8px baseline for margins and padding.
- **Consistent Spacing:** Apply spacing units in 8px increments (8px, 16px, 24px, etc.).
- **Responsive Breakpoints:**  
  - Mobile: up to 640px  
  - Tablet: 641px to 1024px  
  - Desktop: 1025px and above

## Imagery and Icons
- **Imagery Style:** High-quality photography or custom illustrations that represent the brand.
- **Image Treatment:** Apply consistent filters or overlays where necessary.
- **Icon Set:** Use a consistent icon library (e.g., Lucide or FontAwesome) with uniform sizes (e.g., 24px) and stroke weights.
- **Guidance:** Maintain a unified look across imagery and icons.

## Components and UI Patterns
- **Reusable Components:**  
  - Buttons (with states: default, hover, active, disabled)  
  - Cards, Forms, etc.
- **Interactive Elements:** Ensure dropdowns, modals, and tooltips are intuitive with proper focus states.
- **Accessibility:** Ensure all components meet contrast, keyboard-navigable, and ARIA guidelines.

## Brand Voice and Tone
- **Style:** Clear, concise, and friendly.
- **Tone:** Professional yet approachable.
- **Microcopy Examples:**  
  - Error: "Something went wrong, please try again."  
  - Placeholder: "Enter your email address"
  
## Accessibility
- **Standards:** Must comply with WCAG 2.1.
- **Color Contrast:** Maintain a minimum ratio of 4.5:1 for normal text.
- **Keyboard Navigation:** All interactive elements should be easily accessible.
- **Screen Reader Compatibility:** Use semantic HTML and appropriate ARIA roles.

## File Structure and Naming Conventions
- **Design Assets:** Organize assets into directories (e.g., /assets/fonts, /assets/images, /assets/icons).
- **Naming:** Use kebab-case for files, ensuring names are consistent and descriptive.

