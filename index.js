
let pokeIndex = 0;
function findPokemon() {
    let input = document.getElementById("buscador").value;
    callApi(input.toLowerCase())
}

function callApi(name) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                let resultatOBJ = JSON.parse(this.responseText);
                refreshViewPokemon(resultatOBJ);
                refreshViewStadystics(resultatOBJ);
                refreshViewsprites(resultatOBJ);
                refreshSizePlayer(resultatOBJ);
                pokeIndex = resultatOBJ.id;
            }

            if (this.status !== 200) {
                document.getElementById("name").innerText = "Missing No.";
                document.getElementById("image-normal").src = "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png";
                document.getElementById("image-shiny").src = "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png";
            }


        }
    });
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + name);
    xhr.send(null);
}


function getTypes(typeList) {
    let aTypes = [];
    for (let i = 0; i < typeList.length; i++) {
        aTypes.push(typeList[i].type.name);
    }
    return aTypes;
}


function pokeBack() {
    pokeIndex--;
    if (pokeIndex < 1) pokeIndex = 1;
    callApi(pokeIndex);
}

function pokeNext() {
    pokeIndex++;
    callApi(pokeIndex);
}

// 400  =  poke.height

// 100 = x
function refreshViewPokemon(poke) {
    document.getElementById("name").innerText = poke.name;
    //document.getElementById("description").innerText = poke.species.url;
    //document.getElementById("types").innerText = getTypes(poke.types);
    //Segons el tamany de la persona(167cm), el fica mes gran o mes petit
    document.getElementById("image-shiny").src = poke.sprites.other["official-artwork"].front_shiny;
    document.getElementById("image-normal").src = poke.sprites.other["official-artwork"].front_default;

    //document.getElementById("image").height = poke.height * 10;
}

function refreshViewStadystics(poke) {
    //Height
    //document.getElementById("pokeHeight").innerText = poke.height * 10;
    //Stadystics
    document.getElementById("hp").innerText = poke.stats[0].base_stat; //0 = hp
    document.getElementById("attack").innerText = poke.stats[1].base_stat; //1 = attack
    document.getElementById("defense").innerText = poke.stats[2].base_stat; //2 = defense
    document.getElementById("spAttack").innerText = poke.stats[3].base_stat; //3 = sp.attack
    document.getElementById("spDefense").innerText = poke.stats[4].base_stat; //4 = sp.defense
    document.getElementById("speed").innerText = poke.stats[5].base_stat;  //5 = speed
    document.getElementById("total").innerText = poke.stats[0].base_stat + poke.stats[1].base_stat + poke.stats[2].base_stat + poke.stats[3].base_stat + poke.stats[4].base_stat + poke.stats[5].base_stat;
}

function refreshViewsprites(poke) {
    document.getElementById("sprite-back").src = poke.sprites.back_default;
    document.getElementById("sprite-front").src = poke.sprites.front_default;
    document.getElementById("sprite-back-shiny").src = poke.sprites.back_shiny;
    document.getElementById("sprite-front-shiny").src = poke.sprites.front_shiny;
}

function flipCard() {
    let ncard = document.getElementById("flip-card-inner");
    ncard.style.transform = ncard.style.transform ? "" : "rotateY(180deg)"
    //document.getElementById("flip-card-inner")
}

function refreshSizePlayer(poke) {
    let personSize = poke.height*10;
    if(personSize>=150){
        personSize  = 150;
    }
    document.getElementById("poke-sized").src = poke.sprites.other["official-artwork"].front_default;
    document.getElementById("poke-sized").style.height = `${personSize}px`
}


function pressEnter(event){
    console.log(event.keyCode);
    if(event.keyCode===13){
        findPokemon()
    }
}
