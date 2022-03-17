import { Physics } from "phaser";
import { GameParams } from "../constants";
import { EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class Computron extends Physics.Arcade.Image {
  constructor(scene, x, y, inputsFromScene) {
    super(scene, x, y, "computron");

    this.inputs = inputsFromScene;
    this.settings = {
      occupied: false,
      inputTimeout: 0,
    };

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  showCastable() {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      yoyo: true,
      alpha: 0.5,
    });
  }

  hideCastable() {
    this.scene.tweens.killTweensOf(this);
    this.setAlpha(1);
  }

  setOccupied(status) {
    this.settings.occupied = status;
    this.body.setAllowGravity(!status);
  }

  controlComputron() {
    if (this.inputs.left.isDown) {
      this.setVelocityX(-GameParams.VCOMP);
    } else if (this.inputs.right.isDown) {
      this.setVelocityX(GameParams.VCOMP);
    } else if (this.inputs.up.isDown) {
      this.setVelocityY(-GameParams.VCOMP);
    } else if (this.inputs.down.isDown) {
      this.setVelocityY(GameParams.VCOMP);
    } else {
      this.body.setVelocity(0);
    }

    if (this.inputs.jump.isDown) {
      this.settings.inputTimeout += 1;
    }

    if (this.settings.inputTimeout > 0) {
      if (this.settings.inputTimeout === 1) this.angle += 90;
      if (this.settings.inputTimeout >= 15) {
        this.settings.inputTimeout = 0;
      } else {
        this.settings.inputTimeout += 1;
      }
    }

    if (this.inputs.space.isDown) {
      this.setOccupied(false);
      this.scene.time.delayedCall(300, () => {
        sceneEvents.emit(EventsName.CAST_END);
      });
    }
  }

  preUpdate() {
    if (this.settings.occupied) this.controlComputron();
  }
}
