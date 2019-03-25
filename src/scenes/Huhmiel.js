import { Scene } from 'phaser';
import U from '../utils/usefull';
import atomicsc from '../assets/atomicsc.png';
import atomicscXML from '../assets/atomicsc.xml';

export default class Huhmiel extends Scene {
  constructor() {
    super('huhmiel');
  }

  preload() {
    this.load.bitmapFont('atomic', atomicsc, atomicscXML);
  }

  create() {
    this.huhmiel = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2, 'atomic', 'huhmiel games', 50, 1);
    this.huhmiel.setOrigin(0.5, 0.5);
    this.huhmiel.setAlpha(0);

    this.tween = this.tweens.add({
      targets: this.huhmiel,
      ease: 'Sine.easeInOut',
      duration: 2000,
      delay: 1000,
      repeat: 0,
      yoyo: true,
      alpha: {
        getStart: () => 0,
        getEnd: () => 1,
      },
      onComplete: () => {
        this.scene.start('bootGame'); // original set to 'bootGame'
      },
    });
  }
}
