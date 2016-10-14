// Global variables
var boardRows = 0;
var boardCols = 0;
var connectNumber = 0;
var targetScore = 0;
var turnTime = 0;
var players = [];
var activePlayer = 0;
var timeLeft = 0;
var timerInterval = null;
var animationActive = false;

// jQuery objects
var $gameWrapper = $('.game-wrapper');
var $currentPlayer = $('.current-player');
var $roundWinner = $('.round-winner')
var $gameWinner = $('.game-winner');
var $turnTimer = $('.turn-timer');
var $scoreBoard = $('.score-board');
var $boardOverlay = $('.board-overlay');
var $nextRoundBtn = $('.next-round');
var $resetBtn = $('.reset');
var $numOfPlayersInput = $('.num-of-players');
var $playerInfo = $('.player-info');
var $gameScreen = $('.game-screen');
var $rows = $();
var $hoverSquares = $();
var $currentSquare = $();

// Collect player info and game setting functions:
function addPlayerDetailDivs() {
  for (var i = 0; i < parseInt($numOfPlayersInput.val()); i++) {
    var $playerDetailDiv = $('<div>').addClass('player-details');
    var $nameInput = $('<input type="text" placeholder="Enter Name">');
    $playerDetailDiv.append($nameInput, generateColorPicker());
    $playerInfo.append($playerDetailDiv);
  }
}

function generateColorPicker() {
  var $colorPicker = $('<div>').addClass('color-picker');
  var $one = $('<div>').addClass('mistyrose');
  var $two = $('<div>').addClass('chartruese');
  var $three = $('<div>').addClass('salmon');
  var $four = $('<div>').addClass('aquamarine');
  var $five = $('<div>').addClass('goldenrod');
  $colorPicker.append($one, $two, $three, $four, $five);
  return $colorPicker;
}

function setGameOptions() {
  if ($('.board-rows').val()) {
    boardRows = parseInt($('.board-rows').val());
  } else {
    boardRows = 6;
  }
  if ($('.board-cols').val()) {
    boardCols = parseInt($('.board-cols').val());
  } else {
    boardCols = 7;
  }
  if ($('.connect-number').val()) {
    connectNumber = parseInt($('.connect-number').val());
  } else {
    connectNumber = 4;
  }
  if ($('.turn-time').val()) {
    turnTime = parseInt($('.turn-time').val());
  } else {
    turnTime = 0;
  }
  if ($('.target-score').val()) {
    targetScore = parseInt($('.target-score').val());
  } else {
    targetScore = 3;
  }
}

function validateInputs() {
  $('.invalid').removeClass('invalid');
  var $nameInputs = $('.player-details input');
  for (var i = 0; i < $nameInputs.length; i++) {
    if ($nameInputs.eq(i).val() === '') {
      $nameInputs.eq(i).addClass('invalid');
      return false;
    }
  }
  var $colorInputs = $('.color-picker');
  for (var i = 0; i < $colorInputs.length; i++) {
    if ($colorInputs.eq(i).children().filter('#picked').length === 0) {
      $colorInputs.eq(i).addClass('invalid');
      return false;
    }
  }
  var rowVal = parseInt($('.board-rows').val());
  if (rowVal < 2 || rowVal > 8) {
    $('.board-rows').addClass('invalid');
    return false;
  }
  var colVal = parseInt($('.board-cols').val());
  if (colVal < 2 || colVal > 14) {
    $('.board-cols').addClass('invalid');
    return false;
  }
  var tokensVal = parseInt($('.connect-number').val());
  if (tokensVal < 2 || tokensVal > 7) {
    $('.connect-number').addClass('invalid');
    return false;
  }
  var timeVal = parseInt($('.turn-time').val());
  if (timeVal < 0) {
    $('.turn-time').addClass('invalid');
    return false;
  }
  var targetVal = parseInt($('.target-score').val());
  if (targetVal < 1) {
    $('.target-score').addClass('invalid');
    return false;
  }
  return true;
}

// Create board functions:
function createGameBoard() {
  for (var i = 0; i < boardRows; i++) {
    var $row = $('<div>').addClass('row');
    $gameWrapper.append($row);
    for (var j = 0; j < boardCols; j++) {
      $row.append($('<div>').addClass('square'));
    }
  }
}

