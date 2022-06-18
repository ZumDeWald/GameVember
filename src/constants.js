export const ScoreOperations = {
  INCREASE: "Increase",
  DECREASE: "Decrease",
  SET_VALUE: "SetValue",
};

export const EventsName = {
  GET_POTION: "GetPotion",
  GET_TELE: "GetTelekenesis",
  GET_CLING: "GetWallCling",
  DEFEAT_BAT: "KiltBat",
  ATTACK: "Attack",
  GAMEOVER: "GameOver",
  RESET_PLAYER: "Reset",
  PLAYER_HEALTH_CHANGE: "PlayerHealthChange",
  CAST_START: "Begin Casting",
  CAST_END: "Stop Casting",
  CAST_SELECT: "ObjectSelected",
  OPEN_DIALOG: "OpenDialog",
  PAUSE_GAME: "Pause",
  RESUME_GAME: "UnPause",
};

export const GameStatus = {
  WIN: "Win",
  LOSE: "Ded",
};

export const GameParams = {
  WINSCORE: 300,
  VRUN: 160,
  VJUMP: -225,
  VWJUMP: -180,
  VAIR: 125,
  VWALL: 5,
  HPMAX: 100,
  HPADD: 10,
  VCOMP: 50,
};

export const PlayerState = {
  STAND: "player_idle",
  JUMP: "player_jump",
  ATTACK: "player_atk",
  WALL: "player_wall_slide",
  WALLJUMP: "player_wall_jump",
  RUN: "player_run",
  CAST: "player_cast",
  HIT: "player_hit",
  DED: "player_die",
  FALL: "player_fall",
};

export const DialogSettings = {
  PLAYER: "Player",
  COMPUTRON: "Computron",
};
