import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import AddUser from './Components/AddUser/AddUser';
import EditUser from './Components/EditUser/EditUser';
import UserDetails from './Components/UserDetails/UserDetails';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Footer from './Components/Footer/Footer';  // Import your Footer component
import { ThemeContext } from './main.jsx';  // Adjust path as needed

const App = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Nav bar always visible */}
      <Nav />

      {/* Main content area with some padding and flex-grow */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

      <Footer/>
    </div>
  );
};

export default App;
