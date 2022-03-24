function display_c()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('showTime()',refresh)
}

function showTime() 
{  
    var today = new Date();
    let days = ["Pazar", "Pazartesi", "Sali", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    let dateTime = today.toLocaleTimeString('tr-TR') + ', ' + today.toLocaleDateString('tr-TR') + ' ' + days[today.getDay()];
    document.querySelector("#myClock").innerHTML = dateTime;
    display_c();
}

let user_name = prompt("İsminizi giriniz: ");
console.log(`İsminiz: ${user_name}`)
document.querySelector("#myName").innerHTML = user_name
