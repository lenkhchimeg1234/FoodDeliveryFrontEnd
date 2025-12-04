"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function SignupFormPassword({ className, formik, handleStepForward }) {
  const [show, setShow] = useState(false);

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    formik;
  // console.log(values, "'values");

  return (
    <form className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-2xl font-bold">Create a strong password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Create a strong password with letters, numbers.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type={show ? "text" : "password"}
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
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confPassword"
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Confirm"
          />
          {errors.confirmPassword && (
            <div className="text-red-600 text-[14px]">
              {errors.confirmPassword}
            </div>
          )}
        </Field>
        <Field>
          <div className="flex gap-2">
            <Checkbox
              id="show-password"
              checked={show}
              onCheckedChange={(checked) => setShow(!!checked)}
            />
            <FieldDescription>Show password</FieldDescription>
          </div>
        </Field>
        <Field>
          <Button
            onClick={handleSubmit}
            disabled={
              errors.confirmPassword ||
              !values.confirmPassword ||
              errors.password ||
              !values.password
            }
            className={`w-[416px] h-9 mb-6 cursor-pointer
          ${
            !errors.password ||
            values.password ||
            !errors.confirmPassword ||
            values.confirmPassword
              ? "bg-[#18181B] textiwhite"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          >
            Let&apos;s Go
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
