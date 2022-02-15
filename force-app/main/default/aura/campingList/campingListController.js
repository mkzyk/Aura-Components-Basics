({
    clickCreateItem : function(component, event, helper) {
        let validExpense = component.find('campingItem').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if(validExpense) {
            let newCampingItem = component.get("v.newItem");
            console.log("Before Create camping item: " + JSON.stringify(newCampingItem));
            helper.createItem(component, newCampingItem);
        }
    },
    handleAddItem: function(component, event, helper) {
        let updatedCampingItem = event.getParam("addItem");
        let action = component.get("c.saveItem");
        action.setParams({
            "item": updatedCampingItem
        });
        action.setCallback(this,function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                let items = component.get("v.items");
                items.push(response.getReturnValue());
                component.set("v.items", items);
            }
        });
        $A.enqueueAction(action);
    },
    // Load expenses from Salesforce
    doInit: function(component, event, helper) {
        // Create the action
        let action = component.get("c.getItems");
        console.log(action);
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
})