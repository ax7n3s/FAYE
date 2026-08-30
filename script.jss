document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     FIREWORKS
  ========================= */

  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  let W, H;
  let particles = [];
  let rockets = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const colors = [
    "65,125,255",
    "255,55,85",
    "255,220,100",
    "255,255,255"
  ];

  function explode(x, y, color) {
    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;

      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
        size: 1 + Math.random() * 2,
        color: color
      });
    }
  }

  function launch() {
    rockets.push({
      x: W * (0.1 + Math.random() * 0.8),
      y: H + 10,
      target: H * (0.1 + Math.random() * 0.4),
      speed: 7 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(2,4,11,0.20)";
    ctx.fillRect(0, 0, W, H);

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];

      r.y -= r.speed;

      ctx.beginPath();
      ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r.color})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgb(${r.color})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (r.y <= r.target) {
        explode(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035;
      p.vx *= 0.985;
      p.life -= p.decay;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.life})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgb(${p.color})`;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  setInterval(launch, 700);

  launch();
  launch();
  launch();

  animate();


  /* =========================
     YES / NO
  ========================= */

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const questionText = document.getElementById("questionText");
  const questionHint = document.getElementById("questionHint");
  const ending = document.getElementById("ending");

  let noCount = 0;

  if (yesBtn && noBtn) {

    noBtn.addEventListener("click", function () {

      noCount++;

      const messages = [
        "Are you sure? 😭",
        "Think again 😂",
        "Really? 👀",
        "One more chance?",
        "I don't believe you 😭"
      ];

      questionHint.textContent =
        messages[Math.min(noCount - 1, messages.length - 1)];

      noBtn.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-10px)" },
          { transform: "translateX(10px)" },
          { transform: "translateX(0)" }
        ],
        {
          duration: 300
        }
      );
    });


    yesBtn.addEventListener("click", function () {

      questionText.textContent = "I knew it. ❤️";
      questionHint.textContent = "Okay... look at this.";

      document.querySelector(".answers").style.display = "none";

      setTimeout(function () {

        ending.classList.add("show");

        ending.scrollIntoView({
          behavior: "smooth"
        });

        startCats();

      }, 900);
    });

  }


  /* =========================
     CUTE CATS
  ========================= */

  const cats = document.getElementById("cats");

  if (!cats) return;

  const c = cats.getContext("2d");

  function resizeCats() {
    cats.width = window.innerWidth;
    cats.height = window.innerHeight;
  }

  resizeCats();
  window.addEventListener("resize", resizeCats);

  let catsStarted = false;

  function startCats() {

    if (catsStarted) return;

    catsStarted = true;

    function draw(time) {

      const w = cats.width;
      const h = cats.height;

      c.clearRect(0, 0, w, h);

      const center = w / 2;
      const y = h / 2 + 100;
      const distance = w < 600 ? 60 : 105;
      const scale = w < 600 ? 0.7 : 0.9;

      function cat(x, flip, ring) {

        c.save();

        c.translate(x, y);

        if (flip) c.scale(-scale, scale);
        else c.scale(scale, scale);

        /* body */
        c.fillStyle = "#d9ad88";

        c.beginPath();
        c.ellipse(0, 60, 42, 55, 0, 0, Math.PI * 2);
        c.fill();

        /* head */
        c.beginPath();
        c.arc(0, 0, 40, 0, Math.PI * 2);
        c.fill();

        /* ears */
        c.beginPath();
        c.moveTo(-32, -25);
        c.lineTo(-25, -62);
        c.lineTo(-5, -32);
        c.fill();

        c.beginPath();
        c.moveTo(32, -25);
        c.lineTo(25, -62);
        c.lineTo(5, -32);
        c.fill();

        /* eyes */
        c.fillStyle = "#171717";

        c.beginPath();
        c.arc(-14, -3, 3.5, 0, Math.PI * 2);
        c.arc(14, -3, 3.5, 0, Math.PI * 2);
        c.fill();

        /* nose */
        c.beginPath();
        c.arc(0, 9, 3, 0, Math.PI * 2);
        c.fill();

        /* tail */
        c.strokeStyle = "#d9ad88";
        c.lineWidth = 10;
        c.lineCap = "round";

        c.beginPath();
        c.arc(-42, 60, 30, Math.PI, Math.PI * 1.6);
        c.stroke();

        /* ring */
        if (ring) {
          c.strokeStyle = "#ffd85c";
          c.lineWidth = 4;

          c.beginPath();
          c.arc(42, 55, 9, 0, Math.PI * 2);
          c.stroke();

          c.fillStyle = "#fff";

          c.beginPath();
          c.arc(42, 46, 3, 0, Math.PI * 2);
          c.fill();
        }

        c.restore();
      }

      cat(center - distance, false, false);
      cat(center + distance, true, true);

      c.font = "28px Georgia";
      c.fillStyle = "rgba(255,120,150,.8)";

      const floating = Math.sin(time / 500) * 8;

      c.fillText(
        "♡",
        center - 12,
        y - 100 + floating
      );

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

});
