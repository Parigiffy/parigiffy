import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ShopCategory = () => {
  const category = JSON.parse(localStorage.getItem("totalCategory"));
  const navigate = useNavigate();
  useEffect(() => console.log('mounted'), [navigate]);
  return (
    <Col
      className='d-md-block d-none p-0 border border-dark me-4 ms-4'
      style={{ maxHeight: "100%" }}
    >
      <h3 className='p-2 text-white bg-dark'>Category</h3>

      <div>
        {category ? (
          category.map((category) => (
            <p
              className='p-2 m-0  border-bottom '
              role='button'
              key={category._id}
              onClick={(e) => {
                // e.preventDefault();
                navigate(`/category/${category._id}`);
                window.location.reload()
              }}
            >
              {category.name}
            </p>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </Col>
  );
};

export default ShopCategory;
