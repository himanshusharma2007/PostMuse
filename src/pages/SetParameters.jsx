import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { FaPaperPlane, FaSmile, FaHashtag, FaQuoteLeft } from "react-icons/fa";
import { MdTune } from "react-icons/md";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
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

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
     localStorage.setItem("generatedPost", "");
  },[]);
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for this field when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === null || formData[key] === "") {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      // Store the form data in localStorage
      localStorage.setItem("postParameters", JSON.stringify(formData));

      // Navigate to the generated post page
      navigate("/generated-post");
    } catch (err) {
      // This catch block will only run if there's an error with localStorage
      console.error("Error storing data:", err);
      setError("Failed to store post parameters. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      color: "white",
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
                className={`w-full px-3 py-2 resize-none text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  formErrors.message ? "border-red-500" : ""
                }`}
                rows="3"
                placeholder="Enter your main idea or topic here..."
              />
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.message}
                </p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <Select
                options={toneOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("tone", selectedOption)
                }
                placeholder="Select tone..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Emotion</label>
              <Select
                options={emotionOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("emotion", selectedOption)
                }
                placeholder="Select emotion..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Post Type
              </label>
              <Select
                options={postTypeOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("postType", selectedOption)
                }
                placeholder="Select post type..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Length</label>
              <Select
                options={lengthOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("length", selectedOption)
                }
                placeholder="Select length..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Emoji Usage
              </label>
              <Select
                options={emojiOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("emojiUsage", selectedOption)
                }
                placeholder="Select emoji usage..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Hashtag Preference
              </label>
              <Select
                options={hashtagOptions}
                styles={{
                  ...customSelectStyles,
                  control: (provided) => ({
                    ...customSelectStyles.control(provided),
                    borderColor: formErrors.tone
                      ? "rgb(239, 68, 68)"
                      : provided.borderColor,
                  }),
                }}
                menuPortalTarget={document.body}
                onChange={(selectedOption) =>
                  handleInputChange("hashtagPreference", selectedOption)
                }
                placeholder="Select hashtag preference..."
              />
              {formErrors.tone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.tone}</p>
              )}
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
                className={`w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  formErrors.targetAudience ? "border-red-500" : ""
                }`}
                placeholder="e.g., Young professionals, Tech enthusiasts"
              />
              {formErrors.targetAudience && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.targetAudience}
                </p>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Keywords</label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                className={`w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  formErrors.targetAudience ? "border-red-500" : ""
                }`}
                placeholder="Enter comma-separated keywords"
              />
              {formErrors.targetAudience && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.targetAudience}
                </p>
              )}
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
              disabled={isLoading}
            >
              {isLoading ? (
                "Generating..."
              ) : (
                <>
                  <FaPaperPlane className="inline-block mr-2 mb-1" />
                  Generate Post
                </>
              )}
            </button>
          </motion.div>
        </form>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </motion.div>
    </div>
  );
};

export default SetParametersPage;
