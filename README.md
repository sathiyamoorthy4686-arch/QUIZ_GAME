# ⚡ SYNTAX SMASH | Cyberpunk Coding Quiz Game

A retro-cyberpunk themed web game designed to test and sharpen your coding syntax knowledge through interactive code repair puzzles.

![Theme](https://img.shields.io/badge/Theme-Cyberpunk-00ff9d?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🎮 Game Features

- **Cyberpunk UI & Visuals**: Scanlines, CRT glowing overlay, neon accent colors, and glitch header animations.
- **Dual Role System**:
  - **🎓 Student Mode**: Enter your name, take the exam, fix broken code snippets, and build streak multipliers.
  - **👨‍🏫 Teacher Mode**: Access restricted admin views and inspect top leaderboard records (Protected by passcode: `12345678`).
- **Syntax Repair Levels**: Identify missing colons, dictionary/list bracket pairs, multi-statement separators, and function declarations.
- **Dynamic Leaderboard**: Local storage score persistence tracking top hackers.
- **Instant Visual Feedback**: Interactive patch selection with animated success and error states.

---

## 🕹️ How to Play

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sathiyamoorthy4686-arch/QUIZ_GAME.git
   ```
2. **Open the Game**:
   - Double-click `index.html` or open via VS Code Live Server.
3. **Play**:
   - Enter your Hacker/Student username.
   - Click **STUDENT** to start the mission.
   - Choose the correct patch command (`>`, `;`, `{ }`, `[ ]`, etc.) to repair the code snippet.
   - Keep your streak alive to maximize your score!

---

## 📂 Project Structure

```text
QUIZ_GAME/
├── index.html       # Game screens, HUD, terminal display & UI elements
├── style.css        # Cyberpunk neon styles, animations & scanline effects
├── script.js        # Game state engine, levels, role authentication & scoring
└── README.md        # Documentation
```

---

## 🛠️ Built With

- **HTML5** — Semantic DOM structure
- **CSS3** — Custom properties, animations, glassmorphism & responsive grid
- **JavaScript (Vanilla ES6+)** — Game loop, scoring engine & LocalStorage persistence
