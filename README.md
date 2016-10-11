## WDI9 Project 1 - The Game

### Overview
Connect-4 clone, played in browser by 2+ players. Various game options (hopefully) available. Hosted on a GitHub Pages site.
---

1. User experience.
  * Users are presented with a quick splash screen, then a range of options to set up the game (e.g. player names, board size, number of rounds).
  * Then press a button to begin. Game board is revealed, active player is notified that it is their turn. Game board can be clicked to place token, then next player is notified of their turn, continuing as such until game is complete.
  * Winner is notified, +1 added to their total score until pre-defined winning score is reached.
  * Overall winner notified, option to restart with same settings or try different settings.
2. Data to collect.
  * Number of players.
  * p1 name, p2 name, etc.
  * p1 token colour, p2 token colour, etc.
  * Board size (rows x columns).
  * Number of tokens to connect to win round.
  * Turn time limit.
  * Number of rounds required to win.
3. Draw game board & timers/counters;
  * Get number of rows and create row divs.
  * Get number of columns and add squares to each row.
  * Append all to game board.
4. Game logic.
  * Add event listener to game board.
  * Index of square within row will represent column number.
  * When clicked, add BG colour to lowest row without colour already present.
5. Presentation/styling.
  * 
