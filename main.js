const words = [
    "pomme",
    "livre",
    "table",
    "chien",
    "glace",
    "plage",
    "rouge",
    "vertu",
    "brume",
    "fleur"
];

const word = words[Math.floor(Math.random() * words.length)];
console.log("Mot à deviner :", word); // à enlever

let nmbTry = 5;
let lettersPlayer = [];

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    // Filtre : lettres uniquement (a-z)
    if (!/^[a-z]$/.test(key)) return;

    // On ajoute la lettre si on n’a pas encore 5
    if (lettersPlayer.length < 5) {
        lettersPlayer.push(key);
        console.log("Lettres saisies :", lettersPlayer.join(""));
    }

    // Une fois 5 lettres, on vérifie
    if (lettersPlayer.length === 5) {
        if (lettersPlayer.join("") === word) {
            console.log("🎉 Bravo ! Le mot est :", word);
        } else {
            console.log("❌ Mauvais mot. Essaye encore !");
            nmbTry--;
            console.log("Essais restants :", nmbTry);
            if (nmbTry === 0) {
                console.log("💀 Perdu ! Le mot était :", word);
            }
        }

        // On réinitialise pour une nouvelle tentative
        lettersPlayer = [];
    }
});
