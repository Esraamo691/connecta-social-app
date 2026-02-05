import { Button, Card, Form, Textarea } from "@heroui/react";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import AppButton from "../../Components/Shared/AppButton/AppButton";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      reset();
      toast.success("Post Created Successfully", {
        theme: "dark",
        position: "top-center",
      });
      queryClient.invalidateQueries(["profile-posts", post]);
      queryClient.invalidateQueries(["all-posts", post]);
    },
    onError: () => {
      toast.error("Post Creation Failed", {
        theme: "dark",
        position: "top-center",
      });
    },
  });

  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    return await axios.post(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }
  return (
    <>
      <section className="py-6">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 bg-gray-800">
            <Form onSubmit={handleSubmit(mutate)}>
              <div className="w-full flex items-center gap-6">
                <Textarea
                  {...register("body")}
                  label="Post Something"
                  placeholder="Leave a comment..."
                  variant="bordered"
                />
                <input
                  {...register("image")}
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                />
                <IoMdCloudUpload
                  onClick={() => fileInputRef.current.click()}
                  className="text-4xl cursor-pointer"
                />
              </div>

              <AppButton
                className="w-full mt-2 text-medium"
                type="submit"
                isLoading={isPending}
                disabled={!isValid || isPending}
              >
                Create Post
              </AppButton>
            </Form>
          </Card>
        </div>
      </section>
    </>
  );
}
