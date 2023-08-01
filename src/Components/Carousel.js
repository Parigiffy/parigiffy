import Carousel from "react-bootstrap/Carousel";

function HCarousel() {
  return (
    <Carousel
      controls={false}
      navButtonsAlwaysInvisible={true}
      style={{ maxHeight: "380px" }}
    >
      <Carousel.Item style={{ maxHeight: "380px" }}>
        <img
          // style={{ maxHeight: "470px" }}
          height={"100%"}
          width={"100%"}
          src='https://mofetishgears.com/wp-content/uploads/2020/06/bigstock-Young-Sexy-Couple-On-The-Bed-144000719.jpg'
          alt='First slide'
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item style={{ maxHeight: "380px" }}>
        <img
          // style={{ maxHeight: "470px" }}
          height={"100%"}
          width={"100%"}
          src='https://i.etsystatic.com/31479617/r/il/a1250f/3529013126/il_1588xN.3529013126_8qey.jpg'
          alt='Second slide'
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default HCarousel;
