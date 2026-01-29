import React, { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import axios from "axios";

export default function PostsList() {
  const [posts, setPosts] = useState(null);
  async function getAllPosts() {
    try {
      const {
        data: { posts },
      } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?limit=50`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-7">
          {posts &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
