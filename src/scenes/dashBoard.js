import { Scene } from 'phaser';
import U from '../utils/usefull';
import blackPixel from '../assets/blackPixel.png';
import iconMissile from '../assets/iconMissile.png';
import iconLaser from '../assets/iconLaser.png';
import iconSwell from '../assets/iconSwell.png';
import iconFullscreen from '../assets/iconFullscreen.png';

export default class DashBoard extends Scene {
  constructor() {
    super({ key: 'dashBoard', active: true });
  }

  preload() {
    this.load.image('blackpixel', blackPixel);
    this.load.image('iconMissile', iconMissile);
    this.load.image('iconLaser', iconLaser);
    this.load.image('iconSwell', iconSwell);
    this.load.image('iconFullscreen', iconFullscreen);
  }

  create() {
    this.mainScene = this.scene.get('playLvl1');

    // loading
    this.mainScene.events.on('loadingDone', () => {
      this.dashBord = this.add.image(0, 448, 'blackpixel')
        .setOrigin(0, 0)
        .setDisplaySize(U.WIDTH, 64);

      this.lifeText = this.add.bitmapText(16, 448, 'atomic', 'H e a l t h')
        .setFontSize(16);

      this.Health = this.add.bitmapText(16, 464, 'atomic', '')
        .setFontSize(32)
        .setText(`${this.mainScene.player.inventory.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);

      this.swell = this.add.image(400, 480, 'iconSwell')
        .setAlpha(0)
        .setDisplaySize(36, 40);

      this.missile = this.add.image(450, 480, 'iconMissile')
        .setAlpha(0)
        .setDisplaySize(36, 40);

      this.laser = this.add.image(500, 480, 'iconLaser')
        .setAlpha(0)
        .setDisplaySize(36, 40);

      this.fullscreenBtn = this.add.image(750, 480, 'iconFullscreen')
        .setDisplaySize(64, 64)
        .setInteractive()
        .on('pointerdown', () => {
          this.scale.toggleFullscreen();
        }, this);

      if (this.mainScene.player.inventory.missile) {
        this.missile.setAlpha(1);
      }
      if (this.mainScene.player.inventory.laser) {
        this.laser.setAlpha(1);
      }
      if (this.mainScene.player.inventory.swell) {
        this.swell.setAlpha(1);
      }
    });

    this.mainScene.events.on('setHealth', (elm) => {
      this.Health.setText(`${elm.life}/${this.mainScene.player.inventory.lifeEnergyBlock * 100}`);
    });

    this.mainScene.events.on('addEnergyPack', (elm) => {
      this.Health.setText(elm.life);
    });

    this.mainScene.events.on('addWeapon', (elm) => {
      this[elm.Weapon].setAlpha(1);
    });

    this.mainScene.events.on('selectWeapon', (elm) => {
      this.missile.clearTint();
      this.laser.clearTint();
      this.swell.clearTint();
      if (this[elm.selectedWeapon]) {
        this[elm.selectedWeapon].setTint(0xFF3B00);
      }
    });
  }
}
