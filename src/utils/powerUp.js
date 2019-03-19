import U from '../utils/usefull';


export default class PowerUp extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      name: config.name,
      ability: config.ability,
      text: config.text,
    }
    
    this.setDepth(50);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
  }
  
  preUpdate (time, delta) {
    super.preUpdate(time, delta);
  }

  animate (str) {
    this.anims.play(str, true)
  }
}
