var itemPositionx =0;
var itemPositiony =0;
var bombLocations = [];
var radius = (($(window).width())/100)*10;
console.log(radius);
var shadow = '-webkit-box-shadow: 0 0 4vw #ffffff ;';
var weaponType = ["bombs", "missile","grenade", "tnt", "nuke", "gun", "lightSabers"];	
var numPlayers = 0;
// Initialize Firebase
var config = 
{
	apiKey: "AIzaSyBPtoHBXaP3vyueBiwOyNo6lSKeiRVuxNs",
	authDomain: "ggj2018multiverse.firebaseapp.com",
	databaseURL: "https://ggj2018multiverse.firebaseio.com",
	projectId: "ggj2018multiverse",
	storageBucket: "",
	messagingSenderId: "37973487332"
};
firebase.initializeApp(config);

var database = firebase.database();

// database.ref('users').on("value", function(snapshot) {


// });
//createPlayer();




// //********* placeholder canvas animations *********
// function drawShape() {
// 	var myCanvas = document.getElementById("canvas");
// 	var ctx = myCanvas.getContext("2d");
// 	ctx.fillRect(20, 20, 100, 100);
// 	ctx.strokeRect(10,10,120,120);
// 	ctx.clearRect(45,45,50,50);
// }
// //********* global variables *********

// var health = 100;
// var damage = -10;
// var attack = health + damage;

var Sprite = function(name, maxHp, currHp, weapons)
{		
	this.name = name;			
	this.maxHp = maxHp; //max hp
	this.currHp = currHp; //current hp
	this.bomb = [0,0], // [type, amount]
	this.missile = [1,0], // [type, amount]
	this.missile = [2,0], // [type, amount]
	this.grenade = [3,0], // [type, amount]
	this.tnt = [4,0], // [type, amount]
	this.nuke = [5,0], // [type, amount]
	this.gun = [6,0], // [type, amount]
	this.lightSabers =[7,0] // [type, energy]
}




// //********* Attack/Threat (TYPES) *********




// });


function createPlayer()
{
database.ref('/players').once("value", function(snapshot) {
var charlie = new Sprite ('charlie', 100,100);
console.log(charlie);
console.log(charlie.name);
numPlayers = Object.keys(snapshot.val()).length;
console.log(numPlayers);
sendPlayerToFirebase(numPlayers, charlie);
console.log(Object.keys(snapshot.val()).length);

});	
}

function sendPlayerToFirebase(numPlayers, newPlayer)
{
	database.ref("players/player" +(numPlayers++)).set(newPlayer);
}



function updateLocation(x, y)
{
database.ref("players/player" +(numPlayers)+"/location/x").set(x);
database.ref("players/player" +(numPlayers)+"/location/y").set(y);
database.ref("players/player" +(numPlayers)+"/location/userScreenWidth").set(($(window).width()));
}




var threatType = {
	natural: {
		0: "tsunami", 
		1: "tornado", 
		2: "earthquake", 
		3: "volcano", 
		4: "hurricane"
	},
	space: {
		0: "asteroid", 
		1: "aliens", 
		2: "meteor shower", 
		3: "solar flare", 
		4: "atomic radiation"
		// 5: "laser satellite", 
		// 6: "wormhole", 
		// 7: "time dialation"
	},
	plague: {
		0: "famine", 
		1: "disease", 
		2: "locusts", 
		3: "parasites",
		4: "zombies"
	}
};






// var threatObjectKeys = Object.keys(ThreatType);
// // var randomDrop = $(#gridMap) --> Math.floor((Math.random() * 100) + 1);
// var randomWeapon = weaponType[Math.floor(Math.random() * weaponType.length)];

// var randomThreatIndex = Math.floor(Math.random() * threatObjectKeys.length);

// var randomThreat = ThreatType[threatObjectKeys[randomThreatIndex]];

// var randomT = ThreatType[Math.floor(Math.random() * ThreatType.length)];


// //********* console logic tests *********
// console.log(attack);
// console.log(weaponType);
// console.log(ThreatType);

// console.log(randomWeapon);
// console.log(threatObjectKeys);
// console.log(randomThreatIndex);
// console.log(randomThreat);
// // console.log(randomDrop);
// console.log(randomT);

