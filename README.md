# Dokumentasjon for Prosjekt 3

## Intro

I denne oppgaven har gruppen utviklet frontend og backend for en webapplikasjon med informasjon om filmer som inneholder søk og interaksjon med søkeresultatet. I dette prosjektet har gruppen basert seg på GraphQL for å hente data fra databasen. Databasen som er brukt er MongoDB og i databasen har gruppen lagt inn et datasett med 2000 filmer.

## Innhold og funksjonalitet

**Søkemulighet og filtrering** \
På nettsiden er det mulig å søke på ulike filmer basert på tittel, skuespiller eller kategori. Hva brukeren ønsker å søke på kan endres i en nedtrekksmeny ved siden av søkefeltet. Søket gjøres basert på hele datasettet ved hjelp av GraphQL queries i tjeneren. For å håndtere både store og små bokstaver som brukerinput, brukes changeHandler til å endre slik at første bokstav blir stor og resten små, fordi det er sånn det er oppgitt i databasen.

**Listebasert presentasjon med paginering**\
Filmene presenteres på sider med 21 elementer ved hjelp av paginering. Dette gjøres for å senke tidsbruket for innlasting av filmene for bedre brukeropplevelse. For å ha paginering, er det en GraphQL query i tjeneren som tar inn skip og limit argumenter. Querien moviesBySerach blir kalt på en gang per side, og argumentene tilpasser seg den valgte siden ved hjelp av tallene nederst på siden. Ved søk endres antall resultater og dermed også antall sider med filmer. Det brukes da en query i tjeneren som heter movieCountBySerach til å hente ut totalt antall filmer som samsvarer med søket. Resultatet brukes til å sette antall sider som finnes, og etter et nytt søk blir man automatisk tatt til første side.

**Mer detaljer om hvert objekt**\
Ved å klikke på en film i presentasjonen blir brukeren tatt med til url-en /movies/:movieID.  
På denne siden vises tittel, skuespillere, beskrivelse, kategori, poster, trailer og liknende filmer for den spesifikke filmen dersom det er oppgitt i databasen.

**Brukergenererte data som lagres**\
En bruker som ikke har brukt siden tidligere må starte med å registrere seg. Dette gjøres ved å mutere en ny bruker til databasen med fornavn, etternavn, brukernavn og passord. Videre må brukeren logge inn med brukernavn og passord. For å logge brukeren inn brukes det en query som leter etter en bruker i databasen med samsvarende brukernavn og passord, som det brukeren skriver inn. Ved vellykket innlogging lagres brukerID og en isLoggedIn-state ved hjelp av SessionStorage.

Inne på en filmside kan brukeren legge til eller fjerne filmen fra sine likte filmer ved å trykke på stjernesymbolet. Ved å klikke på Liked Movies i headeren blir brukeren omdirigert til en oversikt over brukerens likte filmer. For hver bruker lagres det en liste med tittelen til likte filmer. Listen endres ved hjelp av mutasjoner til databasen.

SessionStorage brukes til å bestemme hvilke sider brukeren har tilgang til basert på om den er innlogget eller ikke, og til at likte filmer blir lagt til brukeren med samsvarende brukerID som brukeren logget inn med. Dette er ikke en sikker løsning, men fordi det ikke er fokus på sikkerhet i dette prosjektet, har gruppen valgt å løse innlogging på denne måten.

