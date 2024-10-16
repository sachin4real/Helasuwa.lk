import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")

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
<<<<<<< HEAD
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Select Payment Option</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-gray-600 font-medium mb-1">Number on Card</label>
          <input
            type="text"
=======
    <div className="container">
      <h3 className="mt-4">Select Payment Option</h3>
      <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-light">
        <div className="form-group mb-3">
          <label htmlFor="cardNumber">Number on Card</label>
          <input
            type="text"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            id="cardNumber"
            name="cardNumber"
            maxLength="16"
            required
            value={cardDetails.cardNumber}
            onChange={handleChange}
<<<<<<< HEAD
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-gray-600 font-medium mb-1">Name on Card</label>
          <input
            type="text"
=======
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cardName">Name on Card</label>
          <input
            type="text"
            className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
            id="cardName"
            name="cardName"
            required
            value={cardDetails.cardName}
            onChange={handleChange}
<<<<<<< HEAD
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="expYear" className="block text-gray-600 font-medium mb-1">Exp Year</label>
            <input
              type="text"
=======
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expYear">Exp Year</label>
            <input
              type="text"
              className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
              id="expYear"
              name="expYear"
              maxLength="4"
              required
              value={cardDetails.expYear}
              onChange={handleChange}
<<<<<<< HEAD
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="expMonth" className="block text-gray-600 font-medium mb-1">Exp Month</label>
            <input
              type="text"
=======
            />
          </div>
          <div className="col">
            <label htmlFor="expMonth">Exp Month</label>
            <input
              type="text"
              className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
              id="expMonth"
              name="expMonth"
              maxLength="2"
              required
              value={cardDetails.expMonth}
              onChange={handleChange}
<<<<<<< HEAD
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="ccv" className="block text-gray-600 font-medium mb-1">CCV</label>
            <input
              type="password"
=======
            />
          </div>
          <div className="col">
            <label htmlFor="ccv">CCV</label>
            <input
              type="password"
              className="form-control"
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
              id="ccv"
              name="ccv"
              maxLength="3"
              required
              value={cardDetails.ccv}
              onChange={handleChange}
<<<<<<< HEAD
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Proceed To Payment
        </button>
        <button
          type="button"
          className="w-full py-2 mt-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200"
          onClick={() => window.location.href = '/insurance-claim'}
        >
          Continue with Insurance
        </button>
=======
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
>>>>>>> parent of 4d31801 (Revert "Merge pull request #7 from sachin4real/Dulan")
      </form>
    </div>
  );
}

export default CardPayment;
