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

module.exports = {
    searchObjectInArray: searchObjectInArray
}