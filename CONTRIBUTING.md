# Contributing to Game Center

Thank you for your interest in contributing to the Game Center! This repository showcases games built with GitHub Copilot and serves as a demonstration of AI-assisted development.

## 🎮 Adding a New Game

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- (Optional) Access to GitHub Copilot or GitHub Copilot Coding Agent

### Step-by-Step Guide

#### 1. Create Your Game Folder

```bash
mkdir -p games/your-game-name
cd games/your-game-name
```

#### 2. Build Your Game

Create at least an `index.html` file as the entry point:

```
games/your-game-name/
├── index.html       (required: entry point)
├── README.md        (required: documentation)
├── styles/          (optional: CSS files)
├── scripts/         (optional: JavaScript files)
└── assets/          (optional: images, sounds, etc.)
```

#### 3. Document Your Game

Create a `README.md` in your game folder with the following information:

```markdown
# Your Game Name

Brief description of your game.

## Built with AI

This game was built entirely using **GitHub Copilot Coding Agent** with the **[Model Name]** model.

### Development History

This section tracks all PRs that contributed to building this game:

- [PR #123](https://github.com/rajbos/game-center/pull/123) - Initial game implementation
- [PR #124](https://github.com/rajbos/game-center/pull/124) - Added feature X

## How to Play

Instructions for playing your game.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Details

Any interesting technical aspects or AI-assisted development approaches.
```

**Required Documentation Elements:**

1. **AI Model Information**: Specify which AI model was used to build the game:
   - "Claude 3.5 Sonnet"
   - "GPT-4"
   - "GPT-4o"
   - Or any other model you used

2. **Development History**: List all PRs that contributed to the game:
   - Add the current PR link first
   - Keep them in reverse chronological order (newest first)
   - Include a brief description of what each PR contributed

3. **Game Instructions**: How to play and what the game does

#### 4. Update games.json

Add your game to the `/games.json` manifest file:

```json
{
  "games": [
    {
      "id": "your-game-name",
      "name": "Your Game Display Name",
      "description": "A brief description (1-2 sentences)",
      "status": "Ready to Play",
      "path": "./games/your-game-name",
      "createdWith": "GitHub Copilot Coding Agent",
      "model": "Claude 3.5 Sonnet",
      "prLinks": [
        "https://github.com/rajbos/game-center/pull/123"
      ]
    }
  ]
}
```

**Field Descriptions:**

- **id**: Unique identifier (use lowercase with hyphens)
- **name**: Display name shown in the arcade
- **description**: Brief description (keep it concise for card display)
- **status**: One of:
  - "Ready to Play" - Completed and playable
  - "In Development" - Still being built
  - "Beta" - Playable but testing
  - "New!" - Recently added
- **path**: Relative path to game folder (always `./games/your-game-name`)
- **createdWith**: The AI tool used (e.g., "GitHub Copilot Coding Agent")
- **model**: The AI model name (e.g., "Claude 3.5 Sonnet", "GPT-4")
- **prLinks**: Array of PR URLs that built/modified this game (newest first)

#### 5. Test Locally

Start a local web server to test your game in the arcade:

```bash
# From the repository root
python3 -m http.server 8000
# or
npx http-server

# Then open http://localhost:8000 in your browser
```

Verify:
- [ ] Your game appears in the arcade selector
- [ ] Game card displays correctly with status badge
- [ ] Clicking the card works as expected
- [ ] AI model information shows up (if implemented in UI)
- [ ] Mobile responsive layout works

#### 6. Submit a Pull Request

1. Create a new branch: `git checkout -b add-game-your-game-name`
2. Commit your changes: `git commit -am "Add Your Game Name"`
3. Push to GitHub: `git push origin add-game-your-game-name`
4. Open a Pull Request with:
   - Clear title: "Add [Your Game Name]"
   - Description of the game
   - Note that it was built with GitHub Copilot/Coding Agent
   - Screenshots or GIFs if possible

## 📝 Documentation Standards

### For Game READMEs

Each game's README must include:

1. **AI Attribution Section** with:
   - Statement that it was built with GitHub Copilot Coding Agent
   - The specific AI model used
   - Development history with PR links

2. **Game Information**:
   - How to play
   - Features
   - Any special instructions

3. **Technical Details** (optional but recommended):
   - Interesting technical approaches
   - How AI assistance was used
   - Challenges and solutions

### For Repository Documentation

When updating repository-level documentation:

- Keep the arcade-style theme and tone
- Maintain security best practices (XSS prevention, safe DOM manipulation)
- Update AGENTS.md if you change the architecture
- Follow the existing code style

## 🔒 Security Guidelines

This project follows security best practices:

1. **Never use `innerHTML`** with dynamic or external data - use `textContent` or `createElement()`
2. **Validate all paths** - prevent directory traversal attacks
3. **External links** - always include `rel="noopener noreferrer"`
4. **Keep error messages generic** - don't expose sensitive information

## ♿ Accessibility Requirements

All games and UI elements must:

- Support keyboard navigation (Tab, Enter, Space keys)
- Include proper ARIA labels and roles
- Use semantic HTML elements
- Provide sufficient color contrast
- Be tested with screen readers

## 📱 Mobile Support Requirements

All new games must be playable on mobile devices:

- **Responsive Design**: Games must adapt to different screen sizes (desktop, tablet, phone)
- **Touch Controls**: Implement one or more of the following:
  - Swipe gestures for directional input
  - On-screen buttons for game controls
  - Tap/touch interactions appropriate for the game type
- **Mobile Testing**: Test on mobile viewports (at minimum 375px width for phones)
- **Control Instructions**: Update game instructions to mention both desktop and mobile controls
- **Performance**: Ensure smooth gameplay on mobile devices

See `games/game-1` (Retro Pac-Man) for a reference implementation with:
- Responsive CSS Grid that scales to mobile screens
- On-screen directional buttons
- Swipe gesture detection
- Clear instructions for both desktop and mobile users

## 🎨 Style Guidelines

### Arcade Theme

The arcade maintains a retro aesthetic:

- Neon colors (green, magenta, cyan, yellow)
- Monospace fonts (Courier New)
- Glow effects and animations
- Dark background with vibrant accents

### Code Style

- Use vanilla JavaScript (ES6+)
- Prefer functional programming approaches
- Comment complex logic
- Keep functions small and focused
- Follow existing patterns in the codebase

## 🚀 Deployment

The site deploys automatically to GitHub Pages when changes are pushed to the `main` branch. The workflow is defined in `.github/workflows/pages.yml`.

## 🐛 Reporting Issues

If you find a bug or have a suggestion:

1. Check existing issues first
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information

## 💡 Feature Requests

Have an idea for the arcade or a new game? Open an issue with:

- Description of the feature
- Use case or benefit
- Any implementation ideas

## 📞 Questions?

- Open a GitHub Discussion for questions
- Check the [AGENTS.md](AGENTS.md) file for architecture details
- Review existing games as examples

## 🙏 Recognition

All contributors will be recognized in the repository. Games you create will be attributed to you in the arcade interface and in the games.json metadata.

---

**Thank you for contributing to Game Center! 🎮✨**
