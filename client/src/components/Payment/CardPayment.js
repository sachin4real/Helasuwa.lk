import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Select Payment Option</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-gray-600 font-medium mb-1">Number on Card</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            maxLength="16"
            required
            value={cardDetails.cardNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-gray-600 font-medium mb-1">Name on Card</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            required
            value={cardDetails.cardName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="expYear" className="block text-gray-600 font-medium mb-1">Exp Year</label>
            <input
              type="text"
              id="expYear"
              name="expYear"
              maxLength="4"
              required
              value={cardDetails.expYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="expMonth" className="block text-gray-600 font-medium mb-1">Exp Month</label>
            <input
              type="text"
              id="expMonth"
              name="expMonth"
              maxLength="2"
              required
              value={cardDetails.expMonth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="ccv" className="block text-gray-600 font-medium mb-1">CCV</label>
            <input
              type="password"
              id="ccv"
              name="ccv"
              maxLength="3"
              required
              value={cardDetails.ccv}
              onChange={handleChange}
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
      </form>
    </div>
  );
}

export default CardPayment;
