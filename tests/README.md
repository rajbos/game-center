# Game Center Test Suite

This directory contains automated tests that validate the structure and functionality of the Game Center repository.

## Test Files

### `validate-structure.test.js`
Validates the repository structure and configuration files.

**What it tests:**
- ✅ `games.json` exists and is valid JSON
- ✅ `games.json` has correct structure with "games" array
- ✅ Each game entry has all required fields:
  - `id` (string, non-empty)
  - `name` (string, non-empty)
  - `description` (string)
  - `status` (string)
  - `path` (string)
  - `createdWith` (string - AI tool name)
  - `model` (string - AI model name)
  - `prLinks` (array of PR URLs)
- ✅ Each game directory exists at the specified path
- ✅ Each game has `index.html` (entry point)
- ✅ Each game has `README.md` (documentation)
- ✅ Game READMEs document AI usage (mentions AI/model/Copilot)
- ✅ Main site files exist (`index.html`, `README.md`, `AGENTS.md`)
- ✅ `.github/workflows` directory exists

**Run:**
```bash
node tests/validate-structure.test.js
```

### `validate-website.test.js`
Integration tests that start a local web server and validate the website functions correctly.

**What it tests:**
- ✅ Website starts and serves pages on port 8765
- ✅ Main index page loads successfully (HTTP 200)
- ✅ Index page contains "Game Center" text
- ✅ `games.json` is accessible via HTTP
- ✅ `games.json` can be parsed as valid JSON
- ✅ All game `index.html` files are accessible via HTTP
- ✅ Game grid element is present on main page

**Run:**
```bash
node tests/validate-website.test.js
```

## Running Tests

### Run Individual Tests
```bash
# Structure validation only
node tests/validate-structure.test.js

# Website integration only
node tests/validate-website.test.js
```

### Run All Tests
```bash
# Run both test suites sequentially
node tests/validate-structure.test.js && node tests/validate-website.test.js
```

## Requirements

- **Node.js 18 or higher**
- No additional dependencies (uses Node.js built-in modules only)

The tests use only Node.js core modules:
- `fs` - File system operations
- `path` - Path manipulation
- `http` - HTTP server for integration tests
- `url` - URL parsing

## Exit Codes

Both test scripts follow standard exit code conventions:
- **0** - All tests passed
- **1** - One or more tests failed

This makes them suitable for use in CI/CD pipelines.

## Continuous Integration

These tests run automatically via GitHub Actions (`.github/workflows/validate.yml`) on:
- Every pull request to `main` branch
- Every push to `main` branch
- Manual workflow dispatch

## Adding New Tests

When adding new tests, follow these conventions:

1. **Use the same color scheme** for output (cyan for headers, green for pass, red for fail)
2. **Track test counts** (totalTests, passedTests, failedTests)
3. **Print a summary** at the end with totals
4. **Exit with appropriate code** (0 for success, 1 for failure)
5. **Provide clear error messages** that help identify the problem

Example test structure:
```javascript
function test(description, fn) {
  totalTests++;
  try {
    const result = fn();
    if (result === false) {
      fail(description);
    } else {
      pass(description);
    }
  } catch (error) {
    fail(`${description}: ${error.message}`);
  }
}
```

## Troubleshooting

### Tests fail with "Cannot find module"
Make sure you're running Node.js 18 or higher:
```bash
node --version  # Should be v18.0.0 or higher
```

### Website integration tests fail with port in use
The tests use port 8765. If this port is in use:
1. Stop any process using port 8765
2. Or modify the PORT constant in `validate-website.test.js`

### Structure tests fail for a game
Check that your game has:
- A directory at the path specified in `games.json`
- An `index.html` file in that directory
- A `README.md` file in that directory
- README mentions AI/Copilot/model information

### All games.json validation fails
Validate your JSON syntax:
```bash
# Use Node.js to validate
node -e "console.log(JSON.parse(require('fs').readFileSync('games.json', 'utf8')))"
```

## Test Output Examples

### Successful Run
```
🧪 Running Game Center Structure Tests

Repository root: /home/user/game-center

Testing games.json...
  ✓ games.json exists
  ✓ games.json is valid JSON
  ✓ games.json has "games" array

Testing game entries...
  ✓ Game 1 (game-1): has "id" field
  ...

==================================================
Total tests: 22
Passed: 22
Failed: 0
==================================================
```

### Failed Test
```
Testing game entries...
  ✗ Game 1 (game-1): has index.html: ENOENT: no such file or directory
  ...

==================================================
Total tests: 22
Passed: 20
Failed: 2
==================================================
```

## Best Practices

1. **Run tests before committing** - Catch issues early
2. **Run tests after adding games** - Ensure new games are properly configured
3. **Check test output carefully** - Test names indicate exactly what failed
4. **Keep games.json in sync** - Ensure all referenced games exist
5. **Document AI usage** - Tests verify this documentation exists

## Related Documentation

- [AGENTS.md](../AGENTS.md) - Detailed development instructions
- [README.md](../README.md) - Project overview and quick start
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
