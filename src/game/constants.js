// src/game/constants.js

// Canvas size (in pixels)
export const CANVAS_WIDTH = 505;
export const CANVAS_HEIGHT = 606;

// Grid size (classic Frogger layout)
export const TILE_WIDTH = 101;
export const TILE_HEIGHT = 83;

// Player starting position (grid coordinates)
export const PLAYER_START_COL = 2;
export const PLAYER_START_ROW = 5;

// Levels configuration
export const LEVELS = [
  {
    id: 1,
    enemyRows: [1, 3, 4],
    enemySpeedRange: [120, 220],
    keyRow: 3,
    keyCol: 4,
  },
  {
    id: 2,
    enemyRows: [1, 2, 3, 4],
    enemySpeedRange: [150, 260],
    keyRow: 2,
    keyCol: 0,
  },
  {
    id: 3,
    enemyRows: [1, 2, 3, 4],
    enemySpeedRange: [180, 320],
    keyRow: 1,
    keyCol: 2,
  },
];

export const MAX_LIVES = 3;
