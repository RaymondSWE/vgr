Det första jag brukar göra när jag får en uppgift är försöka förstå vem som ska använda det. Här handlar det om sjuksköterskor och läkare på vårdcentral. Dom har det stressigt och vill bara att saker ska fungera utan krångel.

**Så vad behöver dom kunna göra?**
- Se vilka artiklar som finns och hur många
- Uppdatera när dom använder eller fyller på grejer  
- Få varning när det börjar ta slut
- Systemet ska inte tillåta minusvärden

För teknik tänker jag Spring Boot på backend. React på frontend för jag känner det bäst. Databas blir SQLite - har mest kört MySQL och PostgreSQL innan så får bli lite läsning först om bägge SQLite och H2.

Databasmässigt behövs bara en tabell. Articles med id, namn, antal, enhet och nån threshold för när det ska varna.

**Min plan ser ut såhär:**
- Dag 1 - Läsa på om SQLite, få igång Spring Boot med databaskopplingen
- Dag 2 - Bygga API:t med CRUD för artiklarna 
- Dag 3 - Frontend som visar listan och låter en ändra antal
- Dag 4 - Lägga till färger när det är lågt lager plus validering
- Dag 5 - Testa att allt hänger ihop, skriva README, städa koden

Det här är ju bara en MVP för en veckas jobb. I verkligheten skulle sånt här behöva autentisering, olika användartyper, notiser när saker tar slut och backup för datan. 

# Dag 1
Jag började dagen med att läsa på om SQLite och H2, jämfört med PostgreSQL som jag är van vid. SQLite visade sig vara enklare, inga docker containers krävdes, bara en fil. När jag tittade på tutorials såg jag dock att man antingen kan ha SQLite in memory eller som en fil. Att ha datan in-memory verkade innehålla mer kod att underhålla, skillnaden är att  datan försvinner vid restart om man har den i minnet, alltså är den 'volatile', till skillnad från med fil där den inte  försvinner. Jag valde att använda mig av fil-baserad SQLite (https://www.baeldung.com/spring-boot-sqlite och https://www.blackslate.io/articles/integrate-sqlite-with-spring-boot)

I backend kommer jag att använda Spring Boot för att skapa REST API, jag kommer även att använda mig utav lombok för att minska på boilerplate-kod samt valideringsbibliotek för att lägga in min validering. För servicefilen kommer jag att utnyttja mig utav Repository-Design Pattern vilket jag sett är väldigt vanligt för spring-boot service folder, alltså kommer det finnas ett Interface för artiklarna som kommer att användas av service klassens implementation.

Målet var att sätta upp hela arkitekturen: models för tabellerna, controller för API endpoints, service och serviceImpl för business-logik, repository för databas-ORM. Senare behövs också CORS-konfiguration för att säga åt servern vilka URL:s som får skicka requests (kommer från application.properties). 

## Antagandet
Jag satt och funderade på om man ska kunna skapa samma artikelnamn flera gånger. Det vill säga om någon lägger in artikeln "Bandage" och någon annan också lägger in artikeln "Bandage" med samma namn.

Min tankegång är att det nog händer i verkligheten, kanske kommer bandage från olika företag eller finns i olika storlekar. Så istället för att krångla till det med att blockera duplicerade artikelnamn väljer jag att hålla det fritt och flexibelt för tillfället. Därav använder jag mig utav en vanlig ’List’ som inte tar hänsyn till om man har samma namn (item) upprepande gånger.

Så för den här veckan blir det enklare att bara låta det vara. Om jag hade mer tid kunde jag lägga till fält för leverantör och storlek så att man ser skillnaden mellan olika "Bandage". Men först fokuserar jag på att få grunden att fungera. 

## Vad som faktiskt blev klart
Fick ihop hela backend-strukturen med alla mappar och filer. Fick också till databaskopplingen med SQLite. Applikationen startar upp utan problem och SQLite-databasen kopplas upp korrekt. Dependency injection fungerar också, vilket är Spring som automatiskt kopplar ihop alla delar. Repository injiceras i Service implementation och service injiceras i Controller.

Jag stötte dock på problem i början av dagen med windows defender och Intellj på min WSL2 (väldigt vanligt problem med intellj och WSL2). Det handlade om att lägga till några exclusions för några processorer och wsl2 directories.

Utöver det verkar allt fungera bra. Imorgon kommer handla om att implementera CORS-config filen och sätta upp de enkla API endpoints i controller och börja testa med Postman. 

