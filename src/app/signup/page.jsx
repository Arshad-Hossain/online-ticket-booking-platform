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

import { Select, ListBox } from "@heroui/react";

import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c120d] px-4 pt-24 pb-5">
      <div className="w-full max-w-lg">
        <Surface className="w-full rounded-2xl shadow-2xl border border-[#c8a27a]/20 bg-[#2a1a14]/70 backdrop-blur-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#f5e6d3]">
              Create Account ☕
            </h1>

            <p className="text-sm text-[#c8a27a] mt-2">
              Join TicketBari and start booking tickets easily
            </p>
          </div>

          <Form onSubmit={onSubmit}>
            <Fieldset className="space-y-5">
              {/* Name */}
              <TextField isRequired name="name">
                <Label className="text-[#e6d5c3]">Name</Label>
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Image */}
              <TextField name="image" type="url">
                <Label className="text-[#e6d5c3]">Profile Image URL</Label>
                <Input placeholder="https://..." variant="secondary" />
                <FieldError />
              </TextField>

              {/* Email */}
              <TextField isRequired name="email" type="email">
                <Label className="text-[#e6d5c3]">Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField isRequired name="password" type="password">
                <Label className="text-[#e6d5c3]">Password</Label>
                <Input placeholder="Enter password" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Role */}
              <Select isRequired name="role" placeholder="Select role">
                <Label className="text-[#e6d5c3]">Signup As</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="user" textValue="user">
                      User
                    </ListBox.Item>

                    <ListBox.Item id="vendor" textValue="vendor">
                      Vendor
                    </ListBox.Item>

                    <ListBox.Item id="admin" textValue="admin">
                      Admin
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-[#c8a27a] to-[#e6c29f] text-[#1c120d] font-semibold py-2 rounded-xl hover:scale-[1.02] transition shadow-lg"
              >
                Sign Up
              </Button>
            </Fieldset>
          </Form>

          {/* Footer link */}
          <div className="text-center mt-6 text-sm text-[#c8a27a]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#e6c29f] hover:text-[#f5e6d3] font-medium"
            >
              Sign in
            </Link>
          </div>
        </Surface>
      </div>
    </div>
  );
}
