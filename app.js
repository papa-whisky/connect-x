var $gameWrapper = $('.game-wrapper');
var boardRows = 6;
var boardCols = 7;

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

function dropToken(event) {
  var clickedIndex = $(event.target).siblings().addBack().index(event.target);
  for (var i = ($('.row').length - 1); i >= 0; i--) {
    var $currentRow = $($('.row')[i]);
    var $currentSquare = $($currentRow.children()[clickedIndex]);
    if (!$currentSquare.hasClass('token')) {
      $currentSquare.addClass('token');
      return;
    }
  }
}

$gameWrapper.on('click', '.square', dropToken);
