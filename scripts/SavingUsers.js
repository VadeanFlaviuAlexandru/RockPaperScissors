let Player1Name;
let Player2Name;
let Player1Score = 0;
let Player2Score = 0;

function CheckPlayerCount() {
    if (document.getElementById("Player1NameInput").value.length != 0 && document.getElementById("Player2NameInput").value.length != 0) {
        document.getElementById("StartGameVS").classList.remove("disabled");
    }
}

document.getElementById("Player1Ready").onclick = function SavePlayer1() {
    if (document.getElementById("Player1NameInput").value.length != 0) {
        Player1Name = document.getElementById("Player1NameInput").value;
        ShowingInformation("Player1", Player1Name)
        document.getElementById("PCinfo").style.visibility="visible";
        document.getElementById("StartGamePC").classList.remove("disabled");
        document.getElementById("Player2Ready").classList.remove("disabled");
        CheckPlayerCount();
        document.getElementById("SelectGenderPlayer2").removeAttribute("disabled");
    } else {
        EmptyNameAlert();
    }
}

document.getElementById("Player2Ready").onclick = function SavePlayer2() {
    if (document.getElementById("Player2NameInput").value.length != 0) {
        Player2Name = document.getElementById("Player2NameInput").value;
        ShowingInformation("Player2", Player2Name)
        CheckPlayerCount();
        document.getElementById("SelectGenderPlayer2").setAttribute("disabled", "disabled");
    }
    else {
        EmptyNameAlert();
    }
}

function ShowingInformation(Player1, PlayerName) {
    Player1Name = document.getElementById("Player1NameInput").value;
    document.getElementById(Player1 + "Profile").style.visibility = "visible";
    document.getElementById(Player1 + "Name").innerText = `${PlayerName}`;
    document.getElementById(Player1 + "Score").innerText = `Score: ${Player1Score}`;
    document.getElementById(Player1 + "Ready").classList.add("disabled");
    document.getElementById("SelectGender" + Player1).setAttribute("disabled", "disabled");
    if (document.getElementById("SelectGender" + Player1).value == "male") {
        document.getElementById(Player1 + "PictureM").style.display = "block";
    } else {
        document.getElementById(Player1 + "PictureF").style.display = "block";
    }
}

function AgainstComputer(){
    Player2Name = "Computer";
    document.getElementById("Player2Name").innerText = `${Player2Name}`;
    document.getElementById("Player1Score").innerText = `Score: ${Player2Score}`;
    document.getElementById("Player2PicturePC").style.display = "block";
    document.getElementById("Player2Profile").style.visibility = "visible";
    document.getElementById("Player2Score").style.visibility = "visible";
    if (document.getElementById("SelectGenderPlayer2").value == "male") {
        document.getElementById("Player2PictureM").style.display = "none";
    } else {
        document.getElementById("Player2PictureF").style.display = "none";
    }
}

function EmptyNameAlert(){
    Toastify({
        text: "Name cannot be empty!",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "#ff0000",
        }
    }).showToast();
}