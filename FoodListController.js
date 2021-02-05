/*

Save system

*/

//Turn edit on off
const FoodListController = function() {

    let storedFoodLists = []
    let serverFoodList;

    return {
        init: function() {
            //get saved lists if available
            //get food list from server
            //store them in storedFoodLists
        },
        saveList: function(listName) {
            //get food values from DOM and save it to session storage as food objects
            
        },
        updateList: function(listID) {
            //updates the list from DOM 
        },
        deleteList: function(listID) {
            //delete list from stored food list array
            //update session storage
        },
        loadList: function(listID) {
            //returns food list from id
        },
        importList: function(base64) {
            //import a list from base64 string
            //ability to import multiple lists at a time
        },
        exportAllLists: function() {
            //export storeFoodLists array 
        },
        getFoodLists: function() {
            //returns all saved food lists
            return storedFoodLists
        }
    }

}



//get food objects from session storage and display
function loadFoodList() {

}



class FoodList {
    constructor(listName, food){
        
        this.name = listName;

        const d = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        //id is the time it was created, in miliseconds
        this.id = d.getTime();
        this.foods = food
    }

    exportList() {
        //generate base64 string for the list 
        return this.somethinghere
    }

}
