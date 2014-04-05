(function($){

    /**
     * When this element changes the other element(s) need to change to that value,
     * and vice versa
     *
     * @param attrValue
     */
    var mirrorCallback = function(attrValue){

        // The attribute value is a unique key
        var mirror_id = attrValue;

        var onChange = function(mirror_id){
            return function(){
                var value = $.dataDash(this).getValOrHtml();
                $.dataDash("*[data-dg-mirror='" + mirror_id + "']").setValOrHtml(value);
            };
        }(mirror_id);

        $(this).change(onChange);
        $(this).trigger("change");
    };

    $.dataDash.registerBehavior("mirror", mirrorCallback);

}(jQuery));