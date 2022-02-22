import { PlayerState, GameParams, EventsName } from "./constants.js";
import { sceneEvents } from "./events/EventsCenter.js";

export const processInput = {
  [PlayerState.STAND]: (player) => {
    player.play("player_idle", true);
    player.data.jumped = false;
    player.body.setVelocityX(0);
    if (player.body.deltaYFinal() > 1) {
      player.data.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.data.state = PlayerState.ATTACK;
    } else if (player.inputs.keyK.isDown) {
      player.data.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown || player.inputs.keyD.isDown) {
      player.data.state = PlayerState.RUN;
    }
  },
  [PlayerState.JUMP]: (player) => {
    player.play("player_jump", true);
    if (!player.data.jumped) {
      player.body.setVelocityY(GameParams.VJUMP);
      player.data.jumped = true;
    }
    if (player.body.onFloor()) {
      player.data.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.data.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.data.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VAIR);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VAIR);
      player.checkFlip();
    }
  },
  [PlayerState.ATTACK]: (player) => {
    player.data.attackCounter += 1;
    if (!player.data.jumped) player.body.setVelocityX(0);
    if (player.data.attackCounter === 4) sceneEvents.emit(EventsName.ATTACK);
    if (player.data.attackCounter >= 16) {
      player.data.attackCounter = 0;
      if (player.body.onFloor()) {
        player.data.state = PlayerState.STAND;
      } else {
        player.data.state = PlayerState.FALL;
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
    player.data.jumped = false;
    player.body.setVelocityY(5);

    if (player.body.onFloor()) {
      player.data.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.data.state = PlayerState.ATTACK;
      player.flipX = !player.flipX;
    } else if (player.inputs.keyK.isDown) {
      player.data.state = PlayerState.WALLJUMP;
      player.flipX = !player.flipX;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VWALL);
      if (!player.data.touchingWall) player.data.state = PlayerState.FALL;
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VWALL);
      if (!player.data.touchingWall) player.data.state = PlayerState.FALL;
    } else {
      player.data.state = PlayerState.FALL;
    }

    player.data.touchingWall = false;
  },
  [PlayerState.WALLJUMP]: (player) => {
    player.play("player_jump", true);

    if (player.data.inputTimeout >= 8) {
      player.data.inputTimeout = 0;
      player.data.state = PlayerState.JUMP;
    } else {
      player.data.inputTimeout += 1;
    }

    if (!player.data.jumped) {
      player.body.setVelocityY(GameParams.VWJUMP);
      player.body.setVelocityX(player.inputs.keyA.isDown ? 80 : -80);
      player.data.jumped = true;
    }
  },
  [PlayerState.SLIDE]: (player) => {},
  [PlayerState.RUN]: (player) => {
    player.play("player_run", true);
    player.data.jumped = false;
    if (player.body.deltaYFinal() > 1) {
      player.data.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.data.state = PlayerState.ATTACK;
    } else if (player.inputs.keyK.isDown) {
      player.data.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VRUN);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VRUN);
      player.checkFlip();
    } else {
      player.data.state = PlayerState.STAND;
    }
  },
  [PlayerState.CAST]: (player) => {},
  [PlayerState.HIT]: (player) => {
    player.play("player_fall");
    if (player.data.hitCounter >= 10) {
      player.data.hitCounter = 0;
      player.data.state = PlayerState.STAND;
    } else {
      player.data.hitCounter += 1;
    }
  },
  [PlayerState.DED]: (player) => {
    player.play("player_die");
    player.disableBody(true);
  },
  [PlayerState.FALL]: (player) => {
    player.play("player_fall", true);
    if (player.body.onFloor()) {
      player.data.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.data.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.data.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VAIR);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VAIR);
      player.checkFlip();
    }
  },
};
