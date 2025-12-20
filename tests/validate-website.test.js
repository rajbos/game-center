#!/usr/bin/env node

/**
 * Integration test that starts a local web server and validates
 * that the website loads correctly and can find all games
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Get repository root
const repoRoot = path.resolve(__dirname, '..');
const PORT = 8765; // Use a non-standard port for testing

// Simple static file server
function createServer() {
  const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html
    if (pathname === '/') {
      pathname = '/index.html';
    }
    
    // Construct file path
    const filePath = path.join(repoRoot, pathname);
    
    // Prevent directory traversal
    if (!filePath.startsWith(repoRoot)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      
      // Set content type based on file extension
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
      };
      
      const contentType = contentTypes[ext] || 'text/plain';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
  
  return server;
}

// Test function to make HTTP request
function testRequest(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

// Main test function
async function runTests() {
  log('\n🌐 Running Web Server Integration Tests\n', colors.cyan);
  
  const server = createServer();
  let testsPassed = 0;
  let testsFailed = 0;
  
  try {
    // Start server
    await new Promise((resolve) => {
      server.listen(PORT, () => {
        log(`Server started on http://localhost:${PORT}`, colors.yellow);
        resolve();
      });
    });
    
    // Give server a moment to fully start
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test 1: Index page loads
    log('\nTest 1: Index page loads', colors.cyan);
    try {
      const response = await testRequest('/');
      if (response.statusCode === 200 && response.body.includes('Game Center')) {
        log('  ✓ Index page loaded successfully', colors.green);
        testsPassed++;
      } else {
        log('  ✗ Index page failed to load correctly', colors.red);
        testsFailed++;
      }
    } catch (error) {
      log(`  ✗ Error loading index page: ${error.message}`, colors.red);
      testsFailed++;
    }
    
    // Test 2: games.json is accessible
    log('\nTest 2: games.json is accessible', colors.cyan);
    try {
      const response = await testRequest('/games.json');
      if (response.statusCode === 200) {
        let gamesData;
        try {
          gamesData = JSON.parse(response.body);
        } catch (parseError) {
          log(`  ✗ games.json contains invalid JSON: ${parseError.message}`, colors.red);
          testsFailed++;
          throw parseError;
        }
        
        if (Array.isArray(gamesData.games)) {
          log('  ✓ games.json loaded and parsed successfully', colors.green);
          testsPassed++;
          
          // Test 3: All game paths are accessible
          log('\nTest 3: All game index.html files are accessible', colors.cyan);
          for (const game of gamesData.games) {
            try {
              // Normalize path to URL format
              let gamePath = game.path;
              if (gamePath.startsWith('./')) {
                gamePath = gamePath.substring(1);
              } else if (!gamePath.startsWith('/')) {
                gamePath = '/' + gamePath;
              }
              const gameIndexPath = `${gamePath}/index.html`;
              const gameResponse = await testRequest(gameIndexPath);
              
              if (gameResponse.statusCode === 200) {
                log(`  ✓ ${game.id}: index.html is accessible`, colors.green);
                testsPassed++;
              } else {
                log(`  ✗ ${game.id}: index.html returned status ${gameResponse.statusCode}`, colors.red);
                testsFailed++;
              }
            } catch (error) {
              log(`  ✗ ${game.id}: Error accessing index.html - ${error.message}`, colors.red);
              testsFailed++;
            }
          }
        } else {
          log('  ✗ games.json does not contain games array', colors.red);
          testsFailed++;
        }
      } else {
        log(`  ✗ games.json returned status ${response.statusCode}`, colors.red);
        testsFailed++;
      }
    } catch (error) {
      log(`  ✗ Error loading games.json: ${error.message}`, colors.red);
      testsFailed++;
    }
    
    // Test 4: Index page contains game grid
    log('\nTest 4: Index page has game grid element', colors.cyan);
    try {
      const response = await testRequest('/');
      if (response.body.includes('game-grid') || response.body.includes('gameGrid')) {
        log('  ✓ Game grid element found', colors.green);
        testsPassed++;
      } else {
        log('  ✗ Game grid element not found', colors.red);
        testsFailed++;
      }
    } catch (error) {
      log(`  ✗ Error checking game grid: ${error.message}`, colors.red);
      testsFailed++;
    }
    
    // Print summary
    log('\n' + '='.repeat(50), colors.cyan);
    log(`Total tests: ${testsPassed + testsFailed}`, colors.cyan);
    log(`Passed: ${testsPassed}`, colors.green);
    log(`Failed: ${testsFailed}`, testsFailed > 0 ? colors.red : colors.green);
    log('='.repeat(50) + '\n', colors.cyan);
    
  } catch (error) {
    log(`\n✗ Fatal error: ${error.message}`, colors.red);
    testsFailed++;
  } finally {
    // Close server
    server.close(() => {
      log('Server stopped\n', colors.yellow);
      process.exit(testsFailed > 0 ? 1 : 0);
    });
  }
}

// Run tests
runTests().catch((error) => {
  log(`\n✗ Unhandled error: ${error.message}`, colors.red);
  process.exit(1);
});
