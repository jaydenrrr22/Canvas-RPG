import { GameObject } from "../../GameObject";
import { LEFT, RIGHT, UP, DOWN } from "../../Input";
import { isSpaceFree } from "../../helpers/grid";
import { Vector2 } from "../../Vector2";
import { walls } from "../../levels/level1";
import { Sprite } from "../../Sprite";
import { resources } from "../../Resource";
import { gridCells } from "../../helpers/grid";
import { Animations } from "../../Animations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import {
  WALK_DOWN,
  WALK_RIGHT,
  WALK_LEFT,
  WALK_UP,
  STANDING_DOWN,
  STANDING_LEFT,
  STANDING_RIGHT,
  STANDING_UP,
} from "./heroAnimations";
import { moveTowards } from "../../helpers/moveTowards";
import { events } from "../../Events";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 1,
      position: new Vector2(-8, -20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STANDING_DOWN),
        standUp: new FrameIndexPattern(STANDING_UP),
        standLeft: new FrameIndexPattern(STANDING_LEFT),
        standRight: new FrameIndexPattern(STANDING_RIGHT),
      }),
    });
    this.addChild(this.body);
    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
  }

  step(delta, root) {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    // Attempt to move again if the hero is at his position
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    if (this.lastX === this.position.x && this.lastY === this.position.y) {
      return;
    }
    this.lastX = this.position.x;
    this.lastY = this.position.y;
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root) {
    const { input } = root;
    if (!input.direction) {
      if (this.facingDirection === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DOWN) {
        this.body.animations.play("standDown");
      }
      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    const gridSize = 16;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;

    // Validating that the next destination is free
    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
