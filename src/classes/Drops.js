import { Math, Physics } from "phaser";
import { EventsName } from "../constants";
import { sceneEvents } from "../events/EventsCenter";

class Drops extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, target) {
    super(scene, x, y, texture);
    this.target = target;
    this.PICKUP_RADIUS = 100;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.setScale(0.3);
    this.scene.physics.add.overlap(this.target, this, (obj1, obj2) => {
      sceneEvents.emit(
        EventsName.PLAYER_HEALTH_CHANGE,
        this.target.getHPValue() + 1
      );
      obj1.getHealth(1);
      obj2.destroy();
    });
  }

  setTarget(target) {
    this.target = target;
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.PICKUP_RADIUS
    ) {
      this.body.setVelocityX(this.target.x - this.x);
      this.body.setVelocityY(this.target.y - this.y);
    } else {
      this.body.setVelocity(0);
    }
  }
}

export default Drops;
