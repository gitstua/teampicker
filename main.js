// Function to generate two teams and reserves
function generateTeams() {

  const playersTextValue = document.getElementById("players").value;
  const teamDarkText = document.getElementById("teamDark");
  const teamLightText = document.getElementById("teamLight");
  const reservesText = document.getElementById("reserves");


  //convert playersTextValue to array split by carriage return
  const players = playersTextValue.split("\n");

  // remove blank lines from players
  for (let i = 0; i < players.length; i++) {
    if (players[i] == "") {
      players.splice(i, 1);
    }
  }

  // Check if there are enough players
  if (players.length < 12) {
    throw new Error('Not enough players');
  }

  // Shuffle the players array using Fisher-Yates shuffle algorithm
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  // Divide the shuffled players into two teams
  const teamDark = players.slice(0, 5);
  const teamLight = players.slice(5, 10);

  // Put the remaining players in reserves
  const reserves = players.slice(10);

  // Update the HTML with the teams and reserves, split by carriage return

  teamDarkText.innerHTML = teamDark.join("\n");
  teamLightText.innerHTML = teamLight.join("\n");
  reservesText.innerHTML = reserves.join("\n");

  // Return the teams and reserves
  return [teamDark, teamLight, reserves];
}

