# 🕹️ Game Center

A retro arcade-style game showcase built with GitHub Copilot, featuring dynamic game loading and a nostalgic neon aesthetic.

## 🎮 About

This repository is a demonstration of how GitHub Copilot can be used to build interactive web applications. It features:

- **Arcade-Style Interface**: Retro-themed game selector with neon glow effects and animations
- **Dynamic Game Loading**: Games are configured via JSON and loaded at runtime
- **GitHub Pages Hosting**: Automatically deployed static site
- **Accessibility-First**: Full keyboard navigation and screen reader support
- **Security-Hardened**: XSS prevention and safe DOM manipulation throughout

## 🚀 Quick Start

### Viewing the Arcade

Visit the live site: [Game Center on GitHub Pages](https://rajbos.github.io/game-center/)

### Running Locally

```bash
# Clone the repository
git clone https://github.com/rajbos/game-center.git
cd game-center

# Start a local web server
python3 -m http.server 8000
# or
npx http-server

# Open http://localhost:8000 in your browser
```

## 🎲 Adding Your Own Game

1. **Create a game folder** in `/games/`:
   ```bash
   mkdir -p games/my-awesome-game
   ```

2. **Add your game files** with an `index.html` as the entry point:
   ```
   games/my-awesome-game/
   ├── index.html
   ├── styles/
   ├── scripts/
   └── assets/
   ```

3. **Update `games.json`** to register your game:
   ```json
   {
     "games": [
       {
         "id": "my-awesome-game",
         "name": "My Awesome Game",
         "description": "A super fun game!",
         "status": "Ready to Play",
         "path": "./games/my-awesome-game"
       }
     ]
   }
   ```

4. **Refresh the page** - Your game appears automatically!

## 📁 Repository Structure

```
game-center/
├── index.html              # Arcade interface (main page)
├── games.json              # Game configuration manifest
├── games/                  # Game directory
│   └── game-1/            # Example game
│       ├── placeholder.txt
│       └── README.md
├── .github/
│   └── workflows/
│       └── pages.yml       # GitHub Pages deployment
├── .agent.md              # Detailed instructions for agents/developers
├── README.md              # This file
└── LICENSE
```

## 🎨 Features

### Arcade Aesthetics
- Neon green title with animated glow effects
- Retro-styled game cards with hover animations
- "INSERT COIN" indicator for nostalgic feel
- Mobile-responsive grid layout

### Technical Highlights
- **Dynamic Loading**: Games loaded from JSON manifest at runtime
- **Zero Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- **Accessibility**: WCAG compliant with keyboard navigation
- **Security**: XSS prevention with safe DOM manipulation
- **Deployment**: Automated CI/CD with GitHub Actions

## 🛠️ Built With

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (ES6+)
- GitHub Pages
- GitHub Actions
- GitHub Copilot (AI pair programming)

## 🔒 Security

This project implements security best practices:
- All dynamic content uses `textContent` to prevent XSS attacks
- External links secured with `rel="noopener noreferrer"`
- Generic error messages (no sensitive data exposure)
- Path validation guidance for game navigation

## ♿ Accessibility

- Full keyboard navigation (Tab, Enter, Space)
- ARIA roles and labels for screen readers
- Semantic HTML with proper button elements
- Tested with screen readers and keyboard-only navigation

## 📝 Documentation

For detailed instructions on modifying the arcade, adding games, deployment, and troubleshooting, see [`.agent.md`](.agent.md).

## 🤝 Contributing

This is a demonstration repository showcasing GitHub Copilot capabilities. Feel free to:
- Fork the repository
- Add your own games
- Customize the arcade interface
- Share your creations!

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [GitHub Copilot](https://github.com/features/copilot) AI pair programming
- Inspired by classic arcade gaming aesthetics
- Created to showcase modern web development with AI assistance

---

**Have fun building games with Copilot! 🎮✨**
