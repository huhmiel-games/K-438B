import { Scene } from 'phaser';
import U from '../utils/usefull';
import atomicsc from '../assets/atomicsc.png';
import atomicscXML from '../assets/atomicsc.xml';
import background from '../assets/menuBackgound.png';
import bip2 from '../assets/sounds/piou.ogg';
import bip1 from '../assets/sounds/walk.ogg';
import bip3 from '../assets/sounds/noname.ogg';

export default class EndGame extends Scene {
  constructor() {
    super('endGame');
  }

  preload() {
    this.load.bitmapFont('atomic', atomicsc, atomicscXML);
    this.load.image('background', background);
    this.load.audio('bip2', bip2);
    this.load.audio('bip1', bip1);
    this.load.audio('bip3', bip3);
  }

  create() {
    let en = localStorage.getItem('e');
    en = JSON.parse(en);

    let d = localStorage.getItem('d');
    d = JSON.parse(d);

    let invent = localStorage.getItem('k438b');
    invent = JSON.parse(invent);
    const arr = invent.powerUp.filter(e => e === 1);
    const percent = arr.length * 100 / 22;

    let t = localStorage.getItem('time');
    t = JSON.parse(t);
    const totalTime = new Date(t).toISOString().substr(11, 8);


    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.displayWidth = U.WIDTH;
    this.background.displayHeight = U.HEIGHT;

    this.text = `
    New transmision-
    As your transmitted data seems promising,-
    we sended a space ship colonise K438b.-
    Our colons will build a landing station-
    for future missions.-
    You can now take holidays... we'll call you soon...-
    to be continued`;
    this.count = 0;
    this.chief = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1);
    this.chief.setOrigin(0.5, 0.5);

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

    this.time.addEvent({
      delay: 25000,
      callback: () => {
        this.tween = this.tweens.add({
          targets: [this.chief],
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

            this.tween = this.tweens.add({
              targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame],
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
        this.tween = this.tweens.add({
          targets: [this.congrat, this.enemiesKilled, this.death, this.items, this.timeGame],
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
  }

  credits() {
    this.text = 'Credits---Designer:-Philippe Pereira---Graphics:-Luis Zuno---Boss Graphics:-Mobile Game Graphics---Programming:-Philippe Pereira---Game Engine:-Phaser 3---Sound Programming:-Philippe Pereira---Music:-sonniss---Boss Music:-Patrick de Arteaga-- -- -- -- -- -- -- -- --Thanks for playing-- -- -- -- -- -- -- -- -- -- --THE END-- -- -- -- -- -- -- -- --';
    this.count = 0;
    this.chief = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1);
    this.chief.setOrigin(0.5, 0.8);
    this.chief.alpha = 1;

    this.time.addEvent({
      delay: 80,
      repeat: this.text.length - 1,
      callback: () => {
        if (this.text[this.count] === '-') {
          this.chief.text += '\n';
          this.count += 1;
        } else {
          this.chief.text += this.text[this.count];
          this.count += 1;
        }
      },
    });
  }
}
