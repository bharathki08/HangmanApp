"use strict";	
//App Module
var app = angular.module("HangmanApp",[]);
//Controller
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
	//Model Object
	var myRequest = new Request("./words.json");

 fetch(myRequest)
	 .then(function(resp) {
			return resp.json();
	 })
	 .then(function(data){
		 var data = data.wordlist;
		 var random = data[Math.floor(Math.random()*data.length)];
		console.log(random);
		
	})
	
	var words=["Altassian","Remember","Mountain","Pokemon"];
	$scope.incorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	var selectedWord='';
	$scope.guesses=6;
	$scope.displayWord='';
	$scope.input = {
		letter: ''
	};
	var selectRandomWord = function() {
		var index = Math.round(Math.random()*words.length);
		return words[index];
	}
	var newGame = function() {
		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen=[];
		$scope.guesses=6;
		$scope.displayWord="";
		selectedWord=selectRandomWord();
		var tempDisplayWord='';
		console.log(selectedWord);
		for(var i=0;i<selectedWord.length;i++) {
			tempDisplayWord+='*';
		}
		$scope.displayWord=tempDisplayWord;
		// Random word selection.
	}
	$scope.letterChosen = function() {
		// Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
		// Check if its correct.
		for(var i=0;i<$scope.correctLettersChosen.length;i++) {
			if($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLettersChosen.length;i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		var correct=false;
		for(var i=0;i<selectedWord.length;i++) {
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
				$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct=true;
			}
		}
		if(correct) {
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
			console.log($scope.correctLettersChosen);
		} else {
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
			console.log($scope.incorrectLettersChosen);
		}
		$scope.input.letter="";
		if($scope.guesses==0) {
			// You Lose
			var result=document.getElementById("result");
			result.innerHTML="You Lose !! Correct Word is " + selectedWord;
			document.getElementById("img").src = "images/2.gif";
			setTimeout("location.reload(true);",15000);
		}
		if($scope.displayWord.indexOf("*")==-1) {
			// Show score
			var result=document.getElementById("result");
			result.innerHTML="You Won !!";
			setTimeout("location.reload(true);",15000);
		}
	}
	newGame();
}]);	

