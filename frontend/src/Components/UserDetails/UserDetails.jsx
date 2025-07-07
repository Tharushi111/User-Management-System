import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserEdit, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Protect route: redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signin');
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("User Details Report", 14, 20);

    const tableColumn = ["#", "Name", "Gmail", "Age", "Address"];
    const tableRows = [];

    filteredUsers.forEach((user, index) => {
      const rowData = [
        index + 1,
        user.name,
        user.gmail,
        user.age,
        user.address
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    // Create temporary anchor to trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'user-details.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //open in a new tab for viewing
    window.open(blobUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto mt-28 mb-20 px-4">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center flex items-center justify-center gap-2">
        <FaUsers className="text-blue-800" /> User Details
      </h2>

      {/*Search + Download */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2">
        <button
          onClick={handleDownloadPDF}
          className="btn btn-sm btn-outline btn-success"
        >
          Download PDF
        </button>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs border-blue-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full table-bordered border border-blue-200 rounded-lg">
          <thead className="bg-blue-100 text-blue-900 text-md">
            <tr>
              <th className="border border-blue-200">#</th>
              <th className="border border-blue-200">Name</th>
              <th className="border border-blue-200">Gmail</th>
              <th className="border border-blue-200">Age</th>
              <th className="border border-blue-200">Address</th>
              <th className="border border-blue-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 bg-blue-50">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-100 transition-colors duration-200"
                >
                  <td className="border border-blue-100">{index + 1}</td>
                  <td className="border border-blue-100">{user.name}</td>
                  <td className="border border-blue-100">{user.gmail}</td>
                  <td className="border border-blue-100">{user.age}</td>
                  <td className="border border-blue-100">{user.address}</td>
                  <td className="border border-blue-100">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                        className="btn btn-sm btn-outline btn-primary flex items-center gap-1 hover:bg-blue-700 hover:text-white transition"
                      >
                        <FaUserEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-sm btn-outline btn-error flex items-center gap-1 hover:bg-red-600 hover:text-white transition"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
