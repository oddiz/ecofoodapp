function Food (id,foodName,foodType,foodTier,carb,pro,fat,vit,cal,weight) {
   "use strict";
   this.id = id;
   this.name = foodName;
   this.type = foodType;
   this.tier = foodTier
   this.carb = carb;
   this.pro = pro;
   this.fat = fat;
   this.vit = vit;
   this.cal = cal;
   this.weight = weight;
   
}                                       

var foods = {

   campfire: {
           1: new Food (11,"Wheat Porrige", "Campfire", 1.5, ),
           2: new Food (12,"Fried Tomatoes","Campfire", 1.5,),
           3: new Food (13,"Bannock","Campfire", 1.5,),
           4: new Food (14,"Charred Sausage","Campfire", 1.5,),
           5: new Food (15,"Fiddlehead Salad","Campfire", 1.5,),
           6: new Food (16,"Campfire Roast","Campfire", 1.5,),
           7: new Food (17,"Campfire Stew","Campfire",1.5,),
           8: new Food (18,"Wild Stew","Campfire", 1.5,),
           9: new Food (19,"Boiled Shoots","Campfire", 1,),
           10: new Food (110,"Camas Mash","Campfire", 1,),
           11: new Food (111,"Campfire Beans","Campfire", 1,),
           12: new Food (112,"Charred Beet","Campfire", 1,),
           13: new Food (113,"Charred Camas Bulb","Campfire", 1,),
           14: new Food (114,"Charred Corn","Campfire", 1,),
           15: new Food (115,"Charred Fish","Campfire", 1,),
           16: new Food (116,"Charred Meat","Campfire", 1,),
           17: new Food (117,"Charred Tomato","Campfire", 1,),
           18: new Food (118,"Rice Sludge","Campfire", 1,),
           19: new Food (119,"Wilted Witherheads","Campfire", 1,),
        },

   bakery: {
           1: new Food (21,"Camas Bulb Bake","Bakery", 2,),
           2: new Food (22,"Flat Bread", "Bakery", 2,),
           3: new Food (23,"Huckleberry Muffin", "Bakery", 2,),
           4: new Food (24,"Baked Meat", "Bakery", 2,),
           5: new Food (25,"Baked Roast", "Bakery", 2,),
           6: new Food (26,"Meat Pie", "Bakery", 2,),
           7: new Food (27,"Bread", "Bakery", 2.5,),
           8: new Food (28,"Huckleberry Pie", "Bakery", 2,),
           9: new Food (29,"Bearclaw", "Bakery", 2.5,),
           10: new Food (210,"Camas Bread", "Bakery", 2.5,),
           11: new Food (211,"Macaroons", "Bakery", 2.5,),
           12: new Food (212,"Elk Wellington", "Bakery", 2.5,),
   },

   kitchen: {
           1: new Food (31,"Tortilla", "Kitchen", 2.5,),
           2: new Food (32,"Sweet Salad", "Kitchen", 2.5,),
           3: new Food (33,"Crimson Salad", "Kitchen", 2.5,),

   },

   cast_stove: {
           1: new Food (41,"Basic Salad", "Cast iron stove", 2,),
           2: new Food (42,"Fruit Salad", "Cast iron stove", 2,),
           3: new Food (43,"Vegetable Stock", "Cast iron stove", 2,),
           4: new Food (44,"Vegetable Soup", "Cast iron stove", 2,),
           5: new Food (45,"Simmered Meat", "Cast iron stove", 2,),
           6: new Food (46,"Stuffed Turkey", "Cast iron stove", 2,),
           7: new Food (47,"Crispy Bacon", "Cast iron stove", 2,)
   },

   stove: {
           1: new Food (51,"Corn Fritters", "Stove", 2.5,15,7,17,8,500,0.1),
           2: new Food (52,"Seared Meat", "Stove", 2.5,),
           3: new Food (53,"Fried Hare Haunches", "Stove", 2.5,6,15,27,4,700,0.1),
           4: new Food (54,"Elk Taco", "Stove", 2.5,12,15,10,14,650,0.2),
           5: new Food (55,"Boiled Sausage", "Stove", 2.5,0,27,22,0,600,0.3),
           6: new Food (56,"Bear SUPREME", "Stove", 2.5, 8,20,22,10,1200,0.5)
   }
   /* 
   1: new Food(1,"Bear SUPREME","Stove",8,20,22,10,1200,500),
   2: new Food (2,"Fried Hare Haunches","Stove",6,15,27,4,700,100),
   3: new Food (3,"Elk Taco","Stove",12,15,10,14,650,200),
   4: new Food (4,"Boiled Sausage","Stove",0,27,22,0,600,300),
   5: new Food (5,"Corn Fritters","Stove",15,7,17,8,500,100),
   6 : new Food (6,"Elk Wellington", "Bakery",12,20,12,8,1400,500),
   7 : new Food (7,"Macaroons","Bakery", 16,7,14,10,250,200),
   8 : new Food (8,"Bearclaw", "Bakery", 12,6,21,7,650,300),
   9 : new Food (9,"Camas Bread", "Bakery", 15,5,13,9,800,500),
   10 : new Food (10,"Bread", "Bakery", 20, 5,10,5,750,500),
   11 : new Food(11,"Sweet Salad","Kitchen",18,9,7,22,1100,400),
   12 : new Food (12,"Crimson Salad","Kitchen",15,9,12,20,1100,400),
   13 : new Food (13,)
   */
   
};