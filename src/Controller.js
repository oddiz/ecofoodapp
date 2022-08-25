var HIGHSCORE_ENABLED = false;
module.exports = function (UICtrl, MenuCtrl, FoodListCtrl, getFoodFromID) {
    var DOMStrings = require("./domStrings");
    var setupEventListeners = function () {
        //after pressing add to menu

        document.querySelector(DOMStrings.availableFoods).addEventListener("click", availableFoodListener);

        //after pressing remove from menu
        document.querySelector(DOMStrings.selectedFoods).addEventListener("click", deleteFoodfromActive);

        //after pressing calculate
        document.querySelector(DOMStrings.calculateButton).addEventListener("click", startWorkerSim);

        //infobutton
        document.querySelector(DOMStrings.infoButton).addEventListener("click", infoClicked);

        /*
         *add all button
         *document.querySelector(DOMStrings.addAll).addEventListener("click", function () {
         *    addAll("selected")
         *});
         */

        //remove all button
        document.querySelector(DOMStrings.removeAll).addEventListener("click", removeAll);

        //quick add section
        document.querySelector(DOMStrings.quickAdd).addEventListener("click", quickAdd);
        //sort button
        document.querySelector(DOMStrings.sortBar).addEventListener("click", sortClicked);

        //highscore button
        document.querySelector(DOMStrings.highscoreButton).addEventListener("click", UICtrl.highscoresShowHide);

        //best highscore button
        document.querySelector(DOMStrings.highscoreBestButton).addEventListener("click", UICtrl.bestButtonClicked);

        //stomach button
        document.querySelector(DOMStrings.stomachButton).addEventListener("click", UICtrl.stomachShowHide);

        //stomach container event listener
        document.querySelector(DOMStrings.stomachContainer).addEventListener("click", stomachContainerListener);

        //input formatting

        new Cleave(".simulation__scale__input", {
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
        });
        new Cleave(".food__amount__input", {
            numeral: true,
            numeralThousandsGroupStyle: "thousand",
        });

        //price keypress event listener
        document.addEventListener("keyup", UICtrl.savePrices);

        //search box event listener
        document.querySelector(DOMStrings.searchInput).addEventListener("input", UICtrl.searchAvailable);

        //filter by food type (campfire, kitchen, etc) event listener
        document.querySelector(DOMStrings.foodTypeContainer).addEventListener("click", filterController);
    };

    function filterController(event) {
        if (event.target.classList.contains("circle__button")) {
            event.target.classList.toggle("active");
        }

        UICtrl.filterByFoodType();
        var selectedSort = UICtrl.getSortSelection();
        if (selectedSort === "protein") {
            selectedSort = "pro";
        } else if (selectedSort === "vitamin") {
            selectedSort = "vit";
        }
        UICtrl.sortAvailable(selectedSort);
    }

    function quickAdd(event) {
        var clickedOn, clickedOnTier;
        if (event.target.classList == "ion-chevron-right") {
            clickedOn = event.target.parentNode.parentNode.classList;
        } else {
            clickedOn = event.target.classList;
        }

        switch (clickedOn[0]) {
            case "t1__add":
                clickedOnTier = 1;
                break;
            case "t2__add":
                clickedOnTier = 2;
                break;
            case "t3__add":
                clickedOnTier = 3;
                break;
            case "t4__add":
                clickedOnTier = 4;
                break;
            case "add__all":
                clickedOnTier = "all";
                break;
            default:
                clickedOnTier = -1;
                break;
        }

        if (clickedOnTier === "all") {
            addAll("selected");
        } else {
            addAllTier(clickedOnTier);
        }
    }

    function removeAll() {
        addAll("available");
        var lies = document.querySelectorAll(".sort__options")[0].firstElementChild.childNodes;
        lies.forEach(function (node) {
            if (node.classList && node.classList.contains("active")) {
                var sortName = node.textContent.toLowerCase();
                if (sortName === "protein") {
                    sortName = "pro";
                } else if (sortName === "vitamin") {
                    sortName = "vit";
                }

                UICtrl.sortAvailable(sortName);
            }
        });

        UICtrl.searchAvailable();
    }

    function sortClicked(event) {
        if (event.target.classList && event.target.classList.contains("active")) {
            var selectedSort = UICtrl.getSortSelection();
            if (selectedSort === "protein") {
                selectedSort = "pro";
            } else if (selectedSort === "vitamin") {
                selectedSort = "vit";
            }
            UICtrl.sortAvailable(selectedSort);

            return;
        }

        //remove active
        var lies = document.querySelectorAll(".sort__options")[0].firstElementChild.childNodes;
        lies.forEach(function (node) {
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
            MenuCtrl.addActiveAll();
            UICtrl.initUI("selected");
        } else if (option === "available") {
            MenuCtrl.clearActive();
            UICtrl.initUI("available");
        }
    }

    function addAllTier(tier) {
        var availList = UICtrl.getAvailableList();

        availList.forEach(function (ele) {
            if (ele.tier === tier) {
                MenuCtrl.addActive(ele);
                UIController.addToSelected(ele);
            }
        });
    }

    function infoClicked() {
        UICtrl.infoClicked();
    }

    function addToSelected(itemID) {
        if (Array.isArray(itemID)) {
            itemID.forEach(function (item) {
                addToSelected(item);
            });

            return;
        }
        let itemId = itemID;

        if (typeof itemID === "string") {
            itemId = parseInt(itemID);
        }

        const selectedFood = getFoodFromID(itemId);

        UICtrl.addToSelected(selectedFood);

        MenuCtrl.addActive(selectedFood);
    }

    function availableFoodListener(event) {
        var itemID, selectedFood;
        //get UI input

        //if add button is clicked
        if (event.target.className.includes("item__add--btn")) {
            itemID = event.target.parentNode.id;
            addToSelected(itemID);
        }

        //if stomach button is clicked
        if (event.target.className.includes("stomach__add--icon")) {
            itemID = event.target.parentNode.parentNode.id;

            if (parseInt(itemID)) {
                selectedFood = getFoodFromID(itemID);

                if (!UICtrl.checkStomachForDuplicates(selectedFood)) {
                    UICtrl.addToStomach(selectedFood);

                    //point to input text of last added
                    document
                        .querySelector(DOMStrings.stomachListContainer)
                        .lastChild.childNodes[1].addEventListener("input", UICtrl.stomachApplyButton);
                }
            }
        }
    }

    function deleteFoodfromActive(event) {
        var itemID, selectedFood;
        //get UI input for which one pressed
        if (event.target.className.includes("item__delete--btn")) {
            //console.log(event);
        }
        itemID = event.target.parentNode.id;
        if (parseInt(itemID)) {
            selectedFood = getFoodFromID(itemID);
            //remove from selected food and add to available food
            UICtrl.removeFromSelected(selectedFood);
            //update active menu in menuCtrl
            MenuCtrl.removeActive(selectedFood);

            //refresh available foods if search is active
            UICtrl.searchAvailable();

            //sort list
            var selectedSort = UICtrl.getSortSelection();
            if (selectedSort === "protein") {
                selectedSort = "pro";
            } else if (selectedSort === "vitamin") {
                selectedSort = "vit";
            }
            UICtrl.sortAvailable(selectedSort);
        }
    }

    function stomachContainerListener(event) {
        if (event.target.className.includes("stomach__item__delete--btn")) {
            const selectedFoodId = event.target.parentElement.getAttribute("food-id");

            UICtrl.removeFromStomach(getFoodFromID(selectedFoodId));
        }

        if (event.target.className.includes("stomach__apply__button")) {
            applyStomachContent();
        }
    }

    function applyStomachContent() {
        MenuCtrl.storeStomachContent();
        UICtrl.stomachApplyButton("press");
    }

    let highCountAdvisorShown = false;

    function startWorkerSim() {
        //disable calculate button
        document.querySelector(DOMStrings.calculateButton).removeEventListener("click", startWorkerSim);

        //apply stomach content
        applyStomachContent();

        var activeMenu = MenuCtrl.showActive();
        var stomachContent = MenuCtrl.showStomachContent();
        var input = UICtrl.getInput();
        var inputFood = input.foodInput;
        var inputSim = input.simInput;

        if (inputFood === "" || isNaN(inputFood)) {
            document.querySelector(DOMStrings.calculateButton).addEventListener("click", startWorkerSim);
            showError("no_blank");

            return;
        } else if (activeMenu.length === 0) {
            document.querySelector(DOMStrings.calculateButton).addEventListener("click", startWorkerSim);
            showError("no_food");

            return;
        }
        var stopBtn = document.querySelector(DOMStrings.stopButton);

        console.log("Starting Worker.");
        var work = new Worker(new URL("./testMenuWorker.js", import.meta.url).href);

        if (inputSim === "" || inputSim == 0) {
            var iterationCount = Math.pow(inputFood + 1, activeMenu.length);

            if (iterationCount > 50000000 && highCountAdvisorShown === false) {
                Swal.fire({
                    title: "This might take a while",
                    html:
                        "The amount of iterations for this calculation is high (" +
                        iterationCount +
                        " menus to test). So it may take a long time to find the best.<br><br> However you can cancel the calculation any time if it's taking too long. <br><br> You can also consider setting a custom calculation scale and randomly test menus with current selections. Try starting with 1,000,000.",
                    input: "checkbox",
                    inputPlaceholder: "Don't show this again.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "rgba(40,185,181,1.00)",
                    confirmButtonText: "Calculate Anyway",
                }).then(function (result) {
                    if (result.value === 0 || result.value === 1) {
                        uiStartWorker();
                        //work.postMessage([activeMenu,inputSim,inputFood,inputBudget, inputCalorie, stomachContent, "definitive"])

                        work.postMessage({
                            origin: "ecoFood",
                            activeMenu: activeMenu,
                            simScale: inputSim,
                            foodInput: inputFood,
                            budgetInput: input.budgetInput,
                            calorieInput: input.calorieInput,
                            caloriePerDollarInput: input.caloriePerDollarInput,
                            maxSpInput: input.maxSpInput,
                            stomachContent: stomachContent,
                            simType: "definitive",
                        });
                        if (result.value === 1) {
                            //don't show this again ticked
                            highCountAdvisorShown = true;
                        }
                    } else {
                        terminateWorker();
                    }
                });
            } else {
                uiStartWorker();
                work.postMessage({
                    origin: "ecoFood",
                    activeMenu: activeMenu,
                    simScale: inputSim,
                    foodInput: inputFood,
                    budgetInput: input.budgetInput,
                    calorieInput: input.calorieInput,
                    caloriePerDollarInput: input.caloriePerDollarInput,
                    maxSpInput: input.maxSpInput,
                    stomachContent: stomachContent,
                    simType: "definitive",
                });
            }
        } else {
            uiStartWorker();
            work.postMessage({
                origin: "ecoFood",
                activeMenu: activeMenu,
                simScale: inputSim,
                foodInput: inputFood,
                budgetInput: input.budgetInput,
                calorieInput: input.calorieInput,
                caloriePerDollarInput: input.caloriePerDollarInput,
                maxSpInput: input.maxSpInput,
                stomachContent: stomachContent,
                simType: "random",
            });
        }

        function uiStartWorker() {
            //reset percentage
            UICtrl.setPercentage("0");

            //swipe list container to left
            var listsContainer = document.querySelector(DOMStrings.listsContainer);
            if (!listsContainer.classList.contains("menu__visible")) {
                listsContainer.classList.add("menu__visible");
            }

            document.querySelector(".spinner").classList.add("visible");

            var menuPaper = document.querySelector(DOMStrings.menuPaper);
            if (menuPaper) {
                //blur menu
                menuPaper.style.webkitFilter = "blur(4px)";

                menuPaper.style.tranform = "translateX(0);";
            }
            //enable stop button

            stopBtn.classList.add("visible");
            stopBtn.addEventListener("click", terminateWorker);
        }

        function terminateWorker() {
            console.log("Terminating Worker.");
            work.terminate();
            //enable calculate button
            document.querySelector(DOMStrings.calculateButton).addEventListener("click", startWorkerSim);
            //disable stop button
            stopBtn.removeEventListener("click", terminateWorker);
            stopBtn.classList.remove("visible");
            document.querySelector(".spinner").classList.remove("visible");
        }

        work.onmessage = function (message) {
            if (message.data.type === "progress_percent") {
                UICtrl.setPercentage(message.data.percentage);
            } else if (message.data.type === "not_found") {
                showError("not_found");
                document.querySelector(DOMStrings.menuPaper).style.webkitFilter = "blur(0)";
                terminateWorker();
            } else if (message.data.type === "menu_found") {
                setTimeout(function () {
                    //remove blur
                    document.querySelector(DOMStrings.menuPaper).style.webkitFilter = "";
                    UICtrl.displayResults(message.data.result);
                }, 500);
                if (HIGHSCORE_ENABLED) sendPostRequest(message.data.result);
                terminateWorker();
            } else if (message.data.type === "menu_update") {
                document.querySelector(DOMStrings.menuPaper).style.webkitFilter = "";
                UICtrl.updateResults(message.data.result);
            }

            /*
            if (typeof message.data === 'number') {
                UICtrl.setPercentage(message.data)
            } else if (message.data === 'error') {
                showError("not_found")
                document.querySelector(DOMStrings.menuPaper).style.webkitFilter = "blur(0)"
                terminateWorker();

            } else {
                //var outputList = document.querySelector(DOMStrings.rightContainer);
                
                
                setTimeout(function() {
                    //remove blur
                    document.querySelector(DOMStrings.menuPaper).style.webkitFilter = "";      
                    UICtrl.displayResults(message.data);
                },500)

                sendPostRequest(message.data);
                //console.log(result.data)
                terminateWorker();
            }
            */
        };
    }

    function showError(type) {
        switch (type) {
            default:
                console.log("no error type found");
                break;
            case "not_found":
                Swal.fire("No diets found with specified limits.", "", "error");
                break;
            case "no_blank":
                Swal.fire("Don't leave menu size field blank.", "", "error");
                break;
            case "no_food":
                Swal.fire("No food selected.", "", "error");
                break;
        }
    }

    function sendPostRequest(message) {
        if (!HIGHSCORE_ENABLED) return;
        fetch("http://api.kaansarkaya.com:8000/highscore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        })
            .then((res) => res.json())
            .then((json) => {
                //console.log("Request complete! response:", json);
                UICtrl.displayHighscore(json);

                return json;
            });
    }

    function getHighestScore() {
        //console.log(isShowingHighestScore);
        if (!HIGHSCORE_ENABLED) return;
        fetch("http://api.kaansarkaya.com:8000/gethighest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("Highest score get:" + json.sp);
                UICtrl.displayHighest(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return {
        init: function () {
            FoodListCtrl.init();
            MenuCtrl.init();
            UICtrl.initUI();

            const activeMenu = JSON.parse(window.localStorage.getItem("activeMenu"));

            if (activeMenu) {
                activeMenu.forEach(function (item) {
                    addToSelected(item.id);
                });
            }
            setupEventListeners();
            console.log("Application has started.");

            getHighestScore();
        },
        showHighestScore: function () {
            if (!HIGHSCORE_ENABLED) return;
            getHighestScore();
        },
        getControllers: function () {
            return {
                UIController: UICtrl,
                MenuController: MenuCtrl,
                FoodListController: FoodListCtrl,
            }
        },
        getFoodFromID: getFoodFromID
    };
};
