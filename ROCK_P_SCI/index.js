let playerScore = 0;
let computerScore = 0;
window.playGame = function(playerChoice){
const choices = ["Rock", "paper", "scissors"];
const computerChoice = choices[Math.floor(Math.random() * 3)];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById('playerScoreDisplay');
const computerScoreDisplay = document.getElementById('computerScoreDisplay');


playerDisplay.textContent = `Player: ${playerChoice}`;
computerDisplay.textContent   = `Computer: ${computerChoice}`;
let result = "";
if(playerChoice === computerChoice){
    result = "It's a tie";
}
else if(
    (playerChoice === "rock" && computerChoice === "scissors")||
    (playerChoice === "paper" && computerChoice === "rock")||
    (playerChoice === "scisssors" && computerChoice === "paper")
){
    result = "YOU WIN !!!";
}
else{
    result ="YOU LOOSE";
}
resultDisplay.textContent = result;



switch(result){
    case "YOU WIN !!!": 
        resultDisplay.classList.remove("redText");
        resultDisplay.classList.add("greenText");
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        break;
        case "YOU LOOSE": 
        resultDisplay.classList.remove("greenText");
        resultDisplay.classList.add("redText");
        computerScore++;
        computerScoreDisplay.textContent=computerScore;
        break;
        default:
             resultDisplay.classList.remove("greenText", "redText");
}


}