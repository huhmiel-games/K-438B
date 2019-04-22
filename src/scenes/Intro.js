import { Scene } from 'phaser';
import U from '../utils/usefull';
import bip2 from '../assets/sounds/piou.ogg';
import bip1 from '../assets/sounds/walk.ogg';
import bip3 from '../assets/sounds/noname.ogg';

export default class Intro extends Scene {
  constructor() {
    super('intro');
  }

  preload() {
    this.load.audio('bip2', bip2);
    this.load.audio('bip1', bip1);
    this.load.audio('bip3', bip3);
  }

  create() {
    this.background = this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setDisplaySize(U.WIDTH, U.HEIGHT);

    this.text = 'New transmision-A new planet has been discovered-K438 B-We need information about-living organisms and potential threats-More information on site-Good luck!!';
    this.count = 0;
    this.chief = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1)
      .setOrigin(0.5, 0.5);

    this.time.addEvent({
      delay: 100,
      repeat: this.text.length - 1,
      callback: () => {
        if (this.text[this.count] === '-') {
          this.chief.text += '\n';
          this.sound.play('bip3', { volume: 0.5 });
          this.count += 1;
        } else {
          this.chief.text += this.text[this.count];
          this.sound.play('bip1', { volume: 1 });
          this.count += 1;
        }
      },
    });


    this.start = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT - 100, 'atomic', 'press any key to skip', 24, 1)
      .setOrigin(0.5, 0.5);

    this.input.keyboard.once('keydown', () => {
      this.sound.play('bip2', { volume: 0.1 });
      this.scene.start('loadSavedGame');
    });

    this.tween = this.tweens.add({
      targets: this.start,
      ease: 'Sine.easeInOut',
      duration: 1500,
      delay: 0,
      repeat: -1,
      yoyo: true,
      alpha: {
        getStart: () => 0.05,
        getEnd: () => 1,
      },
    });

    this.cameras.main.fadeIn(2000);
  }
}
