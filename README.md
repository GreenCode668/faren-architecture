# Faren Architecture & Interior Design

A modern, responsive architecture and interior design website built with Vite, React, TypeScript, and Tailwind CSS. This project replicates the design and functionality of a premium architecture template with modern web technologies.

## 🚀 Features

- **Modern Design**: Clean, professional architecture-focused design
- **Responsive**: Fully responsive across all devices
- **Animations**: Smooth animations using Framer Motion
- **Interactive**: Custom cursor, hover effects, and micro-interactions
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized for fast loading and smooth performance

## 🛠️ Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Headless UI** - Unstyled UI components

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faren-architecture
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Services.tsx    # Services section
│   ├── Portfolio.tsx   # Projects portfolio
│   ├── Testimonials.tsx # Client testimonials
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer section
│   ├── CustomCursor.tsx # Custom cursor
│   └── Loading.tsx     # Loading component
├── data/               # Mock data
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## 🎨 Sections

1. **Hero** - Full-screen hero with rotating slides and statistics
2. **About** - Company information and achievements
3. **Services** - Service offerings with icons and descriptions
4. **Portfolio** - Project gallery with filtering and modal views
5. **Testimonials** - Client testimonials carousel
6. **Contact** - Contact form and company information
7. **Footer** - Links, newsletter signup, and social media

## 🚀 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Responsive Breakpoints

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+
- XL Desktop: 1620px+

## 🎯 Key Features Implemented

- **Custom Cursor**: Interactive cursor that responds to hoverable elements
- **Smooth Animations**: Page transitions and scroll-triggered animations
- **Image Galleries**: Filterable portfolio with lightbox functionality
- **Form Handling**: Contact form with validation and submission states
- **Navigation**: Sticky header with smooth scrolling to sections
- **Mobile Menu**: Responsive hamburger menu for mobile devices

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```js
colors: {
  accent: '#FF833B', // Primary accent color
  dark: '#02000F',   // Dark text color
  light: '#6C6D71',  // Light text color
}
```

### Typography
Fonts are configured in `src/index.css` with Google Fonts:
- Display: Cabinet Grotesk
- Body: DM Sans

### Content
Update mock data in `src/data/mockData.ts` to customize:
- Navigation items
- Projects and portfolio
- Services offered
- Testimonials
- Blog posts

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
