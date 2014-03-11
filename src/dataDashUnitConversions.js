(function(dataDash){

    /**
     * Unit conversion table. Translate units to a standard unit (mm for length, g for weight)
     */
    var conversion_table = {

        // Translate length to mm
        "mm": [1, "measure"],
        "km": [100000, "measure"],
        "m": [1000, "measure"],
        "cm": [10, "measure"],
        "in": [25.4, "measure"],
        "f": [304.8, "measure"],
        "y": [914.4, "measure"],
        "mi": [1609344, "measure"],

        // Translate weights to grams
        "g": [1, "weight"],
        "oz": [28.3495, "weight"],
        "lbs": [453.592, "weight"],
        "kg": [1000, "weight"],
        "ton": [907185, "weight"],
        "tonne": [1000000, "weight"]

    };

    /**
     * Convert a value to a different unit
     * @param val {number} Current value
     * @param unit_in {string} Current unit
     * @param unit_out {string} Desired unit
     * @param perUnit {boolean} Is the value per unit or number of units?
     * @private
     */
    var _convert = function(val, unit_in, unit_out, perUnit){
        unit_in = unit_in.toLowerCase();
        unit_out = unit_out.toLowerCase();
        val = parseFloat(val);

        // Convert the provided value to 'mm' or 'g'
        var measurement = false;
        var weight = false;

        // Convert unit to intermediary unit of measure
        var factor = conversion_table[unit_in][0];
        var unit_in_measure_type = conversion_table[unit_in][1];
        val = perUnit ? val / factor : val * factor;


        // Convert from intermediary unit of measure to unit_out
        factor = conversion_table[unit_out][0];
        var unit_out_measure_type = conversion_table[unit_out][1];
        if(unit_in_measure_type != unit_out_measure_type){
            throw(unit_in + " and " + unit_out + " are incompatible units of measure");
        }
        return perUnit ? val * factor : val / factor;
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

        $(this).attr($.dataDash.prefix + "prevUnit", $.dataDash(this).attr($.dataDash.prefix + "unit"));

        onUnitFamilyChange = function(evt, unitFamily){
            // What is the current value?
            var currentValue = parseFloat($.dataDash(this).getValOrHtml());

            // What is the current unit of measure?
            var unitIn = $.dataDash(this).attr($.dataDash.prefix + "unit");

            // What is the equivalent unit of measure in the provided unit family?
            // var unitOut = _getEquivalentUnit(unitIn, unitFamily);
            var prev_unit = $(this).attr($.dataDash.prefix + "prevUnit");

            // Are we restoring the unit to it's h
            if(prev_unit && _getEquivalentUnit(prev_unit, unitFamily) == prev_unit){
                unitOut = prev_unit;
            } else {
                unitOut = _getEquivalentUnit(unitIn, unitFamily);
            }

            // Is this value number of units or per unit?
            var perUnit = typeof($(this).attr($.dataDash.prefix + "perUnit"))!="undefined";

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
     * Get the equivalent unit from the opposite unit family
     * @param unit_in
     * @param unit_family
     * @returns {*}
     */
    var equivalentUnitNames = function(unit_in, unit_family){

        unit_family = unit_family && unit_family.toLowerCase();

        var metricToUS = {

            // Length
            "mm": "in",
            "millimeters": "inches",
            "millimeter": "inch",
            "millimetre": "inches",
            "millimetres": "inches",
            "cm": "in",
            "centimeters": "inches",
            "centimeter": "inch",
            "centimetre": "inches",
            "centimetres": "inches",
            "m": "f",
            "meters": "feet",
            "meter": "foot",
            "metre": "foot",
            "metres": "feet",

            // Weight
            "gram": "ounce",
            "grams": "ounces",
            "g": "oz",
            "kg": "lbs",
            "kilogram": "pound",
            "kilograms": "pounds",
            "tonne": "ton",
            "tonnes": "tons",
        }

        var usToMetric = {

            // Length
            "in": "cm",
            "inch": "centimeter",
            "inches": "centimeters",
            "f": "m",
            "feet": "meters",
            "foot": "meter",

            // Weight
            "lbs": "kg",
            "lb": "kg",
            "pounds": "kilograms",
            "pound": "kilogram",
            "ton": "tonne",
            "tons": "tonnes"
        }

        if(unit_family=="us"){
            return metricToUS[unit_in] || unit_in;
        } else if(unit_family=="us"){
            return usToMetric[unit_in] || unit_in;
        } else {
            return metricToUS[unit_in] || usToMetric[unit_in] || unit_in
        }
    }

    /**
     *
     */
    var unitLabelCallback = function(){
        $(this).attr($.dataDash.prefix + "prevUnit", $.dataDash(this).getValOrHtml());
        var onUnitFamilyChange = function(event, unit_family){
            var curr_value = $.dataDash(this).getValOrHtml();
            var prev_unit = $(this).attr($.dataDash.prefix + "prevUnit");
            if(equivalentUnitNames(prev_unit) == curr_value){
                $.dataDash(this).setValOrHtml(prev_unit);
            } else {
                $.dataDash(this).setValOrHtml(equivalentUnitNames(curr_value, unit_family));
            }
        }
        $(this).bind("unitFamilyChange", onUnitFamilyChange);
    }

    /**
     * Any HTML element with the attribute 'data-dg-unit'
     */
    dataDash.registerBehavior("unit", unitConversionBehaviorCallback);
    dataDash.registerBehavior("unitLabel", unitLabelCallback);
    dataDash.registerBehavior("perUnit");
    dataDash.registerBehavior("prevUnit");

}($.dataDash));
