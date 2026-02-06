const levels = [
    {
        id: 1,
        code: `<span class="python-def">if</span> x > 10<span class="python-def">_</span>\n    <span class="python-func">print</span>(<span class="python-str">"Large"</span>)`,
        errorLine: "if x > 10_",
        hint: "What symbol starts a code block in Python?",
        options: [
            { text: ";", correct: false },
            { text: "{", correct: false },
            { text: ":", correct: true },
            { text: "then", correct: false }
        ],
        successMsg: "BLOCK INITIATED"
    },
    {
        id: 2,
        code: `my_dict = <span class="python-def">_</span><span class="python-str">"key"</span>: <span class="python-str">"value"</span><span class="python-def">_</span>`,
        errorLine: "_ \"key\": \"value\" _",
        hint: "Which symbols wrap a dictionary?",
        options: [
            { text: "[ ]", correct: false },
            { text: "( )", correct: false },
            { text: "{ }", correct: true },
            { text: "< >", correct: false }
        ],
        successMsg: "DICTIONARY SECURED"
    },
    {
        id: 3,
        code: `numbers = <span class="python-def">_</span>1, 2, 3<span class="python-def">_</span>`,
        errorLine: "_ 1, 2, 3 _",
        hint: "Which symbols define a list?",
        options: [
            { text: "{ }", correct: false },
            { text: "[ ]", correct: true },
            { text: "( )", correct: false },
            { text: "| |", correct: false }
        ],
        successMsg: "LIST GENERATED"
    },
    {
        id: 4,
        code: `<span class="python-def">def</span> <span class="python-func">execute</span>()<span class="python-def">____</span>\n    <span class="python-func">return</span> True`,
        errorLine: "def execute()____",
        hint: "Don't forget the colon!",
        options: [
            { text: ";", correct: false },
            { text: ":", correct: true },
            { text: "{", correct: false },
            { text: "->", correct: false }
        ],
        successMsg: "FUNCTION DECLARED"
    },
    {
        id: 5,
        code: `x = 5; y = 10<span class="python-def">___</span>`,
        errorLine: "x = 5; y = 10___",
        hint: "Trick question: Python allows this separator for single-line multiple statements.",
        options: [
            { text: ":", correct: false },
            { text: ",", correct: false },
            { text: ";", correct: true },
            { text: ".", correct: false }
        ],
        successMsg: "STATEMENT SEPARATED"
    }
];

let currentLevelIdx = 0;
let score = 0;
let streak = 0;
let playerRole = '';
let playerName = '';

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const lbBtn = document.getElementById('lb-btn');
const nameInput = document.getElementById('player-name');

// New UI Elements
const roleSelection = document.getElementById('role-selection');
const passwordContainer = document.getElementById('password-container');
const passInput = document.getElementById('admin-pass');

const codeDisplay = document.getElementById('code-display');
const optionsGrid = document.getElementById('options-grid');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const streakEl = document.getElementById('streak');
const statusMsg = document.getElementById('status-msg');
const finalScoreEl = document.getElementById('final-score');
const bugsSmashedEl = document.getElementById('bugs-smashed');

// Login Logic
function selectRole(role) {
    const name = nameInput.value.trim();

    // Step 1: Enforce Name Entry
    if (!name) {
        alert("PLEASE ENTER YOUR NAME TO PROCEED");
        nameInput.focus();
        return;
    }

    // If Student, start immediately
    if (role === 'STUDENT') {
        finalizeLogin(name, 'STUDENT');
    }
}

function showPasswordInput() {
    const name = nameInput.value.trim();
    if (!name) {
        alert("PLEASE ENTER YOUR NAME TO PROCEED");
        nameInput.focus();
        return;
    }

    // Switch UI to Password Mode
    roleSelection.classList.add('hidden');
    passwordContainer.classList.remove('hidden');
    passInput.focus();
}

function cancelLogin() {
    // Return to Role Selection
    passwordContainer.classList.add('hidden');
    roleSelection.classList.remove('hidden');
    passInput.value = '';
}

function verifyPassword() {
    const pass = passInput.value;
    if (pass === "12345678") {
        finalizeLogin(nameInput.value.trim(), 'TEACHER');
    } else {
        alert("ACCESS DENIED: INCORRECT PASSWORD");
        passInput.value = '';
        passInput.focus();
    }
}

// Allow Enter key to submit password
passInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verifyPassword();
    }
});

function finalizeLogin(name, role) {
    playerName = name;
    playerRole = role;

    if (role === 'TEACHER') {
        // Teacher Flow: Direct to Leaderboard (Skip Game Intro)
        showLeaderboard();
    } else {
        // Student Flow: Show Briefing
        switchScreen('start');

        // Custom Student Greeting
        const title = document.getElementById('welcome-title');
        const msg = document.getElementById('welcome-msg');
        title.innerText = `WELCOME STUDENT ${name.toUpperCase()}`;
        title.style.color = "var(--neon-blue)";
        msg.innerText = "READY FOR EXAM?";

        // Hide teacher buttons if any
        if (lbBtn) lbBtn.classList.add('hidden');
    }
}

