//Verschillende categorieën met arrays om galgje mee te spelen
var landen;
var buttons;
var aantalGokkenTotaal = 0;
var aantalGokkenGoed = 0;
var aantalTotaleLettersGoed = 0;
var maxAantalLevens = 12;
var gekozenLetter;
var geradenLetters = [];

landen=['Afghanistan','Albanie','Algerije','Argentinie','Aruba','Australie','Bangladesh','Belgie','Bulgarije','Cambodja','Canada','China',
        'Denemarken','Duitsland','Egypte','Filipijnen','Frankrijk','Gambia','Griekenland','Groenland','Hongarije','Ierland','IJsland',
        'India','Indonesie','Italie','Israel','Jamaica','Jordanie','Kaapverdie','Kameroen','Kazachstan','Kroatie','Letland','Litouwen',
        'Luxemburg','Macedonie','Madagaskar','Maldiven','Marokko','Mexico','Montenegro','Mozambique','Nederland','Nigeria','Noorwegen',
        'Oeganda','Oekraine','Oezbekistan','Oostenrijk','Pakistan','Palestina','Portugal','Qatar','Roemenie','Rusland','Slovenie',
        'Slowakije','Spanje','Suriname','Tanzania','Tunesie','Uruguay','Vaticaanstad','Vietnam','Zimbabwe','Zweden','Zwitserland'];

alfabet=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

//Kiest een willekeurig item uit array Landen en laat deze zien
var wordPicker = Math.floor(Math.random()*landen.length);
var woord = landen[wordPicker];


// Deze functie heet INIT, omdat we hier galgje klaarzetten om te gaan raden
function init(){

    // Zet het max aantal gokken alvast op het vooraf ingestelde aantal
    document.getElementById("maxAantalLevens").innerHTML = maxAantalLevens;

    // For loop door het woord heen wat je moet raden en zorg dat er net zoveel Underscores geplaatst worden
    for (var i = 0; i < woord.length; i++) {
        // De Woordholder is een UL met als ID woord
        var woordHolder = document.getElementById("woord");
        // Zorg dat je voor elke letter een LI aanmaakt
        letterHolder = document.createElement('li');
        // Geef deze LI een class mee
        letterHolder.setAttribute('class', 'letter');
        // Vul de LI met een Underscore
        letterHolder.innerHTML = "_";

        // Zet alle letters uit het woord in een geradenLetters Array zodat je na het klikken kunt checken of een letter goed of fout is
        // Alle cijfers van de array krijgen de juiste letter van het woord mee. Zo kan er later gecheckt worden, of de letter in het woord zit.
        // Push is een manier om alle cijfers en letters, door middel van de loop in de array te zetten. Dit kan ook volgens onderstaande methode
        // geradenLetters.push(letter); // <-- Te vinden op pagina: 537, maar hieronder de andere methode die ook werkt:
        geradenLetters[i] = letterHolder;

        // Append alle LI items aan de UL, zodat ze netjes in een lijst komen te staan
        woordHolder.appendChild(letterHolder);
    }
}
// Start het spel door de bovenstaande functie op te roepen
init();


// Wanneer er op een toets geklikt wordt, geven we deze door aan een functie 
document.getElementById('galgje').onkeypress = returnPressedLetter;

function returnPressedLetter(key) {
    // Kijk of er op een letter van het alfabet is geklikt, want andere toetsen hebben we niet nodig
    // lowerCase letters gaan van charCode 97 t/m 122 en uppserCase gaat van charCode 65 t/m 90, bron: http://www.aspdotnet-suresh.com/2013/09/character-keycodes-javascript-keyboard-keycodes.html
    // keyCode wordt voor browsers als IE8 en lager gebruikt, maar daar heb ik dit niet voor gemaakt
    // || staat voor 'of' als voorwaarde. Iedere letter in het alfabet heeft een code. De Uppercase en Lowercase hebben een verschillende codes
    // Daarom krijgt de if-statement 2 verschillende voorwaarde mee, waarvan hij er maar aan één hoeft te voldoen.
    if ( (key.charCode <= 122 && key.charCode >= 97) || (key.charCode <= 90 && key.charCode >= 65) ) {

        // Zet de gedrukte letter om naar lowercase, want daarmee checken we of de letter voorkomt in galgje
        // Hij zet of de keyCode erin, of de charCode, en zet alles naar LowerCase, wat voor letter het ook is.
        // Dit zet hij in de variabele pressedLetter, deze kunnen we verder sturen naar de functie waarin we kijken of de letter overeenkomt
        // met een van de letters uit het woord.
        // de String.fromCharCode zet de getypte letter in een string. Bron: http://www.w3schools.com/jsref/jsref_fromCharCode.asp
        var pressedLetter = String.fromCharCode(key.keyCode || key.charCode).toLowerCase();

        // Stuur de letter naar de functie die kijkt of de letter in het woord zit. Regel: 96
        checkLetter(pressedLetter);
    }
}


// Selecteer de div waarin alle knoppen staan
var knoppen = document.getElementById("alfabet_knoppen");
// Zodat we daar vervolgens een addEventlistener op kunnen zetten die kijkt op welk element we klikken
knoppen.addEventListener("click", returnChosenLetter);

