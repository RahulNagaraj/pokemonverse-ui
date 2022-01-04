import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useLocation } from "react-router-dom";
import PokemonCarousel from "../components/Carousel";
import PokemonAccordion from "../components/Accordion";
import {
    constructBasicInfo,
    constructStatsInfo,
    pokemonAbilities,
    pokemonMoves,
} from "../common/util";
import {
    getPokemonAbilities,
    getPokemonMoves,
    getPokemonEncounters,
} from "../services/pokemon";

const PokemonDetail = () => {
    const location = useLocation();
    const [pokemonDetails, setPokemonDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const selectedPokemon = location.state.pokemon;

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const basicInfo = constructBasicInfo(selectedPokemon);
            const statsInfo = constructStatsInfo(selectedPokemon);

            const abilities = pokemonAbilities(selectedPokemon);
            const abilitiesInfo = await getPokemonAbilities(abilities);

            const movesInfo = pokemonMoves(selectedPokemon);
            // const movesInfo = await getPokemonMoves(moves);

            const encountersInfo = await getPokemonEncounters(
                selectedPokemon.id
            );

            const details = {
                basicInfo,
                statsInfo,
                abilitiesInfo,
                movesInfo,
                encountersInfo,
            };

            setPokemonDetails(details);
            setIsLoading(false);
        })();
    }, []);

    const sprites = Object.keys(selectedPokemon.sprites)
        .map((key) => {
            const img = selectedPokemon.sprites[key];
            return {
                key,
                img,
            };
        })
        .slice(0, 8)
        .filter((sprite) => sprite.img != null);

    if (isLoading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <div>
            <Container>
                <h1 className="display-2 text-center">
                    {selectedPokemon.name[0].toUpperCase()}
                    {selectedPokemon.name.substring(1)}
                </h1>
                <PokemonCarousel data={sprites} />
                <PokemonAccordion pokemonDetails={pokemonDetails} />
            </Container>
        </div>
    );
};

export default PokemonDetail;
