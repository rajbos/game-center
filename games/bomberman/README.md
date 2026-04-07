# Bomberman

Classic Bomberman arcade game! Navigate a grid maze, place bombs to destroy blocks and defeat enemies, collect power-ups, and find the hidden exit to advance to the next level.

## Built with AI

This game was built entirely using **GitHub Copilot** with the **Claude Sonnet 4.6** model.

### Development History

- *(PR links will be added as development progresses)*

## How to Play

### Objective
Destroy all enemies on each level and find the hidden exit door to advance. The exit is concealed under a destructible block — blow it up to reveal it!

### Controls

**Desktop:**
| Key | Action |
|-----|--------|
| Arrow Keys / WASD | Move |
| Space | Place bomb |

**Mobile:**
- Use the on-screen D-pad to move
- Tap the **💣 BOMB** button to place a bomb

### Game Mechanics

- **Bombs** explode after 3 seconds in 4 cardinal directions
- Explosions are blocked by indestructible walls
- Soft (brown) blocks can be destroyed — they may hide power-ups or the exit
- Bombs can chain-react with other bombs
- You can be killed by your own bomb!
- You start with **3 lives**

### Power-Ups

| Icon | Power-Up | Effect |
|------|----------|--------|
| 🔴 | **Bomb-Up** | Place one more bomb simultaneously |
| 🔥 | **Fire-Up** | Increase blast radius by 1 |
| ⚡ | **Speed-Up** | Move faster |

### Enemies

- **Ballom** (red): Moves randomly through the maze
- **Oneal** (blue): Smarter — will chase you down!

### Tips
- Always leave yourself an escape route when placing bombs
- Use bombs to create chain reactions for area clearing
- Collect power-ups early — they make later levels much easier
- The exit only activates after **all enemies are defeated**

## Mobile Support

The game is fully playable on mobile devices:
- Responsive canvas that scales to your screen
- On-screen D-pad and bomb button
- Minimum supported width: 375px
