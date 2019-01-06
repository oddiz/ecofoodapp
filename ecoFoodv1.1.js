/* eslint-disable */
// Eco cook js by oddiz

function Food (foodName,foodType,carb,pro,fat,vit,cal,weight) {
	"use strict";
	this.name = foodName;
	this.type = foodType;
	this.carb = carb;
	this.pro = pro;
	this.fat = fat;
	this.vit = vit;
	this.cal = cal;
	this.weight = weight;
	
}
var bearSupreme = new Food		("Bear SUPREME","Stove",		8,20,22,10,1200,500);
var hareHaunches = new Food 	("Fried Hare Haunches","Stove",	6,15,27,4,700,100);
var elkTaco = new Food 			("Elk Taco","Stove",			12,15,10,14,650,200);
var boiledSausage = new Food 	("Boiled Sausage","Stove",		0,27,22,0,600,300);
var cornFritters = new Food		("Corn Fritters","Stove",		15,7,17,8,500,100);
var elkWellington = new Food 	("Elk Wellington", "Bakery",	12,20,12,8,1400,500);
var macaroons = new Food 		("Macaroons","Bakery", 			16,7,14,10,250,200);
var bearClaw = new Food 		("Bearclaw", "Bakery", 			12,6,21,7,650,300);
var camasBread = new Food 		("Camas Bread", "Bakery", 		15,5,13,9,800,500);
var bread = new Food 			("Bread", "Bakery", 			20,5,10,5,750,500);
var sweetSalad = new Food		("Sweet Salad","Kitchen",		18,9,7,22,1100,400);
var crimsonSalad = new Food 	("Crimson Salad","Kitchen",		15,9,12,20,1100,400);
var veggySoup = new Food 		("Vegetable Soup","C.Stove",	12,4,7,19,1200,900);

console.log(veggySoup);

var usedFoods = [];
var isCreated = 0;
	
function createMenu(menuInput) {
	
	"use strict";
	
	if (menuInput["1"]===true)  {usedFoods.push(bearSupreme);} 
	if (menuInput["2"]===true)  {usedFoods.push(hareHaunches);} 
	if (menuInput["3"]===true)  {usedFoods.push(elkTaco);}
	if (menuInput["4"]===true)  {usedFoods.push(boiledSausage);} 
	if (menuInput["5"]===true)  {usedFoods.push(cornFritters);} 
	if (menuInput["6"]===true)  {usedFoods.push(elkWellington);}
	if (menuInput["7"]===true)  {usedFoods.push(macaroons);}
	if (menuInput["8"]===true)  {usedFoods.push(bearClaw);}
	if (menuInput["9"]===true)  {usedFoods.push(camasBread);}
	if (menuInput["10"]===true) {usedFoods.push(bread);}
	if (menuInput["11"]===true) {usedFoods.push(sweetSalad);}
	if (menuInput["12"]===true) {usedFoods.push(crimsonSalad);}
	if (menuInput["13"]===true) {usedFoods.push(veggySoup);}
	
	/*var menuOutput = [];
	
	$.each(usedFoods, function(i, el){
		if($.inArray(el, menuOutput) === -1) menuOutput.push(el);
	});*/
		
	//console.log(menuOutput);
	
	function foodlog (){
		var x = [];
		for (var i = 0; i<usedFoods.length;i++){
			x.push(usedFoods[i].name);
		}
		return x;
	}
	
	console.log("Menu created using " + foodlog());
}

function calculateSP (menuArray) {
	
	"use strict";
	
	var baseGain = 12;
	var totalCarb = 0;
	var totalProtein = 0;
	var totalFat = 0;
	var totalVitamin = 0;
	var totalCal = 0 ;
	var foodList = "";
	
	for(var i = 0; i < menuArray.length; i++) {
		totalCal += menuArray[i].cal;
		totalCarb += menuArray[i].cal * menuArray[i].carb;
		totalProtein += menuArray[i].cal * menuArray[i].pro;
		totalFat += menuArray[i].cal * menuArray[i].fat;
		totalVitamin += menuArray[i].cal * menuArray[i].vit;
		foodList = foodList + menuArray[i].name + "+";
		}
	var totalTotal = (totalCarb + totalProtein + totalFat + totalVitamin);
	
	var totalAverage =  totalTotal / totalCal;
	
	var maxTotal = Math.max(totalCarb,totalProtein,totalFat,totalVitamin);
	
	var balancedMultiplier = (totalTotal / (maxTotal * 4)) * 2; 
	
	return {
		SP: baseGain + (totalAverage*balancedMultiplier),
		foodList: foodList,
		multiplier: balancedMultiplier,
	};
	
}

function testMenu (rollNumber,foodCount) {
	
	"use strict";
	
	var menu = [];
	var spArray = [];
	var nameArray = [];
	var multiplierArray = [];
	var randomizer = 0;
	
	console.log("usedFoods check" + usedFoods);
	
	for(var i = 0; i<rollNumber;i++) {
		
		for (var q=0; q<foodCount; q++){
			
			randomizer = Math.floor(Math.random()*usedFoods.length);
			menu.push(usedFoods[randomizer]);
			
		}
		 
		var result = calculateSP(menu); 
		spArray.push(result.SP);
		nameArray.push(result.foodList);
		multiplierArray.push(result.multiplier);
		menu = [];
	}
	
	
	var indexOfMaxSP = indexOfMax(spArray);
	var listSplit = nameArray[indexOfMaxSP].split("+");
	
	listSplit.sort();
	listSplit.shift();
	//console.log(listSplit);

	
	var finalResult = {};
	var foodName = "";
	for (var b=0 ; b<listSplit.length ; b++) {
		
		foodName = listSplit[b];
		
	
		if(finalResult[foodName] >= 0) {
			finalResult[foodName] += 1;
			
		} else {
			finalResult[foodName] = 1;
		}
			
		
	}
	
	console.log(finalResult);
	console.log(spArray[indexOfMaxSP] + " found at " + indexOfMax(spArray) + ". try.");
	
	usedFoods = [];
	
	return {
		resultObject: finalResult,
		spAmount: spArray[indexOfMaxSP],
		foundAt: indexOfMax(spArray)+1,
		multiplier: multiplierArray[indexOfMaxSP],
	};
	
	
	
	
}



function indexOfMax(arr) {
    "use strict";
	if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        
		if (arr[i] > max) {
        
			maxIndex = i;
            max = arr[i];
        
		}
    }

    return maxIndex;
}
