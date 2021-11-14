// JavaScript source code:  GameVember 'Bug'

// NOT IN USE
import Phaser from "phaser";
import Scene1 from "./assets/Scene1.js"



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