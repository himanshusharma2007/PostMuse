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
} from "firebase/firestore";
import { getUserId } from "./userService";

export const savePost = async (post, parameters) => {
  const userId = getUserId();
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      userId,
      content: post,
      parameters,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting user posts: ", error);
    throw error;
  }
};
