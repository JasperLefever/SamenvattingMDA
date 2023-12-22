USE [StackOverflow2010]
GO

/****** Object:  View [dbo].[v_posts_votes]    Script Date: 25/10/2023 10:35:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER view [dbo].[v_posts_votes](year,amount)
WITH SCHEMABINDING
as
select p.CreationYear,COUNT_BIG(*) 
from dbo.Posts p join dbo.Votes v on p.Id = v.PostId
group by p.CreationYear
GO


create unique clustered index v_posts_votes_pk on v_posts_votes(year)


select * from v_posts_votes;

/*Make a ranking of all users (id, displayname,number of badges) 
based on the number of badges in an efficient way.*/

-- STAP 1: SELECT STATEMENT

select u.Id, u.DisplayName, COUNT(*)
from Badges b join Users u 
on b.UserId = u.Id
group by u.Id,u.DisplayName
order by COUNT(*) desc;

-- STAP 2: EXECUTION PLAN
/*
SORT: 45% --> moet er uit. 
*/

-- STAP 3: OPSTELLEN PLAN VAN AANPAK 
/*
MAAR sorteren op COUNT(*): is geen veld --> veld van maken 
HOE? 
oplossing 1: calculated field in tabel Users met aantal badges
oplossing 2: indexed view
*/

-- STAP 4: IMPLEMENTATIE PLAN VAN AANPAK
-- oplossing 1
alter table users u add nrbadges as 
(select count(*) from badges where userid = U.id);
-- we verlaten oplossing  1

-- oplossing 2: indexed view
create or alter view dbo.v_badges (userid, name, nrbadges)
with schemabinding
as
select u.Id, u.DisplayName, COUNT_BIG(*)
from dbo.Badges b join dbo.Users u 
on b.UserId = u.Id
group by u.Id,u.DisplayName

-- View indexeren = materialiseren
create unique clustered index v_badges_pk on v_badges(userid);

SELECT userid, name,nrbadges
from v_badges
order by nrbadges desc;

-- STAP 5: CHECK VIA EXECUTION PLAN
-- nog altijd sort 44%
-- logisch: geen index op sorteercriterium nrbadges
-- oplossing: 
CREATE NONCLUSTERED INDEX v_badges_sort on v_badges(nrbadges) 
include (userid, name) -- covering index (include)

SELECT userid, name,nrbadges
from v_badges
order by nrbadges desc;

-- IDEALE EXECUTION PLAN: ENKEL INDEX SCAN OP ONZE INDEX: ok bij ORDER BY 