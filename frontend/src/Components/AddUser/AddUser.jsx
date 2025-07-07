import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    age: '',
    address: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.gmail || !formData.age || !formData.address) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('User added successfully!');
        setFormData({ name: '', gmail: '', age: '', address: '' });
      } else {
        toast.error('Failed to add user.');
      }
    } catch (err) {
      toast.error('Server error!');
    }
  };

  const handleNameKeyPress = (e) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleAgeKeyPress = (e) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-28 mb-16 px-4">
      <div className="border border-blue-300 rounded-lg shadow-lg p-8 bg-white">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Add New User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="input w-full bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleNameKeyPress}
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1">Gmail</label>
            <input
              type="email"
              name="gmail"
              placeholder="Enter gmail address"
              className="input w-full bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={formData.gmail}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              className="input w-full bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={formData.age}
              onChange={handleChange}
              onKeyPress={handleAgeKeyPress}
            />
          </div>

          <div>
            <label className="block text-blue-700 font-semibold mb-1">Address</label>
            <textarea
              name="address"
              placeholder="Enter residential address"
              className="textarea w-full bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="btn bg-gray-100 text-blue-800 hover:bg-gray-200"
              onClick={() => navigate('/')}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn bg-blue-700 text-white hover:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
