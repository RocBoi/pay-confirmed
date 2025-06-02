import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Pay Confirmed Login</h2>
        <input
          type="email"
          placeholder="Business Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-md"
        />
        <button type="submit" className="custom-btn w-full">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
