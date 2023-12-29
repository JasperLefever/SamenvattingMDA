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
    - [Creation of indexes: syntax](#creation-of-indexes-syntax)
    - [Removing indexes](#removing-indexes)
    - [When to use an index](#when-to-use-an-index)
    - [Looking for "expensive" queries](#looking-for-expensive-queries)
  - [2.1.6. Rules of Thumb](#216-rules-of-thumb)
  - [2.1.7. Quiz](#217-quiz)
  - [2.1.8. Materialized Views (Indexed Views)](#218-materialized-views-indexed-views)
    - [Indexed views: benefits](#indexed-views-benefits)
    - [Indexed views: restrictions](#indexed-views-restrictions)
    - [Indexed views: schema binding](#indexed-views-schema-binding)
    - [Indexed view: example](#indexed-view-example)
  - [2.1.9. Index Statistics](#219-index-statistics)
    - [Index usage statistics](#index-usage-statistics)
  - [2.1.10. Storage \& Partitions](#2110-storage--partitions)
    - [Storage: files \& filegroups](#storage-files--filegroups)
    - [Storage: space allocation](#storage-space-allocation)
    - [Storage: examples](#storage-examples)
    - [Storage: conclusions](#storage-conclusions)
    - [Partitioning](#partitioning)
    - [Create table in filegroup](#create-table-in-filegroup)
    - [Create index in filegroup](#create-index-in-filegroup)
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

### Covering index: example (db xtreme with script EmployeeIdx)

### Use of indexes with functions and wildcards

## 2.1.4. Concatenated Indexes

### 1 index with several columns vs. several indexes with 1 column

### Sort order with concatenated indexes

## 2.1.5. Working with Indexes

### Creation of indexes: syntax

### Removing indexes

### When to use an index

### Looking for "expensive" queries

## 2.1.6. Rules of Thumb

## 2.1.7. Quiz

## 2.1.8. Materialized Views (Indexed Views)

### Indexed views: benefits

### Indexed views: restrictions

### Indexed views: schema binding

### Indexed view: example

## 2.1.9. Index Statistics

### Index usage statistics

## 2.1.10. Storage & Partitions

### Storage: files & filegroups

### Storage: space allocation

### Storage: examples

### Storage: conclusions

### Partitioning

### Create table in filegroup

### Create index in filegroup

### Partitions: example (db stackoverflow)
