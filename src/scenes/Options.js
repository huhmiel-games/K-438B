import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound.png';
import head from '../assets/head.png';
import melo from '../assets/sounds/melo1.ogg';
// import atomicsc from '../assets/atomicsc.png';
// import atomicscXML from '../assets/atomicsc.xml';

export default class Options extends Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.load.image('background', background);
    this.load.image('head', head);
    this.load.audio('melo', melo);
    // this.load.bitmapFont('atomic', atomicsc, atomicscXML);
  }

  create() {
    this.position = [60, 100, 140, 180, 220, 260, 300, 340, 380, 430, 470];
    this.lastPosition = 0;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;
    this.background.alpha = 0.5;

    this.keysOptions = [];
    // keysOptions index
    // left: 0,
    // right: 1,
    // up: 2,
    // down: 3,
    // fire: 4,
    // jump: 5,
    // run: 6,
    // select: 7,
    // pause: 8,

    this.title = this.add.bitmapText(U.WIDTH / 2, 15, 'atomic', 'Options', 20, 1);
    this.title.setOrigin(0.5, 0.5);
    this.info = this.add.bitmapText(U.WIDTH / 2, 40, 'atomic', 'Available Keys: A to Z, Cursors, Ctrl, Shift', 12, 1);
    this.info.setOrigin(0.5, 0.5);

    this.keyLeft = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[0], 'atomic', ' Left ', 15, 1);
    this.keyRight = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[1], 'atomic', ' Right ', 15, 1);
    this.keyUp = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[2], 'atomic', ' Up ', 15, 1);
    this.keyDown = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[3], 'atomic', ' Down ', 15, 1);
    this.keyFire = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[4], 'atomic', ' Fire ', 15, 1);
    this.keyJump = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[5], 'atomic', ' Jump ', 15, 1);
    this.keyRun = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[6], 'atomic', ' Run ', 15, 1);
    this.keySelect = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[7], 'atomic', ' Select Weapon ', 15, 1);
    this.keyPause = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[8], 'atomic', ' Pause ', 15, 1);

    this.selectedKey0 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[0], 'atomic', ' LEFT, press enter to change ', 15, 1);
    this.selectedKey1 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[1], 'atomic', ' RIGHT, press enter to change ', 15, 1);
    this.selectedKey2 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[2], 'atomic', ' UP, press enter to change ', 15, 1);
    this.selectedKey3 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[3], 'atomic', ' DOWN, press enter to change ', 15, 1);
    this.selectedKey4 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[4], 'atomic', ' ENTER, press enter to change ', 15, 1);
    this.selectedKey5 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[5], 'atomic', ' SPACE, press enter to change ', 15, 1);
    this.selectedKey6 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[6], 'atomic', ' SHIFT, press enter to change ', 15, 1);
    this.selectedKey7 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[7], 'atomic', ' S, press enter to change ', 15, 1);
    this.selectedKey8 = this.add.bitmapText(U.WIDTH / 4 + 90, this.position[8], 'atomic', ' P, press enter to change ', 15, 1);

    this.saveOptions = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[9], 'atomic', ' Save Options ', 15, 1);
    this.quitOptions = this.add.bitmapText(U.WIDTH / 4 - 120, this.position[10], 'atomic', ' Quit Options ', 15, 1);

    this.head = this.add.image(U.WIDTH / 4 - 150, this.position[0], 'head');
    this.head.setOrigin(0, 0);
    this.head.displayWidth = 20;
    this.head.displayHeight = 20;
    this.head.setAlpha(1);

    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'ArrowDown') {
        this.choose(1);
      }
      if (event.code === 'ArrowUp') {
        this.choose(-1);
      }
      if (event.code === 'Enter') {
        this.assignKey(this.lastPosition);
      }
    });

    if (localStorage.getItem('Options')) {
      const l = localStorage.getItem('Options');
      this.keysOptions = JSON.parse(l);
      this.keysOptions.forEach((elm, i) => {
        this[`selectedKey${i}`].text = elm;
      });
    }

    // fading the scene from black
    this.cameras.main.fadeIn(500);
  }

  choose(count) {
    if (this.lastPosition === 10 && count > 0) {
      this.lastPosition = 0;
    } else if (this.lastPosition === 0 && count < 0) {
      this.lastPosition = 10;
    } else {
      this.lastPosition += count;
    }
    this.head.y = this.position[this.lastPosition];
  }

  assignKey(pos) {
    // save
    if (pos === 9) {
      const s = JSON.stringify(this.keysOptions);
      localStorage.setItem('Options', s);
      this.sound.play('melo');
      return;
    }
    // quit
    if (pos === 10) {
      window.location.reload(false);
      return;
    }
    // assign a key
    const regex = /Key/gm;
    const regex2 = /Arrow/gm;
    const regex3 = /ShiftLeft/gm;
    const regex4 = /ShiftRight/gm;
    const regex5 = /ControlLeft/gm;
    const regex6 = /ControlRight/gm;
    this[`selectedKey${pos}`].text = ' Press a key ';
    this.input.keyboard.once('keydown', (e) => {
      console.log(e)
      let str = e.key.replace(regex, '');
      str = str.replace(regex2, '');
      str = str.replace(regex3, 'SHIFT');
      str = str.replace(regex4, 'SHIFT');
      str = str.replace(regex5, 'CTRL');
      str = str.replace(regex6, 'CTRL');
      this.keysOptions[pos] = str.toUpperCase();
      this[`selectedKey${pos}`].text = str.toUpperCase();
    });
    this.choose(1);
  }
}
