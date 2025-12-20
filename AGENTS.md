# Agent Instructions for Game Center

## Repository Overview

This repository is a game center showcasing games built with GitHub Copilot. It features an arcade-style interface that dynamically loads game information from a JSON manifest file.

## Architecture

### Key Files

- **`index.html`**: The arcade-style game selector interface with retro aesthetics
- **`games.json`**: JSON manifest that defines all available games
- **`/games/`**: Directory containing individual game folders
- **`.github/workflows/pages.yml`**: GitHub Pages deployment workflow

### How Games Are Loaded

Games are configured in `games.json` and dynamically loaded at runtime:

```json
{
  "games": [
    {
      "id": "unique-game-id",
      "name": "Display Name",
      "description": "Short description",
      "status": "In Development|Ready to Play",
      "path": "./games/game-folder"
    }
  ]
}
```

The JavaScript in `index.html` fetches this JSON and renders game cards using safe DOM manipulation.

## Adding a New Game

### Step 1: Create Game Folder

```bash
mkdir -p games/your-game-name
```

### Step 2: Add Game Files

Create your game with at least an `index.html` file as the entry point:

```
games/your-game-name/
├── index.html       (required: entry point)
├── README.md        (required: documentation with AI attribution)
├── styles/          (optional: CSS files)
├── scripts/         (optional: JavaScript files)
└── assets/          (optional: images, sounds, etc.)
```

**Important**: Each game MUST have a README.md that documents:

1. **AI Model Information**: Which AI model was used to build the game
2. **Development History**: Links to all PRs that contributed to this game
3. **Game Instructions**: How to play and what the game does

Example README structure:

```markdown
# Your Game Name

Brief description.

## Built with AI

This game was built entirely using **GitHub Copilot Coding Agent** with the **Claude 3.5 Sonnet** model.

### Development History

- [PR #123](https://github.com/rajbos/game-center/pull/123) - Initial implementation
- [PR #124](https://github.com/rajbos/game-center/pull/124) - Added features

## How to Play

Game instructions...
```

### Step 3: Update games.json

Add your game to the manifest with full metadata:

```json
{
  "games": [
    {
      "id": "your-game-name",
      "name": "Your Game Display Name",
      "description": "A brief description of your game",
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

**Required Fields for AI Documentation:**

- **createdWith**: The AI tool used (e.g., "GitHub Copilot Coding Agent", "GitHub Copilot")
- **model**: The specific AI model name (e.g., "Claude 3.5 Sonnet", "GPT-4", "GPT-4o")
- **prLinks**: Array of PR URLs that built/modified this game, with newest first

**Note**: Always add the current PR link as the first item in the `prLinks` array when creating or modifying a game.

### Step 4: Test Locally

Start a local web server to test:

```bash
python3 -m http.server 8000
# or
npx http-server
```

Then navigate to `http://localhost:8000/` to see your game in the arcade selector.

## Documenting AI-Assisted Development

This repository showcases games built with AI assistance. Proper documentation helps others learn from the development process.

### Required Documentation for Each Game

#### 1. Game README.md

Every game's README must include an "Built with AI" section:

```markdown
## Built with AI

This game was built entirely using **GitHub Copilot Coding Agent** with the **[Model Name]** model.

### Development History

This section tracks all PRs that contributed to building this game:

- [PR #XXX](https://github.com/rajbos/game-center/pull/XXX) - Description of changes
- [PR #YYY](https://github.com/rajbos/game-center/pull/YYY) - Description of changes
```

**Best Practices:**
- List PRs in reverse chronological order (newest first)
- Include a brief description of what each PR contributed
- Update this section whenever a PR modifies the game
- Be specific about the AI model version (e.g., "Claude 3.5 Sonnet" not just "Claude")

#### 2. games.json Metadata

Each game entry in `games.json` must include:

```json
{
  "createdWith": "GitHub Copilot Coding Agent",
  "model": "Claude 3.5 Sonnet",
  "prLinks": [
    "https://github.com/rajbos/game-center/pull/123",
    "https://github.com/rajbos/game-center/pull/122"
  ]
}
```

**Field Guidelines:**
- `createdWith`: The AI tool name - be consistent across games
- `model`: The specific model version - this may change between PRs
- `prLinks`: Full GitHub URLs to PRs - keep synchronized with README

#### 3. Updating Existing Games

