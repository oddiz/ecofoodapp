module.exports = {

    getFoodFromID(id) {

        var selectedFood;
        try {

            selectedFood = menuController.getAllFoods().find((element) => element.id == id);
            //returns food object

            return selectedFood;
        } catch (error) {
            console.log("Couldn't get foods from menuController trying foodListController. Error: " + error);
        }
        try {
            selectedFood = FoodListController.getActiveFoodList().foods.find((element) => element.id == id);
            //returns food object

            return selectedFood;
        } catch (error) {
            console.log("Couldn't get food list from FoodListController also. Error: " + error);
        }

    },

    searchObjectInArray(property, key, array) {
        if (array === null || array.length === 0) {
            return null
        }
        try {
            var result = array.find((element) => element[property] == key)

            return result
        } catch (error) {
            console.log("Error while searching object in array: " + error);
        }

    }
}