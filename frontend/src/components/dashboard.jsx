import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome to Pay Confirmed</h1>
        <p className="text-gray-600">Your Payroll Dashboard</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Payrolls</h2>
          <p className="text-3xl font-bold text-blue-500">$129,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Employees</h2>
          <p className="text-3xl font-bold text-green-500">25</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Next Payroll Date</h2>
          <p className="text-lg font-medium text-gray-800">June 15, 2025</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
