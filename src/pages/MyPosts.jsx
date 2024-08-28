import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../Services/postService";
import Header from "../components/Header";
import { BiCross, BiEdit } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase/firebase";
import { FiTrash2 } from "react-icons/fi";

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
      console.log(userPosts); // Log the posts to see the structure

      setPosts(
        userPosts.sort((a, b) => {
          console.log(a.createdAt, b.createdAt); // Log createdAt to see the type
          return b.createdAt - a.createdAt;
        })
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
  const handleDelete = async (post) => {
    const postRef = doc(db, "posts", post.id); // Adjust path based on your Firestore structure
    await deleteDoc(postRef);

    // Remove the post from the local state
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
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
        <button
          onClick={() => handleViewPost(post)}
          className="text-xl font-bold mb-2 text-purple-400 outline-none text-start"
        >
          {truncateText(post.parameters.message || post.content, 10)}
        </button>
        <p className="text-gray-300 mb-4">{truncateText(post.content, 30)}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {formatDate(post.createdAt)}
          </span>
          <div className="flex space-x-1 items-center">
            <button
              onClick={() => handleEditPost(post)}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white  py-2 px-4 rounded"
            >
              <span className="">
                <BiEdit fontSize={25} />
              </span>
              <span className="hidden md:block"> Edit</span>
            </button>
            <button
              onClick={() => handleDelete(post)}
              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white  py-2 px-4 rounded mr-2"
            >
              <span>
                <FiTrash2 fontSize={25} />
              </span>
              <span className="hidden md:block"> Delete</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-[12vh] pb-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
          My Posts
        </h1>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            <h2 className="text-2xl font-semibold mb-4">No Posts Yet</h2>
            <p className="text-lg">
              You haven't created any posts yet. Start sharing your thoughts and
              ideas now!
            </p>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal  fixed top-0 inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-75"
      >
        {selectedPost && (
          <>
            {" "}
            <div className="relative bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className=" absolute top-1 right-1 hover:text-white text-gray-300 font-bold py-2 px-4 rounded"
              >
                <RiCloseLargeFill fontSize={25} />
              </button>

              <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">
                {selectedPost.parameters.message}
              </h2>
              <p className="text-gray-300 mb-4 whitespace-pre-wrap max-h-[50vh] overflow-auto  custom-scrollbar">
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
