var binder = io("http://localhost:9999/data");
setInterval(function() {
  binder.emit('request', {'time': Date.now()});
}, 1000);

setInterval( function() {
binder.on('rtdata', function(data) {
  console.log('binder buffered: ', data)
  var target = document.getElementById('data_1')
  var target_2 = document.getElementById('data_2')
  var target_3 = document.getElementById('data_3')
  var target_4 = document.getElementById('data_4')
  console.log(target)
  target.innerHTML = data.data[0] + '\nmmAQ'
  target_2.innerHTML = data.data[1] + '\nA'
  target_3.innerHTML = data.data[2] + '\nA'
  target_4.innerHTML = data.data[3] + '\n℃'
});} ,1000);

var profiler = io("http://localhost:9999/profile");
profiler.emit('sensor_name',{'null':'None'});
function get_profile() {
  profiler.on('sensor_name', function(profile) {
    console.log('get_data', profile)
    var sensor_name = document.getElementById('sensor_name')
    var sensor_name_2 = document.getElementById('sensor_name_2')
    var sensor_name_3 = document.getElementById('sensor_name_3')
    var sensor_name_4 = document.getElementById('sensor_name_4')
    console.log(profile)
    sensor_name.innerHTML = profile.name[0]
    sensor_name_2.innerHTML = profile.name[1]
    sensor_name_3.innerHTML = profile.name[2]
    sensor_name_4.innerHTML = profile.name[3]
  })
}
get_profile()

/* TODO: config.json의 필드개수(센서개수)에 따라서 반응하는 앱 */