export default (scene, boxLeft, boxTop) => {
  const newInventoryGroup = new Phaser.GameObjects.Group(scene);

  // Move To Controls Page
  const pageToControls = scene.add.text(
    boxLeft + 12,
    boxTop + 50,
    `<<< Controls`,
    {
      fontSize: "16px",
    }
  );
  newInventoryGroup.add(pageToControls);

  // Abilities
  const abilitiesFlourish = scene.add.text(
    boxLeft,
    boxTop + 100,
    `||||||||||`,
    {
      fontFamily: "Times",
      fontSize: "32px",
    }
  );
  abilitiesFlourish.setAlpha(0.5);
  newInventoryGroup.add(abilitiesFlourish);

  const abilitiesHeader = scene.add.text(
    boxLeft + 75,
    boxTop + 102,
    `Inventory`,
    {
      fontFamily: "Arial",
      fontSize: "24px",
    }
  );
  newInventoryGroup.add(abilitiesHeader);

  const pUp1Box = scene.add.graphics();
  pUp1Box.fillStyle(0x333333);
  pUp1Box.fillRoundedRect(boxLeft + 45, boxTop + 160, 60, 60, 8);
  pUp1Box.lineStyle(2, 0x545976);
  pUp1Box.strokeRoundedRect(boxLeft + 45, boxTop + 160, 60, 60, 8);
  newInventoryGroup.add(pUp1Box);

  const swordIcon = scene.add.image(boxLeft + 76, boxTop + 190, "icon-sword");
  swordIcon.angle = 45;
  newInventoryGroup.add(swordIcon);

  const pUp1Description = scene.add.text(
    boxLeft + 125,
    boxTop + 172,
    `You're not sure why you even have this sword ...\nbut somehow it comforts you like a familiar friend.`,
    {
      fontSize: "16px",
    }
  );
  newInventoryGroup.add(pUp1Description);

  const pUp2Box = scene.add.graphics();
  pUp2Box.fillStyle(0x333333);
  pUp2Box.fillRoundedRect(boxLeft + 45, boxTop + 240, 60, 60, 8);
  pUp2Box.lineStyle(2, 0x545976);
  pUp2Box.strokeRoundedRect(boxLeft + 45, boxTop + 240, 60, 60, 8);
  pUp2Box.setAlpha(0.5);
  pUp2Box.name = "pUp2Box";
  newInventoryGroup.add(pUp2Box);

  const pUp3Box = scene.add.graphics();
  pUp3Box.fillStyle(0x333333);
  pUp3Box.fillRoundedRect(boxLeft + 45, boxTop + 320, 60, 60, 8);
  pUp3Box.lineStyle(2, 0x545976);
  pUp3Box.strokeRoundedRect(boxLeft + 45, boxTop + 320, 60, 60, 8);
  pUp3Box.setAlpha(0.5);
  pUp3Box.name = "pUp3Box";
  newInventoryGroup.add(pUp3Box);

  // Health Powerups
  const healthPowerUpsHeaderFlourish = scene.add.text(
    boxLeft,
    boxTop + 410,
    `||||||||||`,
    {
      fontFamily: "Times",
      fontSize: "26px",
    }
  );
  healthPowerUpsHeaderFlourish.setAlpha(0.5);
  newInventoryGroup.add(healthPowerUpsHeaderFlourish);

  const healthPowerUpsHeader = scene.add.text(
    boxLeft + 60,
    boxTop + 413,
    `Health Vials`,
    {
      fontFamily: "Arial",
      fontSize: "18px",
    }
  );
  newInventoryGroup.add(healthPowerUpsHeader);

  const healthPowerUpsBox = scene.add.graphics();
  healthPowerUpsBox.fillStyle(0x333333);
  healthPowerUpsBox.fillRoundedRect(boxLeft + 50, boxTop + 455, 50, 50, 8);
  healthPowerUpsBox.lineStyle(2, 0x545976);
  healthPowerUpsBox.strokeRoundedRect(boxLeft + 50, boxTop + 455, 50, 50, 8);
  newInventoryGroup.add(healthPowerUpsBox);

  const healthPowerUp = scene.add.image(
    boxLeft + 75,
    boxTop + 480,
    "potions",
    "potion_red"
  );
  healthPowerUp.setScale(3);
  newInventoryGroup.add(healthPowerUp);

  const healthPowerUpTotal = scene.add.text(
    boxLeft + 125,
    boxTop + 470,
    `0 / 5`,
    {
      fontFamily: "Arial",
      fontSize: "18px",
    }
  );
  healthPowerUpTotal.name = "healthPowerUpTotal";
  newInventoryGroup.add(healthPowerUpTotal);

  scene.add.existing(newInventoryGroup);

  return newInventoryGroup;
};
