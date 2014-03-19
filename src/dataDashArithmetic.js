(function(dataDash){

    /**
     * Round a value to certain decimal places
     * @param value
     * @param factor
     * @returns {number}
     */
    var _roundBy = function(value, factor){
        value = parseFloat(value);
        factor = parseInt(factor);
        factor = Math.pow(10, factor);
        return parseInt(value * factor) / factor;
    };

    /**
     * Translate a number to exponential form (e.g.: 1.67e10)
     * @param val
     * @private
     */
    var _toExponential = function(val){
        val += "";
        var e_index = val.indexOf("e+");

        // If it's already in exponential, strip out the plus sign
        if(e_index >= 0){
            var exponent_part = "";
            for(var i=e_index+2; i<val.length; i++){
                exponent_part += val[i];
            }
            val = val[0] + "." + val[2] + val[3] + "e" + exponent_part;
        } else {
            val = val[0] + "." + val[1] + val[2] + "e" + (val.length - 1);
        }

        return val;
    };

    /**
     * Convert number to negative exponential form
     * @param val
     * @private
     */
    var _toNegativeExponential = function(val){
        // Less than 0.000001 uses exponential form
        if(val!==0){
            val = val + "";
            if(val.indexOf("e") < 0){
                for(var i=0 ; i<val.length; i++){
                    if(val[i] !== 0 && val[i] !== "."){
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
                for(var i2=e_index+2; i2<val.length; i2++){
                    exponent_part += val[i2];
                }

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

        return val;
    };

    /**
     * For numbers less than zero, leave only three trailing digits
     * @param val
     * @private
     */
    var _toShorthandLessThanZero = function(val){

        // Anything else less than 1 rounds to maximum three digits
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

        return val;
    };

    /**
     * Convert value to shorthand form
     * @param val {number}
     * @returns {string}  Shorthand form
     * @private
     */
    var _toShorthand = function(val){
        val = parseFloat(val);

        // Use an absolute value, we'll restore the sign at the end
        var isNegative = val < 0;
        val = Math.abs(val);

        if(val >= 1000000000000){
            val = _toExponential(val);
        } else if(val >= Math.pow(10,9)){
            val = _roundBy(val / 1000000000, 2) + "b";
        } else if(val >= Math.pow(10,6)){
            val = _roundBy(val / 1000000, 2) + "m";
        } else if (val < 0.000001){
            val = _toNegativeExponential(val);
        } else if(val < 1){
            val = _toShorthandLessThanZero(val);
        } else {
            val = val;
        }

        // Return the value with the sign restored
        return (isNegative ? "-" : "") + val;
    };

    /**
     * Callback that binds the 'shorthand' behavior
     */
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
            };
        }(this);

        $.dataDash(this).change(makeShorthandCallback);
        makeShorthandCallback();
    };

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
                });

                // Set the new value
                ctx.setValOrHtml(product);
            };
        }(this);

        // Bind to change event but also call immediately
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
                });

                // Set the new value
                ctx.setValOrHtml(sum);
            };
        }(this);

        // Bind to change event but also call immediately
        $(attrValue).change(sumOfFunc);
        sumOfFunc.call();

        return this;
    };

    /**
     * Function that binds the 'roundBy' behavior
     * @param attrValue
     */
    var roundByCallback = function(attrValue){

        // Round it right away
        $(this).val( _roundBy($(this).val(), attrValue) );

        // Create the 'onchange' event
        var onChange = function(){
            $.dataDash(this).setValOrHtml( _roundBy($.dataDash(this).getValOrHtml(), attrValue), true );
        };

        $(this).change(onChange);

        var unbindCallback = function(ctx, onChange){
            return function(){
                $.dataDash(ctx).unbind(onChange);
            };
        }(this, onChange);

        return unbindCallback;
    };


    // Register these four behaviors
    dataDash.registerBehavior("productOf", productOfCallback);
    dataDash.registerBehavior("sumOf", sumOfCallback);
    dataDash.registerBehavior("roundBy", roundByCallback);
    dataDash.registerBehavior("shorthand", shorthandFormCallback);


}($.dataDash));
