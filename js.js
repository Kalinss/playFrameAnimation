const element = document.getElementById("animate-box");

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
    this.work = false;

    this.interval;
    this.animate;
  }
  toggle() {
    console.log(this.work);
    this.work ? this.stop() : this.start();
  }
  reset() {
    this.positionX = 0;
    this.positionY = 0;
  }
  preStart() {
    this.el.style.backgroundPositionX = this.positionX + "px";
  }
  stop() {
    this.work = false;
    clearTimeout(this.interval);
    cancelAnimationFrame(this.animate);
    this.reset();
  }
  render() {
    this.el.style.backgroundPositionX = this.positionX + "px";
    this.el.style.backgroundPositionY = this.positionY + "px";
  }

  start() {
    this.work = true;
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

      this.interval = setTimeout(() => {
        this.animate = requestAnimationFrame(step);
      }, 1000 / 25);
    };

    this.animate = requestAnimationFrame(step);
  }
}
const man = new AnimateStep({
  widthSprite: 768,
  frameHeight: 5,
  frameWidth: 6,
  heightSprite: 920,
  maxFrame: 28,
  el: element,
});

document.getElementById('walkman').onclick = () => {
  man.toggle();
};

