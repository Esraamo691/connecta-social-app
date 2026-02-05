import { Textarea } from "@heroui/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import AppButton from "../../Components/Shared/AppButton/AppButton";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateComment({ post }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, data, isPending } = useMutation({
    mutationFn: AddComment,
    onSuccess: (data) => {
      reset();
      toast.success(data.data.message, {
        theme: "dark",
        position: "top-center",
      });
      queryClient.invalidateQueries(["details-post", post]);
      queryClient.invalidateQueries(["profile-posts", post]);
      queryClient.invalidateQueries(["all-posts", post]);
    },
    onError: () => {
      toast.error("Comment Creation Failed", {
        theme: "dark",
        position: "top-center",
      });
    },
  });

  async function AddComment(data) {
    const commentData = { ...data, post };
    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      commentData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }
  return (
    <>
      <Form onSubmit={handleSubmit(mutate)}>
        <Textarea
          {...register("content")}
          label="Post Something"
          placeholder="Leave a comment..."
          variant="bordered"
        />

        <AppButton
          className="w-full mt-2 text-medium"
          type="submit"
          isLoading={isPending}
          disabled={!isValid || isPending}
        >
          Create Comment
        </AppButton>
      </Form>
    </>
  );
}
