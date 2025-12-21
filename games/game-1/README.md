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

**Desktop:**
- Use **Arrow Keys** (↑ ↓ ← →) to move your Pac-Man character (😮)

**Mobile:**
- **Swipe** in any direction on the game board to move
- **Tap** the directional buttons (↑ ↓ ← →) below the game board
- Navigate through the maze and eat all the pellets (•) and power pellets (●)

🎯 **Objective:**
- Eat all pellets to complete the level
- **Power pellets (●) let you eat ghosts for a limited time!**
  - When you eat a power pellet, ghosts turn scared (😱) and run away
  - You can eat scared ghosts to score bonus points
  - The effect lasts for 8 seconds
  - Ghosts blink in the last 2 seconds as a warning
  - After being eaten, ghosts respawn at the center
- Score points:
  - Regular pellets: 10 points
  - Power pellets: 50 points
  - Eating ghosts: 200, 400, 800, 1600 points (combo multiplier)
  - Level completion: 200 bonus points

❤️ **Lives System:**
- You start with 3 lives
- When a ghost catches you, you lose a life and respawn at the starting position
- Game over when you run out of lives

👻 **Ghost Behavior:**
- Four different ghosts patrol the maze
- They have intelligent AI that tracks your position (70% of the time)
- Each ghost has a unique emoji and color
- **Power Mode:** When you eat a power pellet, ghosts become scared and flee from you
  - Scared ghosts are vulnerable and can be eaten for points
  - Eaten ghosts return to the center and respawn
  - Ghosts blink when power mode is about to end

## Features

✨ **Game Mechanics:**
- Smooth keyboard-based movement with direction queuing
- Touch and swipe controls for mobile devices
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
- Responsive design that adapts to mobile screens

📱 **Mobile Support:**
- Responsive grid layout that scales for different screen sizes
- Touch control buttons for directional movement
- Swipe gesture recognition for intuitive mobile gameplay
- Optimized cell sizes for tablets and phones

🔊 **Sound Effects:**
- Movement sounds (retro beeps)
- Pellet eating sounds (ascending tones)
- **Power pellet sound (rising tone sequence)**
- **Power mode music (continuous chase theme)**
- **Ghost eating sound (ascending scale)**
- Life loss sounds (descending alarm)
- Game over sound (dramatic sequence)
- Level complete sound (victory fanfare)
- All sounds generated using Web Audio API (no external files needed)

## Technical Details

- Built with vanilla JavaScript (no frameworks)
- CSS Grid layout for the game board
- RequestAnimationFrame for smooth game loop
- Web Audio API for retro sound effects
- Responsive design with mobile-first approach
- Touch event handling for swipe gestures
- On-screen directional buttons for mobile devices
- Media queries for optimal display on tablets (768px) and phones (480px)
- 19x21 grid maze layout that scales appropriately
