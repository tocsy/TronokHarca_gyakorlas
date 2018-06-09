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
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    var alive = livingCharacters(userDatas);
    console.log("élő karakterek: ", alive);
    sortByName(alive)
    console.log("élő karakterek név szerint rendezve: ", alive);
    createHtmlElements(alive);

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function livingCharacters(characters) {
    var live = [];

    for (var i = 0; i < characters.length; i++) {
        if (!characters[i].dead) {
            live.push(characters[i]);
        }
    }
    return live;
}

// function livingCharacters(characters) {
//     var live = [];
//     for (var i in characters) {
//         if (!characters[i].dead) { //először ez volt: (characters[i].dead == '')itt lehetne ===-t is használni
//             live.push(characters[i]);
//         }
//     }
//     return live;
// }

// function sortByName(characters) {
//     var i = characters.length - 1;
//     var tmp;
//     var swap = false;
//     do {
//         swap = false;
//         for (var j = 0; j < i; j++) {
//             if (characters[j].name > characters[j + 1].name) {
//                 tmp = characters[j];
//                 characters[j] = characters[j + 1];
//                 characters[j + 1] = tmp;
//                 swap = true;
//             }
//         }
//         i--;
//     } while (i >= 0 && swap)
//     return characters;
// }

function sortByName(characters) {
    characters = characters.sort(function (lho, rho) {
        var result;

        if (lho.name > rho.name) {
            result = 1;
        } else if (lho.name == rho.name) {
            result = 0;
        } else if (lho.name < rho.name) {
            result = -1;
        }
        return result;
    });
};

function createHtmlElements(characters) {
    var canvasDivElement = document.querySelector("#canvas");

    for (var i = 0; i < characters.length; i++) {
        var cardDivElement = document.createElement('div');
        cardDivElement.classList.add("card");
        canvasDivElement.appendChild(cardDivElement);

        var cardDivElementImage = document.createElement("img");
        cardDivElement.appendChild(cardDivElementImage);
        cardDivElementImage.src = characters[i].portrait;
        cardDivElementImage.alt = characters[i].name;

        var cardDivElementName = document.createElement("div");
        cardDivElement.appendChild(cardDivElementName);
        cardDivElementName.innerText = characters[i].name;


    }

};