import Phaser, { Math } from "phaser";
import Player from "../classes/Player.js";
import { EventsName } from "../constants.js";
import Enemy from "../classes/Enemy";
import { createEnemyAnims } from "../anims/enemyAnims.js";
import { createPlayerAnims } from "../anims/playerAnims.js";
import { createObjectAnims } from "../anims/objectAnims.js";
import { sceneEvents } from "../events/EventsCenter";
import getablesFactory from "../utilities/getablesFactory.js";
import { generateInputs } from "../utilities/inputListeners.js";
import Computron from "../classes/Computron.js";
import CastSelector from "../classes/CastSelector.js";
import Switch from "../classes/Switch.js";

class Level1Scene extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.paused = false;
    this.lightTarget = null;
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

  create() {
    this.lights.enable().setAmbientColor(0x222222);
    this.light1 = this.lights
      .addLight(100, 120, 300)
      .setColor(0xffffff)
      .setIntensity(1.2);

    this.scene.get("ui-scene").scene.restart();

    sceneEvents.on(
      EventsName.PAUSE_GAME,
      () => {
        this.physics.world.pause();
        this.paused = true;
      },
      this
    );

    sceneEvents.on(
      EventsName.RESUME_GAME,
      () => {
        this.physics.world.resume();
        this.paused = false;
      },
      this
    );

    // Inputs
    this.inputs = generateInputs(this);

    // Map
    this.level1Map = this.make.tilemap({ key: "Lair" });
    const GBs2 = this.level1Map.addTilesetImage("GBs2");
    this.level1Map.createLayer("background", GBs2, 0, 0).setPipeline("Light2D");
    this.physics.world.setBounds(
      0,
      0,
      this.level1Map.widthInPixels,
      this.level1Map.heightInPixels
    );

    this.level1Platforms = this.level1Map
      .createLayer("platforms", GBs2, 0, 0)
      .setPipeline("Light2D");
    this.level1Platforms.setCollisionByExclusion(-1, true, false);
    this.level1Platforms.setDepth(5);

    this.oneWayPlatforms = this.level1Map
      .createLayer("oneWayPlatforms", GBs2, 0, 0)
      .setPipeline("Light2D");
    const oneWayTileIndecies = [1195, 1196, 1215, 1216, 1217];
    this.oneWayPlatforms.forEachTile((t) => {
      if (oneWayTileIndecies.includes(t.index)) {
        t.setCollision(false, false, true, false);
      }
    });

    this.level1Map
      .createLayer("foreground", GBs2, 0, 0)
      .setDepth(1)
      .setPipeline("Light2D");

    // Anims
    createEnemyAnims(this.anims);
    createPlayerAnims(this.anims);
    createObjectAnims(this.anims);

    // Characters
    this.player = new Player(this, 100, 158, this.inputs);
    this.player.setSize(16, 28);
    this.player.setOffset(16, 8);
    this.lightTarget = this.player;
    this.initEnemies();

    // Inanimates
    getablesFactory(
      this,
      this.level1Map,
      "health",
      "heart",
      "potions",
      "potion_red",
      EventsName.GET_POTION,
      false
    );

    getablesFactory(
      this,
      this.level1Map,
      "powerUps",
      "telekenesis",
      "icon-cast",
      null,
      EventsName.GET_CAST,
      true,
      0.3
    );

    getablesFactory(
      this,
      this.level1Map,
      "powerUps",
      "wallCling",
      "icon-cling",
      null,
      EventsName.GET_CLING,
      true,
      0.3
    );

    this.castables = this.physics.add.group([
      new Computron(this, 700, 164, this.inputs, this.player, "c1", "Firsten"),
      new Computron(
        this,
        688,
        608,
        this.inputs,
        this.player,
        "c1",
        "Malfunctioning Eddie"
      ),
      new Computron(
        this,
        1136,
        608,
        this.inputs,
        this.player,
        "c1",
        "Switch Bait"
      ),
      new Computron(this, 572, 108, this.inputs, this.player, "c3", "Kenny"),
      new Computron(this, 115, 468, this.inputs, this.player, "c2", "Clingy"),
    ]);

    this.castables.getMatching("name", "Firsten")[0].settings.texturePrefix =
      "computron";

    sceneEvents.on(
      EventsName.CAST_START,
      () => {
        const castCandidates = this.castables.getChildren().filter((c) => {
          const diff = Math.Distance.BetweenPoints(
            { x: c.x, y: c.y },
            { x: this.player.x, y: this.player.y }
          );
          return diff <= 120;
        });
        new CastSelector(
          this,
          this.inputs,
          castCandidates
        ).body.setAllowGravity(false);
      },
      this
    );

    this.switches = this.physics.add.group([
      new Switch(this, 350, 170, 404, 156),
      new Switch(this, 816, 264, 956, 348),
      new Switch(this, 192, 528, 468, 592),
    ]);

    // Interactions
    this.physics.add.collider(
      this.player,
      this.level1Platforms,
      (obj1, obj2) => {
        obj1.settings.touchingWall = true;
      },
      null,
      this
    );
    this.physics.add.collider(this.player, this.oneWayPlatforms);
    this.physics.add.collider(this.enemies, this.level1Platforms);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.castables, this.level1Platforms);
    this.physics.add.overlap(this.castables, this.switches, (obj1, obj2) => {
      if (!obj2.settings.activated) obj2.activateSwitch();
    });
    this.physics.add.collider(this.player, this.enemies, (obj1, obj2) => {
      obj1.takeHit(8);
      obj2.takeHit(0);
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
    this.cameras.main.setDeadzone(175, 80);
    this.cameras.main.fadeIn(200, 0, 0, 0);

    this.mini = this.cameras.add(650, 20, 120, 100, false, "mini");
    this.mini.startFollow(this.player, true);
    this.mini.setBackgroundColor("#ddd3");
    this.mini.setZoom(0.2);
    this.mini.setDeadzone(50, 50);
    this.mini.setBounds(
      0,
      0,
      this.level1Map.widthInPixels,
      this.level1Map.heightInPixels
    );

    sceneEvents.on(
      EventsName.CAST_SELECT,
      (target) => {
        this.cameras.main.pan(
          target.x,
          target.y,
          300,
          Phaser.Math.Easing.Cubic.easeInOut,
          true,
          null,
          this
        );
        this.time.delayedCall(300, () => {
          this.cameras.main.startFollow(target, true);
          // this.lightTarget = target;
        });
        this.mini.startFollow(target, true);
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_END,
      () => {
        this.cameras.main.pan(
          this.player.x,
          this.player.y,
          300,
          Phaser.Math.Easing.Cubic.easeInOut,
          true,
          null,
          this
        );
        this.time.delayedCall(300, () => {
          this.cameras.main.startFollow(this.player, true);
          // this.lightTarget = this.player;
        });
        this.mini.startFollow(this.player, true);
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        this.time.delayedCall(300, () => {
          this.castables.getMatching(
            "name",
            "Clingy"
          )[0].settings.texturePrefix = "computron";
        });
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CAST,
      () => {
        this.time.delayedCall(300, () => {
          this.castables.getMatching(
            "name",
            "Kenny"
          )[0].settings.texturePrefix = "computron";
        });
      },
      this
    );
  }

  update() {
    if (!this.paused) this.player.update();
    this.light1.setPosition(this.lightTarget.x, this.lightTarget.y);
  }
}

export default Level1Scene;
