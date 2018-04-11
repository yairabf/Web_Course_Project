var stageOne = 111111;
var stageTwo = 0;

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function insertNum() {

    var number = $('#num').val();
    var state = $('#stage').val();
    $.post("/insertNum", {num: number, state: state},
        function(data, status){
            if(isNumber(number)){
                stageOne = data;
            }
        });
}
