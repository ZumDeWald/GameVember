import { EventsName, GameStatus, PlayerState } from "../constants.js";
import { CharacterBase } from "./CharacterBase.js";
import { sceneEvents } from "../events/EventsCenter.js";
import { processInput } from "../utilities/processInput.js";

export default class Player extends CharacterBase {
  constructor(scene, x, y) {
    super(scene, x, y, "player", "player_idle_1");

    this.inputs = {};

    this.inputs.keyW = this.scene.input.keyboard.addKey("W");
    this.inputs.keyA = this.scene.input.keyboard.addKey("A");
    this.inputs.keyS = this.scene.input.keyboard.addKey("S");
    this.inputs.keyD = this.scene.input.keyboard.addKey("D");
    this.inputs.keyK = this.scene.input.keyboard.addKey("K");
    this.inputs.keyL = this.scene.input.keyboard.addKey("L");
    this.inputs.keySpace = this.scene.input.keyboard.addKey("SPACE");

    // this.inputs.keyL.on("down", () => {
    //   if (this.getBody().onFloor()) {
    //     this.play("player_atk", true);
    //   } else {
    //     this.play("player_air_atk", true);
    //   }
    //   this.state = PlayerState.ATTACK;
    //   this.deltaCounter = 1;
    //   sceneEvents.emit(EventsName.ATTACK);
    // });

    this.settings = {
      state: PlayerState.STAND,
      attackCounter: 0,
      hitCounter: 0,
      inputTimeout: 0,
      jumped: false,
      touchingWall: false,
    };
    // this.vWalk = 175;
    // this.vJump = -250;
  }

  // setHp() {
  //   if (this.hp <= 0) {
  //     this.disableBody();
  //     this.play("player_die");
  //     this.scene.time.delayedCall(1000, () => {
  //       sceneEvents.emit(EventsName.GAMEOVER, GameStatus.LOSE);
  //     });
  //   }
  // }

  takeHit(damage) {
    if (this.hp <= 0) {
      sceneEvents.emit(EventsName.PLAYER_HEALTH_CHANGE, 0);
      this.state = PlayerState.DED;
      this.scene.time.delayedCall(300, () => {
        sceneEvents.emit(EventsName.GAMEOVER, GameStatus.LOSE);
      });
    } else if (this.settings.hitCounter === 0) {
      super.takeHit(damage);
      this.settings.hitCounter = 1;
      this.settings.state = PlayerState.HIT;
      sceneEvents.emit(EventsName.PLAYER_HEALTH_CHANGE, this.hp - damage);
    }
  }

  processHit() {
    if (this.settings.hitCounter === 10) {
      this.settings.state = PlayerState.STAND;
      this.settings.hitCounter += 1;
    } else if (this.settings.hitCounter >= 45) {
      this.settings.hitCounter = 0;
    } else {
      this.settings.hitCounter += 1;
    }
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    // if (this.deltaCounter > 0) {
    //   this.deltaCounter += dt;
    //   if (this.deltaCounter >= 200) {
    //     this.deltaCounter = 0;
    //     if (this.getBody().onFloor()) {
    //       this.state = PlayerState.STAND;
    //     } else {
    //       this.state = PlayerState.JUMP;
    //     }
    //   }
    // }
  }

  update() {
    // this.setHp();

    if (this.settings.hitCounter >= 1) this.processHit();
    processInput[this.settings.state](this);

    // if (this.hp <= 0) this.state = PlayerState.DED;

    // if (this.hit > 0) {
    //   this.hit += 1;
    //   if (this.hit >= 50) this.hit = 0;
    //   if (this.hit <= 10) return;
    // }

    // if (this.state === PlayerState.ATTACK) {
    //   if (this.getBody().onFloor()) this.getBody().setVelocityX(0);
    //   return;
    // }

    // if (!this.getBody().onFloor() && this.getBody().onWall()) {
    //   this.state = PlayerState.WALL;
    //   this.play("player_wall_slide", true);
    //   this.getBody().setVelocityY(0);
    //   if (this.getBody().touching.left) this.flipX = true;
    //   return;
    // }

    // if (this.getBody().deltaYFinal() > 0 && this.state !== PlayerState.JUMP) {
    //   this.play("player_fall", true);
    // }

    // this.getBody().setVelocityX(0);

    // if (this.keyA.isDown) {
    //   this.body.velocity.x = -this.vWalk;
    //   this.checkFlip();
    // }

    // if (this.keyD.isDown) {
    //   this.body.velocity.x = this.vWalk;
    //   this.checkFlip();
    // }

    // if (this.getBody().onFloor()) {
    //   this.state = PlayerState.STAND;
    //   if (this.keyA.isDown || this.keyD.isDown) {
    //     this.play("player_run", true);
    //   } else {
    //     this.play("player_idle", true);
    //   }
    // }

    // if (this.keySpace.isDown && this.getBody().onFloor()) {
    //   this.state = PlayerState.JUMP;
    //   this.body.velocity.y = this.vJump;
    // }

    // if (this.state === PlayerState.JUMP) {
    //   this.play("player_jump", true);
    // }
  }
}
