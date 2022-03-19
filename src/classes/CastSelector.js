import { Physics } from "phaser";
import { EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class Computron extends Physics.Arcade.Image {
  constructor(scene, inputsFromScene, castCandidates) {
    let initialX = 0;
    let initialY = 0;

    if (castCandidates.length > 0) {
      initialX = castCandidates[0].x;
      initialY = castCandidates[0].y - 20;
    }

    super(scene, initialX, initialY, "down-arrow");

    this.inputs = inputsFromScene;
    this.castOptions = castCandidates;
    this.settings = {
      selectedCandidate: 0,
      totalCandidates: castCandidates.length - 1,
      visible: true,
      ignoreInput: false,
    };

    scene.add.existing(this);
    scene.physics.add.existing(this);

    if (castCandidates.length === 0) {
      this.setVisible(false);
      this.settings.visible = false;
    } else {
      castCandidates[this.settings.selectedCandidate].showCastable();
    }

    sceneEvents.on(EventsName.CAST_END, this.killCastSelection, this);
  }

  killCastSelection() {
    if (this.settings.visible) {
      this.castOptions[this.settings.selectedCandidate].hideCastable();
    }
    this.destroy(true);
  }

  handleChangeSelection(moveLeft) {
    this.settings.ignoreInput = true;
    this.scene.time.delayedCall(
      200,
      () => {
        this.settings.ignoreInput = false;
      },
      null,
      this
    );

    this.castOptions[this.settings.selectedCandidate].hideCastable();

    if (moveLeft) {
      if (this.settings.selectedCandidate > 0) {
        this.settings.selectedCandidate -= 1;
      } else {
        this.settings.selectedCandidate = this.settings.totalCandidates;
      }
    } else {
      if (this.settings.selectedCandidate < this.settings.totalCandidates) {
        this.settings.selectedCandidate += 1;
      } else {
        this.settings.selectedCandidate = 0;
      }
    }
    this.castOptions[this.settings.selectedCandidate].showCastable();
    this.x = this.castOptions[this.settings.selectedCandidate].x;
    this.y = this.castOptions[this.settings.selectedCandidate].y - 20;
  }

  castIntoObject() {
    sceneEvents.emit(
      EventsName.CAST_SELECT,
      this.castOptions[this.settings.selectedCandidate]
    );
    this.castOptions[this.settings.selectedCandidate].setOccupied(true);
    this.killCastSelection();
  }

  preUpdate() {
    if (this.inputs.space.isDown) sceneEvents.emit(EventsName.CAST_END, false);
    if (!this.settings.visible) return;

    if (!this.settings.ignoreInput) {
      if (this.inputs.left.isDown) {
        this.handleChangeSelection(true);
      } else if (this.inputs.right.isDown) {
        this.handleChangeSelection(false);
      }
    }

    if (this.inputs.atk.isDown) {
      this.castIntoObject();
    }
  }
}
