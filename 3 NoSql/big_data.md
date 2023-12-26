# 3.1. Big Data

- [3.1. Big Data](#31-big-data)
  - [3.1.1. Information Management](#311-information-management)
    - [Decision Support System (DSS)](#decision-support-system-dss)
    - [Traditional systems](#traditional-systems)
    - [What do users want?](#what-do-users-want)
    - [What do we usally have? in theory](#what-do-we-usally-have-in-theory)
    - [What do we usally have? in practice](#what-do-we-usally-have-in-practice)
    - [How does Big Data fit in these pictures?](#how-does-big-data-fit-in-these-pictures)
  - [3.1.2. What are big data?](#312-what-are-big-data)
    - [Big Data: Just the next hype or reality?](#big-data-just-the-next-hype-or-reality)
    - [Definitie van johaneke](#definitie-van-johaneke)
  - [3.1.3. The origin of big data](#313-the-origin-of-big-data)
    - [IoT](#iot)
  - [3.1.4. The 4 V's of big data](#314-the-4-vs-of-big-data)
    - [Big data challenges](#big-data-challenges)
    - [Big Data](#big-data)
    - [Varied Data](#varied-data)
    - [Fast Data](#fast-data)
    - [Voluminous, fast and varied data](#voluminous-fast-and-varied-data)
    - [Bad Data (bad veracity)](#bad-data-bad-veracity)
    - [Example inconsistent data](#example-inconsistent-data)
  - [3.1.5. Some other V's (virgin oil)](#315-some-other-vs-virgin-oil)
  - [3.1.6. Bottlenecks](#316-bottlenecks)
  - [3.1.7. Usages](#317-usages)

## 3.1.1. Information Management

Data wordt opgehaald uit een **data bron** -> wordt verwerkt -> wordt verstuurd naar een user interface.

### Decision Support System (DSS)

- **Decusion Support System**
  - computer programma dat helpt bij het nemen van beslissingen
  - binnen een organisatie
  - analyseert (grote hoeveelheden) data
  - presenteerd de best mogelijke beschikbare opties

### Traditional systems

![DDS](./assets/dss.png)

OLTTP = Online Transaction Processing -> korte termijn beslissingen
OLAP = Online Analytical Processing -> middelange en lange termijn beslissingen

### What do users want?

Alle data op 1 logische databse voor analyses: het lijkt dat alle data beschikbaar is vanuit 1 database

### What do we usally have? in theory

Theoretisch wordt de data van verschillende system opgehaald en getransformeerd naar een correct fomaat waarna het naar een Datawarehouse wordt gestuurd voor gemakkelijke BI (Business Intelligence) analyses.

![ETL](./assets/etl.png)

### What do we usally have? in practice

In realiteit is het veel complexer process.
![compexer_etl](assets/complexer_etl.png)

### How does Big Data fit in these pictures?

Croissant? -> Traditionele systemen zijn niet in staat om de grote hoeveelheden data te verwerken. Verder meer details.

## 3.1.2. What are big data?

- Veel verschillende definities -> CONFUSION 🤔

### Big Data: Just the next hype or reality?

-> Was altijd veel besproken

### Definitie van johaneke

> “Data that is not (consciously) entered by a user but
> that arise, often spontaneously, as a by-product of
> other processes and that are (usually) used for purposes
> for which they were not originally intended”

## 3.1.3. The origin of big data

Door internet, sociale media, IoT, ... is er een grote hoeveelheid random data beschikbaar. Met verschillende karakteristieken. -> brengt uitdagingen met zich mee.

> "Der blijft data bijkomen dus moet er altijd vernieuwd worden?
> de big data van vandaag is niet de big data van morgen"
>
> door Lucca

### IoT

Internet of Things -> alles is verbonden met het internet. -> sensors, camera's, ... -> extra data -> BIG DATA

## 3.1.4. The 4 V's of big data

- **Volume**
  - De hoeveelheid data -> data in 'rust' (data at rest)
- **Variety**
  - De verschillende types en bronnen van data
- **Velocity**
  - De snelheid waarmee date komt en gaat -> data in 'beweging' (data in motion)
- **Veracity**
  - De betrouwbaarheid van de data -> data in 'twijfel' (data in doubt)
  - niet alle data is even "correct"
  - qualiteit, accuraatheid, integriteit en credibiliteit van de data
  - "Veracity refers to the quality, accuracy, integrity and credibility of data. Gathered data could have missing pieces, might be inaccurate or might not be able to provide real, valuable insight. Veracity, overall, refers to the level of trust there is in the collected data."

### Big data challenges

- **Volume**
  - BIG data -> horizontaalbare schaalbaarheid / gedistribueerde systemen
  - > "Unlike traditional databases that scale vertically (upgrading a single server with more memory, CPU, etc.), horizontal scaling involves adding more machines to a network, distributing the load."
- **Variety**
  - veel verschillende formaten aan data -> schemaless databases
  - structured(sqldatabase), semi-structured (json files), and unstructured data(social media posts)
- **Velocity**
  - > "Traditional databases that emphasize ACID properties (Atomicity, Consistency, Isolation, Durability) may not cope well with the high velocity of data. Therefore, NoACID databases, which prioritize performance and scalability over strict consistency, are often used in Big Data scenarios."
- **Veracity**
  - Slechte data -> Data veracity handling
  - > "Data veracity handling involves ensuring the accuracy and reliability of data through various means like data cleansing, validation, and verification. Techniques in data quality management and analytics are employed to detect and correct inaccuracies in data."

### Big Data

- SQL databases hebben alsniog de voorkeer voor meeste data gerelateerde applicaties
- Automatiseerde en snelle data generatie en real-time data processing
  - Niewe technologieën
    - NoSQL databases
    - Big data analytics me Python, R, ...

### Varied Data

Bla bla

### Fast Data

IoT metingen -> veel data

Zoals in vliegtuig alle sensor data die moet opgeslaan worden

### Voluminous, fast and varied data

Social media -> veel data elke seconde

### Bad Data (bad veracity)

- niet precies
- vage data
- onzekere data
- incomplete data
- inconsistent data

De grote hoeveelheden data die snel verwerkt moeten worden is kans op slechte data groot(faalende sensoren, ...)

Handelen van slechte en onbekende kwaltiteit data is een uitdaging

-> deze date is ook BIG DATA genoemd

### Example inconsistent data

> In the first COVID wave in
> Belgium, the laboratories
> detected an estimated one-
> thirtieth of the actual corona
> infections, in the second wave
> an estimated one-third. This
> gives the wrong impression
> that the second wave was
> much worse than the first in
> terms of number of infections.

## 3.1.5. Some other V's (virgin oil)

- **Virality**
  - Hoelang blijft de data relevant
  - Hoelang houden we de date
- **Viscosity**
  - Is er voldoende data om een goede analyse te maken
- **Visualization**
  - Kunnen de resultaten van de analyse goed gepresenteerd worden
- **Value**
  - Wat is de waarde van de data
  - > "Data the new gold"

## 3.1.6. Bottlenecks

## 3.1.7. Usages
