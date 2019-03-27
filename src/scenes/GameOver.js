import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound.png';
import head from '../assets/head.png';
import atomicsc from '../assets/atomicsc.png';
import atomicscXML from '../assets/atomicsc.xml';

export default class GameOver extends Scene {
  constructor() {
    super('gameOver');
  }

  preload() {
    this.load.image('background', background);
    this.load.image('head', head);
    this.load.bitmapFont('atomic', atomicsc, atomicscXML);
  }

  create() {
    this.position = [256, 384];
    this.lastPosition = 0;

    this.scene.stop('dashBoard');

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;
    this.background.alpha = 0.5;

    this.title = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 140, 'atomic', ' Game Over ');
    this.title.setFontSize(70);
    this.title.tint = 0xFF3B00;
    this.title.setOrigin(0.5, 0.5);

    this.retry = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' Try again ');
    this.retry.setFontSize(48);

    this.quit = this.add.bitmapText(U.WIDTH / 4, this.position[1], 'atomic', ' Quit ');
    this.quit.setFontSize(48);

    this.head = this.add.image(U.WIDTH / 4 - 50, this.position[0], 'head');
    this.head.setOrigin(0, 0);
    this.head.displayWidth = 50;
    this.head.displayHeight = 50;
    this.head.setAlpha(1);

    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        this.choose();
      }
      if (event.code === 'Enter') {
        this.launch();
      }
    });

    // fading the scene from black
    this.cameras.main.fadeIn(1000);
  }

  choose() {
    if (this.lastPosition === 1) {
      this.lastPosition = 0;
    } else {
      this.lastPosition = 1;
    }
    this.head.y = this.position[this.lastPosition];
  }

  launch() {
    if (this.lastPosition === 0) {
      this.input.keyboard.enabled = true;
      this.scene.start('playLvl1', { loadSavedGame: true });
      this.scene.start('dashBoard');
    }
    if (this.lastPosition === 1) {
      this.scene.start('bootGame');
    }
  }
}
