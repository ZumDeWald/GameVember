// JavaScript source code  Gamevember Scene1, boot
import Phaser from 'phaser';
import background from "./githubsquares.png";
import File1 from "./assets/File1.json";
import TileSet from "./assets/tileSet.png";
import bug1L from "./bug1-left.png";
import bug2L from "./bug2-left.png";
import bug1R from "./bug1-right.png";
import bug2R from "./bug2-right.png";
import bug1D from "./bug1-up.png";
import bug2D from "./bug2-up.png";
import bug1U from "./bug1-down.png";
import bug2U from "./bug2-down.png";

class Scene1 extends Phaser.Scene {
    constructor() {
        super();
        this.state = {
            sprite_state: "R1"
        }
    }

    preload() {
        //background
        this.load.image("background", background);
        //map
        this.load.tilemapTiledJSON("file1Map", File1);
        this.load.image("tileSet", TileSet);
        //sprite state L1
        this.load.image("bug1L", bug1L);
        // sprite state L2
        this.load.image("bug2L", bug2L);
        // R1
        this.load.image("bug1R", bug1R);
        // R2
        this.load.image("bug2R", bug2R);
        // D1
        this.load.image("bug1D", bug1D);
        // D2
        this.load.image("bug2D", bug2D);
        // U1
        this.load.image("bug1U", bug1U);
        // U2
        this.load.image("bug2U", bug2U);
    }
    create() {

        // Background
        this.add.image(0, 0, 'background').setOrigin(0).setScale(5);
        let style = {
            fontSize: '38px',
        }
        this.add.text(20, 20, "Loading bug....", style);

        // Map
        
        const file1Map = this.make.tilemap({ key: "file1Map" });
        const tileSet = file1Map.addTilesetImage("tileSet", "tileSet");
        file1Map.createStaticLayer("Background", tileSet, 0, 0);
        
        this.physics.world.setBounds(0, 0, 800, 1600);

        const file1Walls = file1Map.createStaticLayer("Walls", tileSet, 0, 0);
        file1Walls.setCollisionByExclusion(-1, true);




        // Bug
        this.bug = this.physics.add.sprite(20, 20, "bug1R");
        this.bug.displayWidth = 50;
        this.bug.displayHeight = 50;
        this.bug.setCollideWorldBounds(true);
        this.physics.add.collider(this.bug, file1Walls);

        this.cameras.main.setBounds(
            0,
            0,
            file1Map.widthInPixels,
            file1Map.heightInPixels
        );
        this.cameras.main.startFollow(this.bug, true);
    
       

        this.cursors = this.input.keyboard.createCursorKeys();


    }
    update() {
        var SpriteState = this.state.sprite_state
        if (this.cursors.left.isDown) {

            if (SpriteState != 'L1' || SpriteState != 'L2') {
                this.bug.setTexture('bug1L');
                this.state.sprite_state = 'L1';
                this.bug.setVelocityX(-175);
            }
            else if (SpriteState == 'L1') {
                this.bug.setTexture('bug2L');
                this.state.sprite_state = 'L2';
                this.bug.setVelocityX(-175);
            }
            else {
                this.bug.setTexture('bug1L');
                this.state.sprite_state = 'L1';
                this.bug.setVelocityX(-175);
            }

           

        } else if (this.cursors.right.isDown) {
            if (SpriteState != 'R1') {
                this.bug.setTexture('bug2R');
                this.statesprite_state = 'R2';
            }
            else {
                this.bug.setTexture('bug1R');
                this.state.sprite_state = 'R1';
            }

            this.bug.setVelocityX(175);
        } else {
            this.bug.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            if (SpriteState == 'D1') {
                this.bug.setTexture('bug2D');
                this.state.sprite_state = 'D2';
            }
            else {
                this.bug.setTexture('bug1D');
                this.state.sprite_state = 'D1';
            }

            this.bug.setVelocityY(-175);
        } else if (this.cursors.down.isDown) {
            if (SpriteState == 'U1') {
                this.bug.setTexture('bug2U');
                this.state.sprite_state = 'U2';
            }
            else {
                this.bug.setTexture('bug1U');
                this.state.sprite_state = 'U1';
            }
            this.bug.setVelocityY(175);

            
        } else {
            this.bug.setVelocityY(0);
            
        }
    }
}

export default Scene1;