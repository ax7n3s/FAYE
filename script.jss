/* =========================================
   REALISTIC FIREWORKS
========================================= */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let W = 0;
let H = 0;

let rockets = [];
let sparks = [];

const colors = [
  [65, 125, 255],
  [255, 55, 85],
  [255, 215, 95],
  [255, 255, 255],
  [150, 90, 255]
];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);


/* Rocket */

class Rocket {

  constructor() {

    this.x = W * (0.08 + Math.random() * 0.84);
    this.y = H + 20;

    this.targetY =
      H * (0.10 + Math.random() * 0.42);

    this.speed =
      7.5 + Math.random() * 2;

    this.color =
      colors[Math.floor(Math.random() * colors.length)];

    this.trail = [];
  }

  update() {

    this.trail.push({
      x: this.x,
      y: this.y
    });

    if (this.trail.length > 14) {
      this.trail.shift();
    }

    this.y -= this.speed;
    this.speed -= 0.015;

    if (this.y <= this.targetY) {

      explode(
        this.x,
        this.y,
        this.color
      );

      return true;
    }

    return false;
  }

  draw() {

    const [r, g, b] = this.color;

    for (
      let i = 1;
      i < this.trail.length;
      i++
    ) {

      const a = this.trail[i - 1];
      const b2 = this.trail[i];

      ctx.beginPath();

      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b2.x, b2.y);

      ctx.strokeStyle =
        `rgba(${r},${g},${b},${i / this.trail.length})`;

      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      2,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgb(${r},${g},${b})`;

    ctx.shadowBlur = 15;
    ctx.shadowColor =
      `rgb(${r},${g},${b})`;

    ctx.fill();

    ctx.shadowBlur = 0;
  }
}


/* Explosion */

function explode(x, y, color) {

  const amount =
    170 + Math.floor(Math.random() * 100);

  for (let i = 0; i < amount; i++) {

    const angle =
      Math.random() * Math.PI * 2;

    const speed =
      1.5 + Math.random() * 5;

    sparks.push({

      x,
      y,

      px: x,
      py: y,

      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,

      gravity: 0.025,

      life: 1,

      decay:
        0.006 + Math.random() * 0.009,

      size:
        0.7 + Math.random() * 2,

      color
    });
  }

  /* Secondary burst */

  setTimeout(() => {

    if (Math.random() < 0.75) {

      for (let i = 0; i < 55; i++) {

        const angle =
          Math.random() * Math.PI * 2;

        const speed =
          1 + Math.random() * 2.8;

        sparks.push({

          x: x + (Math.random() - .5) * 12,
          y: y + (Math.random() - .5) * 12,

          px: x,
          py: y,

          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,

          gravity: 0.03,

          life: 1,

          decay: .012,

          size:
            .6 + Math.random() * 1.4,

          color:
            colors[
              Math.floor(
                Math.random() * colors.length
              )
            ]
        });
      }
    }

  }, 180 + Math.random() * 300);
}


/* Animation */

function fireworksLoop() {

  ctx.fillStyle =
    "rgba(1,3,10,0.18)";

  ctx.fillRect(
    0,
    0,
    W,
    H
  );

  /* Rockets */

  for (
    let i = rockets.length - 1;
    i >= 0;
    i--
  ) {

    const finished =
      rockets[i].update();

    rockets[i].draw();

    if (finished) {
      rockets.splice(i, 1);
    }
  }


  /* Sparks */

  for (
    let i = sparks.length - 1;
    i >= 0;
    i--
  ) {

    const p = sparks[i];

    p.px = p.x;
    p.py = p.y;

    p.x += p.vx;
    p.y += p.vy;

    p.vx *= .985;
    p.vy *= .985;

    p.vy += p.gravity;

    p.life -= p.decay;

    const [r, g, b] = p.color;

    ctx.beginPath();

    ctx.moveTo(p.px, p.py);
    ctx.lineTo(p.x, p.y);

    ctx.strokeStyle =
      `rgba(${r},${g},${b},${p.life})`;

    ctx.lineWidth = p.size;

    ctx.shadowBlur = 10;
    ctx.shadowColor =
      `rgb(${r},${g},${b})`;

    ctx.stroke();

    ctx.shadowBlur = 0;

    if (p.life <= 0) {
      sparks.splice(i, 1);
    }
  }

  requestAnimationFrame(fireworksLoop);
}


/* Launch fireworks */

setInterval(() => {

  if (rockets.length < 5) {
    rockets.push(new Rocket());
  }

}, 650);


/* Occasional fireworks burst */

setInterval(() => {

  const amount =
    2 + Math.floor(Math.random() * 3);

  for (let i = 0; i < amount; i++) {

    setTimeout(() => {
      rockets.push(new Rocket());
    }, i * 180);
  }

}, 4500);


/* Start immediately */

rockets.push(new Rocket());
rockets.push(new Rocket());

fireworksLoop();


/* =========================================
   YES / NO PRANK
========================================= */

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

let noCount = 0;

const noMessages = [
  "Are you sure? 😭",
  "Think again.",
  "Really? 😂",
  "That answer feels suspicious.",
  "One more chance? 👀",
  "Okay okay... your choice. 😭"
];

noBtn.addEventListener("click", () => {

  noCount++;

  questionHint.textContent =
    noMessages[
      Math.min(
        noCount - 1,
        noMessages.length - 1
      )
    ];

  /* Playful visual change */

  noBtn.style.transform =
    `translateX(${Math.sin(noCount * 2) * 10}px)`;

  yesBtn.style.transform =
    `scale(${1 + Math.min(noCount * .04, .18)})`;

});


yesBtn.addEventListener("click", () => {

  questionText.textContent =
    "I knew it. ❤️";

  questionHint.textContent =
    "Okay... now look.";

  document.querySelector(".answers").style.display =
    "none";

  setTimeout(() => {

    ending.scrollIntoView({
      behavior: "smooth"
    });

    ending.classList.add("show");

    startCats();

  }, 1000);
});


/* =========================================
   CUTE CAT COUPLE ENDING
========================================= */

const catCanvas =
  document.getElementById("cats");

const catCtx =
  catCanvas.getContext("2d");

let CW;
let CH;

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


function drawCat(
  x,
  y,
  scale,
  flip,
  ring
) {

  catCtx.save();

  catCtx.translate(x, y);

  if (flip) {
    catCtx.scale(-scale, scale);
  } else {
    catCtx.scale(scale, scale);
  }

  /* Body */

  catCtx.fillStyle =
    "#d9b18d";

  catCtx.beginPath();

  catCtx.ellipse(
    0,
    65,
    48,
    60,
    0,
    0,
    Math.PI * 2
  );

  catCtx.fill();

  /* Head */

  catCtx.beginPath();

  catCtx.arc(
    0,
    0,
    45,
    0,
    Math.PI * 2
  );

  catCtx.fill();

  /* Ears */

  catCtx.beginPath();

  catCtx.moveTo(-35,-28);
  catCtx.lineTo(-28,-72);
  catCtx.lineTo(-5,-38);

  catCtx.fill();

  catCtx.beginPath();

  catCtx.moveTo(35,-28);
  catCtx.lineTo(28,-72);
  catCtx.lineTo(5,-38);

  catCtx.fill();

  /* Eyes */

  catCtx.fillStyle =
    "#15151b";

  catCtx.beginPath();

  catCtx.arc(
    -16,
    -3,
    4,
    0,
    Math.PI * 2
  );

  catCtx.arc(
    16,
    -3,
    4,
    0,
    Math.PI * 2
  );

  catCtx.fill();

  /* Nose */

  catCtx.beginPath();

  catCtx.arc(
    0,
    10,
    4,
    0,
    Math.PI * 2
  );

  catCtx.fill();

  /* Smile */

  catCtx.beginPath();

  catCtx.arc(
    0,
    10,
    12,
    0,
    Math.PI
  );

  catCtx.strokeStyle =
    "#15151b";

  catCtx.lineWidth = 2;

  catCtx.stroke();

  /* Tail */

  catCtx.beginPath();

  catCtx.arc(
    flip ? 50 : -50,
    70,
    35,
    Math.PI,
    Math.PI * 1.6
  );

  catCtx.strokeStyle =
    "#d9b18d";

  catCtx.lineWidth = 12;

  catCtx.lineCap = "round";

  catCtx.stroke();

  /* Ring */

  if (ring) {

    catCtx.strokeStyle =
      "#ffd86b";

    catCtx.lineWidth = 5;

    catCtx.beginPath();

    catCtx.arc(
      48,
      62,
      9,
      0,
      Math.PI * 2
    );

    catCtx.stroke();

    catCtx.fillStyle =
      "#ffffff";

    catCtx.beginPath();

    catCtx.arc(
      48,
      53,
      3,
      0,
      Math.PI * 2
    );

    catCtx.fill();
  }

  catCtx.restore();
}


function startCats() {

  let start = null;

  function animateCats(time) {

    if (!start) {
      start = time;
    }

    const elapsed =
      time - start;

    catCtx.clearRect(
      0,
      0,
      CW,
      CH
    );

    const mobile =
      CW < 600;

    const scale =
      mobile ? .72 : .95;

    const distance =
      mobile ? 65 : 110;

    const centerX =
      CW / 2;

    const baseY =
      CH / 2 + 120;

    /* Soft ground */

    catCtx.fillStyle =
      "rgba(255,255,255,.06)";

    catCtx.beginPath();

    catCtx.ellipse(
      centerX,
      baseY + 55,
      mobile ? 130 : 210,
      25,
      0,
      0,
      Math.PI * 2
    );

    catCtx.fill();

    /* Couple */

    drawCat(
      centerX - distance,
      baseY,
      scale,
      false,
      false
    );

    drawCat(
      centerX + distance,
      baseY,
      scale,
      true,
      true
    );

    /* Little floating hearts */

    catCtx.font =
      `${mobile ? 18 : 24}px Georgia`;

    catCtx.fillStyle =
      "rgba(255,110,140,.8)";

    const float =
      Math.sin(elapsed / 500) * 8;

    catCtx.fillText(
      "♡",
      centerX - 12,
      baseY - 115 + float
    );

    requestAnimationFrame(
      animateCats
    );
  }

  requestAnimationFrame(
    animateCats
  );
}
