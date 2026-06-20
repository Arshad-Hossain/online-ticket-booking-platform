"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || "",
        signupAs: data.signupAs,
      });

      if (error) {
        alert(error.message || "Signup failed");
        return;
      }
      alert("Signup Sccessful!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c120d] px-4 pt-24 pb-5">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl shadow-2xl border border-[#c8a27a]/20 bg-[#2a1a14]/70 backdrop-blur-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#f5e6d3]">
              Create Account ☕
            </h1>

            <p className="text-sm text-[#c8a27a] mt-2">
              Join TicketBari and start booking tickets easily
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-[#e6d5c3]">Name</label>

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-[#1c120d] border border-[#c8a27a]/20 text-white focus:outline-none focus:border-[#c8a27a]"
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-[#e6d5c3]">
                Profile Image URL
              </label>

              <input
                {...register("image")}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#1c120d] border border-[#c8a27a]/20 text-white focus:outline-none focus:border-[#c8a27a]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-[#e6d5c3]">Email</label>

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#1c120d] border border-[#c8a27a]/20 text-white focus:outline-none focus:border-[#c8a27a]"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-[#e6d5c3]">Password</label>

              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-[#1c120d] border border-[#c8a27a]/20 text-white focus:outline-none focus:border-[#c8a27a]"
              />

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Signup As */}
            <div>
              <label className="block mb-2 text-[#e6d5c3]">Signup As</label>

              <select
                {...register("signupAs", {
                  required: true,
                })}
                className="w-full px-4 py-3 rounded-xl bg-[#1c120d] border border-[#c8a27a]/20 text-white focus:outline-none focus:border-[#c8a27a]"
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold py-3 rounded-xl hover:scale-[1.02] transition shadow-lg"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-[#c8a27a]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#e6c29f] hover:text-[#f5e6d3] font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
