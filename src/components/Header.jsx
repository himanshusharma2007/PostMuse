import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="fixed h-[12vh] w-full  mx-auto px-8 bg-gray-900 py-6 flex justify-between items-center   z-40 ">
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        PostMuse
      </motion.h1>
      <nav>
        <motion.ul
          className="flex space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li>
            <Link to="/" className="hover:text-purple-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className="hover:text-purple-400 transition">
              Create Post
            </Link>
          </li>
          <li>
            <Link to="/my-posts" className="hover:text-purple-400 transition">
              My Posts
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-purple-400 transition">
              About us
            </Link>
          </li>
        </motion.ul>
      </nav>
    </header>
  );
}

export default Header
