import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // Install this package
import {
  FaPaperPlane,
  FaCopy,
  FaSync,
  FaSmile,
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
} from "react-icons/fa";
import {
  generatePrompt,
  generatePost,
  refinePost,
  regeneratePost,
} from "../Services/geminiService";
import LoadingAnimation from "../components/LoadingAnimation";
import Header from "../components/Header";
import { savePost, updatePost } from "../Services/postService";
import { BiSave } from "react-icons/bi";

const GeneratedPost = () => {
  const location = useLocation();

  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const postContainerRef = useRef(null);
  const navigate = useNavigate();
  const contentGeneratedRef = useRef(false);

  const {
    originalPost,
    review,
    platforms,
    targetAudience,
    isRegenerating,
    incomingEditorMode,
  } = location.state || {};
    console.log("orignalPost :>> ", originalPost);
  useEffect(() => {
    if (isRegenerating) {
      handleRegeneration();
    }
  }, [isRegenerating]);
  useEffect(() => {
    if (originalPost) {
      console.log("object :>> ", originalPost);
      setGeneratedPost(originalPost);
      setIsEditorMode(incomingEditorMode);
    }
  }, [originalPost]);

  useEffect(() => {
    if (!originalPost) {
      console.log("check");
      if (location.state?.postId && location.state?.post) {
        setGeneratedPost(location.state.post);
        setPostId(location.state.postId);
      } else {
        const storedPost = localStorage.getItem("generatedPost");
        if (storedPost && storedPost.trim() !== "") {
          setGeneratedPost(storedPost);
        } else if (!contentGeneratedRef.current) {
          contentGeneratedRef.current = true;
          generateContent(false);
        }
      }
    }
  }, [location]);
  const handleRegeneration = async () => {
    setLoading(true);
    setLoadingStage("Regenerating post...");
    try {
      console.log("Starting post regeneration...");
      const regeneratedPost = await regeneratePost(originalPost, review);
      console.log("Post regenerated successfully");
      setGeneratedPost(regeneratedPost);
    } catch (error) {
      console.error("Error regenerating post:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };
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
  const toggleEditorMode = () => {
    setIsEditorMode(!isEditorMode);
    if (!isEditorMode) {
      setShowEmojiPicker(false);
    }
  };
  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(emoji));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    setShowEmojiPicker(false);
  };
  const saveEditedContent = () => {
    const editedContent = postContainerRef.current.innerText;
    if (postId) {
      setGeneratedPost(editedContent);
      updatePost(postId, editedContent);
    }
    setIsEditorMode(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
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
              <h2 className="text-2xl md:text-3xl font-bold">Generated Post</h2>
              <button
                onClick={toggleEditorMode}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base md:font-bold py-2 px-2 md:px-4 rounded"
              >
                {isEditorMode ? "Exit Editor" : "Open in Editor"}
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute right-0 mt-10 z-40 h-64 overflow-auto">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <div className="bg-gray-800 px-6 pb-6 rounded-lg shadow-lg mb-8 max-h-[60vh] overflow-auto relative">
              <div className="sticky  right-2 flex justify-end space-x-2 bg-gray-800 ">
                {!isEditorMode && (
                  <>
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
                  </>
                )}
                {isEditorMode && (
                  <>
                    <button
                      onClick={saveEditedContent}
                      className="flex justify-center items-center space-x-2  bg-gray-800 hover:bg-gray-700 text-white text-sm py-1 px-2 rounded"
                    >
                      <BiSave /> <span> Save Changes</span>
                    </button>
                    <button
                      className="flex justify-center items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white text-sm py-1 px-2 rounded"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <FaSmile />
                      <span>Add Emoji</span>
                    </button>
                  </>
                )}
              </div>
              <div
                ref={postContainerRef}
                contentEditable={isEditorMode}
                className="whitespace-pre-wrap pt-3 outline-none"
                suppressContentEditableWarning={true}
              >
                {formatPost(generatedPost)}
              </div>
            </div>
            {!isEditorMode && (
              <div className="mt-8 fixed bottom-10 left-1/2 -translate-x-1/2">
                <div className="wraper relative">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your modifications or suggestions..."
                    className="h-16 w-[90vw] md:w-[70vw] p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
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
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GeneratedPost;
