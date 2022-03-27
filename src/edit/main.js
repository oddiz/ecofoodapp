/* eslint-disable no-undef */
/* jshint esversion:6 */
const UIController = (function(FoodListController) {

    const foodListHtml = 
    `
    <div class="food__list" id=%foodlistid%>
        <i class="ion-gear-a foodlist__update__button"></i>
        <i class="ion-ios-trash-outline foodlist__delete__button"></i>
        <i class="ion-share foodlist__export__button"></i>
        <div class="list__name">%foodlistname%</div>
        <div class="list__description">%foodlistdesc%</div>
        <div class="list__date">%foodlistdate%</div>
    </div>
    `;
    const foodHtml = 
    `
    <div class="food" id="%foodid%">
        <div class="food__name">%foodname%</div>
        <img src="../resources/img/%foodimgid%.png" onerror="this.onerror=null; this.src='../resources/meaticon64.png'">
    </div>
    `;
    const nutritionHtml = 
    `
    <div class="nutrition">
        <div class="nutrition__header">
                <div class="nutrition__title"><input type="text" id="nutrition__title--input" value="%foodname%"></div>
                <div class="nutrition__image"><img src="../resources/img/%foodimgid%.png" onerror="this.onerror=null; this.src='../resources/meaticon64.png'"></div>
        </div>
        <div class="nutrition__content">
            
            <div class="line">
                <p style="color: #e64b17">Carb: </p>
                <input type="text" id="carb--input" value="%carbvalue%">
            </div>
            <div class="line">
                <p style="color: #cd8c11">Protein: </p>
                <input type="text" id="protein--input" value="%proteinvalue%">
            </div>
            <div class="line">
                <p style="color: #ffd21c">Fat: </p>
                <input type="text" id="fat--input" value="%fatvalue%">
            </div>
            <div class="line">
                <p style="color: #7b9a18">Vitamin: </p>
                <input type="text" id="vitamin--input" value="%vitaminvalue%">
            </div>
            <div class="line">
                <p style="color:#005592">Calorie: </p>
                <input type="text" id="calorie--input" value="%calorievalue%">
            </div>
            <div class="line">
                <p style="color:#0067b1">Weight: </p>
                <input type="text" id="weight--input" value="%weightvalue%">
            </div>
            <div class="line">
                <p style="color: #007ed8">Food Type: </p> 
                <input type="text" id="food__type--input" value="%foodtypevalue%">
            </div>
            <div class="line">
                <p style="color: #0092f8">Tier: </p> 
                <input type="text" id="tier--input" value="%foodtiervalue%">
            </div>
        </div>
        <div class="button__container">
            <div class="apply__button__flipper" id="apply__button">
                <div class="apply__button__front-face">Apply Changes</div>
                <div class="apply__button__back-face">Saved</div>
            </div>
            <div class="delete__button" id="delete__button">
                <i class="ion-ios-trash-outline"></i>
            </div>
        </div>
    </div>
    `;

    return {
        init(activeFoodListId){
            //clear html list contents
            document.querySelector(".list1__content").innerHTML = "";
            document.querySelector(".list2__content").innerHTML = "";
            document.querySelector(".list3__content").innerHTML = "";

            //populate list1 (Food-Lists List)
            this.updateList1(activeFoodListId);

            //populate list2 (Foods List)
            this.updateList2(activeFoodListId);

        },
        updateList1: function(activeFoodListId) {
            document.querySelector(".list1__content").innerHTML = "";
            //populates list1 with food-lists
            const foodLists = FoodListController.getFoodLists();
            try {
                foodLists.forEach((foodlist) => {
                    let newFoodListHtml = foodListHtml;
                    newFoodListHtml = newFoodListHtml.replace("%foodlistid%", foodlist.id);
                    newFoodListHtml = newFoodListHtml.replace("%foodlistname%", foodlist.listName);
                    newFoodListHtml = newFoodListHtml.replace("%foodlistdesc%", foodlist.listDesc);
                    newFoodListHtml = newFoodListHtml.replace("%foodlistdate%", foodlist.date);
                    
                    document.querySelector(".list1__content").insertAdjacentHTML("beforeend", newFoodListHtml);

                    if (activeFoodListId == foodlist.id) {
                        document.getElementById(activeFoodListId).classList.add("active");
                    }
                    
                });
                
            } catch (error) {
                console.log("Tried to populate list1, error occured: " + error);
            }
        },
        updateList2: function(activeFoodListId) {
            //Updates list2
            try {
                const activeFoodList = FoodListController.getListFromId(activeFoodListId);
                document.querySelector(".list2__content").innerHTML = "";
                activeFoodList.foods.forEach((food) => {
                    let newFoodHtml = foodHtml;
                    newFoodHtml = newFoodHtml.replace("%foodid%", food.id);
                    newFoodHtml = newFoodHtml.replace("%foodname%", food.name);
                    newFoodHtml = newFoodHtml.replace("%foodimgid%", food.id);
                    
                    document.querySelector(".list2__content").insertAdjacentHTML("afterbegin", newFoodHtml);
    
                });
            } catch (error) {
                document.querySelector(".list2__content").innerHTML = "";
            }
        },
        updateList3: function(listid, foodid) {
            //invoked when clicked on  food on list2
            //highlights selected food and draws food info to list3
            const activeFoodList = FoodListController.getListFromId(listid);
            const selectedFood = searchObjectInArray("id", foodid, activeFoodList.foods);
            document.querySelectorAll(".food").forEach((node) => {
                //remove any active classes
                if (node.classList.contains("active")) {
                    node.classList.remove("active");
                }
                //add active class to selected food
                if (node.id === foodid) {
                    node.classList.add("active");
                }
            });


            let newNutritionHtml = nutritionHtml;
            newNutritionHtml = newNutritionHtml.replace("%foodname%", selectedFood.name);
            newNutritionHtml = newNutritionHtml.replace("%foodimgid%", selectedFood.id);
            newNutritionHtml = newNutritionHtml.replace("%carbvalue%", selectedFood.carb);
            newNutritionHtml = newNutritionHtml.replace("%proteinvalue%", selectedFood.pro);
            newNutritionHtml = newNutritionHtml.replace("%fatvalue%", selectedFood.fat);
            newNutritionHtml = newNutritionHtml.replace("%vitaminvalue%", selectedFood.vit);
            newNutritionHtml = newNutritionHtml.replace("%calorievalue%", selectedFood.cal);
            newNutritionHtml = newNutritionHtml.replace("%weightvalue%", selectedFood.weight);
            newNutritionHtml = newNutritionHtml.replace("%foodtypevalue%", selectedFood.type);
            newNutritionHtml = newNutritionHtml.replace("%foodtiervalue%", selectedFood.tier);

            document.querySelector(".list3__content").innerHTML = newNutritionHtml;
        },
        getFoodNutritionInput() {

            const icarb = document.getElementById("carb--input").value;
            const iprotein = document.getElementById("protein--input").value;
            const ifat = document.getElementById("fat--input").value;
            const ivitamin = document.getElementById("vitamin--input").value;
            const icalorie = document.getElementById("calorie--input").value;
            const iweight = document.getElementById("weight--input").value;
            const itype = document.getElementById("food__type--input").value;
            const itier = document.getElementById("tier--input").value;
            const iname = document.getElementById("nutrition__title--input").value;

            return {
                name: iname,
                type: itype,
                tier: itier,
                carb: icarb,
                pro: iprotein,
                fat: ifat,
                vit: ivitamin,
                cal: icalorie,
                weight: iweight,

            };
        },


    };
})(FoodListController);

