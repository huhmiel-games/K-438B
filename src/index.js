import Phaser from "phaser";
import U from './utils/usefull';

import Huhmiel from './scenes/Huhmiel';
import bootGame from './scenes/BootGame';
import LoadSavedGame from './scenes/Load';
import playLvl1 from './scenes/PlayLvl1';
import Msg from './scenes/Msg';



const config = {
  //type: Phaser.AUTO,
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: U.WIDTH,
  height: U.HEIGHT,
  mode: Phaser.DOM.FIT,
  roundPixels: false, // seems to not work
  pixelArt: true, //just a test but seems very good
  physics: {
    default: 'arcade',
    arcade: {
      tileBias: 20,
      gravity: { y: 100 }, // will affect our player sprite
      debug: true// change if you need
    }
  },
  scene: [playLvl1, Huhmiel, bootGame, LoadSavedGame, Msg]
  
};

const game = new Phaser.Game(config);

//game.scene.add("bootGame", bootGame);
//game.scene.add(playLvl1, playLvl1, config, false);
// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");

//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
//   console.log("ok")
//   this.scene.start(bootGame);
// }
