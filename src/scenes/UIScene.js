import { Scene } from "phaser";
import { Score } from "../classes/Score.js";
import { EventsName, GameStatus, ScoreOperations } from "../constants.js";
import { CustomText } from "../classes/CustomText.js";
import { GameParams } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

class UIScene extends Scene {
  constructor() {
    super("ui-scene");
    this.score;

    this.scorePoints = (points) => {
      this.score.changeValue(ScoreOperations.INCREASE, points);
      // if (this.score.getValue() >= GameParams.winScore) {
      //   sceneEvents.emit(EventsName.GAMEOVER, GameStatus.WIN);
      // }
    };

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
    this.score = new Score(this, 10, 40, 0);

    this.initListeners();

    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });

    this.hearts.createMultiple({
      key: "heart-full",
      setXY: {
        x: 30,
        y: 20,
        stepX: 36,
      },
      quantity: 3,
    });
  }

  initListeners() {
    sceneEvents.on(
      EventsName.GET_POTION,
      () => {
        this.scorePoints(50);
      },
      this
    );
    sceneEvents.on(
      EventsName.DEFEAT_BAT,
      () => {
        this.scorePoints(20);
      },
      this
    );
    sceneEvents.on(
      EventsName.PLAYER_HEALTH_CHANGE,
      this.handlePlayerHealthChange,
      this
    );
    sceneEvents.once(EventsName.GAMEOVER, this.gameEndHandler, this);
  }

  handlePlayerHealthChange(newHealth) {
    this.hearts.children.each((heart, i) => {
      if (i < newHealth) {
        heart.setTexture("heart-full");
      } else {
        heart.setTexture("heart-empty");
      }
    });
  }
}

export default UIScene;
