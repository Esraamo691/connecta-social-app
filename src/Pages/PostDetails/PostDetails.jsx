import { useParams } from "react-router-dom";
import PostItem from "../Posts/PostItem/PostItem";
import { useContext } from "react";
import Loader from "../../Components/Loader/Loader";
import { AuthContext } from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";
export default function PostDetails() {
  const { dataProfile } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isError, error, isLoading } = useFetch(
    ["details-post", id],
    `posts/${id}`,
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
          {data && <PostItem post={data.post} showAllComments={true} />}
        </div>
      </div>
    </section>
  );
}
