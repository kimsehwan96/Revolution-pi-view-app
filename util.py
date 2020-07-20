import json

def get_profile(fileName:str) -> dict:
    try:
        with open(fileName, 'r') as f:
            response = json.load(f)          
            return response
    except Exception as e:
        print('failed to read file', e)

    