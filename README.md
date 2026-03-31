# Smart Study Material Organizer

A centralized digital library application designed for first-year college students to organize, categorize, and access their study materials efficiently. This project addresses the common challenge of managing scattered lecture notes, previous year question papers, textbooks, and other academic resources across multiple platforms.

## Problem Statement

First-year college students often struggle with organizing their study materials. Resources are scattered across different devices, cloud services, and physical locations, making it difficult to locate specific materials during exam preparation or revision. This fragmentation leads to wasted time searching for materials and creates an inefficient learning workflow.

The Smart Study Material Organizer solves this problem by providing a unified platform where students can:

- **Centralize Resources:** Store all study materials in one accessible location
- **Organize Systematically:** Categorize materials by subject, semester, and type
- **Search Efficiently:** Quickly find materials using powerful search and filter capabilities
- **Prioritize Important Materials:** Star favorite or frequently-used resources
- **Manage Collections:** Add, delete, and organize materials with ease

## Features

### Core Functionality

**Dashboard Overview:** The main dashboard displays key statistics including total materials, starred items, and number of subjects, providing a quick overview of your study collection.

**Material Organization:** Materials are categorized by type (Notes, Previous Year Questions, Textbooks, Other), semester, and subject, allowing for granular organization and easy navigation.

**Advanced Search & Filtering:** Users can search materials by title, subject, or description, and apply filters by material type, subject, and semester to narrow down results.

**Star System:** Mark important or frequently-used materials as starred for quick access, with starred materials appearing at the top of search results.

**Add/Delete Functionality:** Easily add new materials to your collection through an intuitive dialog form, or remove materials you no longer need.

**Responsive Design:** The application works seamlessly on desktop, tablet, and mobile devices, ensuring accessibility across all platforms.

## Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | React 19 | Modern UI library with hooks and concurrent features |
| Styling | Tailwind CSS 4 | Utility-first CSS framework for responsive design |
| Routing | Wouter | Lightweight client-side routing for single-page navigation |
| State Management | React Context API | Global state management for filters and theme |
| UI Components | shadcn/ui | Pre-built, accessible component library |
| Data Persistence | localStorage | Browser-based storage for materials and preferences |
| Build Tool | Vite | Fast build tool with hot module replacement |
| Icons | Lucide React | Consistent icon library for UI elements |
| Date Formatting | date-fns | Utility library for date manipulation and formatting |

## Project Structure

