## Install
To install dependencies: `npm install`

## Run
* To run frontend: `npm run start`
* To run backend: `npm run start-backend`


5. Lakóközösségi könyvelés
Általános leírás
A program célja, hogy megkönnyítse a ház befizetéseit nyilvántartó könyvelő munkáját, illetve hogy személyre szabott jelentéseket tudjon produkálni a lakók számára esetleges számla reklamációk esetén.

Felhasználási esetek
Lakások nyilvántartása
A szoftvernek képesnek kell nyilvántartani több lakás adatait: lakás száma (emelet, ajtó), alapterület (négyzetméterben), légtér (légköbméterben). Alapfeltételezés legyen, hogy egy négyemeletes bérház nyilvántartását könyvelik a programmal.

Lakók nyílvántartása
A rendszer a lakók számára számlát vezet, ahol a befizetéseket és költségeket nyilvántartja. A számlát akkor hozza létre, amikor a lakó beköltözik a lakásba. Lakót törölni a nyilvántartásból nem lehet, még ha el is költözik, hisz tartozásait azután is nyilván kell tartani. Lakó létrehozása a „költözés” funkción keresztül lehet. Itt kiválasztva a lakást, megadva az új lakó nevét, és induló egyenlegét (ami átvállalt tartozásból származhat), a lakó bekerül a nyilvántartásba.

Egyéni befizetések
A rendszerben lehetőség van egyéni befizetések nyilvántartására. Bármely lakó fizethet be tetszőleges összeget. A program nyilvántartja a befizetések idejét, és összegét, illetve a lakó számláján az egyenleget (aktuális tartozások a ház felé).

Költségek elosztása
A szoftvernek alapvetően két lehetőséget kell biztosítani a költségek nyilvántartására: négyzetméter árak felszorzása: pl közös költség kiszámítása, ahol egy négyzetméterre vonatkoztatott díjat kell a lakók számlájára beterhelni. összköltség leosztása: egy nagy összegű díj (pl lépcsőház felújítás) leosztása arányosan az alapterületek szerint. Költséget csak aktív lakóra lehet leosztani. Kiköltözött lakókra csak befizetéseket lehet felvinni. A rendszer nyilvántartja a költség keletkezésének idejét, illetve egy leírást, ami a költség okát jelöli. Ez utóbbit a felhasználó írja be a költség definiálásakor. A rendszernek a költségek véglegesítése előtt mutatnia kell egy listát, hogy felhasználó átnézhesse a kiszámított díjakat, illetve az összes elszámolt díjat abban a tranzakcióban.

Jelentések
A rendszer képesnek kell lennie készíteni kimutatást egy adott lakóra, és időszakra vonatkozólag, aminek tartalmaznia kell:

időszak elején fenn álló tartozások
időszak alatt befutó tranzakciók leírása, összege, és dátuma
időszak végén fenn álló tartozás.
Ezenkívül egy másik kimutatás keretében képesnek kell lennie mutatni egy összesítő listát minden lakóra nézve, de csak egy adott időszakon belül (pl összes lakó az elmúlt egy évben):

lakónként: nyitó egyenleg, befizetések összege, elszámolt költségek összege, záró egyenleg
illetve egy összesítő sor formájában: a ház nyitó egyenlege az időszak elején, összes befizetés, összes költség, és záró egyenleg.
