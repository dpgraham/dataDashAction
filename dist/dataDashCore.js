!function(a){a.dataDash=function(b,c){return new a.dataDash.fn.init(b,c)},a.dataDash.fn=a.dataDash.prototype={constructor:a.dataDash},a.dataDash.fn.init=function(b,c){return a.extend(this,a(b,c))},a.dataDash.fn.setValOrHtml=function(b,c){return a.each(this,function(d,e){var f=e.nodeName.toLowerCase();if("input"===f||"textarea"===f){if(a(e).val()==b)return;a(e).val(b)}else{if(a(e).html()==b)return;a(e).html(b)}c||a(e).trigger("change",b)}),this},a.dataDash.fn.getValOrHtml=function(){element=a(this)[0];var b=element.nodeName.toLowerCase(),c=this.attr(a.dataDash.prefix+"value");return"undefined"!=typeof c?c:"input"===b||"textarea"===b?a(element).val():a(element).html()},a.dataDash.fn.init.prototype=a.dataDash.fn,a.dataDash.prefix="data-dg",a.dataDash.BEHAVIORS={},a.dataDash.fn.backupValue=function(b){this.attr(a.dataDash.prefix+"value","undefined"!=typeof b?b:this.getValOrHtml())},a.dataDash.prefix="data-dg-";var b={},c={};a.dataDash.registerBehavior=function(d,e){if(b[d])throw"Could not add behavior '"+eventName+"'. Already registered.";a.dataDash.BEHAVIORS[d]=d;var f=b[d]={};f.callback=e;var g=c[d]={};g.callback=e},a.dataDash.fn.bindBehavior=function(c,d){var e=this.attr(a.dataDash.prefix+c);return"undefined"==typeof e&&(this.attr(a.dataDash.prefix+c,d||""),e=this.attr(a.dataDash.prefix+c)),"function"==typeof b[c].callback&&a(this).each(function(d,f){b[c].callback.call(a.dataDash(f),e)}),this},a.dataDash.fn.unbindBehavior=function(d){return"function"==typeof b[d].callback&&a(this).each(function(b,e){c[d]&&c[d].callback.call(a.dataDash(e))}),this},a.dataDash.fn.bindAllBehaviors=function(){a.each(a.dataDash.BEHAVIORS,function(b){a.dataDash(this).bindBehavior(b)})},a.dataDash.bindBehaviorAll=function(b){if(b){if(!a.dataDash.BEHAVIORS[b])throw"Behavior "+b+" has not been registered";var c=a.dataDash.prefix+b;a.dataDash("*["+c+"]").bindBehavior(b)}else a.each(a.dataDash.BEHAVIORS,function(b){var c=a.dataDash.prefix+b;a.dataDash("*["+c+"]").bindBehavior(b)})}}(jQuery);