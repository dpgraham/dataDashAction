test( "Test unit conversions", function() {

    // Taken from: http://stackoverflow.com/questions/13177673/decimal-value-assertion-in-q-unit
    // Allows a certain amount of tolerance for decimal errors
    function decEqual(actual, expected, tolerance, message) {
        ok(Math.abs(actual - expected) <= tolerance, message);
    }

    // Add elements with numbers in them to the body
    var s1 = $.dataDash("<div></div>").bindBehavior("unit", "m").setValOrHtml(100);
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
    decEqual(s7.getValOrHtml(), 453.592, 10, "");

    // Clear out elements that were created
    $("*[data-dg-unit]").remove();
});
