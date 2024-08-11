// src/components/MyPosts.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../Services/postService";
import Header from "../components/Header";
import { BiCross } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";

Modal.setAppElement("#root");

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const userPosts = await getUserPosts();
      setPosts(
        userPosts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate())
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleEditPost = (post) => {
    navigate("/generated-post", {
      state: { postId: post.id, post: post.content },
    });
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const PostCard = ({ post }) => {
    const formatDate = (dateValue) => {
      if (dateValue instanceof Date) {
        return format(dateValue, "MMM d, yyyy HH:mm");
      } else if (typeof dateValue === "object" && dateValue.toDate) {
        return format(dateValue.toDate(), "MMM d, yyyy HH:mm");
      } else if (
        typeof dateValue === "string" ||
        typeof dateValue === "number"
      ) {
        return format(new Date(dateValue), "MMM d, yyyy HH:mm");
      }
      return "Invalid Date";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
      >
        <h3 className="text-xl font-bold mb-2 text-purple-400">
          {truncateText(post.parameters.message, 10)}
        </h3>
        <p className="text-gray-300 mb-4">{truncateText(post.content, 30)}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {formatDate(post.createdAt)}
          </span>
          <div>
            <button
              onClick={() => handleViewPost(post)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              View
            </button>
            <button
              onClick={() => handleEditPost(post)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-4xl font-bold mb-8 text-center">My Posts</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal  fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-75"
      >
        {selectedPost && (
          <>
            {" "}
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="wraper w-full  flex justify-end items-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="  hover:text-white text-gray-300 font-bold py-2 px-4 rounded"
                >
                  <RiCloseLargeFill fontSize={25} />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                {selectedPost.parameters.message}
              </h2>
              <p className="text-gray-300 mb-4 whitespace-pre-wrap max-h-[50vh] overflow-auto">
                {selectedPost.content}
              </p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MyPosts;
