# Portfolio Website

A modern, interactive portfolio website with 3D visualizations, analytics, and GitHub Gist-based data storage.

## 🚀 Quick Start (Plug & Play)

### Prerequisites
- A GitHub account
- A GitHub Personal Access Token with `gist` scope
- A GitHub Gist ID (create a gist with a file named `portfolio-data.json`)

### Setup Steps

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Configure GitHub Gist Storage**
   - Copy `config.example.js` to `config.js`:
     ```bash
     cp config.example.js config.js
     ```
   - Edit `config.js` and fill in your credentials:
     ```javascript
     window.GITHUB_CONFIG = {
         token: 'your_github_token_here',  // GitHub Personal Access Token
         gistId: 'your_gist_id_here',      // Your Gist ID
         username: 'your_username_here'    // Your GitHub username
     };
     ```

3. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or deploy to GitHub Pages (see below)

## 📁 Project Structure

```
portfolio/
├── index.html              # Main application file
├── config.js              # Configuration (gitignored - add your credentials)
├── config.example.js      # Configuration template
├── storage-api.js         # GitHub Gist storage module
├── README.md              # This file
├── SEPARATION_OF_CONCERNS.md  # Architecture documentation
├── assets/                # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # Third-party libraries
│   ├── images/           # Image assets
│   └── fonts/            # Custom fonts
└── models/               # 3D model files
```

## 🔧 Configuration

### Getting a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Gist Access")
4. Select the `gist` scope
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

### Creating a GitHub Gist

1. Go to [gist.github.com](https://gist.github.com)
2. Create a new gist
3. Name the file `portfolio-data.json`
4. Add initial content: `{}`
5. Click "Create public gist"
6. Copy the Gist ID from the URL (e.g., `https://gist.github.com/username/4f2edb397d263d098ea70ed17b0df8e6` → ID is `4f2edb397d263d098ea70ed17b0df8e6`)

## 🌐 GitHub Pages Deployment

1. Push your repository to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Select `/ (root)` as the folder
5. Click Save
6. Your site will be available at `https://yourusername.github.io/repository-name/`

**Important:** Make sure `config.js` is in `.gitignore` to avoid committing your token!

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

- `config.js` is gitignored and should never be committed
- Use GitHub Personal Access Tokens with minimal required scopes
- Rotate tokens regularly
- Never share your `config.js` file

## 📚 Documentation

- See `SEPARATION_OF_CONCERNS.md` for architecture details
- See `TOKEN_SETUP_WALKTHROUGH.md` for detailed token setup instructions

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

### Storage API Not Working
- Verify your GitHub token has the `gist` scope
- Check that the Gist ID is correct
- Ensure the Gist file is named `portfolio-data.json`
- Check browser console for error messages

### Charts Not Displaying
- Ensure Chart.js is loaded (check network tab)
- Verify canvas elements exist in the DOM
- Check browser console for JavaScript errors

### Mobile Layout Issues
- Clear browser cache
- Check viewport meta tag is present
- Verify responsive CSS is loading

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing patterns
- Configuration remains externalized
- Security best practices are followed

---

**Need Help?** Check the documentation files or open an issue on GitHub.

