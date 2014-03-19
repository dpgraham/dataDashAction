(function($){

    /**
     * Create the dataDash object.
     * @param selector
     * @param context
     * @returns {$.dataDash.fn.init}
     */
    $.dataDash = function(selector, context){
        return new $.dataDash.fn.init(selector, context);
    };

    /**
     * Re-define the prototype for dataDash
     * @type {{constructor: *}}
     */
    $.dataDash.fn = $.dataDash.prototype = {
        constructor: $.dataDash
    };

    // Define 'init' which is called by the constructor and returns the dataDash object as an extension
    // of the jquery object
    $.dataDash.fn.init = function(selector, context){
        return $.extend(this, $(selector, context));
    };

    /**
     * Helper method that sets either value or html depending on whether the element is a form field or an inline element
     * @param val
     */
    $.dataDash.fn.setValOrHtml = function(val, blockChangeEvent){
        $.each(this, function(idx, element){
            var nodeName = element.nodeName.toLowerCase();
            if(nodeName==="input" || nodeName==="textarea"){
                if($(element).val() == val){
                    return;
                }
                $(element).val(val);
            } else{
                if($(element).html() == val){
                    return;
                }
                $(element).html(val);
            }

            if(!blockChangeEvent){
                $(element).trigger("change", val);
            }
        });

        return this;
    };

    /**
     * Helper method that gets either value or html depending on whether the element is a form field or an inline element
     * @param val
     */
    $.dataDash.fn.getValOrHtml = function(){
        element = $(this)[0];
        var nodeName = element.nodeName.toLowerCase();
        var dataDashValue = this.attr($.dataDash.prefix + "value");

        if(typeof(dataDashValue)!="undefined"){
            return dataDashValue;
        } else if(nodeName==="input" || nodeName==="textarea"){
            return $(element).val();
        } else{
            return $(element).html();
        }
    };

    // Set init's prototype to $.dataDash.fn
    $.dataDash.fn.init.prototype = $.dataDash.fn;

    $.dataDash.prefix = "data-dg";

    $.dataDash.BEHAVIORS = {};

    /**
     * Helper function to backup a value (example: the roundBy function backs up the value in case you need
     * the un-rounded value later)
     */
    $.dataDash.fn.backupValue = function(val){
        this.attr($.dataDash.prefix + "value", typeof(val)!="undefined" ? val : this.getValOrHtml());
    };


    /**
     * STATIC METHODS
     */

    // Prefix that's used to defined 'data-' attributes
    $.dataDash.prefix = "data-dg-";

    // Keep a list of all the registered 'behaviors'
    var behaviors = {};

    // Keep a list of all the unbind functions for the behaviors
    var unbindBehaviors = {};

    /**
     * Add a new behavior to the list
     * @param behaviorName {string} Name of the behavior
     * @param callback
     */
    $.dataDash.registerBehavior = function(behaviorName, callback, unbindCallback){
        if(!!behaviors[behaviorName]){
            throw "Could not add behavior '" + eventName + "'. Already registered.";
        }

        $.dataDash.BEHAVIORS[behaviorName] = behaviorName;
        var behavior = behaviors[behaviorName] = {};
        behavior.callback = callback;

        var unbindBehavior = unbindBehaviors[behaviorName] = {};
        unbindBehavior.callback = callback;
    };

    /**
     * Register a behavior
     * @param behaviorName
     */
    $.dataDash.fn.bindBehavior = function(behaviorName, attrValue){

        // Set the attribute value if one was provided
        var value = this.attr($.dataDash.prefix + behaviorName);
        if(typeof(value)=="undefined"){
            this.attr($.dataDash.prefix + behaviorName, attrValue || "");
            value = this.attr($.dataDash.prefix + behaviorName);
        }

        // Call the function associated with this behavior (if there is one)
        if(typeof(behaviors[behaviorName].callback)=="function"){
            $(this).each(function(idx, element){
                behaviors[behaviorName].callback.call($.dataDash(element), value);
            });
        }

        // Return the object for chaining
        return this;
    };

    $.dataDash.fn.unbindBehavior = function(behaviorName){

        // Call the unbind function associated with this behavior (if there is one)
        if(typeof(behaviors[behaviorName].callback)=="function"){
            $(this).each(function(idx, element){
                if(unbindBehaviors[behaviorName])
                    unbindBehaviors[behaviorName].callback.call($.dataDash(element));
            });
        }

        // Return the object for chaining
        return this;
    };



    /**
     *
     */
    $.dataDash.fn.bindAllBehaviors = function(){

        // Bind all registered behaviors
        $.each($.dataDash.BEHAVIORS, function(behaviorName){
            $.dataDash(this).bindBehavior(behaviorName);
        });
    };
    /**
     * Bind behaviors to all elements that have data-dg<behaviorName> set
     * @param behaviorName {string} Optional. If set, will bind behavior for just the one. Otherwise will bind all behaviors.
     */
    $.dataDash.bindBehaviorAll = function(behaviorName){

        if(!behaviorName){

            // Bind all registered behaviors
            $.each($.dataDash.BEHAVIORS, function(behaviorName){
                var dataAttrName = $.dataDash.prefix + behaviorName;
                $.dataDash("*[" + dataAttrName + "]").bindBehavior(behaviorName);
            });

        } else {

            // Throw exception if it's an unregistered behavior name
            if(!$.dataDash.BEHAVIORS[behaviorName]){
                throw "Behavior " + behaviorName + " has not been registered";
            }

            // Bind the provided behavior
            var dataAttrName = $.dataDash.prefix + behaviorName;
            $.dataDash("*[" + dataAttrName + "]").bindBehavior(behaviorName);
        }
    };


}(jQuery));