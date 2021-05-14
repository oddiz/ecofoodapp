/*eslint-disable camelcase*/
/*eslint-disable no-unused-vars*/

/*Updated for 9.2*/

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
        2: new Food(12,"Fried Tomatoes","Campfire",                     2, 11, 3, 8, 2, 700, 0.2),
        3: new Food(13,"Bannock","Campfire",                            2, 14, 3, 7, 0, 700, 0.1),
        4: new Food(14,"Charred Sausage","Campfire",                    2, 0, 10, 14, 0, 700, 0.5),
        6: new Food(16,"Campfire Roast","Campfire",                     2, 0, 16, 12, 0, 1000, 0.5),
        8: new Food(18,"Wild Stew","Campfire",                          2, 8, 2, 6, 12, 1100, 0.5),
        11: new Food(111,"Charred Beans","Campfire",                   1, 1, 8, 3, 0, 350, 0.1),
        12: new Food(112,"Charred Beet","Campfire",                     1, 3, 0, 3, 6, 350, 0.1),
        13: new Food(113,"Charred Camas Bulb","Campfire",               1, 2, 3, 6, 1, 350, 0.1),
        14: new Food(114,"Charred Corn","Campfire",                     1, 7, 1, 0, 4, 350, 0.1),
        15: new Food(115,"Charred Fish","Campfire",                     1, 0, 10, 5, 0, 400, 0.5),
        16: new Food(116,"Charred Meat","Campfire",                     1, 0, 6, 9, 0, 400, 0.8),
        17: new Food(117,"Charred Tomato","Campfire",                   1, 7, 1, 0, 4, 350, 0.1),
        19: new Food(119,"Wilted Fiddleheads","Campfire",               1, 4, 1, 0, 7, 350, 0.2),
        20: new Food(120,"Charred Agave", "Campfire",                   1, 5, 1, 3, 3, 350, 0.1),
        21: new Food(121,"Charred Papaya", "Campfire",                  1, 3, 1, 0, 8, 350, 0.1),
        22: new Food(122,"Charred Pineapple", "Campfire",               1, 8, 1, 0, 3, 350, 0.1),
        23: new Food(123,"Boiled Grains", "Campfire",                   1, 9, 2, 0, 1, 350, 0.1),
        24: new Food(124,"Tallow", "Campfire",                          1, 0, 0, 8, 0, 200, 0.02),
        25: new Food(125,"Charred Cactus Fruit", "Campfire",            1, 4, 0, 2, 6, 200, 0.1),
        26: new Food(126,"Charred Fireweed Shoots", "Campfire",         1, 5, 1, 0, 6, 350, 0.1),
        27: new Food(127,"Charred Heart Of Palm", "Campfire",           1, 6, 3, 1, 2, 210, 0.1),
        28: new Food(128,"Charred Mushrooms", "Campfire",               1, 3, 6, 2, 1, 350, 0.1),
        29: new Food(129,"Charred Taro", "Campfire",                    1, 10, 1, 0, 1, 350, 0.1),
        30: new Food(130,"Beet Campfire Salad", "Campfire",             2, 8, 5, 4, 11, 900, 0.2),
        31: new Food(131,"Fern Campfire Salad", "Campfire",             2, 9, 5, 1, 13, 900, 0.2),
        32: new Food(132,"Field Campfire Stew", "Campfire",             2, 10, 6, 8, 4, 1100, 0.5),
        33: new Food(133,"Fried Camas", "Campfire",                     2, 9, 3, 10, 2, 700, 0.2),
        34: new Food(134,"Fried Fiddleheads", "Campfire",               2, 11, 3, 6, 4, 700, 0.2),
        35: new Food(135,"Fried Hearts Of Palm", "Campfire",            2, 11, 3, 8, 2, 700, 0.2),
        36: new Food(136,"Fried Taro", "Campfire",                      2, 14, 1, 8, 1, 700, 0.2),
        37: new Food(137,"Jungle Campfire Salad", "Campfire",           2, 11, 4, 3, 10, 900, 0.2),
        38: new Food(138,"Jungle Campfire Stew", "Campfire",            2, 6, 8, 11, 3, 1100, 0.5),
        39: new Food(139,"Meaty Stew", "Campfire",                      2, 4, 13, 10, 1, 1100, 0.5),
        40: new Food(140,"Root Campfire Salad", "Campfire",             2, 8, 5, 4, 11, 950, 0.2),
        41: new Food(141,"Root Campfire Stew", "Campfire",              2, 6, 8, 9, 5, 1100, 0.5),
        42: new Food(142,"Topped Porridge", "Campfire",                 2, 10, 4, 0, 10, 700, 0.2),

    },

    bakery: {
        1: new Food(21,"Camas Bulb Bake","Bakery",                      3, 12, 7, 5, 4, 700, 0.3),
        2: new Food(22,"Flatbread", "Bakery",                           3, 17, 8, 3, 2, 500, 0.2),
        4: new Food(24,"Baked Meat", "Bakery",                          3, 0, 13, 17, 0, 700, 0.8),
        5: new Food(25,"Baked Roast", "Bakery",                         3, 4, 13, 10, 7, 1000, 0.9),
        6: new Food(26,"Meat Pie", "Bakery",                            3, 11, 13, 15, 5, 1300, 0.6),
        7: new Food(27,"Bread", "Bakery",                               4, 20, 5, 10, 5, 750, 0.5),
        8: new Food(28,"Huckleberry Pie", "Bakery",                     3, 13, 5, 10, 16, 1300, 0.6),
        9: new Food(29,"Bearclaw", "Bakery",                            4, 12, 6, 21, 7, 850, 0.3),
        10: new Food(210,"Camas Bread", "Bakery",                       4, 15, 5, 13, 9, 800, 0.5),
        11: new Food(211,"Macaroons", "Bakery",                         4, 20, 7, 14, 16, 850, 0.2),
        12: new Food(212,"Elk Wellington", "Bakery",                    4, 12, 20, 22, 8, 1400, 0.5),
        13: new Food(213,"Baked Agave", "Bakery",                       3, 12, 2, 6, 8, 700, 0.3),
        14: new Food(214,"Baked Corn", "Bakery",                        3, 6, 7, 6, 9, 700, 0.3),
        15: new Food(215,"Baked Tomato", "Bakery",                      3, 9, 1, 5, 13, 700, 0.3),
        16: new Food(216,"Baked Taro", "Bakery",                        3, 8, 6, 2, 12, 700, 0.3),
        17: new Food(217,"Baked Heart Of Palm", "Bakery",               3, 12, 6, 4, 6, 700, 0.3),
        18: new Food(218,"Fruit Muffin", "Bakery",                      3, 10, 5, 4, 16, 800, 0.2),
        19: new Food(219,"Fruit Tart", "Bakery",                        4, 14, 5, 9, 20, 800, 0.4),
        20: new Food(220,"Pirozhok", "Bakery",                          4, 14, 19, 10, 4, 850, 0.4),
        21: new Food(221,"Stuffed Turkey", "Bakery",                    4, 17, 20, 16, 11, 1500, 0.5),
        22: new Food(222,"Baked Beet", "Bakery",                        3, 8, 4, 4, 12, 700, 0.3),
    },

    kitchen: {
        1: new Food(31,"Tortilla", "Kitchen",                           4, 20, 10, 0, 0, 350, 0.1),
        2: new Food(32,"Sweet Salad", "Kitchen",                        4, 18, 9, 7, 22, 1100, 0.4),
        3: new Food(33,"Crimson Salad", "Kitchen",                      4, 15, 9, 12, 20, 1100, 0.4),
        4: new Food(34,"Boiled Rice", "Kitchen",                        2, 13, 2, 0, 0, 210, 0.1),
        5: new Food(35,"Wild Mix", "Kitchen",                           4, 11, 8, 6, 21, 800, 0.6),
        6: new Food(36,"Pineapple Friend Rice", "Kitchen",              4, 20, 12, 12, 9, 620, 0.15),
    },

    cast_stove: {
        1: new Food(41,"Basic Salad", "Cast iron stove",                3, 18, 6, 4, 10, 800, 0.3),
        2: new Food(42,"Fruit Salad", "Cast iron stove",                3, 12, 4, 3, 19, 900, 0.3),
        3: new Food(43,"Vegetable Stock", "Cast iron stove",            3, 11, 1 , 2, 11, 700, 0.8),
        4: new Food(44,"Vegetable Soup", "Cast iron stove",             3, 12, 4, 7, 19, 1200, 0.9),
        5: new Food(45,"Simmered Meat", "Cast iron stove",              3, 6, 18, 13, 5, 900, 0.8),
        7: new Food(47,"Crispy Bacon", "Cast iron stove",               3, 0, 18, 26, 0, 800, 0.4),
        8: new Food(48,"Vegetable Medley", "Cast iron stove",           3, 8, 4, 7, 17, 900, 0.3)
    },

    stove: {
            1: new Food(51,"Corn Fritters", "Stove",                    4,15,7,17,8,500,0.1),
            2: new Food(52,"Seared Meat", "Stove",                      4, 4, 19, 17, 7, 600, 0.5),
            3: new Food(53,"Fried Hare Haunches", "Stove",              4,6,15,27,4,700,0.1),
            4: new Food(54,"Elk Taco", "Stove",                         4,12,15,10,14,650,0.2),
            5: new Food(55,"Boiled Sausage", "Stove",                   4,0,27,22,0,600,0.3),
            6: new Food(56,"Bear S U P R E M E", "Stove",                     4, 8,20,22,10,1200,0.5),
    },
    raw: {
        1: new Food(61,"Corn", "Raw",                                   0, 4, 1, 0, 3, 230, 0.01),
        2: new Food(62,"Beet","Raw",                                    0, 2, 0, 2, 4, 230, 0.01),
        3: new Food(63,"Wheat","Raw",                                   0, 6, 2, 0, 0, 150, 0.01),
        4: new Food(64,"Agave Leaves","Raw",                            0, 3, 1, 2, 2, 200, 0.01),
        5: new Food(65,"Beans","Raw",                                   0, 1, 4, 3, 0, 150, 0.01),
        6: new Food(66,"Bolete Mushrooms","Raw",                        0, 2, 4, 1, 1, 200, 0.01),
        7: new Food(67,"Camas Bulb","Raw",                              0, 1, 2, 5, 0, 150, 0.01),
        8: new Food(68,"Cookeina Mushrooms","Raw",                      0, 2, 4, 1, 1, 200, 0.01),
        9: new Food(69,"Crimini Mushrooms","Raw",                       0, 2, 4, 1, 1, 200, 0.01),
        10: new Food(610,"Fiddleheads","Raw",                           0, 2, 1, 0, 5, 150, 0.01),
        11: new Food(611,"Fireweed Shoots","Raw",                       0, 3, 1, 0, 4, 150, 0.01),
        12: new Food(612,"Giant Cactus Fruit","Raw",                    0,2, 0, 2, 4, 100, 0.01),
        13: new Food(613,"Heart Of Palm","Raw",                         0, 4, 2, 0, 2, 100, 0.01),
        14: new Food(614,"Pineapple","Raw",                             0, 6, 0, 0, 2, 200, 0.01),
        15: new Food(615,"Prickly Pear Fruit","Raw",                    0, 2, 1, 1, 4, 190, 0.01),
        16: new Food(616,"Pumpkin","Raw",                               0, 5, 1, 0, 2, 340, 0.1),
        17: new Food(617,"Taro Root","Raw",                             0, 6, 1, 0, 1, 250, 0.01),
        18: new Food(618,"Raw Meat","Raw",                              0, 0, 4, 8, 0, 250, 0.1),
        19: new Food(619,"Tallow","Raw",                                0, 0, 0, 8, 0, 200, 0.02),
        20: new Food(620,"Oil","Raw",                                   0, 0, 0, 15, 0, 120, 0.1),
        21: new Food(621,"Scrap Meat","Raw",                            0, 0, 5, 5, 0, 50, 0.01),
        22: new Food(622,"Tomato","Raw",                                0, 5, 1, 0, 2, 240, 0.01),
        23: new Food(623,"Huckleberries","Raw",                         0, 2, 0, 0, 6, 150, 0.01),
        24: new Food(624,"Beet Greens","Raw",                           0, 3, 1, 0, 4, 100, 0.01),
        25: new Food(625,"Rice","Raw",                                  0, 7, 1, 0, 0, 150, 0.01),
        26: new Food(626,"Papaya", "Raw",                               0, 2, 1, 0, 5, 200, 0.01)
    }
};
