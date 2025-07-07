import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-accent">
         UserSphere
        </Link>

        {/* Hamburger menu button (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="btn btn-square btn-ghost text-white"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu items */}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-6 absolute md:static bg-gray-900 w-full left-0 md:w-auto md:left-auto top-16 md:top-auto transition-transform transform md:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:flex`}
        >
          <li>
            <Link
              to="/home"
              className="block px-4 py-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-user"
              className="block px-4 py-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Add User
            </Link>
          </li>
          <li>
            <Link
              to="/user-details"
              className="block px-4 py-2 hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              User Details
            </Link>
          </li>

          {/* Auth buttons (mobile menu only) */}
          <li className="md:hidden">
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-error btn-sm w-full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn btn-accent btn-sm w-full mb-2"
                >
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-accent btn-sm w-full">
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>

        {/* Auth buttons (desktop only) */}
        <div className="hidden md:flex gap-3">
          {user ? (
            <button onClick={handleLogout} className="btn btn-error btn-sm">
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" className="btn btn-accent btn-sm">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-accent btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
