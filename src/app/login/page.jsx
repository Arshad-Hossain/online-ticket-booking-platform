"use client";

import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c120d] px-4">
      <div className="w-full max-w-md">
        <Surface className="w-full rounded-2xl shadow-2xl border border-[#c8a27a]/20 bg-[#2a1a14]/70 backdrop-blur-xl p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#f5e6d3]">
              Welcome Back ☕
            </h1>

            <p className="text-sm text-[#c8a27a] mt-1">
              Sign in to continue booking your tickets
            </p>
          </div>

          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full space-y-5">
              {/* Email */}
              <TextField isRequired name="email" type="email">
                <Label className="text-[#e6d5c3]">Email</Label>
                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                  className="mt-1"
                />
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField isRequired name="password" type="password">
                <Label className="text-[#e6d5c3]">Password</Label>
                <Input
                  placeholder="Enter your password"
                  variant="secondary"
                  className="mt-1"
                />
                <FieldError />
              </TextField>

              {/* Button */}
              <Button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold py-2 rounded-xl hover:scale-[1.02] transition shadow-lg"
              >
                Sign In
              </Button>
            </Fieldset>
          </Form>

          {/* Footer link */}
          <div className="text-center mt-6 text-sm text-[#c8a27a]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#e6c29f] hover:text-[#f5e6d3] font-medium"
            >
              Sign up
            </Link>
          </div>
        </Surface>
      </div>
    </div>
  );
}
