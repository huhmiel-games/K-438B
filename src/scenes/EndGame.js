import { Scene } from 'phaser';
import U from '../utils/usefull';
import atomicsc from '../assets/atomicsc.png';
import atomicscXML from '../assets/atomicsc.xml';
import background from '../assets/menuBackgound3.png';
import dinan from '../assets/spritesheets/player/dinanMagel.png';
import dinan2 from '../assets/spritesheets/player/dinanMagel2.png';
import bip2 from '../assets/sounds/piou.ogg';
import bip1 from '../assets/sounds/walk.ogg';
import bip3 from '../assets/sounds/noname.ogg';
import melP from '../assets/music/LesRestesDeNiourk_melP.ogg';

export default class EndGame extends Scene {
  constructor() {
    super('endGame');
  }

  preload() {
    this.load.bitmapFont('atomic', atomicsc, atomicscXML);
    this.load.image('background', background);
    this.load.image('dinan', dinan);
    this.load.image('dinan2', dinan2);
    this.load.audio('bip2', bip2);
    this.load.audio('bip1', bip1);
    this.load.audio('bip3', bip3);
    this.load.audio('melP', melP);
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');
    let en = localStorage.getItem('e');
    en = JSON.parse(en);
    let d = localStorage.getItem('d');
    d = JSON.parse(d);

    // const arr = this.mainScene.player.inventory.powerUp.filter(e => e === 1);
    // const percent = Math.floor(arr.length * 100 / 22);
    const percent = 100;

    let t = localStorage.getItem('time');
    t = JSON.parse(t);
    const totalTime = new Date(t).toISOString().substr(11, 8);


    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;

    this.trans = "New transmision-As your transmitted data seems promising,-we sended a space ship colonise K438b.-Our colons will build a landing station-for future missions.-You can now take holidays... we'll call you soon...-to be continued";
    this.cnt = 0;
    this.transDisplay = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1);
    this.transDisplay.setOrigin(0.5, 0.5);

    this.time.addEvent({
      delay: 100,
      repeat: this.trans.length - 1,
      callback: () => {
        if (this.trans[this.cnt] === '-') {
          this.transDisplay.text += '\n';
          this.sound.play('bip3', { volume: 0.5 });
          this.cnt += 1;
        } else {
          this.transDisplay.text += this.trans[this.cnt];
          this.sound.play('bip1', { volume: 1 });
          this.cnt += 1;
        }
      },
    });

    this.time.addEvent({
      delay: 25000,
      callback: () => {
        this.twe = this.tweens.add({
          targets: [this.transDisplay],
          ease: 'Sine.easeInOut',
          duration: 2000,
          delay: 1000,
          repeat: 0,
          yoyo: false,
          alpha: {
            getStart: () => 1,
            getEnd: () => 0,
          },
          onComplete: () => {
            this.sound.play('melP', { volume: 0.5 });
            this.congrat = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 4, 'atomic', 'Congratulation !!\nMission complete', 30, 1);
            this.congrat.setOrigin(0.5, 0.5);
            this.congrat.setAlpha(0);

            this.enemiesKilled = this.add.bitmapText(40, U.HEIGHT / 4 + 60, 'atomic', `Enemies killed: ${en}`, 20, 0);
            this.enemiesKilled.setAlpha(0);

            this.death = this.add.bitmapText(40, U.HEIGHT / 4 + 90, 'atomic', `Death: ${d}`, 20, 0);
            this.death.setAlpha(0);

            this.items = this.add.bitmapText(40, U.HEIGHT / 4 + 120, 'atomic', `Collected items: ${percent}%`, 20, 0);
            this.items.setAlpha(0);

            this.timeGame = this.add.bitmapText(40, U.HEIGHT / 4 + 150, 'atomic', `Total time: ${totalTime}`, 20, 0);
            this.timeGame.setAlpha(0);

            this.dinan = null;
            if (percent === 100 && t < 1800000) {
              this.dinan = this.add.image(650, U.HEIGHT / 2 + 5, 'dinan2');
              this.dinan.displayWidth = 512;
              this.dinan.displayHeight = 512;
              this.dinan.setAlpha(0);
            }
            if (percent === 100 && t < 900000) {
              this.dinan = this.add.image(720, U.HEIGHT / 2 + 5, 'dinan');
              this.dinan.displayWidth = 512;
              this.dinan.displayHeight = 512;
              this.dinan.setAlpha(0);
            }
            this.twee = this.tweens.add({
              targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame, this.dinan],
              ease: 'Sine.easeInOut',
              duration: 2000,
              delay: 1000,
              repeat: 0,
              yoyo: false,
              alpha: {
                getStart: () => 0,
                getEnd: () => 1,
              },
            });
          },
        });
      },
    });

    this.time.addEvent({
      delay: 38000,
      callback: () => {
        this.tweene = this.tweens.add({
          targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame, this.dinan],
          ease: 'Sine.easeInOut',
          duration: 2000,
          delay: 0,
          repeat: 0,
          yoyo: false,
          alpha: {
            getStart: () => 1,
            getEnd: () => 0,
          },
          onComplete: () => {
            this.credits();
          },
        });
      },
    });
    this.cameras.main.fadeIn(5000);
  }

  credits() {
    this.trans = 'Credits---Designer:-Philippe Pereira---Graphics:-Luis Zuno---Boss Graphics:-Mobile Game Graphics---Programming:-Philippe Pereira---Game Engine:-Phaser 3---Sound Programming:-Philippe Pereira---Music:-sonniss-Mel P---Boss Music:-Patrick de Arteaga-- -- -- -- -- -- -- -- --Thanks for playing-- -- -- -- -- -- -- -- -- -- --THE END-- -- -- -- -- -- -- -- --';
    this.cnt = 0;
    this.transDisplay = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1);
    this.transDisplay.setOrigin(0.5, 0.8);
    this.transDisplay.alpha = 1;

    this.time.addEvent({
      delay: 80,
      repeat: this.trans.length - 1,
      callback: () => {
        if (this.trans[this.cnt] === '-') {
          this.transDisplay.text += '\n';
          this.cnt += 1;
        } else {
          this.transDisplay.text += this.trans[this.cnt];
          this.cnt += 1;
        }
      },
    });
  }
}
