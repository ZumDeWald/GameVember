import Phaser from "phaser";
import Level1Scene from "./scenes/Level1Scene.js";
import StartScene from "./scenes/StartScene.js";
import UIScene from "./scenes/UIScene.js";

const config = {
  type: Phaser.WEBGL,
  parent: "game-canvas",
  width: 800,
  height: 600,
  backgroundColor: "#1C293C",
  autoFocus: true,
  scene: [StartScene, Level1Scene, UIScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 700 },
      debug: false, // SET FALSE BEFORE DEPLOY //
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  input: {
    gamepad: true,
  },
};

const game = new Phaser.Game(config);
