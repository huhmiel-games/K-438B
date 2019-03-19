export default class Enemies extends BaseClass {
  constructor(scene, x, y) {
      super(scene, x, y);
      // ...
      scene.add.existing(this);
  }
  // ...

  // preUpdate(time, delta) {}
}