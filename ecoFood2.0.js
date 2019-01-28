/*eslint-disable no-tabs */
/*eslint-disable array-element-newline */
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
        highscoreContent: ".highscore__content"
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
				'<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span style="font-size: 12px;">Tier: %foodtier%</span></i></div><img src="./resources/img/%imgid%.png"><div class="item__delete"><i class="ion-ios-close-outline item__delete--btn"></i></div></div>';

			newHtml = htmlTemplate.replace("%id%", foodObj.id);
            newHtml = newHtml.replace("%foodname%", foodObj.name);
            newHtml = newHtml.replace("%imgid%", foodObj.id);
            newHtml = newHtml.replace("%foodtier%", foodObj.tier);

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
				'<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span style="font-size: 12px;">Tier: %foodtier%</span></i></div><img src="./resources/img/%imgid%.png"><div class="item__add"><i class="ion-android-add item__add--btn"></i></div></div>';

			newHtml = htmlTemplate.replace("%id%", foodObj.id);
			newHtml = newHtml.replace("%foodname%", foodObj.name);
			newHtml = newHtml.replace("%imgid%", foodObj.id);
			newHtml = newHtml.replace("%foodtier%", foodObj.tier);

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
            var paperHtml, menuContent, line, menuObject;
            console.log(resultObject)
            paperHtml = '<div class="menu__paper clearfix"><h1>Menu</h1><div class="horizontal__line"></div><div class="menu__content"></div><div class="horizontal__line"></div><div class="menu__result"><p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p></div></div>';

            var paperHtmlEdited = paperHtml.
            replace('%sp%', resultObject.spAmount.toFixed(2)).
            replace('%multiplier%', resultObject.multiplier.toFixed(2)).
            replace('%index%', resultObject.foundAt).
            replace('%simcount%', this.getInput().simInput);

            document.querySelector(DOMStrings.rightContainer).innerHTML = paperHtmlEdited;
            menuContent = document.querySelector(".menu__content");
            
            menuObject = resultObject.resultMenu;
            
            for(foodname in menuObject) {
                if({}.hasOwnProperty.call(menuObject, foodname)){
                    line = `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML('afterbegin', line);

                }
            }





			// Html =
			// 	'<div class="output"><div class="output__text"><p style="margin-bottom:20px">Simulation ran for <strong>%simNumber%</strong> times.</p><p style="margin-bottom:20px">At <strong>%simIndex%.</strong> try, found the best menu.</p><p style="margin-bottom:5px;"><strong>Maximum SP Gain:</strong>  %spGain%</p><p style="margin-bottom:5px;"><strong>Multiplier:</strong>  %multiplier%</p><p><strong>Menu:</strong>   %menu%</p></div></div>';

			// newHtml = Html.replace("%simNumber%", this.getInput().simInput);
			// if (resultObject.foundAt === 0) {
			// 	newHtml = newHtml.replace("%simIndex%", "1");
			// } else {
			// 	newHtml = newHtml.replace("%simIndex%", resultObject.foundAt);
			// }

			// newHtml = newHtml.replace("%spGain%", resultObject.spAmount);
			// newHtml = newHtml.replace("%multiplier%", resultObject.multiplier);
			// newHtml = newHtml.replace("%menu%", JSON.stringify(resultObject.resultMenu));

			// document.querySelector(DOMStrings.rightContainer).insertAdjacentHTML("afterbegin", newHtml);
        },
        setPercentage: function(percentage) {
            var progressBar = document.querySelector(DOMStrings.progressBar);
            progressBar.style.width = percentage + '%';
            progressBar.textContent = percentage + '%';

        },
        displayHighscore: function(result) {
            var Html, newHtml, highscoreContent;

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html = '<p>%message%</p><br><h2>Best in category: %foodqty%</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>'

            newHtml = Html.replace("%message%", result.message);
            newHtml = newHtml.replace("%menu%", JSON.stringify(result.currentHighscore[0].menu));
            newHtml = newHtml.replace("%SP%", result.currentHighscore[0].sp);
            newHtml = newHtml.replace("%foodqty%", result.currentHighscore[0].foodQty);

            highscoreContent.innerHTML = newHtml;
        },

        displayHighest: function(result) {

            var Html, newHtml, highscoreContent;

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html = '<p>This app stores the best SP combinations and categorize them by food number.</p><br><h2>Highest SP across all categories so far:</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>'

            newHtml = Html.replace("%menu%", JSON.stringify(result.menu));
            newHtml = newHtml.replace("%SP%", result.sp);

            highscoreContent.innerHTML = newHtml;
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


function getFoodFromID(id) {
	function findCategory() {
		var firstNumber;

        firstNumber = id.toString()[0];
        firstNumber = parseInt(firstNumber);		
        
		if (firstNumber === 1) {
			return foods.campfire;
		} else if (firstNumber === 2) {
			return foods.bakery;
		} else if (firstNumber === 3) {
			return foods.kitchen;
		} else if (firstNumber === 4) {
			return foods.cast_stove;
		} else if (firstNumber === 5) {
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
        document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
        
        //document.querySelector(DOM.calculateAsyncButton).addEventListener("click", startAsyncSim);

        //document.querySelector(DOM.calculateWorkerButton).addEventListener("click", startWorkerSim);


	};

	var addFoodtoActive = function(event) {
		var itemID, selectedFood;
        //get UI input
        console.log(event);

        itemID = event.target.parentNode.parentNode.id;
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
        
        itemID = event.target.parentNode.parentNode.id;

		if (parseInt(itemID)) {
			selectedFood = getFoodFromID(itemID);
			console.log(selectedFood.name + "selected");
			//remove from selected food and add to available food
			UICtrl.removeFromSelected(selectedFood);
			//update active menu in menuCtrl
			menuCtrl.removeActive(selectedFood);
		}
	};

    function startWorkerSim() {

        console.log('Starting worker.')
        var activeMenu = menuCtrl.showActive();
        var input = UICtrl.getInput();
        var inputFood = input.foodInput;
        var inputSim = input.simInput;
        
        if(inputFood === "" || inputSim === "") {
            
            alert("Don't leave input fields blank.");
            
            return;
        } else if (activeMenu.length === 0) {

            alert("No food selected.");

            return;
        }

         //disable calculate button
         document.querySelector(DOM.calculateButton).removeEventListener("click", startWorkerSim);

        var work = new Worker('testMenuWorker.js');

        work.postMessage([activeMenu,inputSim,inputFood])

       
        work.onmessage = function(result) {
            if (typeof result.data === 'number') {
                UICtrl.setPercentage(result.data)
            } else {
                //console.log(result);                
                var outputList = document.querySelector(DOM.rightContainer);
                
                
                UICtrl.clearLists(outputList);        
                UICtrl.displayResults(result.data);
                work.terminate();

                sendPostRequest(result.data);

                //enable calculate button
                document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
                
            }          
        }


    }

    function sendPostRequest(message) {
        fetch("https://mongoawsserver.tk:8000/highscore", {
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(message)
        }).
        then((res) => res.json()).
        then((json) => {
            console.log("Request complete! response:", json);
            UICtrl.displayHighscore(json);
            
            return json;
        });
    }

    function getHighestScore() {
        fetch("https://mongoawsserver.tk:8000/gethighest", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then((res) => res.json()).
        then((json) => {
            console.log("Highest score get:" + json.sp);
            UICtrl.displayHighest(json);
        })
        
    }
	
return {
		init: function() {
			setupEventListeners();
			UICtrl.initUI();
            console.log("Application has started.");
            getHighestScore();
		}
	};
})(UIController, menuController);

controller.init();
