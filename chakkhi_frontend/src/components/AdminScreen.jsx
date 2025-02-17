import React from "react";

const AdminScreen = () => {
  return (
    <div className="text-center animate-bounce-in">
      <h2 className="text-4xl font-bold text-warning">Welcome, Admin!</h2>
      <p className="text-lg text-gray-600 mt-4">
        Oversee all shops, manage users, and more.
      </p>
      <div className="flex justify-center mt-6 space-x-4">
        <button className="btn btn-warning">View All Orders</button>
        <button className="btn btn-error">Manage Users</button>
      </div>
    </div>
  );
};

export default AdminScreen;