// //********* User Attacks Function (spawns weapon constructors) *********
// var UserAttacks = function(){
// var AttackArray = [];

// var WeaponSprites = function(type, attack, active, cycle, placement)
// {		
// 			this.type = type;			
// 			this.attack = attack; //(damage = % to health)
// 			this.active = active; //false	
// 			this.cycle = cycle; //cycle of event
// 			this.placement = placement; //random Math --> location on grid (canvas)
// }
// 		for(var i = 0; i < 2; i++){
// var WeaponCount = i;
// 		WeaponCount = new WeaponSprites(weaponType , (damage += 10), false, 4, randomDrop);
// 		AttackArray.push(WeaponCount);
// 	}

// 		console.log(AttackArray);
// };

// //********* Threat Function (spawns threat constructors) *********
// var AllOtherThreats = function(){
// var ThreatArray = [];
// var ThreatSprites = function(type, attack, active, cycle, placement){		
// 			this.type = type;			
// 			this.attack = attack; //(damage = % to health)
// 			this.active = active; //false	
// 			this.cycle = cycle; //cycle of event
// 			this.placement = placement; //random Math --> location on grid (canvas)
// 		}
// 		for(var i = 0; i < 2; i++){
// var ThreatCount = i;
// 		ThreatCount = new ThreatSprites(randomThreat, damage, false, 4, randomDrop);
// 		ThreatArray.push(ThreatCount);
// 	}

// 		console.log(ThreatArray);
// };

// //********* JQUERY (ready function) *********
// $(document).ready(function(){
// 	drawShape();


// //********* spawn method *********
// $("#spawn").on("click", function(){
// 	UserAttacks();
// 	AllOtherThreats();

// 	});
// });


// //METHODS:
// //********* heal method *********



var theUser = document.querySelector("#mainPlayer");
var theEnemy = document.querySelector("#enemy");
var container = document.querySelector("#planet1");
var planet2 = document.querySelector("#planet2");
var planet3 = document.querySelector("#planet3");
var planet4 = document.querySelector("#planet4");
var detonate = document.querySelector("#detonate");
var tester =  document.querySelector("#tester");
tester.addEventListener("click", animatePlanet, false);
container.addEventListener("click", getClickPosition, false);
bombDeployer.addEventListener("click", deployBombs, false);
missileDeployer.addEventListener("click", launchmissile, false);
detonate.addEventListener("click", attack, false);
returnTester.addEventListener("click", phasePlanets, false);
buttonEnemy.addEventListener("click", moveEnemy, false);




function attack (e)
{
	console.log("x: " + itemPositionx + " y: "+itemPositiony)
	console.log(bombLocations);
	damageRadius(bombLocations);
	console.log('All bombs were detonated');
	$(".bomb" ).remove();
	$(".missile" ).remove();
	bombLocations=[];
}

function damageRadius(bombPosition)
{
for (var i=0;i<bombPosition.length;i++)
{
	console.log(Math.abs(bombPosition[i][0] - itemPositionx));
	console.log(Math.abs(bombPosition[i][1] - itemPositionx));
		if (Math.abs(bombPosition[i][0] - itemPositionx) <radius && Math.abs(bombPosition[i][1] - itemPositiony)< radius)
		{
			console.log("bomb "+ (i+1) + "Damage you " );
		} else if (Math.abs(bombPosition[i][0] - itemPositionx) >(radius-1) && Math.abs(bombPosition[i][1] - itemPositiony)> (radius-1))
		{
			console.log("bomb "+ (i+1) + "Didn't damage you" );
		} else
		{
			console.log("bomb "+ (i+1) + "Didn't damage you" );
		}
}
}

function absoluteLocation()
{
	var p = $( "#mainPlayer" );
	var position = p.position();
	var width = $("#planet1").width() ;
	var height = $("#planet1").height();
	console.log("x " +width+ " y"+height);
	// itemPositionx =position.left;
	// itemPositiony =position.top;	
	itemPositionx =((position.left/width)*100) + 5;
	console.log("x% is " + itemPositionx);
	itemPositiony =(((position.top)/height)*100)+10;
	console.log("y% is " + itemPositiony);
	//itemPositiony =position.top;	
	updateLocation(itemPositionx,itemPositiony);
}


