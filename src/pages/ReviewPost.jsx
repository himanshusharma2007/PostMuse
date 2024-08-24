import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaSpinner,
  FaRedoAlt,
  FaSave,
  FaEdit,
  FaUsers,
} from "react-icons/fa";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import Header from "../components/Header";

const ReviewPost = () => {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState({
    Instagram: false,
    Facebook: false,
    Twitter: false,
    LinkedIn: false,
  });
  const [targetAudience, setTargetAudience] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);

  const handleReview = () => {
    setIsReviewing(true);
    // Simulate API call
    setTimeout(() => {
      setReviewResult({
        score: 50,
        strengths: [
          "Engaging opening",
          "Good use of hashtags",
          "Clear call-to-action",
        ],
        improvements: ["Could be more concise", "Add more emotional appeal"],
        suggestions: "Consider adding a question to encourage engagement.",
      });
      setIsReviewing(false);
    }, 2000);
  };

  const platformIcons = {
    Instagram: RiInstagramLine,
    Facebook: RiFacebookCircleLine,
    Twitter: RiTwitterLine,
    LinkedIn: RiLinkedinBoxLine,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-[12vh] pb-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Review Your Post</h1>
          <p className="text-xl text-gray-300">
            Get AI-powered insights to enhance your social media content
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 md:h-[88vh]">
          <motion.div
            className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col space-y-4 md:w-[55%]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Post
              </label>
              <textarea
                className="w-full h-52 p-4 bg-gray-700 text-white rounded-lg resize-none"
                placeholder="Paste your post here..."
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-4">
                {Object.entries(platforms).map(([name, isChecked]) => {
                  const Icon = platformIcons[name];
                  return (
                    <motion.label
                      key={name}
                      className={`flex items-center px-4 py-2 rounded-full cursor-pointer ${
                        isChecked ? "bg-purple-600" : "bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={() =>
                          setPlatforms((prev) => ({
                            ...prev,
                            [name]: !prev[name],
                          }))
                        }
                      />
                      <Icon className="mr-2" />
                      {name}
                    </motion.label>
                  );
                })}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Target Audience
              </label>
              <div className="relative">
                <FaUsers className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg"
                  placeholder="e.g., Young professionals, Tech enthusiasts"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-grow justify-center items-end mt-">
              <motion.button
                className="  bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6  max-h-12 rounded-lg flex items-center justify-center"
                onClick={handleReview}
                disabled={
                  !post ||
                  Object.values(platforms).every((v) => !v) ||
                  !targetAudience ||
                  isReviewing
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isReviewing ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaPaperPlane className="mr-2" />
                )}
                {isReviewing ? "Reviewing..." : "Review Post"}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-6 h-auto overflow-auto shadow-lg flex-1 md:w-[45%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isReviewing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaSpinner className="animate-spin text-4xl text-purple-600 mb-4" />
                <p className="text-xl">Analyzing your post...</p>
              </div>
            ) : reviewResult ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Review Results</h2>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl font-bold">
                    {reviewResult.score}/100
                  </div>
                  <div className="relative w-32 h-32 ">
                    <svg className="w-full h-full rotate-[90deg]" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-700 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-purple-600  progress-ring__circle stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={
                          251.2 * (1 - reviewResult.score / 100)
                        }
                      ></circle>
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                      {reviewResult.score}%
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Strengths:</h3>
                  <ul className="list-disc list-inside">
                    {reviewResult.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {strength}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Areas for Improvement:
                  </h3>
                  <ul className="list-disc list-inside">
                    {reviewResult.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {improvement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Suggestions:</h3>
                  <p>{reviewResult.suggestions}</p>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEdit className="mr-2" />
                    Edit Post
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRedoAlt className="mr-2" />
                    Regenerate
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave className="mr-2" />
                    Save
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaPaperPlane className="text-6xl mb-4" />
                <p className="text-xl text-center">
                  Your review results will appear here after you submit your
                  post for analysis.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
