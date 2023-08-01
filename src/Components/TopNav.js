import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import ero from "../imgs/ero.png";
import { NavLink } from "react-router-dom";

function TopNav() {
  const expand = "lg";
  return (
    <Navbar expand={expand} className='bg-body-tertiary  position-static'>
      <Navbar.Brand href='#'>
        <img
          alt=''
          src={ero}
          width='190'
          height='80'
          className='d-inline-block align-top'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-${expand}`}
        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        // placement='end'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            Erofetish
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className='justify-content-end flex-grow-1 pe-3'>
            <NavLink className='pe-4 text-dark text-center' to={"/"}>
              <b className='text-danger'>HOME</b>
            </NavLink>
            <NavLink className='pe-4 text-dark' to={"/"}>
              SHOP
            </NavLink>
            <NavLink className='pe-4 text-dark' to={"/"}>
              MENS TOYS
            </NavLink>
            <NavLink className='pe-4 text-dark' to={"/"}>
              SEX TOYS
            </NavLink>
            <NavLink className='pe-4 text-dark' to={"/"}>
              DILDOS
            </NavLink>
            <NavLink className='pe-5 text-dark' to={"/contact"}>
              CONTACT US
            </NavLink>{" "}
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default TopNav;
