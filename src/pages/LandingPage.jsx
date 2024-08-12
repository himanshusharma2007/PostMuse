import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Meteors from "../components/Meteors";
import {
  FaRobot,
  FaPalette,
  FaEdit,
  FaChartLine,
  FaHistory,
  FaSyncAlt,
} from "react-icons/fa";
import { BiRightArrow } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { CgArrowRight } from "react-icons/cg";
import Header from "../components/Header";
import FAQSection from "../components/FAQSection";
// import Meteors from "@/components/magicui/meteors";
const LandingPage = () => {
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered Content Generation",
      desc: "Utilize Google's Gemini AI to create engaging, personalized social media posts based on your inputs.",
    },
    {
      icon: FaPalette,
      title: "Customizable Post Parameters",
      desc: "Fine-tune your post's tone, emotion, length, and style to match your intended message and audience.",
    },
    {
      icon: FaEdit,
      title: "Interactive Post Editing",
      desc: "Edit and refine AI-generated content using AI or with an in-built text editor, complete with formatting tools.",
    },
    {
      icon: FaChartLine,
      title: "Enhance Post Impressions",
      desc: "Boost your post's visibility by delivering high-quality content that resonates with your audience.",
    },
    {
      icon: FaHistory,
      title: "Post History",
      desc: "Access and manage your previously generated posts for easy reference and reuse.",
    },
    {
      icon: FaSyncAlt,
      title: "Post Regeneration",
      desc: "Not satisfied? Quickly regenerate your post with the click of a button for new ideas and variations.",
    },
  ];

  const workflowSteps = [
    {
      title: "Define Your Intent",
      desc: "Choose your post type and target audience.",
    },
    {
      title: "AI Generation",
      desc: "Watch as AI crafts your initial post content.",
    },
    {
      title: "Personalize",
      desc: "Refine and add your personal touch to the generated content.",
    },
    {
      title: "Review and Post",
      desc: "Do a final check and share your masterpiece with the world.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans overflow-x-hidden">
      <Header />

      <div className="page1 min-h-screen flex flex-col justify-end md:justify-between ">
        <div className="wraper hidden lg:block">

        <Meteors number={60} />
        </div>

        {/* Hero Section */}
        <section className="flex-grow flex flex-col justify-end items-center container mx-auto px-4 py-20 text-center  mb-10 ">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Craft Compelling Social Media Posts with{" "}
            <span className="text-purple-600">PostMose</span> AI
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Express yourself effortlessly and engage your audience like never
            before
          </motion.p>
          <Link to="/create">
            <motion.button
              className="flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl space-x-3 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>{" "}
              <span>
                <CgArrowRight />
              </span>
            </motion.button>
          </Link>
        </section>
      </div>

      {/* Features Section */}
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unleash Your Social Media Potential
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="text-purple-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-10 bg-gradient-to-b from-gray-900 to-gray-800 px-2">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Journey to Social Media Excellence
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2  place-items-center">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-8 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl mr-6">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-300 max-w-[300px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FAQSection />
      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PostMose AI. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-purple-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-400 transition">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
