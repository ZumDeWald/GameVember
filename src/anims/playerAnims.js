export const createPlayerAnims = (animationManager) => {
  animationManager.create({
    key: "player_idle",
    frames: animationManager.generateFrameNames("player", {
      prefix: "idle",
      start: 1,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  animationManager.create({
    key: "player_run",
    frames: animationManager.generateFrameNames("player", {
      prefix: "run",
      start: 1,
      end: 6,
    }),
    frameRate: 8,
    repeat: -1,
  });

  animationManager.create({
    key: "player_jump",
    frames: animationManager.generateFrameNames("player", {
      prefix: "smrslt",
      start: 1,
      end: 4,
    }),
    frameRate: 8,
    repeat: -1,
  });

  animationManager.create({
    key: "player_atk",
    frames: animationManager.generateFrameNames("player", {
      prefix: "atk",
      start: 1,
      end: 11,
    }),
    frameRate: 16,
    repeat: 0,
  });
};
