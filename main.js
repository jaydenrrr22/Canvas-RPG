import { Animations } from "./src/Animations";
import { events } from "./src/Events";
import { FrameIndexPattern } from "./src/FrameIndexPattern";
import { GameLoop } from "./src/GameLoop";
import { GameObject } from "./src/GameObject";
import { gridCells, isSpaceFree } from "./src/helpers/grid";
import { moveTowards } from "./src/helpers/moveTowards";
import { DOWN, Input, RIGHT, UP, LEFT } from "./src/Input";
import { walls } from "./src/levels/level1";
import { Hero } from "./src/objects/Hero/Hero";
import {
  STANDING_DOWN,
  STANDING_LEFT,
  STANDING_RIGHT,
  STANDING_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./src/objects/Hero/heroAnimations";
import { resources } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import "./style.css";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

// Build up the scene by adding a sky, ground and hero
const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});

mainScene.addChild(skySprite);

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

// Add an Input class to the main scene
mainScene.input = new Input();

events.on("HERO_POSITION", mainScene, (heroPosition) => {
  console.log("HERO MOVED!", heroPosition);
});

// Establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  mainScene.draw(ctx, 0, 0);
};

// Start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
