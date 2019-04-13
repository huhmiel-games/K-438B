export default class BossFinal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.scene = scene;
    this.state = {
      life: 10000,
      damage: 100,
      directionX: -550,
      directionY: 0,
      hited: false,
      lastFired: 0,
      fireRate: 20,
    };
    this.setDepth(104);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.allowGravity = false;
    this.getFired = false;
    this.lastAnim = null;
    this.displayWidth = 384;
    this.displayHeight = 480;
    this.body.setSize(90, 40, true);
    this.body.setOffset(50, 110);
    this.isAttacking = false;
    this.isFlying = false;
    this.isFireAttacking = false;
    this.battleStarted = false;
    this.attackTime = null;
    this.musicOn = false;
    this.isDead = false;
    this.roar = false;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    let animationName;
    if (this.isDead) {
      this.body.setVelocityY(500);
    }
    if (this.state.life < 10000 && !this.battleStarted) {
      this.scene.bossFinalBattleStart();
    }

    if (this.active && this.scene.bossFinalstarted && !this.isDead) {
      if (!this.battleStarted) {
        this.startBattle();
      }
      this.playBossMusic();
      this.body.setVelocityX(this.state.directionX);
      this.body.setVelocityY(this.state.directionY);

      if (this.isFlying && !this.isFireAttacking) {
        if (this.body.blocked.left) {
          this.state.directionX = 550;
        } else if (this.body.blocked.right) {
          this.state.directionX = -550;
        } else if (this.state.directionX === 0) {
          this.state.directionX = -550;
        }
        if (this.y < 2940) {
          this.state.directionY = 300;
        } else if (this.y > 2950) {
          this.state.directionY = -300;
        } else {
          this.state.directionY = 0;
        }
      }
      if (this.isAttacking) {
        if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) >= 200 && !this.isFireAttacking) {
          const dx = this.scene.player.x - this.x;
          const dy = this.scene.player.y - this.y;
          const angle = Math.atan2(dy, dx);
          const speed = 550;
          this.body.setVelocity(
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
          );
        }
        animationName = 'bossFinalAttack';
      }
      if (Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 200 && this.isAttacking && !this.isFlying) {
        this.fireAttack(time);
      }

      if (this.body.velocity.x > 0 && !this.isFireAttacking) {
        this.flipX = true;
      } else if (this.body.velocity.x < 0 && !this.isFireAttacking) {
        this.flipX = false;
      }

      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  startBattle() {
    this.battleStarted = true;
    this.attack();
  }

  fly() {
    if (!this.isFlying) {
      this.isFlying = true;
      this.scene.time.addEvent({
        delay: 10000,
        callback: () => {
          if (this.active) {
            this.isFlying = false;
            this.attack();
          }
        },
      });
    }
  }

  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.scene.time.addEvent({
        delay: 5000,
        callback: () => {
          if (this.active) {
            this.isAttacking = false;
            this.fly();
          }
        },
      });
    }
  }

  fireAttack(time) {
    this.fireFlame(time);
    if (!this.isFireAttacking && this.isAttacking && Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y) < 200) {
      this.isFireAttacking = true;
      if (this.x < this.scene.player.x) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
      this.state.directionX = 0;
      this.state.directionY = -300;
      this.playRoar('cri2');

      this.scene.time.addEvent({
        delay: 300,
        callback: () => {
          if (this.active) {
            this.isFireAttacking = false;
            this.state.directionY = 300;
          }
        },
      });
    }
  }

  fireFlame(time) {
    if (time > this.state.lastFired) {
      let flame = null;
      if (this.flipX) {
        flame = this.flames.getFirstDead(true, this.x + 90, this.y + 40, 'fireball', null, true);
      } else {
        flame = this.flames.getFirstDead(true, this.x - 90, this.y + 40, 'fireball', null, true);
      }

      if (flame) {
        this.state.lastFired = time + this.state.fireRate;
        flame.visible = true;
        flame.anims.play('fireball', true);
        flame.setDepth(99);
        const rad = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y);
        flame.rotation = rad + Math.PI / 2;
        // flame sound to add
        // this.scene.sound.play('flame', { volume: 0.08 });
        this.scene.physics.moveTo(flame, this.scene.player.x, this.scene.player.y, 100, 0);
      }
    }
  }

  stopFlame(e) {
    e.body.velocity.x = 0;
    e.body.velocity.y = 0;
    if (e.body.blocked.down) {
      e.rotation = Math.PI;
    }
    if (this.scene) {
      this.scene.time.addEvent({
        delay: 30000,
        callback: () => {
          if (e.active) {
            e.destroy();
          }
        },
      });
    }
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

  playBossMusic() {
    if (!this.musicOn && this.active) {
      this.musicOn = true;
      if (this.scene.ambient2.isPlaying) {
        this.scene.ambient2.stop();
      }
      if (!this.scene.bossMusic.isPlaying) {
        this.scene.bossMusic.play();
      }
    }
    if (this.scene.bossMusic.seek > 97) {
      this.musicOn = false;
    }
  }

  animate(str) {
    this.anims.play(str, true);
  }

  looseLife(e) {
    this.state.life = this.state.life - e;
  }
}
