import React, { useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import axios from "axios";

export default function PostsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [Apierror, setApierror] = useState(null);
  const [posts, setPosts] = useState(null);
  async function getAllPosts() {
    setIsLoading(true);
    try {
      const {
        data: { posts },
      } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts?limit=50&sort=-createdAt`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      setPosts(posts);
      setApierror(null);
    } catch (error) {
      console.log(error);
      setApierror(error.response.data.error);
      setPosts(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-7">
          {isLoading && <div className="text-center text-4xl">Loading...</div>}
          {Apierror && (
            <div className="text-center text-4xl text-red-400">{Apierror}</div>
          )}
          {posts &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
