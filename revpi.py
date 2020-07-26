import revpimodio2
import json
import os
from util import get_profile

TEST_JSON = {
    "sensor_list":{
        "InputValue_1" : "sensor_1",
        "InputValue_2" : "senosr_2",
        "InputValue_3" : "sensor_3",
        "RTDValue_1" : "sensor_4"
    },
    "IMGPATH" : "/dev/piControl0"
}

#for Test
PROFILE = None

class RevolutionPi:

    def __init__(self, profile_path):
        self._profile = get_profile(profile_path)
        self.image_path = self._profile.get("IMAGPATH")
        self.sensor_profile = self._profile.get("sensor_list")
        self.normalization_profile = self._profile.get("data_information")
        self.sampling_time = 0.02 #20ms
    
    def get_data(self):
        sensor_list = list(self.sensor_profile.keys())
        rev = revpimodio2.RevPiModIO(autorefresh = True, procimg = self.image_path)
        IO = rev.io

        rev_data = [0]*len(sensor_list)
        
        for idx in range(len(sensor_list)):
            rev_data[idx] = getattr(IO, sensor_list[idx]).value
        
        return rev_data #list

    def data_normalization(self):
        before_buffer = self.get_data()
        after_buffer = []
        if not profile:
            profile = self.normalization_profile
        else:
            pass
        input_start = profile.get('inputRange')[0]
        input_end = profile.get('inputRange')[1]
        change_start = profile.get('outputRange')[0]
        change_end = profile.get('outputRange')[1]
        n = (change_end - change_start) / (input_end - input_start)
        for value in before_buffer:
            processed_data = value * n + change_start - input_start * n
            after_buffer.append(float(round(processed_data,2)))

        return after_buffer


    #TODO: making class RevolutionPi class & method

def get_data(profile:dict) -> list:
    image_path = profile.get('IMGPATH')
    sensor_profile = profile.get('sensor_list')
    sensor_list = list(sensor_profile.keys()) 
    rev = revpimodio2.RevPiModIO(autorefresh = True, procimg=image_path)
    IO = rev.io

    rev_data = []

    #initalizing list
    for idx in range(len(sensor_list)):
        rev_data.append(0)

    for idx in range(len(sensor_list)):
        rev_data[idx] = getattr(IO, sensor_list[idx]).value

    return rev_data
    #TODO: gateway 온도/ cpu 상태 모니터링 시스템까지.

if __name__ == "__main__":
    #test logic
    #PROFILE = get_profile('config.json')
    #print(get_data(PROFILE))
    rev = RevolutionPi('config.json')
    print(rev.get_data())

    
