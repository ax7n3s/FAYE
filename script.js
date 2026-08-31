/* =========================
   FLYING DECORATIONS
========================= */

const flyingItems = [
  "💗",
  "🩷",
  "🤍",
  "🦋",
  "✨",
  "🌸",
  "♡",
  "💌",
  "✦",
  "🫶🏻"
];

document
.querySelectorAll(".story-section")
.forEach(section => {

  for(let i = 0; i < 8; i++){

    const item =
    document.createElement("span");

    item.className =
    "flying";

    item.textContent =
    flyingItems[
      Math.floor(
        Math.random() *
        flyingItems.length
      )
    ];

    item.style.left =
    Math.random() * 95 + "%";

    item.style.fontSize =
    14 + Math.random() * 22 + "px";

    item.style.animationDuration =
    7 + Math.random() * 9 + "s";

    item.style.animationDelay =
    -Math.random() * 10 + "s";

    section.appendChild(item);
  }


  for(let i = 0; i < 7; i++){

    const heart =
    document.createElement("span");

    heart.className =
    "tiny-heart";

    heart.textContent =
    Math.random() > .5
    ? "♡"
    : "✦";

    heart.style.left =
    Math.random() * 95 + "%";

    heart.style.top =
    Math.random() * 90 + "%";

    heart.style.animationDelay =
    Math.random() * 5 + "s";

    section.appendChild(heart);
  }

});


/* =========================
   YES / NO
========================= */

const yesBtn =
document.getElementById("yesBtn");

const noBtn =
document.getElementById("noBtn");

const answer =
document.getElementById("answerMessage");

const after =
document.getElementById("afterAnswer");

const yesAgain =
document.getElementById("yesAgain");

let noClicks = 0;


noBtn.addEventListener(
  "click",
  function(){

    noClicks++;

    if(noClicks === 1){

      answer.textContent =
      "Think again 🥺💗";

    }

    else if(noClicks === 2){

      answer.textContent =
      "I don't believe you 😭🥺";

    }

    else{

      answer.textContent =
      "Come onnn Faye 🥺❤️";

    }

    after.style.display =
    "block";

  }
);


yesBtn.addEventListener(
  "click",
  openFireworks
);

yesAgain.addEventListener(
  "click",
  openFireworks
);


function openFireworks(){

  document
  .getElementById("question")
  .style.display = "none";


  const fire =
  document
  .getElementById("fireworkSlide");

  fire.style.display =
  "flex";


  window.scrollTo({
    top:fire.offsetTop,
    behavior:"smooth"
  });


  startFireworks();

}


/* =========================
   FIREWORKS
========================= */

let fireworksStarted = false;


