const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let fireworks = [];
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;

    this.targetX =
      canvas.width * (0.15 + Math.random() * 0.7);

    this.targetY =
      canvas.height * (0.12 + Math.random() * 0.38);

    this.speed = 6.5 + Math.random() * 2;

    const angle = Math.atan2(
      this.targetY - this.y,
      this.targetX - this.x
    );

    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;

    this.trail = [];
    this.dead = false;

    const colors = [
      [70, 120, 255],
      [255, 55, 85],
      [255, 255, 255],
      [90, 150, 255],
      [255, 90, 110]
    ];

    this.color =
      colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.trail.push({
      x: this.x,
      y: this.y
    });

    if (this.trail.length > 10) {
      this.trail.shift();
    }

    this.x += this.vx;
    this.y += this.vy;

    const distance = Math.hypot(
      this.targetX - this.x,
      this.targetY - this.y
    );

    if (distance < 18) {
      this.explode();
      this.dead = true;
    }
  }

  draw() {
    const [r, g, b] = this.color;

    ctx.beginPath();

    for (let i = 0; i < this.trail.length - 1; i++) {
      const p = this.trail[i];
      const n = this.trail[i + 1];

      ctx.moveTo(p.x, p.y);
      ctx.lineTo(n.x, n.y);
    }

    ctx.strokeStyle =
      `rgba(${r}, ${g}, ${b}, 0.5)`;

    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      2,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgb(${r}, ${g}, ${b})`;

    ctx.shadowBlur = 12;
    ctx.shadowColor =
      `rgb(${r}, ${g}, ${b})`;

    ctx.fill();

    ctx.shadowBlur = 0;
  }

  explode() {
    const count = 90 + Math.floor(Math.random() * 45);

    for (let i = 0; i < count; i++) {
      const angle =
        Math.random() * Math.PI * 2;

      const speed =
        1.2 + Math.random() * 4.8;

      particles.push(
        new Particle(
          this.x,
          this.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          this.color
        )
      );
    }
  }
}

class Particle {
  constructor(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;

    this.vx = vx;
    this.vy = vy;

    this.color = color;

    this.life = 1;

    this.decay =
      0.008 + Math.random() * 0.012;

    this.gravity = 0.035;

    this.size =
      0.8 + Math.random() * 1.5;

    this.trail = [];
  }

  update() {
    this.trail.push({
      x: this.x,
      y: this.y
    });

    if (this.trail.length > 7) {
      this.trail.shift();
    }

    this.vy += this.gravity;

    this.vx *= 0.992;
    this.vy *= 0.992;

    this.x += this.vx;
    this.y += this.vy;

    this.life -= this.decay;
  }

  draw() {
    const [r, g, b] = this.color;

    ctx.beginPath();

    for (let i = 0; i < this.trail.length - 1; i++) {
      const p = this.trail[i];
      const n = this.trail[i + 1];

      ctx.moveTo(p.x, p.y);
      ctx.lineTo(n.x, n.y);
    }

    ctx.strokeStyle =
      `rgba(${r}, ${g}, ${b}, ${this.life * 0.45})`;

    ctx.lineWidth = this.size;
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(${r}, ${g}, ${b}, ${this.life})`;

    ctx.shadowBlur = 8;
    ctx.shadowColor =
      `rgb(${r}, ${g}, ${b})`;

    ctx.fill();

    ctx.shadowBlur = 0;
  }
}

function createFirework() {
  fireworks.push(new Firework());
}

function animate() {
  ctx.fillStyle =
    "rgba(2, 4, 11, 0.20)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].draw();

    if (fireworks[i].dead) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

setInterval(() => {
  if (fireworks.length < 3) {
    createFirework();
  }
}, 1100);

animate();
