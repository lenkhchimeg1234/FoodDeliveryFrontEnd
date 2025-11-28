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
import { useState, useEffect } from "react";

export function SignupForm({ className, handleStepForward, formik }) {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <form className={cn("flex flex-col gap-6", className)}>
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Sign up to explore your favorite dishes.
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
              Invalid email. Use a format like example@gmail.com
            </div>
          )}
        </Field>
        <Field>
          <Button
            onClick={handleStepForward}
            disabled={errors.email || !values.email}
            className={`w-[416px] h-9 mb-6 cursor-pointer
          ${
            !errors.email || values.email
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
