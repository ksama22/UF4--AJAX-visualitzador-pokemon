
let pokeIndex = 0;
function findPokemon() {
    let input = document.getElementById("buscador").value;
    callApi(input.toLowerCase())
}

function callApi(name) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let resultatOBJ = JSON.parse(this.responseText);
            console.log(resultatOBJ);
            refreshViewPokemon(resultatOBJ);
            refreshViewStadystics(resultatOBJ);
            pokeIndex = resultatOBJ.id;
            console.log(pokeIndex);
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
    document.getElementById("types").innerText = getTypes(poke.types);
    //Segons el tamany de la persona(167cm), el fica mes gran o mes petit
    document.getElementById("image").src = poke.sprites.other["official-artwork"].front_default;
    document.getElementById("image").height = poke.height * 10;
}

function refreshViewStadystics(poke) {
    //Height
    document.getElementById("pokeHeight").innerText = poke.height * 10;
    //Stadystics
    document.getElementById("hp").innerText = poke.stats[0].base_stat; //0 = hp
    document.getElementById("attack").innerText = poke.stats[1].base_stat; //1 = attack
    document.getElementById("defense").innerText = poke.stats[2].base_stat; //2 = defense
    document.getElementById("spAttack").innerText = poke.stats[3].base_stat; //3 = sp.attack
    document.getElementById("spDefense").innerText = poke.stats[4].base_stat; //4 = sp.defense
    document.getElementById("speed").innerText = poke.stats[5].base_stat;  //5 = speed
    document.getElementById("total").innerText = poke.stats[0].base_stat + poke.stats[1].base_stat + poke.stats[2].base_stat + poke.stats[3].base_stat + poke.stats[4].base_stat + poke.stats[5].base_stat;
}