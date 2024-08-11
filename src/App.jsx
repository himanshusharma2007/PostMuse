import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SetParametersPage from "./pages/SetParameters";
import GeneratedPost from "./pages/GeneratedPost";
// import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
// import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<SetParametersPage />} />
        <Route path="/generated-post" element={<GeneratedPost />} />
         <Route path="/my-posts" element={<MyPosts />} />
        {/* <Route path="/about" element={<About />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
