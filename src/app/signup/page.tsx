/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, AlertCircle } from "lucide-react";

// Theme constants matching your design system
const LIME = "#CCF656";
const BORDER = "rgba(0,0,0,0.08)";

// Zod schema for all fields and messages
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  businessName: z
    .string()
    .min(3, "Business name must be at least 3 characters"),
  businessAddress: z.string().min(10, "Please provide complete address"),
  businessDescription: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  providerType: z
    .enum(["business", "individual", "supplier"])
    .refine((val) => val !== undefined, {
      message: "Please select a provider type",
    }),
  branches: z
    .enum(["1", "1-5", "5-25", ">25"])
    .refine((val) => val !== undefined, {
      message: "Please select number of branches",
    }),
  staffStrength: z
    .enum(["1-10", "10-50", ">50"])
    .refine((val) => val !== undefined, {
      message: "Please select staff strength",
    }),
  annualRevenue: z
    .enum(["0-5", "5-10", ">10"])
    .refine((val) => val !== undefined, {
      message: "Please select annual revenue",
    }),
  specialties: z.string().optional().or(z.literal("")),
  contactEmail: z
    .string()
    .min(1, "Contact email is required")
    .email("Enter a valid contact email"),
  contactPhone: z
    .string()
    .min(1, "Contact phone is required")
    .regex(
      /^(\+?\d{1,3}[- ]?)?\d{10}$/,
      "Enter a valid phone number (e.g., +91XXXXXXXXXX or 10 digits)"
    ),
  gstn: z
    .string()
    .min(1, "GSTN is required")
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Enter a valid GSTN (15 characters)"
    ),
  aadhar: z
    .string()
    .min(1, "Aadhar number is required")
    .regex(/^\d{12}$/, "Enter a valid 12-digit Aadhar number"),
  tradeLicense: z.string().min(5, "Please enter a valid license number"),
  subscriptionTier: z
    .enum(["free", "plus", "premium"])
    .refine((val) => val !== undefined, {
      message: "Please select a subscription tier",
    }),
  confirmAccuracy: z.literal(true, {
    message: "You must confirm the accuracy of the details",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const [submitted, setSubmitted] = React.useState<null | FormValues>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      businessName: "",
      businessAddress: "",
      businessDescription: "",
      providerType: undefined as any,
      branches: "1",
      staffStrength: "1-10",
      annualRevenue: "0-5",
      specialties: "",
      contactEmail: "",
      contactPhone: "",
      gstn: "",
      aadhar: "",
      tradeLicense: "",
      subscriptionTier: "free",
      confirmAccuracy: false as any,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setSubmitted(data);
    console.log("[Signup] submitted", data);
    // Simulate server response delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <main
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <div className="mx-auto mb-8 text-center">
        <div
          className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full"
          style={{ backgroundColor: LIME }}
        >
          <Building2 className="h-8 w-8 text-gray-900" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Provider Registration
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Join our network of service providers
        </p>
      </div>

      <section
        className="mx-auto w-full max-w-2xl rounded-2xl p-6 sm:p-8"
        style={{ backgroundColor: "white", border: `1px solid ${BORDER}` }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          {/* Email */}
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
              placeholder="your@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Provider Information */}
          <div className="pt-6 border-t" style={{ borderColor: BORDER }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Provider Information
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="businessName"
                  className="text-sm font-medium text-gray-700"
                >
                  Business / Salon Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your business name"
                  aria-invalid={!!errors.businessName}
                  aria-describedby={
                    errors.businessName ? "businessName-error" : undefined
                  }
                  className={
                    errors.businessName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("businessName")}
                />
                {errors.businessName && (
                  <p
                    id="businessName-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.businessName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="businessAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  Business / Salon Address{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="businessAddress"
                  placeholder="Complete address"
                  rows={3}
                  aria-invalid={!!errors.businessAddress}
                  aria-describedby={
                    errors.businessAddress ? "businessAddress-error" : undefined
                  }
                  className={
                    errors.businessAddress
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("businessAddress")}
                />
                {errors.businessAddress && (
                  <p
                    id="businessAddress-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.businessAddress.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="businessDescription"
                  className="text-sm font-medium text-gray-700"
                >
                  Business Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Overview of services and positioning"
                  rows={4}
                  aria-invalid={!!errors.businessDescription}
                  aria-describedby={
                    errors.businessDescription
                      ? "businessDescription-error"
                      : undefined
                  }
                  className={
                    errors.businessDescription
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("businessDescription")}
                />
                {errors.businessDescription && (
                  <p
                    id="businessDescription-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.businessDescription.message}
                  </p>
                )}
              </div>

              {/* Provider Type (radio) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Provider Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={watch("providerType")}
                  onValueChange={(val) =>
                    setValue(
                      "providerType",
                      val as FormValues["providerType"],
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="business"
                      id="business"
                      style={{ borderColor: LIME }}
                      className="data-[state=checked]:bg-[#CCF656] data-[state=checked]:border-[#CCF656] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CCF656]"
                    />
                    <Label
                      htmlFor="business"
                      className="font-normal cursor-pointer text-gray-700"
                    >
                      Business / Service Provider
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="individual"
                      id="individual"
                      style={{ borderColor: LIME }}
                      className="data-[state=checked]:bg-[#CCF656] data-[state=checked]:border-[#CCF656] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CCF656]"
                    />
                    <Label
                      htmlFor="individual"
                      className="font-normal cursor-pointer text-gray-700"
                    >
                      Individual Service Provider
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="supplier"
                      id="supplier"
                      style={{ borderColor: LIME }}
                      className="data-[state=checked]:bg-[#CCF656] data-[state=checked]:border-[#CCF656] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CCF656]"
                    />
                    <Label
                      htmlFor="supplier"
                      className="font-normal cursor-pointer text-gray-700"
                    >
                      Supplier
                    </Label>
                  </div>
                </RadioGroup>
                {errors.providerType && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.providerType.message}
                  </p>
                )}
              </div>

              {/* Grid for selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    No of Branches <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={watch("branches")}
                    onValueChange={(val) =>
                      setValue("branches", val as FormValues["branches"], {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.branches
                          ? "border-red-500 focus-visible:ring-red-500 w-full"
                          : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select number of branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="5-25">5-25</SelectItem>
                      <SelectItem value=">25">&gt;25</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.branches && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.branches.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Staff Strength <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={watch("staffStrength")}
                    onValueChange={(val) =>
                      setValue(
                        "staffStrength",
                        val as FormValues["staffStrength"],
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.staffStrength
                          ? "border-red-500 focus-visible:ring-red-500 w-full"
                          : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select staff strength" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="10-50">10-50</SelectItem>
                      <SelectItem value=">50">&gt;50</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.staffStrength && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.staffStrength.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 ">
                  <Label className="text-sm font-medium text-gray-700">
                    Annual Revenue <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={watch("annualRevenue")}
                    onValueChange={(val) =>
                      setValue(
                        "annualRevenue",
                        val as FormValues["annualRevenue"],
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.annualRevenue
                          ? "border-red-500 focus-visible:ring-red-500 w-full"
                          : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select annual revenue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">0 - 5 Lakhs</SelectItem>
                      <SelectItem value="5-10">5 - 10 Lakhs</SelectItem>
                      <SelectItem value=">10">&gt;10 Lakhs</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.annualRevenue && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.annualRevenue.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Specialties (optional) */}
              <div className="space-y-2">
                <Label
                  htmlFor="specialties"
                  className="text-sm font-medium text-gray-700"
                >
                  Specialties / Awards / Recognitions
                </Label>
                <Textarea
                  id="specialties"
                  placeholder="Certifications, awards, recognitions (optional)"
                  rows={3}
                  {...register("specialties")}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-6 border-t" style={{ borderColor: BORDER }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="contactEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="hello@yourdomain.com"
                  aria-invalid={!!errors.contactEmail}
                  aria-describedby={
                    errors.contactEmail ? "contactEmail-error" : undefined
                  }
                  className={
                    errors.contactEmail
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("contactEmail")}
                />
                {errors.contactEmail && (
                  <p
                    id="contactEmail-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contactPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+91XXXXXXXXXX"
                  aria-invalid={!!errors.contactPhone}
                  aria-describedby={
                    errors.contactPhone ? "contactPhone-error" : undefined
                  }
                  className={
                    errors.contactPhone
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("contactPhone")}
                />
                {errors.contactPhone && (
                  <p
                    id="contactPhone-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Legal Documents */}
          <div className="pt-6 border-t" style={{ borderColor: BORDER }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legal Documents
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="gstn"
                  className="text-sm font-medium text-gray-700"
                >
                  GSTN <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="gstn"
                  type="text"
                  placeholder="22AAAAA0000A1Z5"
                  aria-invalid={!!errors.gstn}
                  aria-describedby={errors.gstn ? "gstn-error" : undefined}
                  className={
                    errors.gstn
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("gstn", {
                    onChange: (e) =>
                      (e.target.value = e.target.value.toUpperCase()),
                  })}
                  maxLength={15}
                />
                {errors.gstn && (
                  <p
                    id="gstn-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.gstn.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="aadhar"
                  className="text-sm font-medium text-gray-700"
                >
                  Aadhar # <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="aadhar"
                  type="text"
                  placeholder="12-digit Aadhar number"
                  aria-invalid={!!errors.aadhar}
                  aria-describedby={errors.aadhar ? "aadhar-error" : undefined}
                  className={
                    errors.aadhar
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("aadhar", {
                    onChange: (e) =>
                      (e.target.value = e.target.value.replace(/\D/g, "")),
                  })}
                  maxLength={12}
                />
                {errors.aadhar && (
                  <p
                    id="aadhar-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.aadhar.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="tradeLicense"
                  className="text-sm font-medium text-gray-700"
                >
                  Trade License / Shops & Establishment License #{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tradeLicense"
                  type="text"
                  placeholder="Enter license number"
                  aria-invalid={!!errors.tradeLicense}
                  aria-describedby={
                    errors.tradeLicense ? "tradeLicense-error" : undefined
                  }
                  className={
                    errors.tradeLicense
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                  {...register("tradeLicense")}
                />
                {errors.tradeLicense && (
                  <p
                    id="tradeLicense-error"
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {errors.tradeLicense.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="pt-6 border-t" style={{ borderColor: BORDER }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Subscription Tier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Subscription Tier <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={watch("subscriptionTier")}
                  onValueChange={(val) =>
                    setValue(
                      "subscriptionTier",
                      val as FormValues["subscriptionTier"],
                      {
                        shouldValidate: true,
                      }
                    )
                  }
                >
                  <SelectTrigger
                    className={
                      errors.subscriptionTier
                        ? "border-red-500 focus-visible:ring-red-500 w-full"
                        : "w-full"
                    }
                  >
                    <SelectValue placeholder="Choose your current tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="plus">Plus - INR 499/PM</SelectItem>
                    <SelectItem value="premium">
                      Premium - INR 999/PM
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.subscriptionTier && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.subscriptionTier.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Confirmation checkbox */}
          <div className="pt-6 border-t" style={{ borderColor: BORDER }}>
            <div className="flex items-start gap-3">
              <Checkbox
                id="confirmAccuracy"
                checked={watch("confirmAccuracy") as boolean}
                onCheckedChange={(checked) =>
                  setValue("confirmAccuracy", Boolean(checked) as true, {
                    shouldValidate: true,
                  })
                }
                className="data-[state=checked]:bg-[#CCF656] data-[state=checked]:border-[#CCF656] data-[state=checked]:text-gray-900 mt-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CCF656]"
              />
              <Label
                htmlFor="confirmAccuracy"
                className="cursor-pointer font-normal leading-relaxed text-gray-700"
              >
                I confirm the above details are accurate and can be used for
                onboarding
                <span className="ml-1 text-red-500">*</span>
              </Label>
            </div>
            {errors.confirmAccuracy && (
              <p className="text-red-500 text-sm flex items-center gap-1 mt-2">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmAccuracy.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-12 rounded-lg text-base font-semibold disabled:opacity-50 inline-flex items-center justify-center"
              style={{ backgroundColor: LIME, color: "#111827" }}
            >
              {isSubmitting || isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner className="h-4 w-4 text-gray-900" />
                  Submitting...
                </span>
              ) : (
                "I agree and Submit"
              )}
            </button>

            {/* Already have an account? Sign in */}
            <div className="pt-4 text-center text-sm text-gray-600">
              {"Already have an account? "}
              <a
                href="/signin"
                className="text-gray-900 underline underline-offset-4 hover:text-gray-700"
              >
                Sign in
              </a>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
