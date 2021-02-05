/*eslint-disable camelcase*/
/*eslint-disable no-unused-vars*/

//Updated for 9.1.4

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
        2: new Food(12,"Fried Tomatoes","Campfire",                     1.5, 11, 3, 8, 2, 700, 0.2),//
        3: new Food(13,"Bannock","Campfire",                            1.5, 14, 3, 7, 0, 700, 0.1),//
        4: new Food(14,"Charred Sausage","Campfire",                    1.5, 0, 10, 14, 0, 700, 0.5),//
        6: new Food(16,"Campfire Roast","Campfire",                     1.5, 0, 16, 12, 0, 1000, 0.5),//
        8: new Food(18,"Wild Stew","Campfire",                          1.5, 8, 2, 6, 12, 1100, 0.5),//
        11: new Food(111,"Campfire Beans","Campfire",                   1, 1, 8, 3, 0, 350, 0.1),//
        12: new Food(112,"Charred Beet","Campfire",                     1, 3, 0, 3, 6, 350, 0.1),//
        13: new Food(113,"Charred Camas Bulb","Campfire",               1, 2, 3, 6, 1, 350, 0.1),//
        14: new Food(114,"Charred Corn","Campfire",                     1, 7, 1, 0, 4, 350, 0.1),//
        15: new Food(115,"Charred Fish","Campfire",                     1, 0, 10, 5, 0, 400, 0.5),//
        16: new Food(116,"Charred Meat","Campfire",                     1, 0, 6, 9, 0, 400, 0.8),//
        17: new Food(117,"Charred Tomato","Campfire",                   1, 7, 1, 0, 4, 350, 0.1),//
        19: new Food(119,"Wilted Witherheads","Campfire",               1, 4, 1, 0, 7, 350, 0.2),//
        20: new Food(120,"Charred Agave", "Campfire",                   1, 5, 1, 3, 3, 350, 0.1),//
        21: new Food(121,"Charred Papaya", "Campfire",                  1, 3, 1, 0, 8, 350, 0.1),//
        22: new Food(122,"Charred Pineapple", "Campfire",               1, 8, 1, 0, 3, 350, 0.1),//
        23: new Food(123,"Boiled Grains", "Campfire",                   1, 9, 2, 0, 1, 350, 0.1),//
        24: new Food(124,"Tallow", "Campfire",                          1, 0, 0, 8, 0, 200, 0.02),//
        25: new Food(125,"Charred Cactus Fruit", "Campfire",            1, 4, 0, 2, 6, 200, 0.1),//
        26: new Food(126,"Charred Fireweed Shoots", "Campfire",         1, 5, 1, 0, 6, 350, 0.1),//
        27: new Food(127,"Charred Heart of Palm", "Campfire",           1, 6, 3, 1, 2, 210, 0.1),//
        28: new Food(128,"Charred Mushrooms", "Campfire",               1, 3, 6, 2, 1, 350, 0.1),//
        29: new Food(129,"Charred Taro", "Campfire",                    1, 10, 1, 0, 1, 350, 0.1),//
        30: new Food(130,"Beet Campfire Salad", "Campfire",             1.5, 8, 5, 4, 11, 900, 0.2),//
        31: new Food(131,"Fern Campfire Salad", "Campfire",             1.5, 9, 5, 1, 13, 900, 0.2),//
        32: new Food(132,"Field Campfire Stew", "Campfire",             1.5, 10, 6, 8, 4, 1100, 0.5),//
        33: new Food(133,"Fried Camas", "Campfire",                     1.5, 9, 3, 10, 2, 700, 0.2),//
        34: new Food(134,"Fried Fiddleheads", "Campfire",               1.5, 11, 3, 6, 4, 700, 0.2),//
        35: new Food(135,"Fried Hearts of Palm", "Campfire",            1.5, 11, 3, 8, 2, 700, 0.2),//
        36: new Food(136,"Fried Taro", "Campfire",                      1.5, 14, 1, 8, 1, 700, 0.2),//
        37: new Food(137,"Jungle Campfire Salad", "Campfire",           1.5, 11, 4, 3, 10, 900, 0.2),//
        38: new Food(138,"Jungle Campfire Stew", "Campfire",            1.5, 6, 8, 11, 3, 1100, 0.5),//
        39: new Food(139,"Meaty Stew", "Campfire",                      1.5, 4, 13, 10, 1, 1100, 0.5),//
        40: new Food(140,"Root Campfire Salad", "Campfire",             1.5, 8, 5, 4, 11, 950, 0.2),//
        41: new Food(141,"Root Campfire Stew", "Campfire",              1.5, 6, 8, 9, 5, 1100, 0.5),//
        42: new Food(142,"Topped Porridge", "Campfire",                 1.5, 10, 4, 0, 10, 700, 0.2),//

    },

    bakery: {
        1: new Food(21,"Camas Bulb Bake","Bakery",                      2, 12, 7, 5, 4, 700, 0.3),///
        2: new Food(22,"Flatbread", "Bakery",                           2, 17, 8, 3, 2, 500, 0.2),///
        4: new Food(24,"Baked Meat", "Bakery",                          2, 0, 13, 17, 0, 700, 0.8),///
        5: new Food(25,"Baked Roast", "Bakery",                         2, 4, 13, 10, 7, 1000, 0.9),///
        6: new Food(26,"Meat Pie", "Bakery",                            2, 11, 13, 15, 5, 1300, 0.6),///
        7: new Food(27,"Bread", "Bakery",                               2.5, 20, 5, 10, 5, 750, 0.5),//
        8: new Food(28,"Huckleberry Pie", "Bakery",                     2, 13, 5, 10, 16, 1300, 0.6),//
        9: new Food(29,"Bearclaw", "Bakery",                            2.5, 12, 6, 21, 7, 850, 0.3),//
        10: new Food(210,"Camas Bread", "Bakery",                       2.5, 15, 5, 13, 9, 800, 0.5),//
        11: new Food(211,"Macaroons", "Bakery",                         2.5, 20, 7, 14, 16, 850, 0.2),//
        12: new Food(212,"Elk Wellington", "Bakery",                    2.5, 12, 20, 22, 8, 1400, 0.5),//
        13: new Food(213,"Baked Agave", "Bakery",                       2, 12, 2, 6, 8, 700, 0.3),//
        14: new Food(214,"Baked Corn", "Bakery",                        2, 6, 7, 6, 9, 700, 0.3),//
        15: new Food(215,"Baked Tomato", "Bakery",                      2, 9, 1, 5, 13, 700, 0.3),//
        16: new Food(216,"Baked Taro", "Bakery",                        2, 8, 6, 2, 12, 700, 0.3),//
        17: new Food(217,"Baked Heart of Palm", "Bakery",               2, 12, 6, 4, 6, 700, 0.3),//
        18: new Food(218,"Fruit Muffin", "Bakery",                      2, 10, 5, 4, 16, 800, 0.2),//
        19: new Food(219,"Fruit Tart", "Bakery",                        2.5, 14, 5, 9, 20, 800, 0.4),//
        20: new Food(220,"Pirozhok", "Bakery",                          2.5, 14, 19, 10, 4, 850, 0.4),//
        21: new Food(221,"Stuffed Turkey", "Bakery",                    2.5, 17, 20, 16, 11, 1500, 1),//
        22: new Food(222,"Baked Beet", "Bakery",                        2, 8, 4, 4, 12, 700, 0.3),//
    },

    kitchen: {
        1: new Food(31,"Tortilla", "Kitchen",              2.5, 20, 10, 0, 0, 350, 0.1),//
        2: new Food(32,"Sweet Salad", "Kitchen",           2.5, 18, 9, 7, 22, 1100, 0.4),//
        3: new Food(33,"Crimson Salad", "Kitchen",         2.5, 15, 9, 12, 20, 1100, 0.4),//
        4: new Food(34,"Boiled Rice", "Kitchen",           1.5, 13, 2, 0, 0, 210, 0.1),//
        5: new Food(35,"Wild Mix", "Kitchen",              2.5, 11, 8, 6, 21, 800, 0.6),//
        6: new Food(36,"Pineapple Friend Rice", "Kitchen",  2.5, 20, 12, 12, 9, 620, 0.15),//
    },

    cast_stove: {
        1: new Food(41,"Basic Salad", "Cast iron stove",    2, 18, 6, 4, 10, 800, 0.3),
        2: new Food(42,"Fruit Salad", "Cast iron stove",    2, 12, 4, 3, 19, 900, 0.3),
        3: new Food(43,"Vegetable Stock", "Cast iron stove", 2, 11, 1 , 2, 11, 700, 0.8),
        4: new Food(44,"Vegetable Soup", "Cast iron stove", 2, 12, 4, 7, 19, 1200, 0.9),
        5: new Food(45,"Simmered Meat", "Cast iron stove",  2, 6, 18, 13, 5, 900, 0.8),
        7: new Food(47,"Crispy Bacon", "Cast iron stove",   2, 0, 18, 26, 0, 800, 0.2),
        8: new Food(48,"Vegetable Medley", "Cast iron stove", 2, 8, 4, 7, 17, 900, 0.3)
    },

    stove: {
            1: new Food(51,"Corn Fritters", "Stove",        2.5,15,7,17,8,500,0.1),//
            2: new Food(52,"Seared Meat", "Stove",          2.5, 4, 19, 17, 7, 600, 0.5),//
            3: new Food(53,"Fried Hare Haunches", "Stove",  2.5,6,15,27,4,700,0.1),//
            4: new Food(54,"Elk Taco", "Stove",             2.5,12,15,10,14,650,0.2),//
            5: new Food(55,"Boiled Sausage", "Stove",       2.5,0,27,22,0,600,0.3),//
            6: new Food(56,"Bear SUPREME", "Stove",         2.5, 8,20,22,10,1200,0.5),//
    },
    raw: {
        
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
