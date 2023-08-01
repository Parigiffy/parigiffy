import { React, useEffect, useState } from "react";
import "./category.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
import { AddToList, RemoveList } from "../action/List";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import Spinner from "./Spinner";
import LowerNav from "./LowerNav";
import { NavLink } from "react-router-dom";
import { url } from "./url";
import Navbar from "./Navbar";
import axios from "axios";
import TopNav from "./TopNav";
import { Col, Row } from "react-bootstrap";
import ShopCategory from "./ShopCategory";
import SideBar1 from "./SideBar1";

function Category() {
  const [AllProducts, setAllProducts] = useState([]);
  const [AddedIds, setAddedIds] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state

  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();
  console.log(AllProducts);

  useEffect(() => {
    const GetProducts = async () => {
      let path = window.location.pathname;
      path = path.split("/")[2];

      const data = await axios.post(`${url}/api/products/${path}`);
      // const new_data = await data.json();
      setLoading(false);
      setAllProducts(data.data);
      // Add a review number property to each item object
      // const productsWithReviewNumber = new_data.map((item) => ({
      //   ...item,
      //   reviewNumber: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
      // }));
      // setAllProducts(productsWithReviewNumber);
    };

    GetProducts();
  }, [window.location.pathname.split("/")[2]]);

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item._id);
    setAddedIds(ids);
  }, [ListItems]);
  // console.log(AllProducts[0].category);
  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  return (
    <div className='alldeals'>
      <TopNav />
      <Navbar />
      <Row className='mt-3'>
        <SideBar1 />
        <ShopCategory />
        <Col md={9} xs={12}>
          {loading ? (
            <Spinner />
          ) : (
            <p className='deals-head'>{AllProducts[0].category}</p>
          )}
          {loading && <Spinner />}
          <div className='deal-items'>
            {AllProducts &&
              AllProducts.map((items) => {
                return (
                  <div className='card1' key={items._id}>
                    <div className='card1-img-data'>
                      <img src={items.image} className='card1-img' />
                      <img
                        onClick={() => {
                          if (!isAdded(items._id)) {
                            dispatch(AddToList(items));
                          } else {
                            dispatch(RemoveList(items._id));
                          }
                        }}
                        src={isAdded(items._id) ? Added : Add}
                        className='add-list'
                      />

                      <NavLink to={`/product/${items._id}`} key={items._id}>
                        <button className='view'>View product</button>
                      </NavLink>
                    </div>
                    <div className='card1-data'>
                      <p className='card1-title'>
                        {items.name.length >= 32
                          ? items.name.slice(0, 32) + ".."
                          : items.name}
                      </p>
                      <div className='category-rating'>
                        <p className='card1-category'>{items.category}</p>
                        <div className='rating'>
                          <img src={rating} className='rating-img' />
                          <img src={rating} className='rating-img' />
                          <img src={rating} className='rating-img' />
                          <img src={rating} className='rating-img' />
                          <img src={rating} className='rating-img' />
                          <p className='rating-text'>
                            {"5 " + "(" + items.numReviews + " reviews)"}
                          </p>
                        </div>
                      </div>
                      <div className='card1-price'>
                        <p className='discount'>${items.price}</p>
                        <p className='mrp'>${Math.round(items.price * 1.66)}</p>
                        <p className='price-off'>(60% OFF)</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
      </Row>
      <div className='lowerNav'>
        <LowerNav />
      </div>
      <Footer />
    </div>
  );
}

export default Category;
