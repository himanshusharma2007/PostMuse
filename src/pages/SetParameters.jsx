import React, { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { FaPaperPlane, FaSmile, FaHashtag, FaQuoteLeft } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import Header from "../components/Header";

const SetParametersPage = () => {
  const [formData, setFormData] = useState({
    tone: null,
    emotion: null,
    postType: null,
    length: null,
    emojiUsage: null,
    hashtagPreference: null,
    message: "",
    targetAudience: "",
    keywords: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your API or next step
  };

  const toneOptions = [
    { value: "casual", label: "Casual" },
    { value: "professional", label: "Professional" },
    { value: "humorous", label: "Humorous" },
    { value: "inspirational", label: "Inspirational" },
  ];

  const emotionOptions = [
    { value: "happy", label: "Happy" },
    { value: "excited", label: "Excited" },
    { value: "thoughtful", label: "Thoughtful" },
    { value: "grateful", label: "Grateful" },
  ];

  const postTypeOptions = [
    { value: "personal", label: "Personal Update" },
    { value: "quote", label: "Quote" },
    { value: "announcement", label: "Announcement" },
    { value: "question", label: "Question" },
  ];

  const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
  ];

  const emojiOptions = [
    { value: "none", label: "None" },
    { value: "minimal", label: "Minimal" },
    { value: "moderate", label: "Moderate" },
    { value: "heavy", label: "Heavy" },
  ];

  const hashtagOptions = [
    { value: "none", label: "None" },
    { value: "few", label: "Few (1-3)" },
    { value: "moderate", label: "Moderate (4-6)" },
    { value: "many", label: "Many (7+)" },
  ];

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      borderColor: "#374151",
      "&:hover": {
        borderColor: "#6B7280",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 30, 
      color:"white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4B5563" : "#1F2937",
      "&:hover": {
        backgroundColor: "#374151",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#E5E7EB",
    }),
  };

  return (
    <div className="min-h-screen  pb-6 bg-gray-900 text-white ">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto pt-[12vh]  px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8">
          <MdTune className="inline-block mr-2 mb-1" />
          Set Your Post Parameters
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 sm:col-span-2"
            >
              <label className="block text-sm font-medium mb-1">
                Basic Message or Topic
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
                placeholder="Enter your main idea or topic here..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <Select
                options={toneOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("tone", selectedOption)
                }
                placeholder="Select tone..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Emotion</label>
              <Select
                options={emotionOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("emotion", selectedOption)
                }
                placeholder="Select emotion..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Post Type
              </label>
              <Select
                options={postTypeOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("postType", selectedOption)
                }
                placeholder="Select post type..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Length</label>
              <Select
                options={lengthOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("length", selectedOption)
                }
                placeholder="Select length..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Emoji Usage
              </label>
              <Select
                options={emojiOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("emojiUsage", selectedOption)
                }
                placeholder="Select emoji usage..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Hashtag Preference
              </label>
              <Select
                options={hashtagOptions}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("hashtagPreference", selectedOption)
                }
                placeholder="Select hashtag preference..."
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) =>
                  handleInputChange("targetAudience", e.target.value)
                }
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Young professionals, Tech enthusiasts"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter comma-separated keywords"
              />
            </motion.div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center mt-8"
          >
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <FaPaperPlane className="inline-block mr-2 mb-1" />
              Generate Post
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SetParametersPage;
