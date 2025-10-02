var right_side = null;
var left_side = null;
var setting_open = false;
var difficulty = "Easy";
var currentDifficultyButton = null;
var canvaElement;
var settingsButton;
var gameContainer;
var settingsContainer;
var difficultyEasyButton;
var difficultyDajeButton;
var difficultyMedioButton;
var difficultyHardButton;
var difficultyImpossibleButton;
var scoreElement;
var resetButton;
    
var life_containers = [];
var currentGameDifficultyMode = null;
var currentWord = "Destra"; // "Destra" or "Sinistra"
var currentWordElement = null;
var mauseIsIn= false;
var gameStatus = {
    score: 0,
    lifes: 3
}
const songGap = 25;
const rightPath  =[`./assets/right-choices-img/right_img1.gif`,
                    `./assets/right-choices-img/right_img2.jpg`,
                    `./assets/right-choices-img/right_img4.png`,
                    `./assets/right-choices-img/right_img3.png`];

const wrongPath = [`./assets/wrong-choices-img/wrong_img1.jpg`,
                    `./assets/wrong-choices-img/wrong_img2.jpg`,
                    `./assets/wrong-choices-img/wrong_img3.jpg`,
                    `./assets/wrong-choices-img/wrong_img4.jpg`,
                    `./assets/wrong-choices-img/wrong_img5.jpg`,
                    `./assets/wrong-choices-img/wrong_img6.jpg`,
                    `./assets/wrong-choices-img/wrong_img7.png`];

const songsArray = [`./assets/songs/hello_kitty.mp3`,
                    `./assets/songs/come_un_pittore.mp3`,
                    `./assets/songs/diamonds.mp3`,
                    `./assets/songs/maledetta_primavera.mp3`];

const rightChoiceMessages = ["Grande!", "Brava!", "Spingere!","Let's goski!","UwU","Slay💅","Daje!","Boia chi molla!","Volo!"];
const wrongChoiceMessages = ["Opss!", "Ahia!", "Rip!","Capperetti!","Nope!","Mannaggina!","Non benissimo!"];


for(let song in songsArray) {
    fetch('./assets/songs/hello_kitty.mp3').then(response => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return cache.put('./assets/songs/hello_kitty.mp3', response);
    })
}

for(let img in rightPath) {
    fetch(rightPath[img]).then(response => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return cache.put(rightPath[img], response);
    })  
}

for(let img in wrongPath) {
    fetch(wrongPath[img]).then(response => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return cache.put(wrongPath[img], response);
    })  
}

