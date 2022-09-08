export default (scene, boxLeft, boxTop) => {
  const newMainGroup = new Phaser.GameObjects.Group(scene);

  // Main box
  const backdrop = scene.add.graphics();
  backdrop.fillStyle(0x000000, 0.7);
  backdrop.fillRect(0, 0, 800, 600);
  newMainGroup.add(backdrop);

  const backingBox = scene.add.graphics();
  backingBox.fillStyle(0x000000);
  backingBox.fillRoundedRect(boxLeft + 1, boxTop + 1, 749, 549, 8);
  backingBox.lineStyle(5, 0xeeeeee);
  backingBox.strokeRoundedRect(boxLeft, boxTop, 750, 550, 8);
  newMainGroup.add(backingBox);

  const headerBox = scene.add.graphics();
  headerBox.fillGradientStyle(
    0x1d2440,
    0x1d2440,
    0x1d2440,
    0x1d2440,
    1,
    1,
    0.6,
    0.6
  );
  headerBox.fillRect(boxLeft + 2, boxTop + 3, 745, 75);
  newMainGroup.add(headerBox);

  const header = scene.add.text(100, boxTop + 35, `--]||-  PAUSE  -||[--`, {
    fontSize: "18px",
  });
  header.setDepth(11);
  header.setPosition(
    scene.game.scale.width / 2 - header.width / 2,
    boxTop + 35
  );
  newMainGroup.add(header);

  return newMainGroup;
};
