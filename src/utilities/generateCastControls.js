import { InputMappings } from "../constants";
import generateKeyboardButton from "./generateKeyboardButton";

export default (scene, boxLeft, boxTop) => {
  let outputArray = [];

  const iconCircleBack = scene.add.graphics();
  iconCircleBack.lineStyle(6, 0xebc659);
  iconCircleBack.strokeCircle(boxLeft + 475, boxTop + 142, 18);
  iconCircleBack.setVisible(false);
  iconCircleBack.setDepth(10);
  outputArray.push(iconCircleBack);

  const castOuterBox = scene.add.graphics();
  castOuterBox.lineStyle(2, 0xebc659);
  castOuterBox.strokeRoundedRect(boxLeft + 470, boxTop + 140, 186, 85, 8);
  castOuterBox.setVisible(false);
  castOuterBox.setDepth(10);
  outputArray.push(castOuterBox);

  const headerBox = scene.add.graphics();
  headerBox.fillStyle(0x333333);
  headerBox.fillRoundedRect(boxLeft + 460, boxTop + 128, 100, 24, 8);
  headerBox.lineStyle(2, 0xebc659);
  headerBox.strokeRoundedRect(boxLeft + 460, boxTop + 128, 100, 24, 8);
  headerBox.setVisible(false);
  headerBox.setDepth(10);
  outputArray.push(headerBox);

  const iconCircle = scene.add.graphics();
  iconCircle.fillStyle(0xffffff);
  iconCircle.fillCircle(boxLeft + 475, boxTop + 142, 18);
  iconCircle.lineStyle(3, 0x333333);
  iconCircle.strokeCircle(boxLeft + 475, boxTop + 142, 18);
  iconCircle.setVisible(false);
  iconCircle.setDepth(10);
  outputArray.push(iconCircle);

  const castIcon = scene.add.image(boxLeft + 475, boxTop + 139, "icon-cast");
  castIcon.setScale(0.6);
  castIcon.setVisible(false);
  castIcon.setDepth(10);
  outputArray.push(castIcon);

  const castWord = scene.add.text(boxLeft + 505, boxTop + 133, `CAST`, {
    fontFamily: "Arial",
    fontSize: "14px",
  });
  castWord.setVisible(false);
  castWord.setDepth(10);
  outputArray.push(castWord);

  const plusSymbol = scene.add.text(boxLeft + 556, boxTop + 178, `+`, {
    fontFamily: "Arial",
    fontSize: "26px",
  });
  plusSymbol.setVisible(false);
  plusSymbol.setDepth(10);
  outputArray.push(plusSymbol);

  outputArray = outputArray.concat(
    generateKeyboardButton(
      scene,
      boxLeft + 500,
      boxTop + 163,
      InputMappings.DOWN,
      "regular"
    )
  );

  outputArray = outputArray.concat(
    generateKeyboardButton(
      scene,
      boxLeft + 580,
      boxTop + 163,
      InputMappings.JUMP,
      "regular"
    )
  );

  return outputArray;
};
