TEST = {
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

def change_data(profile:dict, inputData:int):
    input_start = profile.get('inputRange')[0]
    input_end = profile.get('inputRange')[1]

    change_start = profile.get('outputRange')[0]
    change_end = profile.get('outputRange')[1]

    n = (change_end - change_start) / (input_end - input_start)

    raw = inputData * n + change_start - input_start * n
    result = float(round(raw, 2))
    print(result)
    return result

if __name__ == "__main__":
    change_data(TEST, 2500)
