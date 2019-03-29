export default class Guepes extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 100,
      directionY: 0,
      hited: false,
    };
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setSize(20, 20);
    this.state.directionY = Math.sin(300 + Math.PI / 4);
    this.getFired = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      this.body.velocity.normalize().scale(150);
      // gauche ou droite et fait demi tour quand bloqué
      if (this.body.blocked.left || this.body.touching.left) {
        this.state.directionX = 100;
      }
      if (this.body.blocked.right || this.body.touching.right) {
        this.state.directionX = -100;
      }
      if (this.state.directionY > 0) {
        this.state.directionY += 2;
      } else {
        this.state.directionY -= 2;
      }
      if (this.body.blocked.down || this.state.directionY > 120) {
        this.state.directionY = -1;
      } else if (this.body.blocked.up || this.state.directionY < -120) {
        this.state.directionY = 2;
      }
      if (this.state.directionX > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
