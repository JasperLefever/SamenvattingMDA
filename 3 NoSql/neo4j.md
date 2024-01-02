# 3.5. Neo4j

## CRUD

https://neo4j.com/docs/cypher-cheat-sheet/5/auradb-enterprise/#_read_query_structure

### Read

```cypher

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
