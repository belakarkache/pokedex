import axios from 'axios'
export const getPokemon = (url) => axios.get(url ? url : 'https://pokeapi.co/api/v2/pokemon/?limit=12').then((resp) => resp.data);
export const getPokemonColor = (id) => axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((resp) => resp.data);