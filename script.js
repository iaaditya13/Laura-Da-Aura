let auraPoints = 1000;

// Array of keywords and their corresponding aura changes
const keywords = [
    ["fell", -200],
    ["helped", +200],
    ["cried", -100],
    ["laughed", +100],
    ["angry", -150],
    ["donated", +250],
    ["apologized", +50],
    ["cheated", -300],
    ["studied", +150],
    ["hurt", -100] // Added new keyword
];

// Combinations of keywords and their specific aura changes
const keywordCombinations = {
    "angry cried hurt": -600, // Combination of 3 words
    // Add more combinations as needed
};

function calculateAura() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    let totalChange = 0;

    // Check for combinations first
    const combinationChange = checkCombinations(userInput);
    if (combinationChange !== 0) {
        totalChange = combinationChange;
    } else {
        // Calculate change based on individual keywords
        for (const [keyword, value] of keywords) {
            if (userInput.includes(keyword)) {
                totalChange += value;
            }
        }
    }

    // Update aura points and UI
    if (totalChange !== 0) {
        auraPoints += totalChange;
        document.getElementById('response-message').textContent = `Aura points ${totalChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(totalChange)}!`;
        document.getElementById('aura-points').textContent = auraPoints;
        addTransaction(userInput, totalChange);
    } else {
        document.getElementById('response-message').textContent = "Can't tell your aura.";
    }

    document.getElementById('user-input').value = '';
}

function checkCombinations(userInput) {
    // Loop through each combination to see if it exists in user input
    for (const combination in keywordCombinations) {
        if (userInput.includes(combination)) {
            return keywordCombinations[combination];
        }
    }
    return 0; // No combination found
}

function addTransaction(description, change) {
    const transactionHistory = document.getElementById('transaction-history');
    const placeholder = transactionHistory.querySelector('.placeholder');
    
    // Remove placeholder text if it's the first transaction
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    const transaction = document.createElement('div');
    transaction.className = `transaction ${change > 0 ? 'positive' : 'negative'}`;
    transaction.innerHTML = `
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Aura Change:</strong> ${change > 0 ? '+' : ''}${change} points</p>
    `;

    transactionHistory.prepend(transaction);
}
