import { React, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./payment.css";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VanillaTilt from "vanilla-tilt";
import chip from "../imgs/chip.png";
import american from "../imgs/american.png";
import visa from "../imgs/visa2.png";
import master from "../imgs/master.png";
import cash from "../imgs/cash.png";
import paypal from "../imgs/paypal.png";
import gift from "../imgs/gift.png";
import apple from "../imgs/apple.png";
import zelle from "../imgs/zelle.png";
import venmo from "../imgs/venmo.png";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { AddOrder } from "../action/Orders";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import LowerNav from "./LowerNav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationGenerator from "./RegionGenerator";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import PaymentModal from "./PaymentModal";
import { Button } from "react-bootstrap";
import PaymentAnimate from "./PaymentAnimate";
import { url } from "./url";
import axios from "axios";
import TopNav from "./TopNav";

const auth = getAuth(app);
const db = getFirestore(app);

function Payment() {
  const [user, setUser] = useState([]);
  // const [Country, setCountry] = useState("");
  const [Name, setName] = useState("");
  const [Number, setNumber] = useState(null);
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");
  const [Pincode, setPincode] = useState(null);
  const [OrderID, setOrderID] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const [CityError, setCityError] = useState("");
  const [NumberError, setNumberError] = useState("");
  const [StateError, setStateError] = useState("");
  const [NameError, setNameError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [PincodeError, setPincodeError] = useState("");
  const [paymentMode, setPaymentMode] = useState("paypal");
  const [cardName, setcardName] = useState("");
  const [cardNumber, setcardNumber] = useState(null);
  const [cardCVV, setcardCVV] = useState(null);
  const [cardEXP, setcardEXP] = useState("");
  const [cardType, setCardType] = useState("");
  const [shippingDisplay, setshippingDisplay] = useState("block");
  const [cardDisplay, setcardDisplay] = useState("none");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [payments, setPayments] = useState(false);
  const [payDetails, setPayDetails] = useState(false);

  const payment_list = async () => {
    try {
      // const url = "";
      const { data } = await axios.post(`${url}/api/payments`);
      setPayments(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    payment_list();
  }, []);
  // setPayDetails(filteredPay);
  if (payments) {
    var paypalpay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("paypal".toLowerCase());
      })
      .map((product) => product);
    var cashapppay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("cash".toLowerCase());
      })
      .map((product) => product);
    var venmopay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("venmo".toLowerCase());
      })
      .map((product) => product);
    var giftcardpay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("gift".toLowerCase());
      })
      .map((product) => product);
    var applepay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("apple".toLowerCase());
      })
      .map((product) => product);
    var zellepay = payments
      .filter((product) => {
        return product.type.toLowerCase().includes("zelle".toLowerCase());
      })
      .map((product) => product);
  }

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry).map((state) => ({
        value: state.name,
        label: state.name,
      }))
    : [];

  useEffect(() => {
    // Set the default values for state and city forms
    setSelectedState("");
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    // if (e.target.value) {
    //   const cities = City.getCitiesOfState(selectedCountry, e.target.value).map(
    //     (city) => ({
    //       value: city.name,
    //       label: city.name,
    //     })
    //   );
    //   setCities(cities);
    // } else {
    //   setCities([]);
    // }
  };

  document.title = "Payment section";

  const notify1 = () =>
    toast.error("Please fill-up the form correctly!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify2 = () =>
    toast.error("Please fill-up the card details correctly!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notify3 = () =>
    toast.error("Card credentials can't be empty!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const navigate = useNavigate();

  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const dispatch = useDispatch();

  const tiltRef = useRef(null);

  // SHIPPING DETAILS
  // const handleCountry = (event) => {
  //   setCountry(event.target.value);
  // };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handlePincode = (event) => {
    setPincode(event.target.value);
  };
  const radioChange = (event) => {
    setPaymentMode(event.target.value);
  };

  // VALIDATION

  const handleCityBlur = (event) => {
    if (event.target.value === "") {
      setCityError("Please enter a valid City.");
    } else {
      setCityError("");
    }
  };

  const handleNumberBlur = (event) => {
    if (event.target.value === "") {
      setNumberError("Please enter a valid contact number.");
    } else if (event.target.value.includes("+")) {
      setNumberError("Country code isn't required.");
    } else if (event.target.value.length < 8) {
      setNumberError("Please enter a 10-digit valid contact number.");
    } else {
      setNumberError("");
    }
  };

  const handleStateBlur = (event) => {
    if (event.target.value === "") {
      setStateError("Please enter your state's name.");
    } else {
      setStateError("");
    }
  };

  const handleNameBlur = (event) => {
    if (event.target.value === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
    }
  };

  const handleAddressBlur = (event) => {
    if (event.target.value === "") {
      setAddressError("Please enter your address.");
    } else {
      setAddressError("");
    }
  };

  const handlePincodeBlur = (event) => {
    if (event.target.value === "") {
      setPincodeError("Please enter your pincode.");
    } else if (Pincode.length !== 5) {
      setPincodeError("Please enter a valid pincode.");
    } else {
      setPincodeError("");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentDate = `${now.getDate().toString().padStart(2, "0")}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`;
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setCurrentDateTime(`Date: ${currentDate} and time: ${currentTime}`);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const storedID = parseInt(localStorage.getItem("OrderID"), 10) || 126244;
    const updateID = storedID + 2;
    setOrderID(updateID);
    localStorage.setItem("OrderID", updateID.toString());
  }, []);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 100,
      glare: true,
      "max-glare": 0.3,
      transition: true,
      easing: "ease-out",
    });
  }, []);

  const TotalAmount = localStorage.getItem("TotalAmount");
  const CartData = localStorage.getItem("CartItems");

  useEffect(() => {
    if (CartItems.length === 0) {
      localStorage.setItem("TotalAmount", 0);
    }
  }, []);

  const AddUserData = async () => {
    try {
      await addDoc(collection(db, "Users"), {
        name: Name,
        city: City,
        number: Number,
        country: Country,
        address: Address,
        pincode: Pincode,
        amount: TotalAmount,
        paymethod: paymentMode,
        orderID: OrderID,
        order: CartItems,
        transaction_time: currentDateTime,
      });
    } catch (e) {
      console.error(e);
    }
  };

  function detectCreditCardType(cardNumber) {
    // Visa
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      setCardType("Visa");
    }
    // Mastercard
    else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      setCardType("Mastercard");
    }
    // American Express
    else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      setCardType("American");
    } else {
      // Unknown card type
      setCardType("");
    }
  }

  useEffect(() => {
    detectCreditCardType(cardNumber && cardNumber.slice(0, 16));
  }, [cardNumber]);

  // CARD DETAILS
  const accName = (event) => {
    setcardName(event.target.value);
  };

  const accNumber = (event) => {
    setcardNumber(event.target.value);
  };

  const accCVV = (event) => {
    setcardCVV(event.target.value);
  };

  const accEXP = (event) => {
    setcardEXP(event.target.value);
  };

  // VALIDATING CARD DETAILS

  const [CardNumberError, setCardNumberError] = useState("");
  const [CardNameError, setCardNameError] = useState("");
  const [CardCVVError, setCardCVVError] = useState("");
  const [CardEXPError, setCardEXPError] = useState("");

  const handleCardNumber = (event) => {
    if (event.target.value === "") {
      setCardNumberError("Please enter your card details.");
    } else if (cardType === "American" && event.target.value.length !== 15) {
      setCardNumberError("Please enter valid card number.");
    } else if (
      (cardType === "Visa" && event.target.value.length !== 16) ||
      (cardType === "Mastercard" && event.target.value.length !== 16)
    ) {
      setCardNumberError("Please enter valid card number.");
    } else if (cardType === "") {
      setCardNumberError("Please enter valid card number.");
    } else {
      setCardNumberError("");
    }
  };

  const handleCardName = (event) => {
    if (event.target.value === "") {
      setCardNameError("Please enter Card Holder's name.");
    } else {
      setCardNameError("");
    }
  };

  const handleCardCVV = (event) => {
    if (event.target.value === "") {
      setCardCVVError("Please enter Card's CVV number.");
    } else if (event.target.value.length !== 3) {
      setCardCVVError("Please enter a valid CVV number.");
    } else {
      setCardCVVError("");
    }
  };

  const handleCardEXP = (event) => {
    const month = event.target.value.slice(0, 2);
    const year = event.target.value.slice(2, 4);
    if (event.target.value === "") {
      setCardEXPError("Please enter Card's expiry date.");
    } else if (
      month < 1 ||
      month > 12 ||
      year < 23 ||
      event.target.value.length !== 4
    ) {
      setCardEXPError("Please enter a valid expiry date.");
    } else {
      setCardEXPError("");
    }
  };
  const isFormValid = selectedCountry && selectedState;
  return (
    <>
      <TopNav />
      <Navbar />
      <ToastContainer />
      <div className='payment-page'>
        <div className='more-data'>
          <div
            style={{ display: shippingDisplay }}
            className='shipping-data animate'
          >
            <div className='shipping-head'>Shipping details</div>
            <div className='user-data-form'>
              <p className='order-id'>Order ID: {OrderID}</p>
              <div className='all-data-of-user'>
                <div className='user-data1'>
                  <div className='country address'>
                    <p className='country-name'>Country/Region</p>

                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <option value=''>Select a country</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='address'>
                    <p className='user-fulladdress '>State</p>
                    <select
                      value={selectedState}
                      onChange={handleStateChange}
                      onBlur={handleStateBlur}
                    >
                      <option value=''>Select a state</option>
                      {states.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {StateError && (
                      <div className='error-message'>{StateError}</div>
                    )}
                  </div>

                  <div className='user-name'>
                    <p className='user-fulladdress'>City</p>
                    <input
                      type='text'
                      placeholder='City'
                      onChange={handleCity}
                      onBlur={handleCityBlur}
                      value={City}
                      disabled={isDisabled}
                      required
                    />
                    {CityError && (
                      <div className='error-message'>{CityError}</div>
                    )}
                  </div>
                  <div className='user-name'>
                    <p className='user-fullname'>Full name</p>
                    <input
                      type='text'
                      placeholder='Full name'
                      onChange={handleName}
                      onBlur={handleNameBlur}
                      value={Name}
                      disabled={isDisabled}
                      required
                    />
                    {NameError && (
                      <div className='error-message'>{NameError}</div>
                    )}
                  </div>
                  <div className='user-contact'>
                    <p className='user-number'>Mobile number</p>
                    <input
                      type='number'
                      placeholder='Number'
                      onChange={handleNumber}
                      onBlur={handleNumberBlur}
                      value={Number}
                      disabled={isDisabled}
                      required
                    />
                    {NumberError && (
                      <div className='error-message'>{NumberError}</div>
                    )}
                  </div>
                </div>

                <div className='user-data2'>
                  <div className='user-pincode'>
                    <p className='user-pin-number'>Pincode</p>
                    <input
                      type='number'
                      placeholder='Pincode'
                      onBlur={handlePincodeBlur}
                      onChange={handlePincode}
                      value={Pincode}
                      disabled={isDisabled}
                      required
                    />
                    {PincodeError && (
                      <div className='error-message'>{PincodeError}</div>
                    )}
                  </div>
                  <div className='user-email'>
                    <p className='user-fullname'>
                      Full Building, Company, Apartment
                    </p>
                    <input
                      type='text'
                      placeholder='Flat, House no., Building, Company, Apartment Address'
                      onBlur={handleAddressBlur}
                      onChange={handleAddress}
                      value={Address}
                      disabled={isDisabled}
                      required
                    />
                    {AddressError && (
                      <div className='error-message'>{AddressError}</div>
                    )}
                  </div>
                  <input type='checkbox' name='' id='' />{" "}
                  <small>Save adress details</small>
                  <b>
                    <p>Add delivery instructions (optional)</p>
                  </b>
                  <p className='deliverinst'>
                    Preferences are used to plan your delivery. However,
                    shipments can sometimes arrive early or later than planned.
                  </p>
                  <div className='country address'>
                    <select>
                      <option value=''>Select an address type</option>

                      <option value=''>home(7am -9pm delivery)</option>

                      <option value=''>
                        Office/Commercial(10am -6pm delivery)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (
                    Name.length !== 0 &&
                    Address.length !== 0 &&
                    selectedState.length !== 0 &&
                    Pincode !== null &&
                    Number !== null &&
                    City.length !== 0 &&
                    NameError.length === 0 &&
                    AddressError.length === 0 &&
                    StateError.length === 0 &&
                    PincodeError.length === 0 &&
                    NumberError.length === 0 &&
                    CityError.length === 0
                  ) {
                    setDisabled(true);
                    setshippingDisplay("none");
                    setcardDisplay("block");
                  } else {
                    notify1();
                  }
                }}
                className='btn btn-warning'
                // disabled={!isFormValid}
              >
                Save
              </button>
            </div>
          </div>
          <div
            style={{ display: cardDisplay }}
            className='payment-data animate'
          >
            <div className='payment-option'>
              {/* <Button variant='primary' onClick={() => setModalShow(true)}>
                Launch vertically centered modal
              </Button> */}

              <PaymentModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                payDetails={payDetails}
              />
              <PaymentAnimate />
              <p className='payment-method'>Choose your payment method</p>
              <div className='choose-option'>
                <div className='cod payment-select '>
                  <input
                    type='radio'
                    defaultChecked
                    name='payment-method'
                    onChange={radioChange}
                    value='paypal'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(paypalpay);
                    }}
                  />
                  Paypal &nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={paypal} width={50} height={42} />
                </div>
                <div className='cod payment-select'>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='cash'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(cashapppay);
                    }}
                  />
                  Cashapp
                  <img src={cash} width={50} height={42} />
                </div>
                <div className='cod payment-select '>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='apple'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(applepay);
                    }}
                  />
                  Apple &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={apple} width={50} height={49} />
                </div>
                <div className='cod payment-select'>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='zelle'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(zellepay);
                    }}
                  />
                  Zelle &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={zelle} width={50} height={49} />
                </div>
                <div className='cod payment-select'>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='venmo'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(venmopay);
                    }}
                  />
                  Venmo &nbsp;&nbsp;&nbsp;
                  <img src={venmo} width={50} height={49} />
                </div>
                <div className='cod payment-select'>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='gift'
                    onClick={() => {
                      setModalShow(true);
                      setPayDetails(giftcardpay);
                    }}
                  />
                  GiftCard
                  <img src={gift} width={50} height={49} />
                </div>
                <div className='credit payment-select'>
                  <input
                    type='radio'
                    name='payment-method'
                    onChange={radioChange}
                    value='Credit'
                  />
                  Credit/Debit card
                </div>
              </div>
              <div
                style={
                  paymentMode === "Credit"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                className='online-card-section'
              >
                <div ref={tiltRef} className='credit-body'>
                  <div className='first-layer'>
                    <img src={chip} className='credit-chip' />
                    <img
                      src={
                        cardType === "Visa"
                          ? visa
                          : cardType === "Mastercard"
                          ? master
                          : cardType === "American"
                          ? american
                          : ""
                      }
                      className={
                        cardType !== ""
                          ? `card-company animation`
                          : `card-company`
                      }
                    />
                  </div>
                  <div className='middle-layer'>
                    <p className='account-number'>
                      {cardNumber &&
                        cardNumber.slice(0, 4) +
                          " " +
                          cardNumber.slice(4, 8) +
                          " " +
                          cardNumber.slice(8, 12) +
                          " " +
                          cardNumber.slice(12, 16)}
                    </p>
                  </div>
                  <div className='last-layer'>
                    <p className='holder-name'>
                      {cardName.toUpperCase().slice(0, 19)}
                    </p>
                    <p className='cvv-number'>
                      {cardCVV && cardCVV.slice(0, 3) + ""}
                    </p>
                    <p className='exp-date'>
                      {cardEXP &&
                        cardEXP.slice(0, 2) + "/" + cardEXP.slice(2, 4)}
                    </p>
                  </div>
                </div>
                <div className='online-card-form'>
                  <p className='card-head-details'>Card Details</p>
                  <div className='all-data-of-card'>
                    <div className='card-data1'>
                      <div className='acc-number'>
                        <p className='acc-number-head'>Account Number*</p>
                        <input
                          type='number'
                          className='acc-number-inp'
                          onChange={accNumber}
                          onBlur={handleCardNumber}
                          placeholder='1234-4567-8901-2345'
                          value={cardNumber}
                          maxLength='16'
                        />
                        {CardNumberError && (
                          <div className='error-message'>{CardNumberError}</div>
                        )}
                      </div>
                      <div className='acc-name'>
                        <p className='acc-name-head'>Card Holder's Name*</p>
                        <input
                          type='text'
                          className='acc-name-inp'
                          onChange={accName}
                          onBlur={handleCardName}
                          value={cardName}
                          placeholder='Ex: John Doe'
                        />
                        {CardNameError && (
                          <div className='error-message'>{CardNameError}</div>
                        )}
                      </div>
                    </div>
                    <div className='card-data2'>
                      <div className='acc-cvv'>
                        <p className='acc-cvv-head'>CVV Number*</p>
                        <input
                          type='number'
                          className='acc-cvv-inp'
                          onChange={accCVV}
                          onBlur={handleCardCVV}
                          placeholder='123'
                          maxLength='3'
                          value={cardCVV}
                        />
                        {CardCVVError && (
                          <div className='error-message'>{CardCVVError}</div>
                        )}
                      </div>
                      <div className='acc-exp'>
                        <p className='acc-exp-head'>Expiry Date*</p>
                        <input
                          type='number'
                          className='acc-exp-inp'
                          onChange={accEXP}
                          onBlur={handleCardEXP}
                          placeholder='Ex: 0120 (01/20)'
                          value={cardEXP}
                        />
                        {CardEXPError && (
                          <div className='error-message'>{CardEXPError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='paying-data'></div>
              <div className='total-amount'>
                <p className='subtotal-amount'>Total Amount :</p>
                <p className='main-amount'>${TotalAmount}</p>
              </div>
              <div className='order-place-btn'>
                <button
                  onClick={() => {
                    if (paymentMode === "Credit") {
                      if (
                        cardNumber === null ||
                        cardName.length === 0 ||
                        cardCVV === null ||
                        cardEXP.length === 0
                      ) {
                        notify3();
                      } else if (
                        CardNameError.length !== 0 ||
                        CardNumberError.length !== 0 ||
                        CardCVVError.length !== 0 ||
                        CardCVVError.length !== 0 ||
                        CardEXPError.length !== 0
                      ) {
                        notify2();
                      } else {
                        dispatch(AddOrder(JSON.parse(CartData)));
                        AddUserData();
                        swal({
                          title: "Transaction successful!",
                          text: `Thanks for shopping with us.`,
                          icon: "success",
                          buttons: "Ok",
                        }).then((willNavigate) => {
                          if (willNavigate) {
                            localStorage.removeItem("CartItems");
                            navigate("/orders");
                            window.location.reload();
                          }
                        });
                      }
                    } else {
                      dispatch(AddOrder(JSON.parse(CartData)));
                      AddUserData();
                      swal({
                        title: "Purchase successful!",
                        text: `Thanks for shopping with us.`,
                        icon: "success",
                        buttons: "Ok",
                      }).then((willNavigate) => {
                        if (willNavigate) {
                          navigate("/orders");
                          localStorage.removeItem("CartItems");
                          window.location.reload();
                        }
                      });
                    }
                  }}
                  className='confirm-btn'
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lowerNav'>
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default Payment;
