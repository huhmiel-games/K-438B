import { Scene } from 'phaser';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import Crabes from '../enemies/Crabes';
import Guepes from '../enemies/Guepes';
import Jumpers from '../enemies/Jumpers';
import U from '../utils/usefull';
// import dashBord from './dashBoard';

// Player
import playerRun from '../assets/run.png';
import playerRunShoot from '../assets/runShoot.png';
import idle from '../assets/idle.png';
import stand from '../assets/stand.png';
import jump from '../assets/jump.png';
import jumpVertical from '../assets/jumpVertical.png';
import duck from '../assets/duck.png';
import shootUp from '../assets/shootUp.png';
import morphingBall from '../assets/morphingBall.png';
import hurt from '../assets/hurt.png';

// Power Up
import powerupBlue from '../assets/powerupBleu.png';
import powerupYellow from '../assets/powerupJaune.png';
import powerupGreen from '../assets/powerupVert.png';
import powerupRed from '../assets/powerupRouge.png';

// Enemies
import crabe from '../assets/spritesheets/enemies/crab-walk.png';
import guepe from '../assets/guepe.png';
import jumper from '../assets/spritesheets/enemies/jumper-idle.png';

import enemyExplode from '../assets/spritesheets/Fx/enemy-death.png';

// Map
import tiles from '../assets/environment/layers/tilesets.png';
import map from '../maps/map1.json';

// Various
import bullet from '../assets/spritesheets/Fx/shot.png';
import impact from '../assets/spritesheets/Fx/impact.png';
import blackPixel from '../assets/blackPixel.png';
import saveStation from '../assets/savestation.png';
import head from '../assets/head.png';
import whitePixel from '../assets/whitePixel.png';
import test from '../maps/map1.png';

export default class playLvl1 extends Scene {
  constructor() {
    super('playLvl1');
    this.state = {
      displayPowerUpMsg: false,
    };
  }

