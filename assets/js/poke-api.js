

const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => // Função para pegar os detalhes dos pokemons
{
    return fetch (pokemon.url).then((response) => response.json()) // Faz a requisição da URL do pokemon e converte a resposta para JSON
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
