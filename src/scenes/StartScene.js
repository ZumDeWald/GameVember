import Phaser from "phaser";
import Lair from "../assets/FirstLair.json";
import GBs2 from "../assets/GameBlocks2.png";
import PlayerSprite from "../assets/player.png";
import PlayerAtlas from "../assets/player.json";
import PotionSprites from "../assets/potions.png";
import PotionAtlas from "../assets/potions.json";
import SwitchSprites from "../assets/switches.png";
import SwitchAtlas from "../assets/switches.json";
import BatSprites from "../assets/bat.png";
import BatAtlas from "../assets/bat.json";
import BatExplode from "../assets/bat_explode.png";
import BatExplodeAtlas from "../assets/bat_explode.json";
import Health_lg from "../assets/Health_lg.png";
import Health_sm from "../assets/Health_sm.png";
import Grate from "../assets/GrateNoEnds.png";
import Heart from "../assets/heart_full.png";
import Computron from "../assets/Computron.png";
import ComputronDed from "../assets/ComputronDed.png";
import ArrowUp from "../assets/ArrowUp.png";
import ArrowDown from "../assets/ArrowDown.png";
import ArrowLeft from "../assets/ArrowLeft.png";
import ArrowRight from "../assets/ArrowRight.png";
import ArrowJump from "../assets/ArrowJump.png";
import SwordIcon from "../assets/Sword.png";
import CastIcon from "../assets/Cast.png";
import PauseIcon from "../assets/PauseIcon.png";
import CheckBubble from "../assets/CheckBubble.png";
import ComputronOutline from "../assets/ComputronOutline.png";
import ComputronDedOutline from "../assets/ComputronDedOutline.png";

class StartScene extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.tilemapTiledJSON("Lair", Lair);
    this.load.image("GBs2", GBs2);
    this.load.atlas("player", PlayerSprite, PlayerAtlas);
    this.load.atlas("potions", PotionSprites, PotionAtlas);
    this.load.atlas("bat", BatSprites, BatAtlas);
    this.load.atlas("bat-explode", BatExplode, BatExplodeAtlas);
    this.load.atlas("switches", SwitchSprites, SwitchAtlas);
    this.load.image("health-lg", Health_lg);
    this.load.image("health-sm", Health_sm);
    this.load.image("grate", Grate);
    this.load.image("heart", Heart);
    this.load.image("computron", Computron);
    this.load.image("computron-ded", ComputronDed);
    this.load.image("arrow-up", ArrowUp);
    this.load.image("arrow-down", ArrowDown);
    this.load.image("arrow-left", ArrowLeft);
    this.load.image("arrow-right", ArrowRight);
    this.load.image("arrow-jump", ArrowJump);
    this.load.image("icon-sword", SwordIcon);
    this.load.image("icon-cast", CastIcon);
    this.load.image("icon-pause", PauseIcon);
    this.load.image("computron-outline", ComputronOutline);
    this.load.image("computron-ded-outline", ComputronDedOutline);
    this.load.image("check-bubble", CheckBubble);
  }

  create() {
    this.add.text(20, 20, "Click anywhere to start");
  }

  update() {
    this.input.on("pointerdown", () => {
      this.scene.transition({
        target: "playGame",
        duration: 300,
        remove: true,
      });
    });
  }
}

export default StartScene;
