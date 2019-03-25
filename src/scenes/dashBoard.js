import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';

export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.image('blackpixel', blackPixel);
  }

  create() {
    console.log('dashBoard loaded');
    this.mainScene = this.scene.get('playLvl1');

    // loading
    this.mainScene.events.on('loadingDone', () => {
      this.dashBord = this.add.image(0, 448, 'blackpixel');
      this.dashBord.setOrigin(0, 0);
      this.dashBord.displayWidth = U.WIDTH;
      this.dashBord.displayHeight = 64;

      this.lifeText = this.add.bitmapText(16, 448, 'atomic', 'H e a l t h');
      this.lifeText.setFontSize(16);

      this.Health = this.add.bitmapText(16, 464, 'atomic', '');
      this.Health.setFontSize(32);
      this.Health.text = `${this.mainScene.player.inventory.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`;
      // this.setDepth(3000);
    });

    this.mainScene.events.on('setHealth', (elm) => {
      this.Health.text = `${elm.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`;
    });

    this.mainScene.events.on('addEnergyPack', (elm) => {
      this.Health.text = elm.life;
    });
  }
}
