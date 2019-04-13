import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';
import iconMissile from '../assets/iconMissile.png';
import iconLaser from '../assets/iconLaser.png';
import iconSwell from '../assets/iconSwell.png';

export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.image('blackpixel', blackPixel);
    this.load.image('iconMissile', iconMissile);
    this.load.image('iconLaser', iconLaser);
    this.load.image('iconSwell', iconSwell);
  }

  create() {
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

      this.swell = this.add.image(400, 480, 'iconSwell');
      this.swell.displayWidth = 36;
      this.swell.displayHeight = 40;
      this.swell.alpha = 0;

      this.missile = this.add.image(450, 480, 'iconMissile');
      this.missile.displayWidth = 36;
      this.missile.displayHeight = 40;
      this.missile.alpha = 0;

      this.laser = this.add.image(500, 480, 'iconLaser');
      this.laser.displayWidth = 36;
      this.laser.displayHeight = 40;
      this.laser.alpha = 0;

      if (this.mainScene.player.inventory.missile) {
        this.missile.alpha = 1;
      }
      if (this.mainScene.player.inventory.laser) {
        this.laser.alpha = 1;
      }
      if (this.mainScene.player.inventory.swell) {
        this.swell.alpha = 1;
      }
    });

    this.mainScene.events.on('setHealth', (elm) => {
      this.Health.text = `${elm.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`;
    });

    this.mainScene.events.on('addEnergyPack', (elm) => {
      this.Health.text = elm.life;
    });

    this.mainScene.events.on('addWeapon', (elm) => {
      this[elm.Weapon].alpha = 1;
    });

    this.mainScene.events.on('selectWeapon', (elm) => {
      this.missile.clearTint();
      this.laser.clearTint();
      this.swell.clearTint();
      if (this[elm.selectedWeapon]) {
        this[elm.selectedWeapon].tint = 0xFF3B00;
      }
    });
  }
}
