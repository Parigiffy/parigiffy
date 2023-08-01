import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Accordion, Col, Row } from "react-bootstrap";
import { MdCelebration } from "react-icons/md";

import Navbar from "./Navbar";
import Footer from "./Footer";
import "./productpage.css";
import Rating from "../imgs/rating.png";
import added from "../imgs/added.png";
import add from "../imgs/not-added.png";
import { AddToCart, RemoveCart } from "../action/Cart";
import { useSelector, useDispatch } from "react-redux";
import VanillaTilt from "vanilla-tilt";
import LowerNav from "./LowerNav";
import axios from "axios";
import { url } from "./url";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import SideBar1 from "./SideBar1";
import ShopCategory from "./ShopCategory";
import Marquee from "./TextAnimate";
import ViewedProduct from "./ViewedProduct";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [Size, setSize] = useState("");
  const [AddedIds, setAddedIds] = useState([]);
  const [deptId, setDeptId] = useState("");
  // const [reviews, setReviews] = useState(null);
  const Quantity = 1;

  const tiltRef = useRef(null);
  const breadcrumbs = useBreadcrumbs();
  console.log(product);
  console.log(deptId);

  document.title = `${product ? product.name : "Erofetshgear"}`;

  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      let path = window.location.pathname;
      path = path.split("/")[2];
      const data = await axios.get(`${url}/api/products/${id}`);
      console.log(data);

      setProduct(data.data);
      setDeptId(data.data.department);
    };

    // const randomNumber = Math.floor(Math.random() * 81) + 20;
    // setReviews(randomNumber);

    getProducts();
  }, [window.location.pathname.split("/")[2]]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ids = CartItems.map((item) => item.id);
    setAddedIds(ids);
  }, [CartItems]);

  const isAdded = (itemId) => {
    return AddedIds.includes(itemId);
  };

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  const handleAddToCart = () => {
    if (!isAdded(product._id)) {
      const item = {
        id: product._id,
        title: product.name,
        price: product.price,
        image: product.image,
        size: Size,
        category: product.category,
        quantity: Quantity,
      };
      dispatch(AddToCart(item));
    } else {
      dispatch(RemoveCart(product._id));
    }
  };
  const handleAddToCart2 = () => {
    if (!isAdded(product._id)) {
      const item = {
        id: product._id,
        title: product.name,
        price: product.price,
        image: product.image,
        size: Size,
        category: product.category,
        quantity: Quantity,
      };
      dispatch(AddToCart(item));
    } else {
    }
  };

  const limited = product && product.description;
  // const DescLimited = limited ? limited.slice(0, 200) + "." : "";

  return (
    <>
      <Marquee />
      <Navbar />
      <SideBar1 />
      {/* <React.Fragment>
        {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
      </React.Fragment> */}
      <Row>
        {" "}
        <Col className='ps-5 d-md-block d-none'>
          {" "}
          <ShopCategory />
        </Col>
        <Col md={9}>
          {" "}
          <div
            // style={product ? { height: "100%" } : { height: "100vh" }}
            className='product-page'
          >
            <div
              className={product ? `product-dataa animate` : `product-dataa`}
            >
              <div className='item-image'>
                <img
                  ref={tiltRef}
                  src={product.image}
                  className={`item-img ${product.image ? "img-style" : ""}`}
                />
              </div>
              <div className='product-details'>
                <p className='item-title'>{product.name}</p>
                <p className='text-info'>{product.brand}</p>
                <div className='price-section'>
                  <div className='item-rating'>
                    <img src={product && Rating} className='rating-img' />
                    <img src={product && Rating} className='rating-img' />
                    <img src={product && Rating} className='rating-img' />
                    <img src={product && Rating} className='rating-img' />
                    <img src={product && Rating} className='rating-img' />
                    <p className='rating-no'>
                      {product ? `(${product.numReviews})` : ""}
                    </p>
                  </div>
                </div>
                {product ? (
                  <div className='product-actual-price'>
                    <p className='price-one'>Price:</p>
                    <p className='price-two'>${product.price}</p>
                    <p className='mrp'>${Math.round(product.price * 1.66)}</p>
                  </div>
                ) : (
                  ""
                )}
                <div
                  style={product ? { display: "flex" } : { display: "none" }}
                  className='buying-buttons'
                >
                  <Link to='/cart'>
                    <button onClick={handleAddToCart2} className='buy-btn'>
                      Buy Now
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleAddToCart();
                    }}
                    className='add-cart-btn'
                  >
                    <img
                      src={isAdded(product._id) ? added : add}
                      className='cart-img'
                    />
                    <p style={{ marginLeft: "8px" }} className='cart-text m-0'>
                      {isAdded(product._id) ? "Added" : "Add"}
                    </p>
                  </button>
                </div>

                {product ? <hr className=' m-0 mt-3' /> : ""}
                <p className=' m-0 text-warning'>
                  {" "}
                  <MdCelebration /> <MdCelebration /> Anniversary deal
                </p>
                {product ? <hr className=' m-0 mb-3' /> : ""}
                <b className='text-info'>{product.category}</b>
                {/* <div
              style={
                product.category === "men's clothing" ||
                product.category === "women's clothing"
                  ? { display: "block" }
                  : { display: "none" }
              }
              className='cloth-size'
            >
              <p className='choose'>Choose a size</p>
              <div className='options'>
                <p
                  onClick={() => setSize("S")}
                  className={`size ${Size === "S" ? "size-clicked" : ""}`}
                >
                  S
                </p>
                <p
                  onClick={() => setSize("M")}
                  className={`size ${Size === "M" ? "size-clicked" : ""}`}
                >
                  M
                </p>
                <p
                  onClick={() => setSize("L")}
                  className={`size ${Size === "L" ? "size-clicked" : ""}`}
                >
                  L
                </p>
                <p
                  onClick={() => setSize("XL")}
                  className={`size ${Size === "XL" ? "size-clicked" : ""}`}
                >
                  XL
                </p>
                <p
                  onClick={() => setSize("XXL")}
                  className={`size ${Size === "XXL" ? "size-clicked" : ""}`}
                >
                  XXL
                </p>
              </div>
            </div>
            {(product && product.category === "men's clothing") ||
            product.category === "women's clothing" ? (
              <hr className='horizontal' />
            ) : (
              ""
            )} */}
              </div>
            </div>
          </div>
          <p className='item-desc'>
            <Accordion
              defaultActiveKey={["0"]}
              className='accordion-width'
              alwaysOpen
            >
              <Accordion.Item eventKey='0'>
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>{product.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header>Reviews</Accordion.Header>
                <Accordion.Body>hi</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </p>
        </Col>
      </Row>
      <ViewedProduct id={deptId} />
      <div className='lowerNav '>
        <LowerNav />
      </div>
      {product ? <Footer /> : ""}
    </>
  );
}

export default ProductPage;
