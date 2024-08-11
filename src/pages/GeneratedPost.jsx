import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  generatePrompt,
  generatePost,
  refinePost,
} from "../Services/geminiService";
import LoadingAnimation from "../components/LoadingAnimation";
import Header from "../components/Header";
import { FaPaperPlane } from "react-icons/fa";
import { FaCopy, FaSync } from "react-icons/fa";
import { savePost, updatePost } from "../Services/postService";

const GeneratedPost = () => {
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
    const location = useLocation();
  const contentGeneratedRef = useRef(false);

  useEffect(() => {
    if (location.state?.postId && location.state?.post) {
      setPostId(location.state.postId);
      setGeneratedPost(location.state.post);
    } else {
      const storedPost = localStorage.getItem("generatedPost");
      if (storedPost && storedPost.trim() !== "") {
        setGeneratedPost(storedPost);
      } else if (!contentGeneratedRef.current) {
        contentGeneratedRef.current = true;
        generateContent(false);
      }
    }
  }, [location]);

  const generateContent = async (regen) => {
    if (loading) return; // Prevent multiple simultaneous calls

    console.log("generate content called");
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
      console.log("prompt :>> ", prompt);
      setLoadingStage(regen ? "Regenerating post..." : "Creating post...");
      const post = await generatePost(prompt);
      console.log("post :>> ", post);
      setGeneratedPost(post);
      localStorage.setItem("generatedPost", post);
      const savedPostId = await savePost(post, storedParameters);
      setPostId(savedPostId);
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
      const refinedPost = await refinePost(userInput, generatedPost, postId);
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
    console.log("handleReload called");
    contentGeneratedRef.current = false; // Reset the ref
    generateContent(true);
  };
  const formatPost = (post) => {
    const paragraphs = post.split("\n\n");
    return paragraphs.map((paragraph, index) => {
      const formattedParagraph = paragraph.replace(/\n/g, " ");
      return (
        <p key={index} className="mb-4">
          {formattedParagraph}
        </p>
      );
    });
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
              <p className="whitespace-pre-wrap pt-3">
                {formatPost(generatedPost)}
              </p>
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
