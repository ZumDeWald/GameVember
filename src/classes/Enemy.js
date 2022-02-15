import { Math } from "phaser";
import { EventsName } from "../constants";
import { sceneEvents } from "../events/EventsCenter";
import { CharacterBase } from "./CharacterBase";
import Drops from "./Drops";

class Enemy extends CharacterBase {
  constructor(scene, x, y, texture, target, frame) {
    super(scene, x, y, texture, frame);
    this.target = target;
    this.AGGRESSOR_RADIUS = 100;

    this.handleAttack = () => {
      const enemyLeft = this.x - this.target.x < 0 ? true : false;

      if (
        (enemyLeft && !this.target.flipX) ||
        (!enemyLeft && this.target.flipX)
      ) {
        return;
      }

      const diff = Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      );

      if (diff < 35) {
        this.disableBody(true);
        this.play("bat_explode", true);
        sceneEvents.emit(EventsName.DEFEAT_BAT);
        new Drops(this.scene, this.x, this.y, "heart-full", this.target);
        this.scene.time.delayedCall(500, () => {
          this.destroy();
        });
      }
    };

    sceneEvents.on(EventsName.ATTACK, this.handleAttack, this);

    this.on("destroy", () => {
      sceneEvents.removeListener(EventsName.ATTACK, this.handleAttack);
    });
  }

  setTarget(target) {
    this.target = target;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.hit > 0) {
      this.hit += 1;
      if (this.hit == 10) this.hit = 0;
      return;
    }

    if (this.getBody().onFloor()) this.setVelocityX(0);

    if (this.getBody().allowGravity) return;

    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
      this.checkFlip();
    } else {
      this.getBody().setVelocity(0);
    }
  }
}

export default Enemy;
