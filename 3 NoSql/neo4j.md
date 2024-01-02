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
