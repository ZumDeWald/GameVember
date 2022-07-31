import { sceneEvents } from "../events/EventsCenter";
import { EventsName } from "../constants";

export default class InfoCenter extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 510,
      boxLeft: 22,
      inputTimeout: 0,
      collectedPowerUps: [],
      controlsWithCast: ` 
  A     W     D     S + K
      
  K     L     SPACE`,
    };

    // Health Powerups
    this.healthPowerUpsBox = this.scene.add.graphics();
    this.healthPowerUpsBox.fillStyle(0x000000);
    this.healthPowerUpsBox.fillRoundedRect(
      this.settings.boxLeft + 12,
      this.settings.boxTop - 24,
      147,
      40,
      8
    );
    this.healthPowerUpsBox.lineStyle(2, 0x545976);
    this.healthPowerUpsBox.strokeRoundedRect(
      this.settings.boxLeft + 11,
      this.settings.boxTop - 25,
      148,
      40,
      8
    );
    this.add(this.healthPowerUpsBox);

    this.healthPowerUps = this.scene.add.group({
      classType: Phaser.GameObjects.Image,
    });

    this.healthPowerUps.createMultiple({
      key: "potions",
      frame: "potion_red",
      setXY: {
        x: this.settings.boxLeft + 34,
        y: this.settings.boxTop - 10,
        stepX: 25,
      },
      quantity: 5,
      setScale: { x: 1.8, y: 1.8 },
      setAlpha: { value: 0.6 },
    });
    this.healthPowerUps.setDepth(5);
    this.add(this.healthPowerUps);

    // Cling & Cast Powerups
    this.powerUpsBox = this.scene.add.graphics();
    this.powerUpsBox.fillStyle(0x000000);
    this.powerUpsBox.fillRoundedRect(
      this.settings.boxLeft + 181,
      this.settings.boxTop - 24,
      74,
      40,
      8
    );
    this.powerUpsBox.lineStyle(2, 0x545976);
    this.powerUpsBox.strokeRoundedRect(
      this.settings.boxLeft + 180,
      this.settings.boxTop - 25,
      75,
      40,
      8
    );
    this.add(this.powerUpsBox);

    this.clingIcon = this.scene.add.image(
      this.settings.boxLeft + 202,
      this.settings.boxTop - 10,
      "potions",
      "potion_purple"
    );
    this.clingIcon.setScale(1.8);
    this.clingIcon.setAlpha(0.4);
    this.add(this.clingIcon);

    this.castIcon = this.scene.add.image(
      this.settings.boxLeft + 234,
      this.settings.boxTop - 10,
      "potions",
      "potion_white"
    );
    this.castIcon.setScale(1.8);
    this.castIcon.setAlpha(0.4);
    this.add(this.castIcon);

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
      this.scene.add.image(
        this.settings.boxLeft + 80,
        this.settings.boxTop + 58,
        "icon-sword"
      ),
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
      EventsName.GET_POTION,
      (indexOfItem) => {
        this.settings.collectedPowerUps.push(indexOfItem);
        this.healthPowerUps.children.each((pu, i) => {
          if (this.settings.collectedPowerUps.includes(i)) {
            pu.setAlpha(1);
            this.tweenIcon(pu);
          }
        });
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_TELE,
      () => {
        this.activateCast();
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        this.activateCling();
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
    this.castIcon.setAlpha(1);
    this.tweenIcon(this.castIcon);

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

  activateCling() {
    this.clingIcon.setAlpha(1);
    this.tweenIcon(this.clingIcon);
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

  tweenIcon(icon) {
    this.scene.tweens.add({
      targets: [icon],
      duration: 100,
      repeat: 1,
      repeatDelay: 50,
      yoyo: true,
      alpha: 0.3,
      onComplete: () => {
        icon.setAlpha(1);
      },
    });
  }

  preUpdate() {}
}
