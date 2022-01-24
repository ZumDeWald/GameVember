import Phaser from "phaser";
import Player from "../classes/Player.js";
import { EventsName } from "../constants.js";
import Enemy from "../classes/Enemy";
import { createEnemyAnims } from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";
import { sceneEvents } from "../events/EventsCenter";

class Level1Scene extends Phaser.Scene {
  constructor() {
    super("playGame");
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
        sceneEvents.emit(EventsName.GET_POTION);
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
        obj.play("enemy_fly", true);
        obj.setTarget(this.player);
        obj.setSize(10, 13);
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
    this.scene.get("ui-scene").scene.restart();

    // Properties
    this.jumping = false;

    // Map
    this.level1Map = this.make.tilemap({ key: "Lair" });
    const GBs = this.level1Map.addTilesetImage("GBs");
    const GBs2 = this.level1Map.addTilesetImage("GBs2");
    this.level1Map.createLayer("background", [GBs, GBs2], 0, 0);
    this.physics.world.setBounds(0, 0, 4800, 4800);

    this.level1Platforms = this.level1Map.createLayer(
      "platforms",
      [GBs, GBs2],
      0,
      0
    );
    this.level1Platforms.setCollisionByExclusion(-1, true);

    this.oneWayPlatforms = this.level1Map.createLayer(
      "oneWayPlatforms",
      GBs2,
      0,
      0
    );
    const oneWayTileIndecies = [1281, 1282, 1283, 1283, 1282, 1283];
    this.oneWayPlatforms.forEachTile((t) => {
      if (oneWayTileIndecies.includes(t.index)) {
        t.setCollision(false, false, true, false);
      }
    });

    this.level1Map.createLayer("foreground", [GBs, GBs2], 0, 0).setDepth(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Anims
    createEnemyAnims(this.anims);
    createPlayerAnims(this.anims);

    // Characters
    this.player = new Player(this, 55, 200);
    this.player.setSize(19, 34);
    this.initEnemies();

    // Getables
    this.initPotions();

    // Interactions
    this.physics.add.collider(this.player, this.level1Platforms);
    this.physics.add.collider(this.player, this.oneWayPlatforms);
    this.physics.add.collider(this.enemies, this.level1Platforms);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      const dirX = obj1.x - obj2.x;
      const dirY = obj1.y - obj2.y;
      const dirV = new Phaser.Math.Vector2(dirX, dirY).normalize().scale(150);
      obj1.takeHit(1, dirV);
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
    this.cameras.main.setZoom(1.8);
    this.cameras.main.setDeadzone(175, 120);
    this.cameras.main.fadeIn(200, 0, 0, 0);

    this.mini = this.cameras.add(650, 20, 120, 100, false, "mini");
    this.mini.startFollow(this.player, true);
    this.mini.setBackgroundColor("#ddd3");
    this.mini.setZoom(0.2);
    this.mini.setDeadzone(50, 50);
  }

  update() {
    this.player.update();
  }
}

export default Level1Scene;
