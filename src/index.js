import Phaser from "phaser";
import Level1Scene from "./scenes/Level1Scene.js";
import StartScene from "./scenes/StartScene.js";
import UIScene from "./scenes/UIScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: "#1C293C",
  autoFocus: true,
  scene: [StartScene, Level1Scene, UIScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true, // SET FALSE BEFORE DEPLOY //
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);
