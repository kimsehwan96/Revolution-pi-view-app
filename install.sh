#!/bin/bash

#this script will install the socket-view app automatically
#localhosst:9999 will be shown after boot process is done

DIR='/home/pi/ksg_edge_deploy'
req_file='/home/pi/ksg_edge_deploy/socket_project/requirements.txt'

echo "installing local view app will start"

if [ -d "$DIR" ]; then
    echo "directory exist"
else
    echo "directory dose not exist"
    exit 1
fi

sudo apt-get install -y chromium-browser ibus-hangul fonts-unfonts-core
#한글화를 위한 의존성 설치

if [ $? -ne 0 ]; then
  echo "installing packages failed ! "
else
  echo "pakcage installing successed"
fi

sudo python3 -m pip install -r "$req_file"

if [ $? -ne 0 ]; then
  echo "installing requirements failed ! "
else
  echo "python pakcage installing successed"
fi

# TODO : revolution Pi 내에서 자동화를 위한 스크립트 설정
# /etc/xdg/lxsession/LXDE-pi/autostart 수정


 
