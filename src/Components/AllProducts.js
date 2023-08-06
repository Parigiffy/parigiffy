import { React, useEffect, useState } from "react";
import "./allproducts.css";
import Add from "../imgs/heart.png";
import Added from "../imgs/red-heart.png";
import rating from "../imgs/rating.png";
import { AddToList, RemoveList } from "../action/List";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import Spinner from "./Spinner";
import LowerNav from "./LowerNav";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { url } from "./url";

function Deals() {
  const [AllProducts, setAllProducts] = useState([]);
  const [AddedIds, setAddedIds] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state

  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetProducts = async () => {
      const {data} = await fetch(`${url}/api/products`);
      const new_data = await data.json();
      setLoading(false);
      setAllProducts(new_data);
      // Add a review number property to each item object
      const productsWithReviewNumber = new_data.map((item) => ({
        ...item,
        reviewNumber: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
      }));
      setAllProducts(productsWithReviewNumber);
    };

    GetProducts();
  }, []);

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item.id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  return (
    <div className='alldeals'>
      <Navbar />
      <p className='deals-head'>all products 🔥</p>
      {loading && <Spinner />}
      <div className='deal-items'>
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className='card1' key={items.id}>
                <div className='card1-img-data'>
                  <img src={items.image} className='card1-img' />
                  <img
                    onClick={() => {
                      if (!isAdded(items.id)) {
                        dispatch(AddToList(items));
                      } else {
                        dispatch(RemoveList(items.id));
                      }
                    }}
                    src={isAdded(items.id) ? Added : Add}
                    className='add-list'
                  />

                  <NavLink to={`/product/${items.id}`} key={items.id}>
                    <button className='view'>View product</button>
                  </NavLink>
                </div>
                <div className='card1-data'>
                  <p className='card1-title'>
                    {items.title.length >= 32
                      ? items.title.slice(0, 32) + ".."
                      : items.title}
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
                        {"5 " + "(" + items.reviewNumber + " reviews)"}
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
      <div className='lowerNav'>
        <LowerNav />
      </div>
      <Footer />
    </div>
  );
}

export default Deals;
