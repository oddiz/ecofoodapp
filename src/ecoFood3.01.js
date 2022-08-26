import React from "react";
import { createRoot } from "react-dom/client";

import { TasteButton } from "./TasteButton";
import { Dropdown } from "@nextui-org/react"
/*jshint esversion: 6 */
require("./style.css");
require("./style-mobile.css");

var Cleave = require("./public/vendor/js/cleave");
var Swal = require("sweetalert2");

var FoodListController = require("./FoodListController");

var menuController = require("./menuController")(FoodListController);
var getFoodFromID = function (id) {
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
};
var UIController = require("./UiController")(menuController, getFoodFromID);

var controller = require("./Controller")(UIController, menuController, FoodListController, getFoodFromID);

controller.init();

const root = createRoot(document.getElementById("taste__button"));
import { NextUIProvider } from "@nextui-org/react";

root.render(
    <NextUIProvider disableBaseline>
        <TasteButton controller={controller} />
        
    </NextUIProvider>
);
