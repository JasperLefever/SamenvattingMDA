# 4. Cloud

- [4. Cloud](#4-cloud)
  - [4.1. Cloud Models](#41-cloud-models)
    - [Define cloud computing](#define-cloud-computing)
    - [Describe Public cloud](#describe-public-cloud)
    - [Describe Private cloud](#describe-private-cloud)
    - [Describe Hybrid cloud](#describe-hybrid-cloud)
  - [4.2. Cloud benefits and considerations](#42-cloud-benefits-and-considerations)
    - [Cloud benefits](#cloud-benefits)
    - [Compare CapEx and OpEx](#compare-capex-and-opex)
    - [Consumption-based model](#consumption-based-model)
  - [4.3. Cloud services](#43-cloud-services)
    - [Infrastructure as a Service (IaaS)](#infrastructure-as-a-service-iaas)
    - [Platform as a Service (PaaS)](#platform-as-a-service-paas)
    - [Software as a Service (SaaS)](#software-as-a-service-saas)
    - [Identify a service type based on a use case](#identify-a-service-type-based-on-a-use-case)
    - [Shared responsibility model](#shared-responsibility-model)
  - [4.4. Cloud Databases](#44-cloud-databases)
    - [What is a cloud database?](#what-is-a-cloud-database)
    - [Cloud (Database) Providers](#cloud-database-providers)
  - [4.6. Azure en Microsoft verkoopspraatje van de bovenste plank (Data on Ms Azure)](#46-azure-en-microsoft-verkoopspraatje-van-de-bovenste-plank-data-on-ms-azure)
    - [Roles in Azure](#roles-in-azure)
    - [Data ingestion](#data-ingestion)
    - [Data processing](#data-processing)
    - [Extract, Transform, Load (ETL)](#extract-transform-load-etl)
    - [Extract, Load, Transform (ELT)](#extract-load-transform-elt)
    - [Datalake](#datalake)
    - [Nog veel azure bla bla Slide 35 tot 55 nie echt relevant denk ik](#nog-veel-azure-bla-bla-slide-35-tot-55-nie-echt-relevant-denk-ik)
  - [4.7. Snowflake](#47-snowflake)

## 4.1. Cloud Models

### Define cloud computing

**Cloud computing** is het leveren van computing services (servers, storage, databases, networking, software, analytics, intelligence, etc.) over het internet (the cloud) om sneller te innoveren, resources te schalen en flexibiliteit te bieden.

### Describe Public cloud

- **Public cloud**
  - Aangeboden door externe partij (Hosting provider)
  - Levert middelen en diensten aan meerdere eindegebruikers (bedrijven, organisaties, individuen)
  - Toegang via een beveildigde internetverbinding
  - Enkel betalen voor wat je gebruikt
  - Kan applicatie snel voorzien worden van extra resources
  - Geen upfront kost voor aankoop en onderhoud van eigen hardware

### Describe Private cloud

- **Private cloud**
  - Cloud omgeving door bedrijf zelf beheerd (eigen datacenter)
  - Geen toegang voor andere bedrijven, organisaties of individuen
  - Bedrijf is zelf verantwoordelijk voor service
  - BV: VIC op de HoGent, Elk bedrijf met eigen datacenter voor eigen gebruik
  - Zelf hardware aankopen en onderhouden
  - Volledige controle over resources en beveiliging
  - Zelf verantwoordelijk voor onderhoud

### Describe Hybrid cloud

- **Hybrid cloud**
  - Combinatie van public en private cloud
  - Laat bedrijf toe te kiezen bepaalde applicaties/services in public cloud te plaatsen en andere in private cloud
  - Bedrijf kan bv. eigen datacenter hebben voor eigen gebruik, maar kan ook gebruik maken van public cloud voor bepaalde services
  - Meest flexibele oplossing
  - Bedrijf controleert zelf de veiligheid, compliance of bepaalde legale vereisten

## 4.2. Cloud benefits and considerations

### Cloud benefits

1. **Hoge beschikbaarheid (High availability)**: Constante toegang tot cloud services, zelfs bij storingen.
2. **Schaalbaarheid (Scalability)**: Eenvoudig aanpassen van IT-resources aan veranderende behoeften.
3. **Elasticiteit (Elasticity)**: Automatische aanpassing van resources aan actuele vraag.
4. **Wendbaarheid (Agility)**: Snel nieuwe technologieën implementeren en innovaties doorvoeren.
5. **Wereldwijd bereik (Global reach)**: Snelle en efficiënte service dicht bij eindgebruikers wereldwijd.
6. **Fouttolerantie (Fault tolerance)**: Minimaliseren van uitval en dataverlies door redundante systemen.
7. **Capaciteiten voor klantenlatentie (Customer latency capabilities)**: Door gebruik te maken van geografisch verspreide datacenters kunnen cloudproviders lagere latentietijden bieden, wat betekent dat er minder vertraging is in de interactie tussen de gebruiker en de applicatie, wat vooral belangrijk is voor real-time applicaties.
8. **Voorspelbare kostenoverwegingen (Predictive cost considerations)**: Betere budgetbeheersing door pay-as-you-go betalingsmodellen.

### Compare CapEx and OpEx

- **CapEx (Capital Expenditure)**:

  - Upfront kosten voor aankoop van hardware en software.
  - Kosten van CaoEx hebben een waarde die in de loop van de tijd afneemt.

- **OpEx (Operational Expenditure)**:
  - Kosten voor het gebruik van de hardware en software.
  - Kosten van OpEx zijn meestal recurrent.

Verschil tussen deze twee is gewoon dat CapEx 'eenmalige' kosten zijn en OpEx recurrente kosten. Bij CapEx zal ook af en toe een upgrade moeten gebeuren, wat ook weer een CapEx kost is. OpEx laat minder verassingen toe.

### Consumption-based model

Cloud diensten betaal je op basis van wat je effectief gebruikt. Dit levert volgende voordelen op:

- Betere kost inschatting
- Afreking gebaseerd op effectie gebruikt
- Je weet de prijs op voorhand

## 4.3. Cloud services

### Infrastructure as a Service (IaaS)

- **IaaS**:
  - pay-as-you-go model
  - Geen aankoop van eigen hardware nodig
  - koopt toegang tot servers, storage, netwerken, etc.
  - Je bent zelf verantwoordelijk voor installatie en onderhoud van software je 'huurt' puur de fysieke infrastructuur

### Platform as a Service (PaaS)

- **PaaS**:
  - pay-as-you-go model
  - voorzien van hardware en software tools
  - ze voorzien een 'platform' waarop je je eigen applicaties kan bouwen

### Software as a Service (SaaS)

- **SaaS**:
  - pay-as-you-go model
  - volledig afgewerkte applicaties
  - je hoeft zelf geen hardware, software of infrastructuur te beheren
  - je kan de applicatie gewoon gebruiken
  - BV: Office 365, Google Apps, Salesforce, etc.
  - Vaak met een abbonement

### Identify a service type based on a use case

![Cloud service comparison](./assets/cloud_service_comparison.png)

### Shared responsibility model

![Shared responsibility model](./assets/shared_responsibility_model.jpg)

## 4.4. Cloud Databases

### What is a cloud database?

- **Cloud database**:
  - Database die in de cloud draait (duh)
  - geleverd door de public of private cloud provider
  - data managed op cloud storage
  - deze systemen zijn ontworpen om verschillende applicaties te ondersteunen zoals transactionele, analytische workloads, deep learning en data warehousing

### Cloud (Database) Providers

- **Cloud providers**:
  - [**Microsoft Azure**](#46-azure-en-microsoft-verkoopspraatje-van-de-bovenste-plank-data-on-ms-azure)
  - [**Snowflake cloud database**](#47-snowflake)
  - Amazon Web Services (AWS)
  - Google Cloud
  - IBM
  - Oracle Cloud Architecture (OCI) -> dure vogels
  - Alibaba
  - etc.

## 4.6. Azure en Microsoft verkoopspraatje van de bovenste plank (Data on Ms Azure)

### Roles in Azure

- **Database Administrator**:
  - database beheerder
  - data beveiliging
  - backup en recovery
  - user access
  - monitoring
  - **Tools**:
    - Azure Data Studio -> cross platform lite versie van SSMS
    - SQL Server Management Studio -> Kan alles
    - Azure portal / CLI
      - tool voor het beheren van Azure resources
      - scripting mogelijkheden
- **Data Engineer**
  - Data pipelines en processen
  - Data ingest
  - Data voorbereiden voor analyse
  - Data voorbereiden voor processing
    - **Tools**:
      - Azure Synapse Studio
      - SQL Server Management Studio -> idem
      - Azure portal / CLI -> idem
- **Data Analyst**
  - Levert inzichten uit data
  - Data visualisatie
  - Modeleren van data
  - combineren van data voor visualisatie en analyse
    - **Tools**:
      - Power BI Desktop -> data visualisatie
      - Power BI Portal -> management van Power BI
      - Power BI Report builder -> rapporten maken

### Data ingestion

Data ingestion is het proces van het verplaatsen van data van diverse bronnen naar een opslagmedium waar het verder kan worden opgeslagen, geanalyseerd, en verwerkt. Dit proces is een cruciale eerste stap in data-analyse en business intelligence. Hier zijn enkele kernpunten over data ingestion:

1. **Bronnen**: De data kan afkomstig zijn van verschillende bronnen, zoals databases, bestandssystemen, streaming data (zoals van sensoren of sociale media), en cloud services.

2. **Bestemming**: De bestemming kan variëren van datawarehouses en databases tot cloud-opslag en big data verwerkingssystemen zoals Hadoop of Spark.

3. **Methoden**: Data ingestion kan real-time of batch-gewijs zijn. Real-time (of streaming) data ingestion houdt in dat data continu en direct na het genereren wordt ingevoerd. Batchverwerking daarentegen houdt in dat data in grote, geplande hoeveelheden wordt ingevoerd.

4. **Uitdagingen**: Het omvat het beheren van verschillende dataformaten, het waarborgen van de kwaliteit en consistentie van de data, en het efficiënt verwerken van grote volumes data.

5. **Belangrijk voor analyse**: Na de ingestion wordt de data vaak getransformeerd, geïntegreerd, en geanalyseerd om waardevolle inzichten te verkrijgen.

![Data ingestion](./assets/data_ingest.png)

### Data processing

Data processing is het proces van het verzamelen en manipuleren van ruwe data om nuttige informatie te verkrijgen. Het doel van data processing is om de kwaliteit van data te verbeteren en de verwerkingstijd te verminderen. Het eindreultaat is meestal een set van gestructureerde data.

![Data processig](./assets/data_processing.png)

### Extract, Transform, Load (ETL)

Het verschil tussen "Extract, Transform, Load" (ETL) en "Extract, Load, Transform" (ELT) ligt in de volgorde en locatie waar de data transformatie plaatsvindt in het data verwerkingsproces. Beide zijn methoden voor het verplaatsen van data van één systeem naar een ander, maar ze benaderen het proces anders:

- **ETL (Extract, Transform, Load)**:
  - **Extract**: Data wordt eerst geëxtraheerd uit de bron.
  - **Transform**: Vervolgens wordt deze data getransformeerd, wat betekent dat het wordt schoongemaakt, geaggregeerd, herstructueerd, enz., buiten de bestemmingsdatabase.
  - **Load**: Tenslotte wordt de getransformeerde data geladen in het doelsysteem, zoals een datawarehouse.
  - **Kenmerken**:Het vereist een tussentijds verwerkingsstadium en kan complexer zijn in het beheer.

### Extract, Load, Transform (ELT)

- **ELT (Extract, Load, Transform)**:
  - **Extract**: Net als bij ETL wordt data eerst geëxtraheerd uit de bron.
  - **Load**: De ruwe data wordt direct geladen in het doelsysteem, zoals een datawarehouse of datalake.
  - **Transform**: De transformatie van de data vindt plaats binnen het doelsysteem, nadat het is geladen.
  - **Kenmerken**: Het biedt flexibiliteit omdat de ruwe data beschikbaar is en kan worden getransformeerd naar behoefte.

De data wordt enkel getransformeerd wanneer het nodig is voor analyse.

EEN USECASE:

```
You have data about money from the US, Australia, and Canada. All three
currencies are in dollars.

In a classic DWH setup (with ETL) you would probable convert all data about
money to a single currency, so you can easily add them together when making
reports.

But you can’t just add the dollars together and have a meaningful answer.
Instead, to have a meaningful answer, you have to convert (transform) two of the
three currencies to a common value. Then, and only then, can you add the values
up in a meaningful manner. And even then, the truthfulness of the data is only
relevant to the moment that data has been recalculated because exchange rates
fluctuate on a daily/hourly basis.

```

### Datalake

Een datalake is een gecentraliseerde opslagplaats die grote hoeveelheden ruwe data in zijn oorspronkelijke formaat kan opslaan totdat het nodig is. Het concept van een datalake is vooral populair in big data en analytics

![Datalake](./assets/datalake.png)

### Nog veel azure bla bla Slide 35 tot 55 nie echt relevant denk ik

## 4.7. Snowflake

- defacto standaard voor cloud datawarehousing
- Dataplatform en datawarehouse dat SQL ondersteunt
- Cross-cloud platform

Wordt vervolgd :)
TODO: Finish this
