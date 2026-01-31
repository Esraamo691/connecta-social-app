import { Avatar, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { formatDate } from "../../lib/formatDate";

export default function PostHeader({
  user: { name, photo, createdAt, body },
  isComment = false,
}) {
  return (
    <>
      <CardHeader className="pb-0 pt-2 px-4 flex items-center">
        <Avatar
          isBordered
          as="button"
          className="transition-transform me-4"
          color="secondary"
          size="sm"
          src={
            !photo.includes("undefined")
              ? photo
              : `${import.meta.env.VITE_BASE_URL}/uploads/default-profile.png`
          }
        />
        <div className="">
          <h2 className="text-tiny mb-1 uppercase font-bold">{name}</h2>
          <span>{formatDate(createdAt)}</span>
        </div>
      </CardHeader>
      <CardBody className="  py-2">
        <h3 className={`${isComment && "ps-16"} mb-2`}>{body}</h3>
      </CardBody>
    </>
  );
}
