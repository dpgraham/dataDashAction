for(var i=1; i<=100; i++){
    var out = "";
    if(i%3===0){
        out += "Fizz";
    }

    if(i%5===0){
        out += "Buzz";
    }

    if(!!out){
        console.log(out);
    } else {
        console.log(i);
    }
}