// In deze funtie kijken we naar welke letter de gebruiker kiest, alleen dan door het klikken op de knop, i.p.v. het intypen van de letter
function returnChosenLetter(letter) {
    // Wanneer CurrentTarget geen null weergeeft, betekend het dat ik op een element geklikt heb
    if (letter.target !== letter.currentTarget) {
        // Stuur de letter daarna ook door naar de functie die checkt of de letter in het woord zit. Regel: 96
        checkLetter(letter.target.id);
    } 
}


// Deze functie kijkt naar welke letter we gekozen hebben, zodat we vervolgens kunnen checken of deze letter in het woord zit
function checkLetter(gekozenLetter) {
    var gekozenLetterKnop = document.getElementById(gekozenLetter);

    if(gekozenLetterKnop.classList.contains("active") === false) {
        // Geef na het kiezen wel de class Active mee, zodat we de letter daarna niet meer kunnen kiezen
        gekozenLetterKnop.classList.add("active");

        // Tel het totale aantal gokken met 1 op en zet dit getal op de site
        aantalGokkenTotaal++;
        document.getElementById("aantalGokkenTotaal").innerHTML = aantalGokkenTotaal;

        // For loop door alle letters van het woord heen, [i] komt overeen met elke letter in het woord, waar 0 de eerste letter van het woord is
        // en 1 de tweede letter. Dit gaat net zo lang door tot woord.length behaald is en dus elke letter door de For Loop gekomen is
        for (var i = 0; i < woord.length; i++) {
            // Wanneer een letter uit het woord overeenkomt met de gekozen letter, dan doen we daar wat mee
            // De letters van het woord zetten we naar Lowercase, omdat de gekozenletters ook altijd lowercase zijn
            if (woord[i].toLowerCase() === gekozenLetter) {
                // Wanneer de letter in het woord overeenkomt met de gekozenLetter, dan zorgen we dat de 
                // Array met geradenLetters aangepast wordt
                // In de loop wordt de waarde 0 steeds met een verhoogt totdat de lengte van het woord bereikt is
                // door dit getal tussen brackets achter variabele woord te zetten, loopt deze loop alle letters stuk voor stuk door.
                // zodra een letter overeenkomt wordt dit in de array geradenLetters aangepast.

                // Omdat woord[i] overeenkomt met de gekozenletter, kunnen we in de Array met geradenLetters op precies dezelfde plek
                // de _ aanpassen voor de letter van het woord. Wanneer een gekozenLetter niet overeenkomt met één van de letters
                // in het woord, dan blijft daar dus een _ staan.
                // Door de .innerHTML woord de letter getoond in de pagina zelf, omdat die array (geradenletters) aangepast wordt.
                geradenLetters[i].innerHTML = woord[i];

                // Wanneer we een letter goed hebben, tellen we de variabele aantalTotaleLettersGoed met 1 op, zodat we later kunnen checken
                // of dit getal net zo groot is als de lengte van het woord. Wanneer dat zo is, hebben we gewonnen.
                aantalTotaleLettersGoed += 1;
            }
        }

        // Check of de gekozen letter goed of fout was. Regel: 143
        checkGekozenLetter(gekozenLetter);

    } else {
        // Geef de gebruiker aan dat hij/zij deze letter al gekozen heeft. Dit wordt gecheckt door middel van de class 'active'
        alert ("Je hebt deze letter al gekozen");
        return false;
    }
}



function checkGekozenLetter(letter){
    // IndexOf laat zien als hoeveelste een bepaalde letter staat. Bij Nederland is de a nummer 6. Als een letter niet in het woord zit, zal de index -1 zijn.
    // Hier kunnen wij mee verder werken.
    // Check of de gekozen letter in het woord voor komt
    var j = (woord.toLowerCase().indexOf(letter));
    if (j === -1) {
        // De gekozen letter komt helaas niet voor in het woord, dus halen we een leven af van de maxAantalLevens
        maxAantalLevens--;
        document.getElementById("maxAantalLevens").innerHTML = maxAantalLevens;

        // Verander het plaatje omdat we een leven minder hebben
        veranderPlaatje(maxAantalLevens);

        // Check of we verloren hebben. Regel: 179
        checkVerlies(maxAantalLevens);
    } else {
        // De gekozen letter was goed, dus tel het goede aantal gokken met 1 op en zet dit getal op de site
        aantalGokkenGoed++;
        document.getElementById("aantalGokkenGoed").innerHTML = aantalGokkenGoed;

        // Check of we gewonnen hebben. Regel: 169
        checkWinst(aantalTotaleLettersGoed);
    }
}

// Wanneer je totale aantal letters goed overeenkomt met de lengte van je woord, dan heb je gewonnen
function checkWinst(lettersGoed) {
    if(woord.length === lettersGoed){
        if( alert('Gefeliciteerd, je hebt gewonnen') ){
        } else {
            window.location.reload();
        }
    }
}

// Wanneer je levens minder zijn dan 1, heb je verloren
function checkVerlies(levens) {
    if(levens < 1){
        if( alert('Je hebt verloren. Het woord was ' + woord) ){
        } else {
            window.location.reload();
        }
    }
}


// Verander het plaatje mee met het aantel levens dat je hebt
function veranderPlaatje(levens) {
    document.getElementById("img_levens").src = "img/levens/galgje"+levens+".jpg";
}
    
    console.log(woord);

// Algemene sites waarvan ik kleine dingen heb meegenomen:
// http://www.w3schools.com
// http://www.stackoverflow.com/