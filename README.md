# MyProject
*********************************************************

##First Start 
```npm install``` 
for install all dependencies
for backend
```bash
npm run dev
# or
yarn dev
```
## Getting Started


api backend 
http://localhost:9000
```
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
**********************************************************
change password ส่งไอดี กับ พาสเวิดใหม่มาได้เลย
.put http://localhost:9000/register
{"user":"test23",
"pwd":"12345"}
add subtest 
.post http://localhost:9000/subtest
body {
  "station_Id":"1",
  "station_name":"History taking",
  "test_number":3,
  "test_name":"Diarhea"
}
delete .delete http://localhost:9000/subtest
{
    "station_Id":"3", 
}
ดูแบบไม่ล็อกอน
.get http://localhost:9000/check-station
parse body id ?ี่ต้องการ
{"id":"620719000"}


to export all station score
get : http://localhost:9000/export/  ****ไม่ต้องส่งค่า***
จะได้ไฟล์ชื่อ data_Allstation_score
to export 1 station  score //
get : http://localhost:9000/export/2
ส่งค่า station_id มาทาง <body>
 EX. {"station_id":"2"}
หรือใช้ .get http://localhost:9000/export-station
 ส่งค่า station_id มาทาง <body>
 EX. {"station_id":"2"} จะได้ไฟล์ชื่อ data_station_score
 
  
ใช้ user name test1 for admin user
  
  
  
 ***************parse value มาทาง body*******
 
 API METHOD
 
 
 method login .post '/auth'
 
 
ex JSON content body
 
{"user": "test1",
"pwd":"1234"}
 
 
method refresh .get '/refresh'
 
 
method logout .logout '/logout'
 
 
method register for admin role only .post '/register'
 
 
ex JSON content body
 
{"user": "test7",
"pwd":"1234"}

 method add station .post '/station'
 
method station for station detail .get '/station'
 {
  "id":"4",
  "station_name":"Communication skill",
  "station_teacher":"Naruto Uzumaki"
}
 
 
 result
 [
  {
    "id": "1",
    "createdAt": "2023-03-06T07:58:49.781Z",
    "updatedAt": "2023-03-06T07:58:49.781Z",
    "station_name": "History taking",
    "station_teacher": "Naruto Uzumaki"
  },
  {
    "id": "2",
    "createdAt": "2023-03-06T08:15:33.250Z",
    "updatedAt": "2023-03-06T08:15:33.250Z",
    "station_name": "Physical examination",
    "station_teacher": "Mikasa Ackerman"
  },
  {
    "id": "3",
    "createdAt": "2023-03-06T08:16:02.205Z",
    "updatedAt": "2023-03-06T08:16:02.205Z",
    "station_name": "Technical skill",
    "station_teacher": "Son Goku"
  },
  {
    "id": "4",
    "createdAt": "2023-03-06T08:16:22.347Z",
    "updatedAt": "2023-03-06T08:16:22.347Z",
    "station_name": "Communication skill",
    "station_teacher": "Edward Elric"
  },
  {
    "id": "5",
    "createdAt": "2023-03-06T08:16:39.250Z",
    "updatedAt": "2023-03-06T08:16:39.250Z",
    "station_name": "Interpretation skill",
    "station_teacher": "Monkey D. Luffy"
  }
]

 show station score .get '/station'/2
 parse id via body
 {
  "id": "2"
}
 result
 [
  {
    "id": "2",
    "station_name": "Physical examination",
    "station_teacher": "Mikasa Ackerman",
    "tests": [
      {
        "student_id": "620719000",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 5
      },
      {
        "student_id": "620719000",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 5
      },
      {
        "student_id": "620719001",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 5
      },
      {
        "student_id": "620719001",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 6
      },
      {
        "student_id": "620719002",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 9
      },
      {
        "student_id": "620719002",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 6
      },
      {
        "student_id": "620719003",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 6
      },
      {
        "student_id": "620719004",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 9
      },
      {
        "student_id": "620719004",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 9
      },
      {
        "student_id": "620719005",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 5
      },
      {
        "student_id": "620719005",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 9
      },
      {
        "student_id": "620719006",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 7
      },
      {
        "student_id": "620719006",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 9
      },
      {
        "student_id": "620719007",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 7
      },
      {
        "student_id": "620719007",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 9
      },
      {
        "student_id": "620719008",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 7
      },
      {
        "student_id": "620719008",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 8
      },
      {
        "student_id": "620719009",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 7
      },
      {
        "student_id": "620719009",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 5
      }
    ]
  }
]
 
 
  
method delete test score .delete'/test'
  
{"test_number":6,
"score": 3,
"station_Id": "clbgo28uj0002v47chxiqv7nf",
"student_id": "620610795"} 

update name .put'/student'
  
{
  "id":"620610795",
  "name":"oliviye girouh"
}
  
delete student by passing student id that you want to delete .delete'/student'
{
  "id":"clbgnbwnk0000v49gc4vzxi30" 
}
  
delete student by passing station id that you want to delete .delete'/station'
  
{"id":"clbgnzizb0000v4ag550yepfe"}
  

rename station .put'/station'
  
id ที่ต้องการเปลี่ยน แล้วเปลี่ยนเป็นชื่ออะไร
{"id":"clbgo02yy0000v47c39zdnn7c",
  "station_name":"Station7"
}

cheated student .post'/test/cheated'
  role
ระบบจะเซ็ทคะะแนนเทสนั้นให้ 0เทสข้อไหนstation id ไหน ละนักเรียนไอดีอะไร
  
{"test_number":12,
"station_Id": "clbhm8yef0000v4gchx39mhao",
"student_id": "620610795"}

-

show test .get '/test'
  
{"id": "620610795","name":"Olive"}

show test โดยเรียกดูผ่านรหัสนักศึกษา .get '/student/idที่ต้องการ
เช่น '/student/620719000
 โดย parse id มาทาง Body
 {"id":"620719000"}
 Result 
 [
  {
    "id": "620719000",
    "name": "Rachel Thompson",
    "tests": [
      {
        "student_id": "620719000",
        "station_Id": "1",
        "test_number": 1,
        "test_name": "Dyspnea",
        "score": 5
      },
      {
        "student_id": "620719000",
        "station_Id": "1",
        "test_number": 2,
        "test_name": "Anemia",
        "score": 10
      },
      {
        "student_id": "620719000",
        "station_Id": "2",
        "test_number": 1,
        "test_name": "Knee pain",
        "score": 5
      },
      {
        "student_id": "620719000",
        "station_Id": "2",
        "test_number": 2,
        "test_name": "Acute abdominal pain",
        "score": 5
      },
      {
        "student_id": "620719000",
        "station_Id": "3",
        "test_number": 1,
        "test_name": "urine catheter",
        "score": 8
      },
      {
        "student_id": "620719000",
        "station_Id": "3",
        "test_number": 2,
        "test_name": "CPR",
        "score": 10
      },
      {
        "student_id": "620719000",
        "station_Id": "4",
        "test_number": 1,
        "test_name": "Breast feeding",
        "score": 8
      },
      {
        "student_id": "620719000",
        "station_Id": "4",
        "test_number": 2,
        "test_name": "Brain dead",
        "score": 8
      },
      {
        "student_id": "620719000",
        "station_Id": "5",
        "test_number": 1,
        "test_name": "Pneumonia",
        "score": 6
      },
      {
        "student_id": "620719000",
        "station_Id": "5",
        "test_number": 2,
        "test_name": "Blood smear thalassemia",
        "score": 7
      }
    ]
  }
]
 
 

export file score โดยเรียกดาวโหลดเป็นคะแนนของสเตชั้นไหน
  
ต้องการคะแนนสเตชั่นไหน .get '/export-station'
  
{"station_id":"clbgnzizb0000v4ag550yepfe"}

 export คะแนนทั้งหมด
 ต้องการคะแนน .get '/export'
update score .put '/test'
  
{"test_number":6,
"score": 5,
"station_Id": "clbgo28uj0002v47chxiqv7nf",
"student_id": "620610795"}


ให้คะแนน .post '/test'
{"test_number":2,
"test_name":"Anemia",
"score":8,
"station_Id": "1",
"student_id": "620719000",
"station_name":"History taking",
"station_teacher":"Mikasa Ackerman",
"name":"Rachel Thompson"
}

 
teacher 
 create teacher .post '/teacher'
 delete .delete '/teacher'
 create and delete decare teacher in body 
 {
"teacher_name":"ioi oi"
}
 show all teacher .get '/teacher' 
 
 
 show all log
 .get '/teacher-log'
 
 
