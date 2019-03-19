import U from '../utils/usefull';


export default class SaveStation extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      name: config.name,
      text: 'press fire to save the game',
      confirm: false,
      active: false,
      save: false,
    }
    
    this.setDepth(50);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;

    const { ENTER } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.scene.input.keyboard.addKeys({
      fire: ENTER,
    });
  }
  
  preUpdate (time, delta) {
    super.preUpdate(time, delta);
    if (this.keys.fire.isDown) {
      this.state.save = true;
    }
  }

  animate (str) {
    this.anims.play(str, true)
  }
}
