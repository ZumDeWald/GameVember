import { sceneEvents } from "../events/EventsCenter";
import { EventsName } from "../constants";
import generateOnScreenCastControls from "../utilities/generateOnScreenCastControls";
import generateOnScreenCastSelect from "../utilities/generateOnScreenCastSelect";

export default class OnScreenControls extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.settings = {
      boxTop: 448,
      boxLeft: 250,
      fontSize: "14px",
    };

    // Menu Info Box
    this.menuInfoBackingBox = this.scene.add.graphics();
    this.menuInfoBackingBox.fillStyle(0xffffff);
    this.menuInfoBackingBox.fillRoundedRect(
      this.settings.boxLeft + 38,
      this.settings.boxTop + 115,
      225,
      28,
      8
    );
    this.menuInfoBackingBox.lineStyle(2, 0x000000);
    this.menuInfoBackingBox.strokeRoundedRect(
      this.settings.boxLeft + 38,
      this.settings.boxTop + 115,
      225,
      28,
      8
    );
    this.menuInfoBackingBox.setAlpha(0.7);
    this.add(this.menuInfoBackingBox);

    this.menuInstruction = this.scene.add.text(
      0,
      0,
      `
[ MENU ] - Spacebar`,
      {
        color: "black",
      }
    );
    this.menuInstruction.setPosition(
      this.scene.game.scale.width / 2 - this.menuInstruction.width / 2,
      552
    );
    this.add(this.menuInstruction);

    // On Screen Controls Groups
    this.castSelectControlsGroup = generateOnScreenCastSelect(
      this.scene,
      this.settings.boxLeft,
      this.settings.boxTop,
      this.settings.fontSize
    );
    this.castSelectControlsGroup.setVisible(false);
    this.castSelectControlsGroup.setDepth(8);

    this.castControlsGroup = generateOnScreenCastControls(
      this.scene,
      this.settings.boxLeft,
      this.settings.boxTop,
      this.settings.fontSize
    );
    this.castControlsGroup.setVisible(false);
    this.castControlsGroup.setDepth(8);

    sceneEvents.on(
      EventsName.CAST_START,
      () => {
        this.castSelectControlsGroup.setVisible(true);
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_SELECT,
      () => {
        this.castSelectControlsGroup.setVisible(false);
        this.castControlsGroup.setVisible(true);
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_END,
      () => {
        this.castSelectControlsGroup.setVisible(false);
        this.castControlsGroup.setVisible(false);
      },
      this
    );
  }
}
