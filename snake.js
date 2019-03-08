var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;

var SNAKE_SPEED = 500;

var $gameField;
var $gameTable;

var snakeCoordX;
var snakeCoordY;
var direction = 'top';
var snakeInterval;

var snake = [];

function init(){
    $gameField = document.getElementById('game-field');
    
    buildGameField();
    
   document.getElementById('snake-start').addEventListener('click', handleGameStart);
   document.getElementById('snake-renew').addEventListener('click', handleGameRenew);
    
    window.addEventListener('keydown', handleDirecnionChange);
}

function createFood() {
    var foodCreate = false;
    
    while(!foodCreate){
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);
        
        var $foodCell = $gameTable.children[foodY].children[foodX];
        
        if(!$foodCell.classList.contains('snake-unit')) {
            $foodCell.classList.add('food-unit');
            
            foodCreate = true;
        }
    }
}

function handleDirecnionChange(event){
    switch(event.keyCode){
        case 37: // влево
            if(direction !== 'right') direction = 'left';
            break;
        case 38: // вверх
            if(direction !== 'bottom') direction = 'top';
            break;
        case 39: // вправо
            if(direction !== 'left') direction = 'right';
            break;
        case 40: // вниз
             if(direction !== 'top') direction = 'bottom';
            break;
    }
}

function handleGameStart(){
    respawn();
    
  snakeInterval = setInterval(move, SNAKE_SPEED);
    
    createFood();
}

function move(){
    switch(direction){
        case 'top': 
            snakeCoordY--;
            break;
        case 'bottom':
             snakeCoordY++;
            break;
        case 'left':
             snakeCoordX--;
            break;
        case 'right':
            snakeCoordX++;
            break;
    }
    var $newUnit;
    
    if(inBounds()){
        $newUnit = $gameTable.children[snakeCoordY].children[snakeCoordX];
    }
    
    if(inBounds() && !isSnakeUnit($newUnit)) {
        $newUnit.classList.add('snake-unit');
        snake.push($newUnit);
 
    if(!isFood($newUnit)) {
      var $removedElement = snake.shift();
      $removedElement.classList.remove('snake-unit');
    }
 
    } else {
        gameOver();
    } 
}

function isSnakeUnit(unit) {
    return snake.includes(unit);
}

function gameOver(){
    clearInterval(snakeInterval);
    direction = 'top';
    for(var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    
    var $foodUnits = document.getElementsByClassName('food-unit');
    for(var i = 0; i < $foodUnits.length; i++){
        $foodUnits[i].classList.remove('food-unit')
    }
    
    alert('GAME OVER');
}

function inBounds() {
    return snakeCoordX >= 0 && snakeCoordX < FIELD_SIZE_X && snakeCoordY >= 0 && snakeCoordY < FIELD_SIZE_Y;
}

function isFood(unit){
    if(unit.classList.contains('food-unit')){
        unit.classList.remove('food-unit');
        createFood();
        
        return true;
    }
    return false;
    
}


function handleGameRenew(){
    
}

// показывает змейку
function respawn(){
    snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
    snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);
    
    var $snakeHead = $gameTable.children[snakeCoordY].children[snakeCoordX];
    $snakeHead.classList.add('snake-unit');
    
     var $snakeTail = $gameTable.children[snakeCoordY + 1].children[snakeCoordX];
    $snakeTail.classList.add('snake-unit');
 
    snake.push($snakeTail);
    snake.push($snakeHead);
}
//respawn();

// создаёт поле
function buildGameField(){
    $gameTable = document.createElement('table');
    $gameTable.classList.add('game-table');
    
    for(var i = 0; i < FIELD_SIZE_X; i++){
        var $row = document.createElement('tr');
        
        for(var j = 0; j < FIELD_SIZE_Y; j++){
            var $cell = document.createElement('td');
            $cell.classList.add('game-cell');
            
            $row.appendChild($cell);
         }
        
       $gameTable.appendChild($row);
    }
    
    $gameField.appendChild($gameTable);
}

window.addEventListener('load', init);