#!/usr/bin/env node

/**
 * Test suite for validating the game-center repository structure
 * This script validates:
 * - games.json format and required fields
 * - Referenced game folders and files exist
 * - index.html exists and can be loaded
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function pass(message) {
  passedTests++;
  log(`  ✓ ${message}`, colors.green);
}

function fail(message) {
  failedTests++;
  log(`  ✗ ${message}`, colors.red);
}

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

// Get repository root (one level up from tests directory)
const repoRoot = path.resolve(__dirname, '..');

log('\n🧪 Running Game Center Structure Tests\n', colors.cyan);
log(`Repository root: ${repoRoot}\n`, colors.yellow);

// Test 1: Check if games.json exists
log('Testing games.json...', colors.cyan);
const gamesJsonPath = path.join(repoRoot, 'games.json');

test('games.json exists', () => {
  return fs.existsSync(gamesJsonPath);
});

// Test 2: Validate games.json is valid JSON
let gamesData;
test('games.json is valid JSON', () => {
  try {
    const content = fs.readFileSync(gamesJsonPath, 'utf8');
    gamesData = JSON.parse(content);
    return true;
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
});

// Test 3: games.json has required structure
test('games.json has "games" array', () => {
  return gamesData && Array.isArray(gamesData.games);
});

// Test 4: Validate each game entry
if (gamesData && Array.isArray(gamesData.games)) {
  log('\nTesting game entries...', colors.cyan);
  
  gamesData.games.forEach((game, index) => {
    const gamePrefix = `Game ${index + 1} (${game.id || 'unknown'})`;
    
    // Required fields
    test(`${gamePrefix}: has "id" field`, () => {
      return game.id && typeof game.id === 'string' && game.id.trim() !== '';
    });
    
    test(`${gamePrefix}: has "name" field`, () => {
      return game.name && typeof game.name === 'string' && game.name.trim() !== '';
    });
    
    test(`${gamePrefix}: has "description" field`, () => {
      return game.description && typeof game.description === 'string';
    });
    
    test(`${gamePrefix}: has "status" field`, () => {
      return game.status && typeof game.status === 'string';
    });
    
    test(`${gamePrefix}: has "path" field`, () => {
      return game.path && typeof game.path === 'string';
    });
    
    // AI documentation fields
    test(`${gamePrefix}: has "createdWith" field`, () => {
      return game.createdWith && typeof game.createdWith === 'string';
    });
    
    test(`${gamePrefix}: has "model" field`, () => {
      return game.model && typeof game.model === 'string';
    });
    
    test(`${gamePrefix}: has "prLinks" array`, () => {
      return Array.isArray(game.prLinks);
    });
    
    // PR Count field (optional but recommended)
    test(`${gamePrefix}: has "prCount" field (number)`, () => {
      // prCount is optional, but if present should be a number
      if (game.prCount !== undefined) {
        return typeof game.prCount === 'number' && game.prCount >= 0;
      }
      return true; // Pass if field doesn't exist (it's optional)
    });
    
    // Test game directory and files exist
    if (game.path) {
      // Normalize and resolve path - path.resolve handles ./, ../, and absolute paths
      const gamePath = path.resolve(repoRoot, game.path);
      
      test(`${gamePrefix}: directory exists at ${game.path}`, () => {
        return fs.existsSync(gamePath) && fs.statSync(gamePath).isDirectory();
      });
      
      const indexPath = path.join(gamePath, 'index.html');
      test(`${gamePrefix}: has index.html`, () => {
        return fs.existsSync(indexPath) && fs.statSync(indexPath).isFile();
      });
      
      const readmePath = path.join(gamePath, 'README.md');
      test(`${gamePrefix}: has README.md`, () => {
        return fs.existsSync(readmePath) && fs.statSync(readmePath).isFile();
      });
      
      // Test for game-info.yaml (optional but recommended)
      const gameInfoPath = path.join(gamePath, 'game-info.yaml');
      if (fs.existsSync(gameInfoPath)) {
        test(`${gamePrefix}: has game-info.yaml`, () => {
          return fs.statSync(gameInfoPath).isFile();
        });
        
        // Validate game-info.yaml structure
        try {
          const gameInfoContent = fs.readFileSync(gameInfoPath, 'utf8');
          test(`${gamePrefix}: game-info.yaml is readable`, () => {
            return gameInfoContent.length > 0;
          });
          
          // Basic validation that it contains expected sections
          test(`${gamePrefix}: game-info.yaml has pull_requests section`, () => {
            return gameInfoContent.includes('pull_requests:');
          });
          
          test(`${gamePrefix}: game-info.yaml has stats section`, () => {
            return gameInfoContent.includes('stats:');
          });
        } catch (error) {
          fail(`${gamePrefix}: Error reading game-info.yaml - ${error.message}`);
        }
      }
      
      // Validate README contains AI documentation
      if (fs.existsSync(readmePath)) {
        const readmeContent = fs.readFileSync(readmePath, 'utf8').toLowerCase();
        
        test(`${gamePrefix}: README.md mentions AI/model`, () => {
          const hasGeneralAI = readmeContent.includes('built with') || 
                 readmeContent.includes('ai') || 
                 readmeContent.includes('copilot');
          const hasModel = game.model && readmeContent.includes(game.model.toLowerCase());
          return hasGeneralAI || hasModel;
        });
      }
    }
  });
}

// Test 5: Validate index.html exists
log('\nTesting main files...', colors.cyan);
const indexHtmlPath = path.join(repoRoot, 'index.html');

test('index.html exists', () => {
  return fs.existsSync(indexHtmlPath);
});

// Test 6: Validate index.html contains required elements
test('index.html is valid HTML', () => {
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  return content.includes('<!DOCTYPE html>') && 
         content.includes('<html') && 
         content.includes('</html>');
});

test('index.html loads games.json', () => {
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  return content.includes('games.json') || content.includes('./games.json');
});

test('index.html has game grid element', () => {
  const content = fs.readFileSync(indexHtmlPath, 'utf8');
  return content.includes('gameGrid') || content.includes('game-grid');
});

// Test 7: Validate README exists
const readmePath = path.join(repoRoot, 'README.md');
test('README.md exists', () => {
  return fs.existsSync(readmePath);
});

// Test 8: Validate AGENTS.md exists
const agentsPath = path.join(repoRoot, 'AGENTS.md');
test('AGENTS.md exists', () => {
  return fs.existsSync(agentsPath);
});

// Test 9: Check workflows directory
const workflowsDir = path.join(repoRoot, '.github', 'workflows');
test('.github/workflows directory exists', () => {
  return fs.existsSync(workflowsDir) && fs.statSync(workflowsDir).isDirectory();
});

// Print summary
log('\n' + '='.repeat(50), colors.cyan);
log(`Total tests: ${totalTests}`, colors.cyan);
log(`Passed: ${passedTests}`, colors.green);
log(`Failed: ${failedTests}`, failedTests > 0 ? colors.red : colors.green);
log('='.repeat(50) + '\n', colors.cyan);

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0);
