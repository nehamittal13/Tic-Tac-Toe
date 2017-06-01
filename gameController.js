var mainApp = angular.module("mainApp", []);

mainApp.controller('gameController',function() {
	var vm = this;
	var emptyCell = '-';
	vm.board = [
	[{value: '-'}, {value: '-'}, {value: '-'}],
	[{value: '-'}, {value: '-'}, {value: '-'}],
	[{value: '-'}, {value: '-'}, {value: '-'}]
	];

	vm.reset = function() {
    	vm.currentPlayer = 'X';
    	vm.winner = false;
    	vm.cat = false;

    	vm.board.forEach(function(row){
    		row.forEach(function(cell){
    			cell.value = emptyCell;
    		});
    	});

    	vm.currentPlayer = 'X';
    	vm.winner = false;
    	vm.cat = false;
  	};
  
  	vm.reset();	

  	var checkForMatch = function(cell1, cell2, cell3) {
    	return cell1.value === cell2.value && cell1.value === cell3.value && cell1.value !== emptyCell;
  	};

  	var checkEndOFGame = function(){
  		var rowMatch = [0, 1, 2].reduce(function(memo, row) {
  			return memo, checkForMatch(vm.board[row][0], vm.board[row][1], vm.board[row][2]);
  		}, false);

  		var colMatch = [0, 1, 2].reduce(function(memo, col) {
  			return memo, checkForMatch(vm.board[0][col], vm.board[1][col], vm.board[2][col]);
  		}, false);

  		var diagonalMatch = checkForMatch(vm.board[0][0], vm.board[1][1], vm.board[2][2]) || 
  							checkForMatch(vm.board[0][2], vm.board[1][1], vm.board[2][0]);

  		vm.winner = rowMatch || colMatch || diagonalMatch;

  		return vm.winner;
  	};

	vm.isTaken = function(cell) {
    	return cell.value !== '-';
	};

	vm.populateValue = function(cell) {
		cell.value = vm.currentPlayer;

		if(checkEndOFGame() === false) {
			vm.currentPlayer = vm.currentPlayer === 'X'? '0' : 'X';
		}
	};
});