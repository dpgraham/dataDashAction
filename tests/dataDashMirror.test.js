test( "Test the mirror functionality", function(){

    // Create two elements and test the behavior
    var s1 = $.dataDash("<div data-dg-mirror='a'></div>").setValOrHtml("hello");
    var s2 = $.dataDash("<div data-dg-mirror='a'></div>");
    $("body").append(s1);
    $("body").append(s2);

    $.dataDash.bindBehaviorAll();
    equal(s2.getValOrHtml(), s1.getValOrHtml());
    s1.setValOrHtml("world");
    equal("world", s1.getValOrHtml());
    equal("world", s2.getValOrHtml());
    s2.setValOrHtml("foo");
    equal("foo", s1.getValOrHtml());
    equal("foo", s2.getValOrHtml());

    s1.remove();
    s2.remove();

    // Create four elements
    s1 = $.dataDash("<div data-dg-mirror='a'></div>").setValOrHtml("hello");
    s2 = $.dataDash("<div data-dg-mirror='a'></div>");
    var s3 = $.dataDash("<div data-dg-mirror='a'></div>");
    var s4 = $.dataDash("<div data-dg-mirror='a'></div>");
    $.dataDash.bindBehaviorAll();
    $("body").append(s1);
    $("body").append(s2);
    $("body").append(s3);
    $("body").append(s4);

    $.dataDash.bindBehaviorAll();
    equal(s2.getValOrHtml(), s1.getValOrHtml());
    equal(s3.getValOrHtml(), s2.getValOrHtml());
    equal(s4.getValOrHtml(), s3.getValOrHtml());
    s1.setValOrHtml("world");
    equal("world", s1.getValOrHtml());
    equal("world", s2.getValOrHtml());
    equal("world", s3.getValOrHtml());
    equal("world", s4.getValOrHtml());
    s2.setValOrHtml("foo");
    equal("foo", s1.getValOrHtml());
    equal("foo", s2.getValOrHtml());
    equal("foo", s3.getValOrHtml());
    equal("foo", s4.getValOrHtml());

    s1.remove();
    s2.remove();
    s3.remove();
    s4.remove();

    // Create four elements of differing types
    s1 = $.dataDash("<input data-dg-mirror='a'>").setValOrHtml("hello");
    s2 = $.dataDash("<div data-dg-mirror='a'></div>");
    s3 = $.dataDash("<p data-dg-mirror='a'></p>");
    s4 = $.dataDash("<textarea data-dg-mirror='a'></textarea>");
    $.dataDash.bindBehaviorAll();
    $("body").append(s1);
    $("body").append(s2);
    $("body").append(s3);
    $("body").append(s4);

    $.dataDash.bindBehaviorAll();
    equal(s2.html(), s1.val());
    equal(s3.html(), s2.html());
    equal(s4.html(), s3.html());
    s1.setValOrHtml("world");
    equal("world", s1.getValOrHtml());
    equal("world", s2.getValOrHtml());
    equal("world", s3.getValOrHtml());
    equal("world", s4.getValOrHtml());
    s2.setValOrHtml("foo");
    equal("foo", s1.getValOrHtml());
    equal("foo", s2.getValOrHtml());
    equal("foo", s3.getValOrHtml());
    equal("foo", s4.getValOrHtml());

    s1.remove();
    s2.remove();
    s3.remove();
    s4.remove();
});
