$(function() {
    $('#container').highcharts({  
    chart: {
        type : 'bar'
    },
    title:{
        text : 'Test chart'
    },
    xAxis: {
        categories:[
            'A', 'B', 'C'
        ]
    },
    yAxis: {
        title :{
            text : 'demo'
        }
    },
    series:[ { 
        name : '1',
        data: [1,0,4]
    }, {
        name: '2',
        data : [5,7,3]
    }]
});
});
