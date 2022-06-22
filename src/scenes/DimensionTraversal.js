import { Curves, GameObjects, Scene } from "phaser";

class DimensionTraversal extends Scene {
  init({ player, camera }) {
    this.step = 0;
    this.setX = (player.x - camera.worldView.x) * 1.8;
    this.setY = (player.y - camera.worldView.y) * 1.8;
    this.setFlipX = player.flipX;
    this.setFrame = player.frame.name;
    this.circleSize = 50;
    this.reverse = false;
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
    this.playerCloneWhite.setScale(1.8);

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
    this.playerCloneRed.setScale(1.8);

    this.tweens.add({
      targets: this.playerCloneRed,
      duration: 480,
      repeat: 1,
      yoyo: true,
      x: this.setX + 7,
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
    this.playerCloneBlue.setScale(1.8);

    this.tweens.add({
      targets: this.playerCloneBlue,
      duration: 400,
      repeat: 1,
      yoyo: true,
      x: this.setX - 5,
      onComplete: () => {
        this.playerCloneBlue.setX(this.setX + 3);
      },
    });

    this.cameras.main.setBackgroundColor(0xffffff);

    this.rect1 = this.add.rectangle(0, -40, 800, 40);
    this.rect1.setOrigin(0);
    this.rect1.setFillStyle(0x5744d1, 0.5);
    this.rect1.setDepth(5);

    this.rect2 = this.add.rectangle(0, -100, 800, 20);
    this.rect2.setOrigin(0);
    this.rect2.setFillStyle(0xf31c42, 0.6);
    this.rect2.setDepth(5);

    this.rect3 = this.add.rectangle(0, -124, 800, 20);
    this.rect3.setOrigin(0);
    this.rect3.setFillStyle(0xcceedc, 1);
    this.rect3.setDepth(5);

    this.rect4 = this.add.rectangle(0, 900, 800, 20);
    this.rect4.setOrigin(0);
    this.rect4.setFillStyle(0x000000, 0.3);
    this.rect4.setDepth(5);

    this.rect5 = this.add.rectangle(0, -80, 800, 10);
    this.rect5.setOrigin(0);
    this.rect5.setFillStyle(0xf31c42, 0.5);
    this.rect5.setDepth(5);

    this.rect6 = this.add.rectangle(0, -80, 800, 30);
    this.rect6.setOrigin(0);
    this.rect6.setFillStyle(0x5744d1, 0.5);
    this.rect6.setDepth(5);

    this.rect7 = this.add.rectangle(0, -170, 800, 20);
    this.rect7.setOrigin(0);
    this.rect7.setFillStyle(0x5744d1, 0.4);
    this.rect7.setDepth(5);

    this.rect8 = this.add.rectangle(0, 300, 800, 20);
    this.rect8.setOrigin(0);
    this.rect8.setFillStyle(0x000000, 0.2);
    this.rect8.setDepth(5);

    // Mask
    this.maskShape = this.make.graphics();
    this.maskShape.fillStyle(0xffffff);
    this.maskShape.beginPath();
    this.maskShape.fillCircle(this.setX, this.setY, this.circleSize);

    this.mask = this.maskShape.createGeometryMask();

    this.cameras.main.setMask(this.mask);

    this.time.delayedCall(1400, () => {
      this.cameras.main.fadeOut(50, 0, 0, 0);
    });

    this.time.delayedCall(1450, () => {
      this.scene.resume("playGame");
      this.scene.remove(this);
    });
  }

  update() {
    this.rect1.y += 25;
    this.rect2.y += 20;
    this.rect3.y += 12;
    this.rect4.y -= 15;
    this.rect5.y += 20;
    this.rect6.y += 15;
    this.rect7.y += 10;
    this.rect8.y -= 10;
    if (!this.reverse) {
      this.circleSize += 20;
      this.maskShape.clear();
      this.maskShape.fillCircle(this.setX, this.setY, this.circleSize);
      if (this.circleSize >= 900) this.reverse = true;
    } else {
      this.circleSize -= 20;
      this.maskShape.clear();
      this.maskShape.fillCircle(this.setX, this.setY, this.circleSize);
    }
  }
}

export default DimensionTraversal;
