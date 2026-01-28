import React, { useContext, useState } from "react";
import { Alert } from "@heroui/react";
import { Form, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import AppButton from "../../../Components/Shared/AppButton/AppButton";
import { AuthContext } from "../../../Context/AuthContext";
const defaultValues = {
  email: "",
  password: "",
};
const schema = z.object({
  email: z.email("Invalid Email Address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 charcters long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least one Uppercase letter, one LowerCase letter, one number and one special character",
    }),
});

export default function Login() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState(null);
  const { setToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  async function onSubmit(data) {
    console.log(data);
    try {
      const { data: response } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data,
      );
      if (response.message === "success") {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        navigate("/");
        setApiError(null);
      } else if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.error);
    }
  }
  return (
    <>
      <section className="py-12">
        <div className="container">
          <div className="max-w-lg mx-auto bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h1 className="text-center">Login Now</h1>
            {ApiError && (
              <div className="flex mt-3 items-center justify-center w-full">
                <div className="flex flex-col w-full">
                  <div className="w-full flex items-center  my-3 ">
                    <Alert
                      variant="faded"
                      color="danger"
                      className="py-2"
                      title={ApiError}
                    />
                  </div>
                </div>
              </div>
            )}
            <Form
              className="w-full  flex flex-col gap-4"
              onReset={() => setAction("reset")}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <Input
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="text"
                  variant="faded"
                  {...register("email")}
                />
                <ValidationError error={errors.email?.message} />
              </div>
              <div className="w-full">
                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  type="password"
                  variant="faded"
                  {...register("password")}
                />
                <ValidationError error={errors.password?.message} />
              </div>

              <AppButton
                type="submit"
                disabled={!isValid}
                isLoading={isSubmitting}
              >
                Login
              </AppButton>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
