# 3.5. Neo4j

## CRUD

https://neo4j.com/docs/cypher-cheat-sheet/5/auradb-enterprise/#_read_query_structure

### Read

> Algemene syntax:
>
> :IETS -> het label van een node of relatie
>
> -[:IETS]-> -> de relatie tussen twee nodes
>
> Waar je m, n en r ziet mag je kiezen hoe deze noemen dit zijn variabelen

```cypher
[USE]
[MATCH [WHERE]]
[OPTIONAL MATCH [WHERE]]
[WITH [ORDER BY] [SKIP] [LIMIT] [WHERE]]
RETURN [ORDER BY] [SKIP] [LIMIT]
```

#### Lees alle nodes

MATCH : zoekt naar nodes die aan de voorwaarden voldoen

```cypher
MATCH (n)
RETURN n
```

#### Lees alle nodes met een bepaald label

```cypher
MATCH (n:LABEL)
RETURN n
```

#### Lees nodes met een bepaalde relatie

```cypher
MATCH (n:LABEL)-[r:RELATIONSHIP]->(m:LABEL)
RETURN n, r, m
```

BV:

```cypher
MATCH (n:Person)-[:OWNS]->(:Car)
RETURN n.name AS carOwners
```

> Match all Person nodes with an OWNS relationship connected to a Car node, and return the name of the carOwners.
>
> AS zorgt ervoor dat je de naam van de kolom kan veranderen

#### Lees nodes met een bepaalde relatie en een bepaalde property

```cypher
MATCH (n:LABEL)-[r:RELATIONSHIP {property: 'value'}]->(m:LABEL)
RETURN n, r, m
```

#### Lees nodes / relaties met bepaalde voorwaarden

```cypher
MATCH (n:LABEL)
WHERE n.property = 'value'
RETURN n
```

```cypher
MATCH (n:LABEL)-[r:RELATIONSHIP]->(m:LABEL)
WHERE r.property = 'value'
```

NOTE: het gebruik van where kan ook door de voorwaarden in de match te zetten

```cypher
MATCH (n:LABEL {property: 'value'})
RETURN n
```

#### Orderby, limit, skip

```cypher
MATCH (n:LABEL)
RETURN n.property
ORDER BY n.property
LIMIT 10
SKIP 10
```

#### Aggregatie

COUNT -> telt het aantal nodes

```cypher
MATCH (n:LABEL)
RETURN count(n)
```

```cypher
MATCH (n:LABEL)
RETURN n.property, count(n)
```

### Create

#### Maak een node

```cypher
CREATE (n:LABEL {property: 'value'})
```

#### Maak node met relatie

```cypher
CREATE (n:LABEL {property: 'value'})-[r:RELATIONSHIP {property : "value"}]->(m:LABEL {property: 'value'})
```

NOTE:je kan reed bestaande nodes gebruiken door de node te matchen en dan te gebruiken in de create

```cypher
MATCH (n:LABEL {property: 'value'})
CREATE (n)-[r:RELATIONSHIP]->(m:LABEL {property: 'value'})
```

### Update

SET keyword

#### Update een node

```cypher
MATCH (n:LABEL)
WHERE n.property = 'value'
SET n.property = 'new value'
```

#### Update een relatie

```cypher
MATCH (n:LABEL)-[r:RELATIONSHIP]->(m:LABEL)
WHERE r.property = 'value'
SET r.property = 'new value'
```

### Delete

#### Verwijder een relatie

```cypher
MATCH (n:LABEL)-[r:RELATIONSHIP]->(m:LABEL)
WHERE r.property = 'value'
DELETE r
```

#### Verwijder alle relaties

```cypher
MATCH ()-[r]->()
DELETE r
```

#### Verwijder een node en zijn relaties

```cypher
MATCH (n:LABEL)
WHERE n.property = 'value'
DETATCH DELETE n
```

NOTE: DETATCH verwijdert alle relaties van de node anders krijg je errors dat de node nog relaties heeft.

## Oefeningen

Musa goat

Als je deze gebruikt ben je een avid supporter van communisme.

### 1. Flights

Create the following airports:

- name: 'JF Kennedy Airport' + city: 'New York'
- name: 'Austin Bergstrom International' + city: 'Austin'

```jsx

create (a:Airport{name:"JF Kennedy Airport", city:"New York"})
create (a:Airport{name:"Austin Bergstrom International", city:"Austin"})
```

Create the following flight:

- flight_number: BG45 + month: August

```jsx
create (f:Flight {flight_number:"BG45",month:"August"})
```

Create the following 2 relationships

- origin of flight with flight_number BG45 was JFK and destination of this flight was Austin Bergstrom
International

```jsx
MATCH (f:Flight {flight_number: 'BG45'}),
      (origin:Airport {name: 'JF Kennedy Airport'}),
      (destination:Airport {name: 'Austin Bergstrom International'})
CREATE (f)-[:ORIGIN]->(origin),
       (f)-[:DESTINATION]->(destination)
```

Answer The Following Questions:

