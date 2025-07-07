import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", gmail: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", form);
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-indigo-500">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full pl-10 bg-indigo-50 text-indigo-900 focus:text-indigo-900"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-indigo-500">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10 bg-indigo-50 text-indigo-900 focus:text-indigo-900"
              required
              value={form.gmail}
              onChange={(e) => setForm({ ...form, gmail: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-indigo-500">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full pl-10 bg-indigo-50 text-indigo-900 focus:text-indigo-900"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-indigo w-full text-white">
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
