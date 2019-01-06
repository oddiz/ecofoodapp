function testMenuAsync (activeMenuArray,rollNumber,foodCount) { /*eslint-ignore-nounused */
   return new Promise((resolve) => {
      "use strict";
        
      function calculateSP (menu) {
               //accepts an array of food objects
               "use strict";
               
               var baseGain = 12;
               var totalCarb = 0;
               var totalProtein = 0;
               var totalFat = 0;
               var totalVitamin = 0;
               var totalCal = 0 ;
               var foodList = "";
               
               for(var i = 0; i < menu.length; i++) {
                     totalCal += menu[i].cal;
                     totalCarb += menu[i].cal * menu[i].carb;
                     totalProtein += menu[i].cal * menu[i].pro;
                     totalFat += menu[i].cal * menu[i].fat;
                     totalVitamin += menu[i].cal * menu[i].vit;
                     foodList = foodList + menu[i].name + "+";
                     }
               var totalTotal = (totalCarb + totalProtein + totalFat + totalVitamin);
               
               var totalAverage =  totalTotal / totalCal;
               
               var maxTotal = Math.max(totalCarb,totalProtein,totalFat,totalVitamin);
               
               var balancedMultiplier = (totalTotal / (maxTotal * 4)) * 2; 
               
               return {
                     SP: baseGain + (totalAverage*balancedMultiplier),
                     foodList: foodList,
                     multiplier: balancedMultiplier,
               };
               
      }
	
      var menu = [];
      var spArray = [];
      var nameArray = [];
      var multiplierArray = [];
      var randomizer = 0;
	
      console.log("usedFoods check " + activeMenuArray);
	
      for(var i = 0; i<rollNumber;i++) {
		
         for (var q=0; q<foodCount; q++){
            
            randomizer = Math.floor(Math.random()*activeMenuArray.length);
            menu.push(activeMenuArray[randomizer]);
            
         }
 
         var result = calculateSP(menu); 
         spArray.push(result.SP);
         nameArray.push(result.foodList);
         multiplierArray.push(result.multiplier);
         menu = [];
      }
        
      function indexOfMax(arr) {
               
         if (arr.length === 0) {
            return -1;
         }
         
         var max = arr[0];
         var maxIndex = 0;

         for (var i = 1; i < arr.length; i++) {
            
            if (arr[i] > max) {
            
               maxIndex = i;
               max = arr[i];
            }
         }
         
         return maxIndex;
      }
	
	
      var indexOfMaxSP = indexOfMax(spArray);
        
        //"3+1+2+4" => [3,1,2,4] 
        var listSplit = nameArray[indexOfMaxSP].split("+");
      //[3,1,2,4] => [1,2,3,4]
        listSplit.sort();
        
      listSplit.shift();
      //console.log(listSplit);

	
      var finalResult = {};
      var foodName = "";
      for (var b=0 ; b<listSplit.length ; b++) {
         
         foodName = listSplit[b];
         
      
         if(finalResult[foodName] >= 0) {
            finalResult[foodName] += 1;
            
         } else {
            finalResult[foodName] = 1;
         }
            
         
      }
	
      console.log(finalResult);
      console.log(spArray[indexOfMaxSP] + " found at " + indexOfMax(spArray) + ". try.");
	
	
      resolve({
         resultMenu: finalResult,
         spAmount: spArray[indexOfMaxSP],
         foundAt: indexOfMax(spArray)+1,
         multiplier: multiplierArray[indexOfMaxSP],
      });
   });
}
