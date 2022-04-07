onmessage = function (e) {
    var activeMenuW, rollNumberW, foodCountW, budgetW, calorieW, caloriePerDollarW, maxSpW, stomachContentW, option;
    if (e.data.origin !== "ecoFood") {
        return;
    }
    activeMenuW = e.data.activeMenu;
    rollNumberW = e.data.simScale;
    foodCountW = e.data.foodInput;
    budgetW = e.data.budgetInput || Infinity;
    calorieW = e.data.calorieInput || Infinity;
    caloriePerDollarW = e.data.caloriePerDollarInput || -Infinity;
    maxSpW = e.data.maxSpInput || Infinity;
    stomachContentW = e.data.stomachContent;
    option = e.data.simType;


    testMenuWorker(activeMenuW, rollNumberW, foodCountW, budgetW, calorieW, caloriePerDollarW, maxSpW, stomachContentW, option);
};




function testMenuWorker(activeMenuArray, rollNumber, foodCount, budget, calorie, caloriePerDollar, maxSp, stomachContent, option) {

    console.time('Total_calculation_time')

    //randomizes and tests the active menu array
    "use strict";

    if (calorie !== Infinity) {
        calorie = parseInt(calorie);
    }
    if (budget !== Infinity) {
        budget = parseInt(budget);
    }
    if (maxSp !== Infinity) {
        maxSp = parseInt(maxSp);
    }

    var calculateSpMemo = new Map();


    function calculateSP(menu) {

        //accepts an array of food objects

        var baseGain = 12;
        var totalCarb = 0;
        var totalProtein = 0;
        var totalFat = 0;
        var totalVitamin = 0;
        var totalCal = 0;
        var foodList = "";

        for (var i = 0; i < menu.length; i++) {
            if (menu[i].cal == 0) {
                menu[i].cal = 1;
            }
            totalCal += parseInt(menu[i].cal);
            totalCarb += parseInt(menu[i].cal) * parseInt(menu[i].carb);
            totalProtein += parseInt(menu[i].cal) * parseInt(menu[i].pro);
            totalFat += parseInt(menu[i].cal) * parseInt(menu[i].fat);
            totalVitamin += parseInt(menu[i].cal) * parseInt(menu[i].vit);
            foodList = foodList + menu[i].name + "+";
        }
        var totalTotal = totalCarb + totalProtein + totalFat + totalVitamin;

        var totalAverage = totalTotal / totalCal;

        var maxTotal = Math.max(totalCarb, totalProtein, totalFat, totalVitamin);

        var balancedMultiplier = (totalTotal / (maxTotal * 4)) * 2;

        var result = {
            SP: baseGain + (totalAverage * balancedMultiplier),
            foodList: foodList,
            multiplier: balancedMultiplier
        };



        return result
    }


    var getMenu = function () {

        return {
            //returns array of foods
            all: activeMenuArray.concat(stomachContent),
            stomach: stomachContent || [],
            active: activeMenuArray
        };
    };

    var randomizer = 0;
    var bestMenuNames;
    var bestIndex = 0;
    var bestMultiplier = 0;
    var bestSP = 0;
    var bestTotalPrice = 0;
    var bestTotalCalorie = 0;
    var bestMenuArray = [];
    var bestMenuStomachArray = getMenu().stomach;
    var bestMenuNonStomachArray = [];
    var totalIterations;
    //console.log("usedFoods check " + activeMenuArray);

    var progressPercent = 0;
    var progressPercentOld = 0;
    var totalPrice = 0;
    var totalCalorie = 0;

    if (option === "random" || !option) {
        totalIterations = rollNumber;
        console.log("Starting random");
        for (var i = 0; i <= rollNumber; i++) {
            var randomMenu = [];

            totalPrice = 0;
            totalCalorie = 0;


            for (var q = 0; q < foodCount; q++) {
                randomizer = Math.floor(Math.random() * activeMenuArray.length);
                randomMenu.push(activeMenuArray[randomizer]);
                totalPrice += parseFloat(activeMenuArray[randomizer].price);
                totalCalorie += parseInt(activeMenuArray[randomizer].cal);
            }


            progressPercent = Math.floor(i / rollNumber * 100);

            if (progressPercent !== progressPercentOld) {
                progressPercentOld = progressPercent;

                postMessage({
                    type: "progress_percent",
                    percentage: progressPercent
                });
            }

            if (
                ((parseFloat(budget) != -1) && totalPrice > parseFloat(budget)) ||
                ((parseInt(calorie) != -1) && totalCalorie > parseInt(calorie)) ||
                (((totalCalorie / totalPrice) < caloriePerDollar))
            ) {
                randomMenu = [];
                continue;
            }
            var result = calculateSP(randomMenu.concat(getMenu().stomach));

            if (result.SP > maxSp) {
                randomMenu = [];
                continue;
            }
            if (result.SP > bestSP) {
                bestSP = result.SP;
                bestMenuNames = result.foodList;
                bestIndex = i;
                bestMultiplier = result.multiplier;
                bestTotalPrice = totalPrice;
                bestTotalCalorie = totalCalorie;
                bestMenuArray = randomMenu.concat(getMenu().stomach);
                bestMenuNonStomachArray = randomMenu;
            }
        }
    }

    if (option === "definitive") {
        console.log("Starting definitive");
        calculateAllIterations();
    }

    function calculateAllIterations() {

        var inputMenu = getMenu().active;
        var items = parseInt(foodCount);
        var groups = inputMenu.length;
        totalIterations = (factorial(items + groups - 1)) / (factorial(items) * factorial(groups - 1));
        totalIterations = Math.round(totalIterations);
        var counter = 0;

        partiteIdentical(items, groups);

        function partiteIdentical(items, groups, args = [0], index = 0) {

            if (groups === 0) {

                var argsTotal = args.reduce(function (a, b) {
                    return a + b;
                });
                if (argsTotal === items) {

                    var definitiveMenu = constructMenuFromArgs(args, getMenu().stomach);

                    if (totalCalorie == 0 && totalPrice == 0) {
                        totalCalorie = 1;
                    }

                    if ((totalPrice <= budget) && (totalCalorie <= calorie) && ((totalCalorie / totalPrice) >= caloriePerDollar)) {
                        var result = calculateSP(definitiveMenu.all);
                        if (result.SP > bestSP && result.SP <= maxSp) {
                            bestSP = result.SP;
                            bestMenuNames = result.foodList;
                            bestIndex = counter;
                            bestMultiplier = result.multiplier;
                            bestTotalPrice = totalPrice;
                            bestTotalCalorie = totalCalorie;
                            bestMenuArray = definitiveMenu.all;
                            bestMenuNonStomachArray = definitiveMenu.nonStomach;
                            postMessage({
                                type: "menu_update",
                                result: {
                                    resultMenu: processMenuNames(bestMenuArray),
                                    spAmount: bestSP,
                                    foundAt: bestIndex,
                                    multiplier: bestMultiplier,
                                    foodQty: parseInt(foodCount) + stomachContent.length,
                                    totalPrice: bestTotalPrice,
                                    totalCalorie: bestTotalCalorie,
                                    caloriePerDollar: bestTotalCalorie / bestTotalPrice,
                                    resultMenuArray: bestMenuArray,
                                    totalIterations: totalIterations,
                                    resultMenuStomach: processMenuNames(definitiveMenu.stomach),
                                    resultMenuNonStomach: processMenuNames(definitiveMenu.nonStomach)
                                }
                            });

                        }
                    }

                    counter += 1;
                    progressPercent = Math.floor(counter / totalIterations * 100);

                    if (progressPercent !== progressPercentOld) {

                        progressPercentOld = progressPercent;
                        postMessage({
                            type: "progress_percent",
                            percentage: progressPercent
                        });

                    }

                }

            } else {

                var groupRest = groups - 1;

                for (args[index] = 0; args[index] < items + 1; ++args[index]) {

                    partiteIdentical(items, groupRest, args, index + 1);

                }
            }
        }



        function constructMenuFromArgs(args, stomach) {
            //[3,0,2,3]
            if (!stomach) {
                stomach = [];
            }

            totalCalorie = 0;
            totalPrice = 0;

            var calculateMenu = [];

            args.forEach(function (ele, index) {

                for (var i = 0; i < ele; i++) {
                    calculateMenu.push(inputMenu[index]);
                    totalPrice += parseFloat(inputMenu[index].price);
                    totalCalorie += parseInt(inputMenu[index].cal);
                }
            });

            return {
                all: calculateMenu.concat(stomach),
                stomach: stomach,
                nonStomach: calculateMenu,
            };
        }

        function factorial(number) {
            var result = 1;
            for (var i = 2; i <= number; i++) {
                result *= i;
            }

            return result;
        }

    }

    function processMenuNames(array) {

        /*
        //"3+1+2+4" => [3,1,2,4]
        var listSplit = bestMenuNames.split("+");
        //[3,1,2,4] => [1,2,3,4]
        listSplit.sort();
    
        listSplit.shift();
        //console.log(listSplit);
        console.log(listSplit)
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
        */

        var arrayNames = array.map((ele) => ele.name)
        //console.log(arrayNames, "non sorted")
        arrayNames.sort();
        //console.log(arrayNames, "sorted")

        var finalResult = {};
        var foodName = "";
        for (var b = 0; b < arrayNames.length; b++) {
            foodName = arrayNames[b];

            if (finalResult[foodName] >= 0) {
                finalResult[foodName] += 1;
            } else {
                finalResult[foodName] = 1;
            }
        }


        return finalResult;
    }
    console.timeEnd('Total_calculation_time')
    if (bestMenuNames) {

        /*
         *console.log(bestSP + " found at " + bestIndex + ". try.");
         */
        postMessage({
            type: "menu_found",
            result: {
                resultMenu: processMenuNames(bestMenuArray),
                spAmount: bestSP,
                foundAt: bestIndex,
                multiplier: bestMultiplier,
                foodQty: parseInt(foodCount) + stomachContent.length,
                totalPrice: bestTotalPrice,
                totalCalorie: bestTotalCalorie,
                caloriePerDollar: bestTotalCalorie / bestTotalPrice,
                resultMenuArray: bestMenuArray,
                totalIterations: totalIterations,
                resultMenuStomach: processMenuNames(bestMenuStomachArray) || {
                    test: 2
                },
                resultMenuNonStomach: processMenuNames(bestMenuNonStomachArray)

            }

        });
    } else {
        postMessage({
            type: "not_found"
        });
        //return console.log("error");
    }
}