- Retrieve all flights that originate from any airport in Atlanta city that are destined to Dallas/Fort Worth

```jsx
MATCH(oa:Airport)<-[:ORIGIN]-(f)-[:DESTINATION]->(da:Airport) 
where oa.city="Atlanta" and da.city="Dallas/Fort Worth" 
return f.flight_number, f.month
```

- Retrieve all flights that originate from either Atlanta or Dallas/Fort Worth

```jsx
MATCH(oa:Airport)<-[:ORIGIN]-(f) 
where oa.city="Atlanta" or oa.city = "Dallas/Fort Worth" 
return f.flight_number, f.month, oa.city
```

- Retrieve all flights that originate from any city, but not from Atlanta

```jsx
MATCH(oa:Airport)<-[:ORIGIN]-(f) 
where not oa.city="Atlanta"
 return f.flight_number, f.month, oa.city
```

- Retrieve all flights that start from either Atlanta or Dallas/Fort Worth and have been delayed due to late aircraft arrival

```jsx
MATCH (oa:Airport)<-[:ORIGIN]-(f:Flight)-[:DELAYED_BY]->(c:Cause) 
where oa.city = "Atlanta" or oa.city = "Dallas/Fort Worth"
and c.name = "Late Aircraft" return f.flight_number,f.month
```

- Retrieve the delay times of the most delayed flights, along with the flight number and reason for delay (assuming most means most time, not most in number of times the same flight has been delayed)

```jsx
MATCH  (oa:Airport)<-[o:ORIGIN]-(f:Flight)-[:DELAYED_BY]->(c:Cause)
return f.flight_number as flight_number,c.name as cause ,o.dep_delay 
as delay_time order by o.dep_delay desc
```

- Retrieve the unique names of the airports on which flights take off.

```jsx
MATCH(oa:Airport)<-[o:ORIGIN]-(f) return distinct oa.name
```

- Retrieve the 3 most delayed flights (assuming most means most time, not most in number of times the same flight has been delayed)

```jsx
MATCH  (oa:Airport)<-[o:ORIGIN]-(f:Flight)-[:DELAYED_BY]->(c:Cause) 
return f.flight_number as flight_number,c.name as cause ,o.dep_delay 
as delay_time order by o.dep_delay desc limit 3
```

### 2. Simpsons

- List all men over 40 along with their age. For the current year, use date().year. Sort descending by age.

```jsx
MATCH(m:Male) where (date().year-m.yearOfBirth ) >=40 
return m.name, (date().year-m.yearOfBirth ) as age order by age desc
```

- Give the average age of all mothers. For the current year, use date().year.

```jsx
MATCH(f:Female) -[:MOTHER_OF] ->(ch) 
return avg((date().year-f.yearOfBirth))
```

- List all men who are fathers along with their age. For the current year, use date().year. Sort ascending by age.

```jsx
MATCH(m:Male) -[:FATHER_OF]->(ch) 
return distinct(date().year-m.yearOfBirth ) 
as age, m.name  
order by age asc
```

- List all women who are daughters (in the dataset) along with their age. For the current year, use date().year. Sort descending by age.

```jsx
MATCH(f:Female) -[:MOTHER_OF] ->(d:Female) 
return distinct(date().year-d.yearOfBirth ) as age, d.name order by age desc
```

- Give everyone who is simultaneously father and son (in the dataset)

```jsx
MATCH(f:Person) -[:FATHER_OF] ->(ch:Male)-[:FATHER_OF]->(gch:Person) 
return ch
```

- Give all grandfather-grandchildren relationships

```jsx
MATCH (grandfather:Male)-[:FATHER_OF]->(parent)-[:FATHER_OF|:MOTHER_OF]->(grandchild)
RETURN grandfather.name, grandchild.name
```

- Give all couples who have been together for over 50 years in the following way. For the current year, use date().year.

```jsx
MATCH(m:Male)-[rel:TOGETHER_WITH]->(f:Female) where date().year - rel.since >=50
return m.name, f.name,(date().year - rel.since) as years_together
```

### 3 Healthcare

- Give for each patient the number of cancer symptoms

```jsx
MATCH(p:Patient)-[:SHOWS_SYMPTOM]->(s:Symptom)<-[:HAS_SYMPTOM]-(d:Disease) 
where d.name ="Cancer" 
return p.name, count(s) as symptoms_of_cancer
```

- Give for patient John the number of ingredients of pizza John is allergic from

```jsx
MATCH(p:Patient) - [:HAS_ALLERGY] ->(i)-[:IS_INGREDIENT_OF]->(it:Item) 
where it.name="Pizza" and p.name ="John" 
return p.name, count(i)
```

- Give for patient John the number of drugs of his treatments that interacts with the drug Abc

```jsx
MATCH(p:Patient)-[:HAS_TREATMENT]->(t:Treatment)-[:HAS_DRUG]->(od:Drug)
-[:INTERACTS_WITH]->(id:Drug)
where id.name = "Abc" 
return count(od)
```