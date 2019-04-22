export default class WaterFalls extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.setDepth(50).setDisplaySize(32, 16).setAlpha(0.5);
    this.scene.add.existing(this);
  }

  animate(str) {
    this.anims.play(str, true);
  }
}
