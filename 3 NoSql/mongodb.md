# 3.4. MongoDB

- [3.4. MongoDB](#34-mongodb)
  - [3.4.1 Introduction to MongoDB](#341-introduction-to-mongodb)
    - [Document Database](#document-database)
    - [Collections](#collections)
  - [3.4.2 MongoDB CRUD operations](#342-mongodb-crud-operations)
    - [Database](#database)
    - [CREATE](#create)
    - [READ](#read)
    - [UPDATE](#update)
    - [DELETE](#delete)
  - [3.4.3 Excersises](#343-excersises)
  - [3.4.4 Introduction](#344-introduction)
  - [3.4.5 Single Purpose Aggregation Operations](#345-single-purpose-aggregation-operations)
  - [3.4.6 Aggregation Pipeline](#346-aggregation-pipeline)
  - [3.4.7 Examples Zipcodes](#347-examples-zipcodes)
  - [3.4.8 Examples User Preference Data](#348-examples-user-preference-data)
  - [3.4.9 Pipeline Operations](#349-pipeline-operations)
  - [3.4.10 Excersises](#3410-excersises)

## 3.4.1 Introduction to MongoDB

### Document Database

- MongoDB -> Document Database
- JSON achtig
- Field - Value

FIELD: Value

```json
{
  "name": "John",
  "age": 25,
  "addresses": [
    {
      "street": "Main Street",
      "city": "New York"
    },
    {
      "street": "Broadway",
      "city": "New York"
    }
  ]
}
```

Voordelen documents:

- De documenten komen overeen met de objecten in de applicatie
- Embedded documents -> geen joins
- Dynamisch schema -> polymorfisme

### Collections

Hierarchie mongodb:
datanase > collection > document > field > key/value

Vergelijking met SQL:

| SQL           | MongoDB    |
| ------------- | ---------- |
| Database      | Database   |
| Table         | Collection |
| Row of record | Document   |
|               | Field      |
|               | Key/Value  |

Een collectie is te vergelijken met een tabel maar een collectie kan documenten bevatten met verschillend schema.

Elk document moet verplicht een `_id` bevatten.

MongoDB slaat de documenten op in BSON (Binary JSON). BSON binair formaat van JSON. (heeft meer types dan JSON)

## 3.4.2 MongoDB CRUD operations

### Database

Geruiken / aanmaken van een database: `use <database>`

NOTE: De database wordt pas aangemaakt als er een document in wordt opgeslagen.

Verwijderen van een database: `db.dropDatabase()`

### CREATE

Toevoegen nieuw document: `db.<collection>.insert(<document>)`

NOTE: Als de collectie nog niet bestaat wordt deze aangemaakt.

Sinds V3.2:

- 1 Toevoegen: `db.<collection>.insertOne(<document>)`
- Meerdere toevoegen: `db.<collection>.insertMany(<documents>)`

### READ

Alle documenten uit een collectie: `db.<collection>.find()`

Zoeken naar een document: `db.<collection>.find(<query>)`
BV `db.<collection>.find({name: "John"})`

NOTE: DE TYPES VAN DE QUERY MOETEN OVEREENKOMEN MET DE TYPES VAN DE DOCUMENTEN IN DE COLLECTIE. "1" is niet gelijk aan 1.

- \$gt: greater than: `db.<collection>.find({age: {$gt: 25}})`
  - leeftijd groter dan 25
- \$gte: greater than or equal: `db.<collection>.find({age: {$gte: 25}})`
  - leeftijd groter dan of gelijk aan 25
- \$lt: less than `db.<collection>.find({age: {$lt: 25}})`
  - leeftijd kleiner dan 25
- \$lte: less than or equal `db.<collection>.find({age: {$lte: 25}})`
  - leeftijd kleiner dan of gelijk aan 25

Je kunt deze ook combineren om een range te maken:

- `db.<collection>.find({age: {$gt: 25, $lt: 30}})`
  - leeftijd tussen 25 en 30

Zoeken op een object in een document: `db.<collection>.find({"object.key": value})` -> zelfde als javascript

- `db.<collection>.find({"addresses.city": "New York"})`

Wil je bepaalde velden niet of wel terug krijgen in de resultaten kun je een tweede parameter meegeven aan de find functie:

- `db.<collection>.find({<query>}, {name: 1, age: 1})`
  - 1: wel terug geven
  - 0: niet terug geven
  - \_id wordt altijd terug gegeven tenzij je deze expliciet uitsluit
- `db.<collection>.find({<query>}, {name: false, age: false})`

  - kan ook met true / false

- \$ne: not equal `db.<collection>.find({age: {$ne: 25}})`
  - leeftijd niet gelijk aan 25
- \$in: in `db.<collection>.find({age: {$in: [25, 30]}})`
  - leeftijd is 25 of 30
- \$nin: not in `db.<collection>.find({age: {$nin: [25, 30]}})`
  - leeftijd is niet 25 of 30
- \$or: or `db.<collection>.find({$or: [{age: 25}, {age: 30}]})`
  - leeftijd is 25 of 30
- \$nor: not or `db.<collection>.find({$nor: [{age: 25}, {age: 30}]})`
  - leeftijd is niet 25 of 30
- \$and: and `db.<collection>.find({$and: [{age: 25}, {name: "John"}]})`
  - leeftijd is 25 en naam is John

### UPDATE

### DELETE

## 3.4.3 Excersises

---

## 3.4.4 Introduction

## 3.4.5 Single Purpose Aggregation Operations

## 3.4.6 Aggregation Pipeline

## 3.4.7 Examples Zipcodes

## 3.4.8 Examples User Preference Data

## 3.4.9 Pipeline Operations

## 3.4.10 Excersises

```

```
