export default class Octopus extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      hited: false,
      giveLife: config.life / 10,
    };

    this.lastAnim = null;
    this.setDepth(97);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(100);
    this.body.setSize(20, 20);
    this.flag = false;
    this.getFired = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.scene.player.onWater) {
      if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 200) {
        this.attack();
      } else {
        this.goHome();
      }
    } else {
      this.goHome();
    }

    if (!this.body.blocked.down) {
      animationName = 'octopus';
    } else {
      animationName = 'octopusIdle';
    }

    if (this.body.velocity.x > 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
  }

  goHome() {
    const dx = 144 - this.x;
    const dy = 858 - this.y;
    const angle = Math.atan2(dy, dx);
    const speed = 100;
    this.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
    );
  }

  attack() {
    const dx = this.scene.player.x - this.x;
    const dy = this.scene.player.y - this.y;
    const angle = Math.atan2(dy, dx);
    const speed = 100;
    this.body.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
    );
    if (this.body.blocked.right && this.body.velocity.x < 100) {
      this.body.velocity.y -= 10;
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
