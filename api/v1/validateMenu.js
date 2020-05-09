const foods = require('./foodData')

module.exports = function (reqMenuArray) {
    //accepts an array of food objects
    "use strict";
    
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
    
    var menu =[]; 
    var baseGain = 12;
    var totalCarb = 0;
    var totalProtein = 0;
    var totalFat = 0;
    var totalVitamin = 0;
    var totalCal = 0;
    var foodList = "";

    reqMenuArray.forEach(function(element) {
        menu.push(getFoodFromID(element.id)); 
    })

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
