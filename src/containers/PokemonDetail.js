import React from "react";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import PokemonCarousel from "../components/Carousel";
import PokemonAccordion from "../components/Accordion";
import { constructBasicInfo } from "../common/util";

const PokemonDetail = () => {
    const location = useLocation();
    const selectedPokemon = location.state.pokemon;

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

    return (
        <div>
            <Container>
                <h1 className="display-2 text-center">
                    {selectedPokemon.name[0].toUpperCase()}
                    {selectedPokemon.name.substring(1)}
                </h1>
                <PokemonCarousel data={sprites} />
                <PokemonAccordion
                    basicInfo={constructBasicInfo(selectedPokemon)}
                />
            </Container>
        </div>
    );
};

export default PokemonDetail;
