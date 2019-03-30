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
      type: config.key,
      giveLife: config.life / 10,
    };

    this.lastAnim = null;
    this.setDepth(101);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(300);
    this.body.setSize(20, 20);
    this.flag = false;
    this.getFired = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.active) {
      if (this.body.blocked.down) {
        this.state.directionX = 0;
        this.jumperJump();
      }
      if (!this.body.blocked.down) {
        animationName = `${this.state.type}Jump`;
      } else {
        animationName = `${this.state.type}Idle`;
      }
    }
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
  }

  jumperJump() {
    if (!this.flag) {
      this.flag = true;
      this.delay = Phaser.Math.Between(0, 300);
      if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 200 || this.state.life < 400) {
        this.side = this.scene.player.x - this.x;
      } else {
        this.side = Phaser.Math.Between(-100, 100);
      }
      this.body.setVelocity(0, 0);
      this.scene.time.addEvent({
        delay: this.delay * 10,
        callback: () => {
          if (this.active) {
            this.body.setVelocityX(this.side);
            this.body.setVelocityY(-this.delay);
            this.flag = false;
          }
        },
      });
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
