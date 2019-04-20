export default class Lava extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.setDepth(11);
  }

  animate(str) {
    this.anims.play(str, true);
  }
}
