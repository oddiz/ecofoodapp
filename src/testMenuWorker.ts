import { FoodObject } from "./types";

onmessage = function (e) {
    var activeMenuW, rollNumberW, foodCountW, budgetW, calorieW, caloriePerDollarW, maxSpW, stomachContentW, option;
    if (e.data.origin !== "ecoFood") {
        return;
    }
    activeMenuW = e.data.activeMenu as any[];
    rollNumberW = e.data.simScale;
    foodCountW = e.data.foodInput;
    budgetW = e.data.budgetInput || Infinity;
    calorieW = e.data.calorieInput || Infinity;
    caloriePerDollarW = e.data.caloriePerDollarInput || -Infinity;
    maxSpW = e.data.maxSpInput || Infinity;
    stomachContentW = e.data.stomachContent;
    option = e.data.simType;

    testMenuWorker({
        activeMenuArray: activeMenuW,
        rollNumber: rollNumberW,
        foodCount: foodCountW,
        budget: budgetW,
        calorie: calorieW,
        caloriePerDollar: caloriePerDollarW,
        maxSp: maxSpW,
        stomachContent: stomachContentW,
        option: option,
    });
};

interface TestMenuArgs {
    activeMenuArray: FoodObject[];
    rollNumber: number;
    foodCount: number;
    budget: number;
    calorie: number;
    caloriePerDollar: number;
    maxSp: number;
    stomachContent: any[];
    option: string;
}

