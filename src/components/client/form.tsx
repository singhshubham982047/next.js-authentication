"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { loginHandler } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password)
          return toast.error("Please Provide all fields");

        const toastId = toast.loading("logging in...");
        const error = await loginHandler(email, password);

        if (!error) {
          toast.success("login successful", { id: toastId });
          router.refresh();
        } else toast.error(`${error}`, { id: toastId });
      }}>
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
