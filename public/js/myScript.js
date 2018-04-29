let state = {
    "now_been_calculated" : null,
    "operation" : "",
    "saved_num" : null
};


function insertNum() {
    console.log(JSON.stringify(state));
    let num = $('#num').val();
    $.post("/insertNum", {_state: JSON.stringify(state), num: num},
        function(data, status){
            console.log(data);
            state = data;
            if(data.saved_num === null){
                document.getElementById("ans").innerHTML = data.now_been_calculated;
            }else {
                document.getElementById("ans").innerHTML = data.saved_num;
            }
        });
}
