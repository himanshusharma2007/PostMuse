import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestion } from "react-icons/fa";

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <FaQuestion className="text-purple-400 mr-3" />
          <span className="text-md md:text-xl font-semibold text-white">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-purple-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 bg-gray-700">
              <p className="text-gray-300">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is PostMuse?",
      answer:
        "PostMuse is an AI-powered tool that helps you generate engaging social media posts. It uses advanced AI technology to create content based on your preferences and target audience.",
    },
    {
      question: "How does PostMuse work?",
      answer:
        "You simply input your desired post parameters such as tone, emotion, length, and target audience. Our AI then generates a tailored post for you, which you can further edit or refine as needed.",
    },
    {
      question: "Is PostMuse free to use?",
      answer:
        "Yes, PostMuse is completely free to use. You can generate an unlimited number of posts without any cost.",
    },
    {
      question: "Can I edit the posts generated by PostMuse?",
      answer:
        "Absolutely! While our AI generates high-quality content, you have full control to edit, refine, or completely rewrite the generated posts to match your exact needs.",
    },
    {
      question: "What social media platforms does PostMuse support?",
      answer:
        "PostMuse generates content suitable for all major social media platforms including Facebook, Twitter, Instagram, and LinkedIn. ",
    },
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