function createScoreBoard() {
  $('.score-card').remove();
  for (var i = 0; i < players.length; i++) {
    var $scoreCard = $('<div>').addClass('score-card');
    var $name = $('<div>').addClass('name').text(players[i].name);
    var $score = $('<div>').addClass(players[i].color).addClass('score').text(players[i].score);
    $scoreCard.append($name).append($score);
    $scoreBoard.append($scoreCard);
  }
}

function createPlayerObjects() {
  players = [];
  var $playerDetails = $('.player-details');
  for (var i = 0; i < $playerDetails.length; i++) {
    var player = new Object();
    player.name = $playerDetails.eq(i).children('input').val();
    player.color = $playerDetails.eq(i).find('#picked').attr('class');
    player.score = 0;
    players.push(player);
  }
}

// Make move functions:
function makeMove(event) {
  var clickedColIndex = $(event.target).siblings().addBack().index(event.target);
  if (!$rows.eq(0).children().eq(clickedColIndex).hasClass('filled') && !animationActive) {
    var color = players[activePlayer].color;
    clearInterval(timerInterval);
    $hoverSquares.removeClass().addClass('hover-square');
    dropToken(color, clickedColIndex);
  }
}

function dropToken(color, clickedColIndex) {
  animationActive = true;
  var i = 0
  function delayLoop() {
    setTimeout(function () {
      $currentSquare = $rows.eq(i).children().eq(clickedColIndex);
      if (i - 1 >= 0) {
        var $prevSquare = $rows.eq(i - 1).children().eq(clickedColIndex);
      }
      if (i + 1 < $rows.length) {
        var $nextSquare = $rows.eq(i + 1).children().eq(clickedColIndex);
        if (!$nextSquare.hasClass('filled')) {
          $currentSquare.addClass(color);
          if ($prevSquare) {
            $prevSquare.removeClass(color);
          }
        } else {
          fillSquare($currentSquare, color, clickedColIndex, $prevSquare);
          return;
        }
      } else {
        fillSquare($currentSquare, color, clickedColIndex, $prevSquare);
        return;
      }
      i++;
      if (i < $rows.length) {
        delayLoop();
      }
    }, 250);
  }
  delayLoop();
}

function fillSquare($currentSquare, color, clickedColIndex, $prevSquare) {
  $currentSquare.addClass('filled ' + color);
  if ($prevSquare) {
    $prevSquare.removeClass(color);
  }
  completeTurn($currentSquare, color, clickedColIndex);
}

function completeTurn($currentSquare, color, clickedColIndex) {
  animationActive = false;
  if (!checkRoundWinner($currentSquare, color, clickedColIndex)) {
    $hoverSquares.removeClass().addClass('hover-square');
    nextPlayer();
    startTimer();
  }
}

function nextPlayer() {
  if (activePlayer < players.length - 1) {
    activePlayer += 1;
  } else {
    activePlayer = 0;
  }
  $currentPlayer.text(players[activePlayer].name);
}

// Check winner of round or whole game functions:
function checkRoundWinner($currentSquare, color, clickedColIndex) {
  // Check for winner in rows.
  var $currentRow = $currentSquare.parent().children();
  for (var i = 0; i < $currentRow.length - connectNumber + 1; i++) {
    var $rowSlice = $currentRow.slice(i, i + connectNumber);
    if ($rowSlice.not('.' + color).length === 0) {
      roundWon();
      return true;
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
      return true;
    }
  }
  // Check for winner diagonally.
  var currentRowIndex = $rows.index($currentSquare.parent());
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
      return true;
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
      return true;
    }
  }
  if ($('.square').not('.filled').length === 0) {
    roundDrawn();
    return true;
  }
  return false;
}

function roundWon() {
  $roundWinner.text(players[activePlayer].name);
  players[activePlayer].score += 1;
  $('.score').eq(activePlayer).text(players[activePlayer].score);
  $boardOverlay.show();
  if (players[activePlayer].score === targetScore) {
    $roundWinner.hide();
    $gameWinner.show();
    $gameWinner.text(players[activePlayer].name);
    $nextRoundBtn.hide();
    $resetBtn.show();
  }
}

