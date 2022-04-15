import { Physics, Math } from "phaser";
import { GameParams } from "../constants";
import { EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";
import { getConversation } from "../dialog.js";

export default class Computron extends Physics.Arcade.Image {
  constructor(scene, x, y, inputsFromScene, target, conversationId) {
    super(scene, x, y, "computron");

    this.inputs = inputsFromScene;
    this.target = target;

    this.settings = {
      occupied: false,
      inputTimeout: 0,
      conversationTriggered: false,
      conversation: getConversation(conversationId),
      castActive: false,
    };

    this.openDialogIndicator = this.scene.add.image(
      this.x,
      this.y - 25,
      "up-indicator"
    );
    this.openDialogIndicator.setScale(0.8);
    this.openDialogIndicator.setDepth(-1);

    sceneEvents.on(EventsName.CAST_START, () => {
      this.settings.castActive = true;
      this.openDialogIndicator.setVisible(false);
    });

    sceneEvents.on(EventsName.CAST_END, () => {
      this.settings.castActive = false;
    });

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.setDepth(-1);
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

  showIfPlayerClose() {
    const diff = Math.Distance.BetweenPoints(
      { x: this.x, y: this.y },
      { x: this.target.x, y: this.target.y }
    );
    if (diff < 50) {
      this.openDialogIndicator.setPosition(this.x, this.y - 25);
      this.openDialogIndicator.setVisible(true);
      if (this.inputs.up.isDown) {
        this.settings.conversationTriggered = true;
        sceneEvents.emit(EventsName.OPEN_DIALOG, this.settings.conversation);
        sceneEvents.emit(EventsName.PAUSE_GAME);
        this.openDialogIndicator.setVisible(false);
      }
    } else {
      this.openDialogIndicator.setVisible(false);
    }
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

    if (this.settings.inputTimeout > 0) {
      if (this.settings.inputTimeout === 1) this.angle += 90;
      if (this.settings.inputTimeout >= 15) {
        this.settings.inputTimeout = 0;
      } else {
        this.settings.inputTimeout += 1;
      }
    }

    if (this.inputs.down.isDown && this.inputs.jump.isDown) {
      this.setOccupied(false);
      this.scene.time.delayedCall(300, () => {
        sceneEvents.emit(EventsName.CAST_END);
      });
    } else if (this.inputs.jump.isDown) {
      this.settings.inputTimeout += 1;
    }
  }

  preUpdate() {
    if (this.settings.occupied) this.controlComputron();
    if (!this.settings.conversationTriggered && !this.settings.castActive) {
      this.showIfPlayerClose();
    }
  }
}
