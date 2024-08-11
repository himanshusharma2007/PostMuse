import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  generatePrompt,
  generatePost,
  refinePost,
} from "../Services/geminiService";
import LoadingAnimation from "../components/LoadingAnimation";
import Header from "../components/Header";
import { FaPaperPlane } from "react-icons/fa";
import { FaCopy, FaSync } from "react-icons/fa";

const GeneratedPost = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedPost = localStorage.getItem("generatedPost");
    if (storedPost) {
      setGeneratedPost(storedPost);
    } else {
      generateContent(false);
    }
  }, []);

  const generateContent = async (regen) => {
    setLoading(true);
    setLoadingStage(regen ? "Regenerating post..." : "Generating prompt...");
    try {
      const storedParameters = JSON.parse(
        localStorage.getItem("postParameters")
      );

      if (!storedParameters) {
        throw new Error("No parameters found in localStorage");
      }

      const prompt = await generatePrompt(storedParameters);

      setLoadingStage("Creating post...");
      const post = await generatePost(prompt);

      setGeneratedPost(post);
      localStorage.setItem("generatedPost", post);
    } catch (error) {
      console.error("Error generating content:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setLoadingStage("Refining post...");
    try {
      const refinedPost = await refinePost(userInput, generatedPost);
      setGeneratedPost(refinedPost);
      localStorage.setItem("generatedPost", refinedPost);
      setUserInput("");
    } catch (error) {
      console.error("Error refining post:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const openInEditor = () => {
    // Navigate to the editor page, passing the generated post as a parameter
    navigate("/editor", { state: { post: generatedPost } });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost).then(() => {
      // You can add a toast notification here to inform the user that the text has been copied
      console.log("Text copied to clipboard");
    });
  };

  const handleReload = () => {
    generateContent(true);
  };
  return (
    <div className=" min-h-screen flex justify-center items-center bg-gray-900 text-white ">
      <Header />
      {loading ? (
        <LoadingAnimation stage={loadingStage} />
      ) : (
        <div className="relative container mx-auto px-8 pt-[12vh] pb-8">
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
            <div className="bg-gray-800 px-6 pb-6 rounded-lg shadow-lg mb-8 max-h-[60vh] overflow-auto relative">
              <div className="sticky   top-1 right-2 flex justify-end space-x-2">
                <button
                  onClick={handleCopy}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm py-1 px-2 rounded flex items-center"
                >
                  <FaCopy className="mr-2" /> Copy
                </button>
                <button
                  onClick={handleReload}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded flex items-center"
                >
                  <FaSync className="mr-2" /> Regenerate
                </button>
              </div>
              <p className="whitespace-pre-wrap pt-3">{generatedPost}</p>
            </div>
            <div className="mt-8 fixed bottom-10 left-1/2 -translate-x-1/2">
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
        </div>
      )}
    </div>
  );
};

export default GeneratedPost;
