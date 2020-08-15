import numpy as np

def main(event, context):
    a = np.arange(15).reshape(3, 5)

    print('Your numpy arrary : ')
    print(a)
    print("this is evnet {}".format(event))
    print("this is context {}".format(context))
if __name__ == "__main__":
    main('','')

#for lambda deploy test