"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  MapPin,
  Scissors,
  Users,
  Truck,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

// Zod validation schema
const vendorOnboardingSchema = z.object({
  // Section 1: Provider Information
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().optional(),
  providerType: z.enum(["business", "isp", "supplier"], {
    message: "Provider type is required",
  }),
  subscriptionTier: z.enum(["free", "plus", "premium"], {
    message: "Subscription tier is required",
  }),
  contactEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional(),

  // Section 2: Branch Information
  branchName: z.string().min(1, "Branch name is required"),
  branchAddress: z.string().min(1, "Branch address is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  serviceRadius: z.string().optional(),
  branchActive: z.boolean(),

  // Section 3: Services (optional)
  service1Name: z.string().optional(),
  service1Description: z.string().optional(),
  service1Duration: z.string().optional(),
  service1Price: z.string().optional(),
  service1CancellationFee: z.string().optional(),
  service1Active: z.boolean().optional(),

  service2Name: z.string().optional(),
  service2Description: z.string().optional(),
  service2Duration: z.string().optional(),
  service2Price: z.string().optional(),
  service2CancellationFee: z.string().optional(),
  service2Active: z.boolean().optional(),

  service3Name: z.string().optional(),
  service3Description: z.string().optional(),
  service3Duration: z.string().optional(),
  service3Price: z.string().optional(),
  service3CancellationFee: z.string().optional(),
  service3Active: z.boolean().optional(),

  // Section 4: Staff
  staff1FullName: z.string().min(1, "Staff 1 full name is required"),
  staff1Specialization: z.string().min(1, "Staff 1 specialization is required"),
  staff1Active: z.boolean(),

  staff2FullName: z.string().optional(),
  staff2Specialization: z.string().optional(),
  staff2Active: z.boolean().optional(),

  staff3FullName: z.string().optional(),
  staff3Specialization: z.string().optional(),
  staff3Active: z.boolean().optional(),

  // Section 5: Supplier Information (conditional)
  supplierBusinessName: z.string().optional(),
  supplierAddress: z.string().optional(),
  supplierContactEmail: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  supplierContactPhone: z.string().optional(),
  supplierActive: z.boolean().optional(),

  // Section 6: Declaration
  confirmAccuracy: z.boolean().refine((val) => val === true, {
    message: "You must confirm the accuracy of the details",
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type VendorOnboardingData = z.infer<typeof vendorOnboardingSchema>;

const steps = [
  { id: 1, title: "Provider Information", icon: Building2 },
  { id: 2, title: "Branch Information", icon: MapPin },
  { id: 3, title: "Services", icon: Scissors },
  { id: 4, title: "Staff", icon: Users },
  { id: 5, title: "Supplier Information", icon: Truck },
  { id: 6, title: "Declaration", icon: FileCheck },
];

export default function VendorOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<VendorOnboardingData>({
    resolver: zodResolver(vendorOnboardingSchema),
    defaultValues: {
      branchActive: true,
      staff1Active: true,
      service1Active: false,
      service2Active: false,
      service3Active: false,
      staff2Active: false,
      staff3Active: false,
      supplierActive: false,
      confirmAccuracy: false,
      agreeTerms: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;
  const watchedProviderType = watch("providerType");

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof VendorOnboardingData)[] => {
    switch (step) {
      case 1:
        return [
          "businessName",
          "providerType",
          "subscriptionTier",
          "contactEmail",
        ];
      case 2:
        return ["branchName", "branchAddress"];
      case 3:
        return []; // Services are optional
      case 4:
        return ["staff1FullName", "staff1Specialization"];
      case 5:
        return watchedProviderType === "supplier"
          ? ["supplierBusinessName", "supplierContactEmail"]
          : [];
      case 6:
        return ["confirmAccuracy", "agreeTerms"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: VendorOnboardingData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Vendor onboarding data:", data);
      setIsLoading(false);
      setIsSubmitted(true);

      toast.success("Application submitted successfully!");

      setTimeout(() => {
        setIsRedirecting(true);
        toast.info("Redirecting to dashboard...");

        // Simulate redirect after another 2 seconds
        setTimeout(() => {
          // In a real app, this would be: router.push('/dashboard')
          redirect("/dashboard");
          console.log("Redirecting to dashboard...");
          setIsRedirecting(false);
          setIsSubmitted(false);
          setCurrentStep(1);
          form.reset();
        }, 2000);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-lime-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isRedirecting ? "Redirecting..." : "Application Submitted!"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isRedirecting
                ? "Taking you to the dashboard..."
                : "Your vendor application has been submitted successfully. We'll review your information and get back to you soon."}
            </p>
            {isRedirecting && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-lime-500" />
              </div>
            )}
            {!isRedirecting && (
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  form.reset();
                }}
                className="bg-lime-500 hover:bg-lime-600"
              >
                Submit Another Application
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-lime-500" />
            Vendor Onboarding
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Complete all sections to register as a vendor partner
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-lime-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          {/* Step Indicators - Mobile Responsive */}
          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                    ${
                      isActive
                        ? "bg-lime-500 text-white"
                        : isCompleted
                        ? "bg-lime-100 text-lime-600"
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-xs text-center font-medium ${
                      isActive ? "text-lime-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Step Indicator */}
          <div className="sm:hidden">
            <div className="flex items-center gap-3">
              {steps.map((step) => {
                if (step.id === currentStep) {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-lime-500 text-white flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {step.title}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1: Provider Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-lime-500" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      Business / Salon Name *
                    </Label>
                    <Input
                      id="businessName"
                      {...register("businessName")}
                      placeholder="Enter your business name"
                      className={errors.businessName ? "border-red-500" : ""}
                    />
                    {errors.businessName && (
                      <p className="text-sm text-red-600">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="providerType">Provider Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("providerType", value as any)
                      }
                    >
                      <SelectTrigger
                        className={errors.providerType ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select provider type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="isp">ISP</SelectItem>
                        <SelectItem value="supplier">Supplier</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.providerType && (
                      <p className="text-sm text-red-600">
                        {errors.providerType.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">
                    Business Description
                  </Label>
                  <Textarea
                    id="businessDescription"
                    {...register("businessDescription")}
                    placeholder="Short overview of your services and positioning"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionTier">
                      Subscription Tier *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("subscriptionTier", value as any)
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.subscriptionTier ? "border-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Choose your current tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="plus">Plus</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subscriptionTier && (
                      <p className="text-sm text-red-600">
                        {errors.subscriptionTier.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register("contactEmail")}
                      placeholder="e.g., hello@yourdomain.com"
                      className={errors.contactEmail ? "border-red-500" : ""}
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-red-600">
                        {errors.contactEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    {...register("contactPhone")}
                    placeholder="e.g., +91-XXXXXXXXXX"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 2: Branch Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-lime-500" />
                  Branch Information
                </CardTitle>
                <p className="text-sm text-gray-600">Submit once per branch</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="branchName">Branch Name *</Label>
                    <Input
                      id="branchName"
                      {...register("branchName")}
                      placeholder="e.g., Lavanya Lounge - Koramangala"
                      className={errors.branchName ? "border-red-500" : ""}
                    />
                    {errors.branchName && (
                      <p className="text-sm text-red-600">
                        {errors.branchName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceRadius">Service Radius (km)</Label>
                    <Input
                      id="serviceRadius"
                      type="number"
                      {...register("serviceRadius")}
                      placeholder="Example: 10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branchAddress">Branch Address *</Label>
                  <Textarea
                    id="branchAddress"
                    {...register("branchAddress")}
                    placeholder="Enter complete branch address"
                    rows={3}
                    className={errors.branchAddress ? "border-red-500" : ""}
                  />
                  {errors.branchAddress && (
                    <p className="text-sm text-red-600">
                      {errors.branchAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      {...register("latitude")}
                      placeholder="Example: 12.9352"
                    />
                    <p className="text-xs text-gray-500">
                      Optional; numeric value
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      {...register("longitude")}
                      placeholder="Example: 77.6245"
                    />
                    <p className="text-xs text-gray-500">
                      Optional; numeric value
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="branchActive"
                    checked={watch("branchActive")}
                    onCheckedChange={(checked) =>
                      setValue("branchActive", checked)
                    }
                  />
                  <Label htmlFor="branchActive" className="font-medium">
                    Branch Active? *
                  </Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 3: Services */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-lime-500" />
                  Services for this Branch
                </CardTitle>
                <p className="text-sm text-gray-600">
                  All services are optional
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Service 1 */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Service 1 (optional)
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="service1Active"
                        checked={watch("service1Active")}
                        onCheckedChange={(checked) =>
                          setValue("service1Active", checked)
                        }
                      />
                      <Label htmlFor="service1Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service1Name">Service Name</Label>
                      <Input
                        id="service1Name"
                        {...register("service1Name")}
                        placeholder="Enter service name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service1Duration">
                        Duration (minutes)
                      </Label>
                      <Input
                        id="service1Duration"
                        type="number"
                        {...register("service1Duration")}
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service1Description">Description</Label>
                    <Textarea
                      id="service1Description"
                      {...register("service1Description")}
                      placeholder="Describe the service"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service1Price">Price (₹)</Label>
                      <Input
                        id="service1Price"
                        type="number"
                        {...register("service1Price")}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service1CancellationFee">
                        Cancellation Fee (₹)
                      </Label>
                      <Input
                        id="service1CancellationFee"
                        type="number"
                        {...register("service1CancellationFee")}
                        placeholder="e.g., 100"
                      />
                    </div>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Service 2 (optional)
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="service2Active"
                        checked={watch("service2Active")}
                        onCheckedChange={(checked) =>
                          setValue("service2Active", checked)
                        }
                      />
                      <Label htmlFor="service2Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service2Name">Service Name</Label>
                      <Input
                        id="service2Name"
                        {...register("service2Name")}
                        placeholder="Enter service name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service2Duration">
                        Duration (minutes)
                      </Label>
                      <Input
                        id="service2Duration"
                        type="number"
                        {...register("service2Duration")}
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service2Description">Description</Label>
                    <Textarea
                      id="service2Description"
                      {...register("service2Description")}
                      placeholder="Describe the service"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service2Price">Price (₹)</Label>
                      <Input
                        id="service2Price"
                        type="number"
                        {...register("service2Price")}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service2CancellationFee">
                        Cancellation Fee (₹)
                      </Label>
                      <Input
                        id="service2CancellationFee"
                        type="number"
                        {...register("service2CancellationFee")}
                        placeholder="e.g., 100"
                      />
                    </div>
                  </div>
                </div>

                {/* Service 3 */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Service 3 (optional)
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="service3Active"
                        checked={watch("service3Active")}
                        onCheckedChange={(checked) =>
                          setValue("service3Active", checked)
                        }
                      />
                      <Label htmlFor="service3Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service3Name">Service Name</Label>
                      <Input
                        id="service3Name"
                        {...register("service3Name")}
                        placeholder="Enter service name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service3Duration">
                        Duration (minutes)
                      </Label>
                      <Input
                        id="service3Duration"
                        type="number"
                        {...register("service3Duration")}
                        placeholder="e.g., 60"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service3Description">Description</Label>
                    <Textarea
                      id="service3Description"
                      {...register("service3Description")}
                      placeholder="Describe the service"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service3Price">Price (₹)</Label>
                      <Input
                        id="service3Price"
                        type="number"
                        {...register("service3Price")}
                        placeholder="e.g., 500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service3CancellationFee">
                        Cancellation Fee (₹)
                      </Label>
                      <Input
                        id="service3CancellationFee"
                        type="number"
                        {...register("service3CancellationFee")}
                        placeholder="e.g., 100"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Staff */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-lime-500" />
                  Staff for this Branch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Staff 1 - Required */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Staff Member 1
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="staff1Active"
                        checked={watch("staff1Active")}
                        onCheckedChange={(checked) =>
                          setValue("staff1Active", checked)
                        }
                      />
                      <Label htmlFor="staff1Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff1FullName">Full Name *</Label>
                      <Input
                        id="staff1FullName"
                        {...register("staff1FullName")}
                        placeholder="Enter full name"
                        className={
                          errors.staff1FullName ? "border-red-500" : ""
                        }
                      />
                      {errors.staff1FullName && (
                        <p className="text-sm text-red-600">
                          {errors.staff1FullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff1Specialization">
                        Specialization *
                      </Label>
                      <Input
                        id="staff1Specialization"
                        {...register("staff1Specialization")}
                        placeholder="e.g., Hair Stylist"
                        className={
                          errors.staff1Specialization ? "border-red-500" : ""
                        }
                      />
                      {errors.staff1Specialization && (
                        <p className="text-sm text-red-600">
                          {errors.staff1Specialization.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Staff 2 - Optional */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Staff Member 2 (optional)
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="staff2Active"
                        checked={watch("staff2Active")}
                        onCheckedChange={(checked) =>
                          setValue("staff2Active", checked)
                        }
                      />
                      <Label htmlFor="staff2Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff2FullName">Full Name</Label>
                      <Input
                        id="staff2FullName"
                        {...register("staff2FullName")}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff2Specialization">
                        Specialization
                      </Label>
                      <Input
                        id="staff2Specialization"
                        {...register("staff2Specialization")}
                        placeholder="e.g., Nail Technician"
                      />
                    </div>
                  </div>
                </div>

                {/* Staff 3 - Optional */}
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Staff Member 3 (optional)
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="staff3Active"
                        checked={watch("staff3Active")}
                        onCheckedChange={(checked) =>
                          setValue("staff3Active", checked)
                        }
                      />
                      <Label htmlFor="staff3Active" className="text-sm">
                        Active?
                      </Label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff3FullName">Full Name</Label>
                      <Input
                        id="staff3FullName"
                        {...register("staff3FullName")}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff3Specialization">
                        Specialization
                      </Label>
                      <Input
                        id="staff3Specialization"
                        {...register("staff3Specialization")}
                        placeholder="e.g., Massage Therapist"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 5: Supplier Information */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-lime-500" />
                  Supplier Information
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {watchedProviderType === "supplier"
                    ? "Complete this section as you are a supplier"
                    : "Skip if not a supplier"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {watchedProviderType === "supplier" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="supplierBusinessName">
                          Supplier Business Name
                        </Label>
                        <Input
                          id="supplierBusinessName"
                          {...register("supplierBusinessName")}
                          placeholder="Enter supplier business name"
                          className={
                            errors.supplierBusinessName ? "border-red-500" : ""
                          }
                        />
                        {errors.supplierBusinessName && (
                          <p className="text-sm text-red-600">
                            {errors.supplierBusinessName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supplierContactPhone">
                          Supplier Contact Phone
                        </Label>
                        <Input
                          id="supplierContactPhone"
                          {...register("supplierContactPhone")}
                          placeholder="e.g., +91-XXXXXXXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplierAddress">Supplier Address</Label>
                      <Textarea
                        id="supplierAddress"
                        {...register("supplierAddress")}
                        placeholder="Enter complete supplier address"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="supplierContactEmail">
                        Supplier Contact Email
                      </Label>
                      <Input
                        id="supplierContactEmail"
                        type="email"
                        {...register("supplierContactEmail")}
                        placeholder="e.g., supplier@domain.com"
                        className={
                          errors.supplierContactEmail ? "border-red-500" : ""
                        }
                      />
                      {errors.supplierContactEmail && (
                        <p className="text-sm text-red-600">
                          {errors.supplierContactEmail.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <Switch
                        id="supplierActive"
                        checked={watch("supplierActive")}
                        onCheckedChange={(checked) =>
                          setValue("supplierActive", checked)
                        }
                        className="data-[state=checked]:bg-lime-500 data-[state=unchecked]:bg-gray-200"
                      />
                      <Label htmlFor="supplierActive" className="font-medium">
                        Supplier Active?
                      </Label>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      This section is only required for suppliers. You can skip
                      to the next step.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Section 6: Declaration */}
          {currentStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-lime-500" />
                  Declaration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <Checkbox
                      id="confirmAccuracy"
                      checked={watch("confirmAccuracy")}
                      onCheckedChange={(checked) =>
                        setValue("confirmAccuracy", checked as boolean)
                      }
                      className={`mt-1 data-[state=checked]:bg-lime-500 data-[state=checked]:border-lime-500 ${
                        errors.confirmAccuracy ? "border-red-500" : ""
                      }`}
                    />
                    <div className="space-y-1 flex-1">
                      <Label
                        htmlFor="confirmAccuracy"
                        className="font-medium text-gray-900 leading-relaxed"
                      >
                        I confirm the above details are accurate and can be used
                        for onboarding. *
                      </Label>
                      {errors.confirmAccuracy && (
                        <p className="text-sm text-red-600">
                          {errors.confirmAccuracy.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <Checkbox
                      id="agreeTerms"
                      checked={watch("agreeTerms")}
                      onCheckedChange={(checked) =>
                        setValue("agreeTerms", checked as boolean)
                      }
                      className={`mt-1 data-[state=checked]:bg-lime-500 data-[state=checked]:border-lime-500 ${
                        errors.agreeTerms ? "border-red-500" : ""
                      }`}
                    />
                    <div className="space-y-1 flex-1">
                      <Label
                        htmlFor="agreeTerms"
                        className="font-medium text-gray-900 leading-relaxed"
                      >
                        I agree to the terms and conditions. *
                      </Label>
                      {errors.agreeTerms && (
                        <p className="text-sm text-red-600">
                          {errors.agreeTerms.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-lime-50 border border-lime-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Important:</strong> By submitting this form, you
                    acknowledge that all information provided is accurate and
                    complete. Any false information may result in rejection of
                    your application or termination of services.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-lime-500 hover:bg-lime-600 flex items-center gap-2 px-6"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-lime-500 hover:bg-lime-600 flex items-center gap-2 px-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        [data-state="checked"] {
          background-color: #84cc16 !important;
          border-color: #84cc16 !important;
        }

        .dark [data-state="checked"] {
          background-color: #84cc16 !important;
          border-color: #84cc16 !important;
        }
      `}</style>
    </div>
  );
}
