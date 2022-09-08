import { InputMappings } from "../constants";
import generateKeyboardButton from "./generateKeyboardButton";

export default (scene, boxLeft, boxTop, fontSize) => {
  const onScreenSelectControls = new Phaser.GameObjects.Group(scene);
  const passedFontSize = fontSize;

  const castSelectBackingBox = scene.add.graphics();
  castSelectBackingBox.fillStyle(0x000000);
  castSelectBackingBox.fillRoundedRect(boxLeft, boxTop + 10, 300, 90, 8);
  castSelectBackingBox.lineStyle(2, 0x333333);
  castSelectBackingBox.strokeRoundedRect(boxLeft, boxTop + 10, 300, 90, 8);
  castSelectBackingBox.setAlpha(0.8);
  onScreenSelectControls.add(castSelectBackingBox);

  onScreenSelectControls.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 32,
      boxTop + 35,
      InputMappings.LEFT,
      "small"
    ),
    true
  );

  onScreenSelectControls.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 74,
      boxTop + 35,
      InputMappings.RIGHT,
      "small"
    ),
    true
  );

  const selectText = scene.add.text(
    boxLeft + 8,
    boxTop + 55,
    `
    Select`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenSelectControls.add(selectText);

  onScreenSelectControls.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 160,
      boxTop + 35,
      InputMappings.JUMP,
      "small"
    ),
    true
  );

  const cancelText = scene.add.text(
    boxLeft + 115,
    boxTop + 55,
    `
    Cancel`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenSelectControls.add(cancelText);

  onScreenSelectControls.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 242,
      boxTop + 35,
      InputMappings.ATK,
      "small"
    ),
    true
  );

  const castIntoText = scene.add.text(
    boxLeft + 205,
    boxTop + 55,
    `
    Cast`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenSelectControls.add(castIntoText);

  return onScreenSelectControls;
};
