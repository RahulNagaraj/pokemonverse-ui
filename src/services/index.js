import axios from "axios";

export const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

export const POKEMON_URL = `${POKEMON_BASE_URL}/pokemon`;

export const LOCAL_BASE_API_URL = "http://localhost:8000/api";

export const BASE_API_URL = "https://pokemonverse-api.herokuapp.com/api";

export const API = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        headers: {
            authorization: `bearer ${token}`,
        },
    });
};
