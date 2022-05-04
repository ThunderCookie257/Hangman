
// randomly chosen phrase
let phrase = "";
// associated meaning of phrase 
let meaning = "";
// list of labels representing phrase characters
let phraseLabels = [];
// number of guesses taken
let numGuesses = 0;
// number of incorrect guesses 
let numWrong = 0;
// list of wrong guesses 
let guesses = [];
// list of wrong guess labels
let guessesLabels = [];
// list of phrases 
let phrases = ["It is raining cats and dogs – It’s raining very hard",
    "A dime a dozen – Something is very common, or of no particular value",
    "By the skin of your teeth – Narrowly or barely escaping a disaster",
    "Come rain or shine – No matter the circumstances, something will get done",
    "It costs an arm and a leg – It’s very expensive",
    "It went to the dogs – Something is no longer as good as it was in the past",
    "To run like the wind – To run very fast",
    "Go on a wild goose chase – Go on a futile search or pursuit",
    "A cloud on the horizon – Something that threatens to cause problems in the future",
    "Hit the nail on the head – To do something exactly right",
    "Piece of cake – An especially easy task",
    "Steal your thunder – To take credit for someone else’s work or achievements",
    "Through thick and thin – To experience both the good and bad times",
    "Hold your horses – Wait a moment; slow down",
    "To do something at the drop of a hat – To do something at once, without any delay",
    "Once in a blue moon – Rarely",
    "To take a rain check – To postpone a plan",
    "To have bigger fish to fry – To have more important things to do with your time",
    "To miss the boat – To miss an opportunity",
    "Call it a day – It’s time to stop working on something",
    "Kill time  – To do something for the sake of passing the time while you’re waiting for another thing to occur",
    "Time flies  – To express that time passes quickly",
    "Better late than never  – It’s better to do something late than not doing it at all",
    "At the eleventh hour  – When you complete something at the very last minute before it’s too late",
    "A blessing in disguise – A good thing that seemed bad at first",
    "The best of both worlds – Benefiting from two different opportunities at once",
    "A perfect storm – The worst possible situation",
    "To be on thin ice – To be in a risky situation",
    "A snowball effect – A situation that becomes more serious and potentially dangerous over time",
    "When it rains it pours – Everything is going wrong at once",
    "To get out of hand – To lose control in a situation",
    "To get a taste of your own medicine – To be treated the way you’ve treated others",
    "To throw caution to the wind – To do something without worrying about the risk",
    "To bite the bullet – To force yourself to do something unpleasant or difficult",
    "Barking up the wrong tree – To pursue the wrong course of action",
    "To go down in flames – To fail miserably at something",
    "Best thing since sliced bread – To praise something for being especially great",
    "Safe bet – Something that is sure to succeed",
    "In full swing – Something that is currently in process and moving efficiently along",
    "Up in the air  – Something that is uncertain or still undecided"];

// canvas upon which the hangman will be drawn 
let HangCanv = document.getElementById("hangman");
let HangCtx = HangCanv.getContext("2d");
HangCtx.moveTo(30, 10);
HangCtx.lineTo(200, 10);
HangCtx.stroke();
HangCtx.moveTo(30, 10);
HangCtx.lineTo(30, 350);
HangCtx.stroke();
HangCtx.moveTo(30, 350);
HangCtx.lineTo(350, 350);
HangCtx.stroke();
HangCtx.strokeStyle = '#FFFEFC';
HangCtx.stroke();

// The play button
document.querySelector("#playButton").addEventListener('click', function() {
    startGame();
});

// The confirm button
document.querySelector("#confirmButton").addEventListener('click', function() {
    if (String(document.getElementById('inputBox').value).length != 1) {
        alert("Please enter a single letter");
    } else {
        entry = String(document.getElementById("inputBox").value);
        numGuesses++;
        processEntry(entry);
    }
});
document.getElementById("confirmButton").disabled = true;

// Add a buttton for hints --- that displays the definition
// !!!!!!!!!!!!!!!!!!!

// The game function
function startGame() {
    getPhrase();
    setUpGame();
}

// Select the random phrase
function getPhrase() {
    let choice = phrases[Math.floor(Math.random() * 41) + 1];
    let dash = choice.indexOf('–');
    phrase = choice.substring(0,dash - 1);
    meaning = choice.substring(dash + 2);
}

