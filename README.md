# MyProject


to export score //
get : http://localhost:9000/export/
ส่งค่า station_id มาทาง <body>
 EX. {"station_id":"clbgnzizb0000v4ag550yepfe"}
  
  
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

method station for station detail .get '/station'
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
  
ระบบจะเซ็ทคะะแนนเทสนั้นให้ 0เทสข้อไหนstation id ไหน ละนักเรียนไอดีอะไร
  
{"test_number":12,
"station_Id": "clbhm8yef0000v4gchx39mhao",
"student_id": "620610795"}


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
  
ต้องการคะแนนสเตชั่นไหน .get '/export'
  
{"station_id":"clbgnzizb0000v4ag550yepfe"}

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

 
 
