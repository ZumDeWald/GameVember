export const createEnemyAnims = (animationManager) => {
  animationManager.create({
    key: "enemy_fly",
    frames: animationManager.generateFrameNames("bat", {
      prefix: "Bat_Fly",
      start: 1,
      end: 4,
    }),
    frameRate: 8,
    repeat: -1,
  });

  animationManager.create({
    key: "enemy_die",
    frames: [{ key: "bat", frame: "Bat_Fly1" }],
    frameRate: 1,
    repeat: -1,
  });

  animationManager.create({
    key: "bat_explode",
    frames: animationManager.generateFrameNames("bat-explode", {
      prefix: "explode",
      start: 1,
      end: 7,
    }),
    frameRate: 7,
    repeat: 2,
  });
};
