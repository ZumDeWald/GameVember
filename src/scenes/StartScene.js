import Phaser from "phaser";
import Level1 from "../assets/Level1.json";
import Lair from "../assets/FirstLair.json";
import GameVemberTiles from "../assets/LevelBlocks.png";
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
