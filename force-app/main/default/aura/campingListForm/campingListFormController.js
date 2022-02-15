({
    clickCreateItem: function(component, event, helper) {
        let validCampingItem = component.find('campingItem').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validCampingItem){
            // Create the new expense
            let newCampingItem = component.get("v.newItem");
            console.log("Create expense: " + JSON.stringify(newCampingItem));
            helper.createItem(component, newCampingItem);
        }
    },
})
