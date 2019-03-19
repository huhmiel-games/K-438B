var Bullet = new Phaser.Class({
 
  Extends: Phaser.GameObjects.Image,

  initialize:

  function Bullet (scene)
  {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

      this.dx = 0;
      this.dy = 0;
      this.lifespan = 0;

      this.speed = Phaser.Math.GetSpeed(600, 1);
  },

  fire: function (x, y, angle)
  {
      this.setActive(true);
      this.setVisible(true);

      //  Bullets fire from the middle of the screen to the given x/y
      this.setPosition(x, y);

  //  we don't need to rotate the bullets as they are round
  //  this.setRotation(angle);

      this.dx = Math.cos(angle);
      this.dy = Math.sin(angle);

      this.lifespan = 300;
  },

  update: function (time, delta)
  {
      this.lifespan -= delta;

      this.x += this.dx * (this.speed * delta);
      this.y += this.dy * (this.speed * delta);

      if (this.lifespan <= 0)
      {
          this.setActive(false);
          this.setVisible(false);
      }
  }

});