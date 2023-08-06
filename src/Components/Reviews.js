import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import Review from "./Review";

const initialFormState = { name: "", review: "", rating: 0 };

const ReviewForm = ({ setVisible, setReviews, reviews }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [disabled, setDisabled] = useState(true);

  const { name, review, rating } = formState;

  function handleSubmit(e) {
    e.preventDefault();

    alert("response recieved");
    // setDisabled(true);
  }

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (review.length > 3 && rating > 0 && name !== "") setDisabled(false);
    else setDisabled(true);
  }, [name, rating, review]);

  return (
    <div>
      <Review />
      <p>
        <b>Write a review</b>
      </p>
      <span>Overall: </span>
      <StarRating
        onChange={(rating) => setFormState({ ...formState, rating })}
        value={formState.rating}
      />
      <Form className='form w-75 pt-2' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            placeholder='product title'
            name='name'
            onChange={handleChange}
            className='rounded-pill'
            size='sm'
          />
          <br />
          <Form.Control
            placeholder='Write your review here'
            name='review'
            as='textarea'
            rows={5}
            onChange={handleChange}
            size='sm'
          />
          <br />
          <Button className='btn' disabled={disabled} type='submit'>
            Send
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ReviewForm;
