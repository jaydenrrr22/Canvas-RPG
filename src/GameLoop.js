export class GameLoop {
  constructor(update, render) {
    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000 / 60; // 60 frames per second

    this.update = update;
    this.render = render;

    this.rafID = null;
    this.isRunning = false;
  }

  mainLoop = (timestamp) => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame
    this.accumulatedTime += deltaTime;

    // Fixed time step updates
    // If there is enought accumulated time to run one or more fixedd update, run them
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Here, we pass the fixed time step size.
      this.accumulatedTime -= this.timeStep;
    }

    this.render();
    this.rafID = requestAnimationFrame(this.mainLoop);
  };

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafID = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.rafID) {
      cancelAnimationFrame(this.rafID);
    }
    this.isRunning = false;
  }
}
