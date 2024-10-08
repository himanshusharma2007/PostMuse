import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaSpinner,
  FaRedoAlt,
  FaSave,
  FaEdit,
  FaUsers,
} from "react-icons/fa";
import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import Header from "../components/Header";
import { generatePost } from "../Services/geminiService";
import { useNavigate } from "react-router-dom";
import { savePost, updatePost } from "../Services/postService";
import { BiReset } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
const ReviewPost = () => {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState({
    Instagram: false,
    Facebook: false,
    Twitter: false,
    LinkedIn: false,
  });
  const [targetAudience, setTargetAudience] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [scoreText, setScoreText] = useState(["", ""]);
  const navigate = useNavigate();
  const [postId, setPostId] = useState(null);
  const [updatedcheck, setUpdatedCheck] = useState(false);
  // const [apiResponse,setApiResponse]=useState({})
  useEffect(() => {
    // Run this code after `scoreText` changes
    console.log("check1");
    if (updatedcheck) {
      console.log("check2");

      setData();
    }
  }, [updatedcheck]);
  const setData = () => {
    console.log("reviewResult in setData :>> ", reviewResult);
    localStorage.setItem(
      "reviewPostData",
      JSON.stringify({
        post,
        platforms,
        targetAudience,
        scoreText,
        reviewResult,
        postId,
      })
    );
  };
  useEffect(() => {
    const storedData = localStorage.getItem("reviewPostData");
    // console.log("storedData in useeffect>> ", storedData);
    if (storedData) {
      const {
        post = "",
        platforms = {
          Instagram: false,
          Facebook: false,
          Twitter: false,
          LinkedIn: false,
        },
        targetAudience = "",
        reviewResult = null,
        postId = null,
        scoreText = ["", ""],
      } = JSON.parse(storedData);
      setPost(post);
      setPlatforms(platforms);
      setTargetAudience(targetAudience);
      setReviewResult(reviewResult);
      setPostId(postId);
      setScoreText(scoreText);
    }
  }, []);

  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const handleEditPost = () => {
    navigate("/generated-post", {
      state: {
        originalPost: post,
        incomingEditorMode: true,
      },
    });
  };

  const handleRegenerate = () => {
    navigate("/generated-post", {
      state: {
        originalPost: post,
        review: reviewResult,
        platforms,
        targetAudience,
        isRegenerating: true,
      },
    });
  };
  const handleReview = async () => {
    setIsReviewing(true);
    try {
      console.log("scoreText before local storage:>> ", scoreText);

      const prompt = createReviewPrompt(post, platforms, targetAudience);
      const response = await generatePost(prompt);
      const parsedResponse = parseGeminiResponse(response);

      // console.log("Review response received", parsedResponse);

      // Save the post and review to Firestore
      const savedPostId = await savePost(
        post,
        { platforms, targetAudience, scoreText },
        parsedResponse
      );

      setPostId(savedPostId);
      setReviewResult(parsedResponse);
      setUpdatedCheck(true);
      // Calling setData after state updates
      // setPostId(savedPostId);
      // setReviewResult(parsedResponse);

      // setTimeout(() => {
      //   setData();
      // }, 2000); // Timeout ensures setData runs after the state update
    } catch (error) {
      console.error("Error reviewing post:", error);
    } finally {
      setIsReviewing(false);
    }
    console.log("handle review ends");
  };
const handleReset=()=>{
 localStorage.setItem(
   "reviewPostData",
   JSON.stringify({})
 );
  setPost("");
  setPlatforms({
    Instagram: false,
    Facebook: false,
    Twitter: false,
    LinkedIn: false,
  });
  setTargetAudience("");
  setReviewResult(null);
  setPostId("");
  setScoreText(["",""]);
}
  function createReviewPrompt(post, platforms, targetAudience) {
    return `
Please provide a comprehensive and critical review of the following social media post. Be thorough and point out both strengths and areas for improvement. The review should be harsh but constructive, aiming to help the user create the most effective post possible.

Post:
"${post}"

Target Platforms: ${Object.keys(platforms)
      .filter((p) => platforms[p])
      .join(", ")}
Target Audience: ${targetAudience}

Please structure your response as follows, without using any text formatting (no bold, italic, or other markup):

1. Score: [Provide a score out of 100 as a single number]
2. Strengths: [List up to 4 current strengths of the post]
3. Vulnerabilities: [List up to 3 weaknesses or potential issues with the post]
4. Improvements: [Provide 3 to 6 specific suggestions for improving the post]

Ensure that each section is clearly labeled and separated for easy parsing. Do not include any additional headers or formatting.
`;
  }

  function parseGeminiResponse(response) {
    const sections = response.split(/\d+\.\s+/).filter(Boolean);
    const parsedResponse = {
      score: 0,
      strengths: [],
      vulnerabilities: [],
      improvements: [],
    };

    let tempScoreText = ["", ""];

    sections.forEach((section) => {
      const [title, ...content] = section.split(":");
      const trimmedContent = content.join(":").trim();

      switch (title.trim().toLowerCase()) {
        case "score":
          const scoreMatch = trimmedContent.match(/\d+/);
          parsedResponse.score = scoreMatch ? parseInt(scoreMatch[0]) : 0;

          if (parsedResponse.score >= 75) {
            tempScoreText = ["Good", "text-green-500"];
          } else if (parsedResponse.score > 60) {
            tempScoreText = ["Alright", "text-yellow-500"];
          } else if (parsedResponse.score <= 60) {
            tempScoreText = ["Bad", "text-red-500"];
          }
          break;

        case "strengths":
          parsedResponse.strengths = trimmedContent
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 4);
          break;
        case "vulnerabilities":
          parsedResponse.vulnerabilities = trimmedContent
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 3);
          break;
        case "improvements":
          parsedResponse.improvements = trimmedContent
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 6);
          break;
      }
    });
    console.log("tempScoreText :>> ", tempScoreText);
    setScoreText(tempScoreText);
    console.log("scoreText :>> ", scoreText);
    return parsedResponse;
  }

  const platformIcons = {
    Instagram: RiInstagramLine,
    Facebook: RiFacebookCircleLine,
    Twitter: RiTwitterLine,
    LinkedIn: RiLinkedinBoxLine,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-[14vh] pb-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl md:text-4xl font-bold mb-2">Review Your Post</h1>
          <p className="text-md md:text-xl text-gray-300">
            Get AI-powered insights to enhance your social media content
          </p>
        </motion.div>

        <div className=" flex flex-col lg:flex-row gap-8 md:h-[88vh]">
          <motion.div
            className="relative bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg flex flex-col space-y-4 md:w-[55%]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-2 right-2 ">
              <button
                onClick={handleReset}
                className="flex space-x-1 justify-center items-center px-2 py-1 hover:bg-zinc-400 rounded-md"
              >
                <TfiReload />
                <span>reset</span>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Post
              </label>
              <textarea
                className="w-full h-52 custom-scrollbar p-4 bg-gray-700 text-white rounded-lg resize-none"
                placeholder="Paste your post here..."
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {platforms &&
                  Object.entries(platforms).map(([name, isChecked]) => {
                    const Icon = platformIcons[name];
                    return (
                      <motion.label
                        key={name}
                        className={`flex items-center  px-3 py-1 md:px-4 md:py-2 rounded-full cursor-pointer ${
                          isChecked ? "bg-purple-600" : "bg-gray-700"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={() =>
                            setPlatforms((prev) => ({
                              ...prev,
                              [name]: !prev[name],
                            }))
                          }
                        />
                        <Icon className="mr-2" />
                        {name}
                      </motion.label>
                    );
                  })}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Target Audience
              </label>
              <div className="relative">
                <FaUsers className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg"
                  placeholder="e.g., Young professionals, Tech enthusiasts"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-grow justify-center items-end mt-">
              <motion.button
                className="  bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6  max-h-12 rounded-lg flex items-center justify-center"
                onClick={() => {
                  handleReview();
                }}
                disabled={
                  !post ||
                  Object.values(platforms).every((v) => !v) ||
                  !targetAudience ||
                  isReviewing
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isReviewing ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaPaperPlane className="mr-2" />
                )}
                {isReviewing ? "Reviewing..." : "Review Post"}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 custom-scrollbar rounded-lg p-6 h-auto overflow-auto shadow-lg flex-1 md:w-[45%]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isReviewing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaSpinner className="animate-spin text-4xl text-purple-600 mb-4" />
                <p className="text-xl">Analyzing your post...</p>
              </div>
            ) : reviewResult ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Review Results</h2>

                <div className="flex items-center justify-between mb-6">
                  <div className={`text-4xl ${scoreText[1]} font-bold`}>
                    {scoreText[0]}
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-700 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className={`${getScoreColor(
                          reviewResult.score
                        )} progress-ring__circle stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={
                          251.2 * (1 - reviewResult.score / 100)
                        }
                      ></circle>
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                      {reviewResult.score != null
                        ? `${reviewResult.score}/100`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Strengths:</h3>
                  <ul className="list-disc list-inside">
                    {reviewResult.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {strength}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Vulnerabilities:
                  </h3>
                  <ul className="list-disc list-inside">
                    {reviewResult.vulnerabilities.map(
                      (vulnerability, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {vulnerability}
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Improvements:</h3>
                  <ul className="list-disc list-inside">
                    {reviewResult.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {improvement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                  <motion.button
                    onClick={handleEditPost}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEdit className="mr-2" />
                    Edit Post
                  </motion.button>
                  <motion.button
                    onClick={handleRegenerate}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRedoAlt className="mr-2" />
                    Regenerate Post
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaPaperPlane className="text-6xl mb-4" />
                <p className="text-xl text-center">
                  Your review results will appear here after you submit your
                  post for analysis.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
