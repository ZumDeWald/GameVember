import { EventsName, GameStatus, PlayerStance } from "../constants.js";
import { CharacterBase } from "./CharacterBase.js";
import { CustomText } from "./CustomText.js";

export default class Player extends CharacterBase {
  constructor(scene, x, y) {
    super(scene, x, y, "player", "idle1");

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.keyK = this.scene.input.keyboard.addKey("K");
    this.keyL = this.scene.input.keyboard.addKey("L");
    this.keySpace = this.scene.input.keyboard.addKey("SPACE");

    this.keyL.on("down", (e) => {
      this.anims.play("player_atk", true);
      this.stance = PlayerStance.ATTACK;
      this.deltaCounter = 1;
      this.scene.game.events.emit(EventsName.ATTACK);
    });

    this.stance = PlayerStance.STAND;
    this.hit = 0;
    this.deltaCounter = 0;
    this.vWalk = 175;
    this.vJump = -300;

    this.hpValue = new CustomText(
      this.scene,
      this.x,
      this.y - this.height,
      this.hp.toString()
    )
      .setFontSize(12)
      .setOrigin();
  }

  setHp() {
    if (this.hp <= 0) {
      this.scene.game.events.emit(EventsName.GAMEOVER, GameStatus.LOSE);
    }
    this.hpValue.setText(this.hp.toString());
    this.hpValue.setPosition(this.x, this.y - this.height * 0.6);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    if (this.stance === PlayerStance.ATTACK) {
      this.setOffset(14, 5);
    } else {
      this.setOffset(0);
    }

    if (this.deltaCounter > 0) {
      this.deltaCounter += dt;
      if (this.deltaCounter >= 200) {
        this.deltaCounter = 0;
        if (this.getBody().onFloor()) {
          this.stance = PlayerStance.STAND;
        } else {
          this.stance = PlayerStance.JUMP;
        }
      }
    }
  }

  update() {
    this.setHp();

    if (this.hit > 0) {
      this.hit += 1;
      if (this.hit == 10) this.hit = 0;
      return;
    }

    if (this.stance === PlayerStance.ATTACK) {
      this.hpValue.setPosition(this.x, this.y - this.height * 0.4);
      if (this.getBody().onFloor()) this.getBody().setVelocityX(0);
      return;
    }

    this.getBody().setVelocityX(0);

    if (this.keyA.isDown) {
      this.body.velocity.x = -this.vWalk;
      this.checkFlip();
    }

    if (this.keyD.isDown) {
      this.body.velocity.x = this.vWalk;
      this.checkFlip();
    }

    if (this.getBody().onFloor()) {
      this.stance = PlayerStance.STAND;
      if (this.keyA.isDown || this.keyD.isDown) {
        this.play("player_run", true);
      } else {
        this.play("player_idle", true);
      }
    }

    if (this.keySpace.isDown && this.getBody().onFloor()) {
      this.stance = PlayerStance.JUMP;
      this.body.velocity.y = this.vJump;
    }

    if (this.stance === PlayerStance.JUMP) {
      this.play("player_jump", true);
    }
  }
}
