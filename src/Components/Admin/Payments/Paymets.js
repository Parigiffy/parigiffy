import React, { useEffect, useState } from "react";
import "./Payments.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Plus, Trash, XCircle, PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import Header from "../Header/header";
import { url } from "../../url";

function Payments() {
  const dispatch = useDispatch();

  const [payments, setPayments] = useState(false);
  const [error, setError] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState("");

  const data = {
    payment: [
      {
        name: title,
        type: type,
      },
    ],
  };

  const payment_list = async () => {
    try {
      // const url = "/api/payments";
      const { data } = await axios.post(`${url}/api/payments`);
      setPayments(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    payment_list();
  }, []);

  const add_payment = (data) => {
    // const url = "/api/payments/add";
    axios.post(`${url}/api/payments/add`, data);
    close_add_toggle();
    dispatch(payment_list());
  };

  const removePayment = async (id) => {
    const paymentId = {
      id: id,
    };
    // let url = "/api/payments/delete";

    await axios.post(`${url}/api/payments/delete`, paymentId);
    dispatch(payment_list());
  };

  const add_toggle = () => {
    setAddPopup(true);
  };

  const close_add_toggle = () => {
    setAddPopup(false);
  };

  const view_toggle = async (id) => {
    const data = await axios.post(`/api/payments/${id}`);
    setEdit(data.data);
    setEditPopup(true);
  };

  const close_toggle = () => {
    setEditPopup(false);
  };

  const save_edit = async (data) => {
    // let url = "/api/payments/edit";
    await axios.post(`${url}/api/payments/edit`, data);
    close_toggle();
    dispatch(payment_list());
  };

  return (
    <div>
      <Header />
      {!payments ? (
        <del></del>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className='adminProductsSection'>
          <div className='container'>
            <div className='adminPanelOverviewTitleDiv'>
              <p className='adminPanelOverviewTitle'>Payments</p>
            </div>
            <div className='adminPanelOverviewSubTitleDiv'>
              <p className='adminPanelOverviewSubTitleText'>
                <Link to='/admin' style={{ textDecoration: "none" }}>
                  <span className='adminPanelOverviewSubDashboardTitle'>
                    Dashboard
                  </span>
                </Link>
                {">"}
                <Link to='/admin/products' style={{ textDecoration: "none" }}>
                  <span className='adminPanelOverviewSubAmazonDashboardTitle'>
                    Products
                  </span>
                </Link>
                {">"}
                <span className='adminPanelOverviewSubAmazonDashboardTitle'>
                  Payments
                </span>
              </p>
            </div>
            <div className='productAddBtnDiv'>
              <button
                className='btn btn-success product-btn'
                onClick={add_toggle}
              >
                Add Payment <Plus className='productIcon' />
              </button>
            </div>
            {addPopup && (
              <section className='addPaymentSection'>
                <div className='addPaymentContainer'>
                  <form action=''>
                    <XCircle
                      className='addNewPaymentTitleIcon'
                      onClick={add_toggle}
                    />
                    <p className='addNewAddressText addNewPaymentTitle'>
                      Add a new payment{" "}
                    </p>
                    <label htmlFor='' className='addProductInputLabel'>
                      Account Details
                    </label>
                    <br />
                    <input
                      type='text'
                      className='inputSpace'
                      placeholder='Payment info'
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    <label htmlFor='' className='addProductInputLabel'>
                      Type
                    </label>

                    <br />
                    <input
                      type='text'
                      className='inputSpace'
                      placeholder='e.g venmo, cashapp/family and friends'
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    <button
                      className='btn btn-primary btn-addNewPayment'
                      onClick={(e) => {
                        e.preventDefault();
                        add_payment(data);
                      }}
                    >
                      Add
                    </button>
                  </form>
                </div>
              </section>
            )}
            {editPopup && (
              <section className='addPaymentSection'>
                <div className='addPaymentContainer'>
                  <form action=''>
                    <XCircle
                      className='addNewPaymentTitleIcon'
                      onClick={close_toggle}
                    />
                    <p className='addNewAddressText addNewPaymentTitle'>
                      Edit payment
                    </p>
                    <label htmlFor='' className='addProductInputLabel'>
                      Account details
                    </label>
                    <br />
                    <input
                      type='text'
                      className='inputSpace'
                      placeholder='Payment info'
                      defaultValue={edit.name}
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    <label htmlFor='' className='addProductInputLabel'>
                      Type
                    </label>

                    <br />
                    <input
                      type='text'
                      className='inputSpace'
                      placeholder='e.g venmo, cashapp/family and friends'
                      defaultValue={edit.type}
                      onChange={(e) => {
                        setEditType(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    <button
                      className='btn btn-warning btn-addNewPayment'
                      onClick={(e) => {
                        e.preventDefault();
                        const editedData = {
                          _id: edit._id,
                          name: editTitle,
                          type: editType,
                        };
                        save_edit(editedData);
                      }}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </section>
            )}

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>NO.</th>
                  <th scope='col'>Details</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Options</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{payment.name}</td>
                      <td>{payment.type}</td>
                      <td>
                        <button
                          className='btn btn-secondary btn-product-option btn-edit product-btn'
                          onClick={() => {
                            view_toggle(payment._id);
                          }}
                        >
                          Edit <PencilSquare className='productIcon' />
                        </button>
                        <button
                          className='btn btn-danger btn-delete'
                          onClick={() => {
                            alert("Do you intend to delete?");
                            removePayment(payment._id);
                          }}
                        >
                          Delete <Trash className='productIcon' />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default Payments;
