/*jshint esversion: 6 */

var getFoodFromID = require('./helpers').getFoodFromID;
var FoodListController = require('./FoodListController');
var Cleave = require('../public/vendor/js/cleave');
var indexCSS = require("./style.css")

var UIController = (function () {
    var DOMStrings = {
        foodAddBtn: ".item__add",
        foodDeleteBtn: ".item__delete",
        availableFoods: ".available__food__list",
        itemAddButton: ".item__add--btn",
        selectedFoods: ".selected__food__list",
        calculateButton: ".calculate__btn",
        calculateAsyncButton: ".withAsync",
        foodAmountInput: ".food__amount__input",
        simScaleInput: ".simulation__scale__input",
        budgetInput: ".budget__amount__input",
        calorieInput: ".calorie__amount__input",
        caloriePerDollarInput: ".calorieperdollar__amount__input",
        maxSpInput: ".maxSP__amount__input",
        output: ".output",
        listsContainer: ".lists__container",
        calculateWorkerButton: ".withWorker",
        progressBar: "#inner__bar",
        highscoreContent: ".highscore__content",
        menuPaper: ".menu__paper",
        stopButton: ".stop__button",
        content: ".content",
        infoButton: ".info__button",
        infoContainer: ".info__container",
        addAll: ".add__all",
        removeAll: ".remove__all",
        sortBar: ".sort__options",
        quickAdd: ".quick__add",
        priceTagInput: ".item__price__input",
        highscoreTitle: ".highscore__title",
        highscoreButton: ".highscore__button",
        highscoreContainer: ".highscore__container",
        stomachContainer: ".stomach__container",
        stomachListContainer: ".stomach__list__container",
        stomachButton: ".stomach__button",
        stomachApplyButton: ".stomach__apply__button__flipper",
        addToStomachButton: ".stomach__add",
        highscoreBestButton: ".best__button",
        searchInput: ".search_bar_input",
        foodTypeContainer: ".foodtype__container"

    };

    var lastResult;
    var highestResult;
    var isShowingHighest;
    var isStomachMenuOpen = false;

    return {
        formatInputToNumber: function () {
            this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        },

        initUI: function (option) {

            if (!option) {
                option = "available";
            }

            //clear lists
            var availableList = document.querySelector(DOMStrings.availableFoods);
            var selectedList = document.querySelector(DOMStrings.selectedFoods);

            this.clearLists(availableList);
            this.clearLists(selectedList);

            //adds all foods to active menu
            var allFoodsArray;
            allFoodsArray = menuController.getAllFoods();

            if (option === "available") {
                allFoodsArray.forEach(function (foodObj) {
                    UIController.addToAvailable(foodObj);
                });
            } else if (option === "selected") {
                allFoodsArray.forEach(function (foodObj) {
                    UIController.addToSelected(foodObj);
                });
            }

            UIController.sortAvailable("tier");
        },

        getAvailableList: function () {
            var nodeList = document.querySelectorAll(".available__food__list");
            var availableList = [];
            nodeList[0].childNodes.forEach(function (node) {
                availableList.push(getFoodFromID(node.id));
            });

            return availableList;
        },

        getSortSelection: function () {
            var sortOptions = document.querySelector(".sort__options").childNodes[1].children;
            var selectedSort = "";
            for (var i = 0; i < sortOptions.length; i++) {
                if (sortOptions[i].classList.contains("active")) {


                    selectedSort = sortOptions[i].textContent.toLowerCase();
                }
            }

            return selectedSort;

        },

        sortAvailable: function (property) {
            var availableList = this.getAvailableList();
            availableList.sort(function (a, b) {
                var nameA, nameB;
                if (property === ("name" || "type")) {
                    nameA = a[property].toUpperCase();
                    nameB = b[property].toUpperCase();
                } else if (property === ("tier")) {

                    nameA = parseFloat(b[property]);
                    nameB = parseFloat(a[property]);

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
            availableList.forEach(function (food) {
                self.addToAvailable(food);
            });
        },

        searchAvailable: function () {

            userQuery = document.querySelector(DOMStrings.searchInput).value;


            //clear available list
            UIController.clearLists(document.querySelector(DOMStrings.availableFoods));

            //adds all non selected foods to active menu
            var availableFoodArray = menuController.showInactive();

            if (userQuery == "") {
                availableFoodArray.forEach(function (foodObj) {
                    UIController.addToAvailable(foodObj);
                });
                //when search bar is empty apply filters
                UIController.filterByFoodType();

            } else {
                //escape special characters
                userQuery = userQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");



                var searchRegExp = new RegExp(userQuery, "im");
                availableFoodArray.forEach(function (foodObj) {

                    var isThereMatch = searchRegExp.test(foodObj.name) || searchRegExp.test("tier: " + foodObj.tier) || searchRegExp.test("tier " + foodObj.tier + "$");

                    if (isThereMatch == true) {
                        UIController.addToAvailable(foodObj);

                    }
                });
            }
        },

        filterByFoodType: function (sortOption) {
            //filters available foods according to buttons

            //if search is active do nothing
            userQuery = document.querySelector(DOMStrings.searchInput).value;
            if (userQuery !== "") {

                return;
            }
            //get which buttons are active
            var activeButtons = [];
            document.querySelector(".foodtype__container").childNodes.forEach(function (node) {
                if (typeof node.classList !== "undefined" && node.classList.contains("active")) {
                    activeButtons.push(node.id.slice(0, -8));
                }

            });

            //process names
            activeButtons.forEach(function (ele, i) {
                if (ele === "campfire") {
                    activeButtons[i] = "Campfire";
                } else if (ele === "bakeryoven") {
                    activeButtons[i] = "Bakery";
                } else if (ele === "castironstove") {
                    activeButtons[i] = "Cast iron stove";
                } else if (ele === "kitchen") {
                    activeButtons[i] = "Kitchen";
                } else if (ele === "stove") {
                    activeButtons[i] = "Stove";
                } else if (ele === "raw") {
                    activeButtons[i] = "Raw";
                } else {
                    console.log("something's wrong man...");
                }
            });

            //do magic according to active buttons
            var availableFoodArray = menuController.showInactive();

            if (activeButtons.length > 0) {
                //clear available list
                UIController.clearLists(document.querySelector(DOMStrings.availableFoods));

                availableFoodArray.forEach(function (foodObject) {
                    if (confirmFoodType(foodObject)) {
                        UIController.addToAvailable(foodObject);
                    }
                });

            } else {
                availableFoodArray.forEach(function (ele) {
                    UIController.addToAvailable(ele);
                });
            }





            function confirmFoodType(foodObject) {
                var confirmed = false;
                for (var i = 0; i < activeButtons.length; i++) {
                    if (activeButtons[i] === foodObject.type) {
                        confirmed = true;
                        break;
                    }
                }

                return confirmed;
            }
        },

        infoClicked: function () {
            var content, infoButton;

            content = document.querySelector(DOMStrings.content);
            content.classList.toggle("hide__content");

            infoButton = document.querySelector(DOMStrings.infoButton);
            infoButton.classList.toggle("clicked");

            infoContainer = document.querySelector(DOMStrings.infoContainer);
            //if opening info
            if (content.classList.contains("hide__content")) {
                setTimeout(function () {
                    infoContainer.classList.toggle("visible");
                }, 500);
            } else {
                infoContainer.classList.toggle("visible");
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        },

        addToSelected: function (foodObj) {
            var htmlTemplate, newHtml;
            //remove it from available list first so no duplicate ids
            var el = document.getElementById(foodObj.id);
            if (el) {
                //if it's anywhere on the screen
                el.parentNode.removeChild(el);
            }
            //add food to selected list
            htmlTemplate =
                `<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span class="tier__info">Tier: %foodtier%</span></i></div><i class="ion-ios-close item__delete--btn"></i><img class="available__img" src="./resources/img/%imgid%.png" onerror="this.onerror=null; this.src='../resources/meaticon64.png'"><div class="item__price"><div class="item__price__container"><img src="resources/img/ptag.png"><input class="item__price__input" value="%price%"><p>$</p></div></div><div class="food__info"><div class="food__info__title"><img class="info__img" src="./resources/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>`;

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
            newHtml = newHtml.replace("%price%", UIController.getCookiePrice(foodObj.id) || foodObj.price);

            document.querySelector(DOMStrings.selectedFoods).insertAdjacentHTML("afterbegin", newHtml);
        },

        removeFromSelected: function (foodObj) {
            //remove it from selected list first so no duplicate ids

            var el = document.getElementById(foodObj.id);
            el.parentNode.removeChild(el);

            //add to available list

            this.addToAvailable(foodObj);
        },

        addToAvailable: function (foodObj) {
            var htmlTemplate, newHtml;

            //remove it from the list first so no duplicate ids
            var el = document.getElementById(foodObj.id);
            if (el) {
                //if it's anywhere on the screen
                el.parentNode.removeChild(el);
            }
            //add food to selected list

            htmlTemplate =
                `<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span class="tier__info">Tier: %foodtier%</span></i></div><div class="stomach__add"><img class="stomach__add--icon" src="./resources/stomach.svg"></div><i class="ion-android-add item__add--btn"></i><img class="available__img" src="./resources/img/%imgid%.png" onerror="this.onerror=null; this.src='../resources/meaticon64.png'"><div class="food__info"><div class="food__info__title"><img class="info__img" src="./resources/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>`;

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

        clearLists: function (list) {
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
        },

        getInput: function () {
            var regex = /,/gm;
            var foodInput = document.querySelector(DOMStrings.foodAmountInput).value;
            var simInput = document.querySelector(DOMStrings.simScaleInput).value;
            var budgetInput = parseInt(document.querySelector(DOMStrings.budgetInput).value);
            var calorieInput = parseInt(document.querySelector(DOMStrings.calorieInput).value);
            var caloriePerDollarInput = parseFloat(document.querySelector(DOMStrings.caloriePerDollarInput).value);
            var maxSpInput = parseInt(document.querySelector(DOMStrings.maxSpInput).value);
            if (budgetInput === 0 || budgetInput === -1 || isNaN(budgetInput)) {
                budgetInput = Infinity;
            }
            if (calorieInput === 0 || calorieInput === -1 || isNaN(calorieInput)) {
                calorieInput = Infinity;
            }
            if (caloriePerDollarInput == 0 || caloriePerDollarInput == -1 || isNaN(caloriePerDollarInput)) {
                caloriePerDollarInput = -Infinity;
            }


            return {
                foodInput: parseInt(foodInput.replace(regex, "")),
                simInput: simInput.replace(regex, ""),
                budgetInput: budgetInput,
                calorieInput: calorieInput,
                caloriePerDollarInput: caloriePerDollarInput,
                maxSpInput: maxSpInput
            };
        },

        displayResults: function (resultObject) {
            var paperHtml, menuContent, line, menuObject, foundAt;
            paperHtml = '<h1>Menu</h1><div class="horizontal__line"></div><div class="spinner"><img src="./resources/spinner.svg"></div><div class="menu__content"><div class ="menu__stomach__container hidden"><div class = "menu__stomach__title">Stomach</div></div></div><div class="horizontal__line"></div><div class="menu__result"><p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p><p><strong>Price:</strong>    %price%$</p><p><strong>Calories:</strong>    %calories%</p><p><strong>Calories per 1$:</strong>    %caloriesperdollar%</p></div>';

            if (resultObject.foundAt === 0) {
                foundAt = 1;
            } else {
                foundAt = resultObject.foundAt;
            }
            var paperHtmlEdited = paperHtml.
            replace('%sp%', resultObject.spAmount.toFixed(1)).
            replace('%multiplier%', resultObject.multiplier.toFixed(2)).
            replace('%index%', foundAt).
            replace('%simcount%', resultObject.totalIterations).
            replace('%price%', resultObject.totalPrice).
            replace('%calories%', resultObject.totalCalorie).
            replace('%caloriesperdollar%', resultObject.caloriePerDollar.toFixed(2));

            document.querySelector(DOMStrings.menuPaper).innerHTML = paperHtmlEdited;
            menuContent = document.querySelector(".menu__content");

            menuNonStomach = resultObject.resultMenuNonStomach;

            for (var foodname in menuNonStomach) {
                if ({}.hasOwnProperty.call(menuNonStomach, foodname)) {
                    line = `<p>${menuNonStomach[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML('afterbegin', line);

                }
            }
            menuStomachContainer = document.querySelector(".menu__stomach__container");
            menuStomach = resultObject.resultMenuStomach;

            if (Object.keys(menuStomach).length === 0) {

                menuStomachContainer.classList.add('hidden');

            } else {
                menuStomachContainer.classList.remove('hidden');

                for (var fname in menuStomach) {
                    if ({}.hasOwnProperty.call(menuStomach, fname)) {
                        line = `<p>${menuStomach[fname]}x   ${fname}</p>`;
                        menuStomachContainer.insertAdjacentHTML('beforeend', line);

                    }
                }

            }
            setTimeout(function () {
                document.querySelector('.menu__paper').classList.add('menu__visible');
            }, 0);
        },

        updateResults: function (resultObject) {
            var menuResultHtml, menuContent, line, menuObject, foundAt;

            menuResultHtml = '<p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p><p><strong>Price:</strong>    %price%$</p><p><strong>Calories:</strong>    %calories%</p>';

            if (resultObject.foundAt === 0) {
                foundAt = 1;
            } else {
                foundAt = resultObject.foundAt;
            }

            var menuResultHtmlEdited = menuResultHtml.
            replace('%sp%', resultObject.spAmount.toFixed(2)).
            replace('%multiplier%', resultObject.multiplier.toFixed(2)).
            replace('%index%', foundAt).
            replace('%simcount%', resultObject.totalIterations).
            replace('%price%', resultObject.totalPrice).
            replace('%calories%', resultObject.totalCalorie);

            menuContent = document.querySelector(".menu__content");

            menuContent.innerHTML = '<div class ="menu__stomach__container hidden"><div class = "menu__stomach__title">Stomach</div></div>';

            menuNonStomach = resultObject.resultMenuNonStomach;

            for (var foodname in menuNonStomach) {
                if ({}.hasOwnProperty.call(menuNonStomach, foodname)) {
                    line = `<p>${menuNonStomach[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML('afterbegin', line);

                }
            }
            menuStomachContainer = document.querySelector(".menu__stomach__container");
            menuStomach = resultObject.resultMenuStomach;

            if (Object.keys(menuStomach).length === 0) {

                menuStomachContainer.classList.add('hidden');

            } else {
                menuStomachContainer.classList.remove('hidden');

                for (var fname in menuStomach) {
                    if ({}.hasOwnProperty.call(menuStomach, fname)) {
                        line = `<p>${menuStomach[fname]}x   ${fname}</p>`;
                        menuStomachContainer.insertAdjacentHTML('beforeend', line);

                    }
                }

            }

            document.querySelector(".menu__result").innerHTML = menuResultHtmlEdited;

            if (!document.querySelector('.menu__paper').classList.contains('menu__visible')) {
                document.querySelector('.menu__paper').classList.add('menu__visible');

            }
        },

        setPercentage: function (percentage) {
            var progressBar = document.querySelector(DOMStrings.progressBar);
            progressBar.style.width = percentage + '%';
            progressBar.textContent = percentage + '%';

        },

        displayHighscore: function (result) {
            var Html, newHtml, highscoreContent, line, menuObject;
            highscoreContent = document.querySelector(DOMStrings.highscoreContent);

            document.querySelector(DOMStrings.highscoreBestButton).classList.remove("clicked");


            if (result) {
                lastResult = result;
            } else {
                result = lastResult;
            }

            if (result.currentHighscore) {
                //if server responds with a highscore

                Html = '<p>%message%</p><br><h2>Best diet with %foodqty% meals. </h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>';

                menuObject = result.currentHighscore[0].menu;
                line = "";
                for (var foodname in menuObject) {
                    if ({}.hasOwnProperty.call(menuObject, foodname)) {
                        line += `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                    }
                }
                newHtml = Html.replace("%message%", result.message);
                newHtml = newHtml.replace("%menu%", line);
                newHtml = newHtml.replace("%SP%", result.currentHighscore[0].sp);
                newHtml = newHtml.replace("%foodqty%", result.currentHighscore[0].foodQty);
            } else {
                //if server responds with only a message
                Html = '<p>%message%</p>';
                newHtml = Html.replace("%message%", result.message);
            }
            highscoreContent.innerHTML = newHtml;

            isShowingHighest = false;
        },

        displayHighest: function (result) {
            //button clicked effect
            document.querySelector(DOMStrings.highscoreBestButton).classList.add("clicked");
            if (!highestResult) {
                highestResult = result;
            }

            if (!result) {
                result = highestResult;
            }


            var Html, newHtml, highscoreContent, line;


            menuObject = result.menu;
            line = "";
            for (var foodname in menuObject) {
                if ({}.hasOwnProperty.call(menuObject, foodname)) {
                    line += `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                }
            }

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html = '<p>This app, stores the best SP combinations and categorize them by food number.</p><br><h2>Highest SP across all categories so far:</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>';

            newHtml = Html.replace("%menu%", line);
            newHtml = newHtml.replace("%SP%", result.sp);

            highscoreContent.innerHTML = newHtml;

            isShowingHighest = true;
        },

        bestButtonClicked: function () {

            var bestButtonClasses = document.querySelector(DOMStrings.highscoreBestButton).classList;
            if (isShowingHighest && lastResult) {
                UIController.displayHighscore();
                //bestButtonClasses.add("clicked")


            } else if (!isShowingHighest) {
                UIController.displayHighest();
                //bestButtonClasses.remove("clicked")

            }
        },

        getInputPrices: function () {
            var prices = [];
            var pricesNodeList = document.querySelectorAll(DOMStrings.priceTagInput);

            if (pricesNodeList.length > 0) {
                pricesNodeList.forEach(function (node) {
                    var id = node.parentNode.parentNode.parentNode.id;
                    //change "," with "." to avoid common mistake of putting comma instead of decimal
                    var price = parseFloat(node.value.replace(",", "."));
                    if (isNaN(price)) {
                        price = 0;
                    }
                    prices.push([id, price]);
                });
            }

            return prices;
        },

        savePrices: function () {
            var prices = UIController.getInputPrices();
            var expires = `expires=Fri, December 31, 9999 3:00:00 UTC; path=/`;
            prices.forEach(function (ele) {
                var foodString = `${ele[0]}=${ele[1]};`;
                foodString = foodString.concat(expires);
                document.cookie = foodString;
                menuController.updatePrice(ele[0], ele[1]);
            });




        },

        getCookiePrice: function (id) {
            var cId = id + "=";
            var cookies = document.cookie;
            cookies = cookies.split(";");
            for (var cookie of cookies) {
                if (cookie.charAt(0) === " ") {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(cId) === 0) {
                    cookie = cookie.substring(cookies.indexOf(cId) + cId.length + 1);


                    menuController.updatePrice(id, cookie);

                    return cookie;
                }
            }
        },

        stomachShowHide: function (option) {

            var stomachContainer = document.querySelector(DOMStrings.stomachContainer);
            var stomachButton = document.querySelector(DOMStrings.stomachButton);



            if (stomachContainer.classList.contains("visible") && option !== "show") {
                stomachContainer.classList.remove("visible");
                stomachButton.classList.remove("clicked");
            } else {
                stomachContainer.classList.add("visible");
                stomachButton.classList.add("clicked");
            }




        },

        highscoresShowHide: function () {

            var highscoreContainerClasses = document.querySelector(DOMStrings.highscoreContainer).classList;
            var trophyButtonClasses = document.querySelector(DOMStrings.highscoreButton).classList;

            if (highscoreContainerClasses.contains("visible")) {
                highscoreContainerClasses.remove("visible");
                trophyButtonClasses.remove("clicked");
            } else {
                highscoreContainerClasses.add("visible");
                trophyButtonClasses.add("clicked");
            }

        },

        checkStomachForDuplicates: function (foodObj) {

            var stomachFoodList = document.querySelector(DOMStrings.stomachListContainer).childNodes;
            var duplicateFound = false;

            stomachFoodList.forEach(function (nodes) {
                if (nodes.innerText === foodObj.name) {
                    duplicateFound = true;
                }
            });

            return duplicateFound;
        },

        addToStomach: function (foodObj) {


            var htmlTemplate, newHtml;
            var stomachListContainer = document.querySelector(DOMStrings.stomachListContainer);


            htmlTemplate = `<div class="item" food-id="%foodid%"><div class="item__description">%foodname%</div><input class="stomach__food__input" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\\..*)\\\./g, '$1');" placeholder="#"><i class="ion-close stomach__item__delete--btn"></i></div>`;

            newHtml = htmlTemplate.replace("%foodname%", foodObj.name);
            newHtml = newHtml.replace("%foodid%", foodObj.id);

            stomachListContainer.insertAdjacentHTML("beforeend", newHtml);

            this.stomachShowHide("show");

        },

        removeFromStomach: function (foodObj) {

            var stomachFoodList = document.querySelector(DOMStrings.stomachListContainer).childNodes;

            stomachFoodList.forEach(function (node) {
                if (node.innerText === foodObj.name) {
                    node.parentNode.removeChild(node);

                }
            });

            this.stomachApplyButton("unpress");


        },

        stomachApplyButton: function (option) {
            var stomachApplyButton = document.querySelector(DOMStrings.stomachApplyButton);
            if (option === "press") {
                stomachApplyButton.classList.add("clicked");
            } else {
                stomachApplyButton.classList.remove("clicked");
            }

        },


    };
})();

var menuController = (function (UIController) {
    var allFoodsArray;
    console.log(allFoodsArray)
    var activeMenu = [];
    var stomachContent = [];
    var DOMStrings = UIController.getDOMStrings();

    return {
        init: function () {
            allFoodsArray = FoodListController.getActiveFoodList().foods;
            activeMenu = [];
            stomachContent = [];
        },
        storeStomachContent: function () {
            var stomachListContainer = document.querySelector(DOMStrings.stomachListContainer).childNodes;
            var stomachFoodList = [];
            stomachListContainer.forEach(function (node) {
                var nodeFood;
                var nodeFoodAmount;


                if (node.childNodes[1]) {

                    if (node.childNodes[1].value > 0) {
                        nodeFoodAmount = parseInt(node.childNodes[1].value);
                    } else {
                        nodeFoodAmount = 0;
                    }

                    nodeFood = getFoodFromID(node.getAttribute("food-id"));
                    for (var i = 0; i < node.childNodes[1].value; i++) {
                        stomachFoodList.push(nodeFood);
                    }
                }


            });
            //console.log(stomachFoodList);

            stomachContent = stomachFoodList;
        },

        showStomachContent: function () {

            return stomachContent;

        },

        addActive: function (foodObj) {
            //add to active menu
            activeMenu.push(foodObj);
        },
        removeActive: function (foodObj) {
            activeMenu.forEach(function (ele, i) {
                if (foodObj.id == ele.id) {
                    activeMenu.splice(i, 1);
                }
            });
        },
        showActive: function () {
            return activeMenu;
        },
        showInactive: function () {
            var allFoods = menuController.getAllFoods();
            var availableFoods = [];
            var selectedFoods = this.showActive();

            allFoods.forEach(function (food, index) {
                var found = false;
                for (var i = 0; i < selectedFoods.length; i++) {
                    if (food.id == selectedFoods[i].id) {

                        found = true;

                    }
                }
                if (found === false) {
                    availableFoods.push(food);
                }
            });

            return availableFoods;
        },
        clearActive: function () {
            activeMenu = [];
        },
        addActiveAll: function () {
            activeMenu = menuController.getAllFoods();

        },
        updatePrice: function (id, price) {
            allFoodsArray.forEach(function (food, index) {
                if (food.id == id) {
                    allFoodsArray[index].price = price;
                    console.log(`Changed ${food.name} price to ${food.price}`)
                }
            });
        },
        getAllFoods: function () {

            return allFoodsArray;
        }
    };
})(UIController);

var controller = (function (UICtrl, menuCtrl, FoodListCtrl) {
    var DOM;

    DOM = UICtrl.getDOMStrings();

    var setupEventListeners = function () {
        //after pressing add to menu

        document.querySelector(DOM.availableFoods).addEventListener("click", availableFoodListener);

        //after pressing remove from menu
        document.querySelector(DOM.selectedFoods).addEventListener("click", deleteFoodfromActive);


        //after pressing calculate
        document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);

        //infobutton
        document.querySelector(DOM.infoButton).addEventListener("click", infoClicked);

        /*
         *add all button
         *document.querySelector(DOM.addAll).addEventListener("click", function () { 
         *    addAll("selected") 
         *});
         */

        //remove all button
        document.querySelector(DOM.removeAll).addEventListener("click", removeAll);

        //quick add section
        document.querySelector(DOM.quickAdd).addEventListener("click", quickAdd);
        //sort button
        document.querySelector(DOM.sortBar).addEventListener("click", sortClicked);

        //highscore button
        document.querySelector(DOM.highscoreButton).addEventListener("click", UICtrl.highscoresShowHide);

        //best highscore button
        document.querySelector(DOM.highscoreBestButton).addEventListener("click", UICtrl.bestButtonClicked);

        //stomach button 
        document.querySelector(DOM.stomachButton).addEventListener("click", UICtrl.stomachShowHide);

        //stomach container event listener
        document.querySelector(DOM.stomachContainer).addEventListener("click", stomachContainerListener);

        //input formatting

        var simInputFormat = new Cleave(".simulation__scale__input", {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });
        var dietInputFormat = new Cleave(".food__amount__input", {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        });


        //price keypress event listener
        document.addEventListener("keyup", UICtrl.savePrices);

        //search box event listener
        document.querySelector(DOM.searchInput).addEventListener("input", UICtrl.searchAvailable);

        //filter by food type (campfire, kitchen, etc) event listener
        document.querySelector(DOM.foodTypeContainer).addEventListener("click", filterController);
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
            menuCtrl.addActiveAll();
            UICtrl.initUI("selected");
        } else if (option === "available") {
            menuCtrl.clearActive();
            UICtrl.initUI("available");
        }
    }

    function addAllTier(tier) {
        var availList = UICtrl.getAvailableList();

        availList.forEach(function (ele) {
            if (ele.tier === tier) {
                menuCtrl.addActive(ele);
                UIController.addToSelected(ele);
            }
        });
    }

    function infoClicked() {
        UICtrl.infoClicked();
    }

    function availableFoodListener(event) {
        var itemID, selectedFood;
        //get UI input


        //if add button is clicked
        if (event.target.className.includes("item__add--btn")) {
            itemID = event.target.parentNode.id;
            if (parseInt(itemID)) {
                //find the food
                selectedFood = getFoodFromID(itemID);
                //add to selected food in UICtrl and remove from available foods
                UICtrl.addToSelected(selectedFood);
                //update active menu in menuCtrl
                menuCtrl.addActive(selectedFood);


            }
        }

        //if stomach button is clicked
        if (event.target.className.includes("stomach__add--icon")) {

            itemID = event.target.parentNode.parentNode.id;

            if (parseInt(itemID)) {

                selectedFood = getFoodFromID(itemID);


                if (!UICtrl.checkStomachForDuplicates(selectedFood)) {

                    UICtrl.addToStomach(selectedFood);

                    //point to input text of last added
                    document.querySelector(DOM.stomachListContainer).lastChild.childNodes[1].addEventListener("input", UICtrl.stomachApplyButton);

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
            menuCtrl.removeActive(selectedFood);

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
        var selectedFood;

        if (event.target.className.includes("stomach__item__delete--btn")) {
            selectedFoodId = event.target.parentElement.getAttribute("food-id");

            UICtrl.removeFromStomach(getFoodFromID(selectedFoodId));
        }

        if (event.target.className.includes("stomach__apply__button")) {

            applyStomachContent();
        }


    }

    function applyStomachContent() {
        menuCtrl.storeStomachContent();
        UICtrl.stomachApplyButton("press");
    }

    highCountAdvisorShown = false;

    function startWorkerSim() {
        //disable calculate button
        document.querySelector(DOM.calculateButton).removeEventListener("click", startWorkerSim);

        //apply stomach content
        applyStomachContent();

        var activeMenu = menuCtrl.showActive();
        var stomachContent = menuCtrl.showStomachContent();
        var input = UICtrl.getInput();
        var inputFood = input.foodInput;
        var inputSim = input.simInput;



        if (inputFood === "" || isNaN(inputFood)) {
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
            showError("no_blank");

            return;


        } else if (activeMenu.length === 0) {
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
            showError("no_food");

            return;
        }
        var menuPaper;
        var stopBtn = document.querySelector(DOM.stopButton);


        console.log('Starting Worker.');
        var work = new Worker('testMenuWorker.js');

        if (inputSim === "" || inputSim == 0) {

            var iterationCount = Math.pow(inputFood + 1, activeMenu.length);

            if (iterationCount > 50000000 && highCountAdvisorShown === false) {
                Swal.fire({
                    title: "This might take a while",
                    html: "The amount of iterations for this calculation is high (" + iterationCount + " menus to test). So it may take a long time to find the best.<br><br> However you can cancel the calculation any time if it's taking too long. <br><br> You can also consider setting a custom calculation scale and randomly test menus with current selections. Try starting with 1,000,000.",
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
                            simType: "definitive"

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
                    simType: "definitive"

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
                simType: "random"

            });
        }


        function uiStartWorker() {

            //reset percentage
            UIController.setPercentage("0");

            //swipe list container to left
            var listsContainer = document.querySelector(DOM.listsContainer);
            if (!listsContainer.classList.contains("menu__visible")) {
                listsContainer.classList.add("menu__visible");
            }

            document.querySelector(".spinner").classList.add("visible");

            var menuPaper = document.querySelector(DOM.menuPaper);
            if (menuPaper) {
                //blur menu
                menuPaper.style.webkitFilter = "blur(4px)";

                menuPaper.style.tranform = 'translateX(0);';

            }
            //enable stop button

            stopBtn.classList.add("visible");
            stopBtn.addEventListener("click", terminateWorker);
        }

        function terminateWorker() {
            console.log("Terminating Worker.");
            work.terminate();
            //enable calculate button
            document.querySelector(DOM.calculateButton).addEventListener("click", startWorkerSim);
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
                document.querySelector(DOM.menuPaper).style.webkitFilter = "blur(0)";
                terminateWorker();
            } else if (message.data.type === "menu_found") {
                setTimeout(function () {
                    //remove blur
                    document.querySelector(DOM.menuPaper).style.webkitFilter = "";
                    UICtrl.displayResults(message.data.result);
                }, 500);
                sendPostRequest(message.data.result);
                terminateWorker();
            } else if (message.data.type === "menu_update") {
                document.querySelector(DOM.menuPaper).style.webkitFilter = "";
                UICtrl.updateResults(message.data.result);
            }

            /*
            if (typeof message.data === 'number') {
                UICtrl.setPercentage(message.data)
            } else if (message.data === 'error') {
                showError("not_found")
                document.querySelector(DOM.menuPaper).style.webkitFilter = "blur(0)"
                terminateWorker();

            } else {
                //var outputList = document.querySelector(DOM.rightContainer);
                
                
                setTimeout(function() {
                    //remove blur
                    document.querySelector(DOM.menuPaper).style.webkitFilter = "";      
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
        fetch("http://api.kaansarkaya.com:8000/highscore", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }).
        then((res) => res.json()).
        then((json) => {
            //console.log("Request complete! response:", json);
            UICtrl.displayHighscore(json);

            return json;
        });
    }

    function getHighestScore() {
        //console.log(isShowingHighestScore);

        fetch("http://api.kaansarkaya.com:8000/gethighest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        then((res) => res.json()).
        then((json) => {
            console.log("Highest score get:" + json.sp);
            UICtrl.displayHighest(json);
        }).
        catch((error) => {
            console.error(error);
        });
    }

    return {
        init: function () {

            FoodListCtrl.init();
            menuCtrl.init();
            UICtrl.initUI();
            setupEventListeners();
            console.log("Application has started.");
            getHighestScore();
        },
        showHighestScore: function () {
            getHighestScore();
        }

    };
})(UIController, menuController, FoodListController);

controller.init();