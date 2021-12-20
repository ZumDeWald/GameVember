import Phaser from "phaser";

class StartScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  create() {
    this.add.text(20, 20, "Click anywhere to start");
  }

  update() {
    this.input.on("pointerdown", () => {
      this.scene.transition({
        target: "playGame",
        duration: 300,
        remove: true,
      });
    });
  }
}

export default StartScene;
