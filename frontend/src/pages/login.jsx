import React from 'react'

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-brand">Pay Confirmed Login</h2>
        <form>
          <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
          <button className="w-full bg-brand text-white p-2 rounded hover:bg-accent transition">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
