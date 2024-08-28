import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaPen, FaUsers } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase/firebase"; // Make sure this path is correct
import Header from "../components/Header"; // Adjust the import path as needed

const AboutUs = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        ...feedback,
        timestamp: new Date(),
      });
      setSubmitMessage("Thank you for your feedback!");
      setFeedback({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setSubmitMessage("An error occurred. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900  text-white">
      <Header />
      <div className="container mx-auto px-4 pt-[12vh] pb-10">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About PostMuse
        </motion.h1>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            PostMuse is an innovative AI-powered platform designed to
            revolutionize the way you create social media content. Our mission
            is to empower individuals and businesses to express themselves
            effectively and engage their audience with compelling posts.
          </p>
          <p className="text-lg">
            We understand the challenges of consistently producing high-quality
            content in today's fast-paced digital world. That's why we've
            harnessed the power of advanced AI technology to make content
            creation accessible, efficient, and enjoyable for everyone.
          </p>
        </motion.section>

        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            How PostMuse Helps You
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <FaRobot className="text-purple-500 text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  AI-Powered Creativity
                </h3>
                <p>
                  Our advanced AI algorithms generate unique and engaging posts
                  tailored to your specific needs and audience.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaPen className="text-purple-500 text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Customization</h3>
                <p>
                  Easily refine and personalize your generated content to match
                  your brand voice and style.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaUsers className="text-purple-500 text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Audience Engagement
                </h3>
                <p>
                  Create posts that resonate with your target audience and boost
                  your social media engagement.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaPaperPlane className="text-purple-500 text-3xl mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                <p>
                  Streamline your content creation process and save valuable
                  time for other aspects of your work or life.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="flex justify-center items-center flex-col px-4 py-12 bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-4xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-300 mb-6">
              We Value Your Feedback
            </h2>
            <p className="text-lg text-center text-gray-300 mb-8">
              At PostMuse, we're constantly striving to improve our service and
              provide the best possible experience for our users. Your feedback
              is invaluable to us in this journey.
            </p>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-xl p-4 md:p-8"
            >
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-purple-300 text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={feedback.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-purple-300 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-purple-300 text-sm font-semibold mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={feedback.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 resize-none h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>
            {submitMessage && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-center text-green-400 font-semibold"
              >
                {submitMessage}
              </motion.p>
            )}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;
