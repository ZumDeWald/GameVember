import Phaser from "phaser";
import Level1 from "./assets/Level1.json";
import GameVemberTiles from "./assets/LevelBlocks.png";
import Spares from "./assets/spaceTiles.png";
import Player from "./assets/player.png";
import PlayerAtlas from "./assets/player.json";

class File1Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.tilemapTiledJSON("level1Map", Level1);
    this.load.image("GameVemberTiles", GameVemberTiles);
    this.load.image("Spares", Spares);
    this.load.atlas("player", Player, PlayerAtlas);
  }

  create() {
    // Properties
    this.jumping = false;

    // Map
    const level1Map = this.make.tilemap({ key: "level1Map" });
    const GameVemberTiles = level1Map.addTilesetImage("GameVemberTiles");
    const Spares = level1Map.addTilesetImage("Spares");
    level1Map.createLayer("background", Spares, 0, 0);
    level1Map.createLayer("background2", GameVemberTiles, 0, 0).setDepth(1);
    this.physics.world.setBounds(0, 0, 4800, 4800);

    const level1Platforms = level1Map.createLayer(
      "platforms",
      GameVemberTiles,
      0,
      0
    );
    level1Platforms.setCollisionByExclusion(-1, true);

    const level1Spikes = level1Map.createLayer("spikes", GameVemberTiles, 0, 0);
    level1Spikes.setDepth(4);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Characters
    this.player = this.physics.add.sprite(55, 145, "player", "idle1");

    // Animations
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNames("player", {
        prefix: "idle",
        end: 2,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player_run",
      frames: this.anims.generateFrameNames("player", {
        prefix: "run",
        end: 6,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "player_jump",
      frames: this.anims.generateFrameNames("player", {
        prefix: "smrslt",
        end: 4,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Interactions
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, level1Platforms);

    // Camera
    this.cameras.main.setBounds(
      0,
      0,
      level1Map.widthInPixels,
      level1Map.heightInPixels
    );
    this.cameras.main.startFollow(this.player, true);
  }

  update() {
    if (this.player.body.onFloor()) this.jumping = false;
    if (this.player.body.onFloor() && this.cursors.space.isDown) this.jump();
    if (this.jumping) this.player.play("player_jump", true);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-175);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(175);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.player.body.onFloor()) {
      if (this.cursors.left.isDown) {
        this.player.setFlipX(true);
        this.player.play("player_run", true);
      } else if (this.cursors.right.isDown) {
        this.player.setFlipX(false);
        this.player.play("player_run", true);
      } else {
        this.player.play("player_idle", true);
      }
    }
  }

  jump() {
    this.jumping = true;
    this.player.setVelocityY(-300);
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
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