window.onload = function() {
    
    right_side = document.getElementById("right-side");
    left_side = document.getElementById("left-side");

    canvaElement = document.getElementById("canva");
    settingsButton = document.getElementById("settings-button");
    gameContainer = document.getElementById("game-container");
    difficultyEasyButton = document.getElementById("difficultyEasyButton");
    difficultyDajeButton = document.getElementById("difficultyDajeButton");
    difficultyMedioButton = document.getElementById("difficultyMedioButton");
    difficultyHardButton = document.getElementById("difficultyHardButton");
    difficultyImpossibleButton = document.getElementById("difficultyImpossibleButton"); 

    scoreElement = document.getElementById("score");
    resetButton = document.getElementById("reset");
    currentDifficultyButton = difficultyEasyButton;
    
    settingsContainer = document.getElementById("settings-container");
    
    life_containers = [...document.getElementsByClassName("life")];
    currentWordElement = document.getElementById("current-word");
    settingsButton.onclick = function() {
        toggleSettings();
        
        
    }


    right_side.onmouseenter = function(e) {
        if(gameStatus.lifes <= 0) return;
        if(mauseIsIn) return;
        mauseIsIn = true;
        if(currentWord === "Destra" ){
            playCorrectSound();
            if(Math.random() < 0.5) {
                newRightmessage = document.createElement("img");
                randomImg = Math.floor(Math.random()*(rightPath.length))+1;
                newRightmessage.src = rightPath[randomImg-1];
                newRightmessage.style.top = e.clientY + "px";
                newRightmessage.style.width = "250px";
                newRightmessage.style.height = "250px";
                newRightmessage.classList.add("message");
            }else{
                newRightmessage = createMessage(rightChoiceMessages[Math.floor(Math.random() * rightChoiceMessages.length)],e.clientY,"white");
            }
            madeRightChoice();
        }else {     
            playErrorSound();
            if(Math.random() < 0.5) {
                newRightmessage = document.createElement("img");
                randomImg = Math.floor(Math.random()*(wrongPath.length))+1;
                newRightmessage.src = wrongPath[randomImg-1];
                newRightmessage.style.top = e.clientY + "px";
                newRightmessage.style.width = "250px";
                newRightmessage.style.height = "250px";
                newRightmessage.classList.add("message");
            }  
            else{
                newRightmessage = createMessage(wrongChoiceMessages[Math.floor(Math.random() * wrongChoiceMessages.length)],e.clientY,"red");
            }     
            madeWrongChoice();
            screenShake();
        }
        right_side.appendChild(newRightmessage);  
        vanishAnimation(newRightmessage);
    }

    
    left_side.onmouseenter = function(e) {
        if(mauseIsIn) return;
        mauseIsIn = true;

        if(gameStatus.lifes <= 0) return;
        if(currentWord === "Sinistra"){
            playCorrectSound();
            if(Math.random() < 0.5) {
                newLeftmessage = document.createElement("img");
                randomImg = Math.floor(Math.random()*(rightPath.length))+1;
                newLeftmessage.src = rightPath[randomImg-1];
                newLeftmessage.style.top = e.clientY + "px";
                newLeftmessage.style.width = "250px";
                newLeftmessage.style.height = "250px";
                newLeftmessage.classList.add("message");
            }else{
                newLeftmessage = createMessage(rightChoiceMessages[Math.floor(Math.random() * rightChoiceMessages.length)],e.clientY,"white");    
            }
            
            madeRightChoice();
        }else {  
            playErrorSound();   
            if(Math.random() < 0.5) {
                newLeftmessage = document.createElement("img");
                randomImg = Math.floor(Math.random()*(wrongPath.length))+1;
                console.log(randomImg);
                newLeftmessage.src = wrongPath[randomImg-1];
                newLeftmessage.style.top = e.clientY + "px";
                newLeftmessage.style.width = "250px";
                newLeftmessage.style.height = "250px";
                newLeftmessage.classList.add("message");
            }  
            else{
                newLeftmessage = createMessage(wrongChoiceMessages[Math.floor(Math.random() * wrongChoiceMessages.length)],e.clientY,"red");
            }     
            madeWrongChoice();
            screenShake();
        }
        left_side.appendChild(newLeftmessage);  
        vanishAnimation(newLeftmessage);
    }

    resetButton.addEventListener("click",()=> reset());

    right_side.onmouseleave = function(e) {
        mauseIsIn = false;
        if(gameStatus.lifes <= 0) return;
        currentWord = generateRandomWord();
        currentWordElement.innerText = currentWord;
        setTextColor(currentWordElement);
    }
    left_side.onmouseleave = function(e) {
        mauseIsIn = false;
        if(gameStatus.lifes <= 0) return;
        currentWord = generateRandomWord();
        currentWordElement.innerText = currentWord;
        setTextColor(currentWordElement);
    }

}

