// Function to generate two teams and reserves
function generateTeams() {

  const playersTextValue = document.getElementById("players").value;
  const outputElement = document.getElementById("output");
  const playersPerTeam = document.getElementById("playersPerTeam").value;

  //convert playersperTeam to number
  const playersPerTeamNumber = Number(playersPerTeam);

  //convert playersTextValue to array split by carriage return
  const players = playersTextValue.split("\n");

  // remove blank lines from players
  for (let i = 0; i < players.length; i++) {
    if (players[i] == "") {
      players.splice(i, 1);
    }
  }

  // Check if there are enough players
  if (players.length < playersPerTeamNumber*2) {
    throw new Error('Not enough players');
  }

  // Shuffle the players array using Fisher-Yates shuffle algorithm
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  // Divide the shuffled players into two teams
  const teamDark = players.slice(0, playersPerTeamNumber);
  const teamLight = players.slice(playersPerTeamNumber, playersPerTeamNumber*2);

  // Put the remaining players in reserves
  const reserves = players.slice(playersPerTeamNumber*2);

  // Update the output element with the teams and reserves
  outputElement.innerHTML = `
        <h3>Teams</h3>
        <p>Dark: ${teamDark.join(", ")}</p>
        <p>Light: ${teamLight.join(", ")}</p>
        <h3>Reserves</h3>
        <p>${reserves.join(", ")}</p>
    `;

  // Return the teams and reserves
  return [teamDark, teamLight, reserves];
}

// Function to handle file input change
function handleFileInput(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const contents = event.target.result;
    document.getElementById("players").value = contents;
  };
  reader.readAsText(file);
}

// Add event listener to file input
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", handleFileInput);
});
