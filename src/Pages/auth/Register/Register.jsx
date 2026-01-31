import React, { useState } from "react";
import { Alert, DatePicker } from "@heroui/react";
import { DateInput } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { Form, Input } from "@heroui/react";
import { RadioGroup, Radio } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../Components/Shared/ValidationError/ValidationError";
import AppButton from "../../../Components/Shared/AppButton/AppButton";
const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};
const schema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 charcters long" }),
    email: z.email("Invalid Email Address"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 charcters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one Uppercase letter, one LowerCase letter, one number and one special character",
      }),
    rePassword: z
      .string()
      .min(8, { message: "Password must be at least 8 charcters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one Uppercase letter, one LowerCase letter, one number and one special character",
      }),
    dateOfBirth: z.string().refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate < today;
      },
      { message: "Enter a valid date" },
    ),

    gender: z.literal(["female", "male"], {
      message: "Please select a gender",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
export default function Register() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });
  async function onSubmit(data) {
    console.log(data);
    try {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
        data,
      );
      if (response.message === "success") {
        navigate("/login");
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
            <h1 className="text-center">Register Now</h1>
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
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Enter your username"
                  type="text"
                  variant="faded"
                  {...register("name")}
                />
                <ValidationError error={errors.name?.message} />
              </div>
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
              <div className="w-full">
                <Input
                  label="rePassword"
                  labelPlacement="outside"
                  {...register("rePassword")}
                  placeholder="Confirm your password"
                  type="password"
                  variant="faded"
                />
                <ValidationError error={errors.rePassword?.message} />
              </div>

              <div className="w-full">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      variant="faded"
                      label="Birth date"
                      value={field.value ? parseDate(field.value) : null}
                      onChange={(date) => field.onChange(date.toString())}
                    />
                  )}
                />
                <ValidationError error={errors.dateOfBirth?.message} />
              </div>

              <div className="w-full">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      label="Select Gender"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Radio value="female">Female</Radio>
                      <Radio value="male">Male</Radio>
                    </RadioGroup>
                  )}
                />
                <ValidationError error={errors.gender?.message} />
              </div>

              <AppButton
                type="submit"
                disabled={!isValid}
                isLoading={isSubmitting}
              >
                Register
              </AppButton>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
