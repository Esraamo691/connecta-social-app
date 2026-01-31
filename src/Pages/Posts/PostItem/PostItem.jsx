import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { AiFillLike } from "react-icons/ai";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostHeader from "../PostHeader";
export default function PostItem({ post, showAllComments = false }) {
  const { body, image, createdAt, user, comments, _id } = post;
  return (
    <>
      <Card className="py-4 max-w-3xl bg-gray-800">
        <PostHeader user={{ ...user, createdAt, body }} />
        <CardBody>
          {image && (
            <img alt={body} className="object-cover rounded-xl" src={image} />
          )}
        </CardBody>
        <CardFooter>
          <div className="flex items-center justify-between w-full text-2xl">
            <AiFillLike />
            <div className="flex items-end gap-2">
              <BiSolidMessageRoundedDots />
              {comments && comments.length}
            </div>

            <Link to={`/posts/${_id}`}>
              <FaShare />
            </Link>
          </div>
        </CardFooter>
        {/* comments */}
        {comments && comments.length > 0 && showAllComments ? (
          comments.map((comment) => (
            <PostHeader
              user={{
                ...comment.commentCreator,
                createdAt: comment.createdAt,
                body: comment.content,
              }}
              isComment={true}
            />
          ))
        ) : (
          <PostHeader
            user={{
              ...comments[0].commentCreator,
              createdAt: comments[0].createdAt,
              body: comments[0].content,
            }}
            isComment={true}
          />
        )}
      </Card>
    </>
  );
}
