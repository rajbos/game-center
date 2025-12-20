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
├── README.md        (optional: documentation)
├── styles/          (optional: CSS files)
├── scripts/         (optional: JavaScript files)
└── assets/          (optional: images, sounds, etc.)
```

### Step 3: Update games.json

Add your game to the manifest:

```json
{
  "games": [
    {
      "id": "your-game-name",
      "name": "Your Game Display Name",
      "description": "A brief description of your game",
      "status": "Ready to Play",
      "path": "./games/your-game-name"
    }
  ]
}
```

### Step 4: Test Locally

Start a local web server to test:

```bash
python3 -m http.server 8000
# or
npx http-server
```

Then navigate to `http://localhost:8000/` to see your game in the arcade selector.

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
