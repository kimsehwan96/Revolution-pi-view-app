var binder = io("http://localhost:9999/data");
setInterval(function() {
  binder.emit('request', {'time': Date.now()});
}, 1000);
binder.on('rtdata', function(data) {
  console.log('binder buffered: ', data)
  var target = document.querySelector('#value_1')
  target.innerHTML = data.data
});

/* TODO: config.json에 있는 센서 데이터 개수만큼(4개) 표현해야 함. webserver 측에서 배열로 넘겨줘야 함 */