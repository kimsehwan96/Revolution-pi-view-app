# python Lambda 배포 테스트
    Serverless를 이용해 Python Lambda 배포하기

  ```yaml
    plugins:
  - serverless-python-requirements
  ```

    serverless.yml 내에 plugin을 삽입해줘야 함.

* python lambda의 배포 과정

    코드를 편집하고, requirements.txt를 준비  
    람다에는 이 requirments.txt에 적혀있는 모듈이 모두 설치된 zip파일이  
    S3버킷에 올라가게 된다.