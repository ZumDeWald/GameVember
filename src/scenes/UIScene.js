import { Scene } from "phaser";
import { EventsName, GameStatus } from "../constants.js";
import { CustomText } from "../classes/CustomText.js";
import { GameParams } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";
import DialogBox from "../classes/DialogBox.js";
import PauseScreen from "../classes/PauseScreen.js";
import InfoCenter from "../classes/InfoCenter.js";
import { generateInputs } from "../utilities/inputListeners.js";
import DimensionTraversal from "./DimensionTraversal.js";

class UIScene extends Scene {
  constructor() {
    super("ui-scene");

    this.settings = {
      gamePaused: false,
      inputTimeout: 0,
      dialogOpen: false,
      checkBubbleState: "CLOSED",
      checkBubbleStep: 0,
    };

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
      this.game.scene.pause("playGame");
      this.gameEndPhrase = new CustomText(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `You Got Ded!\nCLICK TO CONTINUE`
          : `YOU ROCK!\nCLICK TO RESTART`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.once(
        "pointerdown",
        () => {
          this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
          this.gameEndPhrase.destroy(true);
          this.handlePlayerHealthChange(GameParams.HPMAX);
          sceneEvents.emit(EventsName.RESET_PLAYER);
          this.game.scene.resume("playGame");
        },
        this
      );
    };

    sceneEvents.on(
      EventsName.OPEN_DIALOG,
      () => {
        this.settings.dialogOpen = true;
        this.settings.gamePaused = true;
      },
      this
    );

    sceneEvents.on(
      EventsName.RESUME_GAME,
      () => {
        this.settings.dialogOpen = false;
        this.settings.gamePaused = false;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      (i, p, c) => {
        sceneEvents.emit(EventsName.PAUSE_GAME);
        this.scene.add("traverse", DimensionTraversal, true, {
          player: p,
          camera: c,
        });
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_TELE,
      (i, p, c) => {
        sceneEvents.emit(EventsName.PAUSE_GAME);
        this.scene.add("traverse", DimensionTraversal, true, {
          player: p,
          camera: c,
        });
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_POTION,
      (i, p, c) => {
        const healthVile = this.add.image(
          (p.x - c.worldView.x) * 1.8,
          (p.y - c.worldView.y) * 1.8,
          "potions",
          "potion_red"
        );
        healthVile.setOrigin(0);
        healthVile.setScale(1.8);
        this.handleGetPotion(healthVile);
      },
      this
    );

    sceneEvents.on(
      EventsName.SHOW_CHECK_BUBBLE,
      () => {
        this.settings.checkBubbleState = "OPENING";
      },
      this
    );

    sceneEvents.on(
      EventsName.HIDE_CHECK_BUBBLE,
      () => {
        this.settings.checkBubbleState = "CLOSING";
      },
      this
    );

    sceneEvents.on(
      EventsName.PLAYER_HEALTH_CHANGE,
      this.handlePlayerHealthChange,
      this
    );

    sceneEvents.on(EventsName.GAMEOVER, this.gameEndHandler, this);
  }

  create() {
    this.miniMapBorder = this.add.rectangle(650, 20, 120, 100, 0x000000, 0);
    this.miniMapBorder.setOrigin(0);
    this.miniMapBorder.setStrokeStyle(2, 0x000000, 1);

    this.checkBubble = this.add.image(850, 532, "check-bubble");
    this.checkBubble.setOrigin(0);
    this.checkBubble.setScale(0.5);
    this.checkBubble.setDepth(10);

    this.inputs = generateInputs(this);

    this.healthIcon = this.add.image(28, 27, "heart");

    this.healthBarBacking = this.add.rectangle(
      50,
      18,
      GameParams.HPMAX,
      16,
      0xd04835,
      0
    );
    this.healthBarBacking.setFillStyle(0xffffff, 0.6);
    this.healthBarBacking.setOrigin(0, 0);

    this.healthBar = this.add.rectangle(
      50,
      18,
      GameParams.HPMAX,
      16,
      0xd04835,
      1
    );
    this.healthBar.setOrigin(0, 0);

    this.healthBarBorder = this.add.rectangle(
      50,
      18,
      GameParams.HPMAX,
      16,
      0xd04835,
      0
    );
    this.healthBarBorder.setStrokeStyle(2, 0x000000);
    this.healthBarBorder.setOrigin(0, 0);

    this.dialog = new DialogBox(this, this.inputs);
    this.pauseScreen = new PauseScreen(this, this.inputs);
    this.infoCenter = new InfoCenter(this, this.inputs);
  }

  handlePlayerHealthChange(newHealth) {
    if (newHealth <= GameParams.HPMAX) {
      this.healthBar.setDisplaySize(newHealth, 16);
    } else {
      this.healthBar.setDisplaySize(GameParams.HPMAX, 16);
    }
  }

  handleGetPotion(healthVile) {
    this.tweens.add({
      targets: healthVile,
      duration: 800,
      x: 30,
      y: 15,
      ease: "Cubic.easeInOut",
      onComplete: () => {
        healthVile.destroy();
      },
    });

    this.tweens.add({
      targets: [this.healthBar, this.healthBarBorder, this.healthIcon],
      delay: 800,
      duration: 100,
      repeat: 2,
      repeatDelay: 50,
      yoyo: true,
      alpha: 0.3,
      onStart: () => {
        GameParams.HPMAX += GameParams.HPADD;
        this.healthBar.setDisplaySize(GameParams.HPMAX, 16);
        this.healthBarBorder.setDisplaySize(GameParams.HPMAX, 16);
        this.healthBarBacking.setDisplaySize(GameParams.HPMAX, 16);
      },
    });
  }

  update() {
    if (this.settings.checkBubbleState === "OPENING") {
      if (this.checkBubble.x > 630) {
        this.checkBubble.x -= 20;
      } else {
        this.settings.checkBubbleState = "OPEN";
      }
    }

    if (this.settings.checkBubbleState === "CLOSING") {
      if (this.checkBubble.x < 850) {
        this.checkBubble.x += 20;
      } else {
        this.settings.checkBubbleState = "CLOSED";
      }
    }
  }
}

export default UIScene;
