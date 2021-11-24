import Phaser from "phaser";
import Level1Scene from "./Level1Scene.js";
import StartScene from "./StartScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: "#222324",
  scene: [StartScene, Level1Scene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true, // SET FALSE BEFORE DEPLOY //
    },
  },
};

const game = new Phaser.Game(config);
