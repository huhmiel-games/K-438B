import { Scene } from 'phaser';
import Player from '../utils/Player';
import PowerUp from '../utils/powerUp';
import U from '../utils/usefull';

// Player
import playerRun from '../assets/run.png';
import playerRunShoot from '../assets/runShoot.png';
import idle from '../assets/idle.png';
import stand from '../assets/stand.png';
import jump from '../assets/jump.png';
import jumpVertical from '../assets/jumpVertical.png';
import duck from '../assets/duck.png';
import shootUp from '../assets/shootUp.png';
import morphingBall from '../assets/morphingBall.png'

// Power Up
import powerup from '../assets/powerupBleu.png';

// Map
import tiles from "../assets/environment/layers/tilesets.png";
import map from '../maps/map1.json';

// Various
import bullet from'../assets/spritesheets/Fx/shot.png';
import impact from '../assets/spritesheets/Fx/impact.png';
import blackPixel from '../assets/blackPixel.png';
import saveStation from '../assets/savestation.png';
import head from '../assets/head.png';

import test from '../maps/map1.png';



export default class playLvl1 extends Scene {
  constructor() {
    super('playLvl1');
    this.state = {
      canJump : false,
      stopJump : false,
      canWallJump : false,
      stopWallJump : false,
      wallJumpLeft: false,
      wallJumpRight: false,
    }
  }

