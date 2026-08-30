document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     FIREWORKS
  ========================= */

  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  let W = 0;
  let H = 0;

  const rockets = [];
  const particles = [];

  const colors = [
    [60, 120, 255],
    [255, 55, 85],
    [255, 220, 100],
    [255, 255, 255]
  ];

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function launchRocket() {

    rockets.push({
      x: W * (.08 + Math.random() * .84),
      y: H + 20,
      target: H * (.10 + Math.random() * .42),
      speed: 7 + Math.random() * 2,
      color: colors[
        Math.floor(Math.random() * colors.length)
      ]
    });
  }

  function explode(x, y, color) {

    for (let i = 0; i < 150; i++) {

      const angle =
        Math.random() * Math.PI * 2;

      const speed =
        1.5 + Math.random() * 5;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,

        life: 1,

        decay:
          .007 + Math.random() * .008,

        size:
          .8 + Math.random() * 2,

        color
      });
    }
  }

  function fireworksLoop() {

    ctx.fillStyle = "rgba(2,4,11,.20)";
    ctx.fillRect(0, 0, W, H);

    for (let i = rockets.length - 1; i >= 0; i--) {

      const r = rockets[i];

      r.y -= r.speed;

      ctx.beginPath();
      ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);

      ctx.fillStyle =
        `rgb(${r.color.join(",")})`;

      ctx.shadowBlur = 15;
      ctx.shadowColor =
        `rgb(${r.color.join(",")})`;

      ctx.fill();

      ctx.shadowBlur = 0;

      if (r.y <= r.target) {

        explode(
          r.x,
          r.y,
          r.color
        );

        rockets.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {

      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= .985;
      p.vy *= .985;

      p.vy += .035;
      p.life -= p.decay;

      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(${p.color.join(",")},${p.life})`;

      ctx.shadowBlur = 10;
      ctx.shadowColor =
        `rgb(${p.color.join(",")})`;

      ctx.fill();

      ctx.shadowBlur = 0;

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(fireworksLoop);
  }

  launchRocket();
  launchRocket();

  setInterval(() => {

    if (rockets.length < 5) {
      launchRocket();
    }

  }, 700);

  fireworksLoop();


  /* =========================
     LOVE QUESTION
  ========================= */

  const yesBtn =
    document.getElementById("yesBtn");

  const noBtn =
    document.getElementById("noBtn");

  const questionText =
    document.getElementById("questionText");

  const questionHint =
    document.getElementById("questionHint");

  const ending =
    document.getElementById("ending");

  const answers =
    document.querySelector(".answers");

  let noCount = 0;

  const messages = [
    "Are you sure? 😭",
    "Think again. 👀",
    "Really? 😂",
    "I don't believe you. 🥹"
  ];

  noBtn.addEventListener("click", () => {

    noCount++;

    questionHint.textContent =
      messages[
        Math.min(
          noCount - 1,
          messages.length - 1
        )
      ];

    noBtn.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 300
      }
    );
  });


  yesBtn.addEventListener("click", () => {

    questionText.textContent =
      "I knew it. ❤️";

    questionHint.textContent =
      "Okay... look.";

    answers.style.display = "none";

    setTimeout(() => {

      ending.classList.add("show");

      ending.scrollIntoView({
        behavior: "smooth"
      });

      startCatScene();

    }, 900);

  });


  /* =========================
     CAT COUPLE + RING
  ========================= */

  const catCanvas =
    document.getElementById("cats");

  const catCtx =
    catCanvas.getContext("2d");

  let CW = 0;
  let CH = 0;

  function resizeCats() {

    CW = catCanvas.width =
      window.innerWidth;

    CH = catCanvas.height =
      window.innerHeight;
  }

  resizeCats();

  window.addEventListener(
    "resize",
    resizeCats
  );

  let catStarted = false;

  function drawCat(
    x,
    y,
    scale,
    flip,
    armOut
  ) {

    catCtx.save();

    catCtx.translate(x, y);

    if (flip) {
      catCtx.scale(-scale, scale);
    } else {
      catCtx.scale(scale, scale);
    }

    /* body */

    catCtx.fillStyle = "#d7aa82";

    catCtx.beginPath();

    catCtx.ellipse(
      0,
      60,
      43,
      57,
      0,
      0,
      Math.PI * 2
    );

    catCtx.fill();


    /* head */

    catCtx.beginPath();

    catCtx.arc(
      0,
      0,
      40,
      0,
      Math.PI * 2
    );

    catCtx.fill();


    /* ears */

    catCtx.beginPath();

    catCtx.moveTo(-32, -24);
    catCtx.lineTo(-25, -62);
    catCtx.lineTo(-5, -32);

    catCtx.fill();

    catCtx.beginPath();

    catCtx.moveTo(32, -24);
    catCtx.lineTo(25, -62);
    catCtx.lineTo(5, -32);

    catCtx.fill();


    /* eyes */

    catCtx.fillStyle = "#171717";

    catCtx.beginPath();

    catCtx.arc(
      -14,
      -3,
      3.5,
      0,
      Math.PI * 2
    );

    catCtx.arc(
      14,
      -3,
      3.5,
      0,
      Math.PI * 2
    );

    catCtx.fill();


    /* nose */

    catCtx.beginPath();

    catCtx.arc(
      0,
      9,
      3,
      0,
      Math.PI * 2
    );

    catCtx.fill();


    /* smile */

    catCtx.beginPath();

    catCtx.arc(
      0,
      9,
      9,
      0,
      Math.PI
    );

    catCtx.strokeStyle =
      "#171717";

    catCtx.lineWidth = 1.8;

    catCtx.stroke();


    /* tail */

    catCtx.strokeStyle =
      "#d7aa82";

    catCtx.lineWidth = 10;

    catCtx.lineCap = "round";

    catCtx.beginPath();

    catCtx.arc(
      -43,
      65,
      30,
      Math.PI,
      Math.PI * 1.6
    );

    catCtx.stroke();


    /* arm */

    if (armOut) {

      catCtx.strokeStyle =
        "#d7aa82";

      catCtx.lineWidth = 9;

      catCtx.beginPath();

      catCtx.moveTo(32, 55);
      catCtx.lineTo(55, 65);

      catCtx.stroke();
    }


    catCtx.restore();
  }


  function drawRing(x, y, progress) {

    catCtx.save();

    const ringX =
      x - 55 + progress * 55;

    const ringY =
      y + 55 - progress * 15;

    catCtx.strokeStyle =
      "#ffd85c";

    catCtx.lineWidth = 4;

    catCtx.beginPath();

    catCtx.arc(
      ringX,
      ringY,
      9,
      0,
      Math.PI * 2
    );

    catCtx.stroke();


    catCtx.fillStyle =
      "#ffffff";

    catCtx.beginPath();

    catCtx.arc(
      ringX,
      ringY - 9,
      3,
      0,
      Math.PI * 2
    );

    catCtx.fill();

    catCtx.restore();
  }


  function startCatScene() {

    if (catStarted) return;

    catStarted = true;

    const startTime =
      performance.now();

    function animateCats(time) {

      const elapsed =
        time - startTime;

      catCtx.clearRect(
        0,
        0,
        CW,
        CH
      );

      const mobile =
        CW < 600;

      const scale =
        mobile ? .7 : .9;

      const distance =
        mobile ? 62 : 105;

      const center =
        CW / 2;

      const y =
        CH / 2 + 100;


      /* soft ground */

      catCtx.fillStyle =
        "rgba(255,255,255,.05)";

      catCtx.beginPath();

      catCtx.ellipse(
        center,
        y + 55,
        mobile ? 135 : 210,
        24,
        0,
        0,
        Math.PI * 2
      );

      catCtx.fill();


      /* cats */

      drawCat(
        center - distance,
        y,
        scale,
        false,
        false
      );

      drawCat(
        center + distance,
        y,
        scale,
        true,
        true
      );


      /* ring animation */

      const progress =
        Math.min(
          elapsed / 2200,
          1
        );

      if (progress > 0.05) {
        drawRing(
          center + distance,
          y,
          progress
        );
      }


      /* floating hearts */

      const float =
        Math.sin(elapsed / 500) * 8;

      catCtx.font =
        mobile
          ? "22px Georgia"
          : "28px Georgia";

      catCtx.fillStyle =
        "rgba(255,110,140,.8)";

      catCtx.fillText(
        "♡",
        center - 12,
        y - 105 + float
      );


      requestAnimationFrame(
        animateCats
      );
    }

    requestAnimationFrame(
      animateCats
    );
  }

});
