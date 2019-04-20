export default class WaterFalls extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.setDepth(50);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.mass = 20;
    this.alpha = 0.5;
  }

  animate(str) {
    this.anims.play(str, true);
  }
}
