const pegarPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromisses = () => Array(150).fill().map((_, index) => 
       fetch(pegarPokemonUrl(index + 1)).then(response => response.json()))
const fetchPokemon = () => {
       const pokemonPromisses = generatePokemonPromisses()


    //const pokemonPromisses = []
    //for (let i = 1; i <= 150; i++){
    //    pokemonPromisses.push(fetch(pegarPokemonUrl(i)).then(response => response.json()))
    //}
Promise.all(pokemonPromisses)
        .then(pokemons => {
          return pokemons.reduce((accumulator, pokemon) => {
              const types = pokemon.types.map(typeInfo => typeInfo.type.name)
              var id = pokemon.id
                if (id < 10){
                     id = '00' + id
                } else if(id<100){
                    id = '0'+ id
                }
                //console.log(id)
              accumulator += `
                <li class = "card ${types[0]}">
                   <img class ="card-image" alt="${pokemon.name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" />
                   <h2 class="class-title">${pokemon.id}. ${pokemon.name}</h2>
                   <p class="card-subtitle">${types.join(' | ')}</p>
                </li>   
              `
              
              return accumulator
            }, '')  
        })
        .then(pokemons  => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
        })
    



}
fetchPokemon()