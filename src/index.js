import Phaser from "phaser";
import Level1 from "./assets/TestMap.json";
import SpaceTiles from "./assets/spaceTiles.png";
import Player from "./assets/player.png";
import PlayerAtlas from "./assets/player.json";

class File1Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.tilemapTiledJSON("level1Map", Level1);
    this.load.image("spaceTiles", SpaceTiles);
    this.load.atlas("player", Player, PlayerAtlas);
  }

  create() {
    // Map
    const level1Map = this.make.tilemap({ key: "level1Map" });
    const spaceTiles = level1Map.addTilesetImage("spaceTiles");
    level1Map.createLayer("background", spaceTiles, 0, 0);
    this.physics.world.setBounds(0, 0, 800, 800);

    const level1Walls = level1Map.createLayer("platforms", spaceTiles, 0, 0);
    level1Walls.setCollisionByExclusion(-1, true);

    const level1foreground = level1Map.createLayer(
      "foreground",
      spaceTiles,
      0,
      0
    );
    level1foreground.setDepth(5);

    const level1hurts = level1Map.createLayer("hurts", spaceTiles, 0, 0);
    level1hurts.setDepth(4);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Characters
    this.player = this.physics.add.sprite(20, 20, "player");
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, level1Walls);

    this.cameras.main.setBounds(
      0,
      0,
      level1Map.widthInPixels,
      level1Map.heightInPixels
    );
    this.cameras.main.startFollow(this.player, true);

    // Animations
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNames("player", {
        prefix: "player_idle",
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player_run",
      frames: this.anims.generateFrameNames("player", {
        prefix: "player_run",
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setFlipX(true);
      this.player.play("player_run", true);
      this.player.setVelocityX(-175);
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);
      this.player.play("player_run", true);
      this.player.setVelocityX(175);
    } else {
      this.player.play("player_idle", true);
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-300);
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
      gravity: { y: 600 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
