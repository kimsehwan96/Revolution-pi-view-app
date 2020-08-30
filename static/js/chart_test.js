var y_data; //global var
var y_data_1; //global var
var y_data_2; //global var
var y_data_3; //global var

var binder = io("http://localhost:9999/data"); // 현재 socket io를 이용해 실시간 데이터를 받고 있지만 추후에는 API를 실시간으로 찔러서 받는것으로 -> fetch 이용.
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

//render char when highchart is ready -> jquery 이용해서 HighChart 가 준비되었을 때 아래 로직이 돎 -> 그렇지 않으면 오류 뿜어냄
$(document).ready(function() {
    Highcharts.chart('container', { // Html 상 id가 container 인 태그에 이 차트를 랜더링 할것임.
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE -> 차트 실시간 데이터 업데이트시 에니메이션 할 것인지 아닌지 -> 안하니까 개이상함
      marginRight: 10,
      events: { // 이 evnets 옵션 안에 실시간 데이터 처리를 위한 옵션들이 들어가는 듯. 
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
            y = y_data; // 이거 안쓰는데 지우면 에러남 해결 필요.
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
      text: ' 4 field real time data demo '
    },

    rangeSelector: {
      selected: 1
    },
  
    
    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 150,
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
      enabled: true  //csv , png  등으로 추출하는 기능 (매우 유용)
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
// series라는 배열 안의 옵션들인데... 위에서 events에서 this로 바인딩하는 그것인듯함.
// 여기서 var data = [] 는 초기 데이터를 설정해주는 것인데 없는것으로 처리하기
// data.push 이 밑에 구문은 솔직히 이해가 잘 안감.

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