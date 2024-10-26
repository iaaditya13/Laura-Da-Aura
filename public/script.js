let auraPoints = 1000;
let userId = null;

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
};

// Function for User Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            userId = data.userId;
            auraPoints = data.auraPoints;

            document.querySelector('.login-section').style.display = 'none';
            document.querySelector('.dashboard').style.display = 'block';
            document.querySelector('.input-section').style.display = 'block';
            document.querySelector('.response-section').style.display = 'block';
            document.querySelector('.transaction-history').style.display = 'block';

            document.getElementById('aura-points').textContent = auraPoints;

            fetchTransactionHistory();
        } else {
            alert('Login failed. Please check your credentials.');
        }
    });
}

// Function for User Registration
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! Please login.');
        } else {
            alert('Registration failed. Please try again.');
        }
    });
}

// Aura Calculation Function
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
        updateAuraInDatabase(totalChange, userInput);
    } else {
        document.getElementById('response-message').textContent = "Can't tell your aura.";
    }

    // Clear the textarea
    document.getElementById('user-input').value = '';
}

// Add a new transaction to the history
function addTransaction(description, change) {
    const transactionHistory = document.getElementById('transaction-history');

    const transaction = document.createElement('div');
    transaction.className = `transaction ${change > 0 ? 'positive' : 'negative'}`;
    transaction.innerHTML = `
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Aura Change:</strong> ${change > 0 ? '+' : ''}${change} aura</p>
    `;

    transactionHistory.prepend(transaction);
}

// Fetch and display transaction history from the database
function fetchTransactionHistory() {
    fetch(`/api/user/${userId}/aura-history`)
        .then(response => response.json())
        .then(data => {
            const transactionHistory = document.getElementById('transaction-history');
            transactionHistory.innerHTML = ''; // Clear old history

            data.forEach(transaction => {
                addTransaction(transaction.description, transaction.change);
            });
        });
}

// Update aura in the database
function updateAuraInDatabase(change, description) {
    fetch(`/api/user/${userId}/update-aura`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ change, description })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            alert('Failed to update aura in database');
        }
    });
}
