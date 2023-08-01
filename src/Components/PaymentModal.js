import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Email from "./Email";
import { url } from "./url";
import axios from "axios";
import { useDispatch } from "react-redux";

const PaymentModal = (props) => {
  const [show, setShow] = useState(true);

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id='contained-modal-title-vcenter'
          className='bg-danger py-1 px-3 text-white'
          style={{ borderRadius: "13px 0 12px 0" }}
        >
          $200
        </Modal.Title>
        <sup className='text-info text-bold'>
          {" "}
          <strong>Eropay</strong>
        </sup>
      </Modal.Header>
      <Modal.Body className={show ? "d-block" : "d-none"}>
        <b className=''>Transfer</b>
        <p className='text-secondary'>
          Make a single transfer to Erofetish/Eropay
        </p>

        {props.payDetails ? (
          <div className='py-5 border'>
            <b>{props.payDetails[0].type}</b>
            <h3 className='text-center'>
              <strong>{props.payDetails[0].name}</strong>
            </h3>
          </div>
        ) : (
          <p>loading</p>
        )}

        <p className='text-danger mb-0'>
          ~Note this ia an automated transfer kindly make sure your name matches
          your Erofetish details
        </p>
        <p className='text-danger m-0'>~Avoid multiple transfers</p>
        <Button onClick={() => setShow(false)} variant='warning'>
          i have paid, Check now
        </Button>
      </Modal.Body>
      <Modal.Body className={show ? "d-none" : "d-block"}>
        <b className=''>Transfer</b>
        <p className='text-secondary'>
          Kindly upload the payment receipt for documentation and dispute
          resolve @Erofetish/Eropay
        </p>
        <Email />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShow(true);
            props.onHide();
          }}
          variant='outline-dark'
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PaymentModal;
