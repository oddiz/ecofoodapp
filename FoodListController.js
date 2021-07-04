/* eslint-disable no-undef */
/* jshint esversion:6 */
/*

Save system

*/

//Turn edit on off
// eslint-disable-next-line no-unused-vars
const FoodListController = (function() {
    
    function getStoredFoodLists() {
        try {
            let foodLists = JSON.parse(window.localStorage.getItem("food_lists"));
    
            if(foodLists === null) {
                foodLists = [];
            }
    
            return foodLists;
            
        } catch (error) {
            console.log("Error getting stored food lists");

            return [];
        }
    }

    function saveStoredFoodLists() {
        window.localStorage.setItem("food_lists", JSON.stringify(storedFoodLists));
    }
    

    //will return array of foodlist into storedFoodLists
    let storedFoodLists = [];
    const serverFoodList = defaultFoods;



    return {
        init: function() {
            //check stored FoodLists, add server food list
            storedFoodLists = getStoredFoodLists();
            if(searchObjectInArray("listName", "default", getStoredFoodLists()) === null) {
                //if nothing in local storage food lists
                storedFoodLists.push(new FoodList("default", "This is the latest food list from Vanilla Eco.", serverFoodList));
                saveStoredFoodLists();            
            } else {
                

                //update default food list to latest
                storedFoodLists.forEach((list, i) => {
                    if (list.id == 1) {
                        const d = new Date();
                        const months = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December"
                        ];
                        updatedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
                        storedFoodLists[i].date = updatedDate;
                        storedFoodLists[i].foods = serverFoodList;
                    }
                });

                saveStoredFoodLists();
                //this.updateList("default");
                //window.localStorage.setItem(storedFoodLists);
            }
            
            
            
        },
        saveNewList: function(listName, listDesc, foods) {
            
            if (searchObjectInArray("listName", listName, getStoredFoodLists()) === null) {
                storedFoodLists.push(new FoodList(listName, listDesc, foods));
                saveStoredFoodLists();
            } else {
                //if list with same name exists
                console.log("Same name exist.");
            }
            
        },
        updateFood: function(listId, foodId, properties) {
            //find the list
            storedFoodLists = getStoredFoodLists();
            try {
                storedFoodLists.forEach((list) => {
                    if (list.id == listId) {
                        list.foods.forEach((food) => {
                            if (food.id == foodId) {
                                food.name = properties.name;
                                food.type = properties.type;
                                food.tier = properties.tier;
                                food.carb = properties.carb;
                                food.pro = properties.pro;
                                food.fat = properties.fat;
                                food.vit = properties.vit;
                                food.cal = properties.cal;
                                food.weight = properties.weight;
                            }
                        });
                    }
                });

                saveStoredFoodLists();
            } catch (error) {
                console.log("Error while updating food.", error);
            }
        
        },
        deleteFood: function(listId, foodId){
            storedFoodLists = getStoredFoodLists();
            try {
                storedFoodLists.forEach((list,listindex) => {
                    if (list.id == listId) {
                        list.foods.forEach((food, index) => {
                            if (food.id == foodId) {
                                storedFoodLists[listindex].foods.splice(index, 1);
                            }

                        });
                    }
                });
                saveStoredFoodLists();
            } catch (error) {
                console.log("Tried to delete food from list. Error: " + error, listId, foodId);
            }
        },
        addFood: function(listId) {
            storedFoodLists = getStoredFoodLists();
            const d = new Date();
        
            const newFood = {
                "id": d.getTime(),
                "name": "New Food",
                "type": "Food type (Kitchen, Veggy...)",
                "tier": 9001,
                "carb": 0,
                "pro": 0,
                "fat": 0,
                "vit": 0,
                "cal": 0,
                "weight": 0,
                "price": 0
            };

            storedFoodLists.forEach((list, i) => {
                if (list.id == listId) {
                    storedFoodLists[i].foods.push(newFood);
                }
            });

            saveStoredFoodLists();
            console.log(storedFoodLists[0].foods);
        },
        deleteList: function(listID) {
            //delete list from stored food list array
            storedFoodLists = getStoredFoodLists();
            storedFoodLists.forEach(function(flist, index) {
                if (flist.id == listID) {
                    storedFoodLists.splice(index, 1);
                }

            });
            //update session storage
            saveStoredFoodLists();
            
        },
        addList: function(listName, listDesc, listObject) {
            storedFoodLists = getStoredFoodLists();

            let newList;
            if (listObject) {
                newList = new FoodList(listName, listDesc, listObject.foods);
            } else {
                newList = new FoodList(listName, listDesc, []);
            }
            
            storedFoodLists.push(newList);

            saveStoredFoodLists();

        },
        updateList: function (listId, newName, newDesc) {
            storedFoodLists = getStoredFoodLists();
            
            storedFoodLists.forEach((list, index) => {
                if(list.id == listId) {
                    storedFoodLists[index].listName = newName;
                    storedFoodLists[index].listDesc = newDesc;
                }
            });

            saveStoredFoodLists();

        },
        exportList: function(listId) {
            //export base64 string from a list
            selectedList = this.getListFromId(listId);

            return btoa(JSON.stringify(selectedList));

        },
        importList: function(b64string) {
            importedList = JSON.parse(atob(b64string));

        },
        importAllLists: function(base64) {
            //import a list from base64 string
            //ability to import multiple lists at a time
            var importedString = atob(base64);
            var parsedString = JSON.parse(importedString);
            console.log("parsedString")

            parsedString.forEach(function(element) {
                console.log("element")
            })
            window.localStorage.removeItem("food_lists");
            window.localStorage.setItem("food_lists", parsedString);

        },
        exportAllLists: function() {
            //export storeFoodLists array
            storedFoodLists = getStoredFoodLists();
            console.log("object")
            return btoa(JSON.stringify(storedFoodLists));
        },
        getFoodLists: function() {
            //returns all saved food lists
            return getStoredFoodLists();
        },
        getListFromId: function(listId) {
            storedFoodLists = getStoredFoodLists();

            
            const result = searchObjectInArray("id", listId, storedFoodLists);

            return result;
        },
        setFoodLists: function (foodLists) {
            storedFoodLists = foodLists;
            saveStoredFoodLists();
        },
        getActiveFoodList: function () {
            let activeFoodListId = window.localStorage.getItem("active_foodlist");

            if (!activeFoodListId) {
                //if there is no active foodlist data in local storage, default to 1 and set local storage
                activeFoodListId = 1;
                window.localStorage.setItem("active_foodlist", 1);
            }
            const activeFoodList = this.getListFromId(activeFoodListId);
            
            return activeFoodList;
        }

    };

})();


class FoodList {
    constructor(listName, description, food){
        
        this.listName = listName;
        this.listDesc = description;
        const d = new Date();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        this.date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        //id is the time it was created, in miliseconds
        if (listName === "default") {
            this.id = 1;
        } else {
            this.id = d.getTime();
        }
        this.foods = food;
    }

    exportList() {
        //generate base64 string for the list 


        return this;
    }

}
