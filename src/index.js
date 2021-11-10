import Phaser from "phaser";
import File1 from "./assets/File1.json";
import TileSet from "./assets/tileSet.png";
import Bug from "./assets/bug.png";
import BugAtlas from "./assets/bug.json";

class File1Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.tilemapTiledJSON("file1Map", File1);
    this.load.image("tileSet", TileSet);
    this.load.atlas("playerbug", Bug, BugAtlas);
  }

  create() {
    // Map
    const file1Map = this.make.tilemap({ key: "file1Map" });
    const tileSet = file1Map.addTilesetImage("tileSet", "tileSet");
    file1Map.createStaticLayer("Background", tileSet, 0, 0);
    this.physics.world.setBounds(0, 0, 800, 1600);

    const file1Walls = file1Map.createStaticLayer("Walls", tileSet, 0, 0);
    file1Walls.setCollisionByExclusion(-1, true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Bug
    this.bug = this.physics.add.sprite(20, 20, "playerbug");
    this.bug.setCollideWorldBounds(true);
    this.physics.add.collider(this.bug, file1Walls);

    this.cameras.main.setBounds(
      0,
      0,
      file1Map.widthInPixels,
      file1Map.heightInPixels
    );
    this.cameras.main.startFollow(this.bug, true);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.bug.setVelocityX(-175);
    } else if (this.cursors.right.isDown) {
      this.bug.setVelocityX(175);
    } else {
      this.bug.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.bug.setVelocityY(-175);
    } else if (this.cursors.down.isDown) {
      this.bug.setVelocityY(175);
    } else {
      this.bug.setVelocityY(0);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: File1Scene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: 0,
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
