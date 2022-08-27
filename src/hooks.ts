import { useEffect, useState } from "react";
import { FoodObject } from "./types";

export const useFoodSearch = (foods: FoodObject[]) => {
    const [query, setQuery] = useState("");
    const [filteredFoods, setFilteredFoods] = useState<FoodObject[]>([]);

    useEffect(() => {
        if (query === "") {
            setFilteredFoods([]);
        } else {
            setFilteredFoods(
                foods.filter((food: FoodObject) => food.name.toUpperCase().includes(query.toUpperCase())).splice(0, 6)
            );
        }
    }, [query]);

    return [setQuery, filteredFoods] as const;
};