```
study_material_organizer/
├── client/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── MaterialCard.tsx      # Individual material display card
│   │   │   ├── Sidebar.tsx           # Filter sidebar navigation
│   │   │   ├── MobileNav.tsx         # Mobile menu toggle
│   │   │   ├── ErrorBoundary.tsx     # Error handling wrapper
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── contexts/
│   │   │   ├── FilterContext.tsx     # Global filter state
│   │   │   └── ThemeContext.tsx      # Theme management
│   │   ├── hooks/
│   │   │   └── useMaterials.ts       # Materials data management
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Main dashboard page
│   │   │   └── NotFound.tsx          # 404 page
│   │   ├── App.tsx                   # App router and layout
│   │   ├── main.tsx                  # React entry point
│   │   └── index.css                 # Global styles and design tokens
│   └── index.html
├── shared/
│   └── types.ts                      # Shared TypeScript types
├── server/
│   └── index.ts                      # Express server (static serving)
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js:** Version 18 or higher
- **pnpm:** Package manager (version 8 or higher recommended)
- **Git:** For version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/study_material_organizer.git
   cd study_material_organizer
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

The built files will be in the `dist/` directory. To preview the production build locally:

```bash
pnpm preview
```

## Usage Guide

### Adding a Study Material

1. Click the **"+ Add Material"** button in the top-right corner
2. Fill in the material details:
   - **Title:** Name of the material (required)
   - **Description:** Brief description of the content
   - **Subject:** Subject name (required)
   - **Material Type:** Select from Notes, PYQ, Textbook, or Other
   - **Semester:** Choose the relevant semester (1-8)
3. Click **"Add Material"** to save

### Searching Materials

Use the search bar at the top of the main content area to search by:
- Material title
- Subject name
- Description

The search is real-time and updates results as you type.

### Filtering Materials

The left sidebar provides multiple filtering options:

- **Material Type:** Filter by Notes, Previous Year Questions, Textbooks, or Other materials
- **Subjects:** Browse subjects organized by semester and select specific subjects
- **Clear Filters:** Remove all active filters to view all materials

### Starring Materials

Click the **star icon** on any material card to mark it as important. Starred materials appear at the top of your search results and are highlighted with a filled star.

### Deleting Materials

Click the **trash icon** on any material card to remove it from your collection. This action cannot be undone.

## Design Philosophy

The application follows an **Academic Minimalism** design approach, emphasizing clarity, focus, and professional aesthetics. Key design principles include:

**Minimized Distractions:** The clean, grid-based layout with generous whitespace reduces visual clutter, allowing students to focus on their materials.

**Clear Visual Hierarchy:** Typography, spacing, and color are used strategically to guide users through the interface. Important actions are highlighted with the warm amber accent color.

**Professional Appearance:** The deep slate blue primary color and neutral palette convey trustworthiness and academic rigor, building confidence in the tool's reliability.

**Accessibility:** High contrast ratios, clear labeling, and keyboard-friendly navigation ensure the application is usable by all students.

**Responsive Design:** The interface adapts seamlessly from mobile phones to desktop screens, maintaining usability across all devices.

## Data Storage

The application uses **browser localStorage** to persist materials locally on your device. This means:

- **No Server Required:** All data is stored on your computer; no account or internet connection needed
- **Privacy:** Your study materials remain private and are not sent to any external server
- **Offline Access:** Access your materials even without an internet connection
- **Local Backup:** Clear your browser cache to back up your data by exporting it

### Data Structure

Materials are stored as JSON objects with the following structure:

```typescript
interface StudyMaterial {
  id: string;                    // Unique identifier
  title: string;                 // Material title
  description: string;           // Brief description
  type: "notes" | "pyq" | "textbook" | "other";
  subject: string;               // Subject name
  semester: number;              // Semester (1-8)
  uploadedAt: Date;              // Upload timestamp
  starred: boolean;              // Star status
}
```

## Development Workflow

### Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |

### Code Organization

**Components:** Reusable UI components are stored in `client/src/components/` and follow shadcn/ui patterns for consistency.

**Hooks:** Custom React hooks for data management are in `client/src/hooks/`, with `useMaterials` handling all material CRUD operations.

**Contexts:** Global state (filters, theme) is managed through React Context in `client/src/contexts/`.

**Pages:** Page-level components are in `client/src/pages/`, with routing defined in `App.tsx`.

### Styling

The project uses **Tailwind CSS 4** with a custom design token system defined in `client/src/index.css`. Key design tokens include:

- **Primary Color:** Deep slate blue (`oklch(0.42 0.12 260)`)
- **Accent Color:** Warm amber (`oklch(0.72 0.15 70)`)
- **Typography:** Poppins for display, Inter for body text
- **Spacing:** 16px base unit with 8px increments

## Browser Compatibility

The application is tested and works on:

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future versions include:

- **File Upload:** Attach PDFs or documents directly to materials
- **Tags & Labels:** Add custom tags for more granular organization
- **Sharing:** Share materials with classmates or study groups
- **Sync Across Devices:** Cloud synchronization for multi-device access
- **Study Timer:** Built-in Pomodoro timer for focused study sessions
- **Notes Integration:** Add inline notes and annotations to materials
- **Export Functionality:** Export materials list as PDF or CSV
- **Dark Mode:** Theme toggle for comfortable late-night studying

## Troubleshooting

### Materials Not Saving

If materials are not persisting after refresh:
- Check if localStorage is enabled in your browser
- Ensure you have sufficient storage space
- Try clearing browser cache and reloading

### Search Not Working

If search results are not appearing:
- Verify that materials have been added successfully
- Check that search query matches material titles, subjects, or descriptions
- Try clearing filters to see all materials

### Performance Issues

If the application feels slow:
- Clear browser cache and localStorage
- Disable browser extensions that might interfere
- Try using a different browser

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate comments.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support & Feedback

For bug reports, feature requests, or general feedback, please open an issue on GitHub or contact the development team.

## Acknowledgments

This project was built as a capstone assignment for a first-year college course. Special thanks to the course instructors for guidance and to the open-source community for providing excellent tools and libraries like React, Tailwind CSS, and shadcn/ui.

---

**Last Updated:** March 31, 2026  
**Version:** 1.0.0  
**Author:** [Your Name]
