test( "Test unit labelling", function(){

    // List of units and their equivalent units
    var test_table = [
        ["us", "m", "f", "metric"],
        ["us", "kg", "lbs", "metric"],
        ["us", "tonne", "ton", "metric"],
        ["us", "tonnes", "tons", "metric"],
        ["us", "cm", "in", "metric"],
        ["us", "centimeters", "inches", "metric"],
        ["us", "millimetres", "inches", "metric"],
        ["us", "g", "oz", "metric"],
        ["us", "kilograms", "pounds", "metric"],
        ["us", "kilogram", "pound", "metric"],
        ["us", "grams", "ounces", "metric"]
    ];

    for(var i = 0; i < test_table.length; i++){
        var s1 = $.dataDash("<div></div>").setValOrHtml(test_table[i][1]).bindBehavior("unitLabel");
        s1.trigger("unitFamilyChange", test_table[i][0]);
        equal(s1.getValOrHtml(), test_table[i][2], test_table[i][1] + " is " + test_table[i][2] + " in " + test_table[i][0]);
        s1.trigger("unitFamilyChange", test_table[i][3]);
        equal(s1.getValOrHtml(), test_table[i][1], "gets restored from " + test_table[i][2] + " to " + test_table[i][1]);
    }

    for(var i = 0; i < test_table.length; i++){
        var s1 = $.dataDash("<div></div>").setValOrHtml(test_table[i][1]).bindBehavior("unitLabel");
        s1.trigger("unitFamilyChange", test_table[i][3]);
        equal(s1.getValOrHtml(), test_table[i][2], test_table[i][1] + " is " + test_table[i][2] + " in " + test_table[i][3]);
        s1.trigger("unitFamilyChange", test_table[i][0]);
        equal(s1.getValOrHtml(), test_table[i][1], "gets restored from " + test_table[i][2] + " to " + test_table[i][1]);
    }
});

test( "Test unit conversions", function() {

    var test_conversions_table = [
        ["m", 100, "f", 328.084],
        ["cm", 10000, "in", 3937.0079],
        ["g", 23.36, "oz", 0.824],
        ["kg", 84.9, "lbs", 187.1725],
        ["tonne", 100, "ton", 110.231],
        ["m", 287656, "f", 943753.281],
        ["cm", 0.00065600072, "in", 0.000258268],
        ["g", 1.33, "oz", 0.0469144],
        ["kg", 0.56, "lbs", 1.23459],
        ["tonne", 1.5676, "ton", 1.72798]
    ];


    // Taken from: http://stackoverflow.com/questions/13177673/decimal-value-assertion-in-q-unit
    // Allows a certain amount of tolerance for decimal errors
    function decEqual(actual, expected, tolerance, message) {
        ok(Math.abs(actual - expected) <= tolerance, message);
    }

    for(var i=0; i<test_conversions_table.length; i++){
        var tc = test_conversions_table;

        // Bind the behaviour as metric by default
        var div = $.dataDash("<div></div>").setValOrHtml(tc[i][1]).bindBehavior("unit", tc[i][0]);

        // Translate to metric (should be no difference)
        div.trigger("unitFamilyChange", "metric");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][1], 10, tc[i][1] + " " + tc[i][0] + " converted to metric, no difference");

        // Translate to us (should be different
        div.trigger("unitFamilyChange", "us");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][3], 10, tc[i][1] + " " + tc[i][0] + " converted to us, should be " + tc[i][3] + " " + tc[i][2]);

        // Bind the behaviour as us by default
        div = $.dataDash("<div></div>").bindBehavior("unit", tc[i][2]).setValOrHtml(tc[i][3]);

        // Translate to us (should be no difference)
        div.trigger("unitFamilyChange", "us");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][3], 10, tc[i][3] + " " + tc[i][2] + " converted to us, no difference");

        // Translate to metric (should be different
        div.trigger("unitFamilyChange", "metric");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][1], 10, tc[i][3] + " " + tc[i][2] + " converted to metric, should be " + tc[i][1] + " " + tc[i][0]);



        // TESTING PER UNIT BEHAVIORS
        div = $.dataDash("<div></div>").bindBehavior("unit", tc[i][0]).bindBehavior("perUnit").setValOrHtml(tc[i][1]);

        // Translate to metric (should be no difference)
        div.trigger("unitFamilyChange", "metric");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][1], 10, tc[i][1] + " " + tc[i][0] + " converted to metric (per unit), no difference");

        // Translate to us (should be different
        div.trigger("unitFamilyChange", "us");
        var expected_value = tc[i][1] / tc[i][3] * tc[i][1];
        decEqual(parseFloat(div.getValOrHtml()), expected_value, 10, tc[i][1] + " " + tc[i][0] + " converted to us (per unit), should be " + tc[i][3] + " " + tc[i][2]);

        // Bind the behaviour as us by default
        div = $.dataDash("<div></div>").bindBehavior("unit", tc[i][2]).bindBehavior("perUnit").setValOrHtml(tc[i][3]);

        // Translate to us (should be no difference)
        div.trigger("unitFamilyChange", "us");
        decEqual(parseFloat(div.getValOrHtml()), tc[i][3], 10, tc[i][3] + " " + tc[i][2] + " converted to us (per unit), no difference");

        // Translate to metric (should be different
        div.trigger("unitFamilyChange", "metric");
        var expected_value = tc[i][3] / tc[i][1] * tc[i][3];
        decEqual(parseFloat(div.getValOrHtml()), expected_value, 10, tc[i][3] + " " + tc[i][2] + " converted to metric (per unit), should be " + expected_value + " " + tc[i][0]);

        // Unbind
        div.unbindBehavior("productOf");
    };

    // Add elements with numbers in them to the body
    /*var s1 = $.dataDash("<div></div>").bindBehavior("unit", "m").setValOrHtml(100);
    var s2 = $.dataDash("<div></div>").bindBehavior("unit", "f").setValOrHtml("5.67");
    var s3 = $.dataDash("<div></div>").bindBehavior("unit", "y").setValOrHtml(0.67);
    var s4 = $.dataDash("<input>").bindBehavior("unit", "mm").setValOrHtml(22.5);
    var s5 = $.dataDash("<input>").bindBehavior("unit", "in").setValOrHtml("20");
    var s6 = $.dataDash("<input>").bindBehavior("unit", "kg").setValOrHtml("100.1");
    var s7 = $.dataDash("<input>").bindBehavior("unit", "lbs").setValOrHtml(1000);


    $("body").append([s1,s2,s3,s4,s5,s6,s7]);

    // Convert to metric
    $("*[data-dg-unit]").trigger("unitFamilyChange", "metric");

    decEqual(s1.getValOrHtml(), 100, 10, "'m' in metric. Should stay the same.");
    decEqual(s2.getValOrHtml(), 1.728216, 10, "5.67 feet is 1.728216");
    decEqual(s3.getValOrHtml(), 0.612648, 10, "");
    decEqual(s4.getValOrHtml(), 22.5, 10, "");
    decEqual(s5.getValOrHtml(), 50.8, 10, "");
    decEqual(s6.getValOrHtml(), 100.1, 10, "");
    decEqual(s7.getValOrHtml(), 453.592, 10, "");*/

    // Clear out elements that were created
    $("*[data-dg-unit]").remove();
});
