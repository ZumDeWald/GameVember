import { EventsName, PauseScreenMenus } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";
import generateCastControls from "../utilities/generateCastControls.js";
import generateMenuControlsGroup from "../utilities/generateMenuControlsGroup.js";
import generateMenuInventoryGroup from "../utilities/generateMenuInventoryGroup.js";
import generateMenuMainGroup from "../utilities/generateMenuMainGroup.js";

export default class PauseScreen extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 25,
      boxLeft: 25,
      inputTimeout: 0,
      paused: false,
      currentScreen: PauseScreenMenus.CONTROLS,
      dialogOpen: false,
      healthCollected: 0,
    };

    //Setup Groups
    this.mainGroup = generateMenuMainGroup(
      this.scene,
      this.settings.boxLeft,
      this.settings.boxTop
    );
    this.inventoryGroup = generateMenuInventoryGroup(
      this.scene,
      this.settings.boxLeft,
      this.settings.boxTop
    );
    this.controlsGroup = generateMenuControlsGroup(
      this.scene,
      this.settings.boxLeft,
      this.settings.boxTop
    );

    this.scene.add.existing(this);

    this.mainGroup.setDepth(10);
    this.inventoryGroup.setDepth(10);
    this.controlsGroup.setDepth(10);

    this.mainGroup.setVisible(false);
    this.inventoryGroup.setVisible(false);
    this.controlsGroup.setVisible(false);

    // Events
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
        const total = this.inventoryGroup
          .getChildren()
          .find((c) => c.name === "healthPowerUpTotal");
        total.text = `${this.settings.healthCollected} / 5`;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        const clingIcon = this.scene.add.image(
          this.settings.boxLeft + 75,
          this.settings.boxTop + 265,
          "icon-cling"
        );
        clingIcon.setVisible(false);
        clingIcon.setDepth(10);
        this.inventoryGroup.add(clingIcon);

        const pUp2Description = scene.add.text(
          this.settings.boxLeft + 125,
          this.settings.boxTop + 252,
          "You can cling to and jump from walls allowing even more \nversitility in traversal than you knew previously.",
          {
            fontSize: "16px",
          }
        );
        pUp2Description.setVisible(false);
        pUp2Description.setDepth(10);
        this.inventoryGroup.add(pUp2Description);

        const pUpBox2 = this.inventoryGroup
          .getChildren()
          .find((c) => c.name === "pUp2Box");
        pUpBox2.setAlpha(1);
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CAST,
      () => {
        const castIcon = this.scene.add.image(
          this.settings.boxLeft + 75,
          this.settings.boxTop + 345,
          "icon-cast"
        );
        castIcon.setVisible(false);
        castIcon.setDepth(10);
        this.inventoryGroup.add(castIcon);

        const pUp3Description = scene.add.text(
          this.settings.boxLeft + 125,
          this.settings.boxTop + 325,
          "You are able to cast your kenetic consciousness into those\ninanimate objects open to receiving it and manipulate their\nposition.",
          {
            fontSize: "16px",
          }
        );
        pUp3Description.setVisible(false);
        pUp3Description.setDepth(10);
        this.inventoryGroup.add(pUp3Description);

        const pUpBox3 = this.inventoryGroup
          .getChildren()
          .find((c) => c.name === "pUp3Box");
        pUpBox3.setAlpha(1);

        // GenerateCastControls
        this.controlsGroup.addMultiple(
          generateCastControls(
            scene,
            this.settings.boxLeft,
            this.settings.boxTop
          ),
          true
        );
      },
      this
    );
  }

  TogglePause() {
    this.settings.inputTimeout += 1;

    if (this.settings.paused) {
      this.settings.paused = false;
      this.mainGroup.setVisible(false);
      this.inventoryGroup.setVisible(false);
      this.controlsGroup.setVisible(false);
      sceneEvents.emit(EventsName.RESUME_GAME);
    } else {
      this.settings.paused = true;
      this.mainGroup.setVisible(true);
      if (this.settings.currentScreen === PauseScreenMenus.INVENTORY) {
        this.inventoryGroup.setVisible(true);
      } else {
        this.controlsGroup.setVisible(true);
      }
      sceneEvents.emit(EventsName.PAUSE_GAME);
    }
  }

  HandleChangeScreens() {
    if (this.settings.currentScreen === PauseScreenMenus.CONTROLS) {
      this.controlsGroup.setVisible(false);
      this.inventoryGroup.setVisible(true);
      this.settings.currentScreen = PauseScreenMenus.INVENTORY;
    } else {
      this.inventoryGroup.setVisible(false);
      this.controlsGroup.setVisible(true);
      this.settings.currentScreen = PauseScreenMenus.CONTROLS;
    }
    this.settings.inputTimeout += 1;
  }

  preUpdate() {
    if (this.settings.inputTimeout > 0) {
      if (this.settings.inputTimeout >= 15) {
        this.settings.inputTimeout = 0;
      } else {
        this.settings.inputTimeout += 1;
      }
    }

    if (this.settings.inputTimeout === 0 && !this.settings.dialogOpen) {
      if (this.inputs.space.isDown) this.TogglePause();
    }

    if (this.settings.inputTimeout === 0 && this.settings.paused) {
      if (
        (this.settings.currentScreen === PauseScreenMenus.INVENTORY &&
          this.inputs.left.isDown) ||
        (this.settings.currentScreen === PauseScreenMenus.CONTROLS &&
          this.inputs.right.isDown)
      ) {
        this.HandleChangeScreens();
      }
    }
  }
}
