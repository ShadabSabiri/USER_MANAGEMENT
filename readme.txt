//9 Dec 2022
// for database pl use the given instruction


//FOR DATABASE
create database USER_MANAGEMENT;

//FOR TABLE

create table users(
    username varchar(225) not null,
    password varchar(225) unique not null,
    email varchar(225) not null,
);

