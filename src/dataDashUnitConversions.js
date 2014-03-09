(function(dataDash){

    dataDash.unitConversions = {};

    dataDash.unitConversions.setUnitFamily = function(unitFamily){
        for(var i=0; i<boundElements.length; i++){
            $(dataDash.unitConversions.boundElements).trigger("unitFamilyChange", unitFamily);
        }
    }

    var boundElements = [];


    /**
     * Convert a value to a different unit
     * @param val {number} Current value
     * @param unitIn {string} Current unit
     * @param unitOut {string} Desired unit
     * @param perUnit {boolean} Is the value per unit or number of units?
     * @private
     */
    var _convert = function(val, unitIn, unitOut, perUnit){
        unitIn = unitIn.toLowerCase();
        unitOut = unitOut.toLowerCase();
        val = parseFloat(val);

        // Convert the provided value to 'mm' or 'g'
        var measurement = false;
        var weight = false;


        switch(unitIn){

            // Measurement units
            case "mm": measurement = true; break;
            case "km": val = perUnit ? val / 1000000 : val * 1000000; measurement = true; break;
            case "m": val = perUnit ? val / 1000 : val * 1000; measurement = true; break;
            case "cm": val = perUnit ? val / 100 : val * 100; measurement = true; break;
            case "in": val = perUnit ? val / 25.4 : val * 25.4; measurement = true; break;
            case "f": val = perUnit ? val / 304.8 : val * 304.8; measurement = true; break;
            case "y": val = perUnit ? val / 914.4 : val * 914.4; measurement = true; break;
            case "mi": val = perUnit ? val / 1609344 : val * 1609344; measurement = true; break;

            // Weight units
            case "g": weight = true; break;
            case "oz": val = perUnit ? val / 28.3495 : val * 28.3495; weight = true; break;
            case "lbs": val = perUnit ? val / 453.592 : val * 453.592; weight = true; break;
            case "kg": val = perUnit ? val / 1000 : val * 1000; weight = true; break;
            case "ton": val = perUnit ? val / 1016046.91 : val * 1016046.91; weight = true; break;
            case "tonne": val = perUnit ? val / 1000000 : val * 1000000; weight = true; break;

            default: throw(unitIn + " is invalid");

        }

        var isCompatible;


        switch(unitOut){

            // Measurement units
            case "km": val = perUnit ? val * 1000000 : val / 1000000; isCompatible = measurement; break;
            case "m": val = perUnit ? val * 1000 : val / 1000; isCompatible = measurement; break;
            case "cm": val = perUnit ? val * 10 : val / 10; isCompatible = measurement; break;
            case "mm": isCompatible = measurement; break;

            case "in": val = perUnit ? val * 25.4 : val / 25.4; isCompatible = measurement; break;
            case "f": val = perUnit ? val * 304.8 : val / 304.8; isCompatible = measurement; break;
            case "y": val = perUnit ? val * 914.4 : val / 914.4; isCompatible = measurement; break;
            case "mi": val = perUnit ? val * 1609344 : val / 1609344; isCompatible = measurement; break;

            // Weight units
            case "oz": val = perUnit ? val * 28.3495 : val / 28.3495; isCompatible = weight; break;
            case "lbs": val = perUnit ? val * 453.592 : val / 453.592; isCompatible = weight; break;
            case "ton": val = perUnit ? val * 1016046.91 : val / 1016046.91; isCompatible = weight; break;

            case "g": isCompatible = weight; break;
            case "kg": val = perUnit ? val * 1000 : val / 1000; isCompatible = weight; break;
            case "tonne": val = perUnit ? val * 1000000 : val / 1000000; isCompatible = weight; break;

            default: throw(unitOut + " is invalid");
        }

        // Throw an exception if units are incompatible
        if(!isCompatible){
            throw(unitIn + " and " + unitOut + " are incompatible units of measure");
        }

        // Return the converted unit of measure
        return val;
    };

    /**
     * Get the equivalent unit of measure in a different unit family
     * @param unit
     * @param unitFamilyOut
     * @returns {*}
     * @private
     */
    var _getEquivalentUnit = function(unit, unitFamilyOut){
        unitFamilyOut = unitFamilyOut.toLowerCase();
        if(unitFamilyOut==="us"){
            switch(unit){
                case "mm": return "in";
                case "cm": return "in";
                case "m": return "f";
                case "km": return "mi";
                case "g": return "oz";
                case "kg": return "lbs";
                case "tonne": return "ton";
            }
        } else if(unitFamilyOut==="metric"){
            switch(unit){
                case "in": return "cm";
                case "f": return "m";
                case "y": return "m";
                case "mi": return "kg";
                case "oz": return "g";
                case "lbs": return "kg";
                case "ton": return "tonne";
            }
        }

        return unit;
    };

    /**
     * Bind the unit conversion behavior to a selection of elements
     */
    var unitConversionBehaviorCallback = function(){

        // Add this element to the list
        boundElements[boundElements.length] = $(this);

        onUnitFamilyChange = function(evt, unitFamily){

            // What is the current value?
            var currentValue = parseFloat($.dataDash(this).getValOrHtml());

            // What is the current unit of measure?
            var unitIn = $.dataDash(this).attr($.dataDash.prefix + "unit");

            // What is the equivalent unit of measure in the provided unit family?
            var unitOut = _getEquivalentUnit(unitIn, unitFamily);

            // Is this value number of units or per unit?
            var perUnit = !!$(this).attr($.dataDash.prefix + "perUnit");

            // Set the value to the converted value
            if(unitIn != unitOut){
                $.dataDash(this).setValOrHtml(_convert(currentValue, unitIn, unitOut, perUnit));
                $.dataDash(this).attr($.dataDash.prefix + "unit", unitOut);
                $(this).trigger("change");
            }

        };

        // Bind to the 'unitFamilyChange' event
        $(this).bind("unitFamilyChange", onUnitFamilyChange);
    }

    /**
     *
     */
    var unitLabelCallback = function(){
        $.dataDash(this).backupValue();
        var onUnitFamilyChange = function(){
            // TODO: Write code to handle unit family being changed
        }
        $(this).bind(onUnitFamilyChange);
    }

    /**
     * Any HTML element with the attribute 'data-dg-unit'
     */
    dataDash.registerBehavior("unit", unitConversionBehaviorCallback);
    dataDash.registerBehavior("unitLabel", unitLabelCallback);
    dataDash.registerBehavior("perUnit", function(){});

}($.dataDash));
