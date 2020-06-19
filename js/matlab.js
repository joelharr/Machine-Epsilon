//

function calcEpsilon(){
    
    var eps = 1;
    var cnt = 1;
    
    var x = 1 + eps;
    var results = [];
    while(x > 1){
        eps = eps / 2;
        x = 1 + eps;
        results.push(eps);
        cnt += 1;
    }
    
    return results;
    
}

var epsilons = calcEpsilon();
