import { GameLoop } from "./src/GameLoop";
import { DOWN, Input, RIGHT, UP, LEFT } from "./src/Input";
import { resources } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
});

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

const heroPos = new Vector2(16 * 6, 16 * 5);
const input = new Input();

const update = () => {
  if (input.direction === DOWN) {
    heroPos.y += 1;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    heroPos.y -= 1;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    heroPos.x -= 1;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    heroPos.x += 1;
    hero.frame = 3;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  // Center the Hero in the cell
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPosY = heroPos.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
