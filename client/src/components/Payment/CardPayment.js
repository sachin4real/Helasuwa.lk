import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardPayment() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expYear: '',
    expMonth: '',
    ccv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/card', cardDetails);
      alert('Payment processed successfully!');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed.');
    }
  };

  return (
    <div className="container">
      <h3 className="mt-4">Select Payment Option</h3>
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
        <div className="form-group mb-3">
          <label htmlFor="cardNumber">Number on Card</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            maxLength="16"
            required
            value={cardDetails.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cardName">Name on Card</label>
          <input
            type="text"
            className="form-control"
            id="cardName"
            name="cardName"
            required
            value={cardDetails.cardName}
            onChange={handleChange}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expYear">Exp Year</label>
            <input
              type="text"
              className="form-control"
              id="expYear"
              name="expYear"
              maxLength="4"
              required
              value={cardDetails.expYear}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="expMonth">Exp Month</label>
            <input
              type="text"
              className="form-control"
              id="expMonth"
              name="expMonth"
              maxLength="2"
              required
              value={cardDetails.expMonth}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="ccv">CCV</label>
            <input
              type="password"
              className="form-control"
              id="ccv"
              name="ccv"
              maxLength="3"
              required
              value={cardDetails.ccv}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Proceed To Payment
        </button>
        <button
  type="button"
  className="btn btn-success w-100 mt-2"
  onClick={() => window.location.href = '/insurance-claim'}
>
  Continue with Insurance
</button>
      </form>
    </div>
  );
}

export default CardPayment;
