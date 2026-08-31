/* ==============================
   START
============================== */

function goToStory(){
  document.getElementById("story").scrollIntoView({
    behavior:"smooth"
  });
}


/* ==============================
   FLOATING DECOR
============================== */

const decorItems = ["💗","✨","🦋","🌸","💌","♡","🐼","🎀"];

function createFlyingDecor(){

  const item = document.createElement("div");

  item.className = "flying";

  item.textContent =
    decorItems[Math.floor(Math.random() * decorItems.length)];

  item.style.left =
    Math.random() * 95 + "%";

  item.style.fontSize =
    (16 + Math.random() * 22) + "px";

  item.style.animationDuration =
    (8 + Math.random() * 10) + "s";

  document.body.appendChild(item);

  setTimeout(()=>{
    item.remove();
  },18000);

}

setInterval(createFlyingDecor,1200);


/* ==============================
   QUESTION
============================== */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionText = document.getElementById("questionText");

let noClicks = 0;

const noMessages = [
  "Think again… 🥺",
  "Are you really sure? 👀",
  "Hmm… I don't believe you 😭",
  "Okay okay… think one more time 🥺❤️"
];

noBtn.addEventListener("click",function(){

  questionText.textContent =
    noMessages[Math.min(noClicks, noMessages.length - 1)];

  noClicks++;

});


yesBtn.addEventListener("click",function(){

  const fireworksPage =
    document.getElementById("fireworksPage");

  fireworksPage.style.display = "flex";

  setTimeout(()=>{
    fireworksPage.scrollIntoView({
      behavior:"smooth"
    });

    startFireworks();

  },100);

});


/* ==============================
   FIREWORKS
============================== */

let fireworksStarted = false;

function startFireworks(){

  if(fireworksStarted) return;

  fireworksStarted = true;

  const canvas =
    document.getElementById("fireworksCanvas");

  const ctx =
    canvas.getContext("2d");

  let width;
  let height;

  const rockets = [];
  const particles = [];

  function resize(){

    width =
      canvas.width =
      window.innerWidth;

    height =
      canvas.height =
      window.innerHeight;

  }

  resize();

  window.addEventListener(
    "resize",
    resize
  );


  const colors = [
    [255,35,85],
    [35,100,255],
    [255,255,255],
    [255,70,150],
    [70,170,255]
  ];


  function launchRocket(){

    rockets.push({

      x:
        Math.random() * width,

      y:
        height + 20,

      targetY:
        height *
        (.12 + Math.random() * .5),

      speed:
        7 + Math.random() * 6,

      color:
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ]

    });

  }


  function explode(x,y,color){

    for(let i = 0; i < 180; i++){

      const angle =
        Math.random() *
        Math.PI * 2;

      const speed =
        1 +
        Math.random() * 8;

      particles.push({

        x:x,
        y:y,

        vx:
          Math.cos(angle) * speed,

        vy:
          Math.sin(angle) * speed,

        gravity:
          .035,

        friction:
          .985,

        life:1,

        size:
          1 +
          Math.random() * 2.5,

        color:color

      });

    }

  }


  function animate(){

    ctx.fillStyle =
      "rgba(3,4,11,.18)";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );


    /* ROCKETS */

    for(
      let i = rockets.length - 1;
      i >= 0;
      i--
    ){

      const rocket =
        rockets[i];

      rocket.y -=
        rocket.speed;

      ctx.beginPath();

      ctx.arc(
        rocket.x,
        rocket.y,
        2.5,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgb(${rocket.color.join(",")})`;

      ctx.shadowBlur = 25;

      ctx.shadowColor =
        `rgb(${rocket.color.join(",")})`;

      ctx.fill();

      ctx.shadowBlur = 0;


      if(
        rocket.y <=
        rocket.targetY
      ){

        explode(
          rocket.x,
          rocket.y,
          rocket.color
        );

        rockets.splice(
          i,
          1
        );

      }

    }


    /* PARTICLES */

    for(
      let i = particles.length - 1;
      i >= 0;
      i--
    ){

      const p =
        particles[i];

      p.x += p.vx;
      p.y += p.vy;

      p.vx *= p.friction;
      p.vy *= p.friction;

      p.vy += p.gravity;

      p.life -= .008;


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

      ctx.shadowBlur = 16;

      ctx.shadowColor =
        `rgb(${p.color.join(",")})`;

      ctx.fill();

      ctx.shadowBlur = 0;


      if(p.life <= 0){

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


  /* BIG START */

  for(let i = 0; i < 25; i++){

    setTimeout(
      launchRocket,
      i * 180
    );

  }


  setInterval(
    launchRocket,
    350
  );


  animate();

}


/* ==============================
   LETTER
============================== */

document
  .getElementById("letterBtn")
  .addEventListener("click",function(){

    const letterPage =
      document.getElementById("letterPage");

    letterPage.style.display =
      "flex";

    setTimeout(()=>{
      letterPage.scrollIntoView({
        behavior:"smooth"
      });
    },100);

});


/* ==============================
   FINAL + LILY RAIN
============================== */

document
  .getElementById("finalBtn")
  .addEventListener("click",function(){

    const finalPage =
      document.getElementById("finalPage");

    finalPage.style.display =
      "flex";

    setTimeout(()=>{
      finalPage.scrollIntoView({
        behavior:"smooth"
      });
    },100);

    startLilyRain();

});


function startLilyRain(){

  const container =
    document.getElementById("lilyRain");

  const flowers = [
    "🌸",
    "🌺",
    "🤍",
    "✦"
  ];


  /* LOTS OF FLOWERS */

  for(let i = 0; i < 180; i++){

    const flower =
      document.createElement("div");

    flower.className =
      "lily";

    flower.textContent =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];

    flower.style.left =
      Math.random() *
      100 +
      "%";

    flower.style.fontSize =
      (18 + Math.random() * 28) +
      "px";

    flower.style.animationDuration =
      (5 + Math.random() * 7) +
      "s";

    flower.style.animationDelay =
      (Math.random() * 5) +
      "s";

    container.appendChild(
      flower
    );

  }


  /* CONTINUOUS RAIN */

  setInterval(()=>{

    const flower =
      document.createElement("div");

    flower.className =
      "lily";

    flower.textContent =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];

    flower.style.left =
      Math.random() *
      100 +
      "%";

    flower.style.fontSize =
      (18 + Math.random() * 30) +
      "px";

    flower.style.animationDuration =
      (5 + Math.random() * 7) +
      "s";

    container.appendChild(
      flower
    );

    setTimeout(()=>{
      flower.remove();
    },13000);

  },180);

}
