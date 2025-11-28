"use client";

import { LoginForm } from "@/Component/login-form";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFormik } from "formik";
import axios from "axios";

export default function LoginPage({}) {
  const router = useRouter();
  const handleClickSignup = () => {
    router.push("/Signup");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      await loginUser(email, password);
    },
  });
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:247/authentication/login",
        {
          email: email,
          password: password,
        }
      );
      router.push("/");
    } catch (err) {
      // setApiError(err.response?.data);
    } finally {
      console.log("finished");
    }
  };
  const { values, handleSubmit, handleChange } = formik;
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs  flex flex-col gap-6">
            <LoginForm formik={formik} />
            <Field>
              <Button onClick={() => handleSubmit(values)}>
                Let&apos;s Go
              </Button>
            </Field>
            <Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <a onClick={handleClickSignup} href="#">
                  Sign up
                </a>
              </FieldDescription>
            </Field>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block min-h-svh">
        <Image
          src="/Fooddelivery.png"
          alt="Image"
          fill
          className="absolute inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
