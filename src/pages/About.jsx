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
          className="text-4xl md:text-5xl font-bold text-center mb-8"
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
          className="flex justify-center items-center flex-col mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            We Value Your Feedback
          </h2>
          <p className="text-lg text-center max-w-4xl mb-4">
            At PostMuse, we're constantly striving to improve our service and
            provide the best possible experience for our users. Your feedback is
            invaluable to us in this journey.
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-14 inline-block w-96">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={feedback.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">
                Your Feedback
              </label>
              <textarea
                id="message"
                name="message"
                value={feedback.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 resize-none focus:ring-purple-500 h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
          {submitMessage && (
            <p className="mt-4 text-center text-green-500">{submitMessage}</p>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;
