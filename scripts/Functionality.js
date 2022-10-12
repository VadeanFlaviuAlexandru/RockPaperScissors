let P1Choice;
let P2Choice;
const SelectionButtons = document.querySelectorAll('[data-selection]')
const Selections = [
    {
        name: 'Rock',
        emoji: '✊',
        beats: 'Scissors'
    },
    {
        name: 'Paper',
        emoji: '✋',
        beats: 'Rock'
    },
    {
        name: 'Scissors',
        emoji: '✌',
        beats: 'Paper'
    }
]
document.getElementById("NewGame").onclick = function ReloadPage() {
    location.reload();
}

//VERSUS--------------------------------------------------------------------------------------
document.getElementById("StartGameVS").onclick = function () {
    party.confetti(StartGameVS)
    StartGameVersus()

}

function StartGameVersus() {
    CleaningBeforeStart()
    SelectionButtons.forEach(SelectionButton => {
        SelectionButton.onclick = () => {
            if (turn == 0) {
                document.getElementById("informationP1").style.visibility = "visible"
                let SelectionP1 = SelectionButton.dataset.selection;
                let selection = Selections.find(selection => selection.name === SelectionP1);
                document.getElementById("WhosNext").innerText = `${Player1Name} Has chosen. It is ${Player2Name}'s turn!`;
                turn++;
                P1Choice = Selections.find(selection => selection.name === SelectionP1);
            } else {
                document.getElementById("informationP2").style.visibility = "visible"
                let SelectionP2 = SelectionButton.dataset.selection;
                let selection2 = Selections.find(selection => selection.name === SelectionP2);
                P2Choice = selection2;
                StopTheButtons();
                WhoWon(P1Choice, selection2,1);
            }
        }
    });
}

function WhoWon(P1, P2,GameMode) {
    const P1Won = Winner(P1, P2)
    const P2Won = Winner(P2, P1)
    if (P1Won == true) {
        WhoBeatWho(P1,P2);
        document.getElementById("WhosNext").innerText = `${Player1Name} won this round!`;
        Player1Score++;
        document.getElementById("Player1Score").innerText = `Score: ${Player1Score}`;
        RestartGameMode(GameMode);
    } else if (P2Won == true) {
        WhoBeatWho(P2,P1);
        document.getElementById("WhosNext").innerText = `${Player2Name} won this round!`;
        Player2Score++;
        document.getElementById("Player2Score").innerText = `Score: ${Player2Score}`;
        RestartGameMode(GameMode);
    } else {
        Tie()
        document.getElementById("WhosNext").innerText = "This round was a tie!";
        RestartGameMode(GameMode);
    }
}

document.getElementById("GivingUp").onclick = function IgiveUp() {
    document.getElementById("GivingUp").classList.add("disabled")
    if (Player1Score > Player2Score) {
        document.getElementById("WhosNext").innerText = `Stop! ${Player1Name} won!!`
        party.confetti(Player1Profile)
        StopTheButtons();
        SavingUserInLeaderboard(Player1Name,Player1Score)
    } else if (Player1Score < Player2Score) {
        document.getElementById("WhosNext").innerText = `Stop! ${Player2Name} won!!`
        party.confetti(Player2Profile)
        StopTheButtons();
        SavingUserInLeaderboard(Player2Name,Player2Score)
    } else {
        document.getElementById("WhosNext").innerText = "Nobody has won Rock Paper Pcissors 😔"
        StopTheButtons();
    }
}

function Winner(P1, P2) {
    return P1.beats == P2.name
}

function StartingNewRoundVS() {
    document.getElementById("WhosNext").innerText = "Starting a new round right now..."
    setTimeout(StartGameVersus, 3000);
}
function StartingNewRoundPC() {
    document.getElementById("WhosNext").innerText = "Starting a new round right now..."
    setTimeout(StartGameComputer, 3000);
}

function StopTheButtons(){
    document.getElementById("r").classList.add("disabled")
    document.getElementById("p").classList.add("disabled")
    document.getElementById("s").classList.add("disabled")
    document.getElementById("GivingUp").classList.add("disabled")
}

function ResumeTheButtons(){
    document.getElementById("GivingUp").classList.remove("disabled")
    document.getElementById("r").classList.remove("disabled")
    document.getElementById("p").classList.remove("disabled")
    document.getElementById("s").classList.remove("disabled")
    document.getElementById("informationP1").style.visibility = "hidden"
    document.getElementById("informationP2").style.visibility = "hidden"
}
//--------------------------------------------------------------------------------------------
//COMPUTER------------------------------------------------------------------------------------
function ComputerSelection(){
    const PCchoice = Math.floor(Math.random() * Selections.length)
    return Selections[PCchoice]
}

document.getElementById("StartGamePC").onclick = function () {
    party.confetti(StartGamePC)
    AgainstComputer();
    StartGameComputer();
}

function StartGameComputer() {
    CleaningBeforeStart()
    SelectionButtons.forEach(SelectionButton => {
        SelectionButton.onclick = () => {
                document.getElementById("informationP1").style.visibility = "visible"
                let SelectionP1 = SelectionButton.dataset.selection;
                let selection = Selections.find(selection => selection.name === SelectionP1);
                document.getElementById("WhosNext").innerText = `${Player1Name} Has chosen. It is ${Player2Name}'s turn!`;
                turn++;
                P1Choice = Selections.find(selection => selection.name === SelectionP1);
                //
                document.getElementById("informationP2").style.visibility = "visible"
                let SelectionP2 = ComputerSelection()
                StopTheButtons();
                WhoWon(P1Choice, SelectionP2,2);
        }
    });
}
function RestartGameMode(id){
    if(id==1){
        setTimeout(StartingNewRoundVS, 3500);
    } else {
        setTimeout(StartingNewRoundPC, 3500);
    }
}

function WhoBeatWho(Choice1,Choice2){
    Toastify({
        text: `${Choice1.name} beats ${Choice2.name}!`,
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#00FF00",
        }
    }).showToast();
}

function Tie(){
    Toastify({
        text: `It is a tie!`,
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#00FF00",
        }
    }).showToast();
}

function CleaningBeforeStart(){
    ResumeTheButtons();
    document.getElementById("NewGame").classList.remove("disabled");
    turn = 0;
    document.getElementById("StartGamePC").classList.add("disabled");
    document.getElementById("Player2Ready").classList.add("disabled");
    document.getElementById("GivingUp").classList.remove("invisible");
    document.getElementById("WhosNext").innerText = `It is ${Player1Name}'s turn!`
}