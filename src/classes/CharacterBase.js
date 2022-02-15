import { Physics } from "phaser";

export class CharacterBase extends Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.hp = 3;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
  }

  getDamage(value) {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onComplete: () => {
        this.setAlpha(1);
      },
    });
    if (value) this.hp = this.hp - value;
  }

  getHealth(value) {
    if (value) {
      this.hp = this.hp + value;
    }
  }

  takeHit(damage, vector) {
    if (damage > 0) this.getDamage(damage);
    this.setVelocity(vector.x, vector.y);
  }

  getHPValue() {
    return this.hp;
  }

  checkFlip() {
    if (this.hit > 0) return;
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
