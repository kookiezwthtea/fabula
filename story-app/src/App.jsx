
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import TwineStory from './components/TwineStory';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Categories from './components/Categories';
import CategoryStories from './components/categoryStories';
import AdminPanel from './components/AdminPanel';
import AddStory from './components/AddStory';
import ManageStories from './components/ManageStories';
import EditStory from './components/EditStory';
import ManageUsers from './components/ManageUsers';

function App() {
  return (
    <>
    
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryStories />} />
          <Route path="/story/:id" element={<TwineStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />}  />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element ={<AdminPanel />} />
          <Route path="/admin/add-story" element ={<AddStory />} />
          <Route path="/admin/stories" element ={<ManageStories />} />
          <Route path="/admin/edit/:id" element={<EditStory />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    </>
  );
}

export default App;