// sets up the display of the game -- the empty spaces for letter guesses and guessed letters
function setUpGame() {
    console.log(phrase);
    // set up guesses space
    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] != ' ') {
            // create empty box 
            let label = document.createElement('Label');
            label.innerHTML = " _ ";
            document.getElementById("Guesses").appendChild(label);
            phraseLabels.push(label);
        } else {
            // create empty space
            let label = document.createElement('Label');
            label.innerHTML = " &nbsp; ";
            document.getElementById("Guesses").appendChild(label);
            phraseLabels.push(label);
        }
    }
    // setup guesses taken
    let label = document.createElement("Label");
    label.innerHTML = "Incorrect Guesses: ";
    document.getElementById("GuessesTaken").appendChild(label);

    // disable play button
    document.getElementById("playButton").disabled = true;
    document.getElementById("confirmButton").disabled = false;

    // setup input box
    let boxLabel = document.createElement("Label");
    boxLabel.setAttribute("for", "Guess");
    boxLabel.innerHTML = "Enter your guess!";
    document.getElementById("inputBox").appendChild(boxLabel);
    let inputBox = document.createElement("input");
    inputBox.setAttribute("id", "Guess")
    inputBox.setAttribute("type", "text");
    document.getElementById("inputBox").appendChild(inputBox);
}

// processes the entry from the input box -- advancing the state of the game 
function processEntry(entry) {
    if (phrase.includes(entry.toUpperCase()) || phrase.includes(entry.toLowerCase())) {
        // change appropriate labels to entry 
        for (let i = 0; i < phrase.length; i++) {
            if (phrase[i] == entry.toUpperCase() || phrase[i] == entry.toLowerCase()) {
                phraseLabels[i].innerHTML = phrase[i];
            }
        }
        // check win condition
        let labelStr = "";
        for (let i = 0; i < phrase.length; i++) {
            if (phraseLabels[i].innerHTML == " &nbsp; ") {
                phraseLabels[i].innerHTML = " ";
            }
        }
        for (let i = 0; i < phrase.length; i++) {
            labelStr += phraseLabels[i].innerHTML;
        }
        console.log(labelStr);
        if (labelStr == phrase) {
            alert("You win!");
            document.getElementById("confirmButton").disabled = true;
            saveResult(true);
        } else {
            for (let i = 0; i < phrase.length; i++) {
                if (phraseLabels[i].innerHTML == " ") {
                    phraseLabels[i].innerHTML = " &nbsp; ";
                }
            }
        }
    } else {
        // Update list of guesses taken so far 
        numWrong++;
        guesses.push(entry);
        let label = document.createElement("Label");
        label.innerHTML = entry;
        guessesLabels.push(label);
        document.getElementById("GuessesTaken").appendChild(label);
        // draw the next hangman piece 
        switch(numWrong) {
            case 1:
                HangCtx.beginPath();
                HangCtx.arc(200, 50, 40, 0, 2 * Math.PI);
                HangCtx.stroke();
                break;
                case 2:
                    HangCtx.moveTo(200, 100);
                    HangCtx.lineTo(200, 200);
                    HangCtx.stroke();
                    break;
                    case 3:
                        HangCtx.moveTo(200, 120);
                        HangCtx.lineTo(250, 180);
                        HangCtx.stroke();
                        break;
                        case 4:
                            HangCtx.moveTo(200, 120);
                            HangCtx.lineTo(150, 180);
                            HangCtx.stroke();
                            break;
                            case 5:
                                HangCtx.moveTo(200, 200);
                                HangCtx.lineTo(250, 280);
                                HangCtx.stroke();
                                break;
                                case 6:
                                    HangCtx.moveTo(200, 200);
                                    HangCtx.lineTo(150, 280);
                                    HangCtx.stroke();
                                    alert("You lose!");
                                    document.getElementById("confirmButton").disabled = true;
                                    saveResult(false);
                                    break;
                                    default:
                                        break;

        }
    }
    // loop back -- enable confirm button again 
}

// saves the result of the game- true for win and false for loss
function saveResult(result) {
    
}