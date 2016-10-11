// Global variables
var boardRows = 6;
var boardCols = 7;
var players = [
  {name: 'Constance', score: 0, color: 'blue'},
  {name: 'Pierre', score: 0, color: 'red'}
];
var activePlayer = 0;

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
$currentPlayer.text(players[activePlayer].name);

function makeMove(event) {
  var color = players[activePlayer].color;
  dropToken(event, color);
  if (activePlayer < players.length - 1) {
    activePlayer += 1;
  } else {
    activePlayer = 0;
  }
  $currentPlayer.text(players[activePlayer].name);
}

function dropToken(event, color) {
  var clickedIndex = $(event.target).siblings().addBack().index(event.target);
  for (var i = ($('.row').length - 1); i >= 0; i--) {
    var $currentRow = $($('.row')[i]);
    var $currentSquare = $($currentRow.children()[clickedIndex]);
    if (!$currentSquare.hasClass('filled')) {
      $currentSquare.addClass('filled ' + color);
      return;
    }
  }
}

$gameWrapper.on('click', '.square', makeMove);
