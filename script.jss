const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = 100 + Math.random() * (canvas.height * 0.4);

  const colors = [
    "rgba(80,140,255,",
    "rgba(255,60,90,",
    "rgba(255,255,255,"
  ];

  const color =
    colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 5;

    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: color,
      size: 1 + Math.random() * 2
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.035;
    p.life -= 0.012;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fillStyle = p.color + p.life + ")";
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color + "1)";

    ctx.fill();

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  ctx.shadowBlur = 0;

  requestAnimationFrame(animate);
}

setInterval(createFirework, 900);

createFirework();
createFirework();

animate();
