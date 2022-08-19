import { sceneEvents } from "../events/EventsCenter";
import { EventsName } from "../constants";

export default class InfoCenter extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 510,
      boxLeft: 22,
      controlsWithCast: ` 
  A     W     D     S + K
      
  K     L     SPACE`,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x000000);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft - 1,
      this.settings.boxTop + 3,
      280,
      80,
      8
    );
    this.backingBox.lineStyle(2, 0x545976);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft - 1,
      this.settings.boxTop + 3,
      280,
      80,
      8
    );
    this.add(this.backingBox);

    // Controls
    this.controlsTut = this.scene.add.text(
      this.settings.boxLeft + 15,
      this.settings.boxTop,
      `
  A     W     D

  K     L     SPACE`
    );
    this.add(this.controlsTut);

    this.mainControlIconGroup = this.scene.add.group([
      this.scene.add.image(
        this.settings.boxLeft + 20,
        this.settings.boxTop + 24,
        "arrow-left"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 20,
        this.settings.boxTop + 58,
        "arrow-jump"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 80,
        this.settings.boxTop + 24,
        "arrow-up"
      ),
      (this.swordIcon = this.scene.add.image(
        this.settings.boxLeft + 80,
        this.settings.boxTop + 58,
        "icon-sword"
      )),
      this.scene.add.image(
        this.settings.boxLeft + 134,
        this.settings.boxTop + 24,
        "arrow-right"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 134,
        this.settings.boxTop + 58,
        "icon-pause"
      ),
    ]);
    this.mainControlIconGroup.setDepth(5);
    this.mainControlIconGroup.scaleXY(-0.5);

    this.castSelectIconGroup = this.scene.add.group([
      this.scene.add.image(
        this.settings.boxLeft + 20,
        this.settings.boxTop + 24,
        "arrow-left"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 80,
        this.settings.boxTop + 24,
        "arrow-right"
      ),
    ]);
    this.castSelectIconGroup.setDepth(5);
    this.castSelectIconGroup.scaleXY(-0.5);
    this.castSelectIconGroup.setVisible(false);

    this.castControlIconGroup = this.scene.add.group([
      this.scene.add.image(
        this.settings.boxLeft + 20,
        this.settings.boxTop + 24,
        "arrow-left"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 80,
        this.settings.boxTop + 24,
        "arrow-up"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 134,
        this.settings.boxTop + 24,
        "arrow-right"
      ),
      this.scene.add.image(
        this.settings.boxLeft + 190,
        this.settings.boxTop + 24,
        "arrow-down"
      ),
    ]);
    this.castControlIconGroup.setDepth(5);
    this.castControlIconGroup.scaleXY(-0.5);
    this.castControlIconGroup.setVisible(false);

    sceneEvents.on(
      EventsName.GET_TELE,
      () => {
        this.activateCast();
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_START,
      () => {
        this.setControlsCastSelect();
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_SELECT,
      () => {
        this.setControlsCastActive();
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_END,
      () => {
        this.setControlsCastEnd();
      },
      this
    );

    this.setDepth(5);
    this.scene.add.existing(this);
  }

  activateCast() {
    this.scene.time.delayedCall(1500, () => {
      this.controlsTut.text = this.settings.controlsWithCast;

      const addedCastIcon = this.scene.add.image(
        this.settings.boxLeft + 190,
        this.settings.boxTop + 24,
        "icon-cast"
      );
      addedCastIcon.setScale(0.5);
      addedCastIcon.setDepth(5);

      this.mainControlIconGroup.add(addedCastIcon, true);
      this.tweenControls();
    });
  }

  setControlsCastSelect() {
    this.controlsTut.text = ` 
  A     D    
  
x K   ✓ L`;
    this.tweenControls();
    this.mainControlIconGroup.setVisible(false);
    this.castSelectIconGroup.setVisible(true);
  }

  setControlsCastActive() {
    this.controlsTut.text = ` 
  A     W     D     S

↻ K   𐄂 S + K`;
    this.tweenControls();
    this.castSelectIconGroup.setVisible(false);
    this.castControlIconGroup.setVisible(true);
  }

  setControlsCastEnd() {
    this.controlsTut.text = this.settings.controlsWithCast;
    this.tweenControls();
    this.castControlIconGroup.setVisible(false);
    this.castSelectIconGroup.setVisible(false);
    this.mainControlIconGroup.setVisible(true);
  }

  tweenControls() {
    this.scene.tweens.add({
      targets: [this.controlsTut],
      duration: 100,
      repeat: 1,
      repeatDelay: 50,
      yoyo: true,
      alpha: 0.3,
      onComplete: () => {
        this.controlsTut.setAlpha(1);
      },
    });
  }
}
