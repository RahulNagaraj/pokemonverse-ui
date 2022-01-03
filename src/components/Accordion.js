import React from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { ACCORDION_TITLES } from "../common/util";

const PokemonAccordion = (props) => {
    const { basicInfo } = props;
    console.log(basicInfo);
    return (
        <Container>
            <Accordion defaultActiveKey="0" alwaysOpen>
                {ACCORDION_TITLES.map((titles) => (
                    <Accordion.Item key={titles.key} eventKey={titles.key}>
                        <Accordion.Header>{titles.title}</Accordion.Header>
                        <Accordion.Body>
                            <Stack direction="horizontal" gap={3}>
                                {Object.keys(basicInfo).map((key) => (
                                    <ListGroup
                                        key={key}
                                        variant="flush"
                                        className="me-auto"
                                    >
                                        <ListGroup.Item>
                                            {key}: {basicInfo[key]}
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                            </Stack>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default PokemonAccordion;
