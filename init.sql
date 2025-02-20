create database if not exists forum;

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
    gender varcahr(100) not null,
    bio text not null,
    avatar text,
    role_id int not null default 2,
    foreign key(role_id) references roles(role_id)
);

create table private-messages(
    MP_id serial primary key,
    sender_id int not null,
    receiver_id int not null,
    message text not null,
    creation-date date not null default now(),
    update-date date not null default now(),
    foreign key(sender_id) references users(id),
    foreign key(receiver_id) references users(id)
);

create table categories(
    id serial primary key,
    name varchar(255) not null,
    parent int,
);

alter table categories add foreign key(parent) references categories(id);

create table groupes(
    groupe_id serial primary key,
    name varchar(255) not null,
    rules text not null,
    creation-date date not null default now(),
    update-date date not null default now(),
    categories_id int not null,
    foreign key(categories_id) references categories(id)
);

create table users-groupes-roles(
    UGR_d serial primary key,
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
    creation-date date not null default now(),
    update-date date not null default now(),
    user_id int not null,
    groupe_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id)
);

create table publications(
    publication_id serial primary key,
    title varchar(255) not null,
    content text not null,
    creation-date date not null default now(),
    update-date date not null default now(),
    user_id int not null,
    groupe_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(groupe_id) references groupes(groupe_id));

create table comments(
    comment_id serial primary key,
    title varchar(255) not null,
    content text not null,
    creation-date date not null default now(),
    update-date date not null default now(),
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

create table repport(
    repport_id serial primary key,
    user_id int not null,
    publication_id int not null,
    type_repport_id int not null,
    foreign key(user_id) references users(user_id),
    foreign key(publication_id) references publications(publication_id),
    foreign key(type_repport_id) references type-repport(type_repport_id)
);

create table type-repport(
    type_repport_id serial primary key,
    name varchar(255) not null
);

insert into roles (name) values ('admin'), ('user'), ('moderator');

insert into categories (name, parent) values ('General', null), ('Programming', null), ('Web', 2), ('Mobile', 2), ('Desktop', 2), ('Game', 2), ('Other', 2);

insert into type-repport (name) values ('Spam'), ('Violence'), ('Hate speech'), ('Harassment'), ('Self-harm'), ('Fake news'), ('Intellectual property violation'), ('Child exploitation'), ('Other');

insert into groupes (name, rules, categories_id) values ('General', 'No rules', 1), ('Programming', 'No rules', 2), ('Web', 'No rules', 3), ('Mobile', 'No rules', 4), ('Desktop', 'No rules', 5), ('Game', 'No rules', 6), ('Other', 'No rules', 7);

insert into users (username, email, password, birthdate,gender, bio, avatar, role_id) values ('admin', 'admin@admin', 'admin', '5-5-2000','admin', 'THE ADMIN', null, 1);

insert into users-groupes-roles (user_id, groupe_id, role_id) values (1, 1, 1);

insert into threads (title, content, user_id, groupe_id) values ('Welcome', 'Welcome to the forum', 1, 1);

insert into publications (title, content, user_id, groupe_id) values ('Welcome', 'Welcome to the forum', 1, 1);

insert into comments (title, content, user_id, groupe_id) values ('Welcome', 'Welcome to the forum', 1, 1);

insert into likes (user_id, publication_id) values (1, 1);

insert into repport (user_id, publication_id, type_repport_id) values (1, 1, 1);

