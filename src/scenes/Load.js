import { Scene } from 'phaser';
import U from '../utils/usefull';
import getConfigKeys from '../utils/getConfigKeys';
import head from '../assets/head.png';
import bip from '../assets/sounds/bip.ogg';

export default class LoadSavedGame extends Scene {
  constructor() {
    super({ key: 'loadSavedGame' });
  }

  preload() {
    this.load.image('head', head);
    this.load.audio('bip', bip);
  }

  create() {
    this.position = [];
    this.lastPosition = 0;

    this.background = this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    if (localStorage.getItem('k438b')) {
      this.position = [128, 256, 384];
      this.loadGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' Load Game ', 48, 1);
      this.deleteSavedGame = this.add.bitmapText(U.WIDTH / 4, this.position[2], 'atomic', ' Delete Game ', 48, 1);
    } else {
      this.position = [128, 256];
      this.newGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' New Game ', 48, 1);
    }
    if (!localStorage.getItem('d')) {
      localStorage.setItem('d', '0');
    }
    if (!localStorage.getItem('e')) {
      localStorage.setItem('e', '0');
    }

    const keysOptions = getConfigKeys();

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes[keysOptions[2]],
      down: Phaser.Input.Keyboard.KeyCodes[keysOptions[3]],
      fire: Phaser.Input.Keyboard.KeyCodes[keysOptions[4]],
    });

    this.options = this.add.bitmapText(U.WIDTH / 4, this.position[1], 'atomic', ' Options ', 48, 1);

    this.head = this.add.image(U.WIDTH / 4 - 50, this.position[0], 'head')
      .setOrigin(0, 0)
      .setDisplaySize(50, 50);

    this.input.keyboard.on('keydown', (event) => {
      if (this.keys.down.isDown && event.key === this.keys.down.originalEvent.key) {
        this.sound.play('bip', { volume: 0.2 });
        this.choose(1);
      } else if (this.keys.up.isDown && event.key === this.keys.up.originalEvent.key) {
        this.sound.play('bip', { volume: 0.2 });
        this.choose(-1);
      } else if (this.keys.fire.isDown && event.key === this.keys.fire.originalEvent.key) {
        this.sound.play('bip2', { volume: 0.1 });
        this.launch();
      }
    });

    // fading the scene from black
    this.cameras.main.fadeIn(500);
  }

  choose(count) {
    if (this.lastPosition === this.position.length - 1 && count > 0) {
      this.lastPosition = 0;
    } else if (this.lastPosition === 0 && count < 0) {
      this.lastPosition = this.position.length - 1;
    } else {
      this.lastPosition += count;
    }
    this.head.y = this.position[this.lastPosition];
  }

  launch() {
    if (this.lastPosition === 0 && this.loadGame) {
      this.scene.start('playLvl1', { loadSavedGame: true });
      this.scene.start('dashBoard');
    } else if (this.lastPosition === 0) {
      this.scene.start('playLvl1');
      this.scene.start('dashBoard');
    }
    if (this.lastPosition === 1) {
      this.scene.start('Options');
    }
    if (this.lastPosition === 2) {
      localStorage.removeItem('k438b');
      localStorage.removeItem('d');
      localStorage.removeItem('e');
      localStorage.removeItem('time');
      this.sound.play('bip2', { volume: 0.1 });
      window.location.reload(false);
    }
  }
}
