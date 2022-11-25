const pokeName = document.querySelector('.pokemon_name');
const pokeNumber = document.querySelector('.pokemon_number');
const pokeImage = document.querySelector('.pokemon_image');
const pokeTypes = document.getElementById("types");
const pokeAltura = document.querySelector('.altura');
const pokePeso = document.querySelector('.peso');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const btnPrev = document.querySelector('.btn-prv');
const btnNext = document.querySelector('.btn-next');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#83e283',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#EE82DF',
    dark: '#565061',
    default: '#2A1A1F',
}


let searchPokemon = 25;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data =  await APIResponse.json();    
    return data;
    } 
}

const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = 'Loading ...';
    pokeNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokeImage.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white'] ['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;

        let pokeAbiliti = data.abilities;
        pokeAbilidades(pokeAbiliti);

        let pokeTypes = data.types;
        renderPokeTypes(pokeTypes);

        pokeAltura.innerHTML = (data.height / 10) + " m";
        pokePeso.innerHTML = (data.weight / 10) + " Kg";


    } else {
        pokeImage.style.display = 'none';
        pokeName.innerHTML = 'Not found :c';
        pokeNumber.value = '';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
  });

btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


const renderPokeTypes = (types) => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.background = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);

    });
}

const pokeAbilidades = (abilities) => {
    const pokeAbilities = document.getElementById("abilities");
    const abilitiesName = abilities.map(item => item.ability.name); //.map recorre todos los objetos del arerglo
    pokeAbilities.innerHTML = abilitiesName;
};





renderPokemon(searchPokemon);