  preload() {
    // map
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', map);

    // player animation
    this.load.spritesheet('player', playerRun, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('playerShoot', playerRunShoot, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('idle', idle, { frameWidth: 40, frameHeight: 55 });
    this.load.spritesheet('stand', stand, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('duck', duck, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('shootUp', shootUp, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('jump', jump, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('jumpVertical', jumpVertical, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('morphingBall', morphingBall, { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('hurt', hurt, { frameWidth: 40, frameHeight: 40 });

    // player bullets
    this.load.spritesheet('bullet', bullet, { frameWidth: 6, frameHeight: 4 });
    this.load.spritesheet('impact', impact, { frameWidth: 12, frameHeight: 12 });

    // power up
    this.load.spritesheet('powerupBlue', powerupBlue, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupYellow', powerupYellow, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupGreen', powerupGreen, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupRed', powerupRed, { frameWidth: 16, frameHeight: 16 });
    this.load.image('blackPixel', blackPixel);
    this.load.image('test', test);

    // Enemies
    this.load.spritesheet('crabe', crabe, { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('guepe', guepe, { frameWidth: 40, frameHeight: 47 });
    this.load.spritesheet('jumper', jumper, { frameWidth: 47, frameHeight: 32 });
    this.load.spritesheet('enemyExplode', enemyExplode, { frameWidth: 67, frameHeight: 48 });
    this.enemyGetHited = false;
    // save station
    this.load.spritesheet('savestation', saveStation, { frameWidth: 40, frameHeight: 60 });
    this.load.image('head', head);

    this.load.image('whitePixel', whitePixel);
  }

  create() {
    // this.background = this.add.image(0, 0,'background');
    // this.background.setOrigin(0, 0);
    // this.background.displayWidth = U.WIDTH;
    // this.background.displayHeight = U.HEIGHT;
    this.scene.stop('loadSavedGame');

    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles');

    this.playerFlashTween = null;
    // test
    // this.test = this.add.image(0, 0,'test');
    // this.test.setOrigin(0, 0);
    // this.test.displayWidth = 2048;
    // this.test.displayHeight = 1024;

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.backLayer = this.map.createStaticLayer('back', this.tileset, 0, 0);
    this.middleLayer = this.map.createStaticLayer('middle', this.tileset, 0, 0);
    this.middleLayer2 = this.map.createStaticLayer('middle2', this.tileset, 0, 0);
    this.eau = this.map.createStaticLayer('eau', this.tileset, 0, 0);
    this.solLayer = this.map.createDynamicLayer('sol', this.tileset, 0, 0);
    this.frontLayer = this.map.createStaticLayer('front', this.tileset, 0, 0);
    this.frontLayer.setDepth(101);

    // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    // const spawnPoint = this.map.findObject("enemies", obj => {
    //   if (obj.tetelaser) return obj

    // });

    // PAUSE GAME
    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'KeyP') {
        this.pauseGame();
      }
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        this.choose();
      }
      if (event.code === 'Enter') {
        this.launch();
      }
    });


    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 1924, 158, { key: 'player' });
    this.playerHurt = false;
    this.player.body.setSize(15, 35, 6, 11);
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkShoot',
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 10, first: 0 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0 }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: 'runShoot',
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 10, first: 0 }),
      frameRate: 25,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumpBoost',
      frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 4, first: 0 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'stand',
      frames: this.anims.generateFrameNumbers('stand', { start: 1, end: 1, first: 1 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 6, first: 0 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumpVertical',
      frames: this.anims.generateFrameNumbers('jumpVertical', { start: 0, end: 0, first: 0 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'duck',
      frames: this.anims.generateFrameNumbers('duck', { start: 0, end: 0, first: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'shootup',
      frames: this.anims.generateFrameNumbers('shootUp', { start: 0, end: 0, first: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'morphingBall',
      frames: this.anims.generateFrameNumbers('morphingBall', { start: 0, end: 4, first: 0 }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'hurt',
      frames: this.anims.generateFrameNumbers('hurt', { start: 0, end: 2, first: 0 }),
      frameRate: 16,
      repeat: 0,
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
      repeat: -1,
    });
    this.anims.create({
      key: 'impact',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 20,
      repeat: 0,
    });

    // chargement de la sauvegarde
    if (this.data.systems.settings.data.loadSavedGame) {
      this.loadGame();
    }
    if (!localStorage.getItem('k438b')) {
      this.saveGame();
    }
    // SECTION POWER-UP
    this.anims.create({
      key: 'powerupYellow',
      frames: this.anims.generateFrameNumbers('powerupYellow', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupBlue',
      frames: this.anims.generateFrameNumbers('powerupBlue', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupRed',
      frames: this.anims.generateFrameNumbers('powerupRed', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupGreen',
      frames: this.anims.generateFrameNumbers('powerupGreen', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.powerups = [];
    this.map.objects[0].objects.forEach((element) => {
      if (this.player.inventory.powerUp[element.properties.id] === 0) {
        this[element.name] = new PowerUp(this, element.x, element.y - 16, {
          key: element.properties.key,
          name: element.properties.name,
          ability: element.properties.ability,
          text: element.properties.text,
          id: element.properties.id,
        });
        this[element.name].displayOriginX = 0;
        this[element.name].displayOriginY = 0;
        this[element.name].body.width = 16;
        this[element.name].body.height = 16;
        this[element.name].allowGravity = false;
        this[element.name].animate(element.properties.powerup, true);
        this.powerups.push(this[element.name]);
      }
    });

    // SECTIONS ENEMIES
    // explode animation
    this.anims.create({
      key: 'enemyExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: 1,
    });
    // anims enemies
    this.anims.create({
      key: 'crabe',
      frames: this.anims.generateFrameNumbers('crabe', { start: 0, end: 4, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'guepe',
      frames: this.anims.generateFrameNumbers('guepe', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper',
      frames: this.anims.generateFrameNumbers('jumper', { start: 0, end: 4, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumperJump',
      frames: this.anims.generateFrameNumbers('jumper', { start: 5, end: 5, first: 5 }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.enemyGroup = [];
    console.log(this.map.objects);
    // les crabes
    this.map.objects[2].objects.forEach((element) => {
      this[element.name] = new Crabes(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].body.setSize(16, 16);
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // les guepes
    this.map.objects[3].objects.forEach((element) => {
      this[element.name] = new Guepes(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].body.setSize(20, 32);
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // les jumpers
    this.map.objects[4].objects.forEach((element) => {
      this[element.name] = new Jumpers(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].body.setSize(31, 23);
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });

    this.getFired = false;
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
    // this.cameras.main.setSize(400, 256);

    //    COLLIDERS    ////
    this.solLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.solLayer, null);
    this.physics.add.collider(this.enemyGroup, this.solLayer, null);
    this.physics.add.overlap(this.powerups, this.player, elm => this.getPowerUp(elm), null, this);

    this.physics.add.collider(
      this.enemyGroup,
      this.player,
      elm => this.playerIsHit(elm), null, this,
    );
    this.physics.add.collider(
      this.player.bullets,
      this.enemyGroup,
      (elm, bull) => this.enemyIsHit(bull, elm, this.player),
      null,
      this.player,
    );

    this.physics.add.collider(
      this.player.bullets,
      this.solLayer,
      this.player.bulletKill,
      null,
      this.player.bullets,
    );


    // MODAL
    this.msg = this.add.image(-400, -180, 'blackPixel');
    this.msg.setOrigin(0.5, 0.5);
    this.msg.displayWidth = 300;
    this.msg.displayHeight = 80;
    this.msg.setAlpha(0);

    this.msgText = this.add.text(-400, -180, '', { fontSize: '15px' });
    this.msgText.setOrigin(0.5, 0.5);
    this.msgText.setAlpha(0);
    this.cameras.main.fadeIn(1000);

    this.events.emit('loadingDone');
  }

  update() {
    if (!this.player.state.pause || !this.playerDead) {
      if (this.cursors.left.isDown) {
        this.player.flipX = true;
        this.player.state.bulletPositionX = 1;
      } else if (this.cursors.right.isDown) {
        this.player.flipX = false;
        this.player.state.bulletPositionX = 9;
      }
      // bodysize for duck
      if (
        this.cursors.down.isDown
        && !(this.cursors.left.isDown || this.cursors.right.isDown)
        && !this.player.state.onMorphingBall
        && !this.player.state.jumpBoost) {
        this.player.body.setSize(10, 23, 8, 10);
        // body size for morphing
      } else if (this.player.state.onMorphingBall) {
        this.player.body.setSize(12, 12, true);
        this.player.body.setOffset(15, 20);
        // body size for jumpBooster
      } else if (this.player.state.jumpBoost) {
        this.player.body.setSize(10, 50, true);
        // body size for others
      } else {
        // this.player.body.setSize(10, 35, 8, 10);
        this.player.body.setSize(10, 35, true);
        // this.player.body.setOffset(8, 2);
      }
    }
    // DEBUG D
    if (this.cursors.up.isDown) {
      console.log(this.player.x, this.player.y);
    }
    if (this.player.state.pause) {
      this.msgText.x = this.player.x;
      this.msgText.y = this.player.y - 20;
    }

    if (this.state.displayPowerUpMsg) {
      this.msgtext.x = this.player.x;
      this.msgtext.y = this.player.y - 60;
      this.msg.x = this.player.x + 150;
      this.msg.y = this.player.y - 20;
    }

    // var tiles = this.map.getTilesWithinWorldXY(this.player.x , this.player.y , 16, 16);
    // if (this.cursors.down.isDown) {
    //   //console.log(tiles)
    //   if (tiles[0].properties.collides) {
    //     console.log(tiles)
    //    }
    // }
    // console.log(tiles)
    // if (tiles[0].properties.collides) {
    //   console.log(tiles)
    // }
  }

  getPowerUp(elm) {
    this.state.displayPowerUpMsg = true;
    if (elm.state.ability === 'energy') {
      this.player.addEnergy();
      this.events.emit('setHealth', { life: this.player.inventory.life });
    } else {
      this.player.inventory[elm.state.ability] = true;
    }
    this.player.inventory.powerUp[elm.state.id] = 1;
    this.msg = this.add.image(0, 0, 'blackPixel');
    this.msg.setOrigin(0.5, 0.5);
    this.msg.displayWidth = 300;
    this.msg.displayHeight = 80;
    this.msg.setAlpha(1);

    this.msgtext = this.add.text(0, 0, elm.state.text, { fontSize: '15px', align: 'center' });
    this.msgtext.setOrigin(0.5, 0.5);
    this.msgtext.setAlpha(1);
    elm.destroy();

    this.fadingTween = this.tweens.add({
      targets: [this.msg, this.msgtext],
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: 5000,
      repeat: 0,
      yoyo: false,
      alpha: {
        getStart: () => 1,
        getEnd: () => 0,
      },
      onComplete: () => {
        this.state.displayPowerUpMsg = false;
      },
    });
  }

  pauseGame() {
    if (!this.player.state.pause) {
      this.player.state.pause = true;
      this.physics.pause();
      this.player.anims.pause(this.player.anims.currentFrame);
      this.msg = this.add.image(this.cameras.main.worldView.x, this.cameras.main.worldView.y, 'blackPixel');
      this.msg.setOrigin(0, 0);
      this.msg.displayWidth = 400;
      this.msg.displayHeight = 256;
      this.msg.setAlpha(0.9);
      this.msg.setDepth(109);

      this.msgText = this.add.bitmapText(this.cameras.main.worldView.x / 2, this.cameras.main.worldView.y / 4, 'atomic', 'PAUSE', 50, 1);
      this.msgText.setOrigin(0.5, 0.5);
      this.msgText.setAlpha(1);
      this.msgText.setDepth(110);

      // save part
      this.position = [this.cameras.main.worldView.y + 180, this.cameras.main.worldView.y + 200];
      this.lastPosition = 0;

      this.continueBtn = this.add.bitmapText(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[0], 'atomic', ' Continue ', 16, 1);
      this.continueBtn.tint = 0xFF3B00;
      this.continueBtn.setDepth(110);
      this.continueBtn.setOrigin(0.5, 0.5);

      this.saveGameBtn = this.add.bitmapText(this.cameras.main.worldView.x + U.WIDTH / 4, this.position[1], 'atomic', '      Save ', 16, 1);
      this.saveGameBtn.tint = 0xFF3B00;
      this.saveGameBtn.setDepth(110);
      this.saveGameBtn.setOrigin(0.85, 0.5);

      this.head = this.add.image(this.cameras.main.worldView.x + U.WIDTH / 4 - 60, this.position[0], 'head');
      this.head.setOrigin(0.5, 0.65);
      this.head.displayWidth = 15;
      this.head.displayHeight = 15;
      this.head.setAlpha(1);
      this.head.setDepth(110);
    }
  }

  choose() {
    if (this.player.state.pause) {
      if (this.lastPosition === 1) {
        this.lastPosition = 0;
      } else {
        this.lastPosition += 1;
      }
      this.head.y = this.position[this.lastPosition];
    }
  }

  launch() {
    if (this.player.state.pause) {
      if (this.lastPosition === 0) {
        this.player.state.pause = false;
        this.scene.scene.physics.resume();
        this.player.anims.resume(this.player.anims.currentFrame);
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
  }

  saveGame() {
    this.player.inventory.savedPositionX = this.player.x;
    this.player.inventory.savedPositionY = this.player.y;
    const s = JSON.stringify(this.player.inventory);
    localStorage.setItem('k438b', s);
  }

  loadGame() {
    const l = localStorage.getItem('k438b');
    this.player.inventory = JSON.parse(l);
    this.player.x = this.player.inventory.savedPositionX;
    this.player.y = this.player.inventory.savedPositionY;
  }

  shakeCamera() {
    this.cameras.main.shake(100, 0.005);
  }

  flashCamera() {
    this.cameras.main.flash(1000);
  }

  playerIsHit(elm) {
    if (!this.playerHurt) {
      this.playerHurt = true; // flag
      this.player.animate('hurt');
      this.player.inventory.life -= elm.state.damage;
      this.playerFlashTween = this.tweens.add({
        targets: this.player,
        ease: 'Sine.easeInOut',
        duration: 200,
        delay: 0,
        repeat: 5,
        yoyo: true,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.player.alpha = 1;
          this.playerHurt = false;
          this.player.animate('stand');
        },
      });
      // if player is dead, launch deadth sequence
      if (this.player.inventory.life <= 0) {
        this.player.dead = true;
        this.playerDead = true;
        this.physics.pause();
        this.input.enabled = false;
        this.player.anims.pause(this.player.anims.currentFrame);
        this.playerFlashTween.stop();
        this.player.inventory.life = 0;
        this.player.setTintFill(0xFFFFFF);
        this.player.setDepth(2000);

        this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel');
        this.round.setOrigin(0.5, 0.5);
        this.round.setDepth(1000);
        this.round.displayWidth = 2;
        this.round.displayHeight = 2;

        this.tween = this.tweens.add({
          targets: this.round,
          ease: 'Sine.easeInOut',
          scaleX: 1,
          scaleY: 1,
          duration: 2000,
          delay: 2000,
          onComplete: () => {
            this.input.enabled = true;
            this.playerIsDead();
          },
        });
      }
      this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
    }
  }

  playerIsDead() {
    this.scene.start('gameOver');
  }

  enemyIsHit(bull, elm) {
    if (!this.getFired) {
      this.getFired = true;
      this.player.bulletKill(bull);
      elm.looseLife(this.player.inventory.gunDamage);
      elm.setTintFill(0xFFFFFF);
      this.time.addEvent({
        delay: 50,
        callback: () => {
          elm.clearTint();
        },
      });
      this.hitTimer = this.time.addEvent({
        delay: 120,
        callback: () => {
          this.getFired = false;
        },
      });
      if (elm.state.life < 0) {
        elm.clearTint();
        elm.anims.play('enemyExplode');
        elm.on('animationcomplete', (currentAnim, currentFramee, sprite) => {
          sprite.destroy();
        });
      }
    }
  }
}
