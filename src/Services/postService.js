// src/services/postService.js
import { db } from "../config/firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { getUserId } from "./userService";

// In postService.js
export const savePost = async (post, parameters, review = null) => {
  const userId = getUserId();
  try {
    console.log("Saving post to Firestore...");
    const docRef = await addDoc(collection(db, "posts"), {
      userId,
      content: post,
      parameters,
      review,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log("Post saved successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving post: ", error);
    throw error;
  }
};
export const updatePost = async (postId, newContent) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      content: newContent,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating post: ", error);
    throw error;
  }
};
export const getUserPosts = async () => {
  const userId = getUserId();
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
    }));

    // Sort posts by createdAt in descending order
    return posts.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error("Error getting user posts:", error);
    throw error;
  }
};
