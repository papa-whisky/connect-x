// Global variables
var boardRows = 6;
var boardCols = 7;
var players = [
  {name: 'Constance', score: 0, color: 'blue'},
  {name: 'Pierre', score: 0, color: 'red'}
];
var activePlayer = 0;
var connectNumber = 4;

// jQuery objects
var $gameWrapper = $('.game-wrapper');
var $currentPlayer = $('.current-player');

function createGameBoard() {
  for (var i = 0; i < boardRows; i++) {
    var $row = $('<div>').addClass('row');
    $gameWrapper.append($row);
    for (var j = 0; j < boardCols; j++) {
      $row.append($('<div>').addClass('square'));
    }
  }
}

createGameBoard();
var $rows = $('.row');  
$currentPlayer.text(players[activePlayer].name);

function dropToken(color, clickedColIndex) {
  for (var i = ($rows.length - 1); i >= 0; i--) {
    var $currentSquare = $($($rows[i]).children()[clickedColIndex]);
    if (!$currentSquare.hasClass('filled')) {
      $currentSquare.addClass('filled ' + color);
      return $currentSquare;
    }
  }
}

function checkWinner($currentSquare, color, clickedColIndex) {
  // Check for winner in rows.
  var $currentRow = $currentSquare.parent().children();
  for (var i = 0; i < $currentRow.length - connectNumber + 1; i++) {
    var $rowSlice = $currentRow.slice(i, i + connectNumber);
    if ($rowSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
  // Check for winner in columns.
  var currentCol = [];
  for (var i = 0; i < boardRows; i ++) {
    currentCol.push($($rows[i]).children()[clickedColIndex]);
  }
  for (var i = 0; i < currentCol.length - connectNumber + 1; i++) {
    var $colSlice = $(currentCol).slice(i, i + connectNumber);
    if ($colSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
  // Check for winner diagonally.
  var currentRowIndex = $currentSquare.parent().parent().children().index($currentSquare.parent());
  var diag1 = [];
  for (var i = 0; i < $rows.length; i ++) {
    if (currentRowIndex + clickedColIndex - i < boardCols && currentRowIndex + clickedColIndex - i >= 0) {
      diag1.push($($rows[i]).children()[currentRowIndex + clickedColIndex - i]);
    }
  }
  for (var i = 0; i < diag1.length - connectNumber + 1; i++) {
    var $diagSlice = $(diag1).slice(i, i + connectNumber);
    if ($diagSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
  var diag2 = [];
  for (var i = 0; i < $rows.length; i ++) {
    if (clickedColIndex - currentRowIndex + i >= 0 && clickedColIndex - currentRowIndex + i < boardCols) {
      diag2.push($($rows[i]).children()[clickedColIndex - currentRowIndex + i]);
    }
  }
  for (var i = 0; i < diag2.length - connectNumber + 1; i++) {
    var $diagSlice = $(diag2).slice(i, i + connectNumber);
    if ($diagSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
}

function makeMove(event) {
  var color = players[activePlayer].color;
  var clickedColIndex = $(event.target).siblings().addBack().index(event.target);
  var $currentSquare = dropToken(color, clickedColIndex);
  checkWinner($currentSquare, color, clickedColIndex);
  if (activePlayer < players.length - 1) {
    activePlayer += 1;
  } else {
    activePlayer = 0;
  }
  $currentPlayer.text(players[activePlayer].name);
}

$gameWrapper.on('click', '.square', makeMove);
