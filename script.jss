const yes = document.getElementById("yesBtn");
const no = document.getElementById("noBtn");

const text = document.getElementById("questionText");
const hint = document.getElementById("questionHint");

yes.addEventListener("click", function () {
  text.textContent = "I knew it ❤️";
  hint.textContent = "Okay... look.";

  document.querySelector(".answers").style.display = "none";

  document.getElementById("ending").scrollIntoView({
    behavior: "smooth"
  });
});

no.addEventListener("click", function () {
  hint.textContent = "Are you sure? 😭";
});
