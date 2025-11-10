"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import SurveyFormStep1 from "@/components/forms/SurveyForm/Step1";
import { Progress } from "@/components/ui/progress";
import SurveyFormStep8 from "@/components/forms/SurveyForm/Step8";
import SurveyFormStep7 from "@/components/forms/SurveyForm/Step7";
import SurveyFormStep6 from "@/components/forms/SurveyForm/Step6";
import SurveyFormStep5 from "@/components/forms/SurveyForm/Step5";
import SurveyFormStep4 from "@/components/forms/SurveyForm/Step4";
import SurveyFormStep3 from "@/components/forms/SurveyForm/Step3";
import SurveyFormStep2 from "@/components/forms/SurveyForm/Step2";

import BackgroundImage from "@/images/background/chooz_landscrapers_header-wallpaper.png";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

// Types
export interface FormData {
  projectType?: string;
  projectScopeResidentialInterior?: string;
  projectScopeResidentialExterior?: string;
  projectScopeBothInteriorExterior?: string;
  projectScopeCommercialProperty?: string;
  projectScopeCabinetsOther?: string;
  commercialSize?: string;
  projectDescription?: string;
  timeline?: string;
  urgentDescription?: string;
  workHours?: string;
  requirements?: string[];
  considerations?: string[];
  additionalRequirements?: string;
  budget?: string;
  budgetNotes?: string;
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
  multiLocations?: string;
  finalDetails?: string;
  agreeTerms?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

const PaintingQuoteForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const initialFormData: FormData = {
    projectType: "",
    projectScopeResidentialInterior: "",
    projectScopeResidentialExterior: "",
    projectScopeBothInteriorExterior: "",
    projectScopeCommercialProperty: "",
    projectScopeCabinetsOther: "",
    commercialSize: "",
    projectDescription: "",
    timeline: "",
    urgentDescription: "",
    workHours: "",
    requirements: [],
    considerations: [],
    additionalRequirements: "",
    budget: "",
    budgetNotes: "",
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
    multiLocations: "",
    finalDetails: "",
    agreeTerms: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 7;

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

  const updateArrayField = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = (prev[field as keyof FormData] as string[]) || [];
      if (checked) {
        // avoid accidental duplicates
        return {
          ...prev,
          [field]: currentArray.includes(value)
            ? currentArray
            : [...currentArray, value],
        };
      } else {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      }
    });
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
        if (formData.projectType === "Commercial Property") {
          if (!formData.projectScopeCommercialProperty) {
            newErrors.push({
              field: "projectScopeCommercialProperty",
              message: "Please select commercial property type",
            });
          }
          if (!formData.commercialSize) {
            newErrors.push({
              field: "commercialSize",
              message: "Please select property size",
            });
          }
        } else if (
          formData.projectType !== "other" &&
          !formData.projectScopeResidentialInterior &&
          !formData.projectScopeResidentialExterior &&
          !formData.projectScopeBothInteriorExterior &&
          !formData.projectScopeCommercialProperty &&
          !formData.projectScopeCabinetsOther
        ) {
          newErrors.push({
            field: "projectScopeResidentialInterior",
            message: "Please select project scope",
          });
        }
        break;
      case 3:
        if (!formData.timeline) {
          newErrors.push({
            field: "timeline",
            message: "Please select a timeline",
          });
        }
        break;
      case 5:
        if (!formData.budget) {
          newErrors.push({
            field: "budget",
            message: "Please select a budget range",
          });
        }
        break;
      case 6:
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
      case 7:
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

  const calculateLeadScore = (data: FormData): number => {
    let score = 0;

    // Timeline scoring
    if (data.timeline === "asap") score += 30;
    else if (data.timeline === "2-3-weeks") score += 20;
    else if (data.timeline === "month") score += 10;

    // Budget scoring
    if (data.budget === "over-25000") score += 30;
    else if (data.budget === "10000-25000") score += 25;
    else if (data.budget === "5000-10000") score += 20;
    else if (data.budget === "2000-5000") score += 10;

    // Project type scoring
    if (data.projectType === "Commercial Property") score += 20;
    else if (data.projectType === "Both Interior & Exterior") score += 15;

    // Decision maker (commercial)
    if (data.decisionMaker === "yes") score += 10;

    return score;
  };

  const submitForm = async () => {
    if (!validateStep(7)) return;

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        source: "choozlandscapers Concierge Form",
        timestamp: new Date().toISOString(),
        leadScore: calculateLeadScore(formData),
      };

      // TODO: Replace with your actual API endpoint
      const data = await axios.post(
        "https://services.leadconnectorhq.com/hooks/7cYqror3AEq7gkrbEYQE/webhook-trigger/927db1a6-0f8a-4d75-afe4-002ac2908cfd",
        submissionData,
      );

      if (!data) {
        throw new Error("Submission failed");
      }

      console.log("Form submitted:", submissionData);
      setCurrentStep(8); // Show success page
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

  const CheckboxItem: React.FC<{
    value: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: React.ReactNode;
  }> = ({ value, checked, onChange, children }) => (
    <div
      className={`cursor-pointer px-5! checkbox-item ${
        checked ? "checked" : ""
      }`}
      onClick={() => onChange(!checked)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        hidden
      />
      <label className="cursor-pointer">{children}</label>
    </div>
  );

  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleClose = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setErrors([]);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // Go to previous page
    } else {
      router.push("/"); // Fallback to homepage if no history
    }
  };

  return (
    <main className="primary-bg-gradient">
      <Image
        src={BackgroundImage}
        alt="Seamless black and white pattern featuring icons of lawn mowers, trees, street lamps, pliers, tractors, houses, and landscaping trucks representing home exterior services like landscaping and HVAC maintenance."
        priority
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="container xl:max-w-[1340px] mx-auto p-0 sm:py-20 relative z-10">
        <div className="max-w-2xl mx-auto sm:rounded-3xl overflow-hidden relative">
          <button
            onClick={handleBack}
            className="absolute top-3 right-3 cursor-pointer text-white"
            aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          {/* Header */}
          <div className="bg-[#436bb3] text-white px-4 py-8 sm:p-8 text-center">
            <h1 className="text-3xl font-bold mb-3">
              We Will Find & Contact The Best Landscapers For You
            </h1>
            <p className="opacity-90 text-lg">
              Answer a few questions to take advantage of this FREE service
            </p>
            <div className="h-2 bg-white bg-opacity-30 rounded-full mt-5">
              <Progress value={progressPercentage} max={100} />
            </div>
          </div>

          <div className="px-4 py-6 sm:p-8 bg-white">
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <SurveyFormStep1
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                getFieldError={getFieldError}
                OptionCard={OptionCard}
              />
            )}

            {/* Step 2: Project Scope */}
            {currentStep === 2 && (
              <SurveyFormStep2
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                getFieldError={getFieldError}
                OptionCard={OptionCard}
              />
            )}

            {/* Step 3: Timeline */}
            {currentStep === 3 && (
              <SurveyFormStep3
                formData={formData}
                updateFormData={updateFormData}
                nextStep={nextStep}
                prevStep={prevStep}
                getFieldError={getFieldError}
                OptionCard={OptionCard}
              />
            )}

            {/* Step 4: Special Requirements */}
            {currentStep === 4 && (
              <SurveyFormStep4
                formData={formData}
                updateFormData={updateFormData}
                prevStep={prevStep}
                nextStep={nextStep}
                CheckboxItem={CheckboxItem}
                updateArrayField={updateArrayField}
              />
            )}

            {/* Step 5: Budget */}
            {currentStep === 5 && (
              <SurveyFormStep5
                formData={formData}
                updateFormData={updateFormData}
                OptionCard={OptionCard}
                prevStep={prevStep}
                nextStep={nextStep}
                getFieldError={getFieldError}
              />
            )}

            {/* Step 6: Contact Information */}
            {currentStep === 6 && (
              <SurveyFormStep6
                formData={formData}
                updateFormData={updateFormData}
                prevStep={prevStep}
                nextStep={nextStep}
                getFieldError={getFieldError}
              />
            )}

            {/* Step 7: Property Location & Submit */}
            {currentStep === 7 && (
              <SurveyFormStep7
                formData={formData}
                updateFormData={updateFormData}
                getFieldError={getFieldError}
                prevStep={prevStep}
                submitForm={submitForm}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Success Page */}
            {currentStep === 8 && (
              <SurveyFormStep8 additionalText="You should expect to hear from a local painter soon." />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaintingQuoteForm;
