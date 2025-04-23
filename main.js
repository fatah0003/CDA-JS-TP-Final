const words = [
    "pomme", "livre", "table", "chien", "glace", "plage", "rouge", "vertu", "brume", "fleur",
    "arbre", "blaze", "roche", "salut", "porte", "peine", "valet", "nuit", "foyer",
    "farce", "panne", "frais", "chose", "flore", "vague", "tigre", "pince", "sable"
];

const word = words[Math.floor(Math.random() * words.length)];
let nmbTry = 5;
let lettersPlayer = [];
let gameOver = false;
let ligneActuelle = 0;
const grille = document.getElementById("grille");

// ⬇️ Initialise la grille
function initGrille() {
    for (let i = 0; i < 25; i++) {
        const caseLettre = document.createElement("div");
        caseLettre.classList.add("case");
        grille.appendChild(caseLettre);
    }
}

// ⬇️ Affiche une lettre dans la bonne case
function afficherLettre(key) {
    const caseKey = document.querySelectorAll('.case');
    const x = ligneActuelle * 5 + lettersPlayer.length - 1;
    caseKey[x].innerText = key;
}

// ⬇️ Supprime la dernière lettre tapée
function supprimerDerniereLettre() {
    if (lettersPlayer.length > 0) {
        lettersPlayer.pop();
        const caseKey = document.querySelectorAll('.case');
        const x = ligneActuelle * 5 + lettersPlayer.length;
        caseKey[x].innerText = "";
    }
}

// ⬇️ Vérifie le mot saisi et colore les cases
function verifierMot() {
    const motTape = lettersPlayer.join("");
    const caseKey = document.querySelectorAll('.case');

    for (let i = 0; i < word.length; i++) {
        const x = ligneActuelle * 5 + i;
        if (lettersPlayer[i] === word[i]) {
            caseKey[x].classList.add('case_valide');
        } else if (word.includes(lettersPlayer[i])) {
            caseKey[x].classList.add('case_place');
        }
    }

    if (motTape === word) {
        console.log("🎉 Bravo ! Le mot est :", word);
        gameOver = true;
    } else {
        nmbTry--;
        console.log("❌ Mauvais mot. Essais restants :", nmbTry);
        if (nmbTry === 0) {
            console.log("💀 Perdu ! Le mot était :", word);
            gameOver = true;
        }
    }

    lettersPlayer = [];
    ligneActuelle++;
}

initGrille();

addEventListener("keydown", (event) => {
    if (gameOver) return;

    const key = event.key.toLowerCase();

    if (/^[a-z]$/.test(key) && lettersPlayer.length < 5) {
        lettersPlayer.push(key);
        afficherLettre(key);
    }

    if (event.key === "Backspace") {
        supprimerDerniereLettre();
    }

    if (event.key === "Enter") {
        if (lettersPlayer.length !== 5) {
            console.log("⛔ Il faut entrer 5 lettres avant de valider !");
            return;
        }
        verifierMot();
    }
});

const clavier = document.createElement("div");
clavier.id = "clavier";
document.body.appendChild(clavier);

const lignesClavier = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["Entrer", "W", "X", "C", "V", "B", "N", "Supprimer"]
];

lignesClavier.forEach(ligne => {
    const divLigne = document.createElement("div");
    divLigne.classList.add("ligne");

    ligne.forEach(touche => {
        const btn = document.createElement("button");
        btn.classList.add("touche");
        if (touche === "Entrer" || touche === "Supprimer") {
            btn.classList.add("touche-action");
        }
        btn.textContent = touche;
        divLigne.appendChild(btn);
    });

    clavier.appendChild(divLigne);
});

document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("touche")) return;

    const touche = event.target.textContent;

    if (touche === "Entrer") {
        const eventEnter = new KeyboardEvent("keydown", { key: "Enter" });
        dispatchEvent(eventEnter);
    } else if (touche === "Supprimer") {
        const eventBackspace = new KeyboardEvent("keydown", { key: "Backspace" });
        dispatchEvent(eventBackspace);
    } else {
        const lettre = touche.toLowerCase();
        const eventLettre = new KeyboardEvent("keydown", { key: lettre });
        dispatchEvent(eventLettre);
    }
});
