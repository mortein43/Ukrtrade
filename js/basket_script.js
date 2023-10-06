function plusOne(id) {
    document.getElementById("count_" + id).innerHTML = parseInt(document.getElementById("count_" + id).innerHTML) + 1;
    document.getElementById("item_count").innerHTML = parseInt(document.getElementById("item_count").innerHTML) + 1;
    document.getElementById("item_sum").innerHTML = parseInt(document.getElementById("item_sum").innerHTML) + parseInt(document.getElementById("sum_" + id).innerHTML);
}

function minusOne(id) {
    if (document.getElementById("count_" + id).innerHTML == 1){
        return;
    }
    document.getElementById("count_" + id).innerHTML = parseInt(document.getElementById("count_" + id).innerHTML) - 1;
    document.getElementById("item_count").innerHTML = parseInt(document.getElementById("item_count").innerHTML) - 1;
    document.getElementById("item_sum").innerHTML = parseInt(document.getElementById("item_sum").innerHTML) - parseInt(document.getElementById("sum_" + id).innerHTML);
}