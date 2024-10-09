let revealedAnswers = []; // Store revealed answers
let currentTeam; // Track the current team
let submittedAnswers = { team1: [], team2: [] }; // Store submitted answers for each team
let lastTeamToReveal = ''; // Track the last team to reveal an answer
let totalAnswers = 4; // Total number of answers to reveal

function checkAnswer(team) {
    const answerInput = team === 'team1' ? document.getElementById('team1Answer') : document.getElementById('team2Answer');
    const answer = answerInput.value.trim();
    const teamName = team === 'team1' ? document.getElementById('team1Name').value || 'Team 1' : document.getElementById('team2Name').value || 'Team 2';

    // Check if the answer is already revealed
    if (revealedAnswers.includes(answer)) {
        alert('This answer has already been revealed. Please try a different answer.');
        return false;
    }

    // Check if the answer matches any of the choices
    const choiceElements = document.querySelectorAll('#answerList li');
    let matched = false;

    choiceElements.forEach(choice => {
        if (choice.dataset.answer.toLowerCase() === answer.toLowerCase()) {
            // Reveal the answer by updating the display
            choice.style.display = 'block'; // Show the answer
            matched = true;
            revealedAnswers.push(answer); // Add to revealed answers
            submittedAnswers[team].push(answer); // Store the submitted answer

            // Update last team to reveal
            lastTeamToReveal = teamName;

            const answerList = document.getElementById('answersList');
            const answerItem = document.createElement('li');
            answerItem.textContent = `${teamName} submitted: ${answer}`;
            answerList.appendChild(answerItem); // Display the submitted answer
            
            // Check if all answers have been revealed
            if (revealedAnswers.length === totalAnswers) {
                announceWinner(lastTeamToReveal); // Announce winner if all answers are revealed
            }
        }
    });

    if (!matched) {
        alert('Wrong answer! Switching turn...');
        switchTurn(); // Switch turns if the answer is wrong
    }

    answerInput.value = ''; // Clear the input after submission
    return false; // Prevent form submission
}

function switchTurn() {
    // Switch between teams
    currentTeam = currentTeam === 'team1' ? 'team2' : 'team1';
    const team1Name = document.getElementById('team1Name').value || 'Team 1'; // Default name if not provided
    const team2Name = document.getElementById('team2Name').value || 'Team 2'; // Default name if not provided
    const currentTeamName = currentTeam === 'team1' ? team1Name : team2Name;

    document.getElementById('turnIndicator').innerText = `Current Turn: ${currentTeamName}`; // Update turn indicator

    // Enable/disable submit buttons based on the current turn
    document.getElementById('team1Submit').disabled = currentTeam === 'team1' ? false : true;
    document.getElementById('team2Submit').disabled = currentTeam === 'team2' ? false : true;
}

function decideFirstTurn() {
    // Randomly decide which team goes first
    currentTeam = Math.random() < 0.5 ? 'team1' : 'team2'; // Randomly select team
    const team1Name = document.getElementById('team1Name').value || 'Team 1'; // Default name if not provided
    const team2Name = document.getElementById('team2Name').value || 'Team 2'; // Default name if not provided

    // Update the turn indicator with the current team's name
    const currentTeamName = currentTeam === 'team1' ? team1Name : team2Name;
    document.getElementById('turnIndicator').innerText = `Current Turn: ${currentTeamName}`; // Update the turn indicator

    // Enable/disable submit buttons based on the current turn
    document.getElementById('team1Submit').disabled = currentTeam === 'team1' ? false : true;
    document.getElementById('team2Submit').disabled = currentTeam === 'team2' ? false : true;

    // Disable the decide button after the first click
    document.getElementById('decideTurnButton').disabled = true;
}

function resetGame() {
    // Clear team names
    document.getElementById('team1Name').value = '';
    document.getElementById('team2Name').value = '';

    // Clear answer inputs
    document.getElementById('team1Answer').value = '';
    document.getElementById('team2Answer').value = '';

    // Clear revealed answers and submitted answers
    revealedAnswers = [];
    submittedAnswers = { team1: [], team2: [] };
    lastTeamToReveal = ''; // Reset last team to reveal

    // Reset the choices display
    const choiceElements = document.querySelectorAll('#answerList li');
    choiceElements.forEach(choice => {
        choice.style.display = 'none'; // Hide all choices
    });

    // Clear submitted answers list
    const answerList = document.getElementById('answersList');
    answerList.innerHTML = ''; // Clear submitted answers

    // Reset the turn indicator
    currentTeam = ''; // Reset current team
    document.getElementById('turnIndicator').innerText = 'Current Turn: Click the Play Button'; // Set to N/A until decided

    // Re-enable the Decide button
    document.getElementById('decideTurnButton').disabled = false;

    // Re-enable the submit buttons for both teams
    document.getElementById('team1Submit').disabled = false;
    document.getElementById('team2Submit').disabled = false;

    alert('The game has been reset! Ready for a new round.');
}

function announceWinner(winningTeam) {
    alert(`${winningTeam} is the winner! Congratulations!`);
    // Optionally, reset the game after announcing the winner
    resetGame();
}
