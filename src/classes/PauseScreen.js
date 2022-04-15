import { EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class PauseScreen extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 25,
      boxLeft: 25,
      inputTimeout: 0,
      paused: false,
      dialogOpen: false,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x000000);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      749,
      549,
      8
    );
    this.backingBox.lineStyle(5, 0xeeeeee);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      750,
      550,
      8
    );
    this.add(this.backingBox);

    this.header = this.scene.add.text(
      100,
      this.settings.boxTop + 15,
      `--]||-  PAUSE  -||[--`
    );
    this.header.setDepth(11);
    this.add(this.header);
    this.header.setPosition(
      this.scene.game.scale.width / 2 - this.header.width / 2,
      this.settings.boxTop + 40
    );

    this.setDepth(10);
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

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        this.clingInfo = this.scene.add.text(
          10,
          this.settings.boxTop + 100,
          `
      -| Wall Cling |- 

          > Here you can cling to and jump from walls allowing even more 
          versitility in traversal than you knew previously.`
        );
        this.clingInfo.setDepth(11);
        this.clingInfo.setVisible(false);
        this.add(this.clingInfo);
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_TELE,
      () => {
        this.castInfo = this.scene.add.text(
          10,
          this.settings.boxTop + 230,
          `
      -| Cast |- 

          > In this reality you are able to cast your kenetic consciousness
          into those inanimate objects open to receiving it and manipulate 
          their position.`
        );
        this.castInfo.setDepth(11);
        this.castInfo.setVisible(false);
        this.add(this.castInfo);
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
