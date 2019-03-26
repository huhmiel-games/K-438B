export default class Doors extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      side: config.side,
    };
    this.setDepth(110);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.mass = 20;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  animate(str) {
    this.anims.play(str, true);
  }

  destroyDoor() {
    this.anims.play('enemyExplode', true).on('animationcomplete', () => {
      this.destroy();
    });
  }
}
