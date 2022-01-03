import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Search from "../containers/Search";
import UserContext from "../store/user-context";

const NavBar = () => {
    const userCtx = useContext(UserContext);
    const location = useLocation();

    const isFavoritesActive = location.pathname.includes("favorites");

    const logoutHandler = () => {
        localStorage.removeItem("token");
        userCtx.removeUser();
        window.location.reload(true);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Pokemonverse</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/" active={!isFavoritesActive}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/favorites" active={isFavoritesActive}>
                            My Favorites
                        </Nav.Link>
                    </Nav>

                    <Search />

                    {!userCtx.user && (
                        <Nav>
                            <Nav.Link href="/signin">Login</Nav.Link>
                        </Nav>
                    )}

                    {userCtx.user && (
                        <OverlayTrigger
                            key={"tooltip-bottom"}
                            placement={"bottom"}
                            overlay={
                                <Tooltip id={`tooltip-bottom`}>Logout</Tooltip>
                            }
                        >
                            <Nav.Item
                                onClick={logoutHandler}
                                style={{ color: "white" }}
                            >
                                <Nav.Link style={{ color: "white" }}>
                                    Signed in as: {userCtx.user.last_name},{" "}
                                    {userCtx.user.first_name}
                                </Nav.Link>
                            </Nav.Item>
                        </OverlayTrigger>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
