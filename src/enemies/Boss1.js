export default class Boss1 extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: 1800,
      damage: 25,
      directionX: 160,
      directionY: 0,
      hited: false,
    };
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = true;
    this.body.setGravityY(500);
    this.intro = false;
    this.getFired = false;
    this.lastAnim = null;
    this.attack = false;
    this.isRun = false;
    this.isJumping = false;
    this.lastSpeed = null;
    this.body.setSize(184, 70, true);
    this.body.setOffset(0, 50);
    this.roar = false;
    this.onPosition = false;
    this.eatMissile = false;
    this.missileEated = false;
    this.musicOn = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.intro) {
      if (!this.onPosition) {
        const dx = this.scene.missile.x - this.x;
        const dy = this.scene.missile.y - this.y;
        const angle = Math.atan2(dy, dx);
        const speed = 500;
        this.playRoar('cri1');
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
        );
        this.flipX = false;
      }
      if (this.x < 1770 && !this.eatMissile) {
        this.body.setVelocity(0, 0);
        this.onPosition = true;
        animationName = 'boss1hit';
        this.playRoar('cri4');
        this.scene.boss1wallfront.destroy();
        this.scene.time.addEvent({
          delay: 2000,
          callback: () => {
            this.eatMissile = true;
            this.playRoar('cri3');
          },
        });
      }
      if (this.eatMissile && !this.missileEated) {
        this.missileEated = true;
        animationName = 'boss1crouch';
        this.scene.missile.alpha = 0;
        this.scene.missile.body.reset(2050, 1408);
        this.intro = false;
        this.body.setEnable();
      }
    }
    if (this.active && !this.intro) {
      this.playBossMusic();
      this.body.setVelocityX(this.state.directionX);
      // gauche ou droite et fait demi tour quand bloqué
      if (this.body.blocked.left && !this.attack && this.state.life >= 500) {
        this.state.directionX = 200;
        animationName = 'boss1walk';
        this.playRoar('cri3');
      }
      if (this.body.blocked.right && !this.attack && this.state.life >= 500) {
        this.state.directionX = -200;
        animationName = 'boss1walk';
        this.playRoar('cri3');
      }
      if (this.getFired && this.state.life >= 500) {
        animationName = 'boss1hit';
        this.wait();
        this.playRoar('cri1');
      } else if (this.getFired) {
        animationName = 'boss1hit';
        this.playRoar('cri1');
      }

      if (this.attack && this.state.life >= 500) {
        animationName = 'boss1run';
        this.run();
        this.playRoar('cri2');
      }
      if (this.isRun) {
        animationName = 'boss1attack';
        this.playRoar('cri4');
      }
      if (this.state.life < 500) {
        animationName = 'boss1attack';
        this.jump();
        //this.playRoar('cri1');
      }
      // flip et anim play
      if (this.body.velocity.x > 0) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
    }
    if (this.lastAnim !== animationName) {
      this.lastAnim = animationName;
      this.animate(animationName, true);
    }
  }

  playBossMusic() {
    if (!this.musicOn && this.missileEated) {
      this.musicOn = true;
      if (this.scene.ambient1.isPlaying) {
        this.scene.ambient1.stop();
      }
      this.scene.bossMusic.play();
    }
    if (this.scene.bossMusic.seek > 97) {
      this.musicOn = false;
    }
  }

  wait() {
    if (this.state.directionX > 0) {
      this.state.directionX = 1;
    } else {
      this.state.directionX = -1;
    }
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.attack = true;
      },
    });
  }

  run() {
    this.isRun = true;
    const dx = this.scene.player.x - this.x;
    if (dx > 70) {
      this.state.directionX = 350;
    } else if (dx < -70) {
      this.state.directionX = -350;
    }
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.attack = false;
        this.isRun = false;
      },
    });
  }

  jump() {
    if (!this.isJumping && this.body.blocked.down && this.active) {
      this.attack = false;
      this.isRun = false;
      this.isJumping = true;
      if (this.body.blocked.left) {
        this.state.directionX = 300;
      }
      if (this.body.blocked.right) {
        this.state.directionX = -300;
      }
      this.body.setVelocityY(-500);
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          if (this.active) {
            this.body.setVelocityY(500);
            this.isJumping = false;
            this.run();
          }
        },
      });
    }
  }

  stopJump() {
    this.isJumping = false;
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.attack = false;
        this.isRun = false;
        this.state.directionY = 300;
      },
    });
  }

  playRoar(cri) {
    if (!this.roar) {
      this.roar = true;
      this.scene.sound.play(cri);
      this.scene.time.addEvent({
        delay: 1800,
        callback: () => {
          this.roar = false;
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
