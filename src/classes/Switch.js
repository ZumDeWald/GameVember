import Phaser, { Math } from "phaser";
import { sceneEvents } from "../events/EventsCenter";
import { EventsName } from "../constants.js";

export default class Switch extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, grateX, grateY) {
    super(scene, x, y, "switches", "SwitchOff1");

    this.settings = {
      activated: false,
    };

    this.play("switch_off", true);

    this.grate = this.scene.physics.add.image(grateX, grateY, "grate");
    this.grate.body.setAllowGravity(false);
    this.grate.setImmovable(true);
    this.grate.setPipeline("Light2D");

    sceneEvents.on(
      EventsName.ATTACK,
      () => {
        this.handleActivateSwitch(scene.player);
      },
      this
    );

    scene.physics.add.collider(this, scene.level1Platforms);
    scene.physics.add.collider(scene.player, this.grate);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(-1);
  }

  moveGrate() {
    this.grate.setVelocityY(-50);
    this.scene.time.delayedCall(750, () => {
      this.grate.setVelocityY(0);
      this.grate.destroy();
    });
  }

  activateSwitch() {
    this.play("switch_on");
    this.moveGrate();
    this.settings.activated = true;
  }

  handleActivateSwitch(player) {
    if (this.settings.activated) return;
    const diff = Math.Distance.BetweenPoints(
      { x: this.x, y: this.y },
      { x: player.x, y: player.y }
    );
    if (diff < 25) {
      this.activateSwitch();
    }
  }
}
