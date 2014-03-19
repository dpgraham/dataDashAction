test( "Test shorthand form behaviour", function(){

    // Add elements with numbers in them to the body
    var s1 = $.dataDash("<div></div>").bindBehavior("shorthand").setValOrHtml(100000000);

    $("body").append([s1]);

    equal(s1.getValOrHtml(), 100000000, "Test that the actual value was backed up");
    equal(s1.html(), "100m", "Test that the shorthand form is 10m");

    s1.setValOrHtml(1560000000);
    equal(s1.getValOrHtml(), 1560000000, "Test that the actual value was backed up");
    equal(s1.html(), "1.56b", "Test that the shorthand for is 1.56b");

    s1.setValOrHtml(1241234342103294123341234142);
    equal(s1.html(), "1.24e27");

    s1.setValOrHtml(912391239312912);
    equal(s1.html(), "9.12e14");

    s1.setValOrHtml(999999999);
    equal(s1.html(), "1000m");

    s1.setValOrHtml(1000000000);
    equal(s1.html(), "1b");

    s1.setValOrHtml(1100000000);
    equal(s1.html(), "1.1b");

    s1.setValOrHtml(1000000);
    equal(s1.html(), "1m");

    s1.setValOrHtml(999999);
    equal(s1.html(), "999999");

    s1.setValOrHtml(0.0000000000000001);
    equal(s1.html(), "1e-16");

    s1.setValOrHtml(0.0000000000000006565656565);
    equal(s1.html(), "6.56e-16");

    s1.setValOrHtml(0.000123123123123);
    equal(s1.html(), "0.000123");

    s1.setValOrHtml(0.00012);
    equal(s1.html(), "0.00012");

    s1.setValOrHtml(0);
    equal(s1.html(), "0");

    s1.setValOrHtml(-100000000);
    equal(s1.html(), "-100m", "Test that the shorthand form is 10m");

    s1.setValOrHtml(-1560000000);
    equal(s1.html(), "-1.56b", "Test that the shorthand for is -1.56b");

    s1.setValOrHtml(-1241234342103294123341234142);
    equal(s1.html(), "-1.24e27");

    s1.setValOrHtml(-912391239312912);
    equal(s1.html(), "-9.12e14");

    s1.setValOrHtml(-999999999);
    equal(s1.html(), "-1000m");

    s1.setValOrHtml(-1000000000);
    equal(s1.html(), "-1b");

    s1.setValOrHtml(-1100000000);
    equal(s1.html(), "-1.1b");

    s1.setValOrHtml(-1000000);
    equal(s1.html(), "-1m");

    s1.setValOrHtml(-999999);
    equal(s1.html(), "-999999");

    s1.setValOrHtml(-0.0000000000000001);
    equal(s1.html(), "-1e-16");

    s1.setValOrHtml(-0.0000000000000006565656565);
    equal(s1.html(), "-6.56e-16");

    s1.setValOrHtml(-0.000123123123123);
    equal(s1.html(), "-0.000123");

    s1.setValOrHtml(-0.00012);
    equal(s1.html(), "-0.00012");

    s1.remove();

});

test( "Test sumOf/productOf on 6 summands/multiplicands, and test roundBy", function() {

    // Add elements with numbers in them to the body
    var s1 = $("<div></div>").html(1).addClass("num");
    var s2 = $("<div></div>").html("2").addClass("num");
    var s3 = $("<div></div>").html(3.2).addClass("num");
    var s4 = $.dataDash("<input>").val(4).addClass("num");
    var s5 = $("<input>").val("5").addClass("num");
    var s6 = $("<input>").val(5.9).addClass("num");

    // Create two elements that bind 'sumOf' and 'productOf'
    var sum = $.dataDash("<div></div>").attr("data-dg-sumOf", ".num");
    var prod = $.dataDash("<div></div>").attr("data-dg-productOf", ".num");
    var sumInp = $.dataDash("<input>").attr("data-dg-sumOf", ".num");
    var prodInp = $.dataDash("<input>").attr("data-dg-productOf", ".num");

    $("body").append([s1,s2,s3,s4,s5,s6,sum,prod,sumInp,prodInp]);

    // Only bind the 'sumOf' behaviour
    $.dataDash.bindBehaviorAll("sumOf");

    // Run tests to see if they were bound correctly
    equal(prod.getValOrHtml(), "", "Product hasn't been bound yet on div");
    equal(prodInp.getValOrHtml(), "", "Product hasn't been bound yet on input");
    equal(sum.getValOrHtml(), 21.1, "Sums add up to 21.1 on div");
    equal(sum.val(), "", "'val' attribute should not be set on a 'div'");
    equal(sum.html(), 21.1, "Test that the HTML of the div was set on the sum");
    equal(sumInp.getValOrHtml(), 21.1, "Sums add up to 21.1 on input");
    equal(sumInp.html(), "", "'html' attribute should not be set on a 'input'");
    equal(sumInp.val(), 21.1, "Test that the val of the input was set on the sum");

    // Now bind ALL of the behaviours
    $.dataDash.bindBehaviorAll();
    equal(prod.getValOrHtml(), 755.2, "Product of the values is 755.2");
    equal(prod.html(), 755.2, "Product of the values is 755.2 on div");
    equal(prodInp.getValOrHtml(), 755.2, "Product of the values is 755.2");
    equal(prodInp.val(), 755.2, "Product of the values is 755.2 on input");
    equal(sum.getValOrHtml(), 21.1, "Sums still add up to 21.1 on div");
    equal(sumInp.getValOrHtml(), 21.1, "Sums still add up to 21.1 on input");

    // Change the value of s1 from 1 to 2
    $.dataDash(s1).setValOrHtml(2);
    equal(sum.getValOrHtml(), 22.1, "Sums add up to 22.1 on div");
    equal(sumInp.getValOrHtml(), 22.1, "Sums add up to 22.1 on input");
    equal(prod.getValOrHtml(), 1510.4, "Prod add up to 1510.4 on div");
    equal(prodInp.getValOrHtml(), 1510.4, "Prod add up to 1510.4 on input");

    // Change s4 from 4 to 2
    $.dataDash(s4).val(2);
    s4.trigger("change"); // have to trigger this programatically
    equal(sum.getValOrHtml(), 20.1, "Sums add up to 20.1 on div");
    equal(sumInp.getValOrHtml(), 20.1, "Sums add up to 20.1 on input");
    equal(prod.getValOrHtml(), 755.2, "Prod add up to 755.2 on div");
    equal(prodInp.getValOrHtml(), 755.2, "Prod add up to 755.2 on input");

    // Test roundBy as well
    sum.bindBehavior("roundBy", 2);
    sumInp.bindBehavior("roundBy", 2);
    prod.bindBehavior("roundBy", 2);
    prodInp.bindBehavior("roundBy", 2);
    $.dataDash(s4).val(2.92345678);
    s4.trigger("change");
    equal(sum.getValOrHtml(), 21.02, "Sums add up to 21.02 on div");
    equal(sumInp.getValOrHtml(), 21.02, "Sums add up to 21.02 on input");
    equal(prod.getValOrHtml(), 1103.9, "Prod still add up to 755.2 on div");
    equal(prodInp.getValOrHtml(), 1103.9, "Prod still add up to 755.2 on input");

    // Clear out elements that were created
    $('.num').remove(); sum.remove(); prod.remove(); sumInp.remove(); prodInp.remove();

});