const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail)
{
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => // Função para pegar os detalhes dos pokemons
{
    return fetch (pokemon.url) // Faz a requisição da URL do pokemon
    .then((response) => response.json()) // Converte a resposta da requisição em JSON
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) =>
{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) // Vai ao servidor buscar a lista de pokemons, devolve um HTTP response
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results) // Pega a lista dentro do JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia a lista de pokemons em uma lista de requisições dos detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)
}
