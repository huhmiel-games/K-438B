export default class Jumpers extends Phaser.GameObjects.Sprite {
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

    this.setDepth(50);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.body.setSize(20, 20);
    this.state.directionY = Math.sin(300 + Math.PI / 4);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.body.setVelocityX(this.state.directionX);
    this.body.setVelocityY(this.state.directionY);

    // gauche ou droite et fait demi tour quand bloqué
    if (this.body.blocked.left) {
      this.state.directionX = 100;
    }
    if (this.body.blocked.right) {
      this.state.directionX = -100;
    }
    if (this.state.directionY > 0) {
      this.state.directionY += 1;
    } else {
      this.state.directionY -= 1;
    }
    if (this.body.blocked.down) {
      this.state.directionY = -1;
    } else if (this.body.blocked.up) {
      this.state.directionY = 1;
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
