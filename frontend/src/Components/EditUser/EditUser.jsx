import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    gmail: '',
    age: '',
    address: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        toast.error('Failed to load user');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('User updated!');
        navigate('/user-details');
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 mb-16 px-6">
      <div className="border border-blue-300 rounded-lg shadow-lg p-8 bg-white">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['name', 'gmail', 'age', 'address'].map((field) => (
            <div key={field}>
              <label className="block text-blue-700 font-semibold mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'age' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`input w-full bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 ${
                  field === 'address' ? 'textarea' : ''
                }`}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="btn bg-gray-100 text-blue-800 hover:bg-gray-200"
              onClick={() => navigate('/user-details')}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn bg-blue-700 text-white hover:bg-blue-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
