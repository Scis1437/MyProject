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
  
  
{"Station_name":"station3",
}

  
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

show test โดยเรียกดูผ่านรหัสนักศึกษา .get '/test/idที่ต้องการ
เช่น '/test/620610795

export file score โดยเรียกดาวโหลดเป็นคะแนนของสเตชั้นไหน
  
ต้องการคะแนนสเตชั่นไหน .get '/export'
  
{"station_id":"clbgnzizb0000v4ag550yepfe"}

update score .put '/test'
  
{"test_number":6,
"score": 5,
"station_Id": "clbgo28uj0002v47chxiqv7nf",
"student_id": "620610795"}


ให้คะแนน .put '/test'
  {"test_number":10,
"score": 8,
"station_Id": "clbgo28uj0002v47chxiqv7nf",
"student_id": "620610795"}

 
 
