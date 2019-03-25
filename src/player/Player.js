let morph;
let jumpB;

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, config) {
    super(scene, x, y, config.key);

    this.lastAnim = null;
    this.scene = scene;
    this.inventory = {
      lifeEnergyBlock: 1,
      life: 100,
      savedPositionX: null,
      savedPositionY: null,
      gun: false,
      gunDamage: 5,
      morphing: false,
      morphingBomb: false,
      jumpBooster: false,
      powerUp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
    this.state = {
      canJump: false,
      stopJump: false,
      onJump: false,
      jumpDelay: 400,
      onRun: false,
      onWalk: true,
      onMorphingBall: false,
      jumpBoost: false,
      onJumpBoost: false,
      speed: 250,
      runSpeed: 350,
      maxSpeed: 250,
      lastFired: 0,
      fireRate: 320,
      bulletOrientationX: 'right',
      bulletOrientationY: 'normal',
      bulletPositionY: 10,
      bulletPositionX: 10,
      pause: false,
    };

    this.jumpCooldownTimer = null;
    this.boostTimer = null;
    this.setDepth(100);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    const {
      LEFT, RIGHT, UP, DOWN, SPACE, SHIFT, ENTER, P, D,
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      jump: SPACE,
      run: SHIFT,
      fire: ENTER,
      pause: P,
      debug: D,
    });

    this.arrLife = this.inventory.powerUp;
    this.ComboMorphingBall = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.down],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.ComboJumpBooster = this.scene.input.keyboard.createCombo(
      [this.keys.down, this.keys.jump],
      {
        resetOnWrongKey: true,
        maxKeyDelay: 500,
        resetOnMatch: true,
        deleteOnMatch: false,
      },
    );
    this.scene.input.keyboard.on('keycombomatch', (keyCombo) => {
      if (keyCombo.keyCodes[0] === 40 && keyCombo.keyCodes[1] === 40) {
        morph = true;
      }
      if (keyCombo.keyCodes[0] === 40 && keyCombo.keyCodes[1] === 32) {
        jumpB = true;
      }
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    const { keys } = this;
    let animationName;// = 'stop'; //
    // if not game pause
    if (!this.state.pause) {
      // check morphing ball ability active
      if (this.inventory.morphing) {
        this.state.onMorphingBall = morph;
      }
      // check jumpBooster ability active
      if (this.inventory.jumpBooster) {
        this.state.jumpBoost = jumpB;
      }
      // check jumpBoost
      if (this.body.blocked.down && this.state.jumpBoost) {
        this.jumpBoosterTimer();
      }
      // fire Y orientation
      if (keys.up.isDown) {
        this.state.bulletOrientationY = 'up';
        this.state.onMorphingBall = false;
        morph = false;
      } else {
        this.state.bulletOrientationY = 'normal';
      }
      // call run speed
      this.isRunning();
      if (keys.fire.isDown) {
        this.shoot(time);
      }
      // player movement
      // marche vers la gauche
      if (keys.left.isDown && !keys.run.isDown && !this.state.onMorphingBall) {
        this.body.setVelocityX(-this.state.speed);
        this.state.bulletOrientationX = 'left';
        if (keys.jump.isDown && !this.body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'walkShoot';
        }
        // marche vers la droite
      } else if (keys.right.isDown && !keys.run.isDown && !this.state.onMorphingBall) {
        this.body.setVelocityX(this.state.speed);
        this.state.bulletOrientationX = 'right';
        if (keys.jump.isDown && !this.body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'walkShoot';
        }
        // cours vers la gauche
      } else if (keys.left.isDown && keys.run.isDown && !this.state.onMorphingBall) {
        this.body.setVelocityX(-this.state.speed);
        this.state.bulletOrientationX = 'left';
        if (keys.jump.isDown && !this.body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'runShoot';
        }
        // cours vers la droite
      } else if (keys.right.isDown && keys.run.isDown && !this.state.onMorphingBall) {
        this.body.setVelocityX(this.state.speed);
        this.state.bulletOrientationX = 'right';
        if (keys.jump.isDown && !this.body.blocked.down) {
          animationName = 'jump';
        } else {
          animationName = 'runShoot';
        }
        // saut droit et chute libre
      } else if (!this.body.blocked.down
        && !(keys.left.isDown || keys.right.isDown)
        && !this.state.onMorphingBall
        && !this.state.jumpBoost) {
        animationName = 'jumpVertical';
        this.body.setVelocityX(0);
        this.ComboJumpBooster.enabled = false;
        // saut avec booster
      } else if (this.state.jumpBoost
        && !(keys.left.isDown || keys.right.isDown)
        && !this.state.onMorphingBall) {
        animationName = 'jumpBoost';
        // position baissée
      } else if (keys.down.isDown && !this.state.onMorphingBall) {
        this.body.setVelocityX(0);
        this.state.bulletPositionY = 10;
        animationName = 'duck';
        // morphing ball
      } else if (this.state.onMorphingBall) {
        animationName = 'morphingBall';
        if (!(keys.left.isDown || keys.right.isDown)) {
          this.body.setVelocityX(0);
        } else if (keys.left.isDown) {
          this.body.setVelocityX(-this.state.speed);
        } else if (keys.right.isDown) {
          this.body.setVelocityX(this.state.speed);
        }
        this.state.bulletPositionY = 10;
        // tire vers le haut
      } else if (keys.fire.isDown && keys.up.isDown && !(keys.left.isDown || keys.right.isDown)) {
        animationName = 'shootup';
        this.body.setVelocityX(0);
        // tire a l'arret
      } else if (keys.fire.isDown && !keys.up.isDown && !(keys.left.isDown || keys.right.isDown)) {
        this.state.bulletPositionY = 8;
        animationName = 'stand';
        this.body.setVelocityX(0);
        // reste immobile
      } else {
        this.body.setVelocityX(0);
        animationName = 'stand';
      }
      // positionne la hauteur du tir en marchant //ptet en courant aussi a verifier
      if (!keys.down.isDown && (keys.left.isDown || keys.right.isDown)) {
        this.state.bulletPositionY = 11;
      }
      //  PLAYER JUMP    ////
      // peut sauter
      if (!keys.jump.isDown && this.body.blocked.down) {
        this.state.canJump = true;
        this.state.stopJump = false;
      }
      // saute
      if (keys.jump.isDown && this.body.blocked.down && this.state.canJump) {
        this.body.setVelocityY(-this.state.speed);
        this.body.velocity.normalize().scale(this.state.maxSpeed);
        this.state.onJump = true;
        this.isJumping();
        this.state.canJump = false;
      }
      // a l'atterissage
      if (this.body.blocked.down) {
        this.state.onJump = false;
        this.ComboJumpBooster.enabled = true;
      }
      if (!this.body.blocked.down && jumpB) {
        this.state.onJump = true;
      }
      // reset jump
      if (this.state.stopJump) {
        this.body.setVelocityY(this.state.speed);
      }
      // annule le timer du saut
      if (!keys.jump.isDown && !this.state.stopJump) {
        if (this.jumpCooldownTimer) {
          this.jumpCooldownTimer.remove();
        }
        this.body.setVelocityY(this.state.speed);
      }

      // player animation play
      if (this.lastAnim !== animationName) {
        this.lastAnim = animationName;
        this.animate(animationName, true);
      }
    }
  }

  isJumping() {
    this.jumpCooldownTimer = this.scene.time.addEvent({
      delay: this.state.jumpDelay,
      callback: () => {
        this.state.stopJump = true;
      },
    });
  }

  animate(str) {
    this.anims.play(str, true);
  }

  stopAnimate(str) {
    this.anims.stop(str);
  }

  isRunning() {
    if (this.keys.run.isDown
      && (this.keys.left.isDown || this.keys.right.isDown)
      && this.body.blocked.down) {
      this.state.speed = this.state.runSpeed;
    } else if (!this.keys.run.isDown && (this.keys.left.isDown || this.keys.right.isDown)) {
      this.state.speed = 200;
    }
  }

  shoot(time) {
    if (time > this.state.lastFired && this.inventory.gun) {
      const bullet = this.bullets.getFirstDead(true, this.body.x + this.state.bulletPositionX, this.body.y + this.state.bulletPositionY, 'bullet', null, true);
      if (bullet) {
        this.state.lastFired = time + this.state.fireRate;
        bullet.visible = true;
        bullet.anims.play('bull', true);
        bullet.setDepth(99);

        //    BULLET ORIENTATION    ////
        if (this.state.bulletOrientationX === 'left') {
          bullet.body.velocity.x = -600;
        }
        if (this.state.bulletOrientationX === 'right') {
          bullet.body.velocity.x = 600;
        }
        if (this.state.bulletOrientationY === 'up' && this.body.blocked.down && !(this.keys.left.isDown || this.keys.right.isDown)) {
          bullet.body.velocity.y = -600;
          bullet.body.velocity.x = 0;
        } else if (this.state.bulletOrientationY === 'normal') {
          bullet.body.velocity.y = 0;
        }
      }
    }
  }

  bulletKill(e) {
    e.setVelocity(0, 0);
    e.anims.play('impact', true);
    e.on('animationcomplete', () => { e.destroy(); });
  }

  jumpBoosterTimer() {
    if (this.state.onJump) {
      this.state.jumpBoost = false;
      this.state.onJumpBoost = false;
      jumpB = false;
      return;
    }
    this.state.onJumpBoost = true;
    this.state.maxSpeed = 550;
    this.body.setVelocityY(-this.state.speed);
    this.body.velocity.normalize().scale(this.state.maxSpeed);
    this.boostTimer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.state.jumpBoost = false;
        this.state.onJumpBoost = false;
        jumpB = false;
        this.state.maxSpeed = 250;
        this.body.setVelocityY(0);
      },
    });
  }

  killJumpBoosterTimer() {
    if (this.state.onJumpBoost && this.body.blocked.down) {
      this.state.onJumpBoost = false;
      this.boostTimer.remove();
      this.state.jumpBoost = false;
      this.state.maxSpeed = 250;
      jumpB = false;
    }
  }

  addEnergy() {
    this.inventory.lifeEnergyBlock += 1;
    this.inventory.life = this.inventory.lifeEnergyBlock * 100;
  }
}
