import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaUserPlus } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  // 🔐 Redirect if user not logged in
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  return (
    <div className="bg-white pt-28 pb-16 px-6 md:px-12 lg:px-24 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3">
          Welcome to UserSphere
        </h1>
        {user && (
          <p className="text-xl text-gray-700 mb-6">
            👋 Hi, <span className="font-semibold text-indigo-700">{user.name}</span>
          </p>
        )}
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          A streamlined platform to manage your users with ease. Add new users, browse details, and secure authentication — all in one place.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/add-user"
            className="btn btn-outline text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white transition flex items-center gap-2 text-lg"
          >
            <FaUserPlus />
            Add User
          </Link>
          <Link
            to="/user-details"
            className="btn btn-outline text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white transition flex items-center gap-2 text-lg"
          >
            <FaUser />
            User Details
          </Link>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Secure Sign-In</h3>
          <p className="text-gray-600">
            Protect access to your system with seamless and secure login functionality.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Add Users Easily</h3>
          <p className="text-gray-600">
            Input new user data quickly with a clean and responsive form interface.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">View Details</h3>
          <p className="text-gray-600">Access and manage user data with ease.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
