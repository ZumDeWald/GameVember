import { sceneEvents } from "../events/EventsCenter";
import { EventsName } from "../constants";

export default class InfoCenter extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 510,
      boxLeft: 25,
      inputTimeout: 0,
      collectedPowerUps: [],
      controlsWithCast: ` 
⬅️ A   ⬆️ W   ➡️ D   ✨ S + K
      
🆙 K   🗡 L   ⏸ SPACE`,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x000000);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      324,
      79,
      8
    );
    this.backingBox.lineStyle(2, 0x545976);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      325,
      80,
      8
    );
    this.add(this.backingBox);

    // Controls
    this.controlsTut = this.scene.add.text(
      this.settings.boxLeft + 15,
      this.settings.boxTop,
      `
⬅️ A   ⬆️ W   ➡️ D

🆙 K   🗡 L   ⏸ SPACE`
    );
    this.add(this.controlsTut);

    // Health Powerups
    this.healthPowerUpsBox = this.scene.add.graphics();
    this.healthPowerUpsBox.fillStyle(0x000000);
    this.healthPowerUpsBox.fillRoundedRect(
      this.settings.boxLeft + 593,
      this.settings.boxTop - 24,
      147,
      105,
      8
    );
    this.healthPowerUpsBox.lineStyle(2, 0x545976);
    this.healthPowerUpsBox.strokeRoundedRect(
      this.settings.boxLeft + 592,
      this.settings.boxTop - 25,
      148,
      106,
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
        x: this.settings.boxLeft + 616,
        y: this.settings.boxTop - 10,
        stepX: 25,
      },
      quantity: 5,
      setScale: { x: 1.8, y: 1.8 },
      setAlpha: { value: 0.6 },
    });
    this.healthPowerUps.setDepth(7);
    this.add(this.healthPowerUps);

    // Cling & Cast Powerups
    this.powerUpsBox = this.scene.add.graphics();
    this.powerUpsBox.fillStyle(0x000000);
    this.powerUpsBox.fillRoundedRect(
      this.settings.boxLeft + 586,
      this.settings.boxTop + 6,
      161,
      75,
      8
    );
    this.powerUpsBox.lineStyle(2, 0x545976);
    this.powerUpsBox.strokeRoundedRect(
      this.settings.boxLeft + 585,
      this.settings.boxTop + 5,
      162,
      76,
      8
    );
    this.add(this.powerUpsBox);

    this.clingIcon = this.scene.add.image(
      this.settings.boxLeft + 605,
      this.settings.boxTop + 28,
      "potions",
      "potion_purple"
    );
    this.clingIcon.setScale(1.8);
    this.clingIcon.setAlpha(0.4);
    this.add(this.clingIcon);

    this.castIcon = this.scene.add.image(
      this.settings.boxLeft + 605,
      this.settings.boxTop + 56,
      "potions",
      "potion_white"
    );
    this.castIcon.setScale(1.8);
    this.castIcon.setAlpha(0.4);
    this.add(this.castIcon);

    this.clingName = this.scene.add.text(
      this.settings.boxLeft + 619,
      this.settings.boxTop + 20,
      `-   ???`,
      {
        color: "#ddd",
      }
    );
    this.add(this.clingName);

    this.castName = this.scene.add.text(
      this.settings.boxLeft + 619,
      this.settings.boxTop + 48,
      `-   ???`,
      {
        color: "#ddd",
      }
    );
    this.add(this.castName);

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
    this.castName.text = `- Cast`;
    this.castName.style.color = "#fff";
    this.castIcon.setAlpha(1);
    this.tweenIcon(this.castIcon);
    this.controlsTut.text = this.settings.controlsWithCast;
    this.tweenControls();
  }

  activateCling() {
    this.clingName.text = `- Wall Cling`;
    this.clingName.style.color = "#fff";
    this.clingIcon.setAlpha(1);
    this.tweenIcon(this.clingIcon);
  }

  setControlsCastSelect() {
    this.controlsTut.text = ` 
    ⬅️ A    ➡️ D    
    
    ✓ L   𐄂 K`;
    this.tweenControls();
  }

  setControlsCastActive() {
    this.controlsTut.text = ` 
    ⬅️ A   ⬆️ W   ➡️ D   ⬇️ S
    
    🔄 K   𐄂 S + K`;
    this.tweenControls();
  }

  setControlsCastEnd() {
    this.controlsTut.text = this.settings.controlsWithCast;
    this.tweenControls();
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
