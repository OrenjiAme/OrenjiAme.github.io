function reset(){
    document.location.reload();
}
function calc(){
    var p1 = Number(document.getElementById("price1").value);
    var p2 = Number(document.getElementById("price2").value);
    var a1 = Number(document.getElementById("s1").value);
    var a2 = Number(document.getElementById("s2").value);
    var a3 = Number(document.getElementById("amountsum").value);
    var taxr = document.form1.taxrate.value;
    var r1 = taxcalc(p1,a1,taxr);
    var r2 = taxcalc(p2,a2,taxr);
    var ps = p1+p2;
    var rs = r1+r2;
    document.getElementById("result1").innerHTML= r1;
    document.getElementById("result2").innerHTML = r2;
    document.getElementById("pricesum").innerHTML = ps;
    document.getElementById("resultsum").innerHTML = rs;

}
function taxcalc(price,amount,tax_rate){
    return Math.floor(price*amount*tax_rate);
}
function amount_reload(){
    var a1 = Number(document.getElementById("s1").value);
    var a2 = Number(document.getElementById("s2").value);
    var a3 = a1+a2;
    document.getElementById("amountsum").innerHTML = "<option value="+a3+">"+a3+"</option>";
}