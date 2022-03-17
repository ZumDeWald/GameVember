export const generateInputs = (scene) => {
  return {
    up: scene.input.keyboard.addKey("W"),
    down: scene.input.keyboard.addKey("S"),
    left: scene.input.keyboard.addKey("A"),
    right: scene.input.keyboard.addKey("D"),
    jump: scene.input.keyboard.addKey("K"),
    atk: scene.input.keyboard.addKey("L"),
    space: scene.input.keyboard.addKey("SPACE"),
  };
};
