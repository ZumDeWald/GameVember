import { PlayerState, GameParams, EventsName } from "./constants.js";
import { sceneEvents } from "./events/EventsCenter.js";

export const processInput = {
  [PlayerState.STAND]: (player) => {
    player.play("player_idle", true);
    player.jumped = false;
    player.body.velocity.x = 0;
    if (player.body.deltaYFinal() > 1) {
      player.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.state = PlayerState.ATTACK;
    } else if (player.inputs.keySpace.isDown) {
      player.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown || player.inputs.keyD.isDown) {
      player.state = PlayerState.RUN;
    }
  },
  [PlayerState.JUMP]: (player) => {
    player.play("player_jump", true);
    if (!player.jumped) {
      player.body.velocity.y = GameParams.VJUMP;
      player.jumped = true;
    }
    if (player.body.onFloor()) {
      player.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.velocity.x = -GameParams.VAIR;
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.velocity.x = GameParams.VAIR;
      player.checkFlip();
    }
  },
  [PlayerState.ATTACK]: (player) => {
    player.attackCounter += 1;
    if (!player.jumped) player.body.velocity.x = 0;
    if (player.attackCounter === 4) sceneEvents.emit(EventsName.ATTACK);
    if (player.attackCounter >= 16) {
      player.attackCounter = 0;
      if (player.body.onFloor()) {
        player.state = PlayerState.STAND;
      } else {
        player.state = PlayerState.FALL;
      }
    }
    if (player.body.onFloor()) {
      player.play("player_atk", true);
    } else {
      player.play("player_air_atk", true);
    }
  },
  [PlayerState.WALL]: (player) => {
    player.play("player_wall_slide", true);
    player.body.setVelocityY(5);
    if (player.body.touching.left) player.flipX = true;
    if (player.body.onFloor()) {
      player.state = PlayerState.STAND;
    } else if (!player.inputs.keyA.isDown && !player.inputs.keyD.isDown) {
      player.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.state = PlayerState.ATTACK;
    } else if (player.inputs.keySpace.isDown) {
      player.state = PlayerState.JUMP;
      player.body.setVelocityY(GameParams.VJUMP);
    }
  },
  [PlayerState.SLIDE]: (player) => {},
  [PlayerState.RUN]: (player) => {
    player.play("player_run", true);
    player.jumped = false;
    if (player.body.deltaYFinal() > 1) {
      player.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.state = PlayerState.ATTACK;
    } else if (player.inputs.keySpace.isDown) {
      player.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown) {
      player.body.velocity.x = -GameParams.VRUN;
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.velocity.x = GameParams.VRUN;
      player.checkFlip();
    } else {
      player.state = PlayerState.STAND;
    }
  },
  [PlayerState.CAST]: (player) => {},
  [PlayerState.HIT]: (player) => {
    player.play("player_fall");
    if (player.hitCounter >= 10) {
      player.hitCounter = 0;
      player.state = PlayerState.STAND;
    } else {
      player.hitCounter += 1;
    }
  },
  [PlayerState.DED]: (player) => {
    player.play("player_die");
    player.disableBody(true);
  },
  [PlayerState.FALL]: (player) => {
    player.play("player_fall", true);
    if (player.body.onFloor()) {
      player.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.velocity.x = -GameParams.VRUN;
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.velocity.x = GameParams.VRUN;
      player.checkFlip();
    }
  },
};
