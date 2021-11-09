import Phaser from "phaser";
import File1 from "./assets/File1.json";
import TileSet from "./assets/tileSet.png";
import BitGuy from "./assets/SpriteGuy/BitGuy.png";
import BitGuyAtlas from "./assets/SpriteGuy/BitGuy.json";

class File1Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.tilemapTiledJSON("file1Map", File1);
    this.load.image("tileSet", TileSet);
    this.load.atlas("bitGuy", BitGuy, BitGuyAtlas);
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

    // Guy
    this.guy = this.physics.add.sprite(20, 20, "bitGuy");
    this.guy.setCollideWorldBounds(true);
    this.physics.add.collider(this.guy, file1Walls);

    this.anims.create({
      key: "guy_idle_up",
      frames: [{ key: "bitGuy", frame: "SpriteGuy12" }],
      frameRate: 10,
    });
    this.anims.create({
      key: "guy_walk_up",
      frames: [
        { key: "bitGuy", frame: "SpriteGuy13" },
        { key: "bitGuy", frame: "SpriteGuy14" },
        { key: "bitGuy", frame: "SpriteGuy15" },
        { key: "bitGuy", frame: "SpriteGuy16" },
      ],
      frameRate: 8,
    });

    this.anims.create({
      key: "guy_idle_down",
      frames: [{ key: "bitGuy", frame: "SpriteGuy10" }],
      frameRate: 10,
    });
    this.anims.create({
      key: "guy_walk_down",
      frames: [
        { key: "bitGuy", frame: "SpriteGuy1" },
        { key: "bitGuy", frame: "SpriteGuy2" },
        { key: "bitGuy", frame: "SpriteGuy3" },
        { key: "bitGuy", frame: "SpriteGuy4" },
      ],
      frameRate: 8,
    });

    this.anims.create({
      key: "guy_idle_left",
      frames: [{ key: "bitGuy", frame: "SpriteGuy1" }],
      frameRate: 10,
    });
    this.anims.create({
      key: "guy_walk_left",
      frames: [
        { key: "bitGuy", frame: "SpriteGuy12" },
        { key: "bitGuy", frame: "SpriteGuy9" },
        { key: "bitGuy", frame: "SpriteGuy10" },
        { key: "bitGuy", frame: "SpriteGuy11" },
      ],
      frameRate: 8,
    });

    this.anims.create({
      key: "guy_idle_right",
      frames: [{ key: "bitGuy", frame: "SpriteGuy14" }],
      frameRate: 10,
    });
    this.anims.create({
      key: "guy_walk_right",
      frames: [
        { key: "bitGuy", frame: "SpriteGuy5" },
        { key: "bitGuy", frame: "SpriteGuy6" },
        { key: "bitGuy", frame: "SpriteGuy7" },
        { key: "bitGuy", frame: "SpriteGuy8" },
      ],
      frameRate: 8,
    });

    this.cameras.main.setBounds(
      0,
      0,
      file1Map.widthInPixels,
      file1Map.heightInPixels
    );
    this.cameras.main.startFollow(this.guy, true);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.guy.play("guy_walk_up", true);
    } else if (this.cursors.down.isDown) {
      this.guy.play("guy_walk_down", true);
    } else if (this.cursors.left.isDown) {
      this.guy.play("guy_walk_left", true);
    } else if (this.cursors.right.isDown) {
      this.guy.play("guy_walk_right", true);
    }

    if (this.cursors.up.isDown) {
      this.guy.setVelocityY(-175);
    } else if (this.cursors.down.isDown) {
      this.guy.setVelocityY(175);
    } else {
      this.guy.setVelocityY(0);
    }

    if (this.cursors.left.isDown) {
      this.guy.setVelocityX(-175);
    } else if (this.cursors.right.isDown) {
      this.guy.setVelocityX(175);
    } else {
      this.guy.setVelocityX(0);
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
