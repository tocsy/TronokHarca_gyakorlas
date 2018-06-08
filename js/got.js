function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText); //A szervertől kapott json fájlt átalakítja objektummá
    var alive = livingCharacters(userDatas); //ebbe a tömbbe már csak az élők vannak benne
    sortByName(alive); // a sorbarendezetteket adja már csak ki. Ha ezt nem tárolom le, csak meghívom,  a tömbök-objektumok referencia szerint lesznek tárolva
    console.log(searchByName(alive, 'BALON Greyjoy')); // UserDatas az alive helyett, ha a holtak között is keresünk a teljesben

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */


}



// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax); //ELŐSZÖR ide beírjuk, hogy milyen fájlt szeretnénk meghívni a szerverről, amit be akarunk tölteni

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function livingCharacters(characters) {
    var live = [];
    for (var i in characters) {
        if (!characters[i].dead) { //először ez volt: (characters[i].dead == '')itt lehetne ===-t is használni
            live.push(characters[i]);
        }
    }
    return live;
}

function sortByName(characters) {
    var i = characters.length - 1;
    var tmp;
    var swap = false;
    do {
        swap = false;
        for (var j = 0; j < i; j++) {
            if (characters[j].name > characters[j + 1].name) {
                /* j < characters.length - 1  --> ebben az esetben majdnem dupla annyiszor futna le.
                   mert ha i-ig megy, akkor már a vége rendezve ven, és azt nem kell újra hasonlítgatnia.
                   */
                tmp = characters[j];
                characters[j] = characters[j + 1];
                characters[j + 1] = tmp;
                swap = true;
            }
        }
        i--;
    } while (i >= 0 && swap) // while addig fut amíg a feltétel igaz
    return characters;
}

function searchByName(characters, searchString) {
    for (var i in characters) {
        if (characters[i].name.toLowerCase === searchString.toLowerCase) { // ha ne számítson a kis és nagybetű
            return characters[i];
        }
    }
    return "Character not found";
}

