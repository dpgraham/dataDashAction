!function(a){var b=function(a,b){return a=parseFloat(a),b=parseInt(b),b=Math.pow(10,b),parseInt(a*b)/b},c=function(a){a+="";var b=a.indexOf("e+");if(b>=0){for(var c="",d=b+2;d<a.length;d++)c+=a[d];a=a[0]+"."+a[2]+a[3]+"e"+c}else a=a[0]+"."+a[1]+a[2]+"e"+(a.length-1);return a},d=function(a){if(0!==a)if(a+="",a.indexOf("e")<0){for(var b=0;b<a.length&&(0===a[b]||"."===a[b]);b++);var c=-(b-2),d=a[b];a[b+1]&&(d+="."+a[b+1]),a[b+2]&&(d+=a[b+2]),a=d+"e"+c}else{for(var e=a.indexOf("e"),f="",g=e+2;g<a.length;g++)f+=a[g];var h=a[0];"."==a[1]&&(h+="."+a[2],a[3]&&(h+=a[3])),a=h+"e-"+f}return a},e=function(a){a+="";for(var b=a.length-1,c=0;b>=0&&"0"!=a[b];b--)c++;return a=3>=c?a:a.substr(0,a.length-c+3)},f=function(a){a=parseFloat(a);var f=0>a;return a=Math.abs(a),a=a>=1e12?c(a):a>=Math.pow(10,9)?b(a/1e9,2)+"b":a>=Math.pow(10,6)?b(a/1e6,2)+"m":1e-6>a?d(a):1>a?e(a):a,(f?"-":"")+a},g=function(){var a=function(a){return function(b,c){c=c||b&&b.data,"undefined"!=typeof c&&$.dataDash(a).backupValue(c);var d=$.dataDash(a).getValOrHtml();$.dataDash(a).setValOrHtml(f(d),!0)}}(this);$.dataDash(this).change(a),a()},h=function(a){var b=function(b){return function(){var c=1;$(a).each(function(a,b){c*=parseFloat($.dataDash(b).getValOrHtml()||1)}),b.setValOrHtml(c)}}(this);return $(a).change(b),b.call(),this},i=function(a){var b=function(b){return function(){var c=0;$(a).each(function(a,b){c+=parseFloat($.dataDash(b).getValOrHtml()||0)}),b.setValOrHtml(c)}}(this);return $(a).change(b),b.call(),this},j=function(a){$(this).val(b($(this).val(),a));var c=function(){$.dataDash(this).setValOrHtml(b($.dataDash(this).getValOrHtml(),a),!0)};$(this).change(c);var d=function(a,b){return function(){$.dataDash(a).unbind(b)}}(this,c);return d};a.registerBehavior("productOf",h),a.registerBehavior("sumOf",i),a.registerBehavior("roundBy",j),a.registerBehavior("shorthand",g)}($.dataDash);