function startFireworks(){

  if(fireworksStarted)
  return;

  fireworksStarted = true;


  const canvas =
  document
  .getElementById("fireworks");

  const ctx =
  canvas.getContext("2d");


  let W;
  let H;

  let rockets = [];

  let particles = [];


  function resize(){

    const dpr =
    window.devicePixelRatio || 1;

    canvas.width =
    window.innerWidth * dpr;

    canvas.height =
    window.innerHeight * dpr;

    canvas.style.width =
    window.innerWidth + "px";

    canvas.style.height =
    window.innerHeight + "px";

    ctx.setTransform(
      dpr,0,0,dpr,0,0
    );

    W =
    window.innerWidth;

    H =
    window.innerHeight;

  }


  resize();

  window.addEventListener(
    "resize",
    resize
  );


  const colors = [

    "#ff174f",
    "#397cff",
    "#ffffff",
    "#ff4f9a",
    "#6da0ff",
    "#ffd4e5"

  ];


  function launch(){

    rockets.push({

      x:
      Math.random() * W,

      y:
      H + 20,

      targetY:
      H * (
        .08 +
        Math.random() * .5
      ),

      speed:
      8 +
      Math.random() * 6,

      color:
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ]

    });

  }


  function explode(
    x,
    y,
    color
  ){

    for(
      let i = 0;
      i < 220;
      i++
    ){

      const angle =
      Math.random() *
      Math.PI * 2;

      const speed =
      Math.random() * 8 + 1;


      particles.push({

        x:x,

        y:y,

        vx:
        Math.cos(angle) *
        speed,

        vy:
        Math.sin(angle) *
        speed,

        alpha:1,

        size:
        Math.random() *
        2.5 + 1,

        color:color

      });

    }

  }


  function animate(){

    ctx.fillStyle =
    "rgba(3,4,11,.16)";

    ctx.fillRect(
      0,
      0,
      W,
      H
    );


    for(
      let i =
      rockets.length - 1;

      i >= 0;

      i--
    ){

      const r =
      rockets[i];


      r.y -=
      r.speed;


      ctx.beginPath();

      ctx.moveTo(
        r.x,
        r.y + 28
      );

      ctx.lineTo(
        r.x,
        r.y
      );


      ctx.strokeStyle =
      r.color;

      ctx.lineWidth = 2;

      ctx.shadowBlur = 18;

      ctx.shadowColor =
      r.color;

      ctx.stroke();


      if(
        r.y <=
        r.targetY
      ){

        explode(
          r.x,
          r.y,
          r.color
        );

        rockets.splice(
          i,
          1
        );

      }

    }


    for(
      let i =
      particles.length - 1;

      i >= 0;

      i--
    ){

      const p =
      particles[i];


      p.x +=
      p.vx;

      p.y +=
      p.vy;


      p.vx *=
      .985;

      p.vy *=
      .985;

      p.vy +=
      .04;

      p.alpha -=
      .008;


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
      p.color;

      ctx.globalAlpha =
      Math.max(
        p.alpha,
        0
      );

      ctx.shadowBlur =
      16;

      ctx.shadowColor =
      p.color;

      ctx.fill();

      ctx.globalAlpha =
      1;


      if(
        p.alpha <= 0
      ){

        particles.splice(
          i,
          1
        );

      }

    }


    requestAnimationFrame(
      animate
    );

  }


  /* HUGE START */

  for(
    let i = 0;
    i < 25;
    i++
  ){

    setTimeout(
      launch,
      i * 140
    );

  }


  /* CONTINUOUS */

  setInterval(
    function(){

      launch();

      if(
        Math.random() > .45
      ){

        launch();

      }

    },
    450
  );


  animate();

}


/* =========================
   OPEN LETTER
========================= */

document
.getElementById("continueBtn")
.addEventListener(
  "click",
  function(){

    document
    .getElementById(
      "fireworkSlide"
    )
    .style.display =
    "none";


    const letter =
    document
    .getElementById(
      "letterSlide"
    );


    letter.style.display =
    "flex";


    window.scrollTo({

      top:
      letter.offsetTop,

      behavior:
      "smooth"

    });

  }
);


/* =========================
   FINAL LILIES
========================= */

document
.getElementById("finalBtn")
.addEventListener(
  "click",
  function(){

    document
    .getElementById(
      "letterSlide"
    )
    .style.display =
    "none";


    const final =
    document
    .getElementById(
      "finalSlide"
    );


    final.style.display =
    "flex";


    window.scrollTo({

      top:
      final.offsetTop,

      behavior:
      "smooth"

    });


    /* LOTS OF LILIES */

    for(
      let i = 0;
      i < 150;
      i++
    ){

      const petal =
      document.createElement(
        "div"
      );


      petal.className =
      "petal";


      petal.textContent =
      Math.random() > .15
      ? "🌸"
      : "✦";


      petal.style.left =
      Math.random() *
      100 + "%";


      petal.style.fontSize =
      18 +
      Math.random() *
      27 + "px";


      petal.style.animationDuration =
      4 +
      Math.random() *
      7 + "s";


      petal.style.animationDelay =
      Math.random() *
      5 + "s";


      final.appendChild(
        petal
      );

    }

  }
);
