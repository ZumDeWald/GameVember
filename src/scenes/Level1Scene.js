import Phaser, { Math } from "phaser";
import Player from "../classes/Player.js";
import { EventsName } from "../constants.js";
import Enemy from "../classes/Enemy";
import { createEnemyAnims } from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";
import { createObjectAnims } from "../anims/objectAnims.js";
import { sceneEvents } from "../events/EventsCenter";

class Level1Scene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  initPotions() {
    const getablePoints = this.level1Map.filterObjects(
      "health",
      (obj) => obj.name === "heart"
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
      (obj) => obj.name === "enemy"
    );

    this.enemies = enemyPoints.map((enemyPoint) => {
      return enemies.get(enemyPoint.x, enemyPoint.y, "bat", "Bat_Fly1");
    });
  }

  moveGrate(grate) {
    grate.setVelocityY(-50);
    this.time.delayedCall(750, () => {
      grate.setVelocityY(0);
      grate.destroy();
    });
  }

  activateSwitch(theSwitch, player, grate) {
    if (theSwitch.active) return;
    const diff = Math.Distance.BetweenPoints(
      { x: theSwitch.x, y: theSwitch.y },
      { x: player.x, y: player.y }
    );
    if (diff < 25) {
      theSwitch.play("switch_on");
      this.moveGrate(grate);
      theSwitch.active = true;
    }
  }

  create() {
    this.scene.get("ui-scene").scene.restart();

    // Properties
    this.jumping = false;

    // Map
    this.level1Map = this.make.tilemap({ key: "Lair" });
    const GBs2 = this.level1Map.addTilesetImage("GBs2");
    this.level1Map.createLayer("background", GBs2, 0, 0);
    this.physics.world.setBounds(0, 0, 1280, 640);

    this.level1Platforms = this.level1Map.createLayer("platforms", GBs2, 0, 0);
    this.level1Platforms.setCollisionByExclusion(-1, true);
    this.level1Platforms.setDepth(5);

    this.oneWayPlatforms = this.level1Map.createLayer(
      "oneWayPlatforms",
      GBs2,
      0,
      0
    );
    const oneWayTileIndecies = [1195, 1196, 1215, 1216, 1217];
    this.oneWayPlatforms.forEachTile((t) => {
      if (oneWayTileIndecies.includes(t.index)) {
        t.setCollision(false, false, true, false);
      }
    });

    this.level1Map.createLayer("foreground", GBs2, 0, 0).setDepth(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Anims
    createEnemyAnims(this.anims);
    createPlayerAnims(this.anims);
    createObjectAnims(this.anims);

    // Characters
    this.player = new Player(this, 100, 170);
    this.player.setSize(19, 30);
    this.player.setOffset(15, 5);
    this.initEnemies();

    // Inanimates
    this.initPotions();
    this.switch = this.physics.add.sprite(350, 170, "switches", "SwitchOff1");
    this.switch.play("switch_off");
    this.switch.active = false;
    this.switch.setDepth(-1);
    sceneEvents.on(
      EventsName.ATTACK,
      () => {
        this.activateSwitch(this.switch, this.player, this.grate);
      },
      this
    );

    this.grate = this.physics.add.image(404, 156, "grate");
    this.grate.body.setAllowGravity(false);
    this.grate.setImmovable(true);

    // Interactions
    this.physics.add.collider(this.player, this.level1Platforms);
    this.physics.add.collider(this.player, this.grate);
    this.physics.add.collider(this.player, this.oneWayPlatforms);
    this.physics.add.collider(this.enemies, this.level1Platforms);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.switch, this.level1Platforms);
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
