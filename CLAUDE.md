# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business landing page for **Sistemas Pamplona**, a Colombian technical services company offering hardware maintenance, network installation, and software development. Built with pure vanilla HTML, CSS, and JavaScript - no build process or dependencies required.

## Technology Stack

- **Pure Vanilla Stack**: HTML5, CSS3, JavaScript (ES6+)
- **Email Service**: EmailJS for contact form submissions
- **External Dependencies**:
  - EmailJS library (loaded via CDN)
  - Google Fonts (Inter, JetBrains Mono)
- **No Build Tools**: Direct file serving, no webpack/bundler required

## File Structure

```
/
├── index.html              # Main landing page (597 lines)
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles with CSS variables (1000+ lines)
│   ├── js/
│   │   └── main.js         # All JavaScript functionality (358 lines)
│   └── images/             # Team photos and assets
│       ├── mauricio-pamplona.jpg
│       ├── mayerly-vera.jpg
│       └── ricardo-bonilla.jpg
└── README.md               # Empty file
```

## Development Workflow

### Local Development
```bash
# No build process - open directly in browser
open index.html
# Or use a simple HTTP server if needed
python3 -m http.server 8000
```

### Making Changes
1. **HTML**: Edit `index.html` directly
2. **Styles**: Edit `assets/css/styles.css`
3. **JavaScript**: Edit `assets/js/main.js`
4. **No compilation step required** - changes are immediately visible on refresh

### Git Operations
Standard git workflow from repository root:
```bash
git status
git add .
git commit -m "message"
git push
```

## Key Features & Architecture

### CSS Architecture
- **CSS Custom Properties**: Centralized theming in `:root` selector
- **Company Colors**:
  - Green: `#4CAF50` (primary)
  - Blue: `#1565C0` (secondary)
  - Orange: `#FF9800` (accent)
- **Design System**: Comprehensive shadow system, gray scale palette, gradients
- **Responsive**: Mobile-first approach with media queries

### JavaScript Functionality
All functionality in `main.js`:
- **Smooth Scrolling**: Hash navigation with header offset compensation
- **Header Effects**: Scroll-based styling (`.scrolled` class at >50px)
- **Mobile Menu**: Toggle functionality for responsive navigation
- **Intersection Observer**: Fade-in animations for `.fade-in` elements
- **EmailJS Integration**: Contact form submission (requires configuration)
- **Typing Effect**: Hero title animation (lines 222-300)
- **Parallax**: Hero visual section (lines 303-311)
- **Counter Animation**: Stats number counting (lines 314-356)

### EmailJS Configuration

**IMPORTANT**: EmailJS credentials are placeholders and must be replaced:

1. **Required Updates** in `assets/js/main.js`:
   - Line 76: Replace `"TU_PUBLIC_KEY"` with EmailJS Public Key
   - Line 129: Replace `'TU_SERVICE_ID'` with EmailJS Service ID
   - Line 130: Replace `'TU_TEMPLATE_ID'` with EmailJS Template ID

2. **Recipient Email**: Line 123 - currently hardcoded to `ricardoandresbonilla@gmail.com`

3. **Template Parameters** (lines 110-125):
   ```javascript
   {
     from_name, from_email, from_telefono,
     from_empresa, servicio_interes, message,
     to_email, reply_to
   }
   ```

4. **Form Fields** mapped to services:
   - desarrollo-software
   - venta-equipos
   - mantenimiento
   - reparacion-hardware
   - instalacion-redes
   - instalacion-camaras

## Content & Services

### Services Offered
1. **Mantenimiento de Equipos** - Preventive/corrective maintenance
2. **Reparación de Hardware** - Component repair and replacement
3. **Desarrollo de Software** - Custom applications (Angular, React, Node.js, Python)
4. **Instalación de Redes** - LAN/WAN, structured cabling
5. **Instalación de Cámaras** - IP surveillance systems
6. **Venta de Equipos** - Computer equipment and accessories

### Team Members
- **Mauricio Pamplona**: Founder & Systems Engineer (hardware/networks specialist)
- **Mayerly Vera**: Co-founder & Systems Technician (technical support/sales)
- **Ricardo Bonilla**: Software Developer (full-stack, cloud, mobile)

### Contact Information
- **Location**: Cra. 12 #20-10, Girardot, Cundinamarca, Colombia
- **Phone**: 318 5471853
- **Email**: info@sistemaspamplona.com, ventas@sistemaspamplona.com
- **Hours**: Mon-Fri 8AM-6PM, 24/7 support available

## Common Modifications

### Adding New Services
1. Add service card in `index.html` section `#servicios` (lines 95-254)
2. Add service option in contact form select (lines 499-507)
3. Update service mapping in `main.js` (lines 202-210)

### Updating Team Members
Edit team cards in `index.html` section `#equipo` (lines 257-313)
Add/replace images in `assets/images/`

### Styling Changes
All CSS in single file `assets/css/styles.css`:
- Update color variables in `:root` (lines 7-54)
- Component styles organized by section
- Use existing CSS custom properties for consistency

## SEO & Performance Optimizations

### SEO Features (Senior-Level Implementation)
- **Comprehensive Meta Tags**: Title, description, keywords, author, robots
- **Open Graph Tags**: Full Facebook/LinkedIn preview optimization
- **Twitter Cards**: Enhanced social media sharing
- **Geo-Location Tags**: Local SEO for Girardot, Cundinamarca, Colombia
- **Structured Data (JSON-LD)**:
  - LocalBusiness schema with complete business info
  - Organization schema for brand recognition
  - BreadcrumbList for navigation hierarchy
  - Service catalog with all 6 offerings
- **Sitemap.xml**: Complete site structure for search engines
- **Robots.txt**: Proper crawling directives and sitemap reference
- **Canonical URLs**: Duplicate content prevention

### Performance Features
- **Font Loading**: Async loading with media="print" trick
- **Image Preloading**: Critical logo preload
- **DNS Prefetch**: Google Fonts preconnect
- **Lazy Assets**: Fonts load asynchronously

### Accessibility (WCAG 2.1)
- **Skip-to-Content Link**: Keyboard navigation support
- **ARIA Labels**: Proper navigation and button labeling
- **Semantic HTML**: Role attributes (banner, navigation, main)
- **Focus Management**: Mobile menu aria-expanded state

## Fixed Issues (November 2025)

### Critical Bugs Fixed
1. **JavaScript Syntax Error** (main.js:113-121): Broken pipe operators `|` → Fixed to `||`
2. **Image Path Errors**: Changed `assets/images/` to `assets/img/` throughout CSS
3. **Missing Team Photos**: Replaced `<img>` tags with CSS gradient avatars using initials
4. **Missing Logo References**: Updated footer logo from .svg to .png

### SEO Score Improvements
- **Before**: Basic HTML with minimal SEO
- **After**: Enterprise-level SEO with structured data, 100% search engine ready

## Important Notes

- **No Package Manager**: No npm, yarn, or node_modules
- **No Build Process**: No webpack, parcel, or compilation
- **Browser Compatibility**: Modern ES6+ features used (may need transpilation for older browsers)
- **Image Assets**: Logo at `assets/img/logo.png`, team uses CSS avatars with initials
- **EmailJS Required**: Contact form will not work without proper EmailJS configuration
  - Update lines 76, 129-130 in main.js with actual credentials
- **Catalog Link**: `catalog.html` referenced in navigation - file does not exist yet
- **Domain**: Update `sistemaspamplona.com` in meta tags/structured data when deploying
