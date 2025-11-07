import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import React from "react";
import StepButton from "./StepButton";

interface Step5Props {
  formData: any;
  updateFormData: any;
  OptionCard: React.FC<any>;
  prevStep: any;
  nextStep: any;
  getFieldError: any;
}

const SurveyFormStep5 = ({
  formData,
  updateFormData,
  OptionCard,
  prevStep,
  nextStep,
  getFieldError,
}: Step5Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 5 OF 7
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Estimated budget range?
      </h2>

      <div className="grid gap-3">
        {[
          { value: "Under $2,000", label: "Under $2,000" },
          { value: "$2,000 - $5,000", label: "$2,000 - $5,000" },
          { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
          { value: "$10,000 - $25,000", label: "$10,000 - $25,000" },
          { value: "Over $25,000", label: "Over $25,000" },
          { value: "Not sure yet", label: "Not sure yet" },
        ].map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            selected={formData.budget === option.value}
            onClick={() => updateFormData("budget", option.value)}>
            <span>{option.label}</span>
          </OptionCard>
        ))}
      </div>

      <div className="input-group">
        <Label className="text-[20px]">
          Additional budget notes{" "}
          <span className="optional-label">(optional)</span>
        </Label>
        <Textarea
          className="text-input"
          placeholder="E.g., flexible if quality is right, insurance claim, etc."
          value={formData.budgetNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateFormData("budgetNotes", e.target.value)
          }
        />
      </div>

      {getFieldError("budget") && (
        <div className="text-red-500 text-sm">{getFieldError("budget")}</div>
      )}

      <StepButton prevStep={prevStep} nextStep={nextStep} label="Next" />
    </div>
  );
};

export default SurveyFormStep5;
