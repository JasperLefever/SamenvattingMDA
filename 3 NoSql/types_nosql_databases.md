# 3.3. Types of NoSQL databases

- [3.3. Types of NoSQL databases](#33-types-of-nosql-databases)
  - [3.3.1. Key-Value Stores](#331-key-value-stores)
    - [Caching oplossing:](#caching-oplossing)
    - [NoSQL clusters](#nosql-clusters)
  - [3.3.2. Tupel and Document Stores](#332-tupel-and-document-stores)
    - [Tupel Store](#tupel-store)
    - [Document Store](#document-store)
    - [Items with keys](#items-with-keys)
    - [Filters and Queries](#filters-and-queries)
    - [MongoDB](#mongodb)
    - [SQL After ALL](#sql-after-all)
  - [3.3.3. Column Oriented](#333-column-oriented)
  - [3.3.4. Graph Databases](#334-graph-databases)
    - [What is a graph?](#what-is-a-graph)
    - [What is a graph database?](#what-is-a-graph-database)
    - [Worked example - or How do differrent database solutions differ?](#worked-example---or-how-do-differrent-database-solutions-differ)
      - [Relational database:](#relational-database)
      - [Document database:](#document-database)
      - [Graph database:](#graph-database)
    - [Should I use a graph database?](#should-i-use-a-graph-database)

## 3.3.1. Key-Value Stores

- Data opgeslaan als een key-value pair.

  - Hashmap, hash table of dictionary.

- De key is een unieke identifier voor de value.
- De value kan een string, blob, JSON, XML, ... zijn.

Elke record mag dus een volledig ander data type en structuur hebben.

Het is de job van de applicatie om de data te interpreteren. De databank 'does not care'. Jij zegt gewoon tegen de databank ik wil deze data of dit opslaan maar de databank weet niet wat het is.

**Voorbeeld** Key-Value store: **Redis**

NoSQL is gemaakt met horizontal scaling in gedachte. Distribueren hashtabel over verschillende servers(opslag locaties).

Als je de hashes willen versprijden over 3 servers:

- index(hash) = mod(hash, nrServers) + 1
  - index(hash) = hash % nrServers + 1

![voorbeeld](./assets/key_value_voorbeeld.png)

### Caching oplossing:

- Memcached
  - implemneteerd een gedistribueerde geheugen gebaseerde key-value store die voor een SQL databank(mysql, mssql) staat om queries te cachen.
    -> VOORBEELD SLIDE 10

### NoSQL clusters

- Clustering:

  - groep servers samenwerken als 1 systeem

- Request coordination

  - Alle nodes hebben zelfde functionaliteit
  - geen MASTER node -> geen single point of failure
  - Alle nodes kunnen dus de coordinator zijn
  - Moet protocol zijn dat nodes weten van elkaar en voor faal detectie

- [Consistent hashing](https://www.youtube.com/watch?v=UF9Iqmg94tk) -> chinese goat

  - Consystent hashing wordt gebruikt om de data te verdelen over de nodes zodat er indien het aantal nodes veranderd de data niet te veel moet verplaatst worden.
  - ring-topologie -> representatie van alle hashes in een ring vorm
  - Elke key wordt gehashed en op de ring geplaatst.
  - Vervolgens wordt deze aan de eerste node toegekend die je tegenkomt als je de ring rond gaat in de klokzin.
  - ![consistent hashing](./assets/consistent_hashing.png)
  - Bij een goeie hashfunctie zal de verdeling per server ongeveer 1/n zijn.
  - Meeste keys zullen dus ook niet verplaatst moeten worden als er een node bijkomt of wegvalt.
  - ![consistent hashing2](./assets/consistent_hashing2.png)

- Replication and redundancy

  - Probleem consistent hashing: 2 nodes dicht bij elkaar -> 1 van de nodes zal veel meer keys hebben dan de andere.
  - Daarom worden nodes op meerdere plaatsen op de ring geplaatst. (replicas) -> dezelfde node op meerdere plekken voor betere spreiding.
  - != redundancy -> het is nog steeds dezelfde node maar op een andere plaats. Zelfde data dus. -> virtual node
  - Het is ook mogelijk een volledig redundante node te hebben. -> backup node

- Eventual consistency

  - Membership protocol kan niet garanderen dat elke node op de hoogte is van elke andere node.
  - Staat netwerk is niet consistent op elk moment. Maar het moet eventueel in een consistente state komen.
  - BASE principle <=> ACID:
    - Basicly Available
    - Soft state -> systeem veranderd over tijd zelfs als er geen input is
    - Eventual consistency
  - CAP theorem -> distributed system kan niet alle 3 de eigenschappen hebben op zelfde moment:
    - Consistency -> alle nodes zien zelfde data op zelfde moment
    - Availability -> elke request krijgt een response
    - Partition tolerance -> systeem blijft werken als er een node wegvalt of bijkomt
  - Meestal offeren nosql databases consistency op en streven voor eventueel consistent te zijn.
  - Consistency and availability -> voorbeeld slide 35

![cap](./assets/cap.png)

- Stabilizaton

  - De operatie die zorgt dat bij het toevoegen / verwijderen van een node de data op de juiste node komt te staan.
  - Consistent hashing schema? -> minimale data verplaatsing

- Integrity contrains and querying
  - Niet veel mogelijkheden om data te queryen -> bv put set
  - Geen relaties of schema
  - geen structuur
  - databank weet niks over de data
  - primary key access -> snel

## 3.3.2. Tupel and Document Stores

### Tupel Store

Zeer gelijkaardig aan key-value store maar hier wordt de unieke key opgeslaan en de bijhorende vector van waarden. (een referentie naar de data).

Schema loos -> geen structuur

Organiseren van gelijkaardige data -> groeperen met collecties

> Person:marc -> ("Marc", "McLast Name", 25, "Germany")
> Person:harry -> ("Harry", "Smith", 29, "Belgium")
> Painting:lamgods →(“Lam Gods”,”Van Eyck”,”Gent”)

### Document Store

Slaan een collectie van gelabelde attributen op. (JSON, XML, ...)
Semi-structured data

Tegenwoordig vaak JSON

![blablibla](./assets/docustore.png)

### Items with keys

Document stores laten toe p te slaan in een collectie van gelabelde attributen maar moet een primaire key gespecifieerd worden.

Deze key wordt gebruikt als partition key om de data te verdelen en te weten waar de data opgeslaan is.

### Filters and Queries

Primairy key access -> snel

Maar meeste document stores laten ook toe om te filteren op andere attributen.

Kunt delen van een document ophalen en updaten.

Document databases zijn de meest gebruikte NoSQL databases. -> mongoDB en couchDB

### MongoDB

Meest bekende document store.

Sterk consistent by default -> als je data opslaat is het direct beschikbaar.

MongoDb is single master -> 1 node is verantwoordelijk voor het schrijven van data. (primary node)

Kunt kiezen voor secondairy node te lezen maar dan -> eventual consistency

### SQL After ALL

Filtering en queries zijn redelijk ingewikkeld in NoSQL databases.

Daarom gebruiken meeste NoSQL databases een SQL interface om queries te doen.

Whatever dit moet zijn?

> Many RDBMS vendors start implementing NoSQL by:
>
> Focusing on horizontal scalability and distributed querying.
> Dropping schema requirements.
> Support for nested data types or allowing to store JSON directly in tables.
> Support for GROUP BY like operations.
> Support for special data types, such as geospatial data.

## 3.3.3. Column Oriented

VOORBEELD:

If there are null fields in the data, the representation in a column-oriented database would reflect these nulls in the respective columns. Let's modify the previous example to include some null values:

**Row-Oriented Database with Null Values:**

| Book ID | Title                   | Author              | Published Year | Genre     |
| ------- | ----------------------- | ------------------- | -------------- | --------- |
| 1       | The Great Gatsby        | F. Scott Fitzgerald | 1925           | Novel     |
| 2       | 1984                    | George Orwell       | 1949           | Dystopian |
| 3       | To Kill a Mockingbird   | Harper Lee          | 1960           | Novel     |
| 4       | A Brief History of Time | Stephen Hawking     | (null)         | Science   |
| 5       | (null)                  | Agatha Christie     | 1934           | Mystery   |

**Column-Oriented Database with Null Values:**

**Column 1 - Book ID:**
| Book ID |
|---------|
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |

**Column 2 - Title:**
| Title |
|------------------------|
| The Great Gatsby |
| 1984 |
| To Kill a Mockingbird |
| A Brief History of Time|
| (null) |

**Column 3 - Author:**
| Author |
|---------------------|
| F. Scott Fitzgerald |
| George Orwell |
| Harper Lee |
| Stephen Hawking |
| Agatha Christie |

**Column 4 - Published Year:**
| Published Year |
|----------------|
| 1925 |
| 1949 |
| 1960 |
| (null) |
| 1934 |

**Column 5 - Genre:**
| Genre |
|----------|
| Novel |
| Dystopian|
| Novel |
| Science |
| Mystery |

In this example:

- The "Published Year" for the book "A Brief History of Time" is null.
- The "Title" for one of Agatha Christie's books is unknown or not provided (represented as null).

In a column-oriented database, these null values would be handled according to the strategies mentioned earlier, like sparse storage, bitmap indexing, or run-length encoding. For example, the database might store the "Published Year" column using sparse storage or a bitmap index, efficiently representing the absence of a value for "A Brief History of Time". This approach allows for more efficient storage and querying, especially in scenarios where null values are common.

Handig als je vaak queries doet over grote hoeveelheiden gelijke data items.

Vak in combinatie met in-memory databases.

Voordelen:

- Agrergatie queries zijn snel -> group by
- null waarden zijn niet opgeslaan -> minder opslag
- SELECT met filtering kan direct worden uitgevoerd

Nadelen:

- JOINs zijn traag
- SELECT van 1 entity is traag

- Voorbeelden: Cassandra, Google BigTable, HBase, Parquet, ...

## 3.3.4. Graph Databases

Een hoop interesse in graph databases.

### What is a graph?

Een Graph database is een database die data opslaat in de vorm van een gerichte graaf.

Een graaf is een collectie van nodes die met elkaar verbonden zijn door bogen. Deze bogen repsenteren de connecties tussen de nodes.

Een directe graaf is een graaf waarbij de bogen een richting speifieke richting hebben.

Familie stamboom, Metro kaart -> grafen

Het internet is ook 1 grote graaf. servers en computers zijn de nodes en de links tussen de servers zijn de bogen.

### What is a graph database?

Graph-databases bieden een unieke en efficiënte manier om complexe gegevensrelaties te hanteren, wat verschilt van traditionele databasemodellen. Hier is een uiteenzetting van hun belangrijkste kenmerken:

1.  **Knopen en Randen als Eersterangs Entiteiten**

- **Knopen**: Vertegenwoordigen de entiteiten in uw database, zoals mensen, plaatsen of voorwerpen.
- **Randen**: Definiëren de relaties tussen knopen, zoals "vriend van," "gelegen in," of "bezit."

2.  **Natuurlijke Weergave van Gegevens**

- Nabootsen van interacties en relaties in de echte wereld op een intuïtievere manier.
- Maakt een directere afbeelding van complexe, onderling verbonden gegevens mogelijk.

3.  **Schema-Loze Natuur**

- Biedt flexibiliteit vergelijkbaar met Document- of Sleutel/Waardeopslag databases.
- U kunt de structuur van uw gegevens naar wens definiëren of wijzigen, zonder strikte schema-beperkingen.

4.  **Ondersteuning voor Relaties**

- Ondanks het schema-loze karakter, beheren grafiekdatabases relaties op een manier vergelijkbaar met Relationele Databases.
- Ze begrijpen inherent de verbindingen tussen entiteiten zonder de noodzaak voor koppelingstabellen of geneste documen

5.  **Flexibiliteit in Gegevensmodellering**

- Biedt meer vrijheid bij het definiëren van gegevensmodellen, wat leidt tot snellere projectiteraties.
- Aanpasbaar aan veranderende vereisten zonder uitgebreide databaseherontwerp.

6.  **Elegante Oplossing voor Complexe Relaties**

- Vermijdt de complexiteit van koppelingstabellen of geneste documenten die nodig zijn in andere databasesystemen.
- Biedt een eenvoudige benadering om ingewikkelde gegevensrelaties in kaart te brengen.

7. **Toepassing van Grafentheorie**

- Maakt efficiënt gebruik van grafentheorieconcepten voor gegevensanalyse.
- Nuttig voor het ontdekken van inzichten zoals kortste paden tussen knopen of het identificeren van verschillende groepen binnen de gegevens.

8.  **Ontdekking van Verborgen Verbindingen**

- Vergemakkelijkt de identificatie van patronen en relaties die niet direct duidelijk zijn.
- Bijzonder krachtig in scenario's zoals sociale netwerkanalyse, fraudeopsporing of aanbevelingssystemen.

Samengevat excelleren grafiekdatabases in scenario's waar relaties en verbindingen sleutelaspecten zijn van de gegevens. Ze bieden een flexibele, intuïtieve en efficiënte manier om complexe netwerken van gegevens te vertegenwoordigen en te analyseren, waardoor diepere inzichten en een natuurlijkere gegevensmodellering mogelijk zijn.

### Worked example - or How do differrent database solutions differ?

- Simpel social media voorbeeld

Uitgewerkt in:

- Relational database
- Document database
- Graph database

Overal 1 vraag proberen te beantwoorden: "All of the Friends of any User who has Liked one of my Posts, in alphabetical order of username"

#### Relational database:

![relational social media](./assets/relational.png)

Nodige querry:

```sql
select l.user_id,u.username
from posts p join likes l on p.post_id = l.post_id -- likes of my posts
join friends f on l.user_id = f.user_id  -- friends of users who liked my posts
join users u on f.user_id = u.user_id  -- usernames of those friends
where p.author = 10  -- my posts
order by username desc;
```

Zoals je kan zien is dit een vrij complexe query. Het werkt maar is alles behalve efficient.

#### Document database:

```json
Users
{
  "user_id": "u1",
  "username": "grahamcox",
  "friends": {
    "u2": "2017-04-25T06:41:11Z",
    "u3": "2017-04-25T06:41:11Z"
  }
}
Posts
{
  "post_id": "p1",
  "author": "u1",
  "title": "My first post",
  "content": "This is my first post",
  "created": "2017-04-25T06:41:11Z",
  "likes": [ "u2" ]
}
```

Hier zijn er maar 2 collecties nodig. 1 voor de users en 1 voor de posts.

de links tussen user en user en van user naar post zijn moeilijker te beheren.

Meeste document databases hebben geen support voor relationele integriteit, deze cross-links moeten dus door de applicatie worden onderhouden.

Er zijn hier meerdere queries nodig om de data op te halen.

1. Find all of my posts, which will include the IDs of all of the users who have liked them.

2. Find all of the users who liked any of my posts, which will include the IDs of all of the friends of those users

3. Find all of the usernames that will actually solve our query

Het feit dat we hier meerdere querries moeten doen is niet zo fijn.

#### Graph database:

![graph social media](./assets/graph.png)

2 soorten nodes en 3 soorten bogen.

Elke boog kan ook mogelijke data bevatten zoals de datum van de vriendschap of de datum van de like.

Querry:
Cypher query language -> veel leesbaarder dan relationeel

```
MATCH (:User {id:{author}}) <-[:AUTHOR]- (:Post) <-[:LIKES]- (:User) <-
[:FRIENDS]- (u:User) RETURN (u)
```

Voordeel van graph is dat je nooit moet zeggen hoe die relaties moet verbinden. Je de databank zoek zelf de links op.

### Should I use a graph database?

- Als je veel relaties hebt is een graph database een goeie keuze.
- Veel many-to-many relaties -> graph beter dan relationeel

> Graph Databases are generally much more flexible in the way that they allow you to store data, allowing
> for much more fluidity of the data present in each location. If your data needs are such that the schema
> is not absolutely rigid then a Graph Database may be a better fit, even if a Relational Database fits your
> needs otherwise.

Indien je vanplan bent veel complexe analyses of potentieel dure querries uit te voeren is een graph database ook een goeie keuze.
