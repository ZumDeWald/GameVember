import { CustomText } from "./CustomText.js";
import { ScoreOperations } from "../constants.js";

export class Score extends CustomText {
  constructor(scene, x, y, initScore = 0) {
    super(scene, x, y, `Score: ${initScore}`);

    scene.add.existing(this);

    this.scoreValue = initScore;
  }

  changeValue(operation, value) {
    switch (operation) {
      case ScoreOperations.INCREASE:
        this.scoreValue += value;
        break;
      case ScoreOperations.DECREASE:
        this.scoreValue -= value;
        break;
      case ScoreOperations.SET_VALUE:
        this.scoreValue = value;
        break;
      default:
        break;
    }
    this.setText(`Score: ${this.scoreValue}`);
  }

  getValue() {
    return this.scoreValue;
  }
}
