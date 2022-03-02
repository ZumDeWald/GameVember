import { GameObjects, Scene } from "phaser";
import { Score } from "../classes/Score.js";
import { EventsName, GameStatus, ScoreOperations } from "../constants.js";
import { CustomText } from "../classes/CustomText.js";
import { GameParams } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

class UIScene extends Scene {
  constructor() {
    super("ui-scene");
    // this.score;

    // this.scorePoints = (points) => {
    //   this.score.changeValue(ScoreOperations.INCREASE, points);
    //   // if (this.score.getValue() >= GameParams.winScore) {
    //   //   sceneEvents.emit(EventsName.GAMEOVER, GameStatus.WIN);
    //   // }
    // };

    this.gameEndHandler = (status) => {
      this.cameras.main.setBackgroundColor("rgba(0,0,0,0.6)");
      this.game.scene.pause("playGame");
      this.gameEndPhrase = new CustomText(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `You Got Ded!\nCLICK TO RESTART`
          : `YOU ROCK!\nCLICK TO RESTART`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.on("pointerdown", () => {
        sceneEvents.off(EventsName.GET_POTION);
        sceneEvents.off(EventsName.DEFEAT_BAT);
        sceneEvents.off(EventsName.GAMEOVER);
        sceneEvents.off(EventsName.PLAYER_HIT);
        this.scene.get("playGame").scene.restart();
      });
    };
  }

  create() {
    // this.score = new Score(this, 10, 40, 0);

    this.miniMapBorder = this.add.rectangle(650, 20, 120, 100, 0x000000, 0);
    this.miniMapBorder.setOrigin(0);
    this.miniMapBorder.setStrokeStyle(2, 0x000000, 1);

    this.initListeners();

    // this.health = this.add.group({
    //   classType: Phaser.GameObjects.Image,
    // });

    // this.health.createMultiple({
    //   key: "health-lg",
    //   setXY: {
    //     x: 30,
    //     y: 20,
    //     stepX: 36,
    //   },
    //   quantity: 3,
    // });

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
    this.healthBarBorder.setStrokeStyle(2, 0x000, 0.9);
    this.healthBarBorder.setOrigin(0, 0);
  }

  initListeners() {
    sceneEvents.on(
      EventsName.PLAYER_HEALTH_CHANGE,
      this.handlePlayerHealthChange,
      this
    );
    sceneEvents.on(EventsName.GET_POTION, this.handleGetPotion, this);
    sceneEvents.once(EventsName.GAMEOVER, this.gameEndHandler, this);
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
