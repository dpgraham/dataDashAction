test( "Test the 'getValOrHtml' is trimming the result", function(){
    var s1 = $.dataDash("<div></div>").setValOrHtml("      ");
    equal("", s1.getValOrHtml());
    s1.setValOrHtml("  123    ");
    equal("123", s1.getValOrHtml());
});