// Leaderboard Logic
function showLeaderboard() {
    switchScreen('leaderboard');

    const scoresBody = document.getElementById('scores-body');
    scoresBody.innerHTML = '';

    const highScores = JSON.parse(localStorage.getItem('syntaxSmashScores')) || [];
    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        scoresBody.appendChild(row);
    });

    if (highScores.length === 0) {
        scoresBody.innerHTML = `<tr><td colspan="3">NO DATA FOUND</td></tr>`;
    }
}

function saveScore(finalScore) {
    // Only save Student scores
    if (playerRole === 'STUDENT') {
        const highScores = JSON.parse(localStorage.getItem('syntaxSmashScores')) || [];
        highScores.push({ name: playerName, score: finalScore, date: new Date().toISOString() });
        localStorage.setItem('syntaxSmashScores', JSON.stringify(highScores));
    }
}

// State Management
function initGame() {
    score = 0;
    currentLevelIdx = 0;
    streak = 0;
    updateHUD();
    switchScreen('game');
    loadLevel(currentLevelIdx);
}

function switchScreen(screenName) {
    [loginScreen, startScreen, gameScreen, endScreen, leaderboardScreen].forEach(el => el.classList.remove('active'));
    [loginScreen, startScreen, gameScreen, endScreen, leaderboardScreen].forEach(el => el.classList.add('hidden'));

    if (screenName === 'start') {
        startScreen.classList.remove('hidden');
        startScreen.classList.add('active');
    } else if (screenName === 'game') {
        gameScreen.classList.remove('hidden');
        gameScreen.classList.add('active');
    } else if (screenName === 'login') {
        loginScreen.classList.remove('hidden');
        loginScreen.classList.add('active');
        nameInput.value = '';
        passInput.value = '';
        // Reset Login UI state
        roleSelection.classList.remove('hidden');
        passwordContainer.classList.add('hidden');
    } else if (screenName === 'leaderboard') {
        leaderboardScreen.classList.remove('hidden');
        leaderboardScreen.classList.add('active');
    } else {
        endScreen.classList.remove('hidden');
        endScreen.classList.add('active');
    }
}

function updateHUD() {
    scoreEl.innerText = score.toString().padStart(4, '0');
    levelEl.innerText = (currentLevelIdx + 1).toString().padStart(2, '0');
    streakEl.innerText = `x${streak}`;
}

function loadLevel(idx) {
    if (idx >= levels.length) {
        endGame();
        return;
    }

    const level = levels[idx];

    // Animate transition
    codeDisplay.style.opacity = '0';
    setTimeout(() => {
        codeDisplay.innerHTML = level.code;
        codeDisplay.style.opacity = '1';
        statusMsg.innerText = "WAITING FOR INPUT...";
        statusMsg.style.color = "var(--neon-blue)";
    }, 200);

    // Populate Options
    optionsGrid.innerHTML = '';

    // Shuffle options for randomness
    const shuffledOptions = [...level.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = `> ${opt.text}`;
        btn.onclick = () => handleChoice(btn, opt.correct, level);
        optionsGrid.appendChild(btn);
    });
}

function handleChoice(btn, isCorrect, level) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        statusMsg.innerText = level.successMsg;
        statusMsg.style.color = "var(--neon-green)";
        score += 100 + (streak * 10);
        streak++;

        setTimeout(() => {
            currentLevelIdx++;
            updateHUD();
            loadLevel(currentLevelIdx);
        }, 1200);
    } else {
        btn.classList.add('wrong');
        statusMsg.innerText = "SYNTAX ERROR DETECTED";
        statusMsg.style.color = "var(--neon-red)";
        streak = 0;

        allBtns.forEach(b => {
            if (level.options.find(o => `> ${o.text}` === b.innerText && o.correct)) {
                b.classList.add('correct');
            }
        });

        setTimeout(() => {
            currentLevelIdx++;
            updateHUD();
            loadLevel(currentLevelIdx);
        }, 1500);
    }
    updateHUD();
}

function endGame() {
    switchScreen('end');
    finalScoreEl.innerText = score;
    bugsSmashedEl.innerText = currentLevelIdx;

    saveScore(score); // Save to Leaderboard

    const endTitle = endScreen.querySelector('h2');
    if (playerRole === 'TEACHER') {
        endTitle.innerText = "CLASS DISMISSED";
    } else {
        endTitle.innerText = "EXAM COMPLETE";
    }
}

// Event Listeners
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', () => {
    switchScreen('login');
});
