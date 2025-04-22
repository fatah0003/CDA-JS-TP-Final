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
console.log(word);

let nmbTry = 5;

let lettersPlayer = []

addEventListener("keydown", (event) => {
    lettersPlayer.push(event.key)
    return lettersPlayer
});

addEventListener("keypress", (event) => {
    if (lettersPlayer.length != 5) {
        console.log("il faut entrer 5 lettres");

    } else if (lettersPlayer.join("") != word) {
        console.log("try again");
        nmbTry--
        console.log(nmbTry);
        lettersPlayer = []
    } else {
        console.log("Trouvé le mot est " + lettersPlayer.join(""));

    }


});