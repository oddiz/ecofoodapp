/*eslint-disable no-undef */

var UIController = (function() {
	var DOMStrings = {
		foodAddBtn: ".item__add",
		foodDeleteBtn: ".item__delete",
		availableFoods: ".available__food__list",
		selectedFoods: ".selected__list",
        calculateButton: ".calculate__btn",
        calculateAsyncButton: ".withAsync",
		foodAmountInput: ".food__amount__input",
		simScaleInput: ".simulation__scale__input",
		output: ".output",
        rightContainer: ".right__container",
        calculateWorkerButton: ".withWorker",
        progressBar: "#inner__bar",
        
	};

	return {
		initUI: function() {
			//clear lists
			var availableList = document.querySelector(DOMStrings.availableFoods);
			var selectedList = document.querySelector(DOMStrings.selectedFoods);

			this.clearLists(availableList);
			this.clearLists(selectedList);

			//adds all foods to active menu
			var allFoodsArray, newArray;
			newArray = [];
			allFoodsArray = Object.values(foods);
			allFoodsArray.forEach(function(ele) {
				var q = Object.values(ele);
				q.forEach(function(ele) {
					newArray.push(ele);
				});
			});

			newArray.forEach(function(foodObj) {
				UIController.addToAvailable(foodObj);
			});
		},
		getDOMStrings: function() {
			return DOMStrings;
		},
		addToSelected: function(foodObj) {
			var htmlTemplate, newHtml;

			//remove it from available list first so no duplicate ids
			var el = document.getElementById(foodObj.id);
			if (el) {
				//if it's anywhere on the screen
				el.parentNode.removeChild(el);
			}
			//add food to selected list

			htmlTemplate =
				'<div class="item clearfix" id="%id%"><div class="item__description">%foodname%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';

			newHtml = htmlTemplate.replace("%id%", foodObj.id);
			newHtml = newHtml.replace("%foodname%", foodObj.name);

			document.querySelector(DOMStrings.selectedFoods).insertAdjacentHTML("afterbegin", newHtml);
		},
		removeFromSelected: function(foodObj) {
			//remove it from selected list first so no duplicate ids

			var el = document.getElementById(foodObj.id);
			el.parentNode.removeChild(el);

			//add to available list

			this.addToAvailable(foodObj);
		},
		addToAvailable: function(foodObj) {
			var htmlTemplate, newHtml;

			//remove it from the list first so no duplicate ids
			var el = document.getElementById(foodObj.id);
			if (el) {
				//if it's anywhere on the screen
				el.parentNode.removeChild(el);
			}
			//add food to selected list

			htmlTemplate =
				'<div class="item clearfix" id="%id%"><div class="item__description">%foodname%</div><div class="item__add"><button class="item__add--btn"><i class="ion-android-add"></i></button></div></div>';

			newHtml = htmlTemplate.replace("%id%", foodObj.id);
			newHtml = newHtml.replace("%foodname%", foodObj.name);

			document.querySelector(DOMStrings.availableFoods).insertAdjacentHTML("afterbegin", newHtml);
		},
		clearLists: function(list) {
			while (list.hasChildNodes()) {
				list.removeChild(list.firstChild);
			}
		},
		getInput: function() {
			return {
				foodInput: document.querySelector(DOMStrings.foodAmountInput).value,
				simInput: document.querySelector(DOMStrings.simScaleInput).value
			};
		},
		displayResults: function(resultObject) {
			var Html, newHtml;

			Html =
				'<div class="output"><div class="output__text"><p style="margin-bottom:20px">Simulation ran for <strong>%simNumber%</strong> times.</p><p style="margin-bottom:20px">At <strong>%simIndex%.</strong> try, found the best menu.</p><p style="margin-bottom:5px;"><strong>Maximum SP Gain:</strong>  %spGain%</p><p style="margin-bottom:5px;"><strong>Multiplier:</strong>  %multiplier%</p><p><strong>Menu:</strong>   %menu%</p></div></div>';

			newHtml = Html.replace("%simNumber%", this.getInput().simInput);
			if (resultObject.foundAt === 0) {
				newHtml = newHtml.replace("%simIndex%", "1");
			} else {
				newHtml = newHtml.replace("%simIndex%", resultObject.foundAt);
			}

			newHtml = newHtml.replace("%spGain%", resultObject.spAmount);
			newHtml = newHtml.replace("%multiplier%", resultObject.multiplier);
			newHtml = newHtml.replace("%menu%", JSON.stringify(resultObject.resultMenu));

			document.querySelector(DOMStrings.rightContainer).insertAdjacentHTML("afterbegin", newHtml);
        },
        setPercentage: function(percentage) {
            var progressBar = document.querySelector(DOMStrings.progressBar);
            progressBar.style.width = percentage + '%';
            progressBar.textContent = percentage + '%';

        }
	};
})();

var menuController = (function() {
	var activeMenu = [];

	return {
		addActive: function(foodObj) {
			//add to active menu
			activeMenu.push(foodObj);
		},
		removeActive: function(foodObj) {
			activeMenu.forEach(function(ele, i) {
				if (foodObj.id === ele.id) {
					activeMenu.splice(i, 1);
				}
			});
		},
		showActive: function() {
			return activeMenu;
		}
	};
})();

