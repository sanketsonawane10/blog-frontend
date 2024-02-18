// App.js

import React from 'react';
import Home from './pages/Home';
import Blog from './pages/Blog';
import AddBlog from './pages/AddBlog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/blog/:id" element={<Blog/>} />
        <Route exact path="/create-blog" element={<AddBlog/>} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