function roundDrawn() {
  $roundWinner.text('Nobody!');
  $boardOverlay.show();
}

// Reset functions:
function resetGameBoard() {
  $('.game-board').children('.hover-row').remove();
  $gameWrapper.children().remove();
  createGameBoard();
  $rows = $('.row');
  var $hoverRow = $rows.eq(0).clone();
  $hoverRow.removeClass('row').addClass('hover-row');
  $hoverRow.children().removeClass('square').addClass('hover-square');
  $('.game-board').prepend($hoverRow);
  $hoverSquares = $('.hover-square');
  activePlayer = Math.floor(Math.random() * players.length);
  nextPlayer();
}

function initialiseOptionsScreen() {
  $('.board-rows').val('');
  $('.board-cols').val('');
  $('.connect-number').val('');
  $('.turn-time').val('');
  $('.target-score').val('');
}

// Turn timer functions:
function timer() {
  timeLeft -= 1;
  $turnTimer.text(timeLeft);
  if (timeLeft < 6) {
    $turnTimer.css({ 'color': 'red' });
  }
  if (timeLeft === -1) {
    clearInterval(timerInterval);
    $hoverSquares.removeClass().addClass('hover-square');
    nextPlayer();
    startTimer();
  }
}

function startTimer() {
  if (turnTime > 0) {
    $turnTimer.css({ 'color': 'black' });
    timeLeft = turnTime;
    $turnTimer.text(timeLeft);
    timerInterval = setInterval(timer, 1000);
  }
}

// Hover token functions:
function hoverToken() {
  var hoverColIndex = $(event.target).siblings().addBack().index(event.target);
  $hoverSquares.eq(hoverColIndex).addClass(players[activePlayer].color);
}

function unHoverToken() {
  var hoverColIndex = $(event.target).siblings().addBack().index(event.target);
  $hoverSquares.eq(hoverColIndex).removeClass(players[activePlayer].color);
}

// Event handlers:
$gameWrapper.on('click', '.square', makeMove);
$gameWrapper.on('mouseenter', '.square', hoverToken);
$gameWrapper.on('mouseleave', '.square', unHoverToken);

$nextRoundBtn.on('click', function () {
  resetGameBoard();
  $boardOverlay.hide();
  startTimer();
});

$resetBtn.on('click', function () {
  for (var i = 0; i < players.length; i++) {
    players[i].score = 0;
  }
  $roundWinner.show();
  $gameWinner.hide();
  $nextRoundBtn.show();
  $resetBtn.hide();
  $boardOverlay.hide();
  $('.score').text('0');
  resetGameBoard();
  startTimer();
});

function addColorPickerHandlers() {
  $('.color-picker div').hover(function () {
    $(event.target).siblings().addClass('dim');
  }, function () {
    $(event.target).siblings().removeClass('dim');
  });
  $('.color-picker div').click(function () {
    $(event.target).siblings().hide()
    var chosenColor = $(event.target).attr('class');
    $(event.target).attr('id', 'picked');
    $('.' + chosenColor).not(event.target).hide();
  });
}

addColorPickerHandlers();

$numOfPlayersInput.keypress(function () {
  if (event.which === 13) {
    $('.player-details').remove();
    addPlayerDetailDivs();
    addColorPickerHandlers();
  }
});

$numOfPlayersInput.blur(function () {
  if ($('.player-details').length === 0) {
    $('.player-details').remove();
    addPlayerDetailDivs();
    addColorPickerHandlers();
  }
});

$('.start').click(function () {
  if (validateInputs()) {
    setGameOptions();
    createPlayerObjects();
    $boardOverlay.hide();
    $gameScreen.css('left', '0');
    resetGameBoard();
    createScoreBoard();
    $currentPlayer.text(players[activePlayer].name);
    startTimer();
    initialiseOptionsScreen();
  }
});

$('.return-to-options').click(function () {
  $gameScreen.css('left', '100%');
});

$('h1').click(function () {
  $(event.target).css({ 'line-height': '1em', 'padding': '1em 0' });
  $('p').hide()
});

$('p').click(function () {
  $('h1').css({ 'line-height': '1em', 'padding': '1em 0' });
  $('p').hide()
});
