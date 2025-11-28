"use client";

import { cn } from "@/lib/utils";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, formik }) {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  // const handleForgetPasswordPreview = () => {
  //   router.push("/ForgetPasswordPreview");
  // };
  return (
    <form className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email && touched.email && (
            <div className="text-red-600 text-[14px]">
              Please write your email.
            </div>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <div className="text-red-600 text-[14px]">{errors.password}</div>
          )}
          <a
            // onClick={handleForgetPasswordPreview}
            href="#"
            className="ml-auto text-sm underline underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </Field>
      </FieldGroup>
    </form>
  );
}
