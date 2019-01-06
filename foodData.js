function Food (id,foodName,foodType,carb,pro,fat,vit,cal,weight) {
   "use strict";
   this.id = id;
   this.name = foodName;
   this.type = foodType;
   this.carb = carb;
   this.pro = pro;
   this.fat = fat;
   this.vit = vit;
   this.cal = cal;
   this.weight = weight;
   
}                                       

//add food database
var foods = {

   campfire: {
           1: new Food (01,"Wheat Porrige", "Campfire", ),
           2: new Food (02,"Fried Tomatoes","Campfire", ),
           3: new Food (03,"Bannock","Campfire", ),
           4: new Food (04,"Charred Sausage","Campfire", ),
           5: new Food (05,"Fiddlehead Salad","Campfire", ),
           6: new Food (06,"Campfire Roast","Campfire", ),
           7: new Food (07,"Campfire Stew","Campfire",),
           8: new Food (08,"Wild Stew","Campfire", ),
   },

   bakery: {
           1: new Food (11,"Camas Bulb Bake","Bakery", ),
           2: new Food (12,"Flat Bread", "Bakery", ),
           3: new Food (13,"Huckleberry Muffin", "Bakery", ),
           4: new Food (14,"Baked Meat", "Bakery", ),
           5: new Food (15,"Baked Roast", "Bakery", ),
           6: new Food (16,"Meat Pie", "Bakery", ),
           7: new Food (17,"Bread", "Bakery", ),
           8: new Food (18,"Huckleberry Pie", ),
           9: new Food (19,"Bearclaw", "Bakery", ),
           10: new Food (110,"Camas Bread", "Bakery", ),
           11: new Food (111,"Macaroons", "Bakery", ),
           12: new Food (112,"Elk Wellington", "Bakery", ),
   },

   kitchen: {
           1: new Food (21,"Tortilla", "Kitchen", ),
           2: new Food (22,"Sweet Salad", "Kitchen", ),
           3: new Food (23,"Crimson Salad", "Kitchen", ),

   },

   cast_stove: {
           1: new Food (31,"Basic Salad", "Cast iron stove", ),
           2: new Food (32,"Fruit Salad", "Cast iron stove", ),
           3: new Food (33,"Vegetable Stock", "Cast iron stove", ),
           4: new Food (34,"Vegetable Soup", "Cast iron stove", ),
           5: new Food (35,"Simmered Meat", "Cast iron stove", ),
           6: new Food (36,"Stuffed Turkey", "Cast iron stove", ),
           7: new Food (37,"Crispy Bacon", "Cast iron stove", )
   },

   stove: {
           1: new Food (41,"Corn Fritters", "Stove", ),
           2: new Food (42,"Seared Meat", "Stove", ),
           3: new Food (43,"Fried Hare Haunches", "Stove", ),
           4: new Food (44,"Elk Taco", "Stove", ),
           5: new Food (45,"Boiled Sausage", "Stove", ),
           6: new Food (46,"Bear S.U.P.R.E.M.E", "Stove", 8,20,22,10,1200,500)
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