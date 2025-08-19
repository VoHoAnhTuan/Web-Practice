// resource link
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/24.svg

let container = document.querySelector('#container');
let baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

for (let i = 1; i <= 100; i++) {
    let pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');
    
    let pokeImg = document.createElement('img');
    pokeImg.src = `${baseURL}${i}.svg`;

    let labelNumber = document.createElement('span');
    labelNumber.textContent = `#${i}`;

    pokemon.appendChild(pokeImg);
    pokemon.appendChild(labelNumber);
    container.appendChild(pokemon);
}