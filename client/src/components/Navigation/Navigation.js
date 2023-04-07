import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Navigation.module.scss';

export const Navigation = () => {
    return (
        <Navbar className={styles.navigation} variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                        <Nav.Link as={Link} to="/">Начало</Nav.Link>
                        <Nav.Link as={Link} to="/catalog">Всички маршрути</Nav.Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Планини"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item as={Link} to="/mountains/pirin">Пирин</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/mountains/rila">Рила</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/mountains/rodopi">Родопи</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/mountains/stara-planina">Стара планина</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

};