show databases;
use ku_db;
show tables;

insert into booking_info (reservation_id, reserved_date, start_time, end_time, apply_date, room_id, prof_name, user_id, purpose, use_check)
values
('210407131070','2021-04-24','0900','1200','2021-04-07 13:14:25','15_107','이중복','user1234','세미나',true);
-- '210407131070'


-- 4253 
truncate booking_info;