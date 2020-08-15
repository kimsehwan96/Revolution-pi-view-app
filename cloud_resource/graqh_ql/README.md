# Graph QL with serverless

* graph ql 스택을 Serverless를 이용해 배포해보기

    확인할 내용 : Cloud formation 구조(serverless)  
    schema 구조  
    mapping template(해석기) 구조 (vtl 확장자)  

## 현재 진행상황

    Resource가 Lambda인 상태로 테스트 중  
    추후 DynamoDB와 연결해보기


## 배포 결과

` "message": "Function not found: arn:aws:lambda:ap-northeast-2:671221010754:function:serverless-graphql-appsync-lda-dev-graphql (Service: Lambda, Status Code: 404, Request ID: 2e70ac55-f1d2-4141-ac8c-bc646d9ec448, Extended Request ID: null)"`

    람다의 arn과 템플릿상 arn 매칭이 실패한듯 -> 디버깅 시작