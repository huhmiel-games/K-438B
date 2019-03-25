import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound.png';
import head from '../assets/head.png';
// import atomicsc from '../assets/atomicsc.png';
// import atomicscXML from '../assets/atomicsc.xml';

export default class LoadSavedGame extends Scene {
  constructor() {
    super('loadSavedGame');
  }

  preload() {
    this.load.image('background', background);
    this.load.image('head', head);
    // this.load.bitmapFont('atomic', atomicsc, atomicscXML);
  }

  create() {
    this.position = [128, 256];
    this.lastPosition = 0;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;
    this.background.alpha = 0.5;

    if (localStorage.getItem('k438b')) {
      this.loadGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' Load Game ', 48, 1);
    } else {
      this.newGame = this.add.bitmapText(U.WIDTH / 4, this.position[0], 'atomic', ' New Game ', 48, 1);
    }

    this.options = this.add.bitmapText(U.WIDTH / 4, this.position[1], 'atomic', ' Options ', 48, 1);

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
    this.cameras.main.fadeIn(500);

    // this.scene.stop('bootGame');
  // this.scene.start('playLvl1'); //start lvl while developping
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
    if (this.lastPosition === 0 && this.loadGame) {
      this.scene.start('playLvl1', { loadSavedGame: true });
      this.scene.start('dashBoard');
    } else {
      this.scene.start('playLvl1');
      this.scene.start('dashBoard');
    }
    // if (this.lastPosition === 1) {
    //   this.scene.start('playLvl1')
    // }
    if (this.lastPosition === 1) {
      console.log('load options');
    }
  }
}
