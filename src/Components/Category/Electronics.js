import { React, useEffect, useState } from "react";
import "../deals.css";
import Add from "./Img/heart.png";
import Added from "./Img/red-heart.png";
import rating from "./Img/rating.png";
import { AddToList, RemoveList } from "../../action/List";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";
import Spinner from "../Spinner";
import LowerNav from "../LowerNav";

function Electronics() {
  const [AllProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state
  const [AddedIds, setAddedIds] = useState([]);

  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const GetProducts = async () => {
      const data = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
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
    const ids = ListItems.map((item) => item._id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  return (
    <div className='Deals'>
      <p className='deals-head'>Electronics</p>
      {loading && <Spinner />}
      <div className='deal-items'>
        {AllProducts &&
          AllProducts.map((items) => {
            return (
              <div className='card' key={items._id}>
                <div className='card-img-data'>
                  <img src={items.image} className='card-img' />
                  <img
                    onClick={() => {
                      if (!isAdded(items._iddd)) {
                        dispatch(AddToList(items));
                      } else {
                        dispatch(RemoveList(items._id));
                      }
                    }}
                    src={isAdded(items._id) ? Added : Add}
                    className='add-list'
                  />

                  <NavLink to={`/product/${items._id}`} key={items._iddd}>
                    <button className='view'>View product</button>
                  </NavLink>
                </div>
                <div className='card-data'>
                  <p className='card-title'>
                    {items.title.length >= 32
                      ? items.title.slice(0, 32) + ".."
                      : items.title}
                  </p>
                  <div className='category-rating'>
                    <p className='card-category'>{items.category}</p>
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
                  <div className='card-price'>
                    <p className='discount'>${items.price}</p>
                    <p className='mrp'>${Math.round(items.price * 1.66)}</p>
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

export default Electronics;