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

function dropToken(event, color, clickedIndex) {
  for (var i = ($rows.length - 1); i >= 0; i--) {
    var $currentSquare = $($($rows[i]).children()[clickedIndex]);
    if (!$currentSquare.hasClass('filled')) {
      $currentSquare.addClass('filled ' + color);
      return $currentSquare;
    }
  }
}

function checkWinner($currentSquare, color, clickedIndex) {
  var $currentRow = $currentSquare.parent().children();
  for (var i = 0; i < $currentRow.length - connectNumber + 1; i++) {
    var $rowSlice = $currentRow.slice(i, i + connectNumber);
    if ($rowSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
  var currentCol = [];
  for (var i = 0; i < boardRows; i ++) {
    currentCol.push($($rows[i]).children()[clickedIndex]);
  }
  for (var i = 0; i < currentCol.length - connectNumber + 1; i++) {
    var $colSlice = $(currentCol).slice(i, i + connectNumber);
    if ($colSlice.not('.' + color).length === 0) {
      alert('blah blah');
      return;
    }
  }
}

function makeMove(event) {
  var color = players[activePlayer].color;
  var clickedIndex = $(event.target).siblings().addBack().index(event.target);
  checkWinner(dropToken(event, color, clickedIndex), color, clickedIndex);
  if (activePlayer < players.length - 1) {
    activePlayer += 1;
  } else {
    activePlayer = 0;
  }
  $currentPlayer.text(players[activePlayer].name);
}

$gameWrapper.on('click', '.square', makeMove);
