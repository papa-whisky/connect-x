// Global variables
var boardRows = 6;
var boardCols = 7;
var connectNumber = 4;
var targetScore = 3;
var turnTime = 0;
var players = [
  { name: 'Constance', score: 0, color: 'blue' },
  { name: 'Pierre', score: 0, color: 'red' },
  // { name: 'Farquhar', score: 0, color: 'mistyrose'}
];
var activePlayer = 0;
var timeLeft = 0;
var timerInterval = null;

// jQuery objects
var $gameWrapper = $('.game-wrapper');
var $currentPlayer = $('.current-player');
var $roundWinner = $('.round-winner')
var $turnTimer = $('.turn-timer');

function createGameBoard() {
  for (var i = 0; i < boardRows; i++) {
    var $row = $('<div>').addClass('row');
    $gameWrapper.append($row);
    for (var j = 0; j < boardCols; j++) {
      $row.append($('<div>').addClass('square'));
    }
  }
}

// TODO - relocate once pre-game options integrated.
createGameBoard();
var $rows = $('.row');
$currentPlayer.text(players[activePlayer].name);
startTimer();

function dropToken(color, clickedColIndex) {
  for (var i = ($rows.length - 1); i >= 0; i--) {
    var $currentSquare = $rows.eq(i).children().eq(clickedColIndex);
    if (!$currentSquare.hasClass('filled')) {
      $currentSquare.addClass('filled ' + color);
      return $currentSquare;
    }
  }
}

function resetGameBoard() {
  $gameWrapper.children().remove();
  createGameBoard();
  $rows = $('.row');
  activePlayer = 0;
}

function roundWon() {
  $roundWinner.text(players[activePlayer].name);
  players[activePlayer].score += 1;
  resetGameBoard();
  if (players[activePlayer].score === targetScore) {
    alert('blah blah');
    return;
  }
}

function checkRoundWinner($currentSquare, color, clickedColIndex) {
  // Check for winner in rows.
  var $currentRow = $currentSquare.parent().children();
  for (var i = 0; i < $currentRow.length - connectNumber + 1; i++) {
    var $rowSlice = $currentRow.slice(i, i + connectNumber);
    if ($rowSlice.not('.' + color).length === 0) {
      roundWon();
      return;
    }
  }
  // Check for winner in columns.
  var $currentCol = $();
  for (var i = 0; i < boardRows; i++) {
    $currentCol = $currentCol.add($rows.eq(i).children().eq(clickedColIndex));
  }
  for (var i = 0; i < $currentCol.length - connectNumber + 1; i++) {
    var $colSlice = $currentCol.slice(i, i + connectNumber);
    if ($colSlice.not('.' + color).length === 0) {
      roundWon();
      return;
    }
  }
  // Check for winner diagonally.
  var currentRowIndex = $currentSquare.parent().parent().children().index($currentSquare.parent());
  var $diag1 = $();
  for (var i = 0; i < $rows.length; i++) {
    if (currentRowIndex + clickedColIndex - i < boardCols && currentRowIndex + clickedColIndex - i >= 0) {
      $diag1 = $diag1.add($rows.eq(i).children().eq(currentRowIndex + clickedColIndex - i));
    }
  }
  for (var i = 0; i < $diag1.length - connectNumber + 1; i++) {
    var $diagSlice = $diag1.slice(i, i + connectNumber);
    if ($diagSlice.not('.' + color).length === 0) {
      roundWon();
      return;
    }
  }
  var $diag2 = $();
  for (var i = 0; i < $rows.length; i++) {
    if (clickedColIndex - currentRowIndex + i >= 0 && clickedColIndex - currentRowIndex + i < boardCols) {
      $diag2 = $diag2.add($rows.eq(i).children().eq(clickedColIndex - currentRowIndex + i));
    }
  }
  for (var i = 0; i < $diag2.length - connectNumber + 1; i++) {
    var $diagSlice = $diag2.slice(i, i + connectNumber);
    if ($diagSlice.not('.' + color).length === 0) {
      roundWon();
      return;
    }
  }
  if (activePlayer < players.length - 1) {
    activePlayer += 1;
  } else {
    activePlayer = 0;
  }
  $currentPlayer.text(players[activePlayer].name);
}

function timer() {
  timeLeft -= 1;
  $turnTimer.text(timeLeft);
  if (timeLeft === -1) {
    clearInterval(timerInterval);
    if (activePlayer < players.length - 1) {
      activePlayer += 1;
    } else {
      activePlayer = 0;
    }
    $currentPlayer.text(players[activePlayer].name);
    startTimer();
  }
}

function startTimer() {
  if (turnTime > 0) {
    timeLeft = turnTime;
    $turnTimer.text(timeLeft);
    timerInterval = setInterval(timer, 1000);
  }
}

function makeMove(event) {
  var clickedColIndex = $(event.target).siblings().addBack().index(event.target);
  if (!$rows.eq(0).children().eq(clickedColIndex).hasClass('filled')) {
    var color = players[activePlayer].color;
    var $currentSquare = dropToken(color, clickedColIndex);
    checkRoundWinner($currentSquare, color, clickedColIndex);
    clearInterval(timerInterval);
    startTimer();
  }
}

$gameWrapper.on('click', '.square', makeMove);
