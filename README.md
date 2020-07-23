# 환경셋업 방법

`$pip install -r requirements.txt`   

혹은  

`$python3 -m pip install -r requirements.txt`  

상기 명령어를 이용하여 필요한 패키지를 설치한다.

# 웹서버 실행 방법
`$python3 test.py`

웹브러우저 상에서 127.0.0.1:9999 로 접속 가능

# 구조

## 웹서버 측

`python 코드`

```python3
@socketio.on('request', namespace='/data')
def push_values(msg):
    emit('rtdata', {'data':making_number()})
```

flask에서는 socketio를 통해 'request'라는 주제로, '/data' 네임스페이스에 요청이 들어오면  
socketio로 다시 emit하고, 주제는 'rtdata'이다. 데이터는 random.randint로 보내는 중.

## 클라이언트 측

`javascript 코드`

```javascript

    var binder = io("http://localhost:9999/data");
      setInterval(function() {
        binder.emit('request', {'time': Date.now()});
      }, 1000);
      binder.on('rtdata', function(data) {
        console.log('binder buffered: ', data)
        var target = document.querySelector('#value_1')
        target.innerHTML = data.data
      });

```

socketio javascript로 구성되어있다. index.html 참고 -> TODO: CDN이 아닌 로컬에 socketio 관련 js 파일 배포 필요.

binder라는 변수로 socketio, 네임스페이스는 '/data' 를 할당.

`setInterval` 함수를 이용해 1초마다, '/data'네임스페이스의 'request' 라는 주제로 emit(전송)

웹서버 측은 1초마다 request 주제로 받게되고, 이에 따른 동작으로 'rtdata'라는 이름으로 클라이언트에 전송

client는 다시 `binder.on('rtdata', function().....` 으로 'rtdata 주제로 데이터를 수신중이며,

웹서버에서 보낸 'rtdata' 주제가 들어왔을 때 #value_1 id를 셀렉트해 HTML마크업을 1초마다 변경하게 된다.

`TODO` : 현재는 socketio로 받은 실시간 변화하는 값을, document.querySeletor를 이용해 태그 id 선택 후  
  
.innerHTML 에 실시간 변화하는 값을 넣어서 구현 -> 더 나은 방법 찾아보기

# highchar Demo

`127.0.0.1:9999/chart` 로 접근  
highchart 라이브러리 사용을 위해서는  
jquery 먼저 불러와야 한다.  

TODO: 실시간 데이터 chart 화