function launchmissile (e)
{
	absoluteLocation();
	console.log(itemPositionx + " " +itemPositiony)
	bombLocations[bombLocations.length] = [itemPositionx,itemPositiony];
	$("#planet1").append('<div class="missile" style="top:' +itemPositiony+'%; left: '+itemPositionx+'%;" ></div>');	
}

function deployBombs (e)
{	
	absoluteLocation();
	bombLocations[bombLocations.length] = [itemPositionx,itemPositiony];
	$("#planet1").append('<div class="bomb" style="top:' +itemPositiony+'%; left: '+itemPositionx+'%;" ></div>');
}

function moveEnemy()
{
database.ref('/players').on("value", function(snapshot) {
	console.log(snapshot.val().player0.location.x);
	console.log(snapshot.val().player0.location.y);
	var width = $("#planet1").width() *(((snapshot.val().player0.location.x)/100)-0.05) ;
	var height = $("#planet1").height()*(((snapshot.val().player0.location.y)/100)-0.1);
	var translate3dValue = "translate3d(" + width +"px,"+ height + "px,0)";
	theEnemy.style.transform =translate3dValue;
});
}

function animatePlanet (e){
$("#planet2").addClass('planet2');
$("#planet3").addClass('planet3');
$("#planet4").addClass('planet4');
console.log('click here');	    
var value4 = "width: 15vw; height: 15vw; margin-top: -12.5vw; margin-left: -12.5vw;background-color:green; left:20%; top:20%; z-index: -6;opacity: 0.4; filter: alpha(opacity=60);"+shadow+'"';
planet4.setAttribute("style",value4);
var value3 = "width: 20vw; height: 20vw; margin-top: -12.5vw; margin-left: -12.5vw; background-color:green; left:25%; top:25%; z-index: -5;opacity: 0.5; filter: alpha(opacity=60);"+shadow+'"';
planet3.setAttribute("style",value3);
var value2 = "width: 25vw; height: 25vw; margin-top: -12.5vw; margin-left: -12.5vw;background-color:green; left:30%; top:30%; z-index: -4;opacity: 0.6; filter: alpha(opacity=60);"+shadow+'"';
planet2.setAttribute("style",value2);
}

function phasePlanets()
{
$('#planet2').removeClass('planet2');
$("#planet3").removeClass('planet3');
$("#planet4").removeClass('planet4');	    
planet4.setAttribute("style","");
planet3.setAttribute("style","");
planet2.setAttribute("style","");
$('#planet2').addClass('planet2a');
$("#planet3").addClass('planet3a');
$("#planet4").addClass('planet4a');
// var value4 = "width: 15vw; height: 15vw; margin-top: -12.5vw; margin-left: -12.5vw;background-color:green; left:20%; top:20%; z-index: -6;opacity: 0.4; filter: alpha(opacity=60);"+shadow+'"';
// planet4.setAttribute("style",value4);
// var value3 = "width: 20vw; height: 20vw; margin-top: -12.5vw; margin-left: -12.5vw; background-color:green; left:25%; top:25%; z-index: -5;opacity: 0.5; filter: alpha(opacity=60);"+shadow+'"';
// planet3.setAttribute("style",value3);
// var value2 = "width: 25vw; height: 25vw; margin-top: -12.5vw; margin-left: -12.5vw;background-color:green; left:30%; top:30%; z-index: -4;opacity: 0.6; filter: alpha(opacity=60);"+shadow+'"';
// planet2.setAttribute("style",value2);
}

function getClickPosition(e){
	var parentPosition = getPosition(container)
	var xPosition = e.clientX - parentPosition.x- (theUser .offsetWidth/2);
	var yPosition = e.clientY - parentPosition.y-(theUser .offsetHeight/2);


	var translate3dValue = "translate3d(" + xPosition +"px,"+ yPosition + "px,0)";
	theUser.style.transform =translate3dValue;

	
	setTimeout(function(){ absoluteLocation(); }, 1000);

}

function getPosition(element)
{
	var xPosition = 0;
	var yPosition = 0;
	while (element) 
	{
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}




