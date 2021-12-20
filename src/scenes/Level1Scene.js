import Phaser from "phaser";
import Level1 from "../assets/Level1.json";
import GameVemberTiles from "../assets/LevelBlocks.png";
import Player from "../classes/Player.js";
import PlayerSprite from "../assets/player.png";
import PlayerAtlas from "../assets/player.json";
import PotionSprites from "../assets/potions.png";
import PotionAtlas from "../assets/potions.json";
import BatSprites from "../assets/bat.png";
import BatAtlas from "../assets/bat.json";
import { EventsName } from "../constants.js";
import Enemy from "../classes/Enemy";
import { createEnemyAnims } from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";

class Level1Scene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  preload() {
    this.load.tilemapTiledJSON("level1Map", Level1);
    this.load.image("GameVemberTiles", GameVemberTiles);
    this.load.atlas("player", PlayerSprite, PlayerAtlas);
    this.load.atlas("potions", PotionSprites, PotionAtlas);
    this.load.atlas("bat", BatSprites, BatAtlas);
  }

  initPotions() {
    const getablePoints = this.level1Map.filterObjects(
      "getables",
      (obj) => obj.name === "Pickup"
    );

    const potions = getablePoints.map((potion) =>
      this.physics.add.sprite(potion.x, potion.y, "potions", "potion_red")
    );

    potions.forEach((potion) => {
      this.physics.add.overlap(this.player, potion, (obj1, obj2) => {
        this.game.events.emit(EventsName.GET_POTION);
        obj2.destroy();
        this.cameras.main.flash(400, 25, 180, 225);
      });
      this.physics.add.collider(potion, this.level1Platforms);
    });
  }

  initEnemies() {
    const enemies = this.physics.add.group({
      classType: Enemy,
      createCallback: (obj) => {
        obj.getBody().setAllowGravity(false);
        obj.play("fly", true);
        obj.setTarget(this.player);
      },
    });

    const enemyPoints = this.level1Map.filterObjects(
      "enemies",
      (obj) => obj.name === "Enemy"
    );

    this.enemies = enemyPoints.map((enemyPoint) => {
      return enemies.get(enemyPoint.x, enemyPoint.y, "bat", "Bat_Fly1");
    });
  }

  create() {
    this.scene.start("ui-scene");

    // Properties
    this.jumping = false;

    // Map
    this.level1Map = this.make.tilemap({ key: "level1Map" });
    const GameVemberTiles = this.level1Map.addTilesetImage("GameVemberTiles");
    this.level1Map.createLayer("background", GameVemberTiles, 0, 0);
    this.level1Map
      .createLayer("background2", GameVemberTiles, 0, 0)
      .setDepth(1);
    this.physics.world.setBounds(0, 0, 4800, 4800);

    this.level1Platforms = this.level1Map.createLayer(
      "platforms",
      GameVemberTiles,
      0,
      0
    );
    this.level1Platforms.setCollisionByExclusion(-1, true);

    const level1Spikes = this.level1Map.createLayer(
      "spikes",
      GameVemberTiles,
      0,
      0
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    // Anims
    createEnemyAnims(this.anims);
    createPlayerAnims(this.anims);

    // Characters
    this.player = new Player(this, 55, 145);
    this.initEnemies();

    // Getables
    this.initPotions();

    // Interactions
    this.physics.add.collider(this.player, this.level1Platforms);
    this.physics.add.collider(this.enemies, this.level1Platforms);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      const dirX = obj1.x - obj2.x;
      const dirY = obj1.y - obj2.y;
      const dirV = new Phaser.Math.Vector2(dirX, dirY).normalize().scale(150);
      obj1.takeHit(10, dirV);
      obj2.takeHit(0, { x: -dirV.x, y: -dirV.y });
    });

    // Camera
    this.cameras.main.setBounds(
      0,
      0,
      this.level1Map.widthInPixels,
      this.level1Map.heightInPixels
    );
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(1.5);
  }

  update() {
    this.player.update();
  }
}

export default Level1Scene;