When modifying an existing game:

1. Add the current PR link to the beginning of the `prLinks` array in `games.json`
2. Add the PR link to the Development History section in the game's README
3. Update the `model` field if you're using a different AI model
4. Maintain consistency between README and games.json

Example workflow:
```bash
# After making changes to a game, update both files:
# 1. Edit games/your-game/README.md
# 2. Edit games.json
# 3. Commit both changes together
```

### Why Document AI Usage?

- **Transparency**: Shows how AI tools contribute to development
- **Learning**: Helps others understand effective AI-assisted workflows
- **Attribution**: Proper credit for both human and AI contributions
- **Evolution Tracking**: See how games improve over time with AI assistance

### Display in Arcade Interface

The arcade selector can optionally display AI metadata. See the "Modifying the Arcade Interface" section for implementation details.

## Modifying the Arcade Interface

### Styling

The arcade interface uses CSS with neon effects and animations. Key styling sections in `index.html`:

- **Colors**: Neon green (`#00ff00`), magenta (`#ff00ff`), cyan (`#00ffff`)
- **Animations**: `@keyframes glow`, `@keyframes shine`, `@keyframes blink`
- **Layout**: CSS Grid with responsive breakpoints

### Game Card Behavior

Game cards are created dynamically with:
- **Accessibility**: `tabindex="0"`, `role="button"`, ARIA labels
- **Keyboard support**: Enter and Space keys trigger selection
- **Safe DOM manipulation**: Uses `textContent` and `replaceChildren()` to prevent XSS

### Security Considerations

When modifying the code, maintain these security practices:

1. **Never use `innerHTML` with user/external data** - use `textContent` or `createElement()`
2. **Validate paths** - ensure game paths don't allow directory traversal
3. **External links** - always use `rel="noopener noreferrer"`
4. **Error messages** - keep generic, don't expose sensitive details

## Deployment

### GitHub Pages

The repository includes a GitHub Pages workflow (`.github/workflows/pages.yml`) that:

1. Triggers on push to `main` branch
2. Can be manually triggered via workflow_dispatch
3. Uploads the entire repository as a static site
4. Deploys to GitHub Pages environment

### Configuration

To enable GitHub Pages:

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. The workflow will automatically deploy on the next push to `main`

### Custom Domain (Optional)

To use a custom domain, add a `CNAME` file to the repository root with your domain name.

## Testing

### Manual Testing Checklist

Before committing changes:

- [ ] Page loads without errors
- [ ] Games load from `games.json` correctly
- [ ] Game cards render with correct information
- [ ] Clicking a game card triggers expected behavior
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Mobile responsive layout displays correctly
- [ ] Error handling shows generic messages for failed loads

### Browser Testing

Test in multiple browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Common Tasks

### Updating Game Information

Edit `games.json` and update the relevant game object. Changes will appear immediately on next page load.

### Changing Game Status

Update the `status` field in `games.json`:
- "In Development" - for games under construction
- "Ready to Play" - for completed games
- "Beta" - for games in testing
- "New!" - for recently added games

### Removing a Game

1. Remove the game object from `games.json`
2. Optionally, delete the game folder from `/games/`

### Modifying Arcade Aesthetics

Edit the `<style>` section in `index.html`:
- Colors are defined in CSS variables and gradient/shadow definitions
- Animations can be adjusted in `@keyframes` blocks
- Layout changes should maintain mobile responsiveness

## Troubleshooting

### Games Not Loading

1. Check browser console for errors
2. Verify `games.json` is valid JSON (use a JSON validator)
3. Ensure game paths in `games.json` are correct
4. Check that `games.json` is accessible (relative path: `./games.json`)

### Deployment Fails

1. Check GitHub Actions workflow logs
2. Verify workflow has proper permissions (contents: read, pages: write)
3. Ensure GitHub Pages is enabled in repository settings

### Styling Issues

1. Clear browser cache
2. Check for CSS syntax errors in `index.html`
3. Verify responsive breakpoints for mobile devices

## Best Practices

1. **Keep games self-contained** - Each game folder should include all its assets
2. **Use relative paths** - Ensures portability across different hosting environments
3. **Maintain security** - Follow XSS prevention guidelines when modifying code
4. **Test accessibility** - Ensure keyboard navigation and screen reader compatibility
5. **Document changes** - Update this file when making architectural changes

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
