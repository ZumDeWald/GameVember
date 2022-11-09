import { EventsName, InputMappings } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class DialogBox extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.conversation = [];
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 400,
      boxLeft: 50,
      conversationPosition: 0,
      dialogActive: false,
      animationCounter: 0,
      inputTimeout: 0,
      callingScene: null,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x333333);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      699,
      150,
      8
    );
    this.backingBox.lineStyle(3, 0xffffff);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      700,
      151,
      8
    );
    this.backingBox.setDepth(10);
    this.add(this.backingBox);

    // Character picture box
    this.insetBox = this.scene.add.graphics();
    this.insetBox.fillStyle(0x333333);
    this.insetBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      149,
      150,
      8
    );
    this.insetBox.lineStyle(3, 0xffffff);
    this.insetBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      150,
      151,
      8
    );
    this.insetBox.setDepth(10);
    this.add(this.insetBox);

    this.text = this.scene.make.text(
      {
        x: this.settings.boxLeft + 175,
        y: this.settings.boxTop + 25,
        text: "",
        style: {
          wordWrap: {
            width: 490,
          },
        },
      },
      true
    );
    this.text.setDepth(11);
    this.add(this.text);

    const nextCircleShadow = this.scene.add.graphics();
    nextCircleShadow.fillStyle(0x111111);
    nextCircleShadow.fillCircle(
      this.settings.boxLeft + 660,
      this.settings.boxTop + 120,
      20
    );

    const nextCircle = this.scene.add.graphics();
    nextCircle.fillStyle(0x000000);
    nextCircle.fillCircle(
      this.settings.boxLeft + 660,
      this.settings.boxTop + 120,
      16
    );
    nextCircle.lineStyle(2, 0xffffff);
    nextCircle.strokeCircle(
      this.settings.boxLeft + 660,
      this.settings.boxTop + 120,
      16
    );

    this.next = this.scene.add.group([
      nextCircleShadow,
      nextCircle,
      this.scene.make.text(
        {
          x: this.settings.boxLeft + 656,
          y: this.settings.boxTop + 112,
          text: `${InputMappings.ATK}`,
        },
        true
      ),
    ]);
    this.next.setDepth(11);
    this.next.setVisible(false);
    this.add(this.next);

    this.scene.add.existing(this);

    sceneEvents.on(
      EventsName.OPEN_DIALOG,
      (conversation) => {
        this.text.text = "";
        this.conversation = conversation;
        this.setVisible(true);
        this.next.setVisible(false);
        this.settings.dialogActive = true;
        this.addText(conversation[0].content);
      },
      this
    );

    this.setVisible(false);
  }

  addText(newText) {
    this.settings.animationCounter = 0;
    this.dialog = newText.split("");
    this.dialogLength = this.dialog.length;
    if (this.animationSequence) this.animationSequence.remove();

    this.text.setText("");
    this.next.setVisible(false);

    this.animationSequence = this.scene.time.addEvent({
      delay: 15,
      callback: this.animateText,
      callbackScope: this,
      loop: true,
    });
  }

  animateText() {
    this.text.setText(
      this.text.text + this.dialog[this.settings.animationCounter]
    );
    this.settings.animationCounter += 1;
    if (this.settings.animationCounter >= this.dialogLength) {
      this.animationSequence.remove();
      this.scene.time.delayedCall(
        400,
        () => {
          this.settings.inputTimeout = 0;
          this.next.setVisible(true);
        },
        null,
        this.scene
      );
    }
  }

  handleCloseDialog() {
    this.next.setVisible(false);
    this.setVisible(false);
    this.settings.dialogActive = false;
    this.settings.conversationPosition = 0;
    this.text.text = "";
    if (this.animationSequence) this.animationSequence.remove();
    sceneEvents.emit(EventsName.RESUME_GAME);
  }

  handleNextDialog() {
    this.next.setVisible(false);
    if (this.conversation[this.settings.conversationPosition].endOfConvo) {
      this.handleCloseDialog();
      return;
    }

    this.settings.conversationPosition += 1;
    this.settings.inputTimeout = 10;

    this.addText(this.conversation[this.settings.conversationPosition].content);
  }

  preUpdate() {
    if (
      this.settings.dialogActive &&
      this.inputs.atk.isDown &&
      this.settings.inputTimeout == 0
    ) {
      this.handleNextDialog();
    }
  }
}
