// import PlaySound from '../utils/PlaySound';

export default class Crabe extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: 30,
      directionY: 0,
      hited: false,
      giveLife: config.life / 10,
    };
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(500);
    this.getFired = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);
      // gauche ou droite et fait demi tour quand bloqué
      if (this.body.blocked.left) {
        this.state.directionX = 30;
      }
      if (this.body.blocked.right) {
        this.state.directionX = -30;
      }
      // tombe quand rien en dessous
      if (this.body.blocked.none) {
        this.state.directionY = 600;
      }
      if (this.body.blocked.down) {
        this.state.directionY = 0;
      }
      if (this.state.directionX > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
    }
  }

  isInside() {
    const { x, y } = this.scene.cameras.main.midPoint;
    const x1 = x - 200;
    const x2 = x + 200;
    const y1 = y - 128;
    const y2 = y + 128;
    if ((x1 <= this.x) && (this.x <= x2) && (y1 <= this.y) && (this.y <= y2)) {
      return true;
    }
    return false;
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    // PlaySound(this.scene, 'enemyHit');
    this.scene.sound.play('enemyHit');
    this.state.life = this.state.life - e;
  }
}
