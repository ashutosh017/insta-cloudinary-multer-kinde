"use client";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function SignIn() {
  return (
    <div>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  );
}
