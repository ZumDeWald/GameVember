import { GameObjects, Scene } from "phaser";

class DimensionTraversal extends Scene {
  init({ player }) {
    this.firstPass = true;
    this.setX = player.x;
    this.setY = player.y;
    this.setFlipX = player.flipX;
    this.setFrame = player.frame.name;
  }

  create() {
    this.playerCloneWhite = new GameObjects.Image(
      this,
      this.setX,
      this.setY,
      "player",
      this.setFrame
    );
    this.playerCloneWhite.alpha = 0.8;
    this.playerCloneWhite.flipX = this.setFlipX;
    this.add.existing(this.playerCloneWhite);
    this.playerCloneWhite.setDepth(4);
    this.playerCloneWhite.setTintFill(0xffffff);

    this.playerCloneRed = new GameObjects.Image(
      this,
      this.setX - 2,
      this.setY,
      "player",
      this.setFrame
    );
    this.playerCloneRed.alpha = 0.7;
    this.playerCloneRed.flipX = this.setFlipX;
    this.add.existing(this.playerCloneRed);
    this.playerCloneRed.setTintFill(0xff0000);

    this.tweens.add({
      targets: this.playerCloneRed,
      duration: 100,
      repeat: 2,
      yoyo: true,
      x: this.setX + 3,
      onComplete: () => {
        this.playerCloneRed.setX(this.setX - 2);
      },
    });

    this.playerCloneBlue = new GameObjects.Image(
      this,
      this.setX + 3,
      this.setY,
      "player",
      this.setFrame
    );
    this.playerCloneBlue.alpha = 0.7;
    this.playerCloneBlue.flipX = this.setFlipX;
    this.add.existing(this.playerCloneBlue);
    this.playerCloneBlue.setTintFill(0x0000ff);

    this.tweens.add({
      targets: this.playerCloneBlue,
      duration: 100,
      repeat: 2,
      yoyo: true,
      x: this.setX - 2,
      onComplete: () => {
        this.playerCloneBlue.setX(this.setX + 3);
      },
    });

    this.cameras.main.centerOn(this.setX, this.setY);
    this.cameras.main.setZoom(1.8);

    console.log(this.setX);
  }

  update() {
    this.time.delayedCall(2000, () => {
      this.scene.resume("playGame");
      this.scene.remove(this);
    });
  }
}

export default DimensionTraversal;
