import Phaser from "phaser";
import Scene1 from "./Scene1.js";



// CONFIG:  Define the base canvas layout
var config = {
    type: Phaser.AUTO,
    parent: "#bugcanvas",
    height: '100%',
    width: '100%',
    scene: [Scene1],
    physics: {
        default: "arcade",
        arcade: {
            gravity: 0,
            debug: false,
        },
    },
    sprite_state: 'L1',
}
var game = new Phaser.Game(config)