**Universell utforming/Web accessibility**\
Universell utforming handler om at produktet skal være designet slik at det kan brukes for alle. I utvikling av websider er det derfor viktig å tilrettelegge for at nettsiden også kan brukes av de med funksjonshemninger. Gruppen har lagt til rette for brukere med nedsatt motorikk ved å implementere mulighet for at brukeren kan navigere seg rundt på siden med hjelp av tastaturet. Dette er gjort ved å legge inn tabIndex={0} og onKeyDown={(e: React.KeayboardEvent<HTMLInputElement>) => { e.key === “Enter” && nav(‘/movie/’ + id).

**Bærekraftig utvikling**\
Bærekraftig utvikling handler om å ta valg som er energibesparende og igjen bidrar til mindre karbonutslipp. Gruppen har valgt å senke kvaliteten på bildene som vises fordi bilder står for en stor del av datatrafikken, samt bidrar til at tiden for innlasting av siden reduseres. Film står for mye datatrafikk og energibruk på klienten. På siden som viser info om en film har gruppen lagt inn traileren til filmen, men denne spilles ikke av automatisk, som er energibesparende og dermed bærekraftig.

**Design**\
Websiden har et responsivt design som er laget ved hjelp av flexbox og wrap i en css fil. Websiden ble først designet i Figma for at gruppen skulle ha et utgangspunkt og felles forståelse for utviklingen. Videre er komponentene stylet både med en css fil, inline styling og Material UI komponenter.

## Teknologi

**Typescript og React**\
I prosjektet er det brukt React med Typescript i klienten. Dette er en kombinasjon gruppen ble godt kjent med i prosjekt 2.

**State management**\
Gruppen bruker Recoil global state management til å lagre hva søket skal basere seg på og hvordan resultatet skal sorteres. Dette gjør at hvis man for eksempel går til likte filmer og tilbake til hovedsiden, vil parameterne som var lagt inn før man forlot siden fortsatt være lagret. Dersom brukeren oppdaterer siden, vil søket og sorteringen nullstille seg til utgangs-søket, som er basert på filmer og sortert fra ny til gammel på utgivelsesår.

**GraphQL**\
GraphQL er et query language som brukes mellom tjeneren og klienten. Klienten sender query og mutation spørringer til backend ved hjelp av apollo client. I tjeneren er det skrevet spørringer i schema som henter ut akkurat det brukeren ønsker fra databasen.

**Bruk av relevante komponenter og bibliotek** \
Gruppen har brukt komponenter fra Material UI der det har vært hensiktsmessig i forhold til ønsket design. Fordelen med å benytte seg av komponenter fra Material UI er at gruppen sparer mye tid ved å slippe egendefinert styling. Komponenten for paginering er hentet fra Material UI, og sparte gruppen for mye tid framfor å lage denne selv fra bunnen.

## Testing

**Enhetstesting**\
Gruppen har skrevet to enhetstester. HomePage.test.tsx tester at HomePage rendres. I Movies.test.tsx blir det mocket graphql slik at man kan teste at movies-komponenten rendrer som den skal, uten å være avhengig av å være tilkoblet backend. Her blir det testet at dummy-dataen blir omgjort til film-objekter. Dette testes ved å sjekke at filmtitlene fra dummy-dataen ligger i dokumentet.

**Snapshot testing**\
Snapshot tester er nyttig for å forsikre seg om at grensesnittet ikke endrer seg uventet. Gruppen gjennomførte snapshot test av App-komponenten i App.test.tsx, ved hjelp av rammeverket jest. Testen vil feile dersom snapshotet, som blir automatisk generert fra et referanse-snapshot, ikke matcher snapshotet som rendrer gjennom app-komponenten. Da har det enten hendt en uventet endring i komponenten, eller så må referanse-snapshotet bli oppdatert til den nyeste versjonen av app-komponenten. Dette påvirket gruppen da testen ble skrevet før prosjektet var ferdigstilt, og var nødt til å flere ganger redigere komponent-testen og slette snapshotet for å generere det på nytt til den oppdaterte versjonen.

**Automatisert end-2-end testing**\
Cypress har blitt tatt i bruk for å skrive end-to-end-tester. Disse ligger i filen “Test1.cy.tsx”. Når man kjører test-filen blir det meste av sidens funksjonalitet simulert. Første gang man åpner test filen vil man bli logget inn og testen vil være vellykket. Hvis man prøver å gjenta testen når man allerede er logget inn vil denne feile. Etter innloggingen vil hjemmesiden bli testet. Her blir det sjekket at filmer blir vist, at man havner på en egen side når man trykker på en av filmene, og at det her inne ligger lignende filmer. Etter dette blir ulike deler av search baren testet. Til slutt simuleres det at bruker kan like en film og at denne deretter vil ligge i en liste over likte filmer.
