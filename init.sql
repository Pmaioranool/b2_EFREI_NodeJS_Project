
drop database if exists forum;
create database forum;

drop table if exists likes;
drop table if exists comments;
drop table if exists threads;
drop table if exists users_groupes_roles;
drop table if exists reports;
drop table if exists publications;
drop table if exists type_report;
drop table if exists groupes;
drop table if exists categories;
drop table if exists private_messages;
drop table if exists users;
drop table if exists roles;

create table roles(
    role_id serial primary key,
    name varchar(255) not null
);

create table users(
    user_id serial primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password text not null,
    birthdate date not null,
    gender varchar(100),
    bio text,
    avatar text,
    role_id int not null default 2,
    foreign key(role_id) references roles(role_id)
);

create table private_messages(
    MP_id serial primary key,
    sender_id int not null,
    receiver_id int not null,
    message text not null,
    creation_date date not null default now(),
    update_date date not null default now(),
    foreign key(sender_id) references users(user_id),
    foreign key(receiver_id) references users(user_id)
);

create table categories(
    id serial primary key,
    name varchar(255) not null,
    parent int
);

alter table categories add foreign key(parent) references categories(id);

create table groupes(
    groupe_id serial primary key,
    name varchar(255) not null,
    rules text not null,
    creation_date date not null default now(),
    update_date date not null default now(),
    categories_id int not null,
    foreign key(categories_id) references categories(id)
);

create table type_report(
    type_report_id serial primary key,
    name varchar(255) not null
);

create table publications(
    publication_id serial primary key,
    title varchar(255) not null,
    content text not null,
    creation_date date not null default now(),
    update_date date not null default now(),
    user_id int not null,
    groupe_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id)
);

create table reports(
    report_id serial primary key,
    user_id int not null,
    publication_id int not null,
    type_report_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(publication_id) references publications(publication_id),
    foreign key(type_report_id) references type_report(type_report_id)
);

create table users_groupes_roles(
    UGR_id serial primary key,
    user_id int not null,
    groupe_id int not null,
    role_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id),
    foreign key(role_id) references roles(role_id)
);

create table threads(
    thread_id serial primary key,
    title varchar(255) not null,
    content text not null,
    creation_date date not null default now(),
    update_date date not null default now(),
    user_id int not null,
    groupe_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id)
);

create table comments(
    comment_id serial primary key,
    content text not null,
    creation_date date not null default now(),
    update_date date not null default now(),
    user_id int not null,
    groupe_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id)
);

create table likes(
    likes_id serial primary key,
    user_id int not null,
    publication_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(publication_id) references publications(publication_id)
);

insert into roles (name) values ('admin'), ('user'), ('moderator'), ('ban');

insert into categories (name, parent) values ('General', null), ('Programming', null), ('Web', 2), ('Mobile', 2), ('Desktop', 2), ('Game', 2), ('Other', 2);

insert into type_report (name) values ('Spam'), ('Violence'), ('Hate speech'), ('Harassment'), ('Self-harm'), ('Fake news'), ('Intellectual property violation'), ('Child exploitation'), ('Other');

insert into groupes (name, rules, categories_id) values ('General', 'No rules', 1), ('Programming', 'No rules', 2), ('Web', 'No rules', 3), ('Mobile', 'No rules', 4), ('Desktop', 'No rules', 5), ('Game', 'No rules', 6), ('Other', 'No rules', 7);

insert into users (username, email, password, birthdate, gender, bio, avatar, role_id) values ('admin', 'admin@admin', '$2b$10$H2EYxOiiHEsVT7pwm18fqOn1xMk8VX.qLBuPi.4IuVt.z4ipbE3My', '2000-05-05', 'admin', 'THE ADMIN', null, 1);--password = admin

insert into users_groupes_roles (user_id, groupe_id, role_id) values (1, 1, 1);

insert into threads (title, content, user_id, groupe_id) values ('Welcome', 'Welcome to the forum', 1, 1);

insert into publications (title, content, user_id, groupe_id) values ('Welcome', 'Welcome to the forum', 1, 1);

insert into comments (content, user_id, groupe_id) values ('Welcome to the forum', 1, 1);

insert into likes (user_id, publication_id) values (1, 1);

insert into reports (user_id, publication_id, type_report_id) values (1, 1, 1);