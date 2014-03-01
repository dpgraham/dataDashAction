(function(dataDash){

    /**
     * 'productOf' behavior that is bound to element(s)
     * @param attrValue {string} Value of 'data-dg-productOf' which is used as a CSS selector
     * @returns {*}
     */
    var productOfCallback = function(attrValue){

        // Whenever any elements targeted by attrValue change, update the product of this
        $(attrValue).change(function(ctx){
            return function(){

                // Product starts at 1, multiply each value one-by-one
                var product = 1;
                $(attrValue).each(function(idx, element){
                    product = product * parseFloat($(element).val() || $(element).html() || 1);
                })

                // Set the new value
                ctx.setValOrHtml(product);
                ctx.trigger("change");
            }
        }(this));

        return this;
    };

    /**
     * 'sumOf' behavior that is bound to element(s)
     * @param attrValue {string} Value of 'data-dg-sumOf' which is used as a CSS selector
     * @returns {*}
     */
    var sumOfCallback = function(attrValue){
        // Whenever any elements targeted by attrValue change, update the product of this
        $(attrValue).change(function(ctx){
            return function(){

                // Sum starts at 0, multiply each value one-by-one
                var sum = 0;
                $(attrValue).each(function(idx, element){
                    sum += parseFloat($(element).val() || $(element).html() || 0);
                })

                // Set the new value
                ctx.setValOrHtml(sum);
                ctx.trigger("change");
            }
        }(this));

        return this;
    };

    var roundBy = function(value, factor){
        value = parseFloat(value);
        factor = parseInt(factor);
        var factor = Math.pow(10, factor);
        return parseInt(value * factor) / factor;
    };

    var roundByCallback = function(attrValue){
        $(this).val( roundBy($(this).val(), attrValue) );
        $(this).change(function(){
            $(this).val( roundBy($(this).val(), attrValue) );
        });
    };


    dataDash.registerBehavior("productOf", productOfCallback);
    dataDash.registerBehavior("sumOf", sumOfCallback);
    dataDash.registerBehavior("roundBy", roundByCallback);


}($.dataDash));
