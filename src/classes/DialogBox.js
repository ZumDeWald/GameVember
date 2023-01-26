import { DialogSettings, EventsName, InputMappings } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";
import generateKeyboardButton from "../utilities/generateKeyboardButton.js";

export default class DialogBox extends Phaser.GameObjects.Group {
  constructor(scene, inputsFromScene) {
    super(scene);
    this.conversation = [];
    this.inputs = inputsFromScene;

    this.settings = {
      boxTop: 400,
      boxLeft: 190,
      conversationPosition: 0,
      dialogActive: false,
      animationCounter: 0,
      inputTimeout: 0,
      callingScene: null,
    };

    // Main box
    this.backingBox = this.scene.add.graphics();
    this.backingBox.fillStyle(0x000000, 0.7);
    this.backingBox.fillRoundedRect(
      this.settings.boxLeft + 1,
      this.settings.boxTop + 1,
      499,
      120,
      8
    );
    this.backingBox.lineStyle(3, 0xffffff);
    this.backingBox.strokeRoundedRect(
      this.settings.boxLeft,
      this.settings.boxTop,
      500,
      121,
      8
    );
    this.backingBox.setDepth(10);
    this.add(this.backingBox);

    // Character picture box
    this.insetBox = this.scene.add.graphics();
    this.insetBox.fillStyle(0x222222);
    this.insetBox.fillRoundedRect(
      this.settings.boxLeft - 24,
      this.settings.boxTop - 29,
      49,
      50,
      8
    );
    this.insetBox.lineStyle(3, 0xffffff);
    this.insetBox.strokeRoundedRect(
      this.settings.boxLeft - 25,
      this.settings.boxTop - 30,
      50,
      51,
      8
    );
    this.insetBox.setDepth(10);
    this.add(this.insetBox);

    this.playerDialogPic = this.scene.add.image(
      this.settings.boxLeft,
      this.settings.boxTop - 3,
      DialogSettings.PLAYER
    );
    this.playerDialogPic.setDepth(12);
    this.playerDialogPic.setVisible(false);

    this.computronDialogPic = this.scene.add.image(
      this.settings.boxLeft,
      this.settings.boxTop - 3,
      DialogSettings.COMPUTRON
    );
    this.computronDialogPic.setDepth(15);
    this.computronDialogPic.setVisible(false);

    this.text = this.scene.make.text(
      {
        x: this.settings.boxLeft + 35,
        y: this.settings.boxTop + 15,
        text: "",
        style: {
          wordWrap: {
            width: 456,
          },
        },
      },
      true
    );
    this.text.setDepth(11);
    this.add(this.text);

    this.next = this.scene.add.group(
      generateKeyboardButton(
        this.scene,
        this.settings.boxLeft + 452,
        this.settings.boxTop + 82,
        `${InputMappings.ATK}`,
        "small"
      )
    );
    this.next.setDepth(11);
    this.next.setVisible(false);

    this.addMultiple(this.next);

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
    this.handleShowDialogPic(
      this.conversation[this.settings.conversationPosition].speaker
    );
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
    if (this.dialog[this.settings.animationCounter] !== undefined) {
      this.text.setText(
        this.text.text + this.dialog[this.settings.animationCounter]
      );
    }
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
    this.handleShowDialogPic("CLEAR");
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

  handleShowDialogPic(desiredPic) {
    switch (desiredPic) {
      case DialogSettings.PLAYER:
        this.computronDialogPic.setVisible(false);
        this.playerDialogPic.setVisible(true);
        break;

      case DialogSettings.COMPUTRON:
        this.playerDialogPic.setVisible(false);
        this.computronDialogPic.setVisible(true);
        break;

      case "CLEAR":
      default:
        this.playerDialogPic.setVisible(false);
        this.computronDialogPic.setVisible(false);
        break;
    }
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
