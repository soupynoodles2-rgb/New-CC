// --- Screen Switchers ---
const dingSound = new Audio("ding.mp3");
const popSound = new Audio("pop.mp3");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const backButton = document.getElementById("back-button");
const upgradesBtn = document.getElementById("upgradesBtn");
const shopModal = document.getElementById("shopModal");
const closeShop = document.getElementById("closeShop");

startBtn.addEventListener("click", () => {
  menu.classList.add("hidden");
  game.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
  game.classList.add("hidden");
  menu.classList.remove("hidden");
if (secretDiv) {
    secretDiv.remove();
    secretDiv = null;
  }
});

// --- Upgrades & About placeholders ---
upgradesBtn.addEventListener("click", () => {
  shopModal.classList.remove("hidden"); // opens the cookie shop
});
closeShop.addEventListener("click", () => {
  shopModal.classList.add("hidden");     // closes it
});
document.getElementById("aboutBtn").addEventListener("click", () => {
  alert("Cookie Clicker: Love Edition 💜 by Bae 🎀");
});

// --- Game Logic ---
const cookie = document.getElementById("cookie");
const countDisplay = document.getElementById("count");
const messageDisplay = document.getElementById("message");
const loveFill = document.getElementById("love-fill");
const loveStatus = document.getElementById("love-status");
let count = 0;
let loveClicks = 0;
let clickCount = 0;
let secretDiv = null;

cookie.addEventListener("click", () => {
 popSound.currentTime = 0; // reset to start
  popSound.play();
  count++;
  loveClicks++;
  clickCount++;

  updateCount();
  updateLoveMeter();
  showMessage();
  cookie.classList.add("pop");
  setTimeout(() => cookie.classList.remove("pop"), 200);

  if (clickCount === 30 && !secretDiv) {
    secretDiv = document.createElement("div");
    secretDiv.className = "secret-msg";
    secretDiv.textContent = "Psst... You’re the sweetest surprise in my life, Cookie 💌";
    document.body.appendChild(secretDiv);
  }

  spawnConfetti();
spawnHearts();
function spawnHearts() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = (cookie.offsetLeft + 50 + Math.random() * 100) + "px"; // near cookie
  heart.style.top = (cookie.offsetTop - 10) + "px"; 
  heart.style.fontSize = (14 + Math.random() * 10) + "px";
  heart.style.opacity = 1;
  heart.textContent = "❤️";
  document.body.appendChild(heart);

  // Animate heart upwards and fade
  const duration = 1500 + Math.random() * 500;
  heart.animate([
    { transform: `translateY(0px)`, opacity: 1 },
    { transform: `translateY(-100px) translateX(${Math.random()*40-20}px)`, opacity: 0 }
  ], { duration: duration, easing: "ease-out" });

  setTimeout(() => heart.remove(), duration);
	}
});

// --- Functions ---
function updateCount() {
  countDisplay.textContent = count;
}

function showMessage() {
  const messages = [
    "You're my fav cookie 💜",
    "Can't get enough of you!",
    "So sweet, so clicky 🍪",
    "Made with love 💞",
    "You're the only one I want",
    "Keep tapping, bae 🎀",
    "Cookie = love",
    "You're my serotonin snack",
    "Clickin’ for kisses 💋",
    "You're so addicting!"
  ];
  const random = Math.floor(Math.random() * messages.length);
  messageDisplay.textContent = messages[random];
}

let loveMaxed = false; // track if 100% has been reached

function updateLoveMeter() {
  const percent = Math.min((loveClicks / 30) * 100, 100);
  loveFill.style.width = percent + "%";

  if (percent < 33) {
    loveStatus.textContent = "Just a lil' crush 💕";
    loveMaxed = false; // reset so ding can play again next time
  } else if (percent < 66) {
    loveStatus.textContent = "Feeling the spark ✨";
    loveMaxed = false;
  } else if (percent < 100) {
    loveStatus.textContent = "Deep in the feels 💞";
    loveMaxed = false;
  } else {
    loveStatus.textContent = "FULL LOVE MODE 🔥💖";
    if (!loveMaxed) {
      dingSound.currentTime = 0; // reset sound
      dingSound.play();          // play ding
      loveMaxed = true;          // prevent it from spamming
    }
  }
}
document.querySelectorAll(".shop-item button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    const cost = parseInt(item.dataset.cost);
    const img = item.dataset.img;

    if (count >= cost) {
      count -= cost;
      updateCount();
      cookie.src = img;
      alert(`You bought ${item.querySelector("p").textContent}! 🍪`);
    } else {
      alert("Not enough 💖 points!");
    }
  });
});

// --- Neon Mode Toggle ---
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("neon-mode");
});

// --- Confetti Effect ---
function spawnConfetti() {
  const confettiCount = 10;
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = (3 + Math.random() * 2) + "s";
    confetti.style.opacity = 1;
    document.body.appendChild(confetti);

    confetti.addEventListener("animationend", () => {
      confetti.remove();
    });
  }
}