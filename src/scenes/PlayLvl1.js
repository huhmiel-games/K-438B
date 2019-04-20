import { Scene } from 'phaser';
import Player from '../player/Player';
import PowerUp from '../player/powerUp';
import Crabes from '../enemies/Crabes';
import Guepes from '../enemies/Guepes';
import Jumpers from '../enemies/Jumpers';
import Octopus from '../enemies/Octopus';
import RhinoBeetles from '../enemies/RhinoBeetles';
import Boss1 from '../enemies/Boss1';
import BossFinal from '../enemies/BossFinal';
import Elevators from '../utils/Elevators';
import Doors from '../utils/Doors';
import Lava from '../utils/Lava';
import FireBalls from '../enemies/FireBalls';
import WaterFall from '../utils/WaterFalls';
import U from '../utils/usefull';

// Player
import playerRun from '../assets/spritesheets/player/run.png';
import playerRunShoot from '../assets/spritesheets/player/runShoot.png';
import idle from '../assets/spritesheets/player/idle.png';
import stand from '../assets/spritesheets/player/stand.png';
import jump from '../assets/spritesheets/player/jump.png';
import jumpVertical from '../assets/spritesheets/player/jumpVertical.png';
import duck from '../assets/spritesheets/player/duck.png';
import shootUp from '../assets/spritesheets/player/shootUp.png';
import morphingBall from '../assets/spritesheets/player/morphingBall.png';
// import hurt from '../assets/hurt.png';

// Power Up
import powerupBlue from '../assets/powerupBleu.png';
import powerupYellow from '../assets/powerupJaune.png';
import powerupGreen from '../assets/powerupVert.png';
import powerupRed from '../assets/powerupRouge.png';
import powerUp from '../assets/spritesheets/Fx/power-up.png';

// Enemies
import crabe from '../assets/spritesheets/enemies/crab-walk.png';
import guepe from '../assets/spritesheets/enemies/guepe.png';
import guepe2 from '../assets/spritesheets/enemies/guepe2.png';
import jumper from '../assets/spritesheets/enemies/jumper-idle.png';
import jumper2 from '../assets/spritesheets/enemies/jumper-idle2.png';
import enemyExplode from '../assets/spritesheets/Fx/enemy-death.png';
import octopus from '../assets/spritesheets/enemies/octopus.png';
import fireballs from '../assets/fire-ball.png';
import rhinoBeetle from '../assets/spritesheets/enemies/rhinoBeetle.png';

// boss 1
import boss1wallfront from '../assets/boss1wallfront.png';
import boss1Walk from '../assets/spritesheets/enemies/boss1walk.png';
import boss1Run from '../assets/spritesheets/enemies/boss1run.png';
import boss1Crouch from '../assets/spritesheets/enemies/boss1crouch.png';
import boss1Attack from '../assets/spritesheets/enemies/boss1attack.png';
import boss1Jump from '../assets/spritesheets/enemies/boss1jump.png';
import boss1Hit from '../assets/spritesheets/enemies/boss1hit.png';

// final boss
import bosstest from '../assets/spritesheets/enemies/bossAttack.png';
import bosstest2 from '../assets/spritesheets/enemies/bossFly.png';
// Map
import tiles from '../assets/environment/layers/tilesets.png';
import map from '../maps/map1.json';

// Various
import bullet from '../assets/spritesheets/Fx/shot.png';
import bomb from '../assets/bomb.png';
import laser from '../assets/laser.png';
import impact from '../assets/spritesheets/Fx/impact.png';
import missile from '../assets/missile.png';
import swell from '../assets/swell.png';
import blackPixel from '../assets/blackPixel.png';
// import saveStation from '../assets/savestation.png';
import lavaPixel from '../assets/lavaPixel.png';
import elevator from '../assets/elevator.png';
import door from '../assets/door.png';
import head from '../assets/head.png';
import whitePixel from '../assets/whitePixel.png';
import lava from '../assets/lava.png';
import lavaFall from '../assets/lava-fall.png';
import waterFall from '../assets/waterfall.png';
import boss1dead from '../assets/boss1dead.png';

import test from '../maps/map1.png';
import mapSol from '../maps/mapSol.png';

// parralax
import paraMiddleground from '../assets/environment/layers/para_middleground.png';
import paraBackground from '../assets/environment/layers/background.png';
import bgLava from '../assets/bgLava.png';

// import sounds fx
import bulletFX from '../assets/sounds/bullet.ogg';
import swellFX from '../assets/sounds/swell.ogg';
import missileFX from '../assets/sounds/missile.ogg';
import laserFX from '../assets/sounds/laser3.ogg';
import impactFX from '../assets/sounds/explo.ogg';
import explo2FX from '../assets/sounds/explo2.ogg';
import enemyImpactFX from '../assets/sounds/enemyHit.ogg';
import playerHitFX from '../assets/sounds/playerHit.ogg';
import morphFX from '../assets/sounds/playerHit2.ogg';
import powerUpFX from '../assets/sounds/powerup.ogg';
import selectFX from '../assets/sounds/select.ogg';
import jumpBoosterFX from '../assets/sounds/jumpboost.ogg';
import getLifeFX from '../assets/sounds/getlife2.ogg';
import runFX from '../assets/sounds/walk.ogg';
import explo3FX from '../assets/sounds/explo3.ogg';
import melo from '../assets/sounds/melo1.ogg';
import playerDead from '../assets/sounds/playerdead.ogg';
import shake from '../assets/sounds/shake3.ogg';
import shake2 from '../assets/sounds/shake4.ogg';
import guepeFX from '../assets/sounds/guepe.ogg';
import grog from '../assets/sounds/grog.ogg';

// import boss1 sounds fx
import cri1 from '../assets/sounds/boss1/cri-001.ogg';
import cri2 from '../assets/sounds/boss1/cri-002.ogg';
import cri3 from '../assets/sounds/boss1/cri-003.ogg';
import cri4 from '../assets/sounds/boss1/cri-004.ogg';
import LetsPlayWithTheDemon from '../assets/music/LetsPlayWithTheDemon.ogg';

// import music
import ambient1 from '../assets/music/ambient1.ogg';
import ambient2 from '../assets/music/ambient2.ogg';
import waterAmbient from '../assets/music/waterAmbiance.ogg';
import ambient3 from '../assets/music/grotte.ogg';

export default class playLvl1 extends Scene {
  constructor() {
    super('playLvl1');
    this.state = {
      displayPowerUpMsg: false,
    };
  }

