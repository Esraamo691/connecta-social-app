import CreatePost from "../../Posts/CreatePost";
import PostsList from "../../Posts/PostsList/PostsList";

export default function Profile() {
  return (
    <>
      <CreatePost />
      <PostsList isHome={false} />
    </>
  );
}
