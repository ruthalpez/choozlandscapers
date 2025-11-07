import React from "react";
import StepButton from "./StepButton";

interface Step1Props {
  formData: any;
  updateFormData: any;
  nextStep: any;
  getFieldError: any;
  OptionCard: React.FC<{
    value: string;
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }>;
}

const SurveyFormStep1 = ({
  formData,
  updateFormData,
  nextStep,
  getFieldError,
  OptionCard,
}: Step1Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 1 OF 7
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
  );
};

export default SurveyFormStep1;
