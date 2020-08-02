var y_data; //global var

var binder = io("http://localhost:9999/data"); //for socket io 
setInterval(function() {
binder.emit('request', {'time': Date.now()});
}, 1000);

setInterval( function() {
binder.on('rtdata', function(data) {
console.log('binder buffered: ', data)
y_data = data.data[0]
console.log(y_data.data)
});} ,1000);

//render char when highchart is ready
$(document).ready(function() {
    Highcharts.chart('container', {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
  
          // set up the updating of the chart each second      
          var series = this.series[0];
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
              //y = Math.random();
              y = y_data
              console.log(y_data);
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
  
    time: {
      useUTC: false
    },
  
    title: {
      text: 'data From flask api -socket.io- '
    },
  
    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 15000,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return 'New point added. Value: ' + newPoint.y;
          }
          return false;
        }
      }
    },
  
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
  
    yAxis: {
      title: {
        text: 'Value'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
  
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },
  
    legend: {
      enabled: true
    },
  
    exporting: {
      enabled: true
    },
  
    series: [{
      name: 'Random data from socket io',
      data: (function () {
        var data = [],
          time = (new Date()).getTime(),
          i;
  
        for (i = -30; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            //y: Math.random()
            y: y_data
          });
        }
        return data;
      }())
    }]
  });
});