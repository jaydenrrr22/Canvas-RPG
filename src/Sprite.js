import { Vector2 } from "./Vector2";

export class Sprite {
  constructor({
    resource, // image we want to draw
    frameSize, // size of te crop of the image
    hFrames, // how the sprite arranged horizontally
    vFrames, // how the sprite arraged vertically
    frame, // which frame we want to show
    scale, // how large to draw this image
    position, // where to draw it (top left corner)
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }
}
