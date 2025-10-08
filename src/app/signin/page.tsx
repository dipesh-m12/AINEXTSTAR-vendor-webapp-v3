/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { Building2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyA4cvNFJ76Du5dAeMIdT3R2v35E6-jMIVo",
  authDomain: "ainextstar-14efe.firebaseapp.com",
  projectId: "ainextstar-14efe",
  storageBucket: "ainextstar-14efe.firebasestorage.app",
  messagingSenderId: "763386436320",
  appId: "1:763386436320:web:75ca146b2785a4ed5bce85",
  measurementId: "G-DDKSK626FK",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  isSupported()
    .then((ok) => {
      if (ok) getAnalytics(app);
    })
    .catch(() => {});
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LIME = "#CCF656";
const BORDER = "rgba(0,0,0,0.08)";

// Zod schema for email/password validation
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [generalError, setGeneralError] = useState<string | null>(null);

  async function onEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // Validate with Zod
    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      const zodErrors = result.error.flatten().fieldErrors;

      if (zodErrors.email) {
        fieldErrors.email = zodErrors.email[0];
      }
      if (zodErrors.password) {
        fieldErrors.password = zodErrors.password[0];
      }

      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    // Mock authentication - simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  }

  async function onGoogleSignIn() {
    setGeneralError(null);
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err: any) {
      setGeneralError(err?.message || "Google sign in failed");
      setGoogleLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Header */}
      <div className="mx-auto mb-8 text-center">
        <div
          className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full"
          style={{ backgroundColor: LIME }}
        >
          <Building2 className="h-8 w-8 text-gray-900" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Access your account to continue
        </p>
      </div>

      {/* Card container */}
      <section
        className="mx-auto w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6"
        style={{ backgroundColor: "white", border: `1px solid ${BORDER}` }}
      >
        {generalError && (
          <div
            role="alert"
            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700"
          >
            {generalError}
          </div>
        )}

        <form onSubmit={onEmailSignIn} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              className={errors.email ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              required
              aria-required="true"
              aria-invalid={!!errors.password}
              className={errors.password ? "border-red-500" : ""}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-sm text-red-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            style={{ backgroundColor: LIME, color: "#111827" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <span className="w-full border-t" style={{ borderColor: BORDER }} />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        {/* Google sign-in button */}
        <button
          type="button"
          onClick={onGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full h-12 rounded-lg border inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: BORDER,
            backgroundColor: "white",
            color: "#111827",
          }}
        >
          {googleLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting to Google…
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Footer link */}
        <div className="pt-2 text-center text-sm text-gray-600">
          {"Don't have an account? "}
          <a
            href="/signup"
            className="text-gray-900 underline underline-offset-4 hover:text-gray-700"
          >
            Sign up
          </a>
        </div>
      </section>
    </main>
  );
}
