import { Avatar, CardBody, CardHeader } from "@heroui/react";
import { formatDate } from "../../lib/formatDate";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function PostHeader({
  user: { name, photo, createdAt, body, _id },
  postId,
  isComment = false,
}) {
  const queryClient = useQueryClient();
  const { dataProfile } = useContext(AuthContext);
  const { mutate: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post Deleted Successfully", {
        theme: "dark",
      });
      queryClient.invalidateQueries(["profile-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: () => {
      toast.error("Post Deletion Failed", {
        theme: "dark",
      });
    },
  });

  async function deletePost() {
    return axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return (
    <>
      <div className="">
        <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-between">
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
          {dataProfile._id === _id && (
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Open Menu</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </DropdownItem>
                <DropdownItem
                  onClick={() => removePost()}
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </CardHeader>
        <CardBody className="  py-2">
          <h3 className={`${isComment && "ps-16"} mb-2`}>{body}</h3>
        </CardBody>
      </div>
    </>
  );
}
