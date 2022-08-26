import { FoodObject } from "./types";

export interface TasteData {
    [foodId: number]: number;
}
export class TasteStorageController {
    private MenuController: any;
    constructor(MenuController: any) {
        this.MenuController = MenuController;
    }

    storeTasteData = (data: TasteData) => {
        window.localStorage.setItem("taste_multipliers", JSON.stringify(data));
    };

    getTasteData = (): TasteData => {
        return JSON.parse(window.localStorage.getItem("taste_multipliers")) || {};
    };

    updateFoodTastiness = (foodId: number, taste: number) => {
        const tasteData = this.getTasteData();

        tasteData[foodId] = taste;

        this.storeTasteData(tasteData);

        console.info("Taste data stored.");

        this.MenuController.updateFoodTasteMults();
    };

    clearTasteData = () => {
        this.storeTasteData({});
        this.MenuController.updateFoodTasteMults();
    };
}
