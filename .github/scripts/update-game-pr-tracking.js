#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

// Get PR information from environment variables
const PR_NUMBER = parseInt(process.env.PR_NUMBER);
const PR_TITLE = process.env.PR_TITLE || '';
const PR_URL = process.env.PR_URL || '';
const PR_MERGED_AT = process.env.PR_MERGED_AT || new Date().toISOString();
const PR_AUTHOR = process.env.PR_AUTHOR || 'unknown';
const PR_BODY = process.env.PR_BODY || '';

console.log(`\n🔍 Analyzing PR #${PR_NUMBER}: "${PR_TITLE}"\n`);

// Get list of files changed in this PR
let changedFiles = [];
try {
  const output = execSync(`git diff --name-only HEAD~1 HEAD`, { encoding: 'utf-8' });
  changedFiles = output.trim().split('\n').filter(f => f);
  console.log(`📝 Files changed in PR: ${changedFiles.length}`);
} catch (error) {
  console.error('Error getting changed files:', error.message);
  process.exit(1);
}

// Detect which games were affected
const affectedGames = new Set();
const gamesDir = path.join(__dirname, '../../games');

changedFiles.forEach(file => {
  // Check if file is in a game directory
  const match = file.match(/^games\/([^\/]+)\//);
  if (match) {
    const gameId = match[1];
    affectedGames.add(gameId);
  }
});

if (affectedGames.size === 0) {
  console.log('ℹ️  No game directories were modified in this PR');
  process.exit(0);
}

console.log(`🎮 Games affected by this PR: ${Array.from(affectedGames).join(', ')}\n`);

// Update each affected game
affectedGames.forEach(gameId => {
  const gameDir = path.join(gamesDir, gameId);
  const gameInfoPath = path.join(gameDir, 'game-info.yaml');
  
  console.log(`\n📦 Updating ${gameId}...`);
  
  let gameInfo;
  
  // Load existing game-info.yaml or create new structure
  if (fs.existsSync(gameInfoPath)) {
    try {
      const fileContent = fs.readFileSync(gameInfoPath, 'utf8');
      gameInfo = yaml.load(fileContent);
      console.log(`  ✓ Loaded existing game-info.yaml`);
    } catch (error) {
      console.error(`  ✗ Error reading game-info.yaml:`, error.message);
      return;
    }
  } else {
    // Create new structure
    console.log(`  ℹ️  Creating new game-info.yaml`);
    gameInfo = {
      game: {
        id: gameId,
        name: gameId,
        description: ''
      },
      pull_requests: [],
      stats: {
        total_prs: 0,
        first_pr_date: PR_MERGED_AT,
        last_pr_date: PR_MERGED_AT
      }
    };
  }
  
  // Check if this PR is already in the list
  const existingPR = gameInfo.pull_requests?.find(pr => pr.number === PR_NUMBER);
  if (existingPR) {
    console.log(`  ℹ️  PR #${PR_NUMBER} already tracked, skipping`);
    return;
  }
  
  // Extract description from PR body (first paragraph)
  let description = PR_TITLE;
  if (PR_BODY) {
    const bodyLines = PR_BODY.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('<!--');
    });
    if (bodyLines.length > 0) {
      description = bodyLines[0].substring(0, 200);
    }
  }
  
  // Add new PR to the beginning of the list (newest first)
  const newPR = {
    number: PR_NUMBER,
    title: PR_TITLE,
    url: PR_URL,
    merged_at: PR_MERGED_AT,
    author: PR_AUTHOR,
    description: description
  };
  
  if (!gameInfo.pull_requests) {
    gameInfo.pull_requests = [];
  }
  
  gameInfo.pull_requests.unshift(newPR);
  
  // Update stats
  if (!gameInfo.stats) {
    gameInfo.stats = {};
  }
  
  gameInfo.stats.total_prs = gameInfo.pull_requests.length;
  gameInfo.stats.last_pr_date = PR_MERGED_AT;
  
  if (!gameInfo.stats.first_pr_date) {
    gameInfo.stats.first_pr_date = PR_MERGED_AT;
  }
  
  // Save updated game-info.yaml
  try {
    const yamlContent = yaml.dump(gameInfo, {
      indent: 2,
      lineWidth: -1,
      noRefs: true
    });
    fs.writeFileSync(gameInfoPath, yamlContent, 'utf8');
    console.log(`  ✓ Updated game-info.yaml with PR #${PR_NUMBER}`);
    console.log(`  ✓ Total PRs: ${gameInfo.stats.total_prs}`);
  } catch (error) {
    console.error(`  ✗ Error writing game-info.yaml:`, error.message);
    return;
  }
  
  // Update games.json with the new PR count
  const gamesJsonPath = path.join(__dirname, '../../games.json');
  try {
    const gamesJson = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
    const game = gamesJson.games.find(g => g.id === gameId);
    
    if (game) {
      game.prCount = gameInfo.stats.total_prs;
      fs.writeFileSync(gamesJsonPath, JSON.stringify(gamesJson, null, 2) + '\n', 'utf8');
      console.log(`  ✓ Updated games.json with PR count: ${game.prCount}`);
    }
  } catch (error) {
    console.error(`  ✗ Error updating games.json:`, error.message);
  }
});

console.log('\n✅ Game PR tracking update complete!\n');
