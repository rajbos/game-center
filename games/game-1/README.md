# Retro Pac-Man 👻

A classic Pac-Man style game built with emoji sprites and retro aesthetics!

## Built with AI

This game was built entirely using **GitHub Copilot Coding Agent** with the **Claude 3.5 Sonnet** model.

### Development History

This section tracks all PRs that contributed to building this game:

<!-- Add PR links below, with the most recent first -->
- Initial implementation with full game mechanics

## How to Play

🎮 **Controls:**
- Use **Arrow Keys** (↑ ↓ ← →) to move your Pac-Man character (😮)
- Navigate through the maze and eat all the pellets (•) and power pellets (●)

🎯 **Objective:**
- Eat all pellets to complete the level
- Avoid the ghosts (👻 👾 🤖 💀) or you'll lose a life
- Score points:
  - Regular pellets: 10 points
  - Power pellets: 50 points
  - Level completion: 200 bonus points

❤️ **Lives System:**
- You start with 3 lives
- When a ghost catches you, you lose a life and respawn at the starting position
- Game over when you run out of lives

👻 **Ghost Behavior:**
- Four different ghosts patrol the maze
- They have intelligent AI that tracks your position (70% of the time)
- Each ghost has a unique emoji and color

## Features

✨ **Game Mechanics:**
- Smooth keyboard-based movement with direction queuing
- Wall collision detection
- Ghost AI with pathfinding towards the player
- Three-life system with respawn
- Progressive level system
- Score tracking

🎨 **Visual Design:**
- Retro arcade aesthetic with neon colors
- Emoji-based sprites for all game elements
- Animated player with "chomping" effect
- Blinking power pellets
- Blue maze walls with cyan/blue color scheme
- Glowing text effects

🔊 **Sound Effects:**
- Movement sounds (retro beeps)
- Pellet eating sounds (ascending tones)
- Life loss sounds (descending alarm)
- Game over sound (dramatic sequence)
- Level complete sound (victory fanfare)
- All sounds generated using Web Audio API (no external files needed)

## Technical Details

- Built with vanilla JavaScript (no frameworks)
- CSS Grid layout for the game board
- RequestAnimationFrame for smooth game loop
- Web Audio API for retro sound effects
- Responsive design with retro styling
- 19x21 grid maze layout
