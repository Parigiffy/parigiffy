import { React, useState, useEffect } from "react";
import { AddToList, RemoveList } from "../action/List";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Added from "../imgs/red-heart.png";
import Add from "../imgs/heart.png";
import Footer from "./Footer";
import rating from "../imgs/rating.png";
import Navbar from "./Navbar";
import empty from "../imgs/empty.png";
import { NavLink } from "react-router-dom";
import LowerNav from "./LowerNav";
import "./lists.css";
import TopNav from "./TopNav";

function Lists() {
  const [AddedIds, setAddedIds] = useState([]);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();

  document.title = "Wishlist section";

  useEffect(() => {
    // Update the added ids whenever the list items change
    const ids = ListItems.map((item) => item._id);
    setAddedIds(ids);
  }, [ListItems]);

  const isAdded = (itemId) => {
    // Check if the item id is in the added ids
    return AddedIds.includes(itemId);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TopNav />
      <Navbar />
      <div style={{ height: "100%" }}>
        <div className={ListItems ? `lists animate` : `lists`}>
          <p className='wishlist-head'>Wishlist</p>
          <div
            style={
              ListItems.length === 0 ? { display: "flex" } : { display: "none" }
            }
            className='empty-list'
          >
            <img src={empty} className='empty-img' />
            <div className='empty-text'>
              <p className='empty-head'>It's empty here!</p>
              <p className='empty-desc'>
                "Don't let your wishlist collect dust. Add some items that bring
                joy to your life and watch as they become a reality with just a
                few clicks."
              </p>
              <Link to='/home'>
                <button className='shopping'>Go Shopping</button>
              </Link>
            </div>
          </div>
          <div className='lists-items'>
            {ListItems &&
              ListItems.length > 0 &&
              ListItems.map((items) => {
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
                        className='add-list2'
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
                          <p className='rating-text'>5</p>
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
        </div>
        <div className='lowerNav'>
          <LowerNav />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Lists;
