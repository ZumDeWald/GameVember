import { InputMappings } from "../constants";
import generateKeyboardButton from "./generateKeyboardButton";

export default (scene, boxLeft, boxTop, fontSize) => {
  const onScreenControlsGroup = new Phaser.GameObjects.Group(scene);
  const passedFontSize = fontSize;

  const castSelectBackingBox = scene.add.graphics();
  castSelectBackingBox.fillStyle(0x000000);
  castSelectBackingBox.fillRoundedRect(boxLeft, boxTop, 300, 100, 8);
  castSelectBackingBox.lineStyle(2, 0x333333);
  castSelectBackingBox.strokeRoundedRect(boxLeft, boxTop, 300, 100, 8);
  castSelectBackingBox.setAlpha(0.8);
  onScreenControlsGroup.add(castSelectBackingBox);

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 45,
      boxTop + 12,
      InputMappings.UP,
      "small"
    ),
    true
  );

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 45,
      boxTop + 44,
      InputMappings.DOWN,
      "small"
    ),
    true
  );

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 15,
      boxTop + 44,
      InputMappings.LEFT,
      "small"
    ),
    true
  );

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 75,
      boxTop + 44,
      InputMappings.RIGHT,
      "small"
    ),
    true
  );

  const selectText = scene.add.text(
    boxLeft + 40,
    boxTop + 62,
    `
Move`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenControlsGroup.add(selectText);

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 144,
      boxTop + 44,
      InputMappings.JUMP,
      "small"
    ),
    true
  );

  const cancelText = scene.add.text(
    boxLeft + 132,
    boxTop + 62,
    `
Rotate`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenControlsGroup.add(cancelText);

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 218,
      boxTop + 44,
      InputMappings.DOWN,
      "small"
    ),
    true
  );

  const plusSymbol = scene.add.text(boxLeft + 247, boxTop + 47, `+`, {
    fontFamily: "Arial",
    fontSize: "18px",
  });

  plusSymbol.setDepth(8);
  onScreenControlsGroup.add(plusSymbol);

  onScreenControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 261,
      boxTop + 44,
      InputMappings.JUMP,
      "small"
    ),
    true
  );

  const castIntoText = scene.add.text(
    boxLeft + 234,
    boxTop + 62,
    `
Exit`,
    {
      fontSize: passedFontSize,
    }
  );
  onScreenControlsGroup.add(castIntoText);

  return onScreenControlsGroup;
};
