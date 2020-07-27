import json

def get_profile(fileName:str) -> dict:
    try:
        with open(fileName, 'r') as f:
            response = json.load(f)          
            return response
    except Exception as e:
        print('failed to read file', e)

def get_sensor_names(fileName:str) -> list:
    profile = get_profile(fileName)
    return list(profile.get('sensor_list').values())
    


if __name__ == "__main__":
    response = get_profile('config.json')
    print(response)