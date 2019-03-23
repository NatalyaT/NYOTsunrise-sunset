function getRandColor(brightness){

    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)});
    document.body.style.backgroundColor = "rgb(" + rgb.join(",") + ")";
    document.getElementById("advice").style.color = "rgb(" + rgb.join(",") + ")";
    console.log(mixedrgb.join("'"));
}

let request = new XMLHttpRequest();

let result = document.getElementById('dropdown');
let latAndLong = result.options[result.selectedIndex].value;
let splitLatAndLong = latAndLong.split(',');
let url = "https://api.sunrise-sunset.org/json?lat=" +splitLatAndLong[0] + "&lng=" + splitLatAndLong[1];


request.open("GET", url, true);
request.send();


result.addEventListener("change", function() {
    let latAndLong2 = result.options[result.selectedIndex].value;
    splitLatAndLong = latAndLong2.split(',');
    url = "https://api.sunrise-sunset.org/json?lat=" +splitLatAndLong[0] + "&lng=" + splitLatAndLong[1];
    if(result.options[result.selectedIndex].value !== latAndLong)
    {
       // console.log('heard a change')
       request.open("GET", url, true);
       request.send();

       
    }
});

console.log('splitLatAndLong', splitLatAndLong)

request.onload = function() {
    let data = JSON.parse(this.response);
    let sunrise = document.getElementById('sunrise');
    let sunset = document.getElementById('sunset');
    
    if (request.status >= 200 && request.status < 400) {
        sunrise.textContent = convertToEST(data.results.sunrise); 
        sunset.textContent = convertToEST(data.results.sunset);
        getRandColor(12)
    }
};


function convertToEST(utc) {
    
    //let request = new XMLHttpRequest();
    //let url = "http://api.timezonedb.com/v2.1/convert-time-zone?key=SEM2FNLV5SFC&format=xml&from=" +  + "&to=America/New_York&time=" + ;
    
    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":") + 1);
    let est = parseInt(utc, 10) - 5;
    est += ":" + utcMinSec;
    
    return est;
 }
 
//  var color = ["#222f3e", "#f368e0", "#ee5253", "#0abde3", "#10ac84"];
//     function colorChange() {
//     for (let i = 0; i < color.length; i++) {
//         document.querySelector("body").style.backgroundColor = color[i];
//     }
