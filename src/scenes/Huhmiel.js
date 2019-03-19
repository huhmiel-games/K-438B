import { Scene } from 'phaser';
import U from '../utils/usefull';

export default class Huhmiel extends Scene {
  constructor(fromColors) {
    super('huhmiel')
    //this.fromColors = null;
  }
  
  preload() {
    
  }

  create() {
    
    this.huhmiel = this.add.text(U.WIDTH/2, U.HEIGHT/2, 'huhmiel games', { fontFamily: 'Arial', fontSize: '40px' }).setInteractive();
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
        getEnd: () => 1
      },
      onComplete: () => {
        this.scene.start('bootGame'); //original set to 'bootGame'
      },
    });
  }
}


