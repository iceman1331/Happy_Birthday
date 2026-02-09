const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const size = Math.min(window.innerWidth * 0.8, 400);
  const dpr = window.devicePixelRatio || 1;

  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const maxParticles = 600;

function isInsideHeart(x, y, size) {
  x = (x - size / 2) / (size / 2);
  y = (y - size / 2) / (size / 2);

  return Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y <= 0;
}

class Particle {
  constructor(size) {
    this.size = Math.random() * 3 + 1;
    this.canvasSize = size;
    this.reset();
  }

  reset() {
    this.x = this.canvasSize / 2;
    this.y = this.canvasSize / 2;
    this.vx = (Math.random() - 0.5) * 120;
    this.vy = (Math.random() - 0.5) * 120;
  }

  update(dt) {
    const nx = this.x + this.vx * dt;
    const ny = this.y + this.vy * dt;

    if (!isInsideHeart(nx, ny, this.canvasSize)) {
      this.vx *= -1;
      this.vy *= -1;
    } else {
      this.x = nx;
      this.y = ny;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 80, 120, 0.7)";
    ctx.fill();
  }
}

let lastTime = 0;

function animate(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const size = canvas.width / (window.devicePixelRatio || 1);

  if (particles.length < maxParticles) {
    particles.push(new Particle(size));
  }

  particles.forEach(p => {
    p.update(dt);
    p.draw();
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

/* Smooth redirect after 4 seconds */
setTimeout(() => {
  window.location.href = "index.html";
}, 10000);
