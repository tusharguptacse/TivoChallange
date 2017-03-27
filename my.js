// global variables
Chart.defaults.global.legend.display = false;
var backgroundColor = []
var borderColor = [];
var metaData = [];
var myBarChart = null;
var mySecChart = null;

var backgroundColorArr = {
    'Robert': 'rgba(255, 99, 132, 0.2)',
    'Orange': 'rgba(54, 162, 235, 0.2)',
    'Volt': 'rgba(255, 206, 86, 0.2)',
    'Ink': 'rgba(75, 192, 192, 0.2)'
};
var borderColorArr = {
    'Robert': 'rgba(255,99,132,1)',
    'Orange': 'rgba(54, 162, 235, 1)',
    'Volt': 'rgba(255, 206, 86, 1)',
    'Ink': 'rgba(75, 192, 192, 1)'
};
var inactiveBorderColor = 'rgba(0, 0, 0, 1)';
var globaldata = generate();

/**
 *
 * @returns {Array} : data which is to be represented
 */

function generate() {
    var data = [];
    for (var x = 0; x < (1234); x++) {
        var names = ['Robert', 'Orange', 'Volt', 'Ink'];
        var y = Math.floor(Math.random() * 3);
        var z = new Date();
        Math.floor(Math.random() * 2 + 1) == 1 ? z.setDate(x + 1) : '';
        z.setDate(x + 1);
        data.push({
            date: z,
            name: names[Math.floor(Math.random() * 4)],
            active: ( (Math.floor(Math.random() * 2 + 1) == 1) ? true : false),
            length: y == 1 ? 60 : y == 2 ? 30 : 15,
            data: {
                tango: Math.random() * 20,
                india: Math.random(),
                victor: (Math.random() * 20).toFixed(2),
                oscar: Math.floor(Math.random() * (100000 - 5000)) + 5000
            }
        });
    }
    return data;
}

/**
 *
 * @param selectedMonth
 * @param selectedYear
 * initializes the main chart with the data corresponding to the given month and year
 */

function init(selectedMonth, selectedYear) {
    var dataLength = globaldata.length;


    var ctx = document.getElementById('myChart');
    var data = {
        labels: Array.apply(null, Array(getMonthLabel(selectedMonth, selectedYear))).map(function (_, i) {
            return i + 1;
        }),
        datasets: [
            {
                label: "Length",
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                data: getData(selectedMonth, selectedYear),

            }
        ]
    };
    var options = {
        title: {
            display: true,
            text: 'Bar Chart'
        },
        scales: {
            xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Days'
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    min: 0,
                    fixedStepSize: 15,
                    max: 90,

                },
                scaleLabel: {
                    display: true,
                    labelString: 'Length'
                }
            }]
        }
    };

    // if there is already a chart present destroy that and create a new one with new data
    if (myBarChart != null) {
        myBarChart.destroy();
    }

    myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options,

    });
    document.getElementById("legendDiv").style.display = 'block';

    // on click event handler for the main bar chart
    ctx.onclick = function (evt) {
        var activePoints = myBarChart.getElementsAtEvent(evt);
        var metaValues = [];
        var metaDict = metaData[activePoints[0]._index];
        createSecondaryGraph(metaDict);
    };


};
/**
 *
 * @param month
 * @param year
 * @returns {number} : the number of days in the given month and year pair
 */

function getMonthLabel(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 *
 * @param month
 * @param year
 * @returns {Array.<T>|*} : data corresponding to the input month and year
 */

function getData(month, year) {

    var arrLen = getMonthLabel(month, year);
    var results = Array(arrLen).fill(0);
    var index = 0;
    for (var d in globaldata) {
        var date = new Date(globaldata[d].date);
        if ((date.getMonth() + 1) == month && date.getFullYear() == year) {
            index = date.getDate() - 1;
            results[index] = globaldata[d].length;
            backgroundColor[index] = backgroundColorArr[globaldata[d].name];
            borderColor[index] = borderColorArr[globaldata[d].name];
            if(!globaldata[d].active){
                borderColor[index] = inactiveBorderColor;
            }
            metaData[index] = globaldata[d].data;
        }

    }
    return results;
}
/**
 * this function creates the secondary graph.
 * @param metaData : data to be shown on the secondary
 */

function createSecondaryGraph(metaData) {
    var india = metaData['india'];
    var indPer = india * 100;
    var oscar = metaData['oscar'];
    var oscPer = ((oscar - 5000) / 95000) * 100;
    var tango = metaData['tango'];
    var tanPer = (tango / 20.00) * 100;
    var victor = parseFloat(metaData['victor']);
    var vicPer = (victor / 20.00) * 100;

    var customToolTips = function (tooltip) {
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = "<table></table>"
            this._chart.canvas.parentNode.appendChild(tooltipEl);
        }

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        if (tooltip.body) {
            var titleLines = tooltip.title || [];
            var bodyLines = tooltip.body.map(getBody);
            var innerHtml = '<thead>';
            titleLines.forEach(function (title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
            });
            innerHtml += '</thead><tbody>';
            bodyLines.forEach(function (body, i) {
                var colors = tooltip.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                var content = "Value: ";
                switch (titleLines[0]) {
                    case "tango":
                        content += tango;
                        break;
                    case "india":
                        content += india;
                        break;
                    case "victor":
                        content += victor;
                        break;
                    case "oscar":
                        content += oscar;
                        break;
                    default:
                }
                body[0] = content;
                innerHtml += '<tr><td>' + span + body + '</td></tr>';
            });
            innerHtml += '</tbody>';
            var tableRoot = tooltipEl.querySelector('table');
            tableRoot.innerHTML = innerHtml;
        }
    };

    var secCtx = document.getElementById('mySecondaryChart');
    if (mySecChart != null) {
        mySecChart.destroy();
    }
    mySecChart = new Chart(secCtx, {
        type: 'line',
        data: {
            labels: ['tango', 'india', 'victor', 'oscar'],
            datasets: [{
                label: 'Percentage',
                data: [tanPer, indPer, vicPer, oscPer],
                backgroundColor: "rgba(153,255,51,0.4)"
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Line Chart - Data field'
            },
            tooltips: {
                enabled: true,
                mode: 'index',
                position: 'nearest',
                custom: customToolTips
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Data'
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0.0,
                        max: 100.0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage'
                    }
                }]
            }
        }
    });
    document.getElementById("secDiv").style.display = 'block';
}

// Date Picker JQuery handler
$('.date-picker').datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    dateFormat: 'MM yy',
    onClose: function (dateText, inst) {
        function isDonePressed() {
            return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
        }

        if (isDonePressed()) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
            init(inst.selectedMonth + 1, inst.selectedYear);
        }

    }
});
