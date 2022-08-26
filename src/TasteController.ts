import { FoodObject } from "./types";


interface TasteData {
    [foodId: number]: number;
}
export class TasteController {
    private MenuController: any;
    private foods: FoodObject[];
    constructor(MenuController: any) {
        this.foods = MenuController.getAllFoods();
        this.MenuController = MenuController;
    }

    storeTasteData = (data: TasteData) => {
        window.localStorage.setItem("taste_multipliers",(JSON.stringify(data)))
    }

    getTasteData = (): TasteData => {
        return JSON.parse(window.localStorage.getItem("taste_multipliers")) || {};
    };

    updateFoodTastiness = (foodId: number, taste: number) => {
        const tasteData = this.getTasteData();

        tasteData[foodId] = taste;

        this.storeTasteData(tasteData);
    }

    clearTasteData = () => {
        this.storeTasteData({})
    }


}
