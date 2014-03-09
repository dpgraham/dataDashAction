(function(dataDash){

    /**
     * 'productOf' behavior that is bound to element(s)
     * @param attrValue {string} Value of 'data-dg-productOf' which is used as a CSS selector
     * @returns {*}
     */
    var productOfCallback = function(attrValue){

        // Whenever any elements targeted by attrValue change, update the product of this
        var prodOfFunc = function(ctx){
            return function(){

                // Product starts at 1, multiply each value one-by-one
                var product = 1;
                $(attrValue).each(function(idx, element){
                    product = product * parseFloat($.dataDash(element).getValOrHtml() || 1);
                })

                // Set the new value
                ctx.setValOrHtml(product);
                ctx.trigger("change");  // TODO: Is this redundant?
            }
        }(this);

        $(attrValue).change(prodOfFunc);
        prodOfFunc.call();

        return this;
    };

    /**
     * 'sumOf' behavior that is bound to element(s)
     * @param attrValue {string} Value of 'data-dg-sumOf' which is used as a CSS selector
     * @returns {*}
     */
    var sumOfCallback = function(attrValue){
        // Whenever any elements targeted by attrValue change, update the product of this
        var sumOfFunc = function(ctx){
            return function(){

                // Sum starts at 0, multiply each value one-by-one
                var sum = 0;
                $(attrValue).each(function(idx, element){
                    sum += parseFloat($.dataDash(element).getValOrHtml() || 0);
                })

                // Set the new value
                ctx.setValOrHtml(sum);
                ctx.trigger("change");  // TODO: Is this redundant?
            }
        }(this);

        $(attrValue).change(sumOfFunc);
        sumOfFunc.call();

        return this;
    };

    /**
     * Round a value to certain decimal places
     * @param value
     * @param factor
     * @returns {number}
     */
    var roundBy = function(value, factor){
        value = parseFloat(value);
        factor = parseInt(factor);
        var factor = Math.pow(10, factor);
        return parseInt(value * factor) / factor;
    };

    var roundByCallback = function(attrValue){
        $(this).val( roundBy($(this).val(), attrValue) );

        $(this).change(function(){
            $.dataDash(this).setValOrHtml( roundBy($.dataDash(this).getValOrHtml(), attrValue), true );
        });
    };

    var _toShorthand = function(val){
        val = parseFloat(val);
        var isNegative = val < 0;
        val = Math.abs(val);
        console.log(val);

        if(val >= 1000000000000){
            val += "";
            var e_index = val.indexOf("e+");
            if(e_index >= 0){
                var exponent_part = "";
                for(var i=e_index+2; i<val.length; i++){
                    exponent_part += val[i];
                }
                val = val[0] + "." + val[2] + val[3] + "e" + exponent_part;
            } else {
                val = val[0] + "." + val[1] + val[2] + "e" + (val.length - 1);
            }
        } else if(val >= Math.pow(10,9)){
            val = roundBy(val / 1000000000, 2) + "b";

        } else if(val >= Math.pow(10,6)){
            val = roundBy(val / 1000000, 2) + "m";

        } else if (val < 0.000001){

            if(val!=0){
                val = val + "";
                if(val.indexOf("e") < 0){
                    var i = 0;
                    for( ; i<val.length; i++){
                        if(val[i] != 0 && val[i] != "."){
                            break;
                        }
                    }

                    var negExp = -(i - 2);
                    var out = val[i];
                    if(val[i+1]) out += "." + val[i+1];
                    if(val[i+2]) out += val[i+2];

                    val = out + "e" + negExp;
                } else {
                    var e_index = val.indexOf("e");
                    var exponent_part = "";
                    for(var i=e_index+2; i<val.length; i++){
                        exponent_part += val[i];
                    };

                    var output = val[0];
                    if(val[1]=="."){
                        output += "." + val[2];
                        if(val[3]){
                            output += val[3];
                        }
                    }

                    val = output + "e-" + exponent_part;
                }
            }
        } else if(val < 1){
            val = val + "";
            var i = val.length - 1;
            var trailing_chars = 0;
            for( ; i>=0; i--){
                if(val[i]=="0")
                    break;
                trailing_chars++;
            }

            if(trailing_chars<=3){
                val = val;
            } else {
                val = val.substr(0, val.length - trailing_chars + 3);
            }

        } else {
            val = val;
        }

        return (isNegative ? "-" : "") + val;
    }

    var shorthandFormCallback = function(){
        var makeShorthandCallback = function(ctx){
            return function(e, val){

                // If it's an event callback, backup the value that the element was set to
                val = val || (e && e.data);
                if(typeof(val)!="undefined"){
                    $.dataDash(ctx).backupValue(val);
                }

                // Get the current value of the element
                var curr_value = $.dataDash(ctx).getValOrHtml();

                // Set the value to the shorthand form
                $.dataDash(ctx).setValOrHtml(_toShorthand(curr_value), true);
            }
        }(this);

        $.dataDash(this).change(makeShorthandCallback);
        makeShorthandCallback();
    };


    dataDash.registerBehavior("productOf", productOfCallback);
    dataDash.registerBehavior("sumOf", sumOfCallback);
    dataDash.registerBehavior("roundBy", roundByCallback);
    dataDash.registerBehavior("shorthand", shorthandFormCallback);


}($.dataDash));
