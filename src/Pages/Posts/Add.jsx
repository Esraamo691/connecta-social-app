import { Button, Card, Form, Textarea } from "@heroui/react";
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import AppButton from "../../Components/Shared/AppButton/AppButton";
import { toast } from "react-toastify";

export default function Add() {
  const fileInputRef = useRef();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  async function addPost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }
    try {
      const { data: message } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      if (message === "success") {
        reset();
        toast.success("Post Created Successfully", {
          theme: "dark",
          position: "top-center",
        });
      } else {
        throw new Error("someting went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Post Creation Failed", {
        theme: "dark",
        position: "top-center",
      });
    }
  }
  return (
    <>
      <section className="py-6">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 bg-gray-800">
            <Form onSubmit={handleSubmit(addPost)}>
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
                isLoading={isSubmitting}
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
