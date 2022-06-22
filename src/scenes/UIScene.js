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
        this.scene.pause("playGame");
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
        this.scene.pause("playGame");
        this.scene.add("traverse", DimensionTraversal, true, {
          player: p,
          camera: c,
        });
      },
      this
    );
  }

  create() {
    this.miniMapBorder = this.add.rectangle(650, 20, 120, 100, 0x000000, 0);
    this.miniMapBorder.setOrigin(0);
    this.miniMapBorder.setStrokeStyle(2, 0x000000, 1);

    this.inputs = generateInputs(this);
    this.initListeners();

    this.healthIcon = this.add.image(28, 27, "heart");

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
    this.healthBarBorder.setStrokeStyle(2, 0x000);
    this.healthBarBorder.setOrigin(0, 0);

    this.dialog = new DialogBox(this, this.inputs);
    this.pauseScreen = new PauseScreen(this, this.inputs);
    this.infoCenter = new InfoCenter(this, this.inputs);
  }

  initListeners() {
    sceneEvents.on(
      EventsName.PLAYER_HEALTH_CHANGE,
      this.handlePlayerHealthChange,
      this
    );
    sceneEvents.on(EventsName.GET_POTION, this.handleGetPotion, this);
    sceneEvents.on(EventsName.GAMEOVER, this.gameEndHandler, this);
  }

  handlePlayerHealthChange(newHealth) {
    if (newHealth <= GameParams.HPMAX) {
      this.healthBar.setDisplaySize(newHealth, 16);
    } else {
      this.healthBar.setDisplaySize(GameParams.HPMAX, 16);
    }
  }

  handleGetPotion() {
    this.tweens.add({
      targets: [this.healthBar, this.healthBarBorder, this.healthIcon],
      duration: 100,
      repeat: 2,
      repeatDelay: 50,
      yoyo: true,
      alpha: 0.3,
      onStart: () => {
        GameParams.HPMAX += GameParams.HPADD;
        this.healthBar.setDisplaySize(GameParams.HPMAX, 16);
        this.healthBarBorder.setDisplaySize(GameParams.HPMAX, 16);
      },
    });
  }
}

export default UIScene;
