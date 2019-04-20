import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from '../assets/menuBackgound3.png';
import atomicsc from '../assets/atomicsc.png';
import atomicscXML from '../assets/atomicsc.xml';
import bip2 from '../assets/sounds/piou.ogg';
import ambient2 from '../assets/music/ambient2.ogg';

// let tween;
// let image;
// let fromColors;
// let toColors;

// function getRandomVertexColors() {
//   // Create a random color for each vertex.
//   // RandomRGB returns a Phaser.Display.Color object with random RGB values.
//   const { RandomRGB } = Phaser.Display.Color;
//   return {
//     topLeft: RandomRGB(),
//     topRight: RandomRGB(),
//     bottomLeft: RandomRGB(),
//     bottomRight: RandomRGB(),
//   };
// }

// function getTintColor(vertex) {
//   // Interpolate between the fromColor and toColor of the current vertex,
//   // using the current tween value.
//   const tint = Phaser.Display.Color.Interpolate.ColorWithColor(
//     fromColors[vertex],
//     toColors[vertex],
//     100,
//     tween.getValue(),
//   );
//   // Interpolate.ColorWithColor returns a Javascript object with
//   // interpolated RGB values. We convert it to a Phaser.Display.Color object
//   // in order to get the integer value of the tint color.
//   return Phaser.Display.Color.ObjectToColor(tint).color;
// }

// function tintTween(fromColors, toColors, callback) {
//   tween = this.tweens.addCounter({
//     from: 0,
//     to: 100,
//     duration: 5000,
//     onUpdate: () => {
//       image.setTint(
//         getTintColor('topLeft'),
//         getTintColor('topRight'),
//         getTintColor('bottomLeft'),
//         getTintColor('bottomRight'),
//       );
//     },
//     onComplete: callback,
//   });
// }

// function initTweens() {
//   fromColors = toColors || fromColors;
//   toColors = getRandomVertexColors();
//   tintTween(
//     fromColors,
//     toColors,
//     initTweens,
//   );
// }

export default class bootGame extends Scene {
  constructor() {
    super('bootGame');
  }

  init() {
    // --> FULLSCREEN MODE
    const startBtn = document.getElementById('fullscreen');
    startBtn.addEventListener('click', () => {
      if (!this.scale.isFullscreen) {
        this.scale.startFullscreen();
      }
    });
  }

  preload() {
    this.load.image('background', background);
    this.load.bitmapFont('atomic', atomicsc, atomicscXML);
    this.load.audio('bip2', bip2);
    this.load.audio('ambient2', ambient2);
  }

  create() {
    // this.input.keyboard.on('keydown_SPACE', () => {
    //   if (!this.scale.isFullscreen) {
    //     this.scale.startFullscreen();
    //   }
    // }, this);
    this.bgimage = this.add.image(0, 0, 'background');
    this.bgimage.setOrigin(0, 0);
    this.bgimage.displayWidth = U.WIDTH;
    this.bgimage.displayHeight = U.HEIGHT;


    // fromColors = getRandomVertexColors();
    // image.setTint(
    //   fromColors.topLeft.color,
    //   fromColors.topRight.color,
    //   fromColors.bottomLeft.color,
    //   fromColors.bottomRight.color,
    // );

    // Bind the scope to tintTween so we can use this.tweens inside it.
    // tintTween = tintTween.bind(this);

    // initTweens();

    this.ambient2 = this.sound.add('ambient2', { volume: 0.5 });

    this.title = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 160, 'atomic', ' K-438 B ', 70, 1);
    this.title.setOrigin(0.5, 0.5);
    this.title.tint = 0xFF3B00;

    this.title2 = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 100, 'atomic', ' Mission : exploration ', 25, 1);
    this.title2.setOrigin(0.5, 0.5);
    this.title2.tint = 0xFF3B00;

    this.text = 'A Dinan Magel adventure';
    this.count = 0;
    this.title3 = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 - 70, 'atomic', '', 20, 1);
    this.title3.setOrigin(0.5, 0.5);

    this.time.addEvent({
      delay: 50,
      repeat: this.text.length - 1,
      callback: () => {
        this.title3.text += this.text[this.count];
        this.count += 1;
      },
    });

    this.start = this.add.bitmapText(U.WIDTH / 2, U.HEIGHT / 2 + 50, 'atomic', 'press fire to start', 24, 1);
    this.start.setOrigin(0.5, 0.5);

    this.input.keyboard.once('keydown', () => {
      this.sound.play('bip2', { volume: 0.1 });
      this.ambient2.stop();
      this.scene.start('intro');
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
    this.ambient2.play();
  }
}
