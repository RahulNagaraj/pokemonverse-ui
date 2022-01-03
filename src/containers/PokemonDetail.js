import React from "react";
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import PokemonCarousel from "../components/Carousel";

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
                <PokemonCarousel data={sprites} />
            </Container>
        </div>
    );
};

export default PokemonDetail;
