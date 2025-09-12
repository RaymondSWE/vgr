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

# Dag 2
Idag stod det att få API:t att fungera på agendan. Målet var att implementera controllers och få dem testade med Postman samt att börja fundera på errorhantering eftersom att det behövdes redan igår.

## Antagandet
Eftersom jag redan bestämde mig för att tillåta skapandet av duplicerade artikelnamn igår (för flexibilitet), så fokuserade jag idag på att få alla CRUD operationer att fungera smidigt. Jag funderade också över om jag skulle använda DTOs eller bara köra med Article-entiteten direkt.

Efter att ha tänkt och läst på kändes användningen av ett DTO för avancerat för ett enkelt system likt detta, då alla fält kommer att visas för användarna och det inte finns någon känslig data att dölja. Detta hade resulterat i extra komplexitet för en veckas MVP utan att införa någon nytta. 

## Vad som faktiskt blev klart
Fick ihop alla controllers och kunde testa dem med Postman. Jag implementerade grundläggande error handling för att fånga upp vanliga fel som kan uppstå. Alltså om namn eller antal är tomt så får vi inte en 500 (server) status errorkod utan istället ett bad request error.

Detta fungerar genom att använda validation libraries från Spring Boot (@Valid i controllern) och GlobalExceptionHandler som fångar upp felen och returnerar tydliga felmeddelanden. När service lagret kastar exceptions som ArticleNotFoundException så hanteras det automatiskt och vi får HTTP 404 responses istället för server crashes eller returnera null.

En viktig faktor för mig är att alla exceptions ska ha liknande format som hjälper framtida utvecklare att debugga och se till att allt är konsistent. Därför har jag med hjälp av Lombok definierat ett ErrorResponse objekt som innehåller timestamp, status code, error type, message och även fält för visa vilka fält som är felaktiga. Med builder design pattern bygger jag varje exception-funktion så att alla error responses har samma struktur. 

Ett response body exempel som är tagen från Postman testing när exceptions triggas:
```json
{
    "timestamp": "2025-09-11T16:27:43.408303205",
    "status": 400,
    "error": "Validation Failed",
    "message": "Input validation failed",
    "fieldErrors": {
        "unit": "Enhet är obligatorisk",
        "name": "Namn är obligatoriskt"
    }
}
```

CORS-konfigurationen blev också klar, så nu kan frontend och backend kommunicera utan problem. Jag hade stött på CORS-problem i två andra projekt innan så jag visste att browsern blockerar requests från localhost:3000 (React) till localhost:8080 (Spring Boot) som default. Så jag skapade en CorsConfig-klass med @Configuration som öppnar upp för alla endpoints att ta emot requests från frontend.

Jag använde även @Value för att läsa tillåtna origins från application.properties istället för att hardcoda localhost:3000 direkt i koden. På det sättet kan jag enkelt byta till produktionsdomänen senare utan att ändra kod. Konfigurerade också vilka HTTP-metoder som ska vara tillåtna (GET, POST, PUT, DELETE) och satte allowCredentials(true) för framtida behov av autentisering.