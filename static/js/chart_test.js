var y_data; //global var
var y_data_1; //global var
var y_data_2; //global var
var y_data_3; //global var

var binder = io("http://localhost:9999/data"); //for socket io 
setInterval(function() {
binder.emit('request', {'time': Date.now()});
}, 1000);

setInterval( function() {
binder.on('rtdata', function(data) {
console.log('binder buffered: ', data)
y_data = data.data[0]
y_data_1 = data.data[1]
y_data_2 = data.data[2]
y_data_3 = data.data[3]
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
          var series_1 = this.series[0];
          var series_2 = this.series[1];
          var series_3 = this.series[2];
          var series_4 = this.series[3];
          //console.log(series)
          // 밑에 series에 어떤 필드명으로 어떤 데이터를 받을지 정의하고... 실시간 이벤트 처리를 위해서
          // 지금 이 부분들에 this로 Series를 바인딩 한 뒤에, series.addPoint <- 메서드를 이용해 실시간으로 point를 추가한다.
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
              //y = Math.random();
            y = y_data
            console.log("this is y", y);
            series_1.addPoint([x, y_data], true, true);
            series_2.addPoint([x, y_data_1], true, true);
            series_3.addPoint([x, y_data_2], true, true);
            series_4.addPoint([x, y_data_3], true, true);
          }, 1000);
        }
      }
    },
  
    time: {
      useUTC: true
    },
  
    title: {
      text: 'data From flask api -socket.io- '
    },

    rangeSelector: {
      selected: 1
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
      name: 'Field_1',
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
    },
    {
      name: 'Field_2',
      data: (function () {
        var data = [],
          time = (new Date()).getTime(),
          i;
  
        for (i = -30; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            //y: Math.random()
            y: y_data_1
          });
        }
        return data;
      }())
    },
    {
      name: 'Field_3',
      data: (function () {
        var data = [],
          time = (new Date()).getTime(),
          i;
  
        for (i = -30; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            //y: Math.random()
            y: y_data_2
          });
        }
        return data;
      }())
    },
    {
      name: 'Field_3',
      data: (function () {
        var data = [],
          time = (new Date()).getTime(),
          i;
  
        for (i = -30; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            //y: Math.random()
            y: y_data_3
          });
        }
        return data;
      }())
    }
  ]
  });
});