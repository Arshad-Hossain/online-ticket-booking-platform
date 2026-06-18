"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

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

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        alert("Invalid email or password");
        return;
      }

      if (data) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c120d] px-4 pt-24 pb-10">
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

          {/* Login Form */}
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full space-y-5">
              <TextField isRequired name="email" type="email">
                <Label className="text-[#e6d5c3]">Email</Label>

                <Input placeholder="john@example.com" variant="secondary" />

                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label className="text-[#e6d5c3]">Password</Label>

                <Input placeholder="Enter your password" variant="secondary" />

                <FieldError />
              </TextField>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#c8a27a] hover:text-[#e6c29f]"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                isDisabled={loading}
                className="w-full bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold py-2 rounded-xl hover:scale-[1.02] transition shadow-lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#c8a27a]/20" />

            <span className="px-4 text-sm text-[#c8a27a]">Or</span>

            <div className="flex-1 h-px bg-[#c8a27a]/20" />
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignin}
            isDisabled={googleLoading}
            variant="bordered"
            className="w-full border-[#c8a27a]/30 bg-[#1c120d] text-[#f5e6d3] hover:border-[#c8a27a] hover:bg-[#2f1d16] rounded-xl py-6"
          >
            <FcGoogle className="text-xl" />

            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          {/* Footer */}
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
