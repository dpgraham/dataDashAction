(function(dataDash){

    dataDash.unitConversions = {};

    dataDash.unitConversions.setUnitFamily = function(unitFamily){
        for(var i=0; i<dataDash.unitConversions.boundElements.length; i++){
            $(dataDash.unitConversions.boundElements).trigger("unitFamilyChange", unitFamily);
        }
    }

    var boundElements = [];

    var UNITS = {
        US: 1,
        METRIC: 2
    }

    var METRIC = {

    }

    var unitConversionBehaviorCallback = function(attrValue){

        // Add this element to the list
        boundElements[boundElements.length] = $(this);

        // Bind to the 'unitFamilyChange' event
        $(this).bind("unitFamilyChange", function(unitFamily){
            var currentValue = $.dataDash(this).getValOrHtml();
            dataDash.unitConversions._convert(currentValue, unitFamily);
        });
    }

    /**
     * Any HTML element with the attribute 'data-dg-productOf'
     */
    dataDash.registerBehavior("productOf", productOfCallback);
    dataDash.registerBehavior("sumOf", sumOfCallback);

}($.dataDash));
