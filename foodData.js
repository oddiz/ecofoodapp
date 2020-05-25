/*eslint-disable camelcase*/
/*eslint-disable no-unused-vars*/

function Food (id,foodName,foodType,foodTier,carb,pro,fat,vit,cal,weight,price) {
    "use strict";
    this.id = id;
    this.name = foodName;
    this.type = foodType;
    this.tier = foodTier;
    this.carb = carb;
    this.pro = pro;
    this.fat = fat;
    this.vit = vit;
    this.cal = cal;
    this.weight = weight;
    this.price = price || 0;
    
}                                       

var foods = {

    campfire: {
        1: new Food(11,"Wheat Porrige", "Campfire",         1.5, 10, 4, 0, 10, 510, 0.2),
        2: new Food(12,"Fried Tomatoes","Campfire",         1.5, 12, 3, 9, 2, 560, 0.2),
        3: new Food(13,"Bannock","Campfire",                1.5, 15, 3, 8, 0, 600, 0.1),
        4: new Food(14,"Charred Sausage","Campfire",        1.5, 0, 11, 15, 0, 500, 0.3),
        5: new Food(15,"Fiddlehead Salad","Campfire",       1.5, 6, 6, 0, 14, 970, 0.2),
        6: new Food(16,"Campfire Roast","Campfire",         1.5, 0, 16, 12, 0, 1000, 0.5),
        7: new Food(17,"Campfire Stew","Campfire",          1.5, 5, 12, 9, 4, 1200, 0.5),
        8: new Food(18,"Wild Stew","Campfire",              1.5, 8, 5, 5, 12, 1200, 0.5),
        9: new Food(19,"Boiled Shoots","Campfire",          1, 3, 0, 1, 9, 510, 0.1),
        10: new Food(110,"Camas Mash","Campfire",           1, 1, 2, 9, 1, 500, 0.1),
        11: new Food(111,"Campfire Beans","Campfire",       1, 2, 3, 7, 1, 510, 0.1),
        12: new Food(112,"Charred Beet","Campfire",         1, 3, 0, 3, 7, 470, 0.1),
        13: new Food(113,"Charred Camas Bulb","Campfire",   1, 2, 3, 7, 1, 510, 0.1),
        14: new Food(114,"Charred Corn","Campfire",         1, 8, 1, 0, 4, 530, 0.1),
        15: new Food(115,"Charred Fish","Campfire",         1, 0, 9, 4, 0, 550, 0.5),
        16: new Food(116,"Charred Meat","Campfire",         1, 0, 10, 10, 0, 550, 0.8),
        17: new Food(117,"Charred Tomato","Campfire",       1, 8, 1, 0, 4, 510, 0.1),
        18: new Food(118,"Rice Sludge","Campfire",          1, 10, 1, 0, 2, 450, 0.1),
        19: new Food(119,"Wilted Witherheads","Campfire",   1, 4, 1, 0, 8, 500, 0.2),
        20: new Food(120,"Charred Agave", "Campfire",       1, 5, 1, 4, 1, 350, 0.1),
        21: new Food(121,"Charred Papaya", "Campfire",      1, 6, 1, 0, 6, 460, 0.1),
        22: new Food(122,"Charred Pineapple", "Campfire",   1, 9, 1, 0, 3, 540, 0.1),
        23: new Food(123,"Charred Taro", "Campfire",        1, 11, 1, 0, 1, 490, 0.1)

    },

    bakery: {
        1: new Food(21,"Camas Bulb Bake","Bakery",         2, 12, 7, 5, 4, 400, 0.3),
        2: new Food(22,"Flat Bread", "Bakery",             2, 17, 8, 3, 0, 500, 0.2),
        3: new Food(23,"Huckleberry Muffin", "Bakery",     2, 10, 5, 4, 11, 450, 0.2),
        4: new Food(24,"Baked Meat", "Bakery",             2, 0, 13, 17, 0, 600, 0.5),
        5: new Food(25,"Baked Roast", "Bakery",            2, 4, 13, 8, 7, 900, 0.5),
        6: new Food(26,"Meat Pie", "Bakery",               2, 7, 11, 11, 5, 1300, 0.6),
        7: new Food(27,"Bread", "Bakery",                  2.5, 20, 5, 10, 5, 750, 0.5),
        8: new Food(28,"Huckleberry Pie", "Bakery",        2, 9, 5, 4, 16, 1300, 0.6),
        9: new Food(29,"Bearclaw", "Bakery",               2.5, 12, 6, 21, 7, 650, 0.3),
        10: new Food(210,"Camas Bread", "Bakery",          2.5, 15, 5, 13, 9, 800, 0.5),
        11: new Food(211,"Macaroons", "Bakery",            2.5, 16, 7, 14, 10, 250, 0.2),
        12: new Food(212,"Elk Wellington", "Bakery",       2.5, 12, 20, 12, 8, 1400, 0.5),
        13: new Food(213,"Baked Agave", "Bakery",          2, 12, 2, 6, 8, 350, 0.3)
    },

    kitchen: {
        1: new Food(31,"Tortilla", "Kitchen",              2.5, 20, 10, 0, 0, 350, 0.1),
        2: new Food(32,"Sweet Salad", "Kitchen",           2.5, 18, 9, 7, 22, 1100, 0.4),
        3: new Food(33,"Crimson Salad", "Kitchen",         2.5, 15, 9, 12, 20, 1100, 0.4),
        4: new Food(34,"Boiled Rice", "Kitchen",           1.5, 13, 2, 0, 0, 210, 0.1),
        5: new Food(35,"Wild Mix", "Kitchen",              2.5, 11, 8, 6, 21, 800, 0.6),
        6: new Food(36,"Pinapple Friend Rice", "Kitchen",  2.5, 20, 12, 12, 9, 620, 0.15)
    },

    cast_stove: {
        1: new Food(41,"Basic Salad", "Cast iron stove",    2, 13, 6, 6, 13, 800, 0.3),
        2: new Food(42,"Fruit Salad", "Cast iron stove",    2, 12, 4, 3, 19, 900, 0.3),
        3: new Food(43,"Vegetable Stock", "Cast iron stove", 2, 11, 1 , 2, 11, 700, 0.8),
        4: new Food(44,"Vegetable Soup", "Cast iron stove", 2, 12, 4, 7, 19, 1200, 0.9),
        5: new Food(45,"Simmered Meat", "Cast iron stove",  2, 6, 18, 13, 5, 900, 0.8),
        6: new Food(46,"Stuffed Turkey", "Cast iron stove", 2, 9, 16, 12, 7, 1500, 1),
        7: new Food(47,"Crispy Bacon", "Cast iron stove",   2, 0, 18, 26, 0, 600, 0.2),
        8: new Food(48,"Vegetable Medley", "Cast iron stove", 2, 8, 4, 7, 17, 900, 0.3)
    },

    stove: {
            1: new Food(51,"Corn Fritters", "Stove",        2.5,15,7,17,8,500,0.1),
            2: new Food(52,"Seared Meat", "Stove",          2.5, 4, 19, 17, 7, 600, 0.5),
            3: new Food(53,"Fried Hare Haunches", "Stove",  2.5,6,15,27,4,700,0.1),
            4: new Food(54,"Elk Taco", "Stove",             2.5,12,15,10,14,650,0.2),
            5: new Food(55,"Boiled Sausage", "Stove",       2.5,0,27,22,0,600,0.3),
            6: new Food(56,"Bear SUPREME", "Stove",         2.5, 8,20,22,10,1200,0.5)
    }

   /*
    * 1: new Food(1,"Bear SUPREME","Stove",8,20,22,10,1200,500),
    * 2: new Food (2,"Fried Hare Haunches","Stove",6,15,27,4,700,100),
    * 3: new Food (3,"Elk Taco","Stove",12,15,10,14,650,200),
    * 4: new Food (4,"Boiled Sausage","Stove",0,27,22,0,600,300),
    * 5: new Food (5,"Corn Fritters","Stove",15,7,17,8,500,100),
    * 6 : new Food (6,"Elk Wellington", "Bakery",12,20,12,8,1400,500),
    * 7 : new Food (7,"Macaroons","Bakery", 16,7,14,10,250,200),
    * 8 : new Food (8,"Bearclaw", "Bakery", 12,6,21,7,650,300),
    * 9 : new Food (9,"Camas Bread", "Bakery", 15,5,13,9,800,500),
    * 10 : new Food (10,"Bread", "Bakery", 20, 5,10,5,750,500),
    * 11 : new Food(11,"Sweet Salad","Kitchen",18,9,7,22,1100,400),
    * 12 : new Food (12,"Crimson Salad","Kitchen",15,9,12,20,1100,400),
    * 13 : new Food (13,)
    */
   
};
