# Tetris

A retro neon Tetris game for the Game Center arcade. Stack falling tetrominoes, clear lines, and survive as the speed increases!

## Built with AI

This game was built entirely using **GitHub Copilot Coding Agent** with the **Claude Sonnet 4.5** model.

### Development History

- [PR #30](https://github.com/rajbos/game-center/pull/30) - Initial Tetris implementation

## How to Play

### Objective

Arrange falling tetrominoes to complete full horizontal lines. Completed lines disappear, you score points, and the pieces fall faster as you level up!

### Desktop Controls

| Key | Action |
|-----|--------|
| `← →` Arrow Keys | Move piece left / right |
| `↑` Arrow / `X` | Rotate clockwise |
| `Z` | Rotate counter-clockwise |
| `↓` Arrow | Soft drop (move down faster) |
| `Space` | Hard drop (instant drop) |
| `P` | Pause / Resume |
| `R` | Restart |

### Mobile Controls

- **Left / Right** buttons — move the piece
- **Rotate** button (↺) — rotate clockwise
- **DROP** button — instant hard drop
- **Down** button (▼) — soft drop
- **Tap the board** — rotate
- **Swipe left / right** — move piece
- **Swipe down** — hard drop

## Features

- Classic 10×20 Tetris playfield
- All 7 standard tetrominoes (I, O, T, S, Z, J, L)
- Ghost piece preview (shows where the piece will land)
- Next piece preview panel
- Score, level, and lines counter
- Level progression with increasing speed (levels 1–20+)
- SRS wall-kick rotation system
- Hard drop and soft drop
- Full mobile support with on-screen controls and swipe gestures
- Retro neon arcade style matching the Game Center aesthetic
- Pause and restart functionality

## Mobile Support

This game is fully responsive and supports mobile devices with:
- Responsive canvas that scales to fit the screen
- On-screen directional and action buttons
- Swipe gesture support on the game board
- Minimum supported width: 375px
