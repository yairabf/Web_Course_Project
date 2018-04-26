var state = {
    "now_been_calculated" : null,
    "operation" : "",
    "saved_num" : null
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


function insertNum() {
    console.log(JSON.stringify(state));
    let num = $('#num').val();
    $.post("/insertNum", {_state: JSON.stringify(state), num: num},
        function(data, status){
            console.log(data);
            state = data;
        });
}
