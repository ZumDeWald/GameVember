import { Math } from "phaser";
import { EventsName } from "../constants";
import { CharacterBase } from "./CharacterBase";

class Enemy extends CharacterBase {
  constructor(scene, x, y, texture, target, frame) {
    super(scene, x, y, texture, frame);
    this.target = target;
    this.AGGRESSOR_RADIUS = 100;

    this.handleAttack = () => {
      if (
        Math.Distance.BetweenPoints(
          { x: this.x, y: this.y },
          { x: this.target.x, y: this.target.y }
        ) < this.target.width
      ) {
        this.getDamage();
        this.disableBody();
        this.scene.game.events.emit(EventsName.DEFEAT_BAT);
        this.scene.time.delayedCall(300, () => {
          this.destroy();
        });
      }
    };

    this.scene.game.events.on(EventsName.ATTACK, this.handleAttack, this);

    this.on("destroy", () => {
      this.scene.game.events.removeListener(
        EventsName.ATTACK,
        this.handleAttack
      );
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
