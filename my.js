<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.0.0-alpha3/Chart.min.js"></script>

function generate() {
    var data = [];
    var names = ['Robert','Orange','Volt','Ink'];
    for(var x = 0; x < (1234); x++) {
        var y = Math.floor(Math.random()*3);
        var z = new Date();
        Math.floor(Math.random() * 2 + 1) == 1 ? z.setDate(x + 1) : '';
        z.setDate(x + 1);
        data.push({
            date : z,
            name : names[ Math.floor(Math.random() * 4) ],
            active : ( (Math.floor(Math.random() * 2 + 1) == 1) ? true : false),
            length : y == 1 ? 60 : y == 2 ? 30 : 15,
            data : {
                tango : Math.random()*20,
                india : Math.random(),
                victor : (Math.random()*20).toFixed(2),
                oscar : Math.floor(Math.random() * (100000 - 5000)) + 5000
            }
        });
    }
    return data;
}

var globaldata = [];
globaldata = generate();
console.log(globaldata);



var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
            label: 'apples',
            data: [12, 19, 3, 17, 6, 3, 7],
            backgroundColor: "rgba(153,255,51,0.4)"
        },{
            label: 'oranges',
            data: [2, 29, 5, 5, 2, 3, 10],
            backgroundColor: "rgba(255,153,0,0.4)"
        }]
    }
});