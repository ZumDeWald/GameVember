// JavaScript source code:  GameVember 'Bug'
import Phaser from "phaser";
import Scene1 from "./assets/Scene1.js"
import BugL1 from "./assets/bug1-left.png";
import BugL2 from "./assets/bug2-left.png";
import BugR1 from "./assets/bug1-right.png";
import BugR2 from "./assets/bug2-right.png";
import BugD1 from "./assets/bug1-down.png";
import BugD2 from "./assets/bug2-down.png";
import BugU1 from "./assets/bug1-up.png";
import BugU2 from "./assets/bug2-up.png";



// CONFIG:  Define the base canvas layout
var CONFIG = {
    type: Phaser.AUTO,
    height: '100vh',
    width: '100vw',
    backgroundColor: 0x000000,
    scene: [Scene1],
    physics: {
        default: "arcade",
        arcade: {
            gravity: 0,
            debug: false,
        },
    },
    sprite_state = 'L1',
}

var GAME = new Phaser.Game(CONFIG)