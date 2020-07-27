from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from time import sleep
from flask_cors import CORS
from util import get_profile, get_sensor_names
from revpi import RevolutionPi
import random
import threading
import traceback

async_mode = None #for buffer flushing
app = Flask(__name__) 
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins='*', port=9999)
thread = None
thread_lock = Lock()
CORS(app)
TEST_VALUE = None
revpi = RevolutionPi('config.json')


@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('request', namespace='/data')
def push_values(msg):
    data = revpi.data_normalization()
    try:
        emit('rtdata', {'data':data})
        print("number of thread : ", threading.active_count())
    except Exception as e:
        print("error occured when emitting sensor data :", traceback.format_exc())
    sleep(1) #TODO: config 파일에서 이 내용을 설정 할 수 있게

@socketio.on('sensor_name', namespace='/profile')
def push_profile(msg):
    try:
        sensor_profile = get_sensor_names('config.json')
    except Exception as e:
        print("error occured when emmiting sensor profile :", traceback.format_exc())
    emit('sensor_name', {'name' : sensor_profile})

#@app.errorhandler(404) 
#def page_not_found(error): 
#    return render_template('index.html')
#404에러 발생할 경우 (page not found) 메인 페이지로 전환


#TODO: request는 1초에 한번씩 들어옴, request요청이 들어왔을 때, 센서 개수만큼의 데이터를 보내줘야함 (array로)
# 'data' : [데이터1번, 2번, 3번, 4번] -> config.json의 센서 리스트 순서대로

if __name__ == '__main__':
    socketio.run(app, debug=True, port=9999)
else:
    socketio.run(app, debug=True, port=9999)
