var binder = io("http://localhost:9999/data");
setInterval(function() {
  binder.emit('request', {'time': Date.now()});
}, 1000);
binder.on('rtdata', function(data) {
  console.log('binder buffered: ', data)
  var target = document.querySelector('#value_1')
  target.innerHTML = data.data
});
