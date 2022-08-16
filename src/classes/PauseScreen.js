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
      healthCollected: 0,
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
      this.settings.boxTop + 10,
      `--]||-  PAUSE  -||[--`,
      {
        fontSize: "18px",
      }
    );
    this.header.setDepth(11);
    this.add(this.header);
    this.header.setPosition(
      this.scene.game.scale.width / 2 - this.header.width / 2,
      this.settings.boxTop + 40
    );

    // Abilities
    this.abilitiesFlourish = this.scene.add.text(
      this.settings.boxLeft,
      this.settings.boxTop + 90,
      `||||||||||`,
      {
        fontFamily: "Times",
        fontSize: "32px",
      }
    );
    this.abilitiesFlourish.setAlpha(0.5);
    this.add(this.abilitiesFlourish);

    this.abilitiesHeader = this.scene.add.text(
      this.settings.boxLeft + 75,
      this.settings.boxTop + 92,
      `Abilities`,
      {
        fontFamily: "Arial",
        fontSize: "24px",
      }
    );
    this.add(this.abilitiesHeader);

    this.pUp1Box = this.scene.add.graphics();
    this.pUp1Box.fillStyle(0x333333);
    this.pUp1Box.fillRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 145,
      60,
      60,
      8
    );
    this.pUp1Box.lineStyle(2, 0x545976);
    this.pUp1Box.strokeRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 145,
      60,
      60,
      8
    );
    this.add(this.pUp1Box);

    this.pUp1Description = this.scene.add.text(
      this.settings.boxLeft + 125,
      this.settings.boxTop + 157,
      `You're not sure why you even have this sword ...\nbut somehow it comforts you like a familiar friend.`,
      {
        fontSize: "16px",
      }
    );
    this.add(this.pUp1Description);

    this.pUp2Box = this.scene.add.graphics();
    this.pUp2Box.fillStyle(0x333333);
    this.pUp2Box.fillRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 230,
      60,
      60,
      8
    );
    this.pUp2Box.lineStyle(2, 0x545976);
    this.pUp2Box.strokeRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 230,
      60,
      60,
      8
    );
    this.add(this.pUp2Box);

    this.pUp2Description = this.scene.add.text(
      this.settings.boxLeft + 125,
      this.settings.boxTop + 242,
      "",
      {
        fontSize: "16px",
      }
    );
    this.add(this.pUp2Description);

    this.pUp3Box = this.scene.add.graphics();
    this.pUp3Box.fillStyle(0x333333);
    this.pUp3Box.fillRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 315,
      60,
      60,
      8
    );
    this.pUp3Box.lineStyle(2, 0x545976);
    this.pUp3Box.strokeRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 315,
      60,
      60,
      8
    );
    this.add(this.pUp3Box);

    this.pUp3Description = this.scene.add.text(
      this.settings.boxLeft + 125,
      this.settings.boxTop + 320,
      "",
      {
        fontSize: "16px",
      }
    );
    this.add(this.pUp3Description);

    // Health Powerups
    this.healthPowerUpsHeaderFlourish = this.scene.add.text(
      this.settings.boxLeft,
      this.settings.boxTop + 410,
      `||||||||||`,
      {
        fontFamily: "Times",
        fontSize: "32px",
      }
    );
    this.healthPowerUpsHeaderFlourish.setAlpha(0.5);
    this.add(this.healthPowerUpsHeaderFlourish);

    this.healthPowerUpsHeader = this.scene.add.text(
      this.settings.boxLeft + 75,
      this.settings.boxTop + 412,
      `Health Viles`,
      {
        fontFamily: "Arial",
        fontSize: "24px",
      }
    );
    this.add(this.healthPowerUpsHeader);

    this.healthPowerUpsBox = this.scene.add.graphics();
    this.healthPowerUpsBox.fillStyle(0x333333);
    this.healthPowerUpsBox.fillRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 456,
      60,
      60,
      8
    );
    this.healthPowerUpsBox.lineStyle(2, 0x545976);
    this.healthPowerUpsBox.strokeRoundedRect(
      this.settings.boxLeft + 45,
      this.settings.boxTop + 456,
      60,
      60,
      8
    );
    this.add(this.healthPowerUpsBox);

    this.healthPowerUp = this.scene.add.image(
      this.settings.boxLeft + 75,
      this.settings.boxTop + 485,
      "potions",
      "potion_red"
    );
    this.healthPowerUp.setScale(2.8);
    this.add(this.healthPowerUp);

    this.healthPowerUpTotal = this.scene.add.text(
      this.settings.boxLeft + 125,
      this.settings.boxTop + 472,
      `0 / 5`,
      {
        fontFamily: "Arial",
        fontSize: "20px",
      }
    );
    this.add(this.healthPowerUpTotal);

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
      EventsName.GET_POTION,
      () => {
        this.settings.healthCollected += 1;
        this.healthPowerUpTotal.text = `${this.settings.healthCollected} / 5`;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        this.pUp2Description.text = `You can cling to and jump from walls allowing even more \nversitility in traversal than you knew previously.`;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_TELE,
      () => {
        this.pUp3Description.text = `You are able to cast your kenetic consciousness into those\ninanimate objects open to receiving it and manipulate their\nposition.`;
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
