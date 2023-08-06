// src/components/ContactUs.js

import React from "react";
import TopNav from "./TopNav";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Navbar />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2>Contact Us</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("we will get back to you soon");
              }}
            >
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  required
                  className='form-control'
                  id='message'
                  rows='5'
                ></textarea>
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
