import { React, useState } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "./home.css";
import Popular from "./Category/Popular";
import Navbar from "./Navbar";
import SideBar1 from "./SideBar1";
import banner from "../imgs/banner.jpg";
import Mainbanner from "../imgs/Main-banner.gif";
// import { Col, Row } from "react-bootstrap";
import BasicSlider from "./Carousel";
import HCarousel from "./Carousel";
import Slides from "./Slides";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import Deals from "./Deals";
import ShopCategory from "./ShopCategory";
import Email from "./Email";
import TopNav from "./TopNav";
import Marquee from "./TextAnimate";
// import { json } from "body-parser";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  document.title = "Erofetishgear";
  const navigate = useNavigate();
  const category = JSON.parse(localStorage.getItem("totalCategory"));

  const handleScroll = () => {
    window.scrollTo({
      top: scrollPosition + 750,
      behavior: "smooth",
    });
    setScrollPosition(scrollPosition + 750);
    setTimeout(() => {
      setScrollPosition(0);
    }, 100);
  };

  return (
    <>
      <Marquee />
      <TopNav />
      <Navbar />
      <SideBar1 />
      {/* <Menu /> */}
      <Container fluid>
        <div>
          <Row>
            <ShopCategory />
            <Col md={9} xs={11}>
              <Row>
                <Col
                  md={8}
                  xs={8}
                  className='p-1 me-4 ms-2 '
                  style={{ maxHeight: "380px" }}
                >
                  <HCarousel style={{ maxHeight: "380px" }} />
                </Col>
                <Col style={{ maxHeight: "380px" }}>
                  <div class='grid1'>
                    <figure class='effect-apollo'>
                      <img
                        style={{ maxHeight: "190px" }}
                        width={"100%"}
                        src='https://mofetishgears.com/wp-content/uploads/2020/06/sidebar1.png'
                        alt='im18'
                      />
                      <figcaption></figcaption>
                    </figure>
                  </div>
                  <div>
                    <img
                      style={{ maxHeight: "190px" }}
                      width={"100%"}
                      src='https://mofetishgears.com/wp-content/uploads/2020/06/sidebar2.png'
                      alt=''
                    />
                  </div>
                </Col>
              </Row>
              <Row className='mt-3 d-none d-sm-block'>
                <Col>
                  <Slides />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
      <Container fluid>
        <div className='mt-4'>
          <Row>
            <Col className='p-0 pe-2 '>
              <img
                style={{ maxHeight: "450px" }}
                width={"100%"}
                src={banner}
                alt='banner'
                srcset=''
              />
            </Col>
            <Col xs={3} className='ms-auto'>
              <ListGroup>
                {/* <ListGroupItem className='border-bottom border-danger'>
                  <strong>Rated</strong>
                </ListGroupItem> */}
                <ListGroupItem className='bg-danger text-white'>
                  Dildo
                </ListGroupItem>
                <img
                  width={"100%"}
                  height={"10%"}
                  src='https://metro.co.uk/wp-content/uploads/2016/11/neon.png?quality=90&strip=all&zoom=1&resize=480%2C293'
                  alt=''
                />
                <ListGroupItem className='bg-dark text-white'>
                  AnalToy
                </ListGroupItem>
              </ListGroup>

              {/* <ol>
                <li></li>
                <li></li>
              </ol> */}
              <img
                className='d-none d-sm-block'
                width={"100%"}
                height={140}
                src='https://www.dhresource.com/0x0/f2/albu/g2/M01/CB/78/rBVaGlbMEa-ABLOhAADSWelLbx8936.jpg'
                alt=''
              />
              {/* <ol>
                <li></li>
                <li></li>
              </ol> */}
            </Col>
            {/* <Col xs={3}>
              {" "}
              <strong className='border-bottom border-danger'>TOP RATED</strong>
              <div className='bg-danger'>
                <h2 className='p-3 text-center'>Dildo</h2>
              </div>
              <div>
                {" "}
                <h2 className='p-4 text-center'>Anal Toys</h2>
              </div>
              <div>
                {" "}
                <h5 className='p-4 text-center'>Chastity</h5>
              </div>
            </Col> */}
          </Row>
          <Row className='mt-3'>
            <Col>
              {" "}
              <img width={"100%"} src={Mainbanner} alt='' />
            </Col>
          </Row>
        </div>
      </Container>

      {/* <Popular /> */}
      <Deals />
    </>
  );
}

export default Home;
