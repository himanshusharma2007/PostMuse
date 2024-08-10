import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { generatePrompt, generatePost } from "../Services/geminiService";
import LoadingAnimation from "../components/LoadingAnimation";
import Header from "../components/Header";
import { FaPaperPlane } from "react-icons/fa";

const GeneratedPost = () => {
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState("Generating prompt...");
  const [generatedPost, setGeneratedPost] = useState("");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateContent();
  }, []);

  const generateContent = async () => {
    try {
      setLoadingStage("Generating prompt...");
      const prompt = await generatePrompt(/* pass necessary parameters */);

      setLoadingStage("Creating post...");
      const post = await generatePost(prompt);

      setGeneratedPost(post);
      setLoading(false);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoading(false);
    }
  };

  const handleUserInput = async () => {
    setLoading(true);
    setLoadingStage("Refining post...");
    try {
      const refinedPost = await generatePost(userInput, generatedPost);
      setGeneratedPost(refinedPost);
      setUserInput("");
    } catch (error) {
      console.error("Error refining post:", error);
    }
    setLoading(false);
  };

  const openInEditor = () => {
    // Navigate to the editor page, passing the generated post as a parameter
    navigate("/editor", { state: { post: generatedPost } });
  };

  return (
    <div className=" min-h-screen bg-gray-900 text-white ">
      <Header />
      <div className="relative container mx-auto px-8 pt-[12vh] pb-8">
        {loading ? (
          <LoadingAnimation stage={loadingStage} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Generated Post</h2>
              <button
                onClick={openInEditor}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Open in Editor
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 md:min-h-[60vh]">
              <p className="whitespace-pre-wrap">{generatedPost}</p>
            </div>
            <div className="mt-8 absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="wraper relative  ">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your modifications or suggestions..."
                  className="h-16 w-[90vw]  md:w-[70vw] p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                  rows="4"
                />
                <button
                  onClick={handleUserInput}
                  className="mt-4 absolute top-0 right-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GeneratedPost;
