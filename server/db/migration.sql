drop table if exists stands_user;
drop table if exists stands;

create table if not exists stands (
  id varchar(5) primary key,
  name varchar(100)
);

create table if not exists stands_user (
  standId varchar(5),
  voted varchar(12),

  primary key (standId, voted),
  foreign key (standId) references stands(id)
);


