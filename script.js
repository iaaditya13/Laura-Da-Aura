let auraPoints = 1000;

const keywords = {
    "fell": -200,
    "helped": +200,
    "cried": -100,
    "laughed": +100,
    "angry": -150,
    "donated": +250,
    "apologized": +50,
    "cheated": -300,
    "studied": +150,
    // Add more keywords and their corresponding aura points
};

function calculateAura() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    let totalChange = 0;

    for (const [keyword, value] of Object.entries(keywords)) {
        if (userInput.includes(keyword)) {
            totalChange += value;
        }
    }

    if (totalChange !== 0) {
        auraPoints += totalChange;
        document.getElementById('response-message').textContent = `Aura points ${totalChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(totalChange)}!`;
        document.getElementById('aura-points').textContent = auraPoints;
        addTransaction(userInput, totalChange);
    } else {
        document.getElementById('response-message').textContent = "Can't tell your aura.";
    }

    // Clear the textarea
    document.getElementById('user-input').value = '';
}

function addTransaction(description, change) {
    const transactionHistory = document.getElementById('transaction-history');

    // Create a new transaction element
    const transaction = document.createElement('div');
    transaction.className = `transaction ${change > 0 ? 'positive' : 'negative'}`;
    transaction.innerHTML = `
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Aura Change:</strong> ${change > 0 ? '+' : ''}${change} points</p>
    `;

    // Add the new transaction to the top of the transaction history
    transactionHistory.prepend(transaction);
}