const controller= (function(FoodListController, UIController) {

    let activeFoodId = 0;
    let activeFoodListId = 1;
    const eventHandler = function(event) {
        const target = event.target;

        ////// FOOD LISTS //////
        if (target.classList.contains("food__list") || target.parentNode.classList.contains("food__list")) {
            console.log("Food list clicked.");
            listId = target.id || target.parentNode.id;

             // DELETE LIST BUTTON //
            if (target.classList.contains("foodlist__delete__button")) {
                console.log("Delete button clicked. ID: " + listId);
                if (listId == 1) {
                    Swal.fire({
                        icon: 'error',
                        title: "Can't delete default list."
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        text: `Are you sure you want to delete "${FoodListController.getListFromId(listId).listName}?"`,
                        showDenyButton: true,
                        showConfirmButton: true,
                        confirmButtonText: "Yes",
                        denyButtonText: "No",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            FoodListController.deleteList(listId);
                            controller.setActiveFoodListId(1);
                            UIController.updateList1();
                            UIController.updateList2();
                            //clear list3
                            document.querySelector(".list3__content").innerHTML = "";
                        }
                    });
                }

                return;
            }
            // UPDATE LIST BUTTON //
            if (target.classList.contains("foodlist__update__button")) {
                console.log("Update button clicked. ID " + listId);
                if (listId == 1) {
                    Swal.fire({
                        icon: 'error',
                        text: "Can't update default list."
                    });
                } else {
                    const clickedList = FoodListController.getListFromId(listId);
                    Swal.fire({
                        title: "Updating list: " + clickedList.listName,
                        html: 
                        `
                        <span class="update__name__input__container">
                            <p>Name:</p>
                            <input type="text" id="update__list__name" class="swal2-input" placeholder="${clickedList.listName}">
                        </span>
                        <span class="update__desc__input__container">
                            <p>Description:</p>
                            <input type="text" id="update__list__desc" class="swal2-input" placeholder="${clickedList.listDesc}">
                        </span>
                        `,
                        confirmButtonText: 'Save',
                        preConfirm: () => {
                            let listName = Swal.getPopup().querySelector('#update__list__name').value || Swal.getPopup().querySelector('#update__list__name').placeholder;
                            const listDesc = Swal.getPopup().querySelector('#update__list__desc').value || Swal.getPopup().querySelector('#update__list__desc').placeholder;
                            
                            if (listName == "default") {
                                listName = "my default";
                            }

                            return {
                                lName: listName,
                                lDesc: listDesc
                            };
                        }
                    }).then((result) => {
                        const name = result.value.lName;
                        const desc = result.value.lDesc;
                        
                        FoodListController.updateList(listId, name, desc);
                        UIController.updateList1(activeFoodListId);
                        UIController.updateList2(activeFoodListId);
                    });
                }

                return;
            }
            // EXPORT LIST BUTTON //
            if (target.classList.contains("foodlist__export__button")) {
                console.log("Export list button clicked. ID: " + listId);
                listb64 = FoodListController.exportList(listId);

                Swal.fire({
                    input: "textarea",
                    title: `Exporting list: ${FoodListController.getListFromId(activeFoodListId).listName}.`,
                    text: "Copy the below string so you can import it later",
                    inputValue: listb64,
                    showDenyButton: true,
                    confirmButtonText: "Copy to Clipboard",
                    denyButtonText: "Close",
                }).then((result) => {
                    if (result.isConfirmed) {

                        const copyText = document.querySelector(".swal2-textarea");

                        copyText.select();
                        copyText.setSelectionRange(0,9999999);

                        document.execCommand("copy");
                        Swal.fire({
                            icon: 'success',
                            text: "Copied to Clipboard"
                        });
                    }
                }); 
                
            return;
            }

            controller.setActiveFoodListId(listId);

            UIController.updateList1(activeFoodListId);
            UIController.updateList2(activeFoodListId);
            //clear list3
            document.querySelector(".list3__content").innerHTML = "";

            return;
        }
        ////// FOODS //////
        if (target.classList.contains("food") || target.parentNode.classList.contains("food")) {
            console.log("Food clicked.");
            foodid = target.id || target.parentNode.id;
            activeFoodId = foodid;
            UIController.updateList3(activeFoodListId ,activeFoodId);

            
            return;
        }
        ////// ADD FOOD BUTTON //////
        if (target.id === "food__add__button") {
            console.log("Add food button clicked.");

            if (activeFoodListId == 1) {
                Swal.fire({
                    icon: "warning",
                    title: "Can't add foods to default list."
                });
            } else {
                FoodListController.addFood(activeFoodListId);
                UIController.updateList2(activeFoodListId);
            }

            return;
        }

        //// APPLY BUTTON /////
        if (target.parentNode.id === "apply__button") {
            console.log("Apply button clicked.");

            if (activeFoodListId == 1) {
                Swal.fire({
                    icon: "warning",
                    title: "Can't modify foods from default list."
                });
                UIController.updateList2(activeFoodListId);
                UIController.updateList3(activeFoodListId, activeFoodId);
            } else {
                FoodListController.updateFood(activeFoodListId, activeFoodId, UIController.getFoodNutritionInput());
                UIController.updateList2(activeFoodListId);
                UIController.updateList3(activeFoodListId, activeFoodId);
            }

            return;
        }

        ///// DELETE FOOD BUTTON ////
        if (target.parentNode.id === "delete__button" || target.id === "delete__button") {
            console.log("Delete button clicked.");
            if (activeFoodListId == 1) {
                Swal.fire({
                    icon: "warning",
                    title: "Can't delete foods from default list."
                });
            } else {
                FoodListController.deleteFood(activeFoodListId, activeFoodId);
                UIController.updateList2(activeFoodListId);
                //clear list3
                document.querySelector(".list3__content").innerHTML = "";

                return;
            }

        }

        ///// SIDEBAR BUTTONS //////
        // ADD LIST //
        if (target.parentNode.id === "sidebar__button--add__list") {
            console.log("Add list button clicked.");
            FoodListController.addList("New List", "Press gear icon to change name and description.");
            UIController.updateList1(activeFoodListId);

            return; 
        }
        // EXPORT ALL //
        if (target.parentNode.id === "sidebar__button--export__all") {
            console.log("Export all clicked.");
            
            const listb64 = FoodListController.exportAllLists();
            Swal.fire({
                input: "textarea",
                title: `Exporting all the lists.`,
                text: "Copy the below string so you can import it later",
                inputValue: listb64,
                showDenyButton: true,
                confirmButtonText: "Copy to Clipboard",
                denyButtonText: "Close",
            }).then((result) => {
                if (result.isConfirmed) {

                    const copyText = document.querySelector(".swal2-textarea");

                    copyText.select();
                    copyText.setSelectionRange(0,9999999);

                    document.execCommand("copy");
                    Swal.fire({
                        icon: 'success',
                        text: "Copied to Clipboard"
                    });
                }
            }); 

            return;
        }
        // IMPORT ALL //
        if (target.parentNode.id === "sidebar__button--import__all") {
            console.log("Import all clicked.");

            Swal.fire({
                input: "textarea",
                icon: "warning",
                title: "Paste import string below",
                text: "This will replace all the current lists with previously exported lists!",
                confirmButtonText: "Import",
                showDenyButton: true,
                denyButtonText: "Close"
            }).then((result) => {
                if (result.isConfirmed) {
                    const pastedString = result.value;
                    const importedLists = JSON.parse(atob(pastedString));
                    

                    let verified = true
                    try {
                        for(const foodlist of importedLists) {
                            
                            if(!(foodlist.listName || foodlist.listName === "")) {
                                verified = false
                            }
                        }                        
                        
                    } catch (error) {
                        console.log("list cannot be verified")

                        return
                    }

                    if (!verified) {
                        console.log("list not verified")

                        return
                    }
                    window.localStorage.setItem("food_lists", JSON.stringify(importedLists));
                    UIController.updateList1(activeFoodListId);
                    UIController.updateList2(activeFoodListId);
                    
                }
            });

            return;
        }
        
        ///// IMPORT LIST 
        if (target.parentNode.id === "import__list__button") {
            console.log("Import list clicked.");
            
            //import sweetalert prompt

                
            Swal.fire({
                input: "textarea",
                title: "Paste imported string below",
                confirmButtonText: "Import",
                showDenyButton: true,
                denyButtonText: "Close"
            }).then((result) => {
                if (result.isConfirmed) {
                    const pastedString = result.value;
                    const importedList = JSON.parse(atob(pastedString));
                    if (importedList.listName == 'default') {
                        importedList.listName = 'default copy';
                    }
                    FoodListController.addList(importedList.listName, importedList.listDesc, importedList);
                    UIController.updateList1(activeFoodListId);
                    UIController.updateList2(activeFoodListId);
                    UIController.updateList3(activeFoodListId,activeFoodId);
                    
                }
            });
        }

        //// EXPORT LIST
        if (target.parentNode.id === "export__list__button") {
            console.log("Export list clicked.");
            
            
        }
    };


    return {
        init: function() {

            if (window.localStorage.getItem("active_foodlist") === null) {
                window.localStorage.setItem("active_foodlist", "1");
            } else {
                activeFoodListId = window.localStorage.getItem("active_foodlist");
            }

            FoodListController.init();
            try {
                UIController.init(activeFoodListId);
            } catch (error) {
                console.log(`Unable to initialize UIController with give active list id. ID: ${activeFoodListId} Error: ${error}`);
                console.log(`Reverting to default`);
                this.setActiveFoodListId(1);
                UIController.init(activeFoodListId);
            }
            window.addEventListener("click", eventHandler);

            const listid = window.localStorage.getItem("active_foodlist");

            
        },
        setActiveFoodListId(id) {
            activeFoodListId = id;
            window.localStorage.setItem("active_foodlist", id);
        }
    };
})(FoodListController, UIController);

controller.init();
