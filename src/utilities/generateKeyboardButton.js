export default (scene, baseX, baseY, keySymbol, size = "regular") => {
  switch (size.toLowerCase()) {
    case "small":
      return makeSmallButton(scene, baseX, baseY, keySymbol);
    case "space":
      return makeSpaceButton(scene, baseX, baseY, keySymbol);
    default:
      return makeRegularButton(scene, baseX, baseY, keySymbol);
  }
};

const settings = {
  inputFontSize: "26px",
  buttonWidth: 50,
  buttonHeight: 50,
  pauseButtonWidth: 300,
};

const makeSmallButton = (scene, x, y, key) => {
  const outputArray = [];

  // const buttonBoxShadow = scene.add.graphics();
  // buttonBoxShadow.fillStyle(0x777777);
  // buttonBoxShadow.fillRoundedRect(
  //   x - 3,
  //   y + 2,
  //   settings.buttonWidth / 2 + 2,
  //   settings.buttonHeight / 2 + 1,
  //   5
  // );
  // buttonBoxShadow.lineStyle(2, 0x545976);
  // buttonBoxShadow.strokeRoundedRect(
  //   x - 3,
  //   y + 2,
  //   settings.buttonWidth / 2 + 2,
  //   settings.buttonHeight / 2 + 1,
  //   5
  // );
  // // buttonBoxShadow.setVisible(false);
  // buttonBoxShadow.setDepth(12);
  // outputArray.push(buttonBoxShadow);

  const buttonBox = scene.add.graphics();
  buttonBox.fillStyle(0x333333);
  buttonBox.fillRoundedRect(
    x,
    y,
    settings.buttonWidth / 2,
    settings.buttonHeight / 2,
    5
  );
  buttonBox.lineStyle(2, 0xffffff);
  buttonBox.strokeRoundedRect(
    x,
    y,
    settings.buttonWidth / 2,
    settings.buttonHeight / 2,
    5
  );
  // buttonBox.setVisible(false);
  buttonBox.setDepth(12);
  outputArray.push(buttonBox);

  const buttonInput = scene.add.text(0, 0, key, {
    fontFamily: "Arial",
    fontSize: "12px",
  });
  buttonInput.setPosition(
    x + (settings.buttonWidth / 4 - buttonInput.width / 2),
    y + 6
  );
  // buttonInput.setVisible(false);
  buttonInput.setDepth(12);
  outputArray.push(buttonInput);

  return outputArray;
};

const makeRegularButton = (scene, x, y, key) => {
  const outputArray = [];

  const buttonBoxShadow = scene.add.graphics();
  buttonBoxShadow.fillStyle(0x777777);
  buttonBoxShadow.fillRoundedRect(
    x - 3,
    y + 2,
    settings.buttonWidth + 2,
    settings.buttonHeight + 1,
    8
  );
  buttonBoxShadow.lineStyle(2, 0x545976);
  buttonBoxShadow.strokeRoundedRect(
    x - 3,
    y + 2,
    settings.buttonWidth + 2,
    settings.buttonHeight + 1,
    8
  );
  buttonBoxShadow.setVisible(false);
  buttonBoxShadow.setDepth(12);
  outputArray.push(buttonBoxShadow);

  const buttonBox = scene.add.graphics();
  buttonBox.fillStyle(0x333333);
  buttonBox.fillRoundedRect(
    x,
    y,
    settings.buttonWidth,
    settings.buttonHeight,
    8
  );
  buttonBox.lineStyle(2, 0xffffff);
  buttonBox.strokeRoundedRect(
    x,
    y,
    settings.buttonWidth,
    settings.buttonHeight,
    8
  );
  buttonBox.setVisible(false);
  buttonBox.setDepth(12);
  outputArray.push(buttonBox);

  const buttonInput = scene.add.text(0, 0, key, {
    fontFamily: "Arial",
    fontSize: settings.inputFontSize,
  });
  buttonInput.setPosition(
    x + (settings.buttonWidth / 2 - buttonInput.width / 2),
    y + 10
  );
  buttonInput.setVisible(false);
  buttonInput.setDepth(12);
  outputArray.push(buttonInput);

  return outputArray;
};

const makeSpaceButton = (scene, x, y, key) => {
  const outputArray = [];
  return outputArray;
};
