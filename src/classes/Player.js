import { EventsName, GameStatus, PlayerStance } from "../constants.js";
import { CharacterBase } from "./CharacterBase.js";
import { sceneEvents } from "../events/EventsCenter.js";

export default class Player extends CharacterBase {
  constructor(scene, x, y) {
    super(scene, x, y, "player", "player_idle_1");

    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.keyK = this.scene.input.keyboard.addKey("K");
    this.keyL = this.scene.input.keyboard.addKey("L");
    this.keySpace = this.scene.input.keyboard.addKey("SPACE");

    this.keyL.on("down", () => {
      if (this.getBody().onFloor()) {
        this.play("player_atk", true);
      } else {
        this.play("player_air_atk", true);
      }
      this.stance = PlayerStance.ATTACK;
      this.deltaCounter = 1;
      sceneEvents.emit(EventsName.ATTACK);
    });

    this.stance = PlayerStance.STAND;
    this.deltaCounter = 0;
    this.vWalk = 175;
    this.vJump = -250;
  }

  setHp() {
    if (this.hp <= 0) {
      this.disableBody();
      this.play("player_die");
      this.scene.time.delayedCall(1000, () => {
        sceneEvents.emit(EventsName.GAMEOVER, GameStatus.LOSE);
      });
    }
  }

  takeHit(damage, vector) {
    if (this.hit > 0) return;
    this.play("player_fall");
    super.takeHit(damage, vector);
    sceneEvents.emit(EventsName.PLAYER_HEALTH_CHANGE, this.getHPValue() - 1);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

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
    if (this.hp <= 0) return;

    if (this.hit > 0) {
      this.hit += 1;
      if (this.hit >= 50) this.hit = 0;
      if (this.hit <= 10) return;
    }

    if (this.stance === PlayerStance.ATTACK) {
      if (this.getBody().onFloor()) this.getBody().setVelocityX(0);
      return;
    }

    if (this.getBody().deltaYFinal() > 0 && this.stance !== PlayerStance.JUMP) {
      this.play("player_fall");
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
