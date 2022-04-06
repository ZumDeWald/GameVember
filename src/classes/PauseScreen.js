import { EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class PauseScreen extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 50,
      boxLeft: 50,
      inputTimeout: 0,
      paused: false,
      dialogOpen: false,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x333333);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      699,
      499,
      8
    );
    this.backingBox.lineStyle(3, 0xffffff);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      700,
      500,
      8
    );
    this.backingBox.setDepth(10);
    this.add(this.backingBox);

    this.header = this.scene.add.text(
      100,
      this.settings.boxTop + 15,
      `<]||--  PAUSE  --||[>`
    );
    this.header.setDepth(11);
    this.add(this.header);
    this.header.setPosition(
      this.scene.game.scale.width / 2 - this.header.width / 2,
      this.settings.boxTop + 40
    );

    this.text = this.scene.add.text(
      50,
      this.settings.boxTop + 100,
      `
        Here's some info on how to play.
        
        Here's more info.`,
      {
        wordWrap: {
          width: 500,
        },
      }
    );
    this.text.setDepth(11);
    this.add(this.text);

    this.scene.add.existing(this);
    this.setVisible(false);

    sceneEvents.on(
      EventsName.OPEN_DIALOG,
      () => {
        this.settings.dialogOpen = true;
      },
      this
    );

    sceneEvents.on(
      EventsName.RESUME_GAME,
      () => {
        this.settings.dialogOpen = false;
      },
      this
    );
  }

  TogglePause() {
    this.settings.inputTimeout += 1;

    if (this.settings.paused) {
      this.settings.paused = false;
      this.setVisible(false);
      sceneEvents.emit(EventsName.RESUME_GAME);
    } else {
      this.settings.paused = true;
      this.setVisible(true);
      sceneEvents.emit(EventsName.PAUSE_GAME);
    }
  }

  preUpdate() {
    if (this.settings.inputTimeout === 0 && !this.settings.dialogOpen) {
      if (this.inputs.space.isDown) this.TogglePause();
    } else {
      if (this.settings.inputTimeout >= 15) {
        this.settings.inputTimeout = 0;
      } else {
        this.settings.inputTimeout += 1;
      }
    }
  }
}
