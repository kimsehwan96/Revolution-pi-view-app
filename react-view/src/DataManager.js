import React from 'react';
import io from 'socket.io-client'

class DataManager {
    Endpoint = "http://localhost:8888"

    setCallback (callback) {
        this.callback = callback
      }

      getProfile() {
        this.profileSocket = io(Endpoint + '/profile')
        this.profilesocket.on
      }

      subscribe () {
          this.socket = io(Endpoint + '/data')
          this.socket.emit('request')
          this.socket.on('rtdata', data => this.success(data))
      } 
    
      success (data) {
        // console.log(data)
        this.count = 0
        if (this.callback) this.callback(data)
        // else console.log(data)  
      }
    


}