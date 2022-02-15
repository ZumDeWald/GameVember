export const createObjectAnims = (animationManager) => {
  animationManager.create({
    key: "switch_on",
    frames: animationManager.generateFrameNames("switches", {
      prefix: "SwitchOn",
      start: 1,
      end: 4,
    }),
    frameRate: 16,
    yoyo: true,
    repeat: 1,
  });

  animationManager.create({
    key: "switch_off",
    frames: animationManager.generateFrameNames("switches", {
      prefix: "SwitchOff",
      start: 4,
      end: 1,
    }),
    frameRate: 4,
    yoyo: true,
    repeat: -1,
    repeatDelay: 500,
  });
};
