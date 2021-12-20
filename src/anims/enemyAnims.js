export const createEnemyAnims = (animationManager) => {
  animationManager.create({
    key: "fly",
    frames: animationManager.generateFrameNames("bat", {
      prefix: "Bat_Fly",
      start: 1,
      end: 4,
    }),
    frameRate: 8,
    repeat: -1,
  });
};
