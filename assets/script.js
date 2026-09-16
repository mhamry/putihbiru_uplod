let userScore = 0;

const materiPembelajaranBtn = document.querySelector(".materiPembelajaranBtn");
const tujuanPembelajaranBtn = document.querySelector(".tujuanPembelajaranBtn");
const tujuanPembelajaran = document.querySelector(".tujuan-pembelajaran");
const caraPermainanBtn = document.querySelector(".caraPermainanBtn");
const caraPermainan = document.querySelector(".cara-permainan");
const tentangGimBtn = document.querySelector(".tentangGimBtn");
const tentangGim = document.querySelector(".tentang-gim");
const gameContainer = document.querySelector(".container");
const halamanMuka = document.querySelector(".halaman-muka");
const materiPembelajaran = document.querySelector(".materi-pembelajaran");
const backBtn = document.querySelector(".backBtn");
const backMenus = document.querySelectorAll(".backMenu");
const mulaiBtn = document.querySelector(".mulaiBtn");
const success = document.querySelector(".success");
const successBtn = document.querySelector(".successBtn");
const fail = document.querySelector(".fail");
const failBtn = document.querySelector(".failBtn");

const soundBenar = new Audio("assets/sound/benar.mp3");
const soundSalah = new Audio("assets/sound/salah.mp3");

// Fungsi pembantu untuk jeda waktu (Promise-based setTimeout)
const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function updateScore(point) {
  userScore += point;
  const scoreElement = document.querySelector(".score-element");
  if (scoreElement) scoreElement.innerHTML = userScore;
}

function checkFinalscore() {
  if (userScore >= 900) {
    success.style.display = "flex";
    gameContainer.style.display = "none";
  } else {
    fail.style.display = "flex";
    gameContainer.style.display = "none";
  }
}

document.querySelectorAll(".game").forEach(function (game, index, games) {
  const flipCard = game.querySelector(".flip-card");
  const jawaban = game.querySelector(".jawaban");
  const alertBetul = game.querySelector(".alert-betul");
  const alertSalah = game.querySelector(".alert-salah");
  const choices = game.querySelectorAll(".choice");
  const pesanAlertsalah = game.dataset.alert;

  // Sembunyikan semua game selain game pertama
  if (index !== 0) {
    game.style.transform = "translateX(-400%)";
  }

  choices.forEach(function (choice) {
    choice.addEventListener("click", async function () {
      // 1. KUNCI INPUT: Cegah spam-click dengan mematikan interaksi pada game saat ini
      game.style.pointerEvents = "none";

      const isBenar = jawaban.textContent.trim().toLowerCase() === choice.textContent.trim().toLowerCase();

      if (isBenar) {
        // --- JALUR JAWABAN BENAR ---
        flipCard.style.transform = "rotateY(180deg)";
        if (alertBetul) alertBetul.style.display = "block";
        updateScore(100);
        soundBenar.play();

        await tunggu(2000);
        flipCard.style.transform = "rotateY(360deg)";
        await tunggu(500); // Jeda transisi balik flipCard
      } else {
        // --- JALUR JAWABAN SALAH ---
        flipCard.style.transform = "rotateY(180deg)";
        if (alertSalah) alertSalah.style.display = "block";
        updateScore(-50);
        soundSalah.play();

        await tunggu(1700);
        if (pesanAlertsalah) alert(pesanAlertsalah);
        flipCard.style.transform = "rotateY(360deg)";
        await tunggu(500); // Jeda transisi balik flipCard
      }

      // 2. ANIMASI TRANSISI KELUAR GAME SAAT INI
      game.style.transform = "translateX(400%)";
      await tunggu(500); // Tunggu animasi translateX selesai
      game.style.display = "none";

      // 3. TAMPILKAN GAME NEXT / CEK SKOR AKHIR
      if (index + 1 < games.length) {
        const nextGame = games[index + 1];
        nextGame.style.transform = "translateX(0)";
        nextGame.style.pointerEvents = "auto"; // Pastikan game berikutnya bisa diklik
      } else {
        checkFinalscore();
      }
    });
  });
});

//kode single page aplication
materiPembelajaranBtn.addEventListener("click", function () {
  halamanMuka.style.display = "none";
  materiPembelajaran.style.display = "block";
});
tujuanPembelajaranBtn.addEventListener("click", function () {
  halamanMuka.style.display = "none";
  tujuanPembelajaran.style.display = "block";
});
caraPermainanBtn.addEventListener("click", function () {
  halamanMuka.style.display = "none";
  caraPermainan.style.display = "block";
});

tentangGimBtn.addEventListener("click", function () {
  halamanMuka.style.display = "none";
  tentangGim.style.display = "block";
});

backMenus.forEach((backMenu) => {
  backMenu.addEventListener("click", function () {
    halamanMuka.style.display = "flex";
    materiPembelajaran.style.display = "none";
    tujuanPembelajaran.style.display = "none";
    caraPermainan.style.display = "none";
    tentangGim.style.display = "none";
    gameContainer.style.display = "none";
  });
});

backBtn.addEventListener("click", function () {
  halamanMuka.style.display = "flex";
  materiPembelajaran.style.display = "none";
  tujuanPembelajaran.style.display = "none";
  caraPermainan.style.display = "none";
  tentangGim.style.display = "none";
  gameContainer.style.display = "none";
});

//halaman success
successBtn.addEventListener("click", function () {
  success.style.display = "none";
  halamanMuka.style.display = "flex";
  resetGame();
});

//halaman fail
failBtn.addEventListener("click", function () {
  fail.style.display = "none";
  halamanMuka.style.display = "flex";
  resetGame();
});

//reset game
function resetGame() {
  userScore = 0;

  // Reset semua game
  document.querySelectorAll(".game").forEach((game, index) => {
    game.style.display = "block";
    game.style.transform = index === 0 ? "translateX(0)" : "translateX(-400%)";
    game.style.pointerEvents = index === 0 ? "auto" : "none";

    // Reset alert benar dan salah
    const alertBetul = game.querySelector(".alert-betul");
    const alertSalah = game.querySelector(".alert-salah");

    if (alertBetul) alertBetul.style.display = "none";
    if (alertSalah) alertSalah.style.display = "none";

    // Reset flip card
    const flipCard = game.querySelector(".flip-card");

    if (flipCard) {
      flipCard.style.transform = "rotateY(0deg)";
    }
  });

  // Reset tampilan skor
  const scoreElement = document.querySelector(".score-element");

  if (scoreElement) {
    scoreElement.innerHTML = userScore;
  }
}

mulaiBtn.addEventListener("click", function () {
  halamanMuka.style.display = "none";
  gameContainer.style.display = "block";
});
