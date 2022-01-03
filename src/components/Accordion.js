import React from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { ACCORDION_TITLES } from "../common/util";

const BasicInfo = ({ basicInfo }) => {
    return (
        <Stack direction="horizontal" gap={3}>
            {Object.keys(basicInfo).map((key) => (
                <ListGroup key={key} variant="flush" className="me-auto">
                    <ListGroup.Item>
                        {key}: {basicInfo[key]}
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </Stack>
    );
};

const AbilitiesInfo = ({ abilitiesInfo }) => {
    return (
        <ListGroup as="ol">
            {abilitiesInfo.map((info) => (
                <ListGroup.Item
                    key={info.name}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{info.name}</div>
                        {info.ability}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

const MovesInfo = ({ movesInfo }) => {
    return (
        <ListGroup as="ol">
            {movesInfo.map((info) => (
                <ListGroup.Item
                    key={info.name}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{info.name}</div>
                        {info.move}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

const EncountersInfo = ({ encountersInfo }) => {
    if (encountersInfo.length === 0)
        return <p className="lead">Difficult to encounter</p>;
    return (
        <ListGroup as="ol">
            {encountersInfo.map((info) => (
                <ListGroup.Item
                    key={info.location}
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{info.location}</div>
                    </div>
                    <Stack direction="horizontal" gap={2}>
                        <Badge variant="primary" pill>
                            Chances: {`${info?.chances?.chance}%`}
                        </Badge>
                        <Badge bg="info" pill>
                            Max Level: {info?.chances?.maxLevel}
                        </Badge>
                    </Stack>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

const StatsInfo = ({ statsInfo }) => {
    return (
        <Stack direction="horizontal" gap={3}>
            {statsInfo.map((stat, idx) => (
                <ListGroup key={idx} variant="flush" className="me-auto">
                    {Object.keys(stat).map((key) => (
                        <ListGroup.Item key={key}>
                            {key}: {stat[key]}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ))}
        </Stack>
    );
};

const PokemonAccordion = (props) => {
    const {
        pokemonDetails,
        pokemonDetails: {
            basicInfo,
            statsInfo,
            abilitiesInfo,
            movesInfo,
            encountersInfo,
        },
    } = props;

    console.log(pokemonDetails);

    const renderBody = (key) => {
        switch (key) {
            case "0":
                return <BasicInfo basicInfo={basicInfo} />;
            case "1":
                return <AbilitiesInfo abilitiesInfo={abilitiesInfo} />;
            case "2":
                return <StatsInfo statsInfo={statsInfo} />;
            case "3":
                return <MovesInfo movesInfo={movesInfo} />;
            case "4":
                return <EncountersInfo encountersInfo={encountersInfo} />;
            default:
                return;
        }
    };

    return (
        <Container>
            <Accordion defaultActiveKey="0" alwaysOpen>
                {ACCORDION_TITLES.map((titles) => (
                    <Accordion.Item key={titles.key} eventKey={titles.key}>
                        <Accordion.Header>{titles.title}</Accordion.Header>
                        <Accordion.Body
                            style={{
                                maxHeight: "70vh",
                                overflowY: "scroll",
                                scrollBehavior: "smooth",
                            }}
                        >
                            {renderBody(titles.key)}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default PokemonAccordion;
