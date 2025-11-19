import enemyImgSrc from "../assets/game/enemy-bug_right.png";
import princessImgSrc from "../assets/game/bug_princess.png";
import playerImgSrc from "../assets/game/char-princess-girl.png";
import keyImgSrc from "../assets/game/Key.png";
import grassImgSrc from "../assets/game/grass-block.png";
import stoneImgSrc from "../assets/game/stone-block.png";
import waterImgSrc from "../assets/game/water-block.png";

function load(src) {
  const img = new Image();
  img.src = src;
  return img;
}

export const sprites = {
  enemy: load(enemyImgSrc),
  princess: load(princessImgSrc),
  player: load(playerImgSrc),
  key: load(keyImgSrc),

  grass: load(grassImgSrc),
  stone: load(stoneImgSrc),
  water: load(waterImgSrc),
};