function testMenu(activeMenuArray, rollNumber, foodCount) {
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

	//console.log("usedFoods check " + activeMenuArray);

    var progressBar = document.getElementById("inner__bar");
    var progressPercent = 0;
    var progressPercentOld= 0;

	for (var i = 0; i <= rollNumber; i++) {
		for (var q = 0; q < foodCount; q++) {
			randomizer = Math.floor(Math.random() * activeMenuArray.length);
			menu.push(activeMenuArray[randomizer]);
		}
		var result = calculateSP(menu);

		if (result.SP > bestSP) {
			bestSP = result.SP;
			bestMenuNames = result.foodList;
			bestIndex = i;
			bestMultiplier = result.multiplier;
		}

        progressPercent = Math.floor(i/rollNumber * 100);

        if (progressPercent !== progressPercentOld) {
            progressPercentOld = progressPercent;
            //update UI
            setTimeout(function() {
                progressBar.style.width = progressPercent + '%';
                progressBar.innerText = progressPercent * 1 + '%';

            },0)
        }
		menu = [];
	}

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
	//console.log(finalResult);
	//console.log(bestSP + " found at " + bestIndex + ". try.");
	return {
		resultMenu: finalResult,
		spAmount: bestSP,
		foundAt: bestIndex,
		multiplier: bestMultiplier
	};
}

function getFoodFromID(id) {
	function findCategory() {
		var firstNumber;

		if (id >= 10) {
			firstNumber = id.toString()[0];
		} else {
			firstNumber = 0;
		}
        firstNumber = parseInt(firstNumber);		
        
		if (firstNumber === 0) {
			return foods.campfire;
		} else if (firstNumber === 1) {
			return foods.bakery;
		} else if (firstNumber === 2) {
			return foods.kitchen;
		} else if (firstNumber === 3) {
			return foods.cast_stove;
		} else if (firstNumber === 4) {
			return foods.stove;
		}
	}
	var selectedFood, realID;
	//removes category id from start
	if (id >= 10) {
		realID = id.toString().slice(1);
		//convert to integer
		realID = parseInt(realID);
	} else {
		realID = id;
	}
	//select the corresponding food from the foods
	selectedFood = findCategory(id)[realID];
	console.log("This food selected: " + selectedFood);

	//returns food object
	return selectedFood;
}

var controller = (function(UICtrl, menuCtrl) {
	var DOM;

	DOM = UICtrl.getDOMStrings();

	var setupEventListeners = function() {
		//after pressing add to menu
		document.querySelector(DOM.availableFoods).addEventListener("click", addFoodtoActive);

		//after pressing remove from menu
		document.querySelector(DOM.selectedFoods).addEventListener("click", deleteFoodfromActive);

		//after pressing calculate
        document.querySelector(DOM.calculateButton).addEventListener("click", startSim);
        
        document.querySelector(DOM.calculateAsyncButton).addEventListener("click", startAsyncSim);

        document.querySelector(DOM.calculateWorkerButton).addEventListener("click", startWorkerSim);


	};

	var addFoodtoActive = function(event) {
		var itemID, selectedFood;
		//get UI input
		itemID = event.target.parentNode.parentNode.parentNode.id;
		if (parseInt(itemID)) {
			//find the food
			selectedFood = getFoodFromID(itemID);
			//add to selected food in UICtrl and remove from available foods
			UICtrl.addToSelected(selectedFood);
			//update active menu in menuCtrl
			menuCtrl.addActive(selectedFood);
		}
	};

	var deleteFoodfromActive = function(event) {
		var itemID, selectedFood;
		//get UI input for which one pressed
		itemID = event.target.parentNode.parentNode.parentNode.id;

		if (parseInt(itemID)) {
			selectedFood = getFoodFromID(itemID);
			console.log(selectedFood.name + "selected");
			//remove from selected food and add to available food
			UICtrl.removeFromSelected(selectedFood);
			//update active menu in menuCtrl
			menuCtrl.removeActive(selectedFood);
		}
	};
	//eslint-disable-next-line no-unused-vars
	var startSim = function() {
		//get menu and sim input from UI
		var activeMenu = menuCtrl.showActive();
		var input = UICtrl.getInput();
		console.log(input);
		var inputFood = input.foodInput;
		var inputSim = input.simInput;

		console.log("Sim started");

		//display the result in UI
		var result = testMenu(activeMenu, inputSim, inputFood);
		console.log(`Result is: ${result}`);

		//clear right container
		var outputList = document.querySelector(DOM.rightContainer);

		UICtrl.clearLists(outputList);
		UICtrl.displayResults(result);
	};

	//eslint-disable-next-line no-unused-vars
	async function startAsyncSim() {
		try {
            console.log("Starting async");
            var activeMenu = menuCtrl.showActive();
            var input = UICtrl.getInput(); 
            var inputFood = input.foodInput;
            var inputSim = input.simInput;
            var outputList = document.querySelector(DOM.rightContainer);
            var result = await testMenuAsync(activeMenu,inputSim,inputFood)   
            console.log(`Result is: ${result}`);
            
            UICtrl.clearLists(outputList);    
            UICtrl.displayResults(result);         
            
        }catch(err) {
            alert(err);
        }
        return;
    }
    
    function startWorkerSim() {

        console.log('Starting worker.')

        var activeMenu = menuCtrl.showActive();
        var input = UICtrl.getInput();
        var inputFood = input.foodInput;
        var inputSim = input.simInput;
        
        var work = new Worker('testMenuWorker.js');

        work.postMessage([activeMenu,inputSim,inputFood])

        work.onmessage = function(result) {
            if (typeof result.data === 'number') {
                UICtrl.setPercentage(result.data)
            } else {
                console.log(result);                
                var outputList = document.querySelector(DOM.rightContainer);
        
                UICtrl.clearLists(outputList);        
                UICtrl.displayResults(result.data);
                work.terminate();
            }           
        }
    }
	return {
		init: function() {
			setupEventListeners();
			UICtrl.initUI();
			console.log("Application has started.");
		}
	};
})(UIController, menuController);

controller.init();
