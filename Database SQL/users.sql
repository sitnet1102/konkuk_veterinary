show databases; -- 데이터베이스 보기

 -- create database ku_db default character set utf8;
 
use ku_db; -- 데이터베이스 사용

show tables; -- 테이블 보기


create table users(
	id varchar(20) primary key,
    password varchar(20) not null,
    student_id varchar(20) not null,
    user_type int not null,
    phone_number varchar(50) not null,
    name varchar(20) not null
);

alter table users add phone_number varchar(50);
alter table users add name varchar(20);
alter table users modify column phone_number varchar(50) not null;
alter table users modify name varchar(20) not null;

show tables;

-- drop table users; 

desc users;	-- 테이블 정보 확인 


create table booking_info(
	reservation_id varchar(20) primary key,
    reserved_date date not null,
    start_time varchar(10) not null,
    end_time varchar(10) not null,
    apply_date datetime not null,
    room_id varchar(20) not null,
    prof_name varchar(20) not null,
    user_id varchar(20),
    -- phone_number varchar(20) not null,
    purpose varchar(20) not null,
    use_check bool not null,
    foreign key (user_id) references users (id),
	foreign key (room_id) references room_info (room_id)
    -- foreign key (prof_name) references prof_info (prof_name)
);

drop table booking_info;

desc booking_info;	-- 테이블 정보 확인
 
 
create table room_info(
	room_id varchar(20) primary key,
    building varchar(20) not null,
    room_type varchar(10) not null,
    -- floor int not null, -- 층 정보 제거 
    room_num varchar(20) not null,
    area int,
    capacity int,
    equipment_info varchar(200)
    -- picture_url varchar(200) -> 사진 정보 따로 넣어줄 예정이라 제거
);


desc room_info; -- 테이블 정보 확인 


create table prof_info(
	prof_name varchar(20) not null,
    prof_rank varchar(10) not null,
    prof_major varchar(100) not null,
    office_num varchar(10) primary key,
	email varchar(100) not null
    -- foreign key (prof_name) references  
    -- primary key (office_num)
);

desc prof_info; 

drop table prof_info;


