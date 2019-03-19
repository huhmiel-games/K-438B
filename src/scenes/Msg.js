import { Scene } from 'phaser';

export default class Msg extends Scene {
  constructor() {
    super('msg')
  }
  preload() {

  }
    
  create() {  
    this.msg = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'huhmiel games').setInteractive();
    this.msg.setOrigin(0.5, 0.5);
    this.msg.setAlpha(1);
    const t = this.scene.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.scene.resume('playLvl1');
        this.scene.stop('msg');
      }
    });
    
  }  
  
  
  
}
