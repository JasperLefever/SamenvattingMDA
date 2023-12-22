USE StackOverflow2010;
-----------------------------------------------
-- REMOVE PREVIOUS PARTITIONING FILES IS NEEDED
-----------------------------------------------
-- For removing a file: first drop the tables 
drop table if exists PostsPartitioned
-- and then remove files: 
alter database stackoverflow2010 remove file sof1
alter database stackoverflow2010 remove file sof2
alter database stackoverflow2010 remove file sof3
alter database stackoverflow2010 remove file sof4

---------------------------------------------------------------
-- Check for a useful partitioning (i.e. +/- even distribution)
---------------------------------------------------------------
select 
case when Score <= 0 then '1-low'
     when Score <= 1 then '2-low medium'
     when Score <= 3 then '3-high medium'
     else '4-high' end as category
,COUNT(*) count
from posts
group by 
case when Score <= 0 then '1-low'
     when Score <= 1 then '2-low medium'
     when Score <= 3 then '3-high medium'
     else '4-high' end;
----------------------------------------
-- CREATE A FILEGROUP FOR EACH PARTITION
----------------------------------------
ALTER DATABASE StackOverflow2010
ADD FILEGROUP test1fg;
GO
ALTER DATABASE StackOverflow2010
ADD FILEGROUP test2fg;
GO
ALTER DATABASE StackOverflow2010
ADD FILEGROUP test3fg;
GO
ALTER DATABASE StackOverflow2010
ADD FILEGROUP test4fg; 
----------------------------------------
-- ADD A DATAFILE TO EACH PARTITION
----------------------------------------
ALTER DATABASE StackOverflow2010 
ADD FILE 
(
    NAME = sof1,
	-- possible modify path to correspond with you installation
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\sof1.ndf',
    SIZE = 100MB,
    FILEGROWTH = 50MB
)
TO FILEGROUP test1fg;

ALTER DATABASE StackOverflow2010 
ADD FILE 
(
    NAME = sof2,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\sof2.ndf',
    SIZE = 100MB,
    FILEGROWTH = 50MB
)
TO FILEGROUP test2fg; 

ALTER DATABASE StackOverflow2010 
ADD FILE 
(
    NAME = sof3,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\sof3.ndf',
    SIZE = 100MB,
    FILEGROWTH = 50MB
)
TO FILEGROUP test3fg;

ALTER DATABASE StackOverflow2010 
ADD FILE 
(
    NAME = sof4,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\sof4.ndf',
    SIZE = 100MB,
    FILEGROWTH = 50MB
)
TO FILEGROUP test4fg;


---------------------------------------------------
-- Create a partition function called scorePF1 that 
-- will partition a table into four partitions
---------------------------------------------------
CREATE PARTITION FUNCTION scorePF1 (int /*data type of column used for partitioning*/)
    AS RANGE LEFT FOR VALUES (0, 1, 3) ;  -- 3 boundary values --> 4 partitions
	-- LEFT/RIGHT specifies to which side of the interval the boundary value belongs
GO
-----------------------------------------------------------------
-- Create a partition scheme called scorePF1 that 
-- applies function scorePF1 to the four filegroups created above
------------------------------------------------------------------
CREATE PARTITION SCHEME scorePF1
    AS PARTITION scorePF1
    TO (test1fg, test2fg, test3fg, test4fg) ;
GO
----------------------------------------------------------
-- Create a partitioned table called PartitionTable that 
--  uses scorePF1 to partition on score
----------------------------------------------------------
CREATE TABLE PostsPartitioned (
	id int not null, 
	body nvarchar(max) not null,
	creationdate datetime not null,
	score int not null, 
	title nvarchar(250), 
	CONSTRAINT posts_pk PRIMARY KEY (id,score)) -- partitioning column must be part of the primary key!
    ON scorePF1 (score);  
--------------------------------------------------
-- Populuate the table
-- (requires several gigabytes of free disk space)
-- this may take a few minutes
--------------------------------------------------
insert into PostsPartitioned 
select Id,body,creationdate,score,title from Posts;  

-- check size of datafiles at C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER01\MSSQL\DATA\

-------------------------
-- SELECT FROM THE TABLE 
-------------------------
-- select from single partition
select score,COUNT(*)
from PostsPartitioned
where score <= 0
group by score;

-- select from multiple partitions --> slower
select score,COUNT(*)
from PostsPartitioned
where score >= 2
group by score;