function testMenuWorker({
    activeMenuArray,
    rollNumber,
    foodCount,
    budget,
    calorie,
    caloriePerDollar,
    maxSp,
    stomachContent,
    option,
}: TestMenuArgs) {
    console.time("Total_calculation_time");

    //randomizes and tests the active menu array
    ("use strict");

    function calculateSP(menu: FoodObject[]) {
        //accepts an array of food objects

        function calculateTasteMult() {
            const totalCal = menu.reduce((total, food) => total + food.cal, 0);

            let calWeightedTaste = 0;

            for (const food of menu) {
                calWeightedTaste = calWeightedTaste + (food.tasteMult || 1) * food.cal;
            }

            return calWeightedTaste / totalCal;
        }

        var tasteMultiplier = calculateTasteMult() || 1;
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

        var result = {
            SP: baseGain + totalAverage * balancedMultiplier * tasteMultiplier,
            foodList: foodList,
            multiplier: balancedMultiplier,
            tasteMult: tasteMultiplier,
        };
        return result;
    }

    var getMenu = function () {
        return {
            //returns array of foods
            all: activeMenuArray.concat(stomachContent),
            stomach: stomachContent || [],
            active: activeMenuArray,
        };
    };

    var randomizer = 0;
    var bestMenuNames;
    var bestIndex = 0;
    var bestMultiplier = 0;
    var bestTasteMultiplier = 1;
    var bestSP = 0;
    var bestTotalPrice = 0;
    var bestTotalCalorie = 0;
    var bestMenuArray: FoodObject[] = [];
    var bestMenuStomachArray = getMenu().stomach;
    var bestMenuNonStomachArray: FoodObject[] = [];
    var totalIterations = 0;

    var progressPercent = 0;
    var progressPercentOld = 0;
    var totalPrice = 0;
    var totalCalorie = 0;

    if (option === "random" || !option) {
        totalIterations = rollNumber;
        console.info("Starting random");
        for (var i = 0; i <= rollNumber; i++) {
            var randomMenu = [];

            totalPrice = 0;
            totalCalorie = 0;

            for (var q = 0; q < foodCount; q++) {
                randomizer = Math.floor(Math.random() * activeMenuArray.length);
                randomMenu.push(activeMenuArray[randomizer]);
                totalPrice += activeMenuArray[randomizer].price;
                totalCalorie += activeMenuArray[randomizer].cal;
            }

            progressPercent = Math.floor((i / rollNumber) * 100);

            if (progressPercent !== progressPercentOld) {
                progressPercentOld = progressPercent;

                postMessage({
                    type: "progress_percent",
                    percentage: progressPercent,
                });
            }

            if (
                (budget != -1 && totalPrice > budget) ||
                (calorie != -1 && totalCalorie > calorie) ||
                totalCalorie / totalPrice < caloriePerDollar
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
                bestTasteMultiplier = result.tasteMult;
                bestTotalPrice = totalPrice;
                bestTotalCalorie = totalCalorie;
                bestMenuArray = randomMenu.concat(getMenu().stomach);
                bestMenuNonStomachArray = randomMenu;
            }
        }
    }

    if (option === "definitive") {
        console.info("Starting definitive");
        calculateAllIterations();
    }

    function calculateAllIterations() {
        var inputMenu = getMenu().active;
        var items = foodCount;
        var groups = inputMenu.length;
        totalIterations = factorial(items + groups - 1) / (factorial(items) * factorial(groups - 1));
        totalIterations = Math.round(totalIterations);
        var counter = 0;

        partiteIdentical(items, groups);

        function partiteIdentical(items: number, groups: number, args = [0], index = 0) {
            var argsTotal = args.reduce(function (a, b) {
                return a + b;
            });
            if (groups === 0) {
                if (argsTotal === items) {
                    var definitiveMenu = constructMenuFromArgs(args, getMenu().stomach);

                    if (totalCalorie == 0 && totalPrice == 0) {
                        totalCalorie = 1;
                    }

                    if (
                        totalPrice <= budget &&
                        totalCalorie <= calorie &&
                        totalCalorie / totalPrice >= caloriePerDollar
                    ) {
                        var result = calculateSP(definitiveMenu.all);
                        if (result.SP > bestSP && result.SP <= maxSp) {
                            bestSP = result.SP;
                            bestMenuNames = result.foodList;
                            bestIndex = counter;
                            bestMultiplier = result.multiplier;
                            bestTasteMultiplier = result.tasteMult;
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
                                    tasteMultiplier: bestTasteMultiplier,
                                    foodQty: foodCount + stomachContent.length,
                                    totalPrice: bestTotalPrice,
                                    totalCalorie: bestTotalCalorie,
                                    caloriePerDollar: bestTotalCalorie / bestTotalPrice,
                                    resultMenuArray: bestMenuArray,
                                    totalIterations: totalIterations,
                                    resultMenuStomach: processMenuNames(definitiveMenu.stomach),
                                    resultMenuNonStomach: processMenuNames(definitiveMenu.nonStomach),
                                },
                            });
                        }
                    }

                    counter += 1;
                    progressPercent = Math.floor((counter / totalIterations) * 100);

                    if (progressPercent !== progressPercentOld) {
                        progressPercentOld = progressPercent;
                        postMessage({
                            type: "progress_percent",
                            percentage: progressPercent,
                        });
                    }
                }
            } else if (argsTotal <= items) {
                var groupRest = groups - 1;

                for (args[index] = 0; args[index] < items + 1; ++args[index]) {
                    partiteIdentical(items, groupRest, [...args], index + 1);
                }
            }
        }

        function constructMenuFromArgs(args: number[], stomach: FoodObject[]) {
            //[3,0,2,3]
            if (!stomach) {
                stomach = [];
            }

            totalCalorie = 0;
            totalPrice = 0;

            var calculateMenu: FoodObject[] = [];

            args.forEach(function (ele: number, index: number) {
                for (var i = 0; i < ele; i++) {
                    calculateMenu.push(inputMenu[index]);
                    totalPrice += inputMenu[index].price;
                    totalCalorie += inputMenu[index].cal;
                }
            });

            return {
                all: calculateMenu.concat(stomach),
                stomach: stomach,
                nonStomach: calculateMenu,
            };
        }

        function factorial(num: number) {
            var rval = 1;
            for (var i = 2; i <= num; i++) rval = rval * i;
            return rval;
        }
    }

    function processMenuNames(array: FoodObject[]) {

        var arrayNames = array.map((ele: FoodObject) => ele.name);
        arrayNames.sort();

        var finalResult: { [foodName: string]: number } = {};
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
    console.timeEnd("Total_calculation_time");
    if (bestMenuNames) {

        postMessage({
            type: "menu_found",
            result: {
                resultMenu: processMenuNames(bestMenuArray),
                spAmount: bestSP,
                foundAt: bestIndex,
                multiplier: bestMultiplier,
                tasteMultiplier: bestTasteMultiplier,
                foodQty: foodCount + stomachContent.length,
                totalPrice: bestTotalPrice,
                totalCalorie: bestTotalCalorie,
                caloriePerDollar: bestTotalCalorie / bestTotalPrice,
                resultMenuArray: bestMenuArray,
                totalIterations: totalIterations,
                resultMenuStomach: processMenuNames(bestMenuStomachArray) || {
                    test: 2,
                },
                resultMenuNonStomach: processMenuNames(bestMenuNonStomachArray),
            },
        });
    } else {
        postMessage({
            type: "not_found",
        });
    }
}
