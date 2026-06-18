"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ---------------------------
  // EMAIL LOGIN
  // ---------------------------
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { email, password } = data;

      const { data: res, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        alert("Invalid email or password");
        return;
      }

      if (res) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // GOOGLE LOGIN
  // ---------------------------
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c120d] px-4 pt-24 pb-10">
      <div className="w-full max-w-md">
        <div className="w-full rounded-2xl shadow-2xl border border-[#c8a27a]/20 bg-[#2a1a14]/70 backdrop-blur-xl p-6 sm:p-8">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#f5e6d3]">
              Welcome Back ☕
            </h1>
            <p className="text-sm text-[#c8a27a] mt-1">
              Sign in to continue booking tickets
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="text-[#e6d5c3] text-sm">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  type="email"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1c120d] border border-[#c8a27a]/30 text-white outline-none"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-[#e6d5c3] text-sm">Password</label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Enter password"
                  type="password"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#1c120d] border border-[#c8a27a]/30 text-white outline-none"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* FORGOT */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#c8a27a] hover:text-[#e6c29f]"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold py-2 rounded-xl hover:scale-[1.02] transition shadow-lg"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#c8a27a]/20" />
            <span className="px-4 text-sm text-[#c8a27a]">Or</span>
            <div className="flex-1 h-px bg-[#c8a27a]/20" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleSignin}
            className="w-full border border-[#c8a27a]/30 bg-[#1c120d] text-[#f5e6d3] hover:border-[#c8a27a] hover:bg-[#2f1d16] rounded-xl py-4 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          {/* FOOTER */}
          <div className="text-center mt-6 text-sm text-[#c8a27a]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#e6c29f] hover:text-[#f5e6d3] font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
