import PostItem from "../PostItem/PostItem";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../Components/Loader/Loader";

export default function PostsList({ isHome = true }) {
  const { dataProfile } = useContext(AuthContext);
  const queryKey = isHome ? ["all-posts"] : ["profile-posts"];
  const apiUrl = isHome
    ? `posts?limit=30&sort=-createdAt`
    : `users/${dataProfile?._id}/posts`;
  const { data, isError, isLoading, error } = useFetch(
    queryKey,
    apiUrl,
    dataProfile,
  );

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-7">
          {isLoading && <Loader />}
          {isError && (
            <div className="text-center text-4xl text-red-400">
              {error.response?.data?.message || error.message}
            </div>
          )}
          {data &&
            data.posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </section>
  );
}
