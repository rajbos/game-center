# 🕹️ Game Center

A retro arcade-style game showcase built with GitHub Copilot, featuring dynamic game loading and a nostalgic neon aesthetic.

## 🎮 About

This repository is a demonstration of how GitHub Copilot can be used to build interactive web applications. It features:

- **Arcade-Style Interface**: Retro-themed game selector with neon glow effects and animations
- **Dynamic Game Loading**: Games are configured via JSON and loaded at runtime
- **PR Tracking System**: Automatic tracking of PRs that contribute to each game
- **Development History**: Side panel in games showing full PR history
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

# Start a local web server (choose one method):

# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Node.js http-server (requires Node.js)
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

### Testing the Site

```bash
# Run structure validation tests
# Validates games.json, game directories, and required files
node tests/validate-structure.test.js

# Run website integration tests
# Starts a local server and validates all pages load correctly
node tests/validate-website.test.js

# Or run both tests
node tests/validate-structure.test.js && node tests/validate-website.test.js
```

**Requirements for testing:**
- Node.js 18+ (for running tests)
- All tests run automatically on pull requests via GitHub Actions

## 🎲 Adding Your Own Game

### Quick Start

1. **Create a game folder** in `/games/`:
   ```bash
   mkdir -p games/my-awesome-game
   ```

2. **Add your game files** with an `index.html` as the entry point and a `README.md`:
   ```
   games/my-awesome-game/
   ├── index.html       (required: game entry point)
   ├── README.md        (required: documentation)
   ├── styles/
   ├── scripts/
   └── assets/
   ```

3. **Document your AI development process** in the game's README:
   - Specify the AI model used (e.g., "Claude 3.5 Sonnet")
   - Include links to PRs that built the game
   - Document interesting AI-assisted approaches

4. **Update `games.json`** to register your game:
   ```json
   {
     "games": [
       {
         "id": "my-awesome-game",
         "name": "My Awesome Game",
         "description": "A super fun game!",
         "status": "Ready to Play",
         "path": "./games/my-awesome-game",
         "createdWith": "GitHub Copilot Coding Agent",
         "model": "Claude 3.5 Sonnet",
         "prLinks": [
           "https://github.com/rajbos/game-center/pull/123"
         ]
       }
     ]
   }
   ```

5. **Test locally** and submit a PR!

To run the index.html locally, follow the instructions in the "Running Locally" section above. Validate your changes and contribute.

For detailed instructions, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📁 Repository Structure

```
game-center/
├── index.html              # Arcade interface (main page)
├── games.json              # Game configuration manifest
├── games/                  # Game directory
│   └── game-1/            # Example game
│       ├── index.html     # Game entry point
│       ├── README.md      # Game documentation
│       └── placeholder.txt
├── tests/                  # Automated test suite
│   ├── validate-structure.test.js   # Structure validation
│   └── validate-website.test.js     # Integration tests
├── .github/
│   └── workflows/
│       ├── pages.yml       # GitHub Pages deployment
│       └── validate.yml    # PR validation workflow
├── AGENTS.md              # Detailed instructions for agents/developers
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

## 🧪 Testing & Quality Assurance

### Automated Tests

The repository includes a comprehensive test suite:

**Structure Validation** (`tests/validate-structure.test.js`)
- Validates `games.json` format and required fields
- Ensures all game directories and files exist
- Checks AI documentation is present in READMEs
- Verifies main site files are in place

**Website Integration** (`tests/validate-website.test.js`)
- Starts a local server and validates all pages load
- Tests that games.json is accessible
- Verifies all game index.html files are reachable
- Ensures the game grid renders correctly

### Running Tests

```bash
# Run all validation tests
node tests/validate-structure.test.js && node tests/validate-website.test.js
```

**Requirements:** Node.js 18+

### Continuous Integration

Tests run automatically on:
- ✅ Every pull request to `main`
- ✅ When code is pushed to `main`
- ✅ Can be triggered manually from GitHub Actions

This ensures the arcade remains functional and all games are properly configured.

## 📝 Documentation

### AI-Assisted Development

All games in this arcade are built with GitHub Copilot, showcasing AI-assisted development. We document:

- **AI Model Used**: Each game's README specifies which AI model built it (e.g., "Claude 3.5 Sonnet", "GPT-4")
- **Development History**: PRs that contributed to each game are tracked in the game's README and in `games.json`
- **Best Practices**: How AI assistance was leveraged effectively

This transparency helps developers understand how AI tools can be used in game development and provides a learning resource for the community.

### Documentation Files

For detailed instructions on modifying the arcade, adding games, deployment, and troubleshooting, see:

- [CONTRIBUTING.md](CONTRIBUTING.md) - Guidelines for adding games and contributing
- [AGENTS.md](AGENTS.md) - Detailed instructions for agents/developers working on the repository

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
