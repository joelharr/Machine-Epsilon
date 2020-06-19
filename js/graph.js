// using high charts library (highcharts.js)

function resetGraph(){
    
    document.getElementById("x").innerHTML = "1 + Eps = " + 2;
    document.getElementById("eps").innerHTML = "Epsilon: " + 1;
    document.getElementById("count").innerHTML = "Count: " + 1;
    
    return new Highcharts.chart({

                                     
        chart: {
            renderTo: 'container',
            animation: true,
            width: 650,
            heigth: 400,
        },
        title: {
            text: 'Machine Epsilon'
        },
        

        yAxis: {
            title: {
                text: 'Value of 1 + Epsilon'
            },
             min: 1,
             max: 2,
        },
         tooltip: {
         useHTML: true,
                formatter: function(d){
                            // customize hover box
                             var rV = "Count: " + this.x + "<br/>";
                             rV += "<span style='font-size: 12px'>Epsilon: " + (this.y-1) + "</span><br/>"
                             return rV;
                },
         },

        xAxis: {
                title: {
                    text: 'Count'
                },
                tickInterval: 1,
        },

        plotOptions: {
            line: {
                 dataLabels: {
                     enabled: true
                 },
                 enableMouseTracking: true
            },
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1,
            }
        },

        series: [{
            name: '1+Epsilon',
            data: [2]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
};


var chart = resetGraph();
var nextPoint = 0;
var zoomedIn = false;

function addDataPoint(){
    if(nextPoint >= epsilons.length){
        unzoom();
        clearInterval(repeat);
        return;
        
    }
    var newArray = []
    // form new series
    for(i = 0; i < chart.series[0].data.length; i++){
        newArray.push(chart.series[0].data[i].y)
    }
    
    newArray.push(epsilons[nextPoint]+1);
    
    document.getElementById("x").innerHTML = "1 + Eps = " + (epsilons[nextPoint]+1);
    document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint];
    document.getElementById("count").innerHTML = "Count: " + (nextPoint+2);

    // update the axis to see all data
    let length = chart.series[0].data.length
    
    if(zoomedIn){
        let max = Math.max(1.0000000000004, chart.series[0].data[length - 3].y);
        chart.xAxis[0].setExtremes(nextPoint-2, nextPoint+1);
        chart.yAxis[0].setExtremes(1, max);
    }
    
    // render new data on graph
    chart.series[0].update({
        data: newArray
    }, true);
    nextPoint += 1;
};

function removePoint(){
    
    if(nextPoint <= 1){
        return;
    }
    
    var newArray = [];
    for(i = 0; i < chart.series[0].data.length - 1; i++){
        newArray.push(chart.series[0].data[i].y)
    }
    
    document.getElementById("x").innerHTML = "1 + Eps = " + (epsilons[nextPoint-2]+1);
    document.getElementById("eps").innerHTML = "Epsilon: " + epsilons[nextPoint-2];
    document.getElementById("count").innerHTML = "Count: " + (nextPoint);
    
    // render new data on graph
    chart.series[0].update({
        data: newArray
    }, true);
    nextPoint -= 1;
    
};

function zoom(){
    zoomedIn = true;
    document.getElementById("zoomButton").style.visibility = "hidden";
    document.getElementById("unzoomButton").style.visibility = "visible";
    let length = chart.series[0].data.length;
    if(length > 4){
        // high charts rounds max to 1 when anysmaller than this
        let max = Math.max(1.0000000000004, chart.series[0].data[length - 3].y);
        chart.xAxis[0].setExtremes(nextPoint, nextPoint+2);
        chart.yAxis[0].setExtremes(1, max);
    }
    
};

function unzoom(){
    document.getElementById("unzoomButton").style.visibility = "hidden";
    document.getElementById("zoomButton").style.visibility = "visible";
    zoomedIn = false;
    chart.xAxis[0].setExtremes(null, null);
    chart.yAxis[0].setExtremes(null, null);
    
};


