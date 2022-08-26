var DOMStrings = require("./domStrings");
module.exports = function (FoodListController) {
    var allFoodsArray;
    var activeMenu = [];
    var stomachContent = [];

    function getTasteMults() {
        return JSON.parse(window.localStorage.getItem("taste_multipliers")) || {};
    }

    function updateFoodTasteMults() {
        var tasteMults = getTasteMults();
        allFoodsArray = allFoodsArray.map((food) => {
            return {
                ...food,
                tasteMult: tasteMults[food.id] || 1,
            };
        });
    }

    function getAllFoods() {
        updateFoodTasteMults();
        return allFoodsArray;
    }
    function getFoodFromID(id) {
        var selectedFood;
        try {
            selectedFood = getAllFoods().find((element) => element.id == id);
            //returns food object

            return selectedFood;
        } catch (error) {
            console.error("Couldn't get foods from menuController trying foodListController. Error: " + error);
        }
    }
    return {
        init: function () {
            allFoodsArray = FoodListController.getActiveFoodList().foods;
            updateFoodTasteMults();
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
                    for (var i = 0; i < nodeFoodAmount; i++) {
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
            window.localStorage.setItem("activeMenu", JSON.stringify(activeMenu));
        },
        removeActive: function (foodObj) {
            activeMenu.forEach(function (ele, i) {
                if (foodObj.id == ele.id) {
                    activeMenu.splice(i, 1);
                }
                window.localStorage.setItem("activeMenu", JSON.stringify(activeMenu));
            });
        },
        showActive: function () {
            return activeMenu.map((menuItem) => getFoodFromID(menuItem.id));
        },
        showInactive: function () {
            var allFoods = getAllFoods();
            var availableFoods = [];
            var selectedFoods = this.showActive();

            allFoods.forEach(function (food) {
                var found = false;
                for (var i = 0; i < selectedFoods.length; i++) {
                    if (food.id == selectedFoods[i].id) {
                        found = true;
                    }
                }
                if (found === false) {
                    availableFoods.push(getFoodFromID(food.id));
                }
            });

            return availableFoods;
        },
        clearActive: function () {
            activeMenu = [];
        },
        addActiveAll: function () {
            activeMenu = allFoodsArray;
        },
        updatePrice: function (id, price) {
            allFoodsArray.forEach(function (food, index) {
                if (food.id == id) {
                    allFoodsArray[index].price = price;
                }
            });
        },
        getTasteMults: getTasteMults,
        updateFoodTasteMults: updateFoodTasteMults,
        getAllFoods: getAllFoods,
        getFoodFromID: getFoodFromID,
    };
};
