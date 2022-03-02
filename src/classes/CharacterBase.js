import { Physics } from "phaser";
import { GameParams } from "../constants";

export class CharacterBase extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.hp = 100;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }

  getDamage(value) {
    this.scene.tweens.add({
      targets: this,
      duration: 64,
      repeat: 4,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) this.hp = this.hp - value;
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  getHealth(value) {
    this.hp = this.hp + value;
    if (this.hp > GameParams.HPMAX) this.hp = GameParams.HPMAX;
  }

  takeHit(damage) {
    if (damage > 0) this.getDamage(damage);
  }

  getHPValue() {
    return this.hp;
  }

  checkFlip() {
    if (this.body.velocity.x < 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }

  getBody() {
    return this.body;
  }
}
