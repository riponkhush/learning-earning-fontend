import React from 'react';

export const Withdrawal = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Withdrawals</h2>
        
        {/* Input field */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdrawal;
