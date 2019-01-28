const noteRoutes = require('./note_routes');

module.exports = function (app, db) {
    noteRoutes(app,db);
};

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