export default class Elevators extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      up: config.up,
      down: config.down,
      position: config.position,
      isMoving: false,
    };
    this.setDepth(50);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setImmovable(true);
    this.body.setVelocity(0, 0);
    this.body.mass = 20;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.state.isMoving) {
      if (this.state.position === 'down') {
        if (this.y >= this.state.up) {
          this.body.setVelocityY(-100);
        }
        if (this.y <= this.state.up) {
          this.state.isMoving = false;
          this.body.setVelocityY(0);
          this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
              this.state.position = 'up';
            },
          });
        }
      }
      if (this.state.position === 'up') {
        if (this.y <= this.state.down) {
          this.body.setVelocityY(100);
        }
        if (this.y >= this.state.down) {
          this.state.isMoving = false;
          this.body.setVelocityY(0);
          this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
              this.state.position = 'down';
            },
          });
        }
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  handleElevator() {
    this.state.isMoving = true;
  }
}
