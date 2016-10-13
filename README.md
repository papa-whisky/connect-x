## WDI9 Project 1 - The Game

### Overview

Connect-4 clone, played in browser by 2+ players. Various game options (hopefully) available. Hosted on a GitHub Pages site.

---

#### Game Details

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

---

#### Build Process

1. Draw game board;
  * Get number of rows and create row divs.
  * Get number of columns and add squares to each row.
  * Append all to game board.
2. Basic Game logic.
  1. Drop tokens.
    * Add event listener to game board.
    * Index of clicked square within row will represent column number.
    * When clicked, add BG colour to lowest row without colour already present.
  2. Switch turns.
    * Store players in variable with colour, score.
    * Keep track of active player.
    * Add markup to show current player.
    * Switch active player after each turn.
  3. Determine Winner.
    * After each turn, check each row, column, and diagonal for 4 same tokens.
    * Add markup to show winner.
    * Add 1 to winner's score.
    * Reset game board.
    * If winner's score = target, end game.
  4. Refinements.
    * Check if column is full before attempting to add another token.
    * Add timer for turn, including markup to show time left.
    * Add markup to show player score cards.
    * Pause after each round, add button to start next round.
    * Reset game once target number of rounds complete.
    * Randomise first player for each round.
3. Usability.
  * Create overall layout, separate options screen and game board screen that can be switched between.
  * Populate options screen with necessary inputs, start button to begin game.
  * Once number of players entered, generate name inputs and color pickers.
  * Make color selectable, and remove this option for other players.
  * Make start button pass all input values to script, and begin game.
  * Add button to game screen to return to options screen.
  * Generate name/color inputs once player number input box has lost focus (in addition to on enter press).
  * Add input placeholders to represent default values.
  * Add input validation for start button (re player names/colors).
  * Set max and min values for input boxes.
  * Add default number of players & pre-created name inputs and color pickers.
4. Styling.
  * Style options page (heading, inputs, start button).
  * Style game page (game board, score board, turn and timer info).
  * Have player's token hover over column they are about to click.
  * Make turn timer red when 5 or less seconds remain.
5. Animations.
  * Implement options screen heading as a splash screen.
  * Animate transition between options screen and game screen.
  * Animate tokens dropping into columns.
6. Bugs.
  * ~~Check whether board is full with no winner (aka drawn game).~~
  * ~~Input min/max not working.~~
  * ~~Clear board overlay when going back to options screen and starting a new game.~~
  * ~~Player details input validation is vague, try adding red asterisk after element(s) requiring completion.~~
  * ~~Player can add multiple tokens by clicking again before animation completes.~~
  * TODO: Player clicking when timer reaches 0 will get another turn due to animation delay.
7. Optimisations.
  * TODO: Use event bubbling to refine color picker event handler.
  * Create fillSquare function to clean up dropToken function.
  * TODO: Avoid checking for winner when it's not possible that game has been won (e.g., not enough tokens dropped, checking for diagonals close to corners).
