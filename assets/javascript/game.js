var resetGame = function(){
	//VARIABLES
avatar = [ ["brienne", 8, 120, "Brienne of Tarth"], ["daenerys", 15, 100, "Daenerys Targaryen"], ["baelish", 10, 150, "Lord Baelish"], ["serGregor", 25, 180, "Ser Gregor Clegane"] ];
gameStart = 0;
fightMatch = [];
enemyCount = 3;

$(".attack").hide();
$(".playAgain").hide();

	for (i = 0; i < avatar.length; i++){
		$("#" + avatar[i][0]).appendTo(".setup");
		$("#" + avatar[i][0]).css({'background-color': 'white'},1000);
		$("#" + avatar[i][0]).css({'color': 'black'},1000);
		$("#" + avatar[i][0] + " .score").text(avatar[i][2]);
		$("#" + avatar[i][0]).show();
		$(".character").text("Pick your Character");

				$(".status").html("");
	}
} // close function


$(document).ready(function() {
//VARIABLES
avatar = [ ["brienne", 8, 120, "Brienne of Tarth"], ["daenerys", 15, 100, "Daenerys Targaryen"], ["baelish", 10, 150, "Lord Baelish"], ["serGregor", 25, 180, "Ser Gregor Clegane"] ];
gameStart = 0;
fightMatch = [];
enemyCount = 3;

$(".attack").hide();
$(".playAgain").hide();


$(".box").on("click", function(){

	//If the 
	if(gameStart == 0){

		var chosen = $(this).attr('id');
		gameStart = 1;

		//Move avatars not chosen to the enemy area 
		for(i = 0; i < avatar.length; i++){
			if(avatar[i][0] != chosen)
			{
				$("#" + avatar[i][0]).appendTo(".enemies");
				$("#" + avatar[i][0]).css({'background-color': 'red'},1000);
				$("#" + avatar[i][0]).css({'color': 'white'},1000);
			}
			else
			{
				fightMatch[0] = i; //set the main player
			}
		}		

		// the game has started set to 1
		$(".character").text("Your Character");
		gameStart = 1;

	} //end main if 
	else{
		//Move enemy to defender position
		if(gameStart == 1){
		var chosen = $(this).attr('id');

		$("#" + chosen).appendTo(".defender");
		$("#" + chosen).css({'background-color': 'black'},1000);

		// set the oponent character in fightMatch array
		for (var i = 0; i < avatar.length; i++){
			if(avatar[i][0] == chosen)
			{
				fightMatch[1] = i;	//set the enemy
			}
		}// for loop end
		
		//Show attack button!
		$(".attack").show();
		gameStart = 2; 

		} // close else 

	} // end main else
}); //end .box click



//BEGIN FIGHTING!
$(".attack").on("click", function(){

	
	//Villain hurts player avatar
	avatar[fightMatch[0]][2] -= avatar[fightMatch[1]][1];

	//Player avatar hurts villain
	avatar[fightMatch[1]][2] -= avatar[fightMatch[0]][1];

	//display new scores
	$("#" + avatar[fightMatch[0]][0] + " .score").text(avatar[fightMatch[0]][2]);
	$("#" + avatar[fightMatch[1]][0] + " .score").text(avatar[fightMatch[1]][2]);


	//check to see if player has lost
	if(avatar[fightMatch[0]][2] <= 0){
		$(".status").html("You are Defeated! GAME OVER");

		$(".attack").hide();
		$(".playAgain").show();
	}
	else
	{
		//Check to see if enemy has been killed
		if(avatar[fightMatch[1]][2] <= 0){
			enemyCount -= 1; // keep track of the number of enemies left

			//If there are no enemies left to defeat!
			if(enemyCount <= 0){
				$("#" + avatar[fightMatch[1]][0]).hide();
				$(".status").html("You Won!!! GAME OVER");
				$(".playAgain").show();
				$(".attack").hide();

				
			}
			else
			{
				//You have beat the current enemy!  on to the next enemy
				$("#" + avatar[fightMatch[1]][0]).hide();
				$(".status").html("You defeated " + avatar[fightMatch[1]][3] + "You can now choose to fight another enemy.");
				$(".attack").hide();

				gameStart = 1; //allows you to pick the next enemy.
			}
		}
		else{
			//live to fight another day! display status update
			$(".status").html("You attacked " + avatar[fightMatch[1]][3] +  " for " + avatar[fightMatch[0]][1] + " damage" + '<br />' + avatar[fightMatch[1]][3] + " attacked you back for " + avatar[fightMatch[1]][1] + " damage" );
			//increase player defenses
			avatar[fightMatch[0]][1] += 36;
			gameStart = 1; //allows you to pick the next enemy.
		}
	}
});


//If Play Again Button is Pressed Reset the Game! 
$(".playAgain").on("click", function(){
	resetGame();
});




}); //Doc Ready
