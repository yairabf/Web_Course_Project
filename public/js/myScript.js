var currentState = {num: null};
var stageTwo = {num: null};
var cuerrntStage = 1;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function insertNum() {
    var number = $('#num').val();
    var state = $('#stage').val();
    $.post("/insertNum", {state: currentState,num: number},
        function(data, status){
            if(isNumber(number)){
                if(cuerrntStage.valueOf() === 1)
                    stageOne = data;
                else
                    stageTwo = data;
            }
        });
}
