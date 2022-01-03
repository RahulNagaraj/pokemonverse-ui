import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { searchPokemon } from "../services/pokemon";
import ToastContext from "../store/toast-context";

const Search = () => {
    const navigate = useNavigate();
    const [pokemonName, setPokemonName] = useState("");
    const toastCtx = useContext(ToastContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
    };

    const searchHandler = async () => {
        if (pokemonName !== "") {
            const data = await searchPokemon(pokemonName);
            if (data.status === "danger") {
                toastCtx.setToastMessage(data.detail);
                toastCtx.setToastStatus(data.status);
                toastCtx.openToast();
            } else {
                navigate("/detail", {
                    state: {
                        pokemon: data.data,
                    },
                });
            }
        }
    };

    return (
        <Form className="d-flex" onSubmit={onSubmitHandler}>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                defaultValue={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
            />
            <Button onClick={searchHandler} variant="outline-success">
                Search
            </Button>
        </Form>
    );
};

export default Search;
