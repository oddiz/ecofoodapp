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

/*Food.prototype.calculateTotal = function(amount) {
	var calCalculate = amount * this.cal; 
}*/

var usedFoods = [];


//function createFood() {

	
//}

function createMenu(f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12) {
	
	"use strict";
	
	var bearSupreme = new Food("Bear SUPREME","Stove",8,20,22,10,1200,500);
	var hareHaunches = new Food ("Fried Hare Haunches","Stove",6,15,27,4,700,100);
	var elkTaco = new Food ("Elk Taco","Stove",12,15,10,14,650,200);
	var boiledSausage = new Food ("Boiled Sausage","Stove",0,27,22,0,600,300);
	var cornFritters = new Food ("Corn Fritters","Stove",15,7,17,8,500,100);
	var elkWellington = new Food ("Elk Wellington", "Bakery",12,20,12,8,1400,500);
	var macaroons = new Food ("Macaroons","Bakery", 16,7,14,10,250,200);
	var bearClaw = new Food ("Bearclaw", "Bakery", 12,6,21,7,650,300);
	var camasBread = new Food ("Camas Bread", "Bakery", 15,5,13,9,800,500);
	var bread = new Food ("Bread", "Bakery", 20, 5,10,5,750,500);
	var sweetSalad = new Food("Sweet Salad","Kitchen",18,9,7,22,1100,400);
	var crimsonSalad = new Food ("Crimson Salad","Kitchen",15,9,12,20,1100,400);

	
	
	if (f1===true)  {usedFoods.push(bearSupreme);} 
	if (f2===true)  {usedFoods.push(hareHaunches);} 
	if (f3===true)  {usedFoods.push(elkTaco);}
	if (f4===true)  {usedFoods.push(boiledSausage);} 
	if (f5===true)  {usedFoods.push(cornFritters);} 
	if (f6===true)  {usedFoods.push(elkWellington);}
	if (f7===true)  {usedFoods.push(macaroons);}
	if (f8===true)  {usedFoods.push(bearClaw);}
	if (f9===true)  {usedFoods.push(camasBread);}
	if (f10===true) {usedFoods.push(bread);}
	if (f11===true) {usedFoods.push(sweetSalad);}
	if (f12===true) {usedFoods.push(crimsonSalad);}
	
	console.log("using" + usedFoods);
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
	};
	
}



function testMenu (rollNumber) {
	
	"use strict";
	
	var menu = [];
	var spArray = [];
	var nameArray = [];
	var count = 0;
	
	for(var i = 0; i<rollNumber.length;i++) {
		
		for (var q=0; q<usedFoods.length; q++){
			
			menu.push(usedFoods[Math.floor(Math.random()*usedFoods.length)]);
			
		}
		
		var result = calculateSP(menu); 
		spArray.push(result.SP);
		nameArray.push(result.foodList);
		count++;
		menu = [];
	}
	
	
	var indexOfMaxSP = indexOfMax(spArray);
	console.log(nameArray);
	var listSplit = 0;//nameArray[indexOfMaxSP].split("+");
	
	//listSplit.sort();
	//listSplit.shift();
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

}
	//console.log(nameArray[indexOfMaxSP]);
	
	




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


createMenu(true,true,false,false,false,false,true);
testMenu(100);

