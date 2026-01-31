import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../Posts/PostItem/PostItem";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  async function getSinglePost() {
    try {
      const {
        data: { post },
      } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSinglePost();
  }, []);
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-7">
          {post && <PostItem post={post} showAllComments={true} />}
        </div>
      </div>
    </section>
  );
}
