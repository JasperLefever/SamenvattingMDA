use master
go

create database mdaDB on
(filename = N'/var/opt/mssql/data/StackOverflow2010.mdf'),
(filename = N'/var/opt/mssql/data/StackOverflow2010_log.ldf')
for attach

go