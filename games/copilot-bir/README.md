# Copilot Bir 🤖

A Flappy Bird-style browser game with a GitHub Copilot theme. Navigate through code-styled pipes without crashing!

## Built with AI

This game was built entirely using **GitHub Copilot** with the **Claude Sonnet 4.6** model.

### Development History

- [Current PR](https://github.com/rajbos/game-center/pull/XXX) - Initial implementation

## How to Play

**Objective:** Keep the Copilot bird flying by navigating through the gaps in the blue code pipes. Every pipe you pass earns 1 point.

### Controls

| Platform | Action |
|----------|--------|
| **Desktop** | Press `Space` or `↑` to flap |
| **Desktop** | Click anywhere on the canvas to flap |
| **Mobile** | Tap anywhere on the canvas to flap |

### Tips

- The bird falls with gravity — keep tapping/pressing to stay airborne
- The speed increases slightly every 5 pipes scored
- Your best score is saved in `localStorage` between sessions
- Hitting the ground, ceiling, or a pipe ends the run

## Mobile Support

- Fully responsive canvas that adapts from 375 px wide phones to desktop monitors
- Touch controls: tap anywhere on the game area to flap
- `user-scalable=no` prevents accidental zoom during gameplay
- `touch-action: none` ensures smooth pointer events on all devices
