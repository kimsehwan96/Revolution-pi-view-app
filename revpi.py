import revpimodio2
import json
import os
from util import get_profile

TEST_JSON = {
    "sensor_list":{
        "InputValue_1" : "차압계",
        "InputValue_2" : "송풍기",
        "InputValue_3" : "배풍기",
        "RTDValue_1" : "온도"
    },
    "IMGPATH" : "/dev/piControl0",
    "data_information" : {
        "InputValue_1" : {
            "originalRange" : [4000, 20000],
            "changedRange" : [4, 20]
        },
        "InputValue_2" : {
            "originalRange" : [4000, 20000],
            "changedRange" : [4, 20]
        },
        "InputValue_3" : {
            "originalRange" : [4000, 20000],
            "changedRange" : [4, 20]
        },
        "RTDValue_1" : {
            "originalRange" : [0, 10000],
            "changedRange" : [0, 100]
        }
    }
} 

#for Test
PROFILE = None

def singleton(cls):
    instances = {}
    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance

@singleton
class RevolutionPi:

    def __init__(self):
        self.profile_path = "/home/pi/ksg_edge_deploy/socket_project/config.json" #revpi edge path
        self._profile = get_profile(self.profile_path)
        self.image_path = self._profile.get("IMGPATH")
        self.sensor_profile = self._profile.get("sensor_list")
        self.normalization_profile = self._profile.get("data_information")
        self.sampling_time = 0.02 #20ms
        self.before_buffer = []
        self.after_buffer = []
        self.rev = revpimodio2.RevPiModIO(autorefresh = True, procimg = self.image_path)
        self.rev.cycletime = 1000
        self.IO = self.rev.io
    
    def get_data(self):
        sensor_list = list(self.sensor_profile.keys())
        rev_data = [0]*len(sensor_list)  
        for idx in range(len(sensor_list)):
            rev_data[idx] = getattr(self.IO, sensor_list[idx]).value
        self.before_buffer = rev_data #list

    def data_normalization(self):
        self.get_data()
        self.after_buffer = []
        profile = self.normalization_profile

        for i,v in enumerate(profile):
            input_start = profile.get(v).get('originalRange')[0]
            input_end = profile.get(v).get('originalRange')[1]
            change_start = profile.get(v).get('changedRange')[0]
            change_end = profile.get(v).get('changedRange')[1]
            n = (change_end - change_start) / (input_end - input_start)
            processed_data = self.before_buffer[i] * n + change_start - input_start * n
            self.after_buffer.append(float(round(processed_data,2)))

if __name__ == "__main__":
    rev = RevolutionPi()
    print(rev.get_data())
    print(rev.data_normalization())

    
