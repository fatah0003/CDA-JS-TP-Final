const words = [
    "pomme", "livre", "table", "chien", "glace", "plage", "rouge", "vertu", "brume", "fleur",
    "arbre", "cerise", "blaze", "roche", "salut", "porte", "peine", "valet", "nuit", "foyer",
    "saison", "farce", "panne", "frais", "chose", "flore", "vague", "tigre", "pince", "sable"
];



const word = words[Math.floor(Math.random() * words.length)];
// console.log("Mot à deviner :", word); //

let nmbTry = 5;
let lettersPlayer = [];
let gameOver = false;

const grille = document.getElementById("grille");

for (let i = 0; i < 25; i++) {
    const caseLettre = document.createElement("div");
    caseLettre.classList.add("case");
    grille.appendChild(caseLettre);
}
let ligneActuelle = 0

addEventListener("keydown", (event) => {
    if (gameOver) return; // ⛔ empêche d’écrire après la fin

    const key = event.key.toLowerCase();

    if (/^[a-z]$/.test(key) && lettersPlayer.length < 5) {
        lettersPlayer.push(key);
        console.log("Lettres saisies :", lettersPlayer.join(""));
        const caseKey = document.querySelectorAll('.case')
        let x = ligneActuelle * 5 + lettersPlayer.length - 1
        
        caseKey[x].innerText = key
    }
    if (event.key === "Backspace") {
        if (lettersPlayer.length > 0) {
            lettersPlayer.pop();
    
            const caseKey = document.querySelectorAll('.case');
            let x = ligneActuelle * 5 + lettersPlayer.length; 
    
            caseKey[x].innerText = ""; 
        }
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
        const caseKey = document.querySelectorAll('.case')
        for (let i = 0; i< word.length; i++){
            if(lettersPlayer[i] === word[i]){
                let x = ligneActuelle * 5 + i;
                caseKey[x].classList.add('case_valide');
            }
            
            else if(word.includes(lettersPlayer[i])){
                let x = ligneActuelle * 5 + i;
                caseKey[x].classList.add('case_place');
            }
        }
        lettersPlayer = [];
        ligneActuelle++
        
    }
});