  // ====================================================================
  preload() {
    // map
    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('map', map);
    this.load.image('test', test);
    this.load.image('mapSol', mapSol);

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
    // this.load.spritesheet('hurt', hurt, { frameWidth: 40, frameHeight: 40 });

    // player bullets
    this.load.spritesheet('bullet', bullet, { frameWidth: 6, frameHeight: 4 });
    this.load.spritesheet('impact', impact, { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('missile', missile, { frameWidth: 18, frameHeight: 10 });
    this.load.spritesheet('bomb', bomb, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('swell', swell, { frameWidth: 12, frameHeight: 12 });
    this.load.image('laser', laser);

    // power up
    this.load.spritesheet('powerupBlue', powerupBlue, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupYellow', powerupYellow, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupGreen', powerupGreen, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerupRed', powerupRed, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('powerUp', powerUp, { frameWidth: 23, frameHeight: 21 });

    // Enemies
    this.load.spritesheet('crabe', crabe, { frameWidth: 48, frameHeight: 32 });
    this.load.spritesheet('guepe', guepe, { frameWidth: 40, frameHeight: 47 });
    this.load.spritesheet('guepe2', guepe2, { frameWidth: 40, frameHeight: 47 });
    this.load.spritesheet('jumper', jumper, { frameWidth: 47, frameHeight: 32 });
    this.load.spritesheet('jumper2', jumper2, { frameWidth: 47, frameHeight: 32 });
    this.load.spritesheet('enemyExplode', enemyExplode, { frameWidth: 67, frameHeight: 48 });
    this.load.spritesheet('octopus', octopus, { frameWidth: 28, frameHeight: 37 });
    this.load.spritesheet('fireball', fireballs, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('rhinobeetle', rhinoBeetle, { frameWidth: 80, frameHeight: 64 });
    // this.enemyGetHited = false;

    // boss
    this.load.image('boss1wallfront', boss1wallfront);
    this.load.spritesheet('boss1walk', boss1Walk, { frameWidth: 184, frameHeight: 136 });
    this.load.spritesheet('boss1run', boss1Run, { frameWidth: 178, frameHeight: 136 });
    this.load.spritesheet('boss1crouch', boss1Crouch, { frameWidth: 185, frameHeight: 136 });
    this.load.spritesheet('boss1attack', boss1Attack, { frameWidth: 188, frameHeight: 136 });
    this.load.spritesheet('boss1hit', boss1Hit, { frameWidth: 153, frameHeight: 136 });
    this.load.spritesheet('boss1jump', boss1Jump, { frameWidth: 172, frameHeight: 179 });

    // final boss
    this.load.spritesheet('bossFinal', bosstest, { frameWidth: 192, frameHeight: 240 });
    this.load.spritesheet('bossFinal2', bosstest2, { frameWidth: 192, frameHeight: 240 });
    // various map items
    // this.load.spritesheet('savestation', saveStation, { frameWidth: 40, frameHeight: 60 });
    this.load.image('head', head);
    this.load.image('elevator', elevator);
    this.load.image('door', door);
    this.load.spritesheet('lava', lava, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('lavaFall', lavaFall, { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('waterFall', waterFall, { frameWidth: 16, frameHeight: 16 });
    this.load.image('blackPixel', blackPixel);
    this.load.image('whitePixel', whitePixel);
    this.load.image('lavaPixel', lavaPixel);
    this.load.image('boss1dead', boss1dead);

    // parralax
    this.load.image('para_middle', paraMiddleground);
    this.load.image('para_back', paraBackground);
    this.load.image('bgLava', bgLava);

    // sounds
    this.load.audio('bullet', bulletFX);
    this.load.audio('swell', swellFX);
    this.load.audio('missile', missileFX);
    this.load.audio('laser', laserFX);
    this.load.audio('impact', impactFX);
    this.load.audio('explo2', explo2FX);
    this.load.audio('explo3', explo3FX);
    this.load.audio('enemyHit', enemyImpactFX);
    this.load.audio('playerHit', playerHitFX);
    this.load.audio('powerUp', powerUpFX);
    this.load.audio('select', selectFX);
    this.load.audio('jumpBooster', jumpBoosterFX);
    this.load.audio('getLife', getLifeFX);
    this.load.audio('run', runFX);
    this.load.audio('morph', morphFX);
    this.load.audio('melo', melo);
    this.load.audio('playerDead', playerDead);
    this.load.audio('shake', shake);
    this.load.audio('shake2', shake2);
    this.load.audio('guepe', guepeFX);
    this.load.audio('jumpers', grog);

    // sounds boss1
    this.load.audio('cri1', cri1);
    this.load.audio('cri2', cri2);
    this.load.audio('cri3', cri3);
    this.load.audio('cri4', cri4);
    this.load.audio('LetsPlayWithTheDemon', LetsPlayWithTheDemon);
    // music
    this.load.audio('ambient1', ambient1);
    this.load.audio('ambient2', ambient2);
    this.load.audio('ambient3', ambient3);
    this.load.audio('waterAmbient', waterAmbient);
  }

  // ====================================================================
  create() {
    this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('tileground', 'tiles', 16, 16);

    this.firstTimestamp = new Date().getTime();
    if (!localStorage.getItem('time')) {
      localStorage.setItem('time', 0);
    }

    this.playerFlashTween = null;

    this.para_back = this.add.image(0, 0, 'para_back')
      .setDepth(0)
      .setScrollFactor(0.1)
      .setOrigin(0, 0);
    this.para_back.displayWidth = 800;
    this.para_back.displayHeight = 512;

    this.para_middle = this.add.image(0, 0, 'para_middle')
      .setDepth(3)
      .setScrollFactor(0.5)
      .setOrigin(0, 0);
    this.para_middle.displayWidth = 2048;
    this.para_middle.displayHeight = 1024;

    this.para_lava = this.add.image(0, 880, 'bgLava')
      .setDepth(5)
      .setScrollFactor(0.5)
      .setOrigin(0, 0);
    this.para_lava.displayWidth = 1600;
    this.para_lava.displayHeight = 1200;

    // ====================================================================
    // GAMEPAD SUPPORT
    // no support yet, use qjoypad

    // ====================================================================
    // LAYERS

    this.backLayer = this.map.createDynamicLayer('back', this.tileset, 0, 0)
      .setDepth(4);
    this.middleLayer = this.map.createDynamicLayer('middle', this.tileset, 0, 0);
    this.middleLayer.setDepth(5);
    this.middleLayer2 = this.map.createDynamicLayer('middle2', this.tileset, 0, 0);
    this.middleLayer2.setDepth(10);
    this.statue = this.map.createDynamicLayer('statue', this.tileset, 0, 0);
    this.statue.setDepth(98);
    this.eau = this.map.createDynamicLayer('eau', this.tileset, 0, 0);
    this.eau.setDepth(99);
    this.solLayer = this.map.createDynamicLayer('sol', this.tileset, 0, 0);
    this.solLayer.setDepth(100);
    // this.solLayer.alpha = 0;
    this.frontLayer = this.map.createDynamicLayer('front', this.tileset, 0, 0);
    this.frontLayer.setDepth(106);
    // this.frontLayer.alpha = 0;

    // ====================================================================
    // player in water effect
    this.waterAmbientMusic = this.sound.add('waterAmbient', { volume: 0.6 });
    this.solLayer.setTileLocationCallback(2, 34, 26, 18, (e) => {
      if (e === this.player) {
        this.player.onWater = true;
        this.player.setDepth(98);
        if (!this.waterAmbientMusic.isPlaying) {
          this.waterAmbientMusic.play();
        }
      }
    }, this);
    this.solLayer.setTileLocationCallback(30, 31, 1, 21, () => {
      this.player.onWater = false;
      this.player.setDepth(105);
      this.waterAmbientMusic.stop();
    }, this);
    this.solLayer.setTileLocationCallback(2, 53, 29, 1, () => {
      this.player.onWater = false;
      this.player.setDepth(105);
      this.waterAmbientMusic.stop();
    }, this);

    // ====================================================================
    // AMBIENT MUSIC
    this.ambient1 = this.sound.add('ambient1', { volume: 0.2 });
    this.ambient2 = this.sound.add('ambient2', { volume: 0.1 });
    this.ambient3 = this.sound.add('ambient3', { volume: 0.1 });

    // ====================================================================

    // ====================================================================
    // PLAYER SECTION
    this.player = new Player(this, 1924, 158, { key: 'player' });
    this.playerHurt = false;
    this.player.body.setSize(15, 35, 6, 11);
    // this.player.body.allowGravity = false;

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10, first: 0 }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'walkShoot',
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 9, first: 0 }),
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
      frames: this.anims.generateFrameNumbers('playerShoot', { start: 0, end: 9, first: 0 }),
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
      frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 5, first: 0 }),
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
      frames: this.anims.generateFrameNumbers('morphingBall', { start: 0, end: 3, first: 0 }),
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'morphingBallIdle',
      frames: this.anims.generateFrameNumbers('morphingBall', { start: 0, end: 0, first: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    // this.anims.create({
    //   key: 'hurt',
    //   frames: this.anims.generateFrameNumbers('hurt', { start: 0, end: 2, first: 0 }),
    //   frameRate: 16,
    //   repeat: 0,
    // });

    // player walk and run sounds
    this.walkplay = false;
    this.walkk = this.sound.add('run', { volume: 0.8 });
    this.player.on('animationupdate', () => {
      if (this.player.anims.currentAnim.key === 'runShoot' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: 150,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
      if (this.player.anims.currentAnim.key === 'walkShoot' && !this.walkplay && this.player.body.blocked.down) {
        this.walkplay = true;
        this.walkk.play();
        this.time.addEvent({
          delay: 250,
          callback: () => {
            this.walkplay = false;
          },
        });
      }
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

    // player missiles
    this.player.missiles = this.physics.add.group({
      defaultKey: 'missile',
      maxSize: 1,
      allowGravity: false,
      createIfNull: true,
    });
    this.anims.create({
      key: 'missile',
      frames: this.anims.generateFrameNumbers('missile', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    // player swell
    this.player.swells = this.physics.add.group({
      defaultKey: 'swell',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });
    this.anims.create({
      key: 'swell',
      frames: this.anims.generateFrameNumbers('swell', { start: 0, end: 7, first: 0 }),
      frameRate: 24,
      repeat: -1,
    });

    // player morphing bomb
    this.player.bombs = this.physics.add.group({
      defaultKey: 'bomb',
      maxSize: 3,
      allowGravity: false,
      createIfNull: true,
    });
    this.anims.create({
      key: 'bomb',
      frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 1, first: 0 }),
      frameRate: 1,
      repeat: -1,
    });
    this.anims.create({
      key: 'impactBomb',
      frames: this.anims.generateFrameNumbers('impact', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      repeat: 0,
    });

    // player laser
    this.player.lasers = this.physics.add.group({
      defaultKey: 'laser',
      maxSize: 10,
      allowGravity: false,
      createIfNull: true,
    });

    // ====================================================================
    // chargement de la sauvegarde
    if (this.data.systems.settings.data.loadSavedGame) {
      this.loadGame();
    }
    if (!localStorage.getItem('k438b')) {
      this.transmission('New transmision-A problem occured during-the material transfer on planet-Sorry for inconvenience.');
      this.saveGame();
    }
    // ====================================================================
    // SECTION POWER-UP
    this.anims.create({
      key: 'powerupYellow',
      frames: this.anims.generateFrameNumbers('powerupYellow', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupBlue',
      frames: this.anims.generateFrameNumbers('powerupBlue', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupRed',
      frames: this.anims.generateFrameNumbers('powerupRed', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerupGreen',
      frames: this.anims.generateFrameNumbers('powerupGreen', { start: 0, end: 5, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'powerUp',
      frames: this.anims.generateFrameNumbers('powerUp', { start: 0, end: 6, first: 0 }),
      frameRate: 10,
      yoyo: true,
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
    this.giveLifeGroup = [];
    // ====================================================================
    // SECTION ENEMIES
    // explode animation
    this.anims.create({
      key: 'enemyExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'bossExplode',
      frames: this.anims.generateFrameNumbers('enemyExplode', { start: 0, end: 5, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: 10,
    });
    this.explodeSprite = this.add.group({
      defaultKey: 'transparentPixel',
      maxSize: 30,
      allowGravity: false,
      createIfNull: true,
    });
    // anims enemies
    this.anims.create({
      key: 'crabe',
      frames: this.anims.generateFrameNumbers('crabe', { start: 0, end: 3, first: 0 }),
      frameRate: 8,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'guepe',
      frames: this.anims.generateFrameNumbers('guepe', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'guepe2',
      frames: this.anims.generateFrameNumbers('guepe2', { start: 0, end: 2, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper1Idle',
      frames: this.anims.generateFrameNumbers('jumper', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper1Jump',
      frames: this.anims.generateFrameNumbers('jumper', { start: 4, end: 4, first: 4 }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'jumper2Idle',
      frames: this.anims.generateFrameNumbers('jumper2', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'jumper2Jump',
      frames: this.anims.generateFrameNumbers('jumper2', { start: 4, end: 4, first: 4 }),
      frameRate: 10,
      yoyo: false,
      repeat: 0,
    });
    this.anims.create({
      key: 'octopus',
      frames: this.anims.generateFrameNumbers('octopus', { start: 0, end: 3, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'octopusIdle',
      frames: this.anims.generateFrameNumbers('octopus', { start: 2, end: 2, first: 2 }),
      frameRate: 1,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'fireball',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 2, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'rhinoWalk',
      frames: this.anims.generateFrameNumbers('rhinobeetle', { start: 0, end: 2, first: 0 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'rhinoBall',
      frames: this.anims.generateFrameNumbers('rhinobeetle', { start: 3, end: 6, first: 3 }),
      frameRate: 5,
      yoyo: false,
      repeat: -1,
    });
    this.enemyGroup = [];
    // the crabs
    this.map.objects[1].objects.forEach((element) => {
      this[element.name] = new Crabes(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].body.setSize(16, 16);
      this[element.name].animate(element.properties.key, true);
      this.enemyGroup.push(this[element.name]);
    });
    // the wasps
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
    // the jumpers
    this.map.objects[4].objects.forEach((element) => {
      this[element.name] = new Jumpers(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].setScale(2, 2);
      this.enemyGroup.push(this[element.name]);
    });
    // the octopus
    this.map.objects[9].objects.forEach((element) => {
      this[element.name] = new Octopus(this, element.x, element.y - 16, {
        key: element.properties.key,
        life: element.properties.life,
        damage: element.properties.damage,
      });
      this[element.name].setScale(2, 2);
      this.enemyGroup.push(this[element.name]);
    });
    // the rhinobeetles
    this.loadRhino = false;
    if (!this.player.inventory.rhino) {
      this.solLayer.setTileLocationCallback(53, 103, 1, 8, (e) => {
        if (e === this.player && !this.loadRhino) {
          this.loadRhino = true;
          this.map.objects[11].objects.forEach((element) => {
            this[element.name] = new RhinoBeetles(this, element.x, element.y - 16, {
              key: element.properties.key,
              life: element.properties.life,
              damage: element.properties.damage,
            });
            this.enemyGroup.push(this[element.name]);
          });
        }
      }, this);
    }

    // ====================================================================
    // BOSS 1
    this.anims.create({
      key: 'boss1walk',
      frames: this.anims.generateFrameNumbers('boss1walk', { start: 0, end: 13, first: 0 }),
      frameRate: 40,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'boss1run',
      frames: this.anims.generateFrameNumbers('boss1run', { start: 0, end: 9, first: 0 }),
      frameRate: 20,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'boss1hit',
      frames: this.anims.generateFrameNumbers('boss1hit', { start: 0, end: 8, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'boss1crouch',
      frames: this.anims.generateFrameNumbers('boss1crouch', { start: 0, end: 13, first: 0 }),
      frameRate: 40,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'boss1attack',
      frames: this.anims.generateFrameNumbers('boss1attack', { start: 0, end: 8, first: 0 }),
      frameRate: 15,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'boss1jump',
      frames: this.anims.generateFrameNumbers('boss1jump', { start: 0, end: 18, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.boss1started = false;
    this.bossMusic = this.sound.add('LetsPlayWithTheDemon', { volume: 0.2 });
    if (!this.player.inventory.boss1) {
      this.solLayer.setTileLocationCallback(78, 77, 1, 3, (e) => {
        if (!this.boss1started && e === this.player && !this.player.inventory.boss1) {
          this.boss1BattlePrep();
        }
      }, this);
      this.solLayer.setTileLocationCallback(109, 86, 3, 3, (e) => {
        if (e === this.player && !this.player.inventory.boss1) {
          this.boss1Battle();
        }
      }, this);
    }
    // ========================================================================================================================================
    // BOSS FINAL
    this.anims.create({
      key: 'bossFinalAttack',
      frames: this.anims.generateFrameNumbers('bossFinal', { start: 0, end: 7, first: 0 }),
      frameRate: 10,
      yoyo: false,
      repeat: -1,
    });
    this.anims.create({
      key: 'bossFinalIntro',
      frames: this.anims.generateFrameNumbers('bossFinal2', { start: 3, end: 3, first: 3 }),
      frameRate: 1,
      yoyo: false,
      repeat: -1,
    });
    this.bossFinalReady = false;
    this.bossFinalstarted = false;
    if (!this.player.inventory.bossFinal) {
      this.solLayer.setTileLocationCallback(70, 127, 8, 1, (e) => {
        if (!this.bossFinalReady && e === this.player && !this.player.inventory.bossFinal) {
          this.bossFinalBattlePrep();
        }
      }, this);
      this.solLayer.setTileLocationCallback(1, 188, 116, 1, (e) => {
        if (!this.bossFinalReady && e === this.player && !this.player.inventory.bossFinal) {
          this.bossFinalBattlePrep();
        }
      }, this);
    }

    // ====================================================================
    // ELEVATORS
    this.elevatorGroup = [];
    this.map.objects[2].objects.forEach((element) => {
      this[element.name] = new Elevators(this, element.x + 24, element.y, {
        key: element.properties.key,
        up: element.properties.up,
        down: element.properties.down,
        position: element.properties.position,
      });
      this[element.name].displayWidth = 48;
      this[element.name].displayHeight = 16;
      this.elevatorGroup.push(this[element.name]);
    });

    // ====================================================================
    // LAVA
    this.anims.create({
      key: 'lava',
      frames: this.anims.generateFrameNumbers('lava', { start: 0, end: 2, first: 0 }),
      frameRate: 2,
      yoyo: false,
      repeat: -1,
    });
    this.lavaGroup = [];
    this.map.objects[7].objects.forEach((element) => {
      this[element.name] = new Lava(this, element.x, element.y, {
        key: element.properties.key,
      });
      this[element.name].animate(element.properties.key, true);
      this[element.name].setDepth(11);
      this.lavaGroup.push(this[element.name]);
    });
    // lava fall, same group as lava
    this.anims.create({
      key: 'lavaFall',
      frames: this.anims.generateFrameNumbers('lavaFall', { start: 0, end: 2, first: 0 }),
      frameRate: 3,
      yoyo: false,
      repeat: -1,
    });
    this.map.objects[6].objects.forEach((element) => {
      this[element.name] = new Lava(this, element.x + 16, element.y - 8, {
        key: element.properties.key,
      });
      this[element.name].displayWidth = 32;
      this[element.name].displayHeight = 32;
      this[element.name].setDepth(10);
      // this[element.name].alpha = 0.7;
      this[element.name].animate(element.properties.key, true);
      this.lavaGroup.push(this[element.name]);
    });
    // fireballs, same group as lava
    this.map.objects[10].objects.forEach((element) => {
      this[element.name] = new FireBalls(this, element.x + 16, element.y - 8, {
        key: element.properties.key,
      });
      // this[element.name].animate(element.properties.key, true);
      this.lavaGroup.push(this[element.name]);
    });

    // LAVA RISE
    this.lavaRiseFlag = false;
    this.onSismic = false;
    this.isTheEnd = false; // My only friend, the end

    // ====================================================================
    // WATER FALL
    this.anims.create({
      key: 'waterFall',
      frames: this.anims.generateFrameNumbers('waterFall', { start: 0, end: 2, first: 0 }),
      frameRate: 6,
      yoyo: false,
      repeat: -1,
    });
    this.map.objects[5].objects.forEach((element) => {
      this[element.name] = new WaterFall(this, element.x + 8, element.y - 8, {
        key: element.properties.key,
      });
      this[element.name].displayWidth = 32;
      this[element.name].displayHeight = 16;
      // this[element.name].setDepth(10);
      // this[element.name].alpha = 0.7;
      this[element.name].animate(element.properties.key, true);
      // this.lavaGroup.push(this[element.name]);
    });

    // ====================================================================
    // DOORS
    this.doorGroup = [];
    this.map.objects[8].objects.forEach((element, i) => {
      if (element.properties.side === 'right') {
        this[element.name] = new Doors(this, element.x + 3, element.y + 9, {
          key: element.properties.key,
          side: element.properties.side,
        });
        this[element.name].body.setSize(10, 47);
      }
      if (element.properties.side === 'left') {
        this[element.name] = new Doors(this, element.x + 16, element.y + 9, {
          key: element.properties.key,
          side: element.properties.side,
        });
        this[element.name].flipX = true;
        this[element.name].body.setSize(10, 47);
      }
      this.doorGroup.push(this[element.name]);
      if (i === 7) {
        this[element.name].body.enable = false;
        this[element.name].alpha = 0;
      }
    });

    // ====================================================================

    // ====================================================================
    // CAMERA
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // make the camera follow the player
    // this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    // this.cameras.main.startFollow(this.cameraDolly, true);
    this.cameras.main.startFollow(this.player, true, 0.4, 0.1);
    this.cameras.main.transparent = true;
    // this.cameras.main.setPipeline('GL_LINES')
    // set background color, so the sky is not black
    // this.cameras.main.setBackgroundColor('#3B1158');

    this.cameras.main.setZoom(2);
    // this.cameras.main.fadeIn(1000);

    // ====================================================================
    //    COLLIDERS
    this.solLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, this.solLayer, null);
    this.physics.add.collider(this.doorGroup, this.player, null);
    this.physics.add.collider(this.enemyGroup, this.solLayer, null);
    this.physics.add.collider(this.enemyGroup, this.doorGroup, null);
    this.physics.add.collider(this.lavaGroup, this.solLayer, null);

    this.physics.add.collider([this.player.bullets, this.player.swells], this.solLayer, this.player.bulletKill, null, this.player);
    // this.physics.add.collider(this.player.swells, this.solLayer, this.player.bulletKill, null, this.player);
    this.physics.add.collider(this.player.missiles, this.solLayer, this.player.missileKill, null, this.player);
    this.physics.add.collider(this.player.lasers, this.solLayer, this.player.laserKill, null, this.player);

    // this.physics.add.collider(this.player.bombs, this.player, () => this.player.body.setVelocityY(-this.player.state.speed), null, this.player.bullets);
    this.physics.add.collider([this.player.bullets, this.player.swells], this.doorGroup, (bull, d) => this.player.bulletKill(d), null, this.player.bullets);
    this.physics.add.collider(this.player.lasers, this.doorGroup, (bull, d) => this.player.laserKill(d), null, this.player.lasers);
    // this.physics.add.collider(this.player.swells, this.doorGroup, (bull, d) => this.player.bulletKill(d), null, this.player.lasers);
    this.physics.add.collider(this.player.missiles, this.doorGroup, (d, miss) => this.openDoor(d, miss), null, this);
    this.physics.add.collider(this.elevatorGroup, [this.player, this.player.bullets], elm => elm.handleElevator(this.player), null, this);
    // this.physics.add.collider(this.elevatorGroup, this.player.bullets, elm => elm.handleElevator(this.player), null, this);
    this.physics.add.overlap(this.lavaGroup, this.player, () => this.player.handleLava(), null, this.player);
    this.physics.add.overlap(this.giveLifeGroup, this.player, elm => this.player.getLife(elm), null, this.player);

    this.physics.add.overlap(this.powerups, this.player, elm => this.getPowerUp(elm), null, this);
    this.physics.add.overlap(this.enemyGroup, this.player, elm => this.playerIsHit(elm), null, this);
    this.physics.add.overlap([this.player.bullets, this.player.swells, this.player.missiles, this.player.lasers], this.enemyGroup, (elm, bull) => this.enemyIsHit(bull, elm, this.player), null, this.player);
    // this.physics.add.overlap(this.player.missiles, this.enemyGroup, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);
    // this.physics.add.overlap(this.player.lasers, this.enemyGroup, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);
    // this.physics.add.overlap(this.player.swells, this.enemyGroup, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);

    // ====================================================================

    // //////////////////////////////////////////////////////////////////////
    this.mask = this.make.graphics({ fillStyle: { color: 0xffffff }, add: false })
      .fillCircleShape(new Phaser.Geom.Circle(0, 6, 30));

    this.frontLayer.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
    this.frontLayer.mask.invertAlpha = true;
    // ====================================================================
    // load the dashBoard
    this.events.emit('loadingDone');
  }

  // ====================================================================
  update() {
    this.playMusic();
    // lava rise
    if (this.lavaRise) {
      this.stopLavaRise();
      this.sismicActivity();
    }
    // player sonar
    if (this.player.state.onMorphingBall && this.player.inventory.morphingSonar) {
      this.mask.x = this.player.x;
      this.mask.y = this.player.y;
    } else {
      this.mask.x = -300;
      this.mask.y = -300;
    }
    // player part --> probably not necessary anymore
    // if (!this.player.state.pause || !this.playerDead) {
    //   // if (this.player.body.velocity.x < 0) {
    //   //   this.player.flipX = true;
    //   //   this.player.state.bulletOrientationX = 'left';
    //   //   this.player.state.bulletPositionX = 1;
    //   // } else if (this.player.body.velocity.x > 0) {
    //   //   this.player.flipX = false;
    //   //   this.state.bulletOrientationX = 'right';
    //   //   this.player.state.bulletPositionX = 9;
    //   // }
    //   // bodysize for duck
    //   if (
    //     this.player.keys.down.isDown
    //     && !(this.player.keys.left.isDown || this.player.keys.right.isDown)
    //     && !this.player.state.onMorphingBall
    //     && !this.player.state.jumpBoost) {
    //     // this.player.body.velocity.y = -0.5;
    //     // this.player.body.setSize(10, 23, 8, 10);
    //     // body size for morphing
    //   } else if (this.player.state.onMorphingBall) {
    //     // this.player.body.setSize(12, 12, true);
    //     // this.player.body.setOffset(14, 20);
    //     // body size for jumpBooster
    //   } else if (this.player.state.jumpBoost) {
    //     // this.player.body.setSize(10, 50, true);
    //     // body size for others
    //   } else {
    //     // this.player.body.setSize(10, 35, 8, 10);
    //     // this.player.body.setSize(10, 35, true);
    //     // this.player.body.setOffset(8, 2);
    //   }
    // }

    if (this.state.displayPowerUpMsg) {
      this.msgtext.x = this.player.x;
      this.msgtext.y = this.player.y - 60;
    }
    if (this.modalText) {
      this.modalText.x = this.player.x;
      this.modalText.y = this.player.y - 100;
    }
  }

  playMusic() {
    if (this.player.y <= 1024 && !this.isTheEnd) {
      if (this.ambient2.isPlaying) {
        this.ambient2.stop();
      }
      if (!this.ambient1.isPlaying) {
        this.ambient1.play();
      }
    }
    if (this.player.y <= 2080 && this.player.y > 1024) {
      if (this.ambient1.isPlaying || this.ambient3.isPlaying) {
        this.ambient1.stop();
        this.ambient3.stop();
      }
      if (!this.ambient2.isPlaying) {
        this.ambient2.play();
      }
    }
    if (this.player.y <= 3056 && this.player.y > 2080) {
      if (this.ambient2.isPlaying) {
        this.ambient2.stop();
      }
      if (!this.ambient3.isPlaying && !this.bossMusic.isPlaying) {
        this.ambient3.play();
      }
    }
  }

  sismicActivity() {
    if (!this.onSismic) {
      this.onSismic = true;
      const rdm = Phaser.Math.Between(2000, 5000);
      this.shakeCamera(1000);
      this.sound.play('shake', { volume: 0.5 });
      // this.sound.play('shake2', { volume: 0.5 });
      this.time.addEvent({
        delay: rdm,
        callback: () => {
          this.onSismic = false;
        },
      });
    }
  }

  startLavaRise() {
    this.transmission('ALERT-High sismic activity detected-return to spacehip for evacuation');
    this.solLayer.setTileLocationCallback(119, 3, 1, 9, (e) => {
      if (e === this.player) {
        this.endMission();
      }
    }, this);
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.lavaRise = this.physics.add.image(0, 3072, 'lavaPixel');
        this.lavaRise.setOrigin(0, 0);
        this.lavaRise.displayWidth = 2048;
        this.lavaRise.displayHeight = 3072;
        this.lavaRise.setDepth(99);
        this.lavaRise.alpha = 0.9;
        this.lavaRise.body.velocity.y = -43;
        this.lavaRise.body.isImmovable = true;
        this.lavaRise.body.allowGravity = false;
        this.lavaRise.setOffset(0, 0);
        this.physics.add.overlap(this.player, this.lavaRise, () => this.player.handleLava(), null, this.player);
      },
    });
  }

  endMission() {
    if (!this.isTheEnd) {
      this.isTheEnd = true;
      this.round = this.add.sprite(this.player.x, this.player.y, 'whitePixel');
      this.round.setOrigin(0.5, 0.5);
      this.round.setDepth(1000);
      this.round.displayWidth = 4096;
      this.round.displayHeight = 4096;
      this.round.alpha = 0;
      this.countTime();
      this.ambient1.stop();
      this.tween = this.tweens.add({
        targets: this.round,
        ease: 'Sine.easeInOut',
        duration: 1500,
        delay: 0,
        repeat: 0,
        yoyo: false,
        alpha: {
          getStart: () => 0,
          getEnd: () => 1,
        },
        onComplete: () => {
          this.lavaRise = null;
          this.ambient1.stop();
          this.scene.start('endGame'); // original set to 'bootGame'
        },
      });
    }
  }

  stopLavaRise() {
    if (!this.lavaRiseFlag && this.lavaRise.y > 0) {
      this.lavaRiseFlag = true;
      // this.lavaRise.setVelocityY(-12);
    }
    if (this.lavaRise.y < 0) {
      this.lavaRise.setVelocityY(0);
    }
  }

  displayFullScreen() {
    // fullscreen mode but doesn't work on all browsers
    this.sys.game.canvas[this.sys.game.device.fullscreen.request]();
  }

  // ====================================================================
  getPowerUp(elm) {
    this.state.displayPowerUpMsg = true;
    if (elm.state.ability === 'energy') {
      this.player.addEnergy();
      this.events.emit('setHealth', { life: this.player.inventory.life });
    } else if (elm.state.ability === 'speedfire') {
      this.player.addSpeedFire();
    } else if (elm.state.ability === 'missile' && !this.player.inventory.boss1) {
      this.state.displayPowerUpMsg = false;
      return;
    } else if (elm.state.ability === 'missile' && this.player.inventory.boss1) {
      this.player.addMissile();
    } else if (elm.state.ability === 'laser') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addLaser();
    } else if (elm.state.ability === 'swell') {
      this.player.inventory[elm.state.ability] = true;
      this.player.addSwell();
    } else {
      this.player.inventory[elm.state.ability] = true;
    }
    this.sound.play('powerUp');
    this.player.inventory.powerUp[elm.state.id] = 1;

    this.msgtext = this.add.bitmapText(0, 0, 'atomic', elm.state.text, 12, 1);
    this.msgtext.setOrigin(0.5, 0.5);
    this.msgtext.setAlpha(1);
    this.msgtext.setDepth(210);
    elm.destroy();

    this.fadingTween = this.tweens.add({
      targets: [this.msgtext],
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: 3000,
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

  // ====================================================================
  pauseGame() {
    if (!this.player.state.pause) {
      this.countTime();
      this.player.state.pause = true;
      this.physics.pause();
      this.player.anims.pause(this.player.anims.currentFrame);
      this.msg = this.add.image(this.cameras.main.worldView.x, this.cameras.main.worldView.y, 'blackPixel');
      this.msg.setOrigin(0, 0);
      this.msg.displayWidth = 400;
      this.msg.displayHeight = 256;
      this.msg.setAlpha(0.9);
      this.msg.setDepth(109);

      this.msgText = this.add.bitmapText(this.cameras.main.worldView.x + 200, this.cameras.main.worldView.y + 128, 'atomic', 'PAUSE', 50, 1);
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

  // ====================================================================
  choose() {
    this.player.chooseDone = true;
    if (this.player.state.pause) {
      if (this.lastPosition === 1) {
        this.lastPosition = 0;
      } else {
        this.lastPosition += 1;
      }
      this.head.y = this.position[this.lastPosition];
      this.time.addEvent({
        delay: 300,
        callback: () => {
          this.player.chooseDone = false;
        },
      });
    }
  }

  // ====================================================================
  launch() {
    this.player.chooseDone = true;
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
        this.firstTimestamp = new Date().getTime();
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.player.chooseDone = false;
          },
        });
      }
      if (this.lastPosition === 1) {
        this.saveGame();
        this.time.addEvent({
          delay: 300,
          callback: () => {
            this.player.chooseDone = false;
          },
        });
      }
    }
  }

  // ====================================================================
  saveGame() {
    this.player.inventory.savedPositionX = this.player.x;
    this.player.inventory.savedPositionY = this.player.y;
    const s = JSON.stringify(this.player.inventory);
    localStorage.setItem('k438b', s);
    this.sound.play('melo');
    this.countTime();
  }

  // ====================================================================
  loadGame() {
    const l = localStorage.getItem('k438b');
    this.player.inventory = JSON.parse(l);
    this.player.x = this.player.inventory.savedPositionX;
    this.player.y = this.player.inventory.savedPositionY;
  }

  // ====================================================================
  shakeCamera(e) {
    this.cameras.main.shake(e, 0.005);
  }

  // ====================================================================
  flashCamera() {
    this.cameras.main.flash(1000);
  }

  // ====================================================================
  playerIsHit(elm) {
    if (!this.playerHurt) {
      this.playerHurt = true; // flag
      // this.player.animate('hurt');
      this.sound.play('playerHit');
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
          // this.player.animate('stand');
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
        this.sound.play('playerDead', { volume: 0.2 });

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
    }
    this.events.emit('setHealth', { life: this.player.inventory.life }); // set health dashboard scene
  }

  // ====================================================================
  playerIsDead() {
    let d = localStorage.getItem('d');
    d = JSON.parse(d);
    d += 1;
    localStorage.setItem('d', d);
    this.bossMusic.stop();
    this.ambient1.stop();
    this.ambient2.stop();
    this.ambient3.stop();
    this.countTime();
    if (this.lavaRise) {
      this.lavaRise = null;
    }
    this.scene.start('gameOver');
  }

  countTime() {
    const secondTimestamp = new Date().getTime();
    const result = secondTimestamp - this.firstTimestamp;
    let elapsedTime = localStorage.getItem('time');
    elapsedTime = JSON.parse(elapsedTime);
    localStorage.setItem('time', elapsedTime + result);
    this.firstTimestamp = new Date().getTime();
  }

  // ====================================================================
  enemyIsHit(bull, elm) {
    const el = elm;
    if (!el.getFired) {
      el.getFired = true;
      if (this.player.state.selectedWeapon === 'missile'
      || this.player.state.selectedWeapon === 'bullet'
      || this.player.state.selectedWeapon === 'swell'
      ) {
        this.player[`${this.player.state.selectedWeapon}Kill`](bull);
      }
      if (el === this.rhino1 || el === this.rhino2 || el === this.rhino3) {
        if (el.vulnerable) {
          el.looseLife(this.player.inventory[`${this.player.state.selectedWeapon}Damage`]);
          el.setTintFill(0xDDDDDD);
          this.time.addEvent({
            delay: 50,
            callback: () => {
              el.clearTint();
            },
          });
        }
      } else {
        el.looseLife(this.player.inventory[`${this.player.state.selectedWeapon}Damage`]);
        el.setTintFill(0xDDDDDD);
        this.time.addEvent({
          delay: 50,
          callback: () => {
            el.clearTint();
          },
        });
      }
      this.hitTimer = this.time.addEvent({
        delay: 120,
        callback: () => {
          el.getFired = false;
        },
      });
    }
    if (el.state.life < 0) {
      el.clearTint();
      // kill the enemy
      if (el === this.rhino1 || el === this.rhino2 || el === this.rhino3) {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        this.countDeadEnemies();
        this.player.state.rhinoCount += 1;
        if (this.player.state.rhinoCount === 3) {
          this.player.inventory.rhino = true;
        }
      }
      if (el === this.boss1) {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        this.boss1.setTintFill(0xDDDDDD);
        this.missile.body.reset(this.boss1.x, this.boss1.y);
        this.bossExplode(this.boss1.x, this.boss1.y);
        this.shakeCamera(5000);
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x - 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x - 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x + 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x + 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x - 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.time.addEvent({
          delay: Phaser.Math.Between(500, 1200),
          callback: () => {
            this.bossExplode(this.boss1.x + 20, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
            this.bossExplode(this.boss1.x + 50, Phaser.Math.Between(this.boss1.y - 50, this.boss1.y + 50));
          },
        });
        this.countDeadEnemies();
        this.boss1.anims.pause(this.boss1.anims.currentFrame);
        this.boss1.body.setEnable(false);
        this.boss1.setDepth(0);
        this.time.addEvent({
          delay: 600,
          callback: () => {
            this.tween = this.tweens.add({
              targets: this.boss1,
              ease: 'Sine.easeInOut',
              duration: 1000,
              delay: 0,
              repeat: 0,
              yoyo: false,
              alpha: {
                getStart: () => 1,
                getEnd: () => 0,
              },
              onComplete: () => {
                this.missile.alpha = 1;
                this.player.inventory.boss1 = true;
                this.boss1.destroy();
              },
            });
          },
        });
      } else if (el === this.bossFinal) {
        if (!this.bossFinal.isDead) {
          this.bossFinal.isDead = true;
          this.bossFinal.body.setVelocityY(500);
          this.bossFinal.setTintFill(0xDDDDDD);
          this.bossExplode(this.bossFinal.x, this.bossFinal.y);
          this.shakeCamera(5000);
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x - 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x - 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x + 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x + 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x - 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.time.addEvent({
            delay: Phaser.Math.Between(500, 1200),
            callback: () => {
              this.bossExplode(this.bossFinal.x + 20, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
              this.bossExplode(this.bossFinal.x + 50, Phaser.Math.Between(this.bossFinal.y - 50, this.bossFinal.y + 50));
            },
          });
          this.bossFinal.anims.pause(this.bossFinal.anims.currentFrame);
          this.bossFinal.setDepth(0);
          this.bossFinal.playRoar('cri4');
          this.bossFinal.body.velocity.y = 500;
          this.time.addEvent({
            delay: 600,
            callback: () => {
              this.tween = this.tweens.add({
                targets: this.bossFinal,
                ease: 'Sine.easeInOut',
                duration: 1000,
                delay: 0,
                repeat: 0,
                yoyo: false,
                alpha: {
                  getStart: () => 1,
                  getEnd: () => 0,
                },
                onComplete: () => {
                  this.countDeadEnemies();
                  this.giveLife = this.physics.add.staticSprite(this.bossFinal.x, this.bossFinal.y, 'powerUp');
                  this.giveLife.setDepth(105);
                  this.giveLife.health = el.state.giveLife;
                  this.giveLife.body.setSize(23, 21);
                  this.giveLife.anims.play('powerUp');
                  this.giveLifeGroup.push(this.giveLife);
                  const filteringOptions = {
                    // isNotEmpty: false,
                    isColliding: false,
                    // hasInterestingFace: false
                  };
                  const bossFinalTiles = this.solLayer.getTilesWithinWorldXY(this.bossFinal.x, this.bossFinal.y + 48, 48, 16, filteringOptions);
                  bossFinalTiles.forEach((e) => {
                    if (e.properties.boss) {
                      this.solLayer.removeTileAt(e.x, e.y, true, true);
                    }
                  });
                  this.enemyExplode(117 * 16, 186 * 16);
                  this.solLayer.removeTileAt(117, 186, true, true);
                  this.enemyExplode(117 * 16, 187 * 16);
                  this.solLayer.removeTileAt(117, 187, true, true);
                  this.enemyExplode(117 * 16, 188 * 16);
                  this.solLayer.removeTileAt(117, 188, true, true);
                  this.enemyExplode(118 * 16, 186 * 16);
                  this.solLayer.removeTileAt(118, 186, true, true);
                  this.enemyExplode(118 * 16, 187 * 16);
                  this.solLayer.removeTileAt(118, 187, true, true);
                  this.enemyExplode(118 * 16, 188 * 16);
                  this.solLayer.removeTileAt(118, 188, true, true);
                  this.startLavaRise();
                  this.player.inventory.bossFinal = true;
                  this.bossFinal.destroy();
                },
              });
            },
          });
        }
      } else {
        this.giveLife = this.physics.add.staticSprite(el.x, el.y, 'powerUp');
        this.giveLife.setDepth(105);
        this.giveLife.health = el.state.giveLife;
        this.giveLife.body.setSize(23, 21);
        this.giveLife.anims.play('powerUp');
        this.giveLifeGroup.push(this.giveLife);
        this.enemyExplode(el.x, el.y);
        this.enemyDestroy(el);
      }
    }
  }

  countDeadEnemies() {
    let en = localStorage.getItem('e');
    en = JSON.parse(en);
    en += 1;
    localStorage.setItem('e', en);
  }

  enemyDestroy(e) {
    e.destroy();
    this.countDeadEnemies();
  }

  bossExplode(x, y) {
    this.bossMusic.stop();
    const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', null, true)
      .setDepth(107);
    this.sound.play('explo2', { volume: 0.3 });
    if (exp) {
      exp.anims.play('bossExplode').on('animationrepeat', () => {
        this.sound.play('explo2', { volume: 0.3 });
      }).on('animationcomplete', () => {
        exp.destroy();
      });
    }
  }

  enemyExplode(x, y) {
    const exp = this.explodeSprite.getFirstDead(true, x, y, 'enemyExplode', null, true)
      .setDepth(107);
    // this.explosion = this.add.sprite(x, y, 'whitePixel');
    exp.anims.play('enemyExplode').on('animationcomplete', () => {
      exp.destroy();
    });
  }

  // ====================================================================
  openDoor(d, miss) {
    this.player.missileKill(miss);
    d.destroyDoor();
  }

  // ====================================================================
  // BOSS 1
  boss1BattlePrep() {
    this.boss1started = true;
    this.solLayer.setTileLocationCallback(78, 77, 1, 3, null);
    this.boss1wallfront = this.add.image(1912, 1340, 'boss1wallfront');
    this.boss1wallfront.displayWidthX = 352;
    this.boss1wallfront.displayWidthY = 352;
    this.boss1wallfront.visible = true;
    this.boss1wallfront.setDepth(2000);
    this.boss1 = new Boss1(this, 1930, 1350, { key: 'boss1run' });
    this.boss1.animate('boss1run');
    this.enemyGroup.push(this.boss1);
    this.boss1.body.setVelocity(0, 0);
    this.boss1.body.setEnable(false);
    this.boss1.alpha = 0;
  }

  boss1Battle() {
    if (!this.boss1started) {
      this.boss1BattlePrep();
    }
    this.solLayer.setTileLocationCallback(109, 86, 3, 3, null);
    this.boss1.body.setEnable();
    this.physics.add.collider(this.boss1, this.solLayer, null);
    this.boss1.alpha = 1;
    this.boss1.animate('boss1run');
    this.boss1.intro = true;
    this.door7.body.enable = true;
    this.door7.alpha = 1;
  }

  transmission(txt) {
    let count = 0;
    this.modalText = this.add.bitmapText(this.player.x, this.player.y - 480, 'atomic', '', 6, 1);
    this.modalText.setOrigin(0.5, 0.5);
    this.modalText.setAlpha(1);
    this.modalText.setDepth(201);
    this.time.addEvent({
      delay: 100,
      repeat: txt.length - 1,
      callback: () => {
        if (txt[count] === '-') {
          this.modalText.text += '\n';
          this.modalText.y -= 10;
          this.sound.play('bip3', { volume: 0.5 });
          count += 1;
        } else {
          this.modalText.text += txt[count];
          this.sound.play('bip1', { volume: 1 });
          count += 1;
        }
      },
    });
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.modalText.destroy();
      },
    });
  }

  bossFinalBattlePrep() {
    this.bossFinalReady = true;
    this.bossFinal = new BossFinal(this, 1250, 2950, { key: 'bossFinal' });
    this.bossFinal.animate('bossFinalIntro');
    this.physics.add.collider(this.bossFinal, this.solLayer, null);
    this.physics.add.overlap(this.bossFinal, this.player, elm => this.playerIsHit(elm), null, this);
    this.physics.add.overlap(this.player.bullets, this.bossFinal, (elm, bull) => this.enemyIsHit(bull, elm, this.player), null, this.player);
    this.physics.add.overlap(this.player.missiles, this.bossFinal, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);
    this.physics.add.overlap(this.player.lasers, this.bossFinal, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);
    this.physics.add.overlap(this.player.swells, this.bossFinal, (elm, miss) => this.enemyIsHit(miss, elm, this.player), null, this.player);
    this.bossFinal.flames = this.physics.add.group({
      defaultKey: 'fireball',
      maxSize: 900,
      allowGravity: false,
      createIfNull: true,
    });
    this.physics.add.collider(this.bossFinal.flames, this.solLayer, (elm) => { this.bossFinal.stopFlame(elm); }, null);
    this.physics.add.overlap(this.bossFinal.flames, this.player, () => this.player.handleLava(), null, this.player);
    this.boss1dead = this.add.image(1200, 3010, 'boss1dead');
    this.solLayer.setTileLocationCallback(62, 188, 1, 6, (e) => {
      if (e === this.player && !this.player.inventory.bossFinal && !this.bossFinalstarted) {
        this.bossFinalBattleStart();
      }
    }, this);
    this.solLayer.setTileLocationCallback(70, 127, 8, 1, null);
    this.solLayer.setTileLocationCallback(1, 188, 116, 1, null);
  }

  bossFinalBattleStart() {
    this.bossFinal.playBossMusic();
    this.bossFinal.playRoar('cri1');
    this.time.addEvent({
      delay: 700,
      callback: () => {
        this.bossFinal.animate('bossFinalAttack');
        if (this.bossFinal.y < 2810) {
          this.bossFinal.body.velocity.y = 0;
        } else if (this.bossFinal.y > 2900) {
          this.bossFinal.body.velocity.y = -300;
        } else {
          this.bossFinal.body.velocity.y = 0;
        }
      },
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        this.bossFinalstarted = true;
      },
    });
  }
}
