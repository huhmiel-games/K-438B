import { Scene } from 'phaser';
import U from '../utils/usefull';
import background from "../assets/menuBackgound.png";


var tween;
var image;
var fromColors;
var toColors;

export default class bootGame extends Scene {
  constructor(fromColors) {
    super('bootGame')
    //this.fromColors = null;
  }
  
  // init () {
  //   var canvas = this.sys.game.canvas;
  //   var fullscreen = this.sys.game.device.fullscreen;
    
  
  //   if (!fullscreen.available) {
  //     return;
  //   }
    
  //   // You don't really have to create the buttons here.
  //   // You could add them to HTML instead and then select here.
  
  //   const startBtn = document.createElement('button');
  //   const stopBtn = document.createElement('button');
  
  //   startBtn.textContent = 'Start Fullscreen';
  //   stopBtn.textContent = 'Stop Fullscreen';
  
  //   canvas.parentNode.appendChild(startBtn);
  //   canvas.parentNode.appendChild(stopBtn);
  
  //   startBtn.addEventListener('click', function () {
  //     if (document.fullscreenElement) { return; }
  
  //     canvas[fullscreen.request]();
  //   });
  
  //   stopBtn.addEventListener('click', function () {
  //     document[fullscreen.cancel]();
  //   });
  
  //   this.events.on('shutdown', ()=>{
  //     const canvas = this.sys.game.canvas;
  //     canvas.parentNode.removeChild(startBtn);
  //     canvas.parentNode.removeChild(stopBtn);
  //   }, this);
  // }

  preload() {
    this.load.image("background", background);
  }

  create() {
    image = this.add.image(0, 0, 'background');
    image.setOrigin(0, 0);
    image.displayWidth = U.WIDTH;
    image.displayHeight = U.HEIGHT;
    fromColors = getRandomVertexColors();
    image.setTint(
      fromColors.topLeft.color,
      fromColors.topRight.color,
      fromColors.bottomLeft.color,
      fromColors.bottomRight.color
    );

    // Bind the scope to tintTween so we can use this.tweens inside it.
    tintTween = tintTween.bind(this);

    initTweens();

    this.scene.stop('huhmiel');
    // this.background = this.add.image(0, 0, 'background');
    // this.background.setOrigin(0, 0);
    // this.background.displayWidth = U.WIDTH;
    // this.background.displayHeight = U.HEIGHT;
    // this.background.alpha = 0.5;

    this.title = this.add.text(U.WIDTH/2, U.HEIGHT/2 - 140, " K - 4 3 8 B ", { fill: "#FF3B00", fontFamily: 'Bangers', fontSize: '50px', });
    this.title.setOrigin(0.5, 0.5);
    //this.title.displayWidth = 245;
    //this.title.displayHeight = 50

    this.title2 = this.add.text(U.WIDTH/2, U.HEIGHT/2 - 100, " M i s s i o n :   e x p l o r a t i o n ", { fill: "#FF3B00", fontFamily: 'Bangers', fontSize: '25px', });
    this.title2.setOrigin(0.5, 0.5);
    //this.title2.displayWidth = 150;
    //this.title2.displayHeight = 40;
    //image = this.background;
    //this.background = image;
    this.title3 = this.add.text(U.WIDTH/2, U.HEIGHT/2 - 70, "A Dinan Magel adventure", { fontSize: '20px' });
    this.title3.setOrigin(0.5, 0.5);

    this.start = this.add.text(U.WIDTH/2, U.HEIGHT/2+50, 'press enter to start', { fontSize: '30px' }).setInteractive();
    this.start.setOrigin(0.5, 0.5);
    this.start.on('pointerover', function (event) { /* Do something when the mouse enters */ });
    this.start.on('pointerout', function (event) { /* Do something when the mouse exits. */ });
    this.start.on('pointerdown', () => {
      this.scene.start('playLvl1');
      this.scene.stop()
    }); // Start game on click.

    this.input.keyboard.once('keydown', (event) => {
      //theme.stop();
      //this.sound.add(‘select’).play();
      this.scene.start('loadSavedGame');
    });
    // this.keyObj = this.input.keyboard.addKey('ENTER')
    // this.keyObj.on('down', () => { 
    //   this.scene.start('playLvl1'); 
    // });

    this.tween = this.tweens.add({
      targets: this.start,
      ease: 'Sine.easeInOut',
      duration: 1500,
      delay: 0,
      repeat: -1,
      yoyo: true,
      alpha: {
        getStart: () => 0.05,
        getEnd: () => 1
      }
    });

    this.cameras.main.fadeIn(2000)
  //this.scene.start('playLvl1'); //start lvl while developping
  }
}

function getRandomVertexColors () {
  // Create a random color for each vertex.
  // RandomRGB returns a Phaser.Display.Color object with random RGB values.
  var RandomRGB = Phaser.Display.Color.RandomRGB;
  return {
    topLeft: RandomRGB(),
    topRight: RandomRGB(),
    bottomLeft: RandomRGB(),
    bottomRight: RandomRGB()
  };
}

function getTintColor (vertex) {
  // Interpolate between the fromColor and toColor of the current vertex,
  // using the current tween value.
  var tint = Phaser.Display.Color.Interpolate.ColorWithColor(
    fromColors[vertex],
    toColors[vertex],
    100,
    tween.getValue()
  );
  // Interpolate.ColorWithColor returns a Javascript object with
  // interpolated RGB values. We convert it to a Phaser.Display.Color object
  // in order to get the integer value of the tint color.
  return Phaser.Display.Color.ObjectToColor(tint).color;
}

function tintTween (fromColors, toColors, callback) {
  tween = this.tweens.addCounter({
    from: 0,
    to: 100,
    duration: 5000,
    onUpdate: function () {
      image.setTint(
          getTintColor('topLeft'),
          getTintColor('topRight'),
          getTintColor('bottomLeft'),
          getTintColor('bottomRight')
      );
    },
    onComplete: callback
  });
}

function initTweens ()
{
    fromColors = toColors || fromColors;
    toColors = getRandomVertexColors();
    tintTween(
        fromColors,
        toColors,
        initTweens
    );
}