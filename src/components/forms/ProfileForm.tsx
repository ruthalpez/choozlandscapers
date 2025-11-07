"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import SurveyFormStep8 from "./SurveyForm/Step8";
import { Progress } from "../ui/progress";
import StepButton from "./SurveyForm/StepButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export interface ProfileFormData {
  projectType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  contactMethod?: string;
  decisionMaker?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  finalDetails?: string;
  agreeTerms?: boolean;
  contractorName?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const ProfileForm: React.FC<ProfileFormData> = ({ contractorName }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProfileFormData>({
    projectType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    contactMethod: "",
    decisionMaker: "",
    address: "",
    city: "",
    zipCode: "",
    finalDetails: "",
    agreeTerms: false,
    contractorName: contractorName,
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4; // Updated to reflect actual steps

  // Clear errors when step changes
  useEffect(() => {
    setErrors([]);
  }, [currentStep]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationError[] = [];

    switch (step) {
      case 1:
        if (!formData.projectType) {
          newErrors.push({
            field: "projectType",
            message: "Please select a project type",
          });
        }
        break;
      case 2:
        if (!formData.firstName) {
          newErrors.push({
            field: "firstName",
            message: "Please enter your first name",
          });
        }
        if (!formData.lastName) {
          newErrors.push({
            field: "lastName",
            message: "Please enter your last name",
          });
        }
        if (!formData.email) {
          newErrors.push({
            field: "email",
            message: "Please enter a valid email",
          });
        }
        if (!formData.phone) {
          newErrors.push({
            field: "phone",
            message: "Please enter your phone number",
          });
        }
        break;
      case 3:
        if (!formData.address) {
          newErrors.push({
            field: "address",
            message: "Please enter the street address",
          });
        }
        if (!formData.city) {
          newErrors.push({ field: "city", message: "Please enter the city" });
        }
        if (!formData.zipCode) {
          newErrors.push({
            field: "zipCode",
            message: "Please enter ZIP code",
          });
        }
        if (!formData.agreeTerms) {
          newErrors.push({
            field: "agreeTerms",
            message: "Please agree to the terms to continue",
          });
        }
        break;
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const calculateLeadScore = (data: ProfileFormData): number => {
    let score = 0;

    // Project type scoring
    if (data.projectType === "Commercial Property") score += 20;
    else if (data.projectType === "Both Interior & Exterior") score += 15;

    // Decision maker (commercial)
    if (data.decisionMaker === "yes") score += 10;

    return score;
  };

  const submitForm = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        source: "Chooz Landscapers Customer Lead Submission",
        timestamp: new Date().toISOString(),
        leadScore: calculateLeadScore(formData),
      };

      const response = await axios.post(
        "https://services.leadconnectorhq.com/hooks/7cYqror3AEq7gkrbEYQE/webhook-trigger/2246ad61-9bd6-4641-86b0-32f59fce13d0",
        submissionData,
      );

      if (!response.data) {
        throw new Error("Submission failed");
      }

      console.log("Form submitted:", submissionData);
      setCurrentStep(4); // Show success page
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find((error) => error.field === field)?.message;
  };

  const OptionCard: React.FC<{
    value: string;
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ value, selected, onClick, children }) => (
    <div
      className={`option-card ${selected ? "selected" : ""}`}
      onClick={onClick}>
      {children}
    </div>
  );

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-[#436bb3] text-white px-4 py-6 sm:p-8 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Get in touch with {contractorName}
        </h1>
        <div className="h-2 bg-white bg-opacity-30 rounded-full mt-5">
          <Progress value={progressPercentage} max={100} />
        </div>
      </div>

      <div className="px-4 py-6 sm:p-8 bg-white">
        {/* Step 1: Project Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-sm font-semibold text-[#fd4b00] mb-3">
              STEP 1 OF 3
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              What type of painting project do you need?
            </h2>

            <div className="grid gap-3">
              {[
                {
                  value: "Residential Interior",
                  label: "Residential Interior",
                },
                {
                  value: "Residential Exterior",
                  label: "Residential Exterior",
                },
                {
                  value: "Both Interior & Exterior",
                  label: "Both Interior & Exterior",
                },
                {
                  value: "Commercial Property",
                  label: "Commercial Property",
                },
                {
                  value: "Cabinets/Other",
                  label: "Cabinets/Other",
                },
              ].map((option) => (
                <OptionCard
                  key={option.value}
                  value={option.value}
                  selected={formData.projectType === option.value}
                  onClick={() => updateFormData("projectType", option.value)}>
                  <span className="text-lg">{option.label}</span>
                </OptionCard>
              ))}
            </div>

            {getFieldError("projectType") && (
              <div className="text-red-500 text-sm mt-2">
                {getFieldError("projectType")}
              </div>
            )}

            <StepButton nextStep={nextStep} label="Next" />
          </div>
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-sm font-semibold text-[#fd4b00] mb-3">
              STEP 2 OF 3
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              How can landscapers reach you?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group !mb-0">
                <Label className="text-[20px]">First Name</Label>
                <Input
                  className="text-input"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormData("firstName", e.target.value)
                  }
                />
                {getFieldError("firstName") && (
                  <div className="text-red-500 text-sm mt-1">
                    {getFieldError("firstName")}
                  </div>
                )}
              </div>
              <div className="input-group !mb-0">
                <Label className="text-[20px]">Last Name</Label>
                <Input
                  className="text-input"
                  required
                  placeholder="Smith"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormData("lastName", e.target.value)
                  }
                />
                {getFieldError("lastName") && (
                  <div className="text-red-500 text-sm mt-1">
                    {getFieldError("lastName")}
                  </div>
                )}
              </div>
            </div>

            <div className="input-group">
              <Label className="text-[20px]">Email</Label>
              <Input
                className="text-input"
                type="email"
                required
                placeholder="test@test.com"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData("email", e.target.value)
                }
              />
              {getFieldError("email") && (
                <div className="text-red-500 text-sm mt-1">
                  {getFieldError("email")}
                </div>
              )}
            </div>

            <div className="input-group">
              <Label className="text-[20px]">Phone</Label>
              <Input
                className="text-input"
                type="tel"
                required
                placeholder="(123) 345-7899"
                maxLength={10}
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const numbersOnly = e.target.value.replace(/\D+/g, "");
                  const formatted = numbersOnly.replace(
                    /^(\d{3})(\d{3})(\d{4})$/,
                    "($1) $2-$3",
                  );
                  updateFormData("phone", formatted);
                }}
              />
              {getFieldError("phone") && (
                <div className="text-red-500 text-sm mt-1">
                  {getFieldError("phone")}
                </div>
              )}
            </div>

            {formData.projectType === "Commercial Property" && (
              <div className="input-group">
                <Label className="text-[20px]">
                  Company Name{" "}
                  <span className="optional-label">(optional)</span>
                </Label>
                <Input
                  className="text-input"
                  placeholder="Company Name..."
                  value={formData.companyName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormData("companyName", e.target.value)
                  }
                />
              </div>
            )}

            <div className="input-group">
              <Label className="text-[20px]">Best way to contact</Label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) =>
                  updateFormData("contactMethod", value)
                }>
                <SelectTrigger className="text-input">
                  <SelectValue placeholder="Best way to contact" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.projectType === "Commercial Property" && (
              <div className="input-group">
                <Label className="text-[20px]">
                  Are you the decision maker?:
                </Label>
                <Select
                  value={formData.decisionMaker}
                  onValueChange={(value) =>
                    updateFormData("decisionMaker", value)
                  }>
                  <SelectTrigger className="text-input">
                    <SelectValue placeholder="Are you the decision maker?" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200">
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Part of team">Part of team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <StepButton prevStep={prevStep} nextStep={nextStep} label="Next" />
          </div>
        )}

        {/* Step 3: Property Location & Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-sm font-semibold text-[#fd4b00] mb-3">
              STEP 3 OF 3
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Where is the project?
            </h2>

            <div className="input-group">
              <Label className="text-[20px]">Street Address</Label>
              <Input
                className="text-input"
                required
                placeholder="4444 ABC Street"
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData("address", e.target.value)
                }
              />
              {getFieldError("address") && (
                <div className="text-red-500 text-sm mt-1">
                  {getFieldError("address")}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group !mb-0">
                <Label className="text-[20px]">City</Label>
                <Input
                  className="text-input"
                  placeholder="St. Louis"
                  value={formData.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormData("city", e.target.value)
                  }
                />
                {getFieldError("city") && (
                  <div className="text-red-500 text-sm mt-1">
                    {getFieldError("city")}
                  </div>
                )}
              </div>

              <div className="input-group !mb-0">
                <Label className="text-[20px]">ZIP Code</Label>
                <Input
                  className="text-input"
                  required
                  type="number"
                  placeholder="65656"
                  value={formData.zipCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateFormData("zipCode", e.target.value.slice(0, 5))
                  }
                />
                {getFieldError("zipCode") && (
                  <div className="text-red-500 text-sm mt-1">
                    {getFieldError("zipCode")}
                  </div>
                )}
              </div>
            </div>

            <div className="input-group">
              <Label className="text-[20px]">
                Final details <span className="optional-label">(optional)</span>
                :
              </Label>
              <Textarea
                className="text-input"
                placeholder="Specific colors in mind, access restrictions, preferred paint brands, must match existing paint, etc..."
                value={formData.finalDetails}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateFormData("finalDetails", e.target.value)
                }
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormData("agreeTerms", e.target.checked)
                }
                className="mt-1"
              />
              <label htmlFor="agreeTerms" className="text-[18px] text-gray-600">
                I agree to be contacted by up to 3 pre-screened local landscapers
                regarding my project
              </label>
            </div>

            {getFieldError("agreeTerms") && (
              <div className="text-red-500 text-sm">
                {getFieldError("agreeTerms")}
              </div>
            )}

            <StepButton
              prevStep={prevStep}
              nextStep={submitForm}
              label={isSubmitting ? "Submitting..." : "Submit Project Info"}
              noIcon
            />
          </div>
        )}

        {/* Success Page */}
        {currentStep === 4 && (
          <SurveyFormStep8
            additionalText={`Your request has been submitted successfully. You should expect to hear from ${contractorName} or a Chooz Landscapers representative soon.`}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
