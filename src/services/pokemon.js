import axios from "axios";
import { POKEMON_BASE_URL, POKEMON_URL } from ".";

export const fetchAllPokemons = async (url) => {
    const pokemon_url = url ? url : POKEMON_URL;
    const {
        data: { next, results },
    } = await axios.get(pokemon_url);
    const pokemon_data = [];
    for (let i = 0; i < results.length; i++) {
        const { url } = results[i];
        const { data } = await axios.get(url);
        pokemon_data.push(data);
    }
    return { nextUrl: next, pokemon_data };
};

export const fetchPokemonsById = async (pokemonIdList) => {
    const pokemons = [];
    for (let i = 0; i < pokemonIdList.length; i++) {
        const id = pokemonIdList[i];
        const pokemon_url = `${POKEMON_URL}/${id}`;
        const { data } = await axios.get(pokemon_url);
        pokemons.push(data);
    }
    return pokemons;
};

export const searchPokemon = async (pokemonName) => {
    const url = `${POKEMON_URL}/${pokemonName}`;
    try {
        const { data } = await axios.get(url);
        return { status: "success", data };
    } catch (error) {
        return { status: "danger", detail: error.response.data };
    }
};

export const getPokemonAbilities = async (pokemonAbilities) => {
    /**
     * [
     *     {name: "Name", ability: "some text"}
     * ]
     */
    const abilities = [];

    try {
        for (let i = 0; i < pokemonAbilities.length; i++) {
            const name = pokemonAbilities[i];
            const url = `${POKEMON_BASE_URL}/ability/${name}`;
            const { data } = await axios.get(url);
            if (data && data.effect_entries) {
                const effectEntry = data.effect_entries.filter(
                    (entry) => entry?.language?.name === "en"
                );
                abilities.push({ name, ability: effectEntry[0].effect });
            }
        }

        return abilities;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const getPokemonMoves = async (pokemonMoves) => {
    /**
     * [
     *     {name: "Name", move: "some text"}
     * ]
     */
    const moves = [];

    try {
        for (let i = 0; i < pokemonMoves.length; i++) {
            const name = pokemonMoves[i];
            const url = `${POKEMON_BASE_URL}/move/${name}`;
            const { data } = await axios.get(url);
            if (data && data.effect_entries) {
                const effectEntry = data.effect_entries.filter(
                    (entry) => entry?.language?.name === "en"
                );
                moves.push({ name, move: effectEntry[0].effect });
            }
        }

        return moves;
    } catch (error) {
        console.log(error.response.data);
    }
};

const getPokemonStats = async (statId) => {
    const url = `${POKEMON_BASE_URL}/stat/${statId}`;
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const getPokemonEncounters = async (pokemonId) => {
    const url = `${POKEMON_URL}/${pokemonId}/encounters`;
    try {
        const { data } = await axios.get(url);
        const encounters = data.map((encounter) => {
            const chances = {};
            if (encounter.version_details.length > 0) {
                const details = encounter.version_details[0];
                if (details.encounter_details.length > 0) {
                    chances["chance"] = details.encounter_details[0].chance;
                    chances["maxLevel"] =
                        details.encounter_details[0].max_level;
                }
            }
            return {
                location: encounter.location_area.name,
                chances,
            };
        });

        console.log(encounters);
        return encounters;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const getPokemonDetails = async (pokemonId, abilityId, statId) => {
    try {
        const abilities = await getPokemonAbilities(abilityId);
        const stats = await getPokemonStats(statId);
        const encounters = await getPokemonEncounters(pokemonId);

        return [{ abilities, stats, encounters }];
    } catch (error) {
        console.log(error.response.data);
    }
};
