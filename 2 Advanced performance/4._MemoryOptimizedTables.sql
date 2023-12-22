USE xtreme
----------------------------------
-- CONFIGURE RECOMMENDED DB OPTION
----------------------------------
ALTER DATABASE CURRENT SET MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT=ON 
GO 
-------------------------------------------------------------
-- CREATE A FILEGROUP AND DATAFILE FOR MEMORY OPTIMIZE TABLES
-------------------------------------------------------------
ALTER DATABASE xtreme
ADD FILEGROUP memoptfg CONTAINS MEMORY_OPTIMIZED_DATA
GO
ALTER DATABASE xtreme 
ADD FILE 
(
    NAME = memoptfile,
    FILENAME = 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\memoptfile.ndf'
)
TO FILEGROUP memoptfg;
----------------------------------------
-- CREATE DURABLE MEMORY OPTIMIZED-TABLE
----------------------------------------
IF OBJECT_ID('dbo.table1') IS NOT NULL
	DROP TABLE dbo.table1

CREATE TABLE dbo.table1 
( c1 INT IDENTITY PRIMARY KEY NONCLUSTERED, c2 NVARCHAR(MAX)) 
WITH (MEMORY_OPTIMIZED=ON) 
GO 
--------------------------------------------
-- CREATE NON DURABLE MEMORY OPTIMIZED-TABLE
--------------------------------------------
IF OBJECT_ID('dbo.table1') IS NOT NULL
	DROP TABLE dbo.temp_table1

CREATE TABLE dbo.temp_table1 
( c1 INT IDENTITY PRIMARY KEY NONCLUSTERED, c2 NVARCHAR(MAX)) 
WITH (MEMORY_OPTIMIZED=ON, DURABILITY=SCHEMA_ONLY) 
GO
--------------
-- INSERT DATA
--------------
INSERT INTO table1 VALUES (N'sample durable') 
INSERT INTO temp_table1 (c2) VALUES (N'sample non-durable')

SELECT * FROM table1;
SELECT * FROM temp_table1;

-- Check what happens with both tables if you restart your database service

SELECT * FROM table1;
SELECT * FROM temp_table1;



