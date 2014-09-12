var colours = ["red", "green", "blue", "purple", "yellow", "cyan"];

function generateDataPoints(numberOfPoints) {
    return _(numberOfPoints).chain().range().map(function () { return {
        x: _.random(-100, 100),
        y: _.random(-100, 100),
        color: _(colours).sample(),
        tmp: "test",
        
    }; }).value();
};

var allData;
var chart;

function adjustDataPoints(points) {
    var pointsToRemove = Number.parseInt(points);
    chart.options.data[0].dataPoints = allData.slice(pointsToRemove);
    chart.render();
}


window.onload = function () {
    var pointsControl = document.getElementById("NumberOfPoints");
    allData = generateDataPoints(Number.parseInt(pointsControl.max));

    chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,

        title: {
            text: "Import Cost Impact on Business",
        },

        axisX: {
            title: "Ease of Doing Business(1 = most friendly)",
            gridColor: "lightblue",
            gridThickness: 2
        },

        legend: {
            horizontalAlign: "right", // "center" , "right"
            verticalAlign: "top", // "top" , "bottom"
        },

        axisY: {
            title: "Import cost per container",
            titleFontFamily: "arial",
            valueFormatString: "0 USD",
            titleFontSize: 12,

        },

        data: [
            {
                showInLegend: true,
                type: "scatter",
                click: function (datum) { console.log(datum); alert('x: ' + datum.dataPoint.x + ' y: ' + datum.dataPoint.y); },
                //toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span> <br/> <strong>Cost/ container</strong> {y} $<br/> <strong>Ease of Business</strong> {x} ",
                dataPoints: allData.slice(Number.parseInt(pointsControl.value))
            }
        ]
    }); 

    chart.render();
}