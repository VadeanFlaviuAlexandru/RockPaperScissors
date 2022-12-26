var db = new Dexie("Leaderboard");


db.version(1).stores({
    UsersSaved: `
    ++id,
    name,
    score`,
});

//--------------------------------------------------------------------------------------------
document.getElementById("BtnForDelete").onclick = function DeleteUserFromLeaderboard() {
    id = parseInt(document.getElementById("InputForDelete").value)
    db.UsersSaved.where("id").equals(id).delete()
    displayScores();
}

function SavingUserInLeaderboard(PlayerName, PlayerScore) {
    db.UsersSaved.put(
        {
            name: PlayerName,
            score: PlayerScore
        }).then(() => db.UsersSaved.toArray())
        .then(UsersSaved => {
            let anotherone = "";
            UsersSaved.forEach(element => {
                anotherone = anotherone + "<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.score + "</td></tr>";
            });
            document.getElementById("Leadeboard").innerHTML = anotherone;
        })
}



function displayScores(UsersSaved) {
    db.UsersSaved.toArray()
        .then(UsersSaved => {
            let anotherone = "";
            UsersSaved.forEach(element => {
                anotherone = anotherone + "<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.score + "</td></tr>";
            });
            document.getElementById("Leadeboard").innerHTML = anotherone;
        })
}

window.addEventListener('load', () => {
    displayScores();
});