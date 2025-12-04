# Portfolio Website

A modern, interactive portfolio website with 3D visualizations, analytics, and GitHub Gist-based data storage.

## 🚀 Quick Start

### Option 1: Local Development (No Setup Required)
1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - The portfolio will work locally without any configuration

### Option 2: Enable Visitor Tracking & Contact Form (Optional)
If you want visitor analytics and the contact form to work, you'll need to set up GitHub Gist storage:

**Prerequisites:**
- A GitHub account
- A GitHub Personal Access Token with `gist` scope
- A GitHub Gist ID (create a gist with a file named `portfolio-data.json`)

**Setup:**
See detailed instructions in [`docs/VISITOR_COUNTER_SETUP.md`](docs/VISITOR_COUNTER_SETUP.md)

## 📁 Project Structure

```
portfolio/
├── index.html              # Main application file
├── tref_refactored.html   # 3D star systems visualization
├── storage-api.js         # GitHub Gist storage module
├── README.md              # This file
├── docs/                  # Documentation
│   ├── SEPARATION_OF_CONCERNS.md    # Architecture documentation
│   ├── REFACTORING_SUMMARY.md       # Refactoring history
│   └── VISITOR_COUNTER_SETUP.md     # Setup guide for visitor tracking
├── assets/                # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # Third-party libraries (D3, Chart.js, GSAP)
│   ├── images/           # Project images
│   ├── fonts/            # Custom fonts
│   └── marquee/          # Marquee background images
└── models/               # 3D model files (.glb format)
```

## 🔧 Configuration (Optional)

The portfolio works out of the box without any configuration. However, to enable visitor tracking and the contact form, you need to set up GitHub Gist storage.

**For detailed setup instructions, see:** [`docs/VISITOR_COUNTER_SETUP.md`](docs/VISITOR_COUNTER_SETUP.md)

## 🌐 GitHub Pages Deployment

1. Push your repository to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Select `/ (root)` as the folder
5. Click Save
6. Your site will be available at `https://yourusername.github.io/repository-name/`

**Note:** The portfolio will work on GitHub Pages even without setting up visitor tracking. Configure GitHub Gist storage only if you want analytics and contact form functionality.

## 📱 Features

- **3D Interactive Visualizations** - Three.js powered skill orbits and project nodes
- **Analytics Dashboard** - Visitor tracking and statistics
- **Responsive Design** - Mobile-first, fully responsive typography
- **GitHub Gist Storage** - Persistent data storage via GitHub API
- **Modern UI** - Glass morphism design with smooth animations

## 🎨 Mobile Optimization

The portfolio is optimized for mobile devices:
- **Less text, more visuals** - Diagrams and charts are prioritized on mobile
- **Responsive typography** - Fluid font sizing that adapts to screen size
- **Touch-friendly** - Optimized for touch interactions

## 🔒 Security

If you set up visitor tracking:
- Never commit sensitive credentials to your repository
- Use GitHub Personal Access Tokens with minimal required scopes (only `gist`)
- Rotate tokens regularly
- Never share your configuration details publicly

## 📚 Documentation

- [`docs/SEPARATION_OF_CONCERNS.md`](docs/SEPARATION_OF_CONCERNS.md) - Architecture details
- [`docs/REFACTORING_SUMMARY.md`](docs/REFACTORING_SUMMARY.md) - Refactoring history
- [`docs/VISITOR_COUNTER_SETUP.md`](docs/VISITOR_COUNTER_SETUP.md) - Visitor tracking setup guide

## 🛠️ Customization

### Changing Colors
Edit CSS variables in `index.html`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --tertiary-color: #06b6d4;
}
```

### Adding Content
- Projects: Edit project data in the JavaScript section
- Skills: Modify the skills orbit configuration
- Analytics: Customize chart data and visualizations

## 🐛 Troubleshooting

### Portfolio Not Loading
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console (F12) for JavaScript errors
- Ensure all asset files are present in their directories
- Try opening in a different browser

### Visitor Counter Not Working
- The counter requires GitHub Gist setup (see `docs/VISITOR_COUNTER_SETUP.md`)
- Check browser console for API errors
- Verify your GitHub token has the `gist` scope
- Ensure the Gist file is named `portfolio-data.json`

### 3D Visualization Not Loading
- Ensure all `.glb` model files are in the `models/` directory
- Check browser console for loading errors
- Verify your browser supports WebGL
- Try disabling browser extensions that might block WebGL

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing patterns
- Configuration remains externalized
- Security best practices are followed

---

**Need Help?** Check the documentation files or open an issue on GitHub.

