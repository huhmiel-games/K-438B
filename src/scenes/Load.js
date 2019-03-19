import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from "../assets/menuBackgound.png";
import head from '../assets/head.png';

export default class LoadSavedGame extends Scene {
  constructor() {
    super('loadSavedGame')
  }
  
  preload() {
    this.load.image("background", background);
    this.load.image("head", head);
  }

  create() {
    this.position = [128, 256, 384];
    this.lastPosition = 0;

    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;
    this.background.alpha = 0.5;
    
    this.loadGame = this.add.text(U.WIDTH/4, this.position[0], " L o a d  G a m e ", { fill: "#FF3B00",  fontSize: '50px', align: 'left' });
    this.newGame = this.add.text(U.WIDTH/4, this.position[1], " N e w  G a m e ", { fill: "#FF3B00",  fontSize: '50px', align: 'left'});
    this.options = this.add.text(U.WIDTH/4, this.position[2] , " O p t i o n s ", { fill: "#FF3B00",  fontSize: '50px', align: 'left'});

    this.head = this.add.image(U.WIDTH/4 - 50, this.position[0], 'head');
    this.head.setOrigin(0, 0)
    this.head.displayWidth = 50;
    this.head.displayHeight = 50;
    this.head.setAlpha(1);

    this.input.keyboard.on('keydown', (event) => {
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        this.choose()
      }
      if (event.code === 'Enter') {
        this.launch()
      }
    });

    // fading the scene from black
    this.cameras.main.fadeIn(500)
    
    this.scene.stop('bootGame');
  //this.scene.start('playLvl1'); //start lvl while developping
  }

  choose () {
    if (this.lastPosition == 2) {
      this.lastPosition = 0
    } else {
      this.lastPosition += 1;
    }
    this.head.y = this.position[this.lastPosition]
  }

  launch (elm) {
    if (this.lastPosition === 0) {
      console.log('load saved games')
    }
    if (this.lastPosition === 1) {
      this.scene.start('playLvl1')
    }
    if (this.lastPosition === 2) {
      console.log('load options')
    }

  }
}


