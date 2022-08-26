"use strict";

var UiController = function UiController(menuController, getFoodFromID) {
    var DOMStrings = require("./domStrings");

    var lastResult;
    var highestResult;
    var isShowingHighest;

    var addToAvailable = function (foodObj) {
        var htmlTemplate, newHtml;

        //remove it from the list first so no duplicate ids
        var el = document.getElementById(foodObj.id);
        if (el) {
            //if it's anywhere on the screen
            el.parentNode.removeChild(el);
        }
        //add food to selected list

        htmlTemplate = `<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span class="tier__info">Tier: %foodtier%</span></i></div><div class="stomach__add"><img class="stomach__add--icon" src="./public/stomach.svg"></div><i class="ion-android-add item__add--btn"></i><img class="available__img" src="./public/img/%imgid%.png" onerror="this.onerror=null; this.src='../public/meaticon64.png'"><div class="food__info"><div class="food__info__title"><img class="info__img" src="./public/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>`;

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
    };
    var getAvailableList = function () {
        var nodeList = document.querySelectorAll(".available__food__list");
        var availableList = [];
        nodeList[0].childNodes.forEach(function (node) {
            availableList.push(getFoodFromID(node.id));
        });

        return availableList;
    };
    var stomachApplyButton = function (option) {
        var stomachApplyButton = document.querySelector(DOMStrings.stomachApplyButton);
        if (option === "press") {
            stomachApplyButton.classList.add("clicked");
        } else {
            stomachApplyButton.classList.remove("clicked");
        }
    };
    var clearLists = function (list) {
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
    };
    var getCookiePrice = function (id) {
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
    };
    var getInputPrices = function () {
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
    };
    var sortAvailable = function (property) {
        var availableList = getAvailableList();
        availableList.sort(function (a, b) {
            var nameA, nameB;
            if (property === ("name" || "type")) {
                nameA = a[property].toUpperCase();
                nameB = b[property].toUpperCase();
            } else if (property === "tier") {
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
        clearLists(document.querySelector(DOMStrings.availableFoods));
        availableList.forEach(function (food) {
            addToAvailable(food);
        });
    };

    var addToSelected = function (foodObj) {
        var htmlTemplate, newHtml;
        //remove it from available list first so no duplicate ids
        var el = document.getElementById(foodObj.id);
        if (el) {
            //if it's anywhere on the screen
            el.parentNode.removeChild(el);
        }
        //add food to selected list
        htmlTemplate = `<div class="item clearfix" id="%id%"><div class="item__description">%foodname%<i><span class="tier__info">Tier: %foodtier%</span></i></div><i class="ion-ios-close item__delete--btn"></i><img class="available__img" src="./public/img/%imgid%.png" onerror="this.onerror=null; this.src='../public/meaticon64.png'"><div class="item__price"><div class="item__price__container"><img src="public/img/ptag.png"><input class="item__price__input" value="%price%"><p>$</p></div></div><div class="food__info"><div class="food__info__title"><img class="info__img" src="./public/img/%infoimgid%.png"><h5>%name%</h5></div><div class="food__info__nutrition"><h6>Weight:<span style="color: #0092f8;">%weight%</span> kg</h6><h6>-<span style="color: #e64b17">Carbs: %carb%</span></h6><h6>-<span style="color: #cd8c11">Protein: %protein%</span></h6><h6>-<span style="color: #ffd21c">Fat: %fat%</span></h6><h6>-<span style="color: #7b9a18">Vitamins: %vit%</span></h6><h6>Calories: %calorie% kcal</h6><h6>Made in: %foodtype%</h6></div></div></div>`;

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
        newHtml = newHtml.replace("%price%", getCookiePrice(foodObj.id) || foodObj.price);

        document.querySelector(DOMStrings.selectedFoods).insertAdjacentHTML("afterbegin", newHtml);
    };

    return {
        formatInputToNumber: function () {
            this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
        },

        initUI: function (option) {
            if (!option) {
                option = "available";
            }

            //clear lists
            var availableList = document.querySelector(DOMStrings.availableFoods);
            var selectedList = document.querySelector(DOMStrings.selectedFoods);

            clearLists(availableList);
            clearLists(selectedList);

            //adds all foods to active menu
            var allFoodsArray;
            allFoodsArray = menuController.getAllFoods();

            if (option === "available") {
                allFoodsArray.forEach(function (foodObj) {
                    addToAvailable(foodObj);
                });
            } else if (option === "selected") {
                allFoodsArray.forEach(function (foodObj) {
                    addToSelected(foodObj);
                });
            }

            sortAvailable("tier");
        },

        getAvailableList: getAvailableList,

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

        sortAvailable: sortAvailable,

        searchAvailable: function () {
            let userQuery = document.querySelector(DOMStrings.searchInput).value;

            //clear available list
            UiController.clearLists(document.querySelector(DOMStrings.availableFoods));

            //adds all non selected foods to active menu
            var availableFoodArray = menuController.showInactive();

            if (userQuery == "") {
                availableFoodArray.forEach(function (foodObj) {
                    addToAvailable(foodObj);
                });
                //when search bar is empty apply filters
                filterByFoodType();
            } else {
                //escape special characters
                userQuery = userQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

                var searchRegExp = new RegExp(userQuery, "im");
                availableFoodArray.forEach(function (foodObj) {
                    var isThereMatch =
                        searchRegExp.test(foodObj.name) ||
                        searchRegExp.test("tier: " + foodObj.tier) ||
                        searchRegExp.test("tier " + foodObj.tier + "$");

                    if (isThereMatch == true) {
                        UiController.addToAvailable(foodObj);
                    }
                });
            }
        },

        filterByFoodType: function () {
            //filters available foods according to buttons

            //if search is active do nothing
            const userQuery = document.querySelector(DOMStrings.searchInput).value;
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
                UiController.clearLists(document.querySelector(DOMStrings.availableFoods));

                availableFoodArray.forEach(function (foodObject) {
                    if (confirmFoodType(foodObject)) {
                        UiController.addToAvailable(foodObject);
                    }
                });
            } else {
                availableFoodArray.forEach(function (ele) {
                    UiController.addToAvailable(ele);
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

            const infoContainer = document.querySelector(DOMStrings.infoContainer);
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

        addToSelected: addToSelected,

        removeFromSelected: function (foodObj) {
            //remove it from selected list first so no duplicate ids

            var el = document.getElementById(foodObj.id);
            el.parentNode.removeChild(el);

            //add to available list

            addToAvailable(foodObj);
        },

        addToAvailable: addToAvailable,

        clearLists: clearLists,

        getInput: function () {
            var regex = /,/gm;
            var foodInput = parseInt(document.querySelector(DOMStrings.foodAmountInput).value.replace(regex, ""));
            var simInput = parseInt(document.querySelector(DOMStrings.simScaleInput).value.replace(regex, "")) || 0;
            var budgetInput = parseInt(document.querySelector(DOMStrings.budgetInput).value);
            var calorieInput = parseInt(document.querySelector(DOMStrings.calorieInput).value);
            var caloriePerDollarInput = parseFloat(document.querySelector(DOMStrings.caloriePerDollarInput).value);
            var maxSpInput = parseInt(document.querySelector(DOMStrings.maxSpInput).value) || Infinity;
            if (budgetInput === 0 || budgetInput === -1 || isNaN(budgetInput)) {
                budgetInput = Infinity;
            }
            if (calorieInput === 0 || calorieInput === -1 || isNaN(calorieInput)) {
                calorieInput = Infinity;
            }
            if (caloriePerDollarInput == 0 || caloriePerDollarInput == -1 || isNaN(caloriePerDollarInput)) {
                caloriePerDollarInput = -Infinity;
            }

            const result = {
                foodInput: foodInput,
                simInput: simInput,
                budgetInput: budgetInput,
                calorieInput: calorieInput,
                caloriePerDollarInput: caloriePerDollarInput,
                maxSpInput: maxSpInput,
            };
            return result;
        },

        displayResults: function (resultObject) {
            var paperHtml, menuContent, line, foundAt;
            paperHtml =
                '<h1>Menu</h1><div class="horizontal__line"></div><div class="spinner"><img src="./public/spinner.svg"></div><div class="menu__content"><div class ="menu__stomach__container hidden"><div class = "menu__stomach__title">Stomach</div></div></div><div class="horizontal__line"></div><div class="menu__result"><p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p><p><strong>Price:</strong>    %price%$</p><p><strong>Calories:</strong>    %calories%</p><p><strong>Calories per 1$:</strong>    %caloriesperdollar%</p></div>';

            if (resultObject.foundAt === 0) {
                foundAt = 1;
            } else {
                foundAt = resultObject.foundAt;
            }
            var paperHtmlEdited = paperHtml
                .replace("%sp%", resultObject.spAmount.toFixed(1))
                .replace("%multiplier%", resultObject.multiplier.toFixed(2))
                .replace("%index%", foundAt)
                .replace("%simcount%", resultObject.totalIterations)
                .replace("%price%", resultObject.totalPrice)
                .replace("%calories%", resultObject.totalCalorie)
                .replace("%caloriesperdollar%", resultObject.caloriePerDollar.toFixed(2));

            document.querySelector(DOMStrings.menuPaper).innerHTML = paperHtmlEdited;
            menuContent = document.querySelector(".menu__content");

            const menuNonStomach = resultObject.resultMenuNonStomach;

            for (var foodname in menuNonStomach) {
                if ({}.hasOwnProperty.call(menuNonStomach, foodname)) {
                    line = `<p>${menuNonStomach[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML("afterbegin", line);
                }
            }
            const menuStomachContainer = document.querySelector(".menu__stomach__container");
            const menuStomach = resultObject.resultMenuStomach;

            if (Object.keys(menuStomach).length === 0) {
                menuStomachContainer.classList.add("hidden");
            } else {
                menuStomachContainer.classList.remove("hidden");

                for (var fname in menuStomach) {
                    if ({}.hasOwnProperty.call(menuStomach, fname)) {
                        line = `<p>${menuStomach[fname]}x   ${fname}</p>`;
                        menuStomachContainer.insertAdjacentHTML("beforeend", line);
                    }
                }
            }
            setTimeout(function () {
                document.querySelector(".menu__paper").classList.add("menu__visible");
            }, 0);
        },

        updateResults: function (resultObject) {
            var menuResultHtml, menuContent, line, foundAt;

            menuResultHtml =
                "<p><strong>Daily SP:</strong>             %sp%</p><p><strong>Multiplier:</strong>    %multiplier%</p><p><strong>No:</strong>    %index% / %simcount% </p><p><strong>Price:</strong>    %price%$</p><p><strong>Calories:</strong>    %calories%</p>";

            if (resultObject.foundAt === 0) {
                foundAt = 1;
            } else {
                foundAt = resultObject.foundAt;
            }

            var menuResultHtmlEdited = menuResultHtml
                .replace("%sp%", resultObject.spAmount.toFixed(2))
                .replace("%multiplier%", resultObject.multiplier.toFixed(2))
                .replace("%index%", foundAt)
                .replace("%simcount%", resultObject.totalIterations)
                .replace("%price%", resultObject.totalPrice)
                .replace("%calories%", resultObject.totalCalorie);

            menuContent = document.querySelector(".menu__content");

            menuContent.innerHTML =
                '<div class ="menu__stomach__container hidden"><div class = "menu__stomach__title">Stomach</div></div>';

            const menuNonStomach = resultObject.resultMenuNonStomach;

            for (var foodname in menuNonStomach) {
                if ({}.hasOwnProperty.call(menuNonStomach, foodname)) {
                    line = `<p>${menuNonStomach[foodname]}x   ${foodname}</p>`;
                    menuContent.insertAdjacentHTML("afterbegin", line);
                }
            }
            const menuStomachContainer = document.querySelector(".menu__stomach__container");
            const menuStomach = resultObject.resultMenuStomach;

            if (Object.keys(menuStomach).length === 0) {
                menuStomachContainer.classList.add("hidden");
            } else {
                menuStomachContainer.classList.remove("hidden");

                for (var fname in menuStomach) {
                    if ({}.hasOwnProperty.call(menuStomach, fname)) {
                        line = `<p>${menuStomach[fname]}x   ${fname}</p>`;
                        menuStomachContainer.insertAdjacentHTML("beforeend", line);
                    }
                }
            }

            document.querySelector(".menu__result").innerHTML = menuResultHtmlEdited;

            if (!document.querySelector(".menu__paper").classList.contains("menu__visible")) {
                document.querySelector(".menu__paper").classList.add("menu__visible");
            }
        },

        setPercentage: function (percentage) {
            var progressBar = document.querySelector(DOMStrings.progressBar);
            progressBar.style.width = percentage + "%";
            progressBar.textContent = percentage + "%";
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

                Html =
                    "<p>%message%</p><br><h2>Best diet with %foodqty% meals. </h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>";

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
                Html = "<p>%message%</p>";
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

            const menuObject = result.menu;
            line = "";
            for (var foodname in menuObject) {
                if ({}.hasOwnProperty.call(menuObject, foodname)) {
                    line += `<p>${menuObject[foodname]}x   ${foodname}</p>`;
                }
            }

            highscoreContent = document.querySelector(DOMStrings.highscoreContent);
            Html =
                "<p>This app, stores the best SP combinations and categorize them by food number.</p><br><h2>Highest SP across all categories so far:</h2><p><b>Menu: </b>%menu%</p><p><b>Daily SP: </b>%SP%</p>";

            newHtml = Html.replace("%menu%", line);
            newHtml = newHtml.replace("%SP%", result.sp);

            highscoreContent.innerHTML = newHtml;

            isShowingHighest = true;
        },

        bestButtonClicked: function () {
            if (isShowingHighest && lastResult) {
                UiController.displayHighscore();
                //bestButtonClasses.add("clicked")
            } else if (!isShowingHighest) {
                UiController.displayHighest();
                //bestButtonClasses.remove("clicked")
            }
        },

        getInputPrices: getInputPrices,

        savePrices: function () {
            var prices = getInputPrices();
            var expires = `expires=Fri, December 31, 9999 3:00:00 UTC; path=/`;
            prices.forEach(function (ele) {
                var foodString = `${ele[0]}=${ele[1]};`;
                foodString = foodString.concat(expires);
                document.cookie = foodString;
                menuController.updatePrice(ele[0], ele[1]);
            });
        },

        getCookiePrice: getCookiePrice,

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

            // eslint-disable-next-line no-useless-escape
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

        stomachApplyButton: stomachApplyButton,
    };
};

module.exports = UiController;
