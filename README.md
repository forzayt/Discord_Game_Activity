# Multi-Game Presence Script

A lightweight JavaScript snippet that simulates playing popular open-world, high-end, and AAA games on Discord by rotating through a curated list of titles.

---

## 🚀 How to Use

Follow these steps to run the script using Discord's Developer Console:

### 1. Open Discord
* Launch the **Discord Desktop App** or open Discord in your web browser ([discord.com/app](https://discord.com/app)).

### 2. Open the Developer Console
Depending on your platform and application type:

* **Discord Web Browser App**:
  * **Windows / Linux**: Press `Ctrl + Shift + I` or `F12`.
  * **Mac**: Press `Cmd + Option + I`.
* **Discord Desktop Client**:
  * Enable DevTools if available, or press `Ctrl + Shift + I` (Windows/Linux) / `Cmd + Option + I` (Mac).

Once open, click on the **Console** tab at the top of the Developer Tools panel.

---

### 3. Copy the Script
Open `script.js` from this repository, select all code (`Ctrl + A` or `Cmd + A`), and copy it (`Ctrl + C` or `Cmd + C`).

---

### 4. Paste & Execute
1. Click inside the **Console** prompt line at the bottom.
2. Paste the script (`Ctrl + V` or `Cmd + V`).
3. Press **Enter**.

> **Note**: If Discord displays a warning (e.g., *"Self-XSS Warning"*), type `allow pasting` (or whatever phrase Discord specifies) into the console and press Enter first, then paste the script again.

---

## 🕹️ Console Controls

Once running, you can manage the script directly through the Developer Console using these commands:

* **Switch to the next game immediately**:
  ```javascript
  window.__multiGamePresence.next();
