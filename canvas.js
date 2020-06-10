const image = new Image();
image.src = "3382151.png";

const canvas = document.getElementById("animate-canvas");
const context = canvas.getContext("2d");

image.onload = () => {
  context.drawImage(image, 0, 0, 100, 100, 0, 0, 150, 150);
};

class Knight {
  constructor(props) {
    this.context = props.context;
    this.sprite = props.image;

    this.countFrameX = 6;
    this.iterableFrameX = 1;

    this.width = props.width;
    this.height = props.height;

    this.positionX = 0;
    this.positionY = 0;

    this.walk = this.walk.bind(this);
    this.attack = this.attack.bind(this);
    this.death = this.death.bind(this);
  }
  clearAnimation() {
    this.positionX = 0;
    this.iterableFrameX = 1;
    clearTimeout(this.timeout);
    cancelAnimationFrame(this.RFA);
  }
  checkPosition() {
    if (this.iterableFrameX >= this.countFrameX) {
      this.positionX = 0;
      this.iterableFrameX = 1;
    } else {
      this.positionX += this.width;
      this.iterableFrameX += 1;
    }
  }
  create() {
    this.context.drawImage(this.sprite, 0, 0, 100, 100, 0, 0, 150, 150);
  }
  walk() {
    this.context.clearRect(0, 0, 150, 150);
    this.checkPosition();
    this.context.drawImage(
      this.sprite,
      this.positionX,
      0,
      100,
      100,
      0,
      0,
      150,
      150
    );

    this.timeout = setTimeout(() => {
      this.RFA = requestAnimationFrame(this.walk);
    }, 1000 / 20);
  }

  attack() {
    this.context.clearRect(0, 0, 150, 150);
    this.checkPosition();
    this.context.drawImage(
      this.sprite,
      this.positionX,
      100,
      100,
      100,
      0,
      0,
      150,
      150
    );
    this.timeout = setTimeout(() => {
      this.RFA = requestAnimationFrame(this.attack);
    }, 1000 / 10);
  }

  death() {
    this.context.clearRect(0, 0, 150, 150);
    this.checkPosition();
    this.context.drawImage(
      this.sprite,
      this.positionX,
      200,
      100,
      100,
      0,
      0,
      150,
      150
    );
    this.timeout = setTimeout(() => {
      this.RFA = requestAnimationFrame(this.death);
    }, 1000 / 5);
  }
  startDeath() {
    this.clearAnimation();
    this.death();
  }
  startWalk() {
    this.clearAnimation();
    this.walk();
  }
  startAttack() {
    this.clearAnimation();
    this.attack();
  }
}

const knight = new Knight({
  context: canvas.getContext("2d"),
  image: image,
  width: 100,
  height: 100,
});

knight.create();
document.getElementById("walk").onclick = () => {
  knight.startWalk();
};
document.getElementById("attack").onclick = () => {
  knight.startAttack();
};
document.getElementById("death").onclick = () => {
  knight.startDeath();
};
