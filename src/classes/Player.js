import {
  EventsName,
  GameParams,
  GameStatus,
  PlayerState,
} from "../constants.js";
import { CharacterBase } from "./CharacterBase.js";
import { sceneEvents } from "../events/EventsCenter.js";
import { processInput } from "../utilities/processInput.js";

export default class Player extends CharacterBase {
  constructor(scene, x, y, inputsFromScene) {
    super(scene, x, y, "player", "player_idle_1");

    this.inputs = inputsFromScene;

    this.settings = {
      state: PlayerState.STAND,
      attackCounter: 0,
      hitCounter: 0,
      inputTimeout: 0,
      jumped: false,
      touchingWall: false,
      wallCling: false,
      cast: true, // SET FALSE AFTER TESTING
    };

    sceneEvents.on(
      EventsName.GET_CAST,
      () => {
        this.settings.cast = true;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_CLING,
      () => {
        this.settings.wallCling = true;
      },
      this
    );

    sceneEvents.on(
      EventsName.CAST_END,
      () => {
        this.settings.state = PlayerState.STAND;
        this.settings.inputTimeout = 0;
      },
      this
    );

    sceneEvents.on(
      EventsName.GET_POTION,
      () => {
        this.getHealth(GameParams.HPMAX + GameParams.HPADD);
      },
      this
    );

    sceneEvents.on(
      EventsName.RESET_PLAYER,
      () => {
        this.body.reset(100, 165);
        this.hp = GameParams.HPMAX;
        this.settings.state = PlayerState.STAND;
        this.settings.attackCounter = 0;
        this.settings.hitCounter = 0;
        this.settings.inputTimeout = 0;
        this.settings.jumped = false;
        this.settings.touchingWall = false;
        this.flipX = false;
      },
      this
    );
  }

  takeHit(damage) {
    if (this.hp <= 0) {
      sceneEvents.emit(EventsName.PLAYER_HEALTH_CHANGE, 0);
      this.state = PlayerState.DED;
      sceneEvents.emit(EventsName.GAMEOVER, GameStatus.LOSE);
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

  update() {
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
