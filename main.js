// const words = [
//     "pomme", "livre", "table", "chien", "glace", "plage", "rouge", "vertu", "brume", "fleur",
//     "arbre", "blaze", "roche", "salut", "porte", "peine", "valet", "nuit", "foyer",
//     "farce", "panne", "frais", "chose", "flore", "vague", "tigre", "pince", "sable"
// ];

// const word = words[Math.floor(Math.random() * words.length)];
// --------------------------

// Utilser une API externe pour le mot à trouver 
const BASE_URL = "https://trouve-mot.fr/api/random"
let word;
let lengthword = 0
async function getWord() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        word = data[0].name;
        lengthword = word.length;
        console.log(word);
        console.log(lengthword);


        initGrille();
    } catch (error) {
        console.error("Erreur :", error);
    }
}

getWord();

let nmbTry = 5;
let lettersPlayer = [];
let gameOver = false;
let ligneActuelle = 0;
const grille = document.getElementById("grille");

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
        btn.setAttribute("data-key", touche.toLocaleLowerCase());
        if (touche === "Entrer" || touche === "Supprimer") {
            btn.classList.add("touche-action");
        }
        btn.textContent = touche;
        divLigne.appendChild(btn);
    });

    clavier.appendChild(divLigne);
});

// ⬇️ Initialise la grille
function initGrille() {
    grille.innerHTML = "";
    grille.style.display = "grid";
    grille.style.gridTemplateColumns = `repeat(${lengthword}, 50px)`;
    grille.style.gridTemplateRows = `repeat(5, 50px)`; // 5 essais

    for (let i = 0; i < 5 * lengthword; i++) {
        const caseLettre = document.createElement("div");
        caseLettre.classList.add("case");
        grille.appendChild(caseLettre);
    }
}




// ⬇️ Affiche une lettre dans la bonne case
function afficherLettre(key) {
    const caseKey = document.querySelectorAll('.case');
    const x = ligneActuelle * lengthword + lettersPlayer.length - 1;
    caseKey[x].innerText = key;
}

// ⬇️ Supprime la dernière lettre tapée
function supprimerDerniereLettre() {
    if (lettersPlayer.length > 0) {
        lettersPlayer.pop();
        const caseKey = document.querySelectorAll('.case');
        const x = ligneActuelle * lengthword + lettersPlayer.length;
        caseKey[x].innerText = "";
    }
}

// ⬇️ Vérifie le mot saisi et colore les cases
function verifierMot() {
    const motTape = lettersPlayer.join("");
    const caseKey = document.querySelectorAll('.case');
    const toucheUtilisees = Array(word.length).fill(false);

    function colorerTouche(toucheClique, classe) {
        if (!toucheClique) return;

        // Ne pas écraser une couleur plus forte
        const dejaValide = toucheClique.classList.contains('case_valide');
        const dejaPlace = toucheClique.classList.contains('case_place');

        if (classe === 'case_valide' ||
            (classe === 'case_place' && !dejaValide) ||
            (classe === 'case_wrong' && !dejaValide && !dejaPlace)) {
            toucheClique.classList.remove('case_wrong', 'case_place', 'case_valide');
            toucheClique.classList.add(classe);
        }
    }

    // 1ère passe : lettres bien placées
    for (let i = 0; i < word.length; i++) {
        const x = ligneActuelle * lengthword + i;
        const toucheClique = document.querySelector(`.touche[data-key="${lettersPlayer[i]}"]`);

        if (lettersPlayer[i] === word[i]) {
            caseKey[x].classList.add('case_valide');
            colorerTouche(toucheClique, 'case_valide');
            toucheUtilisees[i] = true; // marquer comme utilisée
        }
    }

    // 2ème passe : lettres mal placées ou absentes
    for (let i = 0; i < word.length; i++) {
        const x = ligneActuelle * lengthword + i;
        const lettre = lettersPlayer[i];

        // Passer si déjà traitée comme "bien placée"
        if (lettre === word[i]) continue;

        const toucheClique = document.querySelector(`.touche[data-key="${lettre}"]`);
        let found = false;

        for (let j = 0; j < word.length; j++) {
            if (!toucheUtilisees[j] && lettre === word[j]) {
                found = true;
                toucheUtilisees[j] = true;
                break;
            }
        }

        if (found) {
            caseKey[x].classList.add('case_place');
            colorerTouche(toucheClique, 'case_place');
        } else {
            caseKey[x].classList.add('case_wrong');
            colorerTouche(toucheClique, 'case_wrong');
        }
    }

    // Fin du tour
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

    if (/^[a-z]$/.test(key) && lettersPlayer.length < lengthword) {
        lettersPlayer.push(key);
        afficherLettre(key);
    }

    if (event.key === "Backspace") {
        supprimerDerniereLettre();
    }

    if (event.key === "Enter") {
        if (lettersPlayer.length !== lengthword) {
            console.log("⛔ Il faut entrer " + lengthword + " lettres avant de valider !");
            return;
        }
        verifierMot();
    }
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
