# 2.1 SQL Server Advanced Performance

- [2.1 SQL Server Advanced Performance](#21-sql-server-advanced-performance)
  - [2.1.1. Introduction](#211-introduction)
    - [Space allocation by SQL Server](#space-allocation-by-sql-server)
  - [2.1.2. Clustered \& Non-clustered Indexes](#212-clustered--non-clustered-indexes)
    - [Table scan](#table-scan)
    - [INDEXES](#indexes)
    - [SQL Optimizer](#sql-optimizer)
    - [Clustered index](#clustered-index)
    - [Non-clustered index](#non-clustered-index)
    - [Use of indexes with functions and wildcards](#use-of-indexes-with-functions-and-wildcards)
  - [2.1.3. Covering Indexes](#213-covering-indexes)
    - [Covering index: example (db xtreme with script EmployeeIdx)](#covering-index-example-db-xtreme-with-script-employeeidx)
    - [Use of indexes with functions and wildcards](#use-of-indexes-with-functions-and-wildcards-1)
  - [2.1.4. Concatenated Indexes](#214-concatenated-indexes)
    - [1 index with several columns vs. several indexes with 1 column](#1-index-with-several-columns-vs-several-indexes-with-1-column)
    - [Sort order with concatenated indexes](#sort-order-with-concatenated-indexes)
  - [2.1.5. Working with Indexes](#215-working-with-indexes)
    - [Creation of indexes](#creation-of-indexes)
    - [Removing indexes](#removing-indexes)
    - [When to use an index](#when-to-use-an-index)
    - [Looking for "expensive" queries](#looking-for-expensive-queries)
  - [2.1.6. Rules of Thumb](#216-rules-of-thumb)
  - [2.1.8. Materialized Views (Indexed Views)](#218-materialized-views-indexed-views)
    - [Indexed views: benefits](#indexed-views-benefits)
    - [Indexed views: restrictions](#indexed-views-restrictions)
    - [Indexed views: schema binding](#indexed-views-schema-binding)
    - [Indexed view: example](#indexed-view-example)
  - [2.1.9. Index Statistics](#219-index-statistics)
    - [Index usage statistics](#index-usage-statistics)
  - [2.1.10. Storage \& Partitions](#2110-storage--partitions)
    - [Storage: files \& filegroups](#storage-files--filegroups)
    - [Storage: examples](#storage-examples)
    - [Storage: conclusions](#storage-conclusions)
    - [Partitioning](#partitioning)
    - [Create table in filegroup](#create-table-in-filegroup)
    - [Create index in filegroup](#create-index-in-filegroup)
    - [Partitioning](#partitioning-1)
    - [Partitions: example (db stackoverflow)](#partitions-example-db-stackoverflow)

## 2.1.1. Introduction

Bla bla performance is important bla bla

### Space allocation by SQL Server

- Random access files
- Page → 8 kB blok aaneengesloten geheugen
- Extent → 8 logisch opeenvolgende pagina's
  - uniform extends: voor 1 DB-object
  - mixed extents: kan gedeeld worden met 8 db objecten(=tabellen, indexes, enz.)

→ een extent is een groep van 8 pagina's en een pagina is een block data van 8 kB

→ nieuwe data wordt toegevoegd aan een mixed extent

## 2.1.2. Clustered & Non-clustered Indexes

### Table scan

- Heap

  - Niet gesorteerde collectie van data-pages
    - geen index
  - Standaard manier van opslaan tabel zonder indexen

- Toegang door Index Allocation Map
- Table scan: gaat alle pages van de tabel ophalen om door te zoeken
- Performantie probleem:
  - Fragmentatie:
    - Tabel verspreid over meerdere niet opvolgende pagina's
  - Forward pointers
    - varchar velden kunnen langer worden bij een update → een forward pointer is een verwijzing naar een andere
      pagina → **TRAAG**

### INDEXES

Index -> gesorteerde collectie records van een tabel -> snelle toegang door boomstructuur (Balanced Tree)

Waarom?

- Performantie

Waarom niet?

- Indexen pakken redelijk veel plaats in
- Vertragen DML operaties (insert, update, delete)

### SQL Optimizer

- Kiest de beste manier om een query uit te voeren
- Zet een query om in een executie plan (compiling of parsing)
- 2 soorten:
  - Cost based optimizer
    - meerdere plannen worden gegenereerd en het minst kostende plan wordt gekozen
  - Rule based optimizer
    - vooropgestelde regels bepalen de beste manier om een query uit te voeren

Executie plannen worden gecached

![cost](./assets/cost.png)

### Clustered index

- Fysieke volgorde van de data in de tabel is gelijk aan de volgorde van de index
- 1 clustered index per tabel
- Voordelen:
  - dubbel-gelinkte lijst -> sequential access
  - geen forward pointers
- bladeren zijn de data pagina's

### Non-clustered index

- standaard index
- trager dan clustered
- meer dan 1 per tabel
- forward en backward pointers tussen de bladeren
- bladeren verwijzen naar de data pagina's
- Elk blad heeft

  - Key en value
  - RID row locator
    - om de data te localiseren in de clustered index als die er is
    - anders in de base table -> heap

Als er meer velden van een tabel nodig zijn die niet in de index zitten dan

- Lezen via een non-clustered index:
  - RID lookup:
    - lookups naar de heap met hun RID
  - Key lookup:
    - lookups naar een clustered index als die er is

### Use of indexes with functions and wildcards

Indexen die gebruik maken van een wildcard in het begin van de zoekterm kunnen niet gebruikt worden

je kan wel dat veld includen in de index

## 2.1.3. Covering Indexes

- ALs een non-clustered index niet alle velden bevat die nodig zijn voor een query dan moet SQL Server een lookup doen voor elke rij om de ontbrekende velden op te halen

- Converging index -> non-clustered index die alle velden bevat die nodig zijn voor een query

### Covering index: example (db xtreme with script EmployeeIdx)

Slide 25

### Use of indexes with functions and wildcards

Slide 28

## 2.1.4. Concatenated Indexes

### 1 index with several columns vs. several indexes with 1 column

Welke index je gebruikt hangt af van de query die je het meest zal gebruiken en welke velden je mee zal queryen

Nog veel bla bla slide 30

### Sort order with concatenated indexes

- Indexen kunne in omgekeerde richting gebruikt worden maar je kunt niet de volgorde van 2 velden mixen

bv:

```sql
CREATE NONCLUSTERED INDEXEmpLastnameTitle ON Employee
(
 LastName ASC,
 Title ASC
)
```

![Alt text](./assets/sorted.png)
Bij de laatste query hebben ze asc en desc gemixed en dat kan niet

## 2.1.5. Working with Indexes

### Creation of indexes

```sql
CREATE [UNIQUE] [| NONCLUSTERED]
INDEX index_name ON table (kolom [,...n])
```

- Unique: alle waarden in de geïndexeerde kolom moeten uniek zijn
  - Kolom met unieke index mag niet null zijn
- Wanneer je een index aanmaakt kan de tabel leeg of gevuld zijn

### Removing indexes

```sql
DROP INDEX index_name ON table
```

### When to use an index

- Welke kolom indexeren?
  - Primairy key en unieke kolommen zijn automatisch geïndexeerd
  - Foreign keys die je vaak gebruikt bij joins
  - Kolommen die je veel gebruikt in zoekopdrachten (WHERE, GROUP BY, HAVING)
  - Kolommen die je veel gebruikt in sorteringen (ORDER BY)
- Welke kolommen niet?
  - kolommen die nooit gebruikt worden in zoekopdrachten
  - Kolommen met kleine mogelijkheden (ja/nee, true/false, 1/0, man/vrouw)
  - Kolommen in kleine tabellen
  - Kolommen met type bit, text, images

### Looking for "expensive" queries

## 2.1.6. Rules of Thumb

Slide 43 en verder best practices

## 2.1.8. Materialized Views (Indexed Views)

View -> Opgeslagen query statement (niet de data)

Een view kan gematerialiseerd worden door een unieke clustered index toe te voegen
Deze view wordt zo opgeslagen op de disk

Indexed view of materialized view

Hierop kun je dan weet nonclustered indexes maken

### Indexed views: benefits

- Aggregaties kunnen op voorhand berekend worden
- Tabellen op voorhand joinen als 1 tabel

### Indexed views: restrictions

Slide 78 derest trekt uw plan

### Indexed views: schema binding

### Indexed view: example

## 2.1.9. Index Statistics

### Index usage statistics

Irelevant

## 2.1.10. Storage & Partitions

### Storage: files & filegroups

- Elke database heeft minstens 2 files
  - Data file (.mdf)
  - Log file (.ldf)
  - mogelijks extra data files (.ndf)
- Filegroup
  - logische groep van files voor administratieve doeleinden
  - normaal 1 filegroup per db-file

Performantie verbeteren door filegroups:

- Filegroups op verschillende schijven plaatsen
- Data files en non-clustered indexes op verschillende disks (clustered index is een data file)
- Log bestanden op aparte schijf voor data veiligheid

Verplaatsen van een tabel naar andere filegroup:

- Drop huidige clustered index
- Maak nieuwe clustered index aan op de gewenste filegroup

### Storage: examples

```sql
REATE TABLE dbo.SmallRows
(
Id int NOT NULL,
LastName nchar(50) NOT NULL,
FirstName nchar(50) NOT NULL,
MiddleName nchar(50) NULL
);
INSERT INTO dbo.SmallRows
(
Id,
LastName,
FirstName,
MiddleName
)
SELECT
BusinessEntityID,
LastName,
FirstName,
MiddleName
FROM Person.Person;


SELECT sys.fn_PhysLocFormatter(%%physloc%%) AS [Row_Locator],
Id FROM dbo.SmallRows;
```

![Alt text](./assets/storage.png)

```sql
CREATE TABLE dbo.LargeRows
(
Id int NOT NULL,
LastName nchar(600) NOT NULL,
FirstName nchar(600) NOT NULL,
MiddleName nchar(600) NULL
);
INSERT INTO dbo.LargeRows
(
Id,
LastName,
FirstName,
MiddleName
)
SELECT
BusinessEntityID,
LastName,
FirstName,
MiddleName
FROM Person.Person;

SELECT sys.fn_PhysLocFormatter(%%physloc%%) AS [Row_Locator],
Id FROM dbo.LargeRows;
```

![Alt text](./assets/bigrows.png)

![Alt text](./assets/storage3.png.png)

### Storage: conclusions

- Opslag is goedkoop maar het datatype heeft een grote impact op IO

- Denk na over data type en lengte bij het ontwerpen van een tabel

### Partitioning

Partitioneering zorgt ervoor dat een tabel of index opgedeeld wordt in meerdere delen zodat denkel de nodige delen opgehaald moeten worden

BV: tijdsgebonden data van payrol of accounting alle histroriek is meestal niet nodig

### Create table in filegroup

```sql
--Disk-Based CREATE TABLE Syntax
CREATE TABLE
    [ database_name . [ schema_name ] . | schema_name . ] table_name
    [ AS FileTable ]
    ( { <column_definition> | <computed_column_definition>
        | <column_set_definition> | [ <table_constraint> ]
| [ <table_index> ] [ ,...n ] } )
    [ ON { partition_scheme_name ( partition_column_name ) | filegroup
        | "default" } ]
    [ { TEXTIMAGE_ON { filegroup | "default" } ]
    [ FILESTREAM_ON { partition_scheme_name | filegroup
        | "default" } ]
    [ WITH ( <table_option> [ ,...n ] ) ]
[ ;
```

### Create index in filegroup

```sql
CREATE [ UNIQUE ] [ CLUSTERED | NONCLUSTERED ] INDEX index_name
 ON <object> ( column [ ASC | DESC ] [ ,...n ] )
 [ INCLUDE ( column_name [ ,...n ] ) ]
 [ WHERE <filter_predicate> ]
 [ WITH ( <relational_index_option>  [ ,...n ] ) ]
 [ ON { partition_scheme_name ( column_name )
  | filegroup_name
  | default } ]
  [ FILESTREAM_ON { filestream_filegroup_name | partition_scheme_name | "NULL" } ]
[ ;
```

### Partitioning

Elke partitie een appate file of filegroup

Oudere en minder gebruikte data worden gesplits van de actuele data

### Partitions: example (db stackoverflow)

[HIER](./1b._Partitioning.sql)