setDifficultyEasy = function() {
    difficulty = "Easy";
    currentDifficultyButton.classList.remove("active");
    difficultyEasyButton.classList.add("active");
    currentDifficultyButton = difficultyEasyButton;
    reset();
    generateRandomWord = function() {
        return "Destra"
    }
    setTextColor = defaultTextColor;
    setTextColor(currentWordElement);
}
setDifficultyDaje = function() {
    difficulty = "Daje";
    currentDifficultyButton.classList.remove("active");
    difficultyDajeButton.classList.add("active");
    currentDifficultyButton = difficultyDajeButton;
    reset();
    generateRandomWord = function() {
        let random = Math.random();
        if(random <0.8) {
            newWord = "Destra";
        } else {
            newWord = "Sinistra";
        }
        return newWord;
    }
    setTextColor = defaultTextColor;
    setTextColor(currentWordElement);
}
setDifficultyMedio = function() {
    difficulty = "Medio";
    currentDifficultyButton.classList.remove("active");
    difficultyMedioButton.classList.add("active");
    currentDifficultyButton = difficultyMedioButton;
    reset();
    generateRandomWord = function() {
        let random = Math.random();
        if(random <0.5) {
            newWord = "Destra";
        } else {
            newWord = "Sinistra";
        }
        return newWord;
    }
    setTextColor = defaultTextColor;
    setTextColor(currentWordElement);
}
setDifficultyHard = function() {
    difficulty = "Hard";
    currentDifficultyButton.classList.remove("active");
    difficultyHardButton.classList.add("active");
    currentDifficultyButton = difficultyHardButton;
    reset();
    generateRandomWord = function() {
        let random = Math.random();
        if(random <0.5) {
            newWord = "Destra";
        } else {
            newWord = "Sinistra";
        }
        return newWord;
    }
    setTextColor = noTextColor;
    setTextColor(currentWordElement);
}
setDifficultyImpossible = function() {
    difficulty = "Impossible";
    currentDifficultyButton.classList.remove("active");
    difficultyImpossibleButton.classList.add("active");
    currentDifficultyButton = difficultyImpossibleButton;
    reset();
    generateRandomWord = function() {
        let random = Math.random();
        if(random <0.5) {
            newWord = "Destra";
        } else {
            newWord = "Sinistra";
        }
        return newWord;
    }
    setTextColor = randomTextColor;
    setTextColor(currentWordElement);
}


madeRightChoice = function() { 
    gameStatus.score += 1;
    scoreElement.innerText = gameStatus.score;

    if(gameStatus.score % songGap === 0) {

        playSong(songsArray[(Math.floor(gameStatus.score/songGap)-1) % songsArray.length]);
    }


}

madeWrongChoice = function() {
    if(gameStatus.lifes > 0) {
        gameStatus.lifes -= 1;
        life_containers[gameStatus.lifes].children[0].src="./assets/empty-heart.svg";
    }
}


createMessage = function(message, position,color) {
    let messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.style.top = position + "px"; 
    messageElement.style.color = color;
    messageElement.classList.add("message");
    return messageElement;
}

vanishAnimation = function(element) {
    element.style.display = "block";
    element.style.animation = "vanish 1.4s ease-in-out";
    setTimeout(() => {
       element.style.animation = "";
       element.style.display = "none";
         element.remove();
    },1200)
}


screenShake = function() {
    // Implement screen shake effect
    document.body.style.animation = "shake 0.5s";
    setTimeout(() => {
        document.body.style.animation = "";
    }, 500);
}
generateRandomWord = function() {
    return "Destra";
}

reset = function() {
    gameStatus.score = 0;
    gameStatus.lifes = 3;
    for(let life of life_containers) {
        life.children[0].src="./assets/full-heart.svg";
    }
    scoreElement.innerText = gameStatus.score;
}

var defaultTextColor = function(element) {
    if(element.innerText === "Destra") {
        element.style.color = "#ff3dff";
    } else {
        element.style.color = "#60afffff";
    }   
}
setTextColor = defaultTextColor;

noTextColor = function(element) {
    element.style.color = "black";
}

randomTextColor = function(element) {
    if(Math.random() < 0.5) {
        element.style.color = "#ff3dff";
    } else {
        element.style.color = "#60afffff";}
}
playCorrectSound = function(){
    var audio = new Audio('./assets/correct_sound.mp3');
    audio.volume = 0.2;
    audio.play();
}

playErrorSound = function(){
    var audio = new Audio('./assets/error_sound.m4a');
    audio.volume = 0.4;
    audio.play();
}

toggleSettings = function() {
    if(!setting_open) {
        canvaElement.style.gridTemplateColumns = "0fr 1fr 0fr";
        hideGameShowSettings();
    }
    else{
        canvaElement.style.gridTemplateColumns = "1fr 1fr 1fr";
        showGameHideSettings();
    }
    setting_open = !setting_open;
}

hideGameShowSettings = function() {
    gameContainer.style.display = "none";
    settingsContainer.style.display = "block";
    settingsButton.style.transform="rotate(90deg)";
}
showGameHideSettings = function() {
    gameContainer.style.display = "block";
    settingsContainer.style.display = "none";
    settingsButton.style.transform="rotate(0deg)";
}

playSong = function(path) {
    var audio = new Audio(path);
    console.log(path);
    audio.volume = 0.1;
    audio.play();
}