# ingsoftware-test

Shopy aplikacija

- Tehnicki deo

Za izradu ove aplikacije koriscene su sledece tehnologije:

- Visual Studio Code - tekst editor,
- Live server : npm-ov live-server instaliran globalno, poziva se iz konzole komandom live-server,
- jQuery / JavaScript (ES6)
- Sass : preprocesor za kompajliranje i minifikovanje scss fajlova u css,
- Gulp : automatic task runner za pokretanje taskova rucno i pri snimanju promena,
- Webpack : modul bundler za kompajliranje svih modula u jedan fajl kao i kompajliranje ES6+,
- NPM : package manager za automatizuju procesa vezanih za rad sa paketima;

     Na pocetku je potrebno instalirati Node.js sa zvanicnog sajta. Zatim iz terminala tekst editora (ili command prompta) instalirati npm-cli (npm i g npm-cli).
     Ucitavanjem foldera sa projektom u tekst editoru, u terminalu istog potrebno je ukucati komandu npm install kako bi se instalirali svi paketi potrebni za rad i razvoj aplikacije a koji se nalaze u fajlu package.json.

     Za pokretanje Gulp-a i Webpack-a mogu se koristiti sledece komande:
“webpack” - pokrece Webpack
“webpackW” - pokrece Webpack u watch rezimu
“gulp” - pokrece Gulp
“gulpW” - pokrece Gulp u watch rezimu

     Gulp je koriscen za kompajliranje sass-a u css, dok je Webpack koriscen za kompajliranje js fajlova i automatizaciju Handlebars-a.

Za mockovanje API poziva koriscen je http://jsonstub.com 

Za pozivane API-ja (GET i POST) koriscena je fetch metoda - zamena za XMLHttpRequest i radi sa promisima (jedan od razloga zasto ona).

Pokretanje aplikacije je testirano na posebnom racunaru koji nije imao nista instalirano od navedenog.


- Aplikacija

     Po pokretanju aplikacije otvara se Home page koji je uradjen po dizajnu ali je dobrim delom hardkodiran jer nije bio u opisu zadatka ali je dobro da postoji i da se otvori po pokretanju projekta.

     Na stranici Products nalaze se filtri i inicijalno ucitana 9 proizvoda. Klikom na neku kategoriju iz filtera poziva se API koji vraca proizvode vezane za tu kategoriju ako ih ima, i automatski skroluje na pocetak stranice. Ukoliko ne postoje ispisuje se obavestenje o tome. 
Za resetovanje filtera potrebno je ponovo kliknuti na vec selektovanu opciju.
Slajder za opseg cena je podesen na koracima od 50 kako bi se smanjio broj poziva ka serveru i reaguje na opseg veci od 300 (from) i 1200 (to).
     Hoverovanjem tamba sa proizvodom u donjem delu se nalaze ikonice za share, add to, like koje su nezavisne (ne pokrece se details page klikom na njih). Klikom na ime proizvoda ili sliku prelazimo na details page.
     Load more je podeseno da ucitava po 3 proizvoda svakim klikom a broj klika je limitiran na 3. Nakon toga se ispisuje obavestenje da nema vise proizvoda i dugme je sakriveno. Ukoliko ima manje od 9 proizvoda dugme se ne prikazuje.
     News Lettter sekcija vrsi proveru email-a i nakon toga salje validiranu adresu a korisniku stize obavestenje da je adresa uspeno snimljena. Ukoliko email adresa ne prodje validaciju, pojavljuje se obavestenje o tome u vidu alert-a.

     Details page vraca detaljne podatke o izabranom proizvodu i opciju za porucivanje. U delu gde se vrsi porudzbina proizvoda mora da se izaberu velicina i kolicina proizvoda. Ukoliko nesto od ova dva nedostaje pojavljuje se obavestenje iznad svakog polja. Nakon toga klikom na dugme Order Now svi relevantni podaci o proizvodu (ima, paket, opis, kolicina, velicina, cena) salju se preko API poziva a korisnik dobija obavestenje o tome.
     Related Products sekcija, svakim refresovanjem ili dolaskom na stranici,  prikazuje nasumicno izabrane proizvode.

Resize-ovanjem stranice ukljucuje se opcija da se polja sa filterima sakriju i prokazu po potrebi. Takodje i glavni meni, na odredjenoj rezoluciji on nestaje a pojavljuje se dugme za prikaz i sakrivanje menija.