  preload() {
    //map
    this.load.image("tiles", tiles);
    this.load.tilemapTiledJSON("map", map);

    // player animation
    this.load.spritesheet('player', playerRun, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('playerShoot', playerRunShoot, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('idle', idle, { frameWidth: 40, frameHeight: 55 });
    this.load.spritesheet('stand', stand, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('duck', duck, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('shootUp', shootUp, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('jump', jump, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('jumpVertical', jumpVertical, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('morphingBall', morphingBall, { frameWidth: 40, frameHeight: 40});

    // player bullets
    this.load.spritesheet("bullet", bullet, { frameWidth: 6, frameHeight: 4 });
    this.load.spritesheet('impact', impact, { frameWidth: 12, frameHeight: 12 });

    // power up
    this.load.spritesheet('powerup', powerup, { frameWidth: 16, frameHeight: 16 })
    this.load.image("blackPixel", blackPixel);
    this.load.image('test', test);

    // save station
    this.load.spritesheet('savestation', saveStation, { frameWidth: 40, frameHeight: 60 });
    this.load.image("head", head);
  }

  create() {
    // this.background = this.add.image(0, 0,'background');
    // this.background.setOrigin(0, 0);
    // this.background.displayWidth = U.WIDTH;
    // this.background.displayHeight = U.HEIGHT;
    this.scene.stop('loadSavedGame');

    this.map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground',"tiles");
    //this.tileset = this.map.addTilesetImage(tiles, "tiles");

    // test
    // this.test = this.add.image(0, 0,'test');
    // this.test.setOrigin(0, 0);
    // this.test.displayWidth = 2048;
    // this.test.displayHeight = 1024;

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.backLayer = this.map.createStaticLayer("back", this.tileset, 0, 0);
    this.middleLayer = this.map.createStaticLayer("middle", this.tileset, 0, 0);
    this.middleLayer2 = this.map.createStaticLayer("middle2", this.tileset, 0, 0);
    this.eau = this.map.createStaticLayer('eau', this.tileset, 0, 0);
    this.solLayer = this.map.createDynamicLayer("sol", this.tileset, 0, 0);
    this.frontLayer = this.map.createStaticLayer("front", this.tileset, 0, 0);
    this.frontLayer.setDepth(101);
    
    // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    // SAVE STATION
    // this.anims.create({
    //   key: 'savestation',
    //   frames: this.anims.generateFrameNumbers('savestation', { start: 0, end: 10, first: 0 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
    // this.savestation1 = new SaveStation(this, 704, 420, {key:'savestation', name: 'savestation1'})
    // this.savestation1.body.setSize(5, 30)
    // this.savestation1.animate('savestation', true);

    // const spawnPoint = this.map.findObject("enemies", obj => {
    //   if (obj.tetelaser) return obj
      
    // });

    // PAUSE GAME
    this.input.keyboard.on('keydown', (event) => {
      //console.log(event)
      if (event.code === 'KeyP') {
        this.pauseGame(true)
      }
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 400, 214, {key: 'player'});
    this.player.body.setSize(15, 35, 6, 11);
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'walkShoot',
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 10, first: 0 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0 }),
      frameRate: 25,
      repeat: -1
    });
    this.anims.create({
      key: 'runShoot',
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 10, first: 0 }),
      frameRate: 25,
      repeat: -1
    });
    this.anims.create({
      key: 'jumpBoost',
      frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 4, first: 0 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('stand', { start: 1, end: 1, first: 1 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 6, first: 0 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'jumpVertical',
      frames: this.anims.generateFrameNumbers('jumpVertical', { start: 0, end: 0, first: 0 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'duck',
      frames: this.anims.generateFrameNumbers('duck', { start: 0, end: 0, first: 0 }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'shootup',
      frames: this.anims.generateFrameNumbers('shootUp', { start: 0, end: 0, first: 0 }),
      frameRate: 1,
      repeat: -1
    });
    this.anims.create({
      key: 'morphingBall',
      frames: this.anims.generateFrameNumbers('morphingBall', { start: 0, end: 4, first: 0 }),
      frameRate: 16,
      repeat: -1
    });

    // player bullets
    this.player.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    this.anims.create({
      key: 'bull',
      frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'impact',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 20,
      repeat: 0
    });

    // SECTION POWER-UP
    this.anims.create({
      key: 'powerup',
      frames: this.anims.generateFrameNumbers('powerup', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.powerups = []
    this.map.objects[0].objects.forEach((element) => {
      this[element.name] = new PowerUp(this, element.x , element.y - 16, {key:element.properties.key, name: element.properties.name, ability: element.properties.ability, text: element.properties.text});
      this[element.name].displayOriginX = 0
      this[element.name].displayOriginY = 0
      this[element.name].body.width = 16;
      this[element.name].body.height = 16;
      this[element.name].allowGravity= false;
      this[element.name].animate('powerup', true);
      this.powerups.push(this[element.name]);
    });
    // WATER 
    // this.water = this.map.findObject("water", obj => obj.properties.drag );
    // this.waterBox = this.add.sprite(this.water.x , this.water.y  , 'blackPixel');
    // this.waterBox.displayWidth = this.water.width;
    // this.waterBox.displayHeight = this.water.height;
    // this.waterBox.setAlpha(1);
    // this.waterBox.setDepth(109);
    // this.physics.world.enable(this.waterBox, 1);
    // console.log(this.waterBox)
    // this.waterBox.body.setSize(this.water.width, this.water.height)
    // console.log(this)
    
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#3B1158');
    this.cameras.main.roundPixels = true;
    this.cameras.main.setZoom(2);
    //this.cameras.main.setSize(400, 256);

    this.solLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.solLayer, null);
    this.physics.add.overlap( this.powerups, this.player, (elm) => this.getPowerUp(elm), null, this);
    //this.physics.add.overlap( this.player, this.waterBox, (elm) => this.onWater(this.time.now), null, this);
    //this.physics.add.overlap( [this.savestation1], this.player, (elm) => this.saveGame(elm), null, this);
    this.physics.add.collider(this.player.bullets, this.solLayer, this.player.bulletKill, null, this.player.bullets);


    // MODAL
    this.msg = this.add.image(-400, -180 , 'blackPixel');
    this.msg.setOrigin(0.5, 0.5);
    this.msg.displayWidth = 300;
    this.msg.displayHeight = 80;
    this.msg.setAlpha(0);

    this.msgText = this.add.text(-400, -180, '', { fontSize: '15px' });
    this.msgText.setOrigin(0.5, 0.5);

    this.msgText.setAlpha(0);

    this.cameras.main.fadeIn(1000);
    
    this.px;
    this.py;
  }

  update (time, delta) {
    if (!this.player.state.pause) {
      if ( this.cursors.left.isDown ) {
        this.player.flipX= true;
        this.player.state.bulletPositionX = 1;
      } else if ( this.cursors.right.isDown ) {
        this.player.flipX=false;
        this.player.state.bulletPositionX = 9;
      }
      // bodysize for duck
      if ( this.cursors.down.isDown && !( this.cursors.left.isDown || this.cursors.right.isDown ) && !this.player.state.onMorphingBall && !this.player.state.jumpBoost){
        this.player.body.setSize(10, 23, 8, 10);
        // body size for morphing
      } else if ( this.player.state.onMorphingBall ) {
        this.player.body.setSize(12, 12, true);
        this.player.body.setOffset(15, 20);
        // body size for jumpBooster
      } else if (this.player.state.jumpBoost) {
        this.player.body.setSize(10, 50, true);
        //this.player.body.setOffset(12, 20);
      } else {
        this.player.body.setSize(10, 35, 8, 10);
      }
    }
    // DEBUG D
    if( this.cursors.up.isDown ) {
      console.log(this.player.x, this.player.y)
    }
    // this.msg.x = this.player.x + 150;
    // this.msg.y = this.player.y - 20;
    this.msgText.x = this.player.x;
    this.msgText.y = this.player.y;

    var tiles = this.map.getTilesWithinWorldXY(this.player.x , this.player.y , 16, 16);
    if (this.cursors.down.isDown) {
      //console.log(tiles)
      if (tiles[0].properties.collides) {
        console.log(tiles)
       }
    }
    // console.log(tiles)
    // if (tiles[0].properties.collides) {
    //   console.log(tiles)
    // }
    
  }

  getPowerUp(elm) {
    console.log(elm)
    this.player.inventory[elm.state.ability] = true;

    this.msg = this.add.image(0, 0 , 'blackPixel');
    this.msg.setOrigin(0.5, 0.5);
    this.msg.displayWidth = 300;
    this.msg.displayHeight = 80;
    this.msg.setAlpha(1);

    this.msgText = this.add.text(0, 0, elm.state.text, { fontSize: '15px' });
    this.msgText.setOrigin(0.5, 0.5);
    this.msgText.setAlpha(1);

    elm.destroy();

    this.fadingTween = this.tweens.add({
      targets: [this.msg, this.msgText],
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: 5000,
      repeat: 0,
      yoyo: false,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0
      },
    });
  }

  pauseGame () {
    if (!this.player.state.pause) {
      this.player.state.pause = true;
      this.scene.scene.physics.pause();
      this.player.anims.pause(this.player.anims.currentFrame)
      this.msg = this.add.image(this.cameras.main.worldView.x, this.cameras.main.worldView.y, 'blackPixel');
      this.msg.setOrigin(0, 0);
      this.msg.displayWidth = 400;
      this.msg.displayHeight = 256;
      this.msg.setAlpha(0.9);
      this.msg.setDepth(109);

      this.msgText = this.add.text(this.cameras.main.worldView.x/2, this.cameras.main.worldView.y/4, 'PAUSE', { fontSize: '50px' });
      this.msgText.setOrigin(0.5, 0.5);
      this.msgText.setAlpha(1);
      this.msgText.setDepth(110);

      // save part
      this.position = [this.cameras.main.worldView.y + 180, this.cameras.main.worldView.y+200];
      this.lastPosition = 0;

      this.continueBtn = this.add.text(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[0], " Continue ", { fill: "#FF3B00",  fontSize: '20px', align: 'left' });
      this.continueBtn.setDepth(110);
      this.continueBtn.setOrigin(0.5, 0.5)

      this.saveGameBtn = this.add.text(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[1], " Save ", { fill: "#FF3B00",  fontSize: '20px', align: 'left'});
      this.saveGameBtn.setDepth(110);
      this.saveGameBtn.setOrigin(0.85, 0.5)

      this.head = this.add.image(this.cameras.main.worldView.x + U.WIDTH / 4 - 60, this.position[0], 'head');
      this.head.setOrigin(0.5, 0.65)
      this.head.displayWidth = 15;
      this.head.displayHeight = 15;
      this.head.setAlpha(1);
      this.head.setDepth(110);

      this.input.keyboard.on('keydown', (event) => {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
          this.choose()
        }
        if (event.code === 'Enter') {
          this.launch()
        }
      });
    } else {
      this.player.state.pause = false;
      this.scene.scene.physics.resume();
      this.player.anims.resume(this.player.anims.currentFrame)
      //this.msg.destroy();
      this.msgText.destroy();
      this.msg.destroy();
    }

    // if ( this.player.keys.fire ) {
    //   this.scene.resume()
    // }
  }

  choose () {
    if (this.lastPosition == 1) {
      this.lastPosition = 0
    } else {
      this.lastPosition += 1;
    }
    this.head.y = this.position[this.lastPosition]
  }

  launch (elm) {
    if (this.lastPosition === 0) {
      console.log('continue');
      this.player.state.pause = false;
      this.scene.scene.physics.resume();
      this.player.anims.resume(this.player.anims.currentFrame)
      //this.msg.destroy();
      this.msgText.destroy();
      this.msg.destroy();
      this.continueBtn.destroy();
      this.saveGameBtn.destroy();
      this.head.destroy();
    }
    if (this.lastPosition === 1) {
      this.saveGame();
    }
  }

  saveGame () {
    console.log('save game')
  }

  shakeCamera () {
    this.cameras.main.shake(100, 0.005);
  }

  flashCamera () {
    this.cameras.main.flash(100)
  }
}
