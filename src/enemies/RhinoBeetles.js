export default class RhinoBeetles extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: config.life,
      damage: config.damage,
      directionX: -200,
      directionY: 0,
      hited: false,
      giveLife: config.life / 10,
    };
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(300);
    this.getFired = false;
    this.body.setSize(55, 32, true);
    this.isRolling = false;
    this.isStunned = false;
    this.vulnerable = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.active) {
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);

      if (this.isRolling) {
        animationName = 'rhinoBall';
        this.body.setSize(40, 32, true);
      } else {
        this.body.setSize(55, 32, true);
      }

      if (this.isStunned) {
        this.vulnerable = true;
        if (this.body.blocked.left) {
          this.state.directionY = -350;
          this.stopJump();
          this.playImpact();
          this.state.directionX = 1;
          this.scene.shakeCamera(100);
          animationName = 'rhinoWalk';
          this.flipY = true;
          this.getUp('left');
        }
        if (this.body.blocked.right) {
          this.state.directionY = -350;
          this.stopJump();
          this.playImpact();
          this.state.directionX = -1;
          this.scene.shakeCamera(100);
          animationName = 'rhinoWalk';
          this.flipY = true;
          this.getUp('right');
        }
      }
      // gauche ou droite et fait demi tour quand bloqué
      if (this.body.blocked.left && !this.isStunned) {
        this.isRolling = false;
        animationName = 'rhinoWalk';
        this.state.directionX = 200;
        this.isStunned = true;
      }
      if (this.body.blocked.right && !this.isStunned) {
        this.isRolling = false;
        animationName = 'rhinoWalk';
        this.state.directionX = -200;
        this.isStunned = true;
      }

      if (this.state.directionX > 0) {
        this.flipX = false;
      } else {
        this.flipX = true;
      }
      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  getUp(elm) {
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.isStunned = false;
        this.vulnerable = false;
        const rdm = Phaser.Math.Between(0, 10000);
        if (rdm > 5000) {
          this.isRolling = true;
        } else {
          this.isRolling = false;
        }
        this.flipY = false;
        if (elm === 'left') {
          this.state.directionX = 250;
        } else {
          this.state.directionX = -250;
        }
      },
    });
  }

  stopJump() {
    this.scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.state.directionY = 200;
      },
    });
  }

  playImpact() {
    if (!this.impactIsPlaying) {
      this.impactIsPlaying = true;
      this.scene.sound.play('explo3', { volume: 0.4 });
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.impactIsPlaying = false;
        },
      });
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
    if (this.state.life <= 0) {
      this.scene.sound.play('explo2', { volume: 0.4 });
    }
  }
}
