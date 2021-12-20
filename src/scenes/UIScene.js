import { Scene } from "phaser";
import { Score } from "../classes/Score.js";
import { EventsName, GameStatus, ScoreOperations } from "../constants.js";
import { CustomText } from "../classes/CustomText.js";
import { GameParams } from "../constants.js";

class UIScene extends Scene {
  constructor() {
    super("ui-scene");
    this.score;

    this.scorePoints = (points) => {
      this.score.changeValue(ScoreOperations.INCREASE, points);
      if (this.score.getValue() >= GameParams.winScore) {
        this.game.events.emit(EventsName.GAMEOVER, GameStatus.WIN);
      }
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
          : `YOU ARE ROCK!\nCLICK TO RESTART`
      )
        .setAlign("center")
        .setColor(status === GameStatus.LOSE ? "#ff0000" : "#ffffff");
      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4
      );

      this.input.on("pointerdown", () => {
        this.game.events.off(EventsName.GET_POTION, this.scorePoints);
        this.game.events.off(EventsName.DEFEAT_BAT, this.scorePoints);
        this.game.events.off(EventsName.GAMEOVER, this.gameEndHandler);
        this.scene.get("playGame").scene.restart();
        this.scene.restart();
      });
    };
  }

  create() {
    this.score = new Score(this, 20, 20, 0);

    this.initListeners();
  }

  initListeners() {
    this.game.events.on(
      EventsName.GET_POTION,
      () => {
        this.scorePoints(50);
      },
      this
    );
    this.game.events.on(
      EventsName.DEFEAT_BAT,
      () => {
        this.scorePoints(20);
      },
      this
    );
    this.game.events.once(EventsName.GAMEOVER, this.gameEndHandler, this);
  }
}

export default UIScene;
