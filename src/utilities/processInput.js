import { PlayerState, GameParams, EventsName } from "../constants.js";
import { sceneEvents } from "../events/EventsCenter.js";

export const processInput = {
  [PlayerState.STAND]: (player) => {
    player.play("player_idle", true);
    player.settings.jumped = false;
    player.body.setVelocityX(0);
    if (player.body.deltaYFinal() > 1) {
      player.settings.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.settings.state = PlayerState.ATTACK;
    } else if (player.inputs.keyK.isDown) {
      player.settings.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown || player.inputs.keyD.isDown) {
      player.settings.state = PlayerState.RUN;
    }
  },
  [PlayerState.JUMP]: (player) => {
    player.play("player_jump", true);
    if (!player.settings.jumped) {
      player.body.setVelocityY(GameParams.VJUMP);
      player.settings.jumped = true;
    }
    if (player.body.onFloor()) {
      player.settings.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.settings.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.settings.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VAIR);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VAIR);
      player.checkFlip();
    }
  },
  [PlayerState.ATTACK]: (player) => {
    player.settings.attackCounter += 1;
    if (!player.settings.jumped) player.body.setVelocityX(0);
    if (player.settings.attackCounter === 4)
      sceneEvents.emit(EventsName.ATTACK);
    if (player.settings.attackCounter >= 16) {
      player.settings.attackCounter = 0;
      if (player.body.onFloor()) {
        player.settings.state = PlayerState.STAND;
      } else {
        player.settings.state = PlayerState.FALL;
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
    player.settings.jumped = false;
    player.body.setVelocityY(5);
    player.settings.inputTimeout += 1;

    if (player.body.onFloor()) {
      player.settings.inputTimeout = 0;
      player.settings.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.settings.inputTimeout = 0;
      player.settings.state = PlayerState.ATTACK;
      player.flipX = !player.flipX;
    } else if (player.inputs.keyK.isDown && player.settings.inputTimeout > 12) {
      player.settings.inputTimeout = 0;
      player.settings.state = PlayerState.WALLJUMP;
      player.flipX = !player.flipX;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VWALL);
      if (!player.settings.touchingWall) {
        player.settings.inputTimeout = 0;
        player.settings.state = PlayerState.FALL;
      }
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VWALL);
      if (!player.settings.touchingWall) {
        player.settings.inputTimeout = 0;
        player.settings.state = PlayerState.FALL;
      }
    } else {
      player.settings.inputTimeout = 0;
      player.settings.state = PlayerState.FALL;
    }

    player.settings.touchingWall = false;
  },
  [PlayerState.WALLJUMP]: (player) => {
    player.play("player_jump", true);

    if (player.settings.inputTimeout >= 6) {
      player.settings.inputTimeout = 0;
      player.settings.state = PlayerState.JUMP;
    } else {
      player.settings.inputTimeout += 1;
    }

    if (!player.settings.jumped) {
      player.body.setVelocityY(GameParams.VWJUMP);
      player.body.setVelocityX(player.inputs.keyA.isDown ? 80 : -80);
      player.settings.jumped = true;
    }
  },
  [PlayerState.SLIDE]: (player) => {},
  [PlayerState.RUN]: (player) => {
    player.play("player_run", true);
    player.settings.jumped = false;
    if (player.body.deltaYFinal() > 1) {
      player.settings.state = PlayerState.FALL;
    } else if (player.inputs.keyL.isDown) {
      player.settings.state = PlayerState.ATTACK;
    } else if (player.inputs.keyK.isDown) {
      player.settings.state = PlayerState.JUMP;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VRUN);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VRUN);
      player.checkFlip();
    } else {
      player.settings.state = PlayerState.STAND;
    }
  },
  [PlayerState.CAST]: (player) => {},
  [PlayerState.HIT]: (player) => {
    player.play("player_fall", true);
    if (player.settings.hitCounter === 1) {
      player.body.setVelocityX(player.flipX ? 110 : -110);
    }
  },
  [PlayerState.DED]: (player) => {
    player.play("player_die");
    player.disableBody(true);
  },
  [PlayerState.FALL]: (player) => {
    player.play("player_fall", true);
    if (player.body.onFloor()) {
      player.settings.state = PlayerState.STAND;
    } else if (player.inputs.keyL.isDown) {
      player.settings.state = PlayerState.ATTACK;
    } else if (!player.body.onFloor() && player.body.onWall()) {
      player.settings.state = PlayerState.WALL;
    } else if (player.inputs.keyA.isDown) {
      player.body.setVelocityX(-GameParams.VAIR);
      player.checkFlip();
    } else if (player.inputs.keyD.isDown) {
      player.body.setVelocityX(GameParams.VAIR);
      player.checkFlip();
    }
  },
};
