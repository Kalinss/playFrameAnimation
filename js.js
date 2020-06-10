class AnimateStep {
  constructor(animationParam) {
    this.frameHeight = animationParam.frameHeight;
    this.frameWidth = animationParam.frameWidth;

    this.widthSprite = animationParam.widthSprite;
    this.heightSprite = animationParam.heightSprite;

    this.width = this.widthSprite / this.frameWidth;
    this.height = this.heightSprite / this.frameHeight;

    this.el = animationParam.el;
    this.positionX = 0;
    this.positionY = 0;
    this.maxFrame = animationParam.maxFrame;

    this.interval;
  }
  reset() {
    this.positionX = 0;
    this.positionY = 0;
  }
  preStart() {
    this.el.style.backgroundPositionX = this.positionX + "px";
  }
  stop() {
    clearInterval(this.interval);
  }
  render() {
    this.el.style.backgroundPositionX = this.positionX + "px";
    this.el.style.backgroundPositionY = this.positionY + "px";
  }

  start() {
    let countIterationX = 1;
    let count = 1;
    const step = () => {
      if (count === this.maxFrame) {
        count = 1;
        countIterationX = 1;
        this.reset();
      }
      if (countIterationX >= this.frameWidth) {
        this.positionY -= this.height;
        this.positionX = 0;
        countIterationX = 1;
      } else {
        this.positionX -= this.width;
        countIterationX += 1;
      }
      count += 1;
      this.render();

      setTimeout(() => {
        requestAnimationFrame(step);
      }, 1000 / 25);

    };

    requestAnimationFrame(step);
  }
}
const man = new AnimateStep({
  widthSprite: 768,
  frameHeight: 5,
  frameWidth: 6,
  heightSprite: 920,
  maxFrame: 28,
  el: document.getElementById("animate-box"),
});

man.preStart();
man.start();
