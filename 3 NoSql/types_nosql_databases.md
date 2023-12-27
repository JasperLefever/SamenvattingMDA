# 3.3. Types of NoSQL databases

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
  - ![consistent hashing](./assets/consistent_hashing.png.png)
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

## 3.3.3. Column Oriented

## 3.3.4. Graph Databases
