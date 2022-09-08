import { InputMappings } from "../constants";
import generateKeyboardButton from "./generateKeyboardButton";

export default (scene, boxLeft, boxTop) => {
  const newControlsGroup = new Phaser.GameObjects.Group(scene);

  const settings = {
    descriptionFontSize: "16px",
    inputFontSize: "26px",
    buttonWidth: 50,
    buttonHeight: 50,
    pauseButtonWidth: 300,
  };

  // Move To Inventory Page
  const pageToInventory = scene.add.text(640, boxTop + 50, `Inventory >>>`, {
    fontSize: "16px",
  });
  newControlsGroup.add(pageToInventory);

  // Controls
  const controlsFlourish = scene.add.text(boxLeft, boxTop + 100, `||||||||||`, {
    fontFamily: "Times",
    fontSize: "32px",
  });
  controlsFlourish.setAlpha(0.5);
  newControlsGroup.add(controlsFlourish);

  const controlsHeader = scene.add.text(
    boxLeft + 75,
    boxTop + 102,
    `Controls`,
    {
      fontFamily: "Arial",
      fontSize: "24px",
    }
  );
  newControlsGroup.add(controlsHeader);

  // UP
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 175,
      boxTop + 250,
      InputMappings.UP,
      "regular"
    ),
    true
  );

  const upIcon = scene.add.image(boxLeft + 200, boxTop + 205, "arrow-up");
  upIcon.setScale(0.55);
  newControlsGroup.add(upIcon);

  const upWord = scene.add.text(boxLeft + 190, boxTop + 220, `UP`, {
    fontFamily: "Arial",
    fontSize: settings.descriptionFontSize,
  });
  newControlsGroup.add(upWord);

  // DOWN
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 175,
      boxTop + 320,
      InputMappings.DOWN,
      "regular"
    ),
    true
  );

  const downIcon = scene.add.image(boxLeft + 202, boxTop + 418, "arrow-down");
  downIcon.setScale(0.55);
  newControlsGroup.add(downIcon);

  const downWord = scene.add.text(boxLeft + 176, boxTop + 385, `DOWN`, {
    fontFamily: "Arial",
    fontSize: settings.descriptionFontSize,
  });
  newControlsGroup.add(downWord);

  // LEFT
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 105,
      boxTop + 320,
      InputMappings.LEFT,
      "regular"
    ),
    true
  );

  const leftIcon = scene.add.image(boxLeft + 70, boxTop + 335, "arrow-left");
  leftIcon.setScale(0.55);
  newControlsGroup.add(leftIcon);

  const leftWord = scene.add.text(boxLeft + 50, boxTop + 350, `LEFT`, {
    fontFamily: "Arial",
    fontSize: settings.descriptionFontSize,
  });
  newControlsGroup.add(leftWord);

  // RIGHT
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 245,
      boxTop + 320,
      InputMappings.RIGHT,
      "regular"
    ),
    true
  );

  const rightIcon = scene.add.image(boxLeft + 335, boxTop + 335, "arrow-right");
  rightIcon.setScale(0.55);
  newControlsGroup.add(rightIcon);

  const rightWord = scene.add.text(boxLeft + 312, boxTop + 350, `RIGHT`, {
    fontFamily: "Arial",
    fontSize: settings.descriptionFontSize,
  });
  newControlsGroup.add(rightWord);

  // JUMP
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 500,
      boxTop + 320,
      InputMappings.JUMP,
      "regular"
    ),
    true
  );

  const jumpIcon = scene.add.image(boxLeft + 524, boxTop + 273, "arrow-jump");
  jumpIcon.setScale(0.6);
  newControlsGroup.add(jumpIcon);

  const jumpWord = scene.add.text(boxLeft + 504, boxTop + 292, `JUMP`, {
    fontFamily: "Arial",
    fontSize: settings.descriptionFontSize,
  });
  newControlsGroup.add(jumpWord);

  // ATTACK
  newControlsGroup.addMultiple(
    generateKeyboardButton(
      scene,
      boxLeft + 580,
      boxTop + 320,
      InputMappings.ATK,
      "regular"
    ),
    true
  );

  const atkIcon = scene.add.image(boxLeft + 606, boxTop + 270, "icon-sword");
  atkIcon.setScale(0.6);
  newControlsGroup.add(atkIcon);

  const atkWord = scene.add.text(boxLeft + 580, boxTop + 294, `ATTACK`, {
    fontFamily: "Arial",
    fontSize: "14px",
  });
  newControlsGroup.add(atkWord);

  // PAUSE
  const pauseBoxShadow = scene.add.graphics();
  pauseBoxShadow.fillStyle(0x777777);
  pauseBoxShadow.fillRoundedRect(
    boxLeft + 227,
    boxTop + 468,
    settings.pauseButtonWidth + 2,
    settings.buttonHeight + 1,
    8
  );
  pauseBoxShadow.lineStyle(2, 0x545976);
  pauseBoxShadow.strokeRoundedRect(
    boxLeft + 227,
    boxTop + 468,
    settings.pauseButtonWidth + 2,
    settings.buttonHeight + 1,
    8
  );
  newControlsGroup.add(pauseBoxShadow);

  const pauseBox = scene.add.graphics();
  pauseBox.fillStyle(0x333333);
  pauseBox.fillRoundedRect(
    boxLeft + 230,
    boxTop + 465,
    settings.pauseButtonWidth,
    settings.buttonHeight,
    8
  );
  pauseBox.lineStyle(2, 0xffffff);
  pauseBox.strokeRoundedRect(
    boxLeft + 230,
    boxTop + 465,
    settings.pauseButtonWidth,
    settings.buttonHeight,
    8
  );
  newControlsGroup.add(pauseBox);

  const pauseInput = scene.add.text(
    boxLeft + 335,
    boxTop + 475,
    `${InputMappings.PAUSE}`,
    {
      fontFamily: "Arial",
      fontSize: settings.inputFontSize,
    }
  );
  newControlsGroup.add(pauseInput);

  const pauseIcon = scene.add.image(boxLeft + 350, boxTop + 445, "icon-pause");
  pauseIcon.setScale(0.55);
  newControlsGroup.add(pauseIcon);

  const pauseWord = scene.add.text(boxLeft + 365, boxTop + 440, `PAUSE`, {
    fontFamily: "Arial",
    fontSize: "14px",
  });
  newControlsGroup.add(pauseWord);

  return newControlsGroup;
};
