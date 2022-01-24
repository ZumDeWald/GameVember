export const createPlayerAnims = (animationManager) => {
  animationManager.create({
    key: "player_idle",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_idle_",
      start: 0,
      end: 3,
    }),
    frameRate: 4,
    repeat: -1,
  });

  animationManager.create({
    key: "player_run",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_run_",
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  animationManager.create({
    key: "player_jump",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_smrslt_",
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: -1,
  });

  animationManager.create({
    key: "player_atk",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_atk_",
      start: 0,
      end: 3,
    }),
    frameRate: 12,
    repeat: 0,
  });

  animationManager.create({
    key: "player_air_atk",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_air_atk_",
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: 0,
  });

  animationManager.create({
    key: "player_die",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_die_",
      start: 0,
      end: 3,
    }),
    frameRate: 6,
    repeat: 0,
  });

  animationManager.create({
    key: "player_fall",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_fall_",
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  animationManager.create({
    key: "player_slide",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_slide_",
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  animationManager.create({
    key: "player_wall_slide",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_wall_slide_",
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  animationManager.create({
    key: "player_cast",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_cast_",
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: 0,
  });

  animationManager.create({
    key: "player_cast_loop",
    frames: animationManager.generateFrameNames("player", {
      prefix: "player_cast_loop_",
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: 0,
  });
};
