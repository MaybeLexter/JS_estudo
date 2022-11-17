const pegarPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromisses = () => Array(150).fill().map((_, index) => 
       fetch(pegarPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    if (id < 10) {
        id = '00' + id
    } else if (id < 100) {
        id = '0' + id
    }

    accumulator += `
              <li class = "card ${types[0]}">
                 <img class ="card-image" alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" />
                 <h2 class="class-title">${id}. ${name}</h2>
                 <p class="card-subtitle">${elementTypes.join(' | ')}</p>
              </li>   
            `

    return accumulator
}, '') 

const InserirPokemonPagina = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
}

const pokemonPromisses = generatePokemonPromisses()
Promise.all(pokemonPromisses)
    .then(generateHTML)
    .then(InserirPokemonPagina)

