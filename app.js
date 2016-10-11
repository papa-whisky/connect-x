$gameWrapper = $('.game-wrapper');

function createGameBoard() {
  for (var i = 0; i < 6; i++) {
    var $row = $('<div>').addClass('row');
    $gameWrapper.append($row);
    for (var j = 0; j < 7; j++) {
      var $square = $('<div>').addClass('square');
      $row.append($square);
    }
  }
}
