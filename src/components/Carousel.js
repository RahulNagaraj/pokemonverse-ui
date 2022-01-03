import React from "react";
import Carousel from "react-bootstrap/Carousel";

const PokemonCarousel = ({ data }) => {
    console.log(data);
    return (
        <Carousel variant="dark">
            {data &&
                data.map((d) => (
                    <Carousel.Item key={d.key}>
                        <img
                            className="d-block w-100"
                            src={d.img}
                            alt={d.key}
                            style={{ height: "600px", "object-fit": "contain" }}
                        />
                        <Carousel.Caption className="">
                            <h3>{d.key}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
        </Carousel>
    );
};

export default PokemonCarousel;
