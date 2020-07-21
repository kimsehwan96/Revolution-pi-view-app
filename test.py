from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from time import sleep
from flask_cors import CORS
import random
import threading


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins='*', port=9999)
thread = None
thread_lock = Lock()
CORS(app)
TEST_VALUE = None



@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('request', namespace='/data')
def push_values(msg):
    emit('rtdata', {'data':making_number()})
    

def making_number():
    data = [0]*4
    for i in range(4):
        data[i]=random.randint(1,100)
    
    return data




if __name__ == '__main__':

    socketio.run(app, debug=True, port=9999)
#test
