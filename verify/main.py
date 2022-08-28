import os
from cv2 import exp
from termcolor import colored, cprint
import re
import json
from dotenv import load_dotenv

load_dotenv()
SERVER_FOOD_PATH = "H:\\SteamLibrary\\steamapps\\common\\Eco Server\\Mods\\__core__\\AutoGen\\Food\\"
SERVER_SEED_PATH = "H:\\SteamLibrary\\steamapps\\common\\Eco Server\\Mods\\__core__\\AutoGen\\Seed\\"


def main():
    serverFoodPath = SERVER_FOOD_PATH
    serverSeedPath = SERVER_SEED_PATH

    os.chdir(os.getcwd()+"/verify")
    print(os.getcwd())
    with open("./config.json", "r") as configData:
        options = json.loads(configData.read())["options"]
    # list of foods from foodData.js in EcoDiet
    foodsToCheck = []

    serverFoodFiles = os.listdir(serverFoodPath)
    serverSeedFiles = os.listdir(serverSeedPath)
    serverFoundIndexes = []

    with open("./temp/foodData.json", "r") as foodData:
        foodsToCheck = json.loads(foodData.read())

    counter = 0

    def checkFood(FoodObj):
        name = FoodObj["name"].replace(" ", "")
        try:
            carb = int(FoodObj["carb"])
            protein = int(FoodObj["pro"])
            fat = int(FoodObj["fat"])
            vitamin = int(FoodObj["vit"])
            calorie = int(FoodObj["cal"])
            weight = float(FoodObj["weight"]) * 1000
        except Exception as err:
            cprint(
                "Unable to get nutrition values for {} from foodData.js.".format(name), "red")
            cprint("Error: {}".format(err), "white", "on_red")

        foodFound = False
        serverFoodContent = ""
        for index, file in enumerate(serverFoodFiles):
            if name == file[:-3]:
                foodFound = True
                #cprint("Match found for {}.".format(name),"green", attrs=['bold'])

                with open(serverFoodPath + file, "r") as serverFood:
                    serverFoodContent = serverFood.read()
                serverFoundIndexes.append(index)

        for file in serverSeedFiles:
            if name == file[:-3]:
                foodFound = True
                #cprint("Match found for {}.".format(name),"green", attrs=['bold'])

                with open(serverSeedPath + file, "r") as serverFood:
                    serverFoodContent = serverFood.read()
        nonlocal counter
        if foodFound == True:

            nutrientsRegex = re.search(
                "new Nutrients\(\) +{ +Carbs += +(\d+), +Fat += +(\d+), +Protein += +(\d+), +Vitamins += +(\d+)", serverFoodContent)

            sCarb = int(nutrientsRegex.group(1))
            sProtein = int(nutrientsRegex.group(3))
            sFat = int(nutrientsRegex.group(2))
            sVitamin = int(nutrientsRegex.group(4))
            sCalorie = int(re.search("Calories.* +(\d+);",
                           serverFoodContent).group(1))
            sWeight = float(re.search("Weight\((\d+)\)",
                            serverFoodContent).group(1))

            try:
                if carb == sCarb and protein == sProtein and fat == sFat and vitamin == sVitamin and calorie == sCalorie and weight == sWeight:
                    #cprint("Values checks out.", "grey", "on_green", attrs=["bold"])
                    counter += 1
                else:
                    cprint("{} values don't match.".format(
                        name), "grey", "on_red")
                    print("c", "p", "f", "v", "cal", "weight")
                    print(carb, protein, fat, vitamin,
                          calorie, weight, " <= EcoDiet")
                    print(sCarb, sProtein, sFat, sVitamin,
                          sCalorie, sWeight, " <= Server")
            except:
                print(name, sCarb, sProtein, sFat, sVitamin,
                      sCalorie, sWeight, " <= Server")
        else:
            cprint("No food found in server files for {}.".format(
                name), "white", "on_red")
            # print(file[:-3])
        #print(name.replace(" ", "").replace('"', ""))

    for food in foodsToCheck:
        checkFood(food)

    if counter == len(foodsToCheck):
        cprint("Confirmed {}/{}.".format(counter, len(foodsToCheck)),
               "grey", "on_green", attrs=['bold'])
    else:
        cprint("Confirmed {}/{}.".format(counter, len(foodsToCheck)),
               "white", "on_red", attrs=['bold'])

    # filter unused foods from all food list from server
    for index in serverFoundIndexes:
        serverFoodFiles[index] = "used"
    unusedFoods = list(filter(lambda a: a != "used", serverFoodFiles))

    ignoredCounter = 0
    # filter filtered foods from rest
    for index, unusedFoodName in enumerate(unusedFoods):
        for ignoredName in options["ignored_foods"]:
            if (unusedFoodName[:-3] == ignoredName):
                unusedFoods[index] = "ignored"
                ignoredCounter += 1
    unusedFoods = list(filter(lambda a: a != "ignored", unusedFoods))

    cprint("Ignored %s foods." % ignoredCounter, "blue")
    cprint("Unused Foods from server files:", "red")
    cprint(unusedFoods, "red")


if __name__ == "__main__":
    main()
