var activeMenuW, rollNumberW,foodCountW,budgetW, calorieW;

onmessage = function(e) {
    if (!e) {
        return;
    }
    console.log(e);
    activeMenuW = e.data[0];
    rollNumberW = e.data[1];
    foodCountW = e.data[2];
    budgetW = e.data[3];
    calorieW = e.data[4];

    testMenuWorker(activeMenuW,rollNumberW,foodCountW,budgetW, calorieW);
}




function testMenuWorker(activeMenuArray, rollNumber, foodCount, budget, calorie) {
	//randomizes and tests the active menu array
    "use strict";
    
    

	

	function calculateSP(menu) {
		//accepts an array of food objects
		"use strict";

		var baseGain = 12;
		var totalCarb = 0;
		var totalProtein = 0;
		var totalFat = 0;
		var totalVitamin = 0;
		var totalCal = 0;
        var foodList = "";

		for (var i = 0; i < menu.length; i++) {
			totalCal += menu[i].cal;
			totalCarb += menu[i].cal * menu[i].carb;
			totalProtein += menu[i].cal * menu[i].pro;
			totalFat += menu[i].cal * menu[i].fat;
			totalVitamin += menu[i].cal * menu[i].vit;
			foodList = foodList + menu[i].name + "+";
		}
		var totalTotal = totalCarb + totalProtein + totalFat + totalVitamin;

		var totalAverage = totalTotal / totalCal;

		var maxTotal = Math.max(totalCarb, totalProtein, totalFat, totalVitamin);

		var balancedMultiplier = (totalTotal / (maxTotal * 4)) * 2;

		return {
			SP: baseGain + (totalAverage * balancedMultiplier),
			foodList: foodList,
			multiplier: balancedMultiplier
		};
	}

	var menu = [];
	var randomizer = 0;
	var bestMenuNames;
	var bestIndex = 0;
	var bestMultiplier = 0;
    var bestSP = 0;
    var bestTotalPrice = 0;
    var bestTotalCalorie = 0;
    var bestMenuArray = [];

	//console.log("usedFoods check " + activeMenuArray);

    var progressPercent = 0;
    var progressPercentOld= 0;
    var totalPrice = 0;
    var totalCalorie = 0;

	for (var i = 0; i <= rollNumber; i++) {
        totalPrice = 0;
        totalCalorie = 0;
		for (var q = 0; q < foodCount; q++) {
            randomizer = Math.floor(Math.random() * activeMenuArray.length);
            menu.push(activeMenuArray[randomizer]);
            totalPrice += parseInt(activeMenuArray[randomizer].price);
            totalCalorie += parseInt(activeMenuArray[randomizer].cal);
        }

        progressPercent = Math.floor(i/rollNumber * 100);

        if (progressPercent !== progressPercentOld) {
            
            progressPercentOld = progressPercent;
            

            postMessage(progressPercent);

        }

        if(((parseInt(budget) != -1) && totalPrice > parseInt(budget)) || ((parseInt(calorie) != -1) && totalCalorie > parseInt(calorie))) {
            
            menu = [];          
            continue;
        }

		var result = calculateSP(menu);

       

		if (result.SP > bestSP) {
			bestSP = result.SP;
			bestMenuNames = result.foodList;
			bestIndex = i;
            bestMultiplier = result.multiplier;
            bestTotalPrice = totalPrice;
            bestTotalCalorie = totalCalorie;
            bestMenuArray = menu;
        }
        
        

		menu = [];
	}
    if(bestMenuNames) {
        //"3+1+2+4" => [3,1,2,4]
        var listSplit = bestMenuNames.split("+");
        //[3,1,2,4] => [1,2,3,4]
        listSplit.sort();
    
        listSplit.shift();
        //console.log(listSplit);
    
        var finalResult = {};
        var foodName = "";
        for (var b = 0; b < listSplit.length; b++) {
            foodName = listSplit[b];
    
            if (finalResult[foodName] >= 0) {
                finalResult[foodName] += 1;
            } else {
                finalResult[foodName] = 1;
            }
        }
    
        /*
         *console.log(finalResult);
         *console.log(bestSP + " found at " + bestIndex + ". try.");
         */
    
        
    
        postMessage({
            resultMenu: finalResult,
            spAmount: bestSP,
            foundAt: bestIndex,
            multiplier: bestMultiplier,
            foodQty: parseInt(foodCount),
            totalPrice: bestTotalPrice,
            totalCalorie: bestTotalCalorie,
            resultMenuArray: bestMenuArray
        });
    } else {
        //postMessage("error");
        
        //return console.log("error");
    }
}
