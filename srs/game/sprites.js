// src/game/sprites.js

import bugImg from "../assets/game/enemy-bug_right.png";
import princessImg from "../assets/game/bug_princess.png";
import playerImg from "../assets/game/char-princess-girl.png";
import keyImg from "../assets/game/Key.png";
import grassImg from "../assets/game/grass-block.png";
import stoneImg from "../assets/game/stone-block.png";
import waterImg from "../assets/game/water-block.png";

function createSprite(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export const sprites = {
  enemy: createSprite(bugImg),
  princess: createSprite(princessImg),
  player: createSprite(playerImg),
  key: createSprite(keyImg),
  grass: createSprite(grassImg),
  stone: createSprite(stoneImg),
  water: createSprite(waterImg),
};
