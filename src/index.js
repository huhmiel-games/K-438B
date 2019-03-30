import Phaser from 'phaser';
import U from './utils/usefull';

import Huhmiel from './scenes/Huhmiel';
import bootGame from './scenes/BootGame';
import LoadSavedGame from './scenes/Load';
import playLvl1 from './scenes/PlayLvl1';
import gameOver from './scenes/GameOver';
import DashBoard from './scenes/dashBoard';

// function preload() {
//   const progressBar = this.add.graphics();
//   const progressBox = this.add.graphics();
//   progressBox.fillStyle(0x222222, 0.8);
//   progressBox.fillRect(240, 270, 320, 50);

//   const { width, height } = this.cameras.main;
//   const loadingText = this.make.text({
//     x: width / 2,
//     y: height / 2 - 50,
//     text: 'Loading...',
//     style: {
//       font: '20px monospace',
//       fill: '#ffffff',
//     },
//   });
//   loadingText.setOrigin(0.5, 0.5);

//   const percentText = this.make.text({
//     x: width / 2,
//     y: height / 2 - 5,
//     text: '0%',
//     style: {
//       font: '18px monospace',
//       fill: '#ffffff',
//     },
//   });
//   percentText.setOrigin(0.5, 0.5);

//   const assetText = this.make.text({
//     x: width / 2,
//     y: height / 2 + 50,
//     text: '',
//     style: {
//       font: '18px monospace',
//       fill: '#ffffff',
//     },
//   });

//   assetText.setOrigin(0.5, 0.5);

//   this.load.on('progress', (value) => {
//     percentText.setText(`${parseInt(value * 100, 10)} %`);
//     progressBar.clear();
//     progressBar.fillStyle(0xffffff, 1);
//     progressBar.fillRect(250, 280, 300 * value, 30);
//   });

//   this.load.on('fileprogress', (file) => {
//     assetText.setText(`Loading asset: ${file.key}`);
//   });

//   this.load.on('complete', () => {
//     progressBar.destroy();
//     progressBox.destroy();
//     loadingText.destroy();
//     percentText.destroy();
//     assetText.destroy();
//   });

//   this.load.image('logo', 'zenvalogo.png');
//   for (let i = 0; i < 5000; i += 1) {
//     this.load.image(`logo${i}`, 'zenvalogo.png');
//   }
// }

// function create() {
//   this.add.image(400, 300, 'logo');
// }

const config = {
  type: Phaser.AUTO,
  parent: 'gamecanvas',
  width: U.WIDTH,
  height: U.HEIGHT,
  mode: Phaser.DOM.NO_ZOOM, // FIT,
  roundPixels: false, // seems to not work
  pixelArt: true, // just a test but seems very good
  physics: {
    default: 'arcade',
    arcade: {
      tileBias: 20,
      gravity: { y: 100 }, // will affect our player sprite
      debug: true, // change if you need
      debugShowBody: true,
      debugShowStaticBody: false,
    },
  },
  scene: [bootGame, LoadSavedGame, playLvl1, DashBoard, gameOver, Huhmiel],
};

const game = new Phaser.Game(config);
