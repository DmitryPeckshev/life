
var worldLength = 280;		// ширина
var worldHeight = 130;		// высота

var myWorld = document.getElementById('world');
var cellContainer = [];
var cellStatus = [];
var neighbors = [];
var lifeCells = 0;
var generation = 0;
var displivecells = document.getElementById('displivecells');
var dispgen = document.getElementById('dispgen');

// построение мира
function createWorld() {
	myWorld.style.width = worldLength * 5 + 'px';
	myWorld.style.height = worldHeight * 5 + 'px';
	var n = 0;	
	for(var i = 0; i<worldHeight; i++){
		for(var j = 0; j<worldLength; j++){
			var newCell = document.createElement('div');
			newCell.className = 'cell';
			cellContainer[n] = myWorld.appendChild(newCell);
			cellStatus[n] = 0;
			n++;
		}
	}
}

// случайные начальные условия
function randomNum(minRandom,maxRandom) {
		RandomInt = Math.floor(Math.random()* (maxRandom - minRandom + 1)) + minRandom;
	}
function randomCells(){
console.log(cellContainer.length);
	for(var i=0; i < cellContainer.length/3; i++){
		var q = randomNum(0,cellContainer.length-1);
		q = RandomInt;
		if(cellStatus[q] == 1) {
			i--;
			continue;
		}
		cellContainer[q].classList.add('live');
		cellStatus[q] = 1;
	}
}

// количество живых клеток
function numOfLifeCells() {
	var n = 0;
	lifeCells = 0;
	for(var i = 0; i<worldHeight; i++){
		for(var j = 0; j<worldLength; j++){
			if(cellStatus[n] == 1){
				lifeCells++;
			}
			n++;
		}
	}
	displivecells.innerHTML = lifeCells;
}

// Количество живых соседей у клетки
function liveNeighbors(){
	var n = 0;
	
	for(var i = 0; i<worldHeight*worldLength; i++){
		n = 0;
		var cellInspection = 0;
		
		for(var k = -1; k <= 1; k++){
			for(var j = -1; j<= 1; j++){
				if(k==0 && j==0){
					continue;
				}
				if(i % worldLength == 0) { //left
					if(j == -1){ 
						cellInspection = i + (worldLength * (k+1)) -1;
					}else{
						cellInspection = (i + j) + (k * worldLength);
					}
				}
				
				else if(i % worldLength == worldLength-1){ //Right
					if(j == 1){ 
						cellInspection = i + (worldLength * (k-1)) +1;
					}else{
						cellInspection = (i + j) + (k * worldLength);
					}
				}
				
				else if(i >= worldLength * worldHeight - worldLength && i < worldLength * worldHeight){ //Bottom
					if(k == 1){ 
						cellInspection = i % worldLength + j;
					}else{
						cellInspection = (i + j) + (k * worldLength);
					}
				}
				
				else if(i >= 0 && i <worldLength){ //Top
					if(k == -1){ 
						cellInspection = (worldHeight * worldLength) - worldLength + i + j;
					}else{
						cellInspection = (i + j) + (k * worldLength);
					}
				}
				
				else { // all-other
					cellInspection = (i + j) + (k * worldLength);				
				}
				
				if(i == 0){ //top-left
					if(k == -1 && j == -1){
						cellInspection = worldHeight * worldLength -1;
					}
					if(k == -1 && j != -1){
						cellInspection = worldHeight * worldLength - worldLength + j;
					}
					if(k != -1 && j == -1){
						cellInspection = (worldLength - 1) + (k * worldLength);
					}
				}
				
				if(i == worldHeight * worldLength -1){ //bottom-rigth
					if(k == 1 && j == 1) {
						cellInspection = 0;
					}
					if(k == 1 && j != 1) {
						cellInspection = worldLength - 1 + j;
					}
					if(k != 1 && j == 1) {
						cellInspection = (worldHeight * worldLength - worldLength) + (worldLength * k);
					}
				}
				
				if(i == worldLength - 1){ //top-right
					if(k == -1 && j == 1) {
						cellInspection = worldHeight * worldLength - worldLength;
					}
					if(k == -1 && j != 1) {
						cellInspection = worldHeight * worldLength - 1 + j;
					}
					if(k != -1 && j == 1) {
						cellInspection = 0 + (k * worldLength);
					}
				}
				
				if(i == worldHeight * worldLength - worldLength){ //bottom-left
					if(k == 1 && j == -1) {	
						cellInspection = worldLength - 1;
					}
					if(k == 1 && j != -1) {	
						cellInspection = j;
					}
					if(k != 1 && j == -1) {	
						cellInspection = worldHeight * worldLength - 1 + (k * worldLength);
					}
				}
					
				if(cellStatus[cellInspection] == 1) { 
					n++;
				}	
			}
		}
		
		neighbors[i] = n;
	}
	setTimeout(nextGeneration, 100);
}

// отрисовка следующего поколения
function nextGeneration() {
	lifeCells = 0;
	for(var i = 0; i<worldHeight*worldLength; i++){
		
		if(cellStatus[i] == 1){
			if(neighbors[i] == 2 || neighbors[i] == 3){
				cellContainer[i].className = 'cell live';
				cellStatus[i] = 1;
				lifeCells++
			}else{
				cellContainer[i].className = 'cell';
				cellStatus[i] = 0;
			}
			
		}else{
			if(neighbors[i] == 3){
				cellContainer[i].className = 'cell live';
				cellStatus[i] = 1;
				lifeCells++
			}else{
				cellContainer[i].className = 'cell';
				cellStatus[i] = 0;
			}
		}
		
	}
	generation++;
	
	displivecells.innerHTML = lifeCells;
	dispgen.innerHTML = generation;
	liveNeighbors();
}

createWorld();
randomCells();
numOfLifeCells();

setTimeout(liveNeighbors, 2000);
