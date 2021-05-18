
function getFoodFromID(id) {
	
    var selectedFood;

    selectedFood = FoodListController.getActiveFoodList().foods.find((element) => element.id == id);

	//returns food object
	return selectedFood;
}

function searchObjectInArray(property, key, array) {
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