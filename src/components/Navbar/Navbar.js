import React, {useState} from "react";
import styles from "./Navbar.module.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import ProfilePicture from "./ProfilePicture";
import NavbarMenu from "../NavbarMenu/NavbarMenu";

const Navbar = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const handlePerfilClick = () => {
    setMostrarMenu(!mostrarMenu);
  }

  const baseURL = `${window.location.protocol}//${window.location.host}`;
  const logo = `${baseURL}/Logo.png`;
  const avatar = `${baseURL}/Avatar Image.png`;

  return (
    <>
      <Container>
        <Row className="pt-4">
          <nav className={styles.navbarLogo}>
            <Col md={1}>
              <img src={logo} alt="" className="navbar-logo" />
            </Col>
            <Col md={{ span: 4, offset: 3 }}>
              <SearchBar/>
            </Col>
            <Col md={{ span: 1, offset: 3 }}>
              <ProfilePicture onClick={handlePerfilClick} imagem={avatar}/>
            </Col>
          </nav>
        </Row>
      </Container>
      {mostrarMenu && (
        <NavbarMenu imagem={avatar}/>
      )}
    </>
  );
};

export default Navbar;
