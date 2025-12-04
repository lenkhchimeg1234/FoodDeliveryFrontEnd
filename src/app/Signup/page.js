"use client";
import { useState } from "react";
import { SignupForm } from "@/Component/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { SignupFormPassword } from "@/Component/SignupFormPassword";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [apiError, setApiError] = useState("");

  const [step, setStep] = useState(1);

  const handleStepForward = async () => {
    // STEP 1 → зөвхөн дараагийн алхам руу
    if (step === 1) {
      return setStep(2);
    }

    // STEP 2 → энд жинхэнэ SUBMIT !!!
    if (step === 2 && !apiError) {
      formik.handleSubmit(); // → createUser дуудагдана
    }
  };
  const handleClickLogin = () => {
    router.push("/Login");
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters and contain uppercase letters, lowercase letters, and numbers."
      )
      .required("Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password not match"
    ),
  });

  const createUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:247/authentication/signup",
        { email: email, password: password }
      );
      // console.log("successfully create acc");
      if (!apiError) {
        router.push("/Login");
      }
    } catch (err) {
      setApiError(err.response?.data);
    } finally {
      // console.log("finished");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      // console.log(values, "values");
      const { email, password } = values;
      await createUser(email, password);
    },
    validationSchema: validationSchema,
  });
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start"></div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-6">
            {/* <SignupForm /> */}

            {step === 1 && (
              <SignupForm
                handleStepForward={handleStepForward}
                formik={formik}
              />
            )}
            {step === 2 && (
              <SignupFormPassword
                handleStepForward={handleStepForward}
                formik={formik}
              />
            )}
            {apiError && (
              <div className="text-red-600 text-[14px]">{apiError}</div>
            )}

            <Field>
              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="#" onClick={handleClickLogin}>
                  Log in
                </a>
              </FieldDescription>
            </Field>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/Fooddelivery.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
