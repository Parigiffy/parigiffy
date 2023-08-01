import React from "react";
import "./footer.css";
import Logo from "../imgs/logo.jpg";
import merge from "../imgs/Merged.png";
import { BsWhatsapp, BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { Container, Button, Form, InputGroup, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <>
      <div className='py-4 mb-4 bg-dark'>
        <Container>
          <Row>
            <Col>
              <h4 className='text-white'>Subscribe to Newsteller</h4>
            </Col>
            <Col xs={10} lg={6}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("subscribed succesfully");
                }}
              >
                <InputGroup className=''>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    required
                  />
                  <Button type='submit' variant='danger'>
                    Submit
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className='footer '>
        <Row className=' mb-4'>
          <Col xs={6} className='d-block d-sm-none'>
            <img width={"100%"} src={merge} height={"50%"} />
          </Col>
          <Col xs={6} className='d-none d-sm-block'>
            <img width={"100%"} src={merge} height={"80%"} />
          </Col>

          <Col className='text-end ' role='button'>
            {" "}
            <BsWhatsapp size={30} className='me-2' />
            <BsTwitter size={30} className='me-2' />
            <BsInstagram size={30} className='me-2' />
            <BsFacebook size={30} className='me-2 pe-2' />
          </Col>
        </Row>
        <div className='text-center text-danger'>
          <h6>EroFetishGeaars a fast growing Adult Sex Toy Retailer </h6>
        </div>
        <p className='item-desc'>
          EroFetishGeaars is a place for all things sexual health, wellness, and
          pleasure. Our online adult store proudly offers quality sex toys
          online. Browse daily new arrivals with over 7,000 products on hand
          from the top brands of adult sex toys. We’re committed to providing
          the best products at unbeatable prices, with the mindset that everyone
          deserves pleasure. Whether you’re looking for sex toys for women, sex
          toys for men, or sex toys for couples, we have adult toys for any
          rendezvous.
        </p>{" "}
        <br />
        <br />
        <p className='item-desc'>
          Maybe you are a newbie to the world of adult toys or you're a seasoned
          pro. Either way, our selection of adult sex toys will provide you with
          the stimulation you need to reach a whole new level of sexual
          pleasure. Find a new vibrating butt plug, cock ring, rabbit vibrator,
          or clitoral stimulator - perfect for couples or solo pleasure. For
          those that are more adventurous, our online sex store also offers more
          advanced toys like vibrating anal beads, penis pumps, dildo strap ons,
          and bondage gear. Make sure to also browse our lingerie, lube, and
          anal play collections for an extra pleasurable experience. Whatever
          you're into, you'll find all the adult sex toy classics right on our
          website.
        </p>
        <h5 className='text-center text-danger pt-3'>
          Get the Greatest Deals for Adult Sex Toys Online
        </h5>
        <p className='item-desc'>
          Ready to take your sexual pleasure to the next level? Our online adult
          toy store makes it easy for you to reach orgasm and fulfill all your
          wildest fantasies. Whether you're shopping for extra clitoral
          stimulation from a bullet vibrator or looking to boost your sex life
          with quality silicone toys for both you and your partner, our
          selection of adult toys online has it all for a price you'll love.
          Plus, browse our sex toy sales for frequent deals on all of your
          favorite adult products ranging from ben wa balls to prostate massager
          toys. Shop dildos, vibrator sex toys, male masturbators, anal toys,
          and so much more.
        </p>
      </Container>
      <div className='extra-data mt-4'>
        <div className='link-section'>
          <div className='first-row'>
            <p className='bold'>Get to Know Us</p>
            <p>Make Money with Us</p>
            <p>EroFetishGears Payment</p>
            <p>Let Us Help You</p>
          </div>
          <div className='second-row'>
            <p className='bold'>About EroFetishGears </p>
            <p>Sell products on EroFetishGears </p>
            <p>EroFetishGears Business Card</p>
            <p>EroFetishGears and COVID-19</p>
          </div>
          <div className='third-row'>
            <p className='bold'>Connect with Us</p>
            <p>Sell apps on EroFetishGears </p>
            <p>Shop with Points</p>
            <p>Shipping Rates & Policies</p>
          </div>
          <div className='fourth-row'>
            <p className='bold'>EroFetishGears Cares</p>
            <p>Become an Affiliate</p>
            <p>Reload Your Balance</p>
            <p>Returns & Replacements</p>
          </div>
        </div>
        <div className='link-section2'>
          <div className='first-one'>
            <div className='first-row'>
              <p className='bold'>Get to Know Us</p>
              <p>Make Money with Us</p>
              <p>EroFetishGears Payment</p>
              <p>Let Us Help You</p>
            </div>
            <div className='second-row'>
              <p className='bold'>About EroFetishGears </p>
              <p>Sell products on EroFetishGears </p>
              <p>EroFetishGears Business Card</p>
              <p>EroFetishGears and COVID-19</p>
            </div>
          </div>
          <div className='second-one'>
            <div className='third-row'>
              <p className='bold'>Connect with Us</p>
              <p>Sell apps on EroFetishGears </p>
              <p>Shop with Points</p>
              <p>Shipping Rates & Policies</p>
            </div>
            <div className='fourth-row'>
              <p className='bold'>EroFetishGears Cares</p>
              <p>Become an Affiliate</p>
              <p>Reload Your Balance</p>
              <p>Returns & Replacements</p>
            </div>
          </div>
        </div>
        <div className='developer'>
          <img src={Logo} className='amazon-img' />
          <div className='dev-data'>
            <p>&copy; 2023 | EroFetishGears </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
