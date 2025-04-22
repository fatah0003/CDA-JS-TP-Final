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
console.log("Mot à deviner :", word); // à cacher plus tard

let nmbTry = 5;
let lettersPlayer = [];
let gameOver = false;

addEventListener("keydown", (event) => {
    if (gameOver) return; // ⛔ empêche d’écrire après la fin

    const key = event.key.toLowerCase();

    if (/^[a-z]$/.test(key) && lettersPlayer.length < 5) {
        lettersPlayer.push(key);
        console.log("Lettres saisies :", lettersPlayer.join(""));
    }

    if (event.key === "Enter") {
        if (lettersPlayer.length !== 5) {
            console.log("⛔ Il faut entrer 5 lettres avant de valider !");
            return;
        }

        const motTape = lettersPlayer.join("");

        if (motTape === word) {
            console.log("🎉 Bravo ! Le mot est :", word);
            gameOver = true; // 🛑 bloque la suite du jeu
        } else {
            nmbTry--;
            console.log("❌ Mauvais mot. Essais restants :", nmbTry);

            if (nmbTry === 0) {
                console.log("💀 Perdu ! Le mot était :", word);
                gameOver = true; // 🛑 bloque aussi à la fin du jeu
            }
        }

        lettersPlayer = [];
    }
});

