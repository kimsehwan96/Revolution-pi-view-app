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

if __name__ == "__main__":
    #test logic
    PROFILE = get_profile('config.json')
    print(get_data(PROFILE))

    
