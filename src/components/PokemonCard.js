import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";

const PokemonCard = (props) => {
    const navigate = useNavigate();
    const {
        pokemon: { id, name, height, weight, sprites, order },
        addToFavorite,
        removeFromFavorite,
        disableButton,
        isFavoritePokemon,
    } = props;
    const pokemon_name = `${name[0].toUpperCase()}${name.substring(1)}`;

    const viewPokemonHandler = () => {
        navigate("/detail", {
            state: {
                pokemon: props.pokemon,
            },
        });
    };

    return (
        <Card>
            <Card.Header>{pokemon_name}</Card.Header>
            <Card.Img variant="top" src={sprites["front_default"]} />
            <ListGroup className="list-group-flush">
                <ListGroupItem>Rank: {order}</ListGroupItem>
                <ListGroupItem>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Height: {height}</span>
                        <span>Weight: {weight}</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <div
                    xs={1}
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Button
                        variant="dark"
                        size="sm"
                        onClick={viewPokemonHandler}
                    >
                        View
                    </Button>
                    {isFavoritePokemon && (
                        <Button
                            onClick={() => removeFromFavorite(id)}
                            disabled={disableButton}
                            size="sm"
                            variant="secondary"
                        >
                            Remove from Favorites
                        </Button>
                    )}
                    {!isFavoritePokemon && (
                        <Button
                            onClick={() => addToFavorite(id)}
                            variant="dark"
                            size="sm"
                            disabled={disableButton}
                        >
                            Add to Favorites
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default PokemonCard;
