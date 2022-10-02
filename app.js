// Règles :
// Le jeu comprend 2 joueurs sur un seul et même écran.
// Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
// À chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le
// résultat d’un lancer est ajouté au ROUND.
// Lors de son tour, le joueur peut décider à tout moment de:
// - Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le
// tour de l’autre joueur.
// - Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
// Le premier joueur qui atteint les 100 points sur global gagne le jeu.

//---------------------------------------------------------------------------------------

//--------------- création variables pour le jeu

let scores, roundScore, activePlayer, gamePlaying;
init();
// création d'une fonction pour génerer un numéro random entre 1 et 6

const rollDice = function () {
  playSoundDe();
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;

    let diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "./assets/dice-" + dice + ".png";

    // Si le score du dé est strictement différent de 1
    if (dice !== 1) {
      // Ajouter score du dé dans le round du joueur actif
      roundScore += dice;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
      document.querySelector(".player-" + activePlayer).classList.add("active");
    } else {
      // Fonction joueur suivant si la condition n'est pas respecté
      playSoundWrong();
      nextPlayer();
    }
  }
};

let rollBtn = document.getElementById("rollBtn");
rollBtn.addEventListener("click", rollDice);

//--------------- Fonction pour récuperer le current
const hold = function () {
  playSoundHold();
  if (gamePlaying) {
    // Ajouter current au score global du joueur actif
    scores[activePlayer] += roundScore;

    // Ajout contenu dans le dom
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Condition pour désactiver hold si round est à 0
    currentScore = roundScore;
    if (currentScore == 0) {
      nextPlayer(false);
    }
    // Condition si le joueur à atteint un score de 100
    if (scores[activePlayer] >= 100) {
      gamePlaying = false;
      playSoundWin();
      document.getElementById("current-0").textContent = 0;
      document.getElementById("current-1").textContent = 0;
      document.querySelector("#name-" + activePlayer).textContent = "Gagné !";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("Gagné !");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Passer au joueur suivant
      nextPlayer();
    }
  }
};

let holdBtn = document.getElementById("holdBtn");
holdBtn.addEventListener("click", hold);

// Fonction pour gerer 2 joueurs
function nextPlayer() {
  roundScore = 0;
  //Si le joueur en jeu
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0").classList.toggle("active");
  document.querySelector(".player-1").classList.toggle("active");
  document.querySelector(".dice").style.display = "block";
}

function init() {
  // playSoundRestart();
  // Reinitialiser les variables
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Reintialiser les scores
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // Reintialiser nom des joueurs
  document.getElementById("name-0").textContent = "Joueur 1";
  document.getElementById("name-1").textContent = "Joueur 2";
  document.getElementById("inputName0").value = "";
  document.getElementById("inputName1").value = "";

  // Supprimer les messages
  document.querySelector(".player-0-panel").classList.remove("Gagné");
  document.querySelector(".player-1-panel").classList.remove("Gagné");
  document.querySelector(".player-0").classList.remove("active");
  document.querySelector(".player-1").classList.remove("active");
  document.querySelector(".player-0").classList.add("active");
}
// bouton nouvelle partie
let newGame = document.getElementById("newGameBtn");
newGame.addEventListener("click", init);

// Fonction pour editer pseudos
const edit = function () {
  //Recuperer input des pseudos
  let inputName0 = document.getElementById("inputName0").value;
  document.querySelector("#name-0").textContent = inputName0;
  let inputName1 = document.getElementById("inputName1").value;
  document.querySelector("#name-1").textContent = inputName1;

  //Si cases vide après validation, le pseudo ne change pas
  if (inputName0 === "") {
    document.querySelector("#name-0").textContent = "Joueur 1";
  }
  if (inputName1 === "")
    document.querySelector("#name-1").textContent = "Joueur 2";
};

let editName = document.getElementById("editBtn");
editName.addEventListener("click", edit);

// gestion des sons du jeu

const diceSound = new Audio("/assets/diceSound.mp3");
const wrongSound = new Audio("/assets/wrongNumberSound.mp3");
const winSound = new Audio("/assets/winSound.mp3");
const moneySound = new Audio("/assets/moneySound.mp3");

function playSoundDe() {
  diceSound.play();
}
function playSoundWrong() {
  wrongSound.play();
}
function playSoundHold() {
  moneySound.play();
}

function playSoundWin() {
  winSound.play();
}
