show databases;
use ku_db;
show tables;

insert into users (id, password, student_id, user_type)
values
('user1234', '1234', '202012345', 1),
('admin123', 'admin*12', '000000000', 2);

select * from users;

update users set phone_number = '01012345678' where id = 'user1234';
update users set name = '홍길동' where id = 'user1234';

update users set phone_number = '00000000000' where id = 'admin123';
update users set name = '관리자' where id = 'admin123';
