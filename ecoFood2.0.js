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
        leftContainer: ".left__container",
        calculateWorkerButton: ".withWorker",
        progressBar: "#inner__bar",
        highscoreContent: ".highscore__content",
        menuPaper: ".menu__paper",
        stopButton: ".stop__button",
        bottom: ".bottom",
        infoButton: ".info__button",
        infoContainer: ".info__container",
        addAll: ".add__all",
        removeAll: ".remove__all",
        sortBar: ".sort__options"
	};

	return {
		initUI: function(option = "available") {
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

            if (option === "available") {
                newArray.forEach(function(foodObj) {
                    UIController.addToAvailable(foodObj);
                });
            } else if (option === "selected") {
                newArray.forEach(function(foodObj) {
                    UIController.addToSelected(foodObj);
                })
            }
        },

        getAvailableList: function () {
            var nodeList = document.querySelectorAll(".available__food__list");
            var availableList = [];
            nodeList[0].childNodes.forEach(function(node) {
                availableList.push(getFoodFromID(node.id));
            })
            
            return availableList;
        },

        sortAvailable: function(property) {
            var availableList = this.getAvailableList();
    
            availableList.sort(function (a,b) {
                var nameA, nameB;

                if (property === ("name" || "type")) {

                    nameA = a[property].toUpperCase();
                    nameB = b[property].toUpperCase();
                } else {
                    nameA = b[property];
                    nameB = a[property];
                }
                if (nameA < nameB) {
                    return 1;
                  }
                  if (nameA > nameB) {
                    return -1;
                  }
                
                    //names must be equal
                  return 0;
            });
            var self = this;
            this.clearLists(document.querySelector(DOMStrings.availableFoods));
            availableList.forEach(function(food) {
                self.addToAvailable(food);
            })
        },

        infoClicked: function() {
            var bottom, infoButton;

            bottom = document.querySelector(DOMStrings.bottom);
            bottom.classList.toggle("hide__bottom");

            infoButton = document.querySelector(DOMStrings.infoButton);
            infoButton.classList.toggle("clicked");

            infoContainer = document.querySelector(DOMStrings.infoContainer)
            //if opening info
            if (bottom.classList.contains("hide__bottom")) {
                setTimeout(function() {
                    infoContainer.classList.toggle("visible");
                },500);
            } else {
                infoContainer.classList.toggle("visible");
            }

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
            '<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span style="font-size: 12px;">Tier: %foodtier%</span></i></div><img class="available__img" src="./resources/img/%imgid%.png"><div class="item__delete"><i class="ion-ios-close-outline item__delete--btn"></i></div><div class="food__info"><div class="food__info__title"><img class="info__img" src="./resources/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>';

                
			newHtml = htmlTemplate.replace("%id%", foodObj.id);
            newHtml = newHtml.replace("%foodname%", foodObj.name);
            newHtml = newHtml.replace("%imgid%", foodObj.id);
            newHtml = newHtml.replace("%foodtier%", foodObj.tier);
            newHtml = newHtml.replace("%infoimgid%", foodObj.id);
            newHtml = newHtml.replace("%name%", foodObj.name);
            newHtml = newHtml.replace("%weight%", foodObj.weight);
            newHtml = newHtml.replace("%carb%", foodObj.carb);
            newHtml = newHtml.replace("%protein%", foodObj.pro);
            newHtml = newHtml.replace("%fat%", foodObj.fat);
            newHtml = newHtml.replace("%vit%", foodObj.vit);
            newHtml = newHtml.replace("%calorie%", foodObj.cal);
            newHtml = newHtml.replace("%foodtype%", foodObj.type);

            

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
				'<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span style="font-size: 12px;">Tier: %foodtier%</span></i></div><img class="available__img" src="./resources/img/%imgid%.png"><div class="item__add"><i class="ion-android-add item__add--btn"></i></div><div class="food__info"><div class="food__info__title"><img class="info__img" src="./resources/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>';

			newHtml = htmlTemplate.replace("%id%", foodObj.id);
			newHtml = newHtml.replace("%foodname%", foodObj.name);
			newHtml = newHtml.replace("%imgid%", foodObj.id);
            newHtml = newHtml.replace("%foodtier%", foodObj.tier);
            newHtml = newHtml.replace("%infoimgid%", foodObj.id);
            newHtml = newHtml.replace("%name%", foodObj.name);
            newHtml = newHtml.replace("%weight%", foodObj.weight);
            newHtml = newHtml.replace("%carb%", foodObj.carb);
            newHtml = newHtml.replace("%protein%", foodObj.pro);
            newHtml = newHtml.replace("%fat%", foodObj.fat);
            newHtml = newHtml.replace("%vit%", foodObj.vit);
            newHtml = newHtml.replace("%calorie%", foodObj.cal);
            newHtml = newHtml.replace("%foodtype%", foodObj.type);

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
            var paperHtml, menuContent, line, menuObject, foundAt;
            paperHtml = '<h1>Menu</h1><div class="horizontal__line"></div><div class="menu__content"></div><div class="horizontal__line"></div><div class="menu__result"><p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p></div>';

            if(resultObject.foundAt === 0) {
                foundAt = 1
            } else {
                foundAt = resultObject.foundAt;
            }
            var paperHtmlEdited = paperHtml.
            replace('%sp%', resultObject.spAmount.toFixed(2)).
            replace('%multiplier%', resultObject.multiplier.toFixed(2)).
            replace('%index%', foundAt).
            replace('%simcount%', this.getInput().simInput);

            document.querySelector(DOMStrings.menuPaper).innerHTML = paperHtmlEdited;
            menuContent = document.querySelector(".menu__content");
            
            menuObject = resultObject.resultMenu;
            
            for(foodname in menuObject) {
                if({}.hasOwnProperty.call(menuObject, foodname)){
                    line = `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML('afterbegin', line);

                }
            }
            
            setTimeout(function() {
                document.querySelector('.menu__paper').classList.add('menu__visible')
            }, 0);
        },

        setPercentage: function(percentage) {
            var progressBar = document.querySelector(DOMStrings.progressBar);
            progressBar.style.width = percentage + '%';
            progressBar.textContent = percentage + '%';

        },

        displayHighscore: function(result) {
            var Html, newHtml, highscoreContent,line,menuObject;

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html = '<p>%message%</p><br><h2>Best in category: %foodqty%</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>'

            menuObject = result.currentHighscore[0].menu;
            line= "";
            for(foodname in menuObject) {
                if({}.hasOwnProperty.call(menuObject, foodname)){
                    line += `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                }
            }

            newHtml = Html.replace("%message%", result.message);
            newHtml = newHtml.replace("%menu%", line);
            newHtml = newHtml.replace("%SP%", result.currentHighscore[0].sp);
            newHtml = newHtml.replace("%foodqty%", result.currentHighscore[0].foodQty);

            highscoreContent.innerHTML = newHtml;
        },

        displayHighest: function(result) {
            var Html, newHtml, highscoreContent,line;

            menuObject = result.menu;
            line= "";
            for(foodname in menuObject) {
                if({}.hasOwnProperty.call(menuObject, foodname)){
                    line += `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                }
            }

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html = '<p>This app, stores the best SP combinations and categorize them by food number.</p><br><h2>Highest SP across all categories so far:</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>'

            newHtml = Html.replace("%menu%", line);
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
		},
        clearActive: function() {
            activeMenu = [];
        },
        addActiveAll: function () {
            activeMenu = [];
            for(foodType in foods) {
                for(id in foods[foodType]) {
                    activeMenu.push(foods[foodType][id])
                }
            }
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
        
        //infobutton
        document.querySelector(DOM.infoButton).addEventListener("click", infoClicked);

        //add all button
        document.querySelector(DOM.addAll).addEventListener("click", function () { 
            addAll("selected") 
        });

        //remove all button
        document.querySelector(DOM.removeAll).addEventListener("click", removeAll);

        //sort button
        document.querySelector(DOM.sortBar).addEventListener("click", sortClicked)
        
        /*
         *food images opens info
         * USED CSS TO ACHIEVE SAME 
         * 
         * document.querySelector(DOM.availableFoods).addEventListener("mouseover", function(event) {
         * if (event.target.localName === "img") {
         * event.path[1].childNodes[3].style.display = "block"
         * console.log(event.fromElement.childNodes[3]);
         * event.target.onpointerleave = function () {
         * event.path[1].childNodes[3].style.display = "none"
         * }
         * }
         * });
         */

        /*
         *var foodImgs= document.querySelectorAll(".available__img");
         * foodImgs.forEach(function(elements) {
         *     elements.addEventListener("mouseover", function(event) {
         *         event.path[1].childNodes[3].style.display = "block"
         *        // console.log(event.fromElement.childNodes[3]);
         *     });
         *     elements.addEventListener("mouseleave", function(event) {
         *         //console.log(event);
         *         event.path[1].childNodes[3].style.display = "none"
         *     });
         * })
         */
        
	};

    function removeAll() {
        
        addAll("available");
        var lies = document.querySelectorAll(".sort__options")[0].firstElementChild.childNodes;
        lies.forEach(function(node) {
            if (node.classList && node.classList.contains("active")) {
                console.log(node.textContent)
                var sortName = node.textContent.toLowerCase();
                if (sortName === "protein") {
                    sortName = "pro";
                } else if (sortName === "vitamin") {
                    sortName = "vit";
                }

                UICtrl.sortAvailable(sortName);
            }
        });
        
    }

    function sortClicked(event) {
        if (event.target.classList && event.target.classList.contains("active")) {
            return;
        }
        //remove active
        var lies = document.querySelectorAll(".sort__options")[0].firstElementChild.childNodes;
        lies.forEach(function(node) {
            if (node.classList && node.classList.contains("active")) {
                node.classList.remove("active");
            }
        });

        event.target.classList.add("active");
        var sortName = event.target.textContent.toLowerCase();
        if (sortName === "protein") {
            sortName = "pro";
        } else if (sortName === "vitamin") {
            sortName = "vit";
        }

        UICtrl.sortAvailable(sortName);
    }

    function addAll(option) {
        if (option === "selected") {
            menuCtrl.addActiveAll();
            UICtrl.initUI("selected");
        } else if (option === "available"){
            menuCtrl.clearActive();
            UICtrl.initUI("available");
        }
    }

    function infoClicked() {
        UICtrl.infoClicked();
    }

	function addFoodtoActive(event) {
		var itemID, selectedFood;
        //get UI input

        itemID = event.target.parentNode.parentNode.id;
		if (parseInt(itemID)) {
			//find the food
			selectedFood = getFoodFromID(itemID);
			//add to selected food in UICtrl and remove from available foods
			UICtrl.addToSelected(selectedFood);
			//update active menu in menuCtrl
			menuCtrl.addActive(selectedFood);
		}
	}

	function deleteFoodfromActive(event) {
		var itemID, selectedFood;
        //get UI input for which one pressed
        
        itemID = event.target.parentNode.parentNode.id;
		if (parseInt(itemID)) {
			selectedFood = getFoodFromID(itemID);
			//remove from selected food and add to available food
			UICtrl.removeFromSelected(selectedFood);
			//update active menu in menuCtrl
			menuCtrl.removeActive(selectedFood);
		}
	}

    function startWorkerSim() {
        //disable calculate button
        document.querySelector(DOM.calculateButton).removeEventListener("click", startWorkerSim);
        

        


        var activeMenu = menuCtrl.showActive();
        var input = UICtrl.getInput();
        var inputFood = input.foodInput;
        var inputSim = input.simInput;
        
        if(inputFood === "" || inputSim === "") {
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
            swal("Don't leave input fields blank.", "", "error");
            
            return;
        } else if (activeMenu.length === 0) {
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
            swal("No food selected.", "" , "error");

            return;
        }

        //swipe left container to left
        document.querySelector(DOM.leftContainer).style.marginLeft = "5%";
        document.querySelector(DOM.menuPaper).style.webkitFilter = "blur(4px)";
        
        var menuPaper;
        menuPaper = document.querySelector(DOM.menuPaper)
        if(menuPaper) {
            menuPaper.style.tranform ='translateX(0);';
        }

        console.log('Starting worker.') 

        var work = new Worker('testMenuWorker.js');

        work.postMessage([activeMenu,inputSim,inputFood])

        //enable stop button
        var stopBtn = document.querySelector(DOM.stopButton);
        stopBtn.classList.add("visible");
        stopBtn.addEventListener("click", terminateWorker);

        function terminateWorker () {
            work.terminate();
            //enable calculate button
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
            //disable stop button
            stopBtn.removeEventListener("click", terminateWorker);
            stopBtn.classList.remove("visible")
        }
 
        work.onmessage = function(result) {
            if (typeof result.data === 'number') {
                UICtrl.setPercentage(result.data)
            } else {
                var outputList = document.querySelector(DOM.rightContainer);
                
                
                setTimeout(function() {
                    //remove blur
                    document.querySelector(DOM.menuPaper).style.webkitFilter = "";      
                    UICtrl.displayResults(result.data);
                },500)

                sendPostRequest(result.data);

                terminateWorker();
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
            UICtrl.initUI();
			setupEventListeners();
            console.log("Application has started.");
            getHighestScore();
		}
	};
})(UIController, menuController);

controller.init();
