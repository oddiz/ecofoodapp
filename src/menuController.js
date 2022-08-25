var DOMStrings = require("./domStrings");
module.exports = function (FoodListController) {
    var allFoodsArray;
    var activeMenu = [];
    var stomachContent = [];

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
            return activeMenu;
        },
        showInactive: function () {
            var allFoods = menuController.getAllFoods();
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
                }
            });
        },
        getAllFoods: function () {
            return allFoodsArray;
        },
    };
};
