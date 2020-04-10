## SongSsage

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas

    id : {type: String, unique: true}, // 아이디
    
    passwd : {type : String}, // 비밀번호

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음

* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // 아이디
      
      passwd : {type : String},
      
      token : {type: String}, // 토큰
     } 

    HTTP 404 : { message : "User Not Found!"}


* POST /message/write 

> Params

    phone :  {type: String, require: true} // 전화번호

    data :  {type: String, require: true} // 문자내용

    token : {type: String, require: true} // 문자토큰

    production : {type: String, require: true} // 프로덕션
    
    userToken :   {type: String, require: true} // 유저토큰
     
    docNum :   {type: String, require: true} // 문자 저장 순서

> Response

    HTTP 200 : { list: 
    
      phone : {type: String, unique: true}, // 전화번호
      
      data : {type : String}, //문자내용

      nowDate : {type: String}, //현재 시각
      
      userToken : {type: String}, // 토큰

      docNum : {type: String} // 문자 저장 순서
     } 

    HTTP 500 : { message : "ERR!"}
    



* POST /message/search/:userToken 

> Params

     userToken :   {type: String, require: true} // 유저토큰
    
> Response (ex. NFCtRfG89ei7VYMyM4hsAYp라는 유저토큰을 넣었을때)

    HTTP 200 : { message : "success!"}
    {
            "phone": "01011112222",
            "data": "안녕하세요 문자 반환 테스트 입니다.",
            "token": "fLSWsAWjY6VCx5kEZBAAqt1"
    }

    HTTP 500 : { message : "ERR!"}


* POST /message/searchPhone 

> Params

     phone : {type: String, unique: true}, // 전화번호

     userToken :   {type: String, require: true} // 유저토큰
    
> Response (ex.01011112222라는 전화번호를 넣고 NFCtRfG89ei7VYMyM4hsAYp라는 유저토큰을 넣었을때)

    HTTP 200 : { message : "success!"}
    {
            "phone": "01011112222",
            "data": "안녕하세요 문자 검색 테스트 입니다.",
            "token": "fLSWsAWjY6VCx5kEZBAAqt1"
    }

    HTTP 500 : { message : "ERR!"}



