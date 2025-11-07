import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import StepButton from "./StepButton";

interface Step3Props {
  formData: any;
  updateFormData: any;
  nextStep: any;
  prevStep: any;
  getFieldError: any;
  OptionCard: React.FC<{
    value: string;
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }>;
}

const SurveyFormStep3 = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  getFieldError,
  OptionCard,
}: Step3Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 3 OF 7
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        When do you need this done?
      </h2>

      <div className="grid gap-3">
        {[
          { value: "ASAP (within a week)", label: "ASAP (within a week)" },
          { value: "Within 2-3 weeks", label: "Within 2-3 weeks" },
          { value: "Within a month", label: "Within a month" },
          { value: "Within 2-3 months", label: "Within 2-3 months" },
          { value: "Just getting quotes", label: "Just getting quotes" },
        ].map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            selected={formData.timeline === option.value}
            onClick={() => updateFormData("timeline", option.value)}>
            <span>{option.label}</span>
          </OptionCard>
        ))}
      </div>

      {formData.timeline === "ASAP (within a week)" && (
        <div className="input-group">
          <Label className="text-[20px]">
            What makes this urgent?{" "}
            <span className="optional-label">(optional)</span>
          </Label>
          <Textarea
            className="text-input"
            placeholder="E.g., selling home, water damage, event coming up..."
            value={formData.urgentDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateFormData("urgentDescription", e.target.value)
            }
          />
        </div>
      )}

      {formData.timeline === "ASAP (within a week)" &&
        formData.projectType === "Commercial Property" && (
          <Select
            value={formData.workHours || ""} // avoid undefined
            onValueChange={(value) => updateFormData("workHours", value)}>
            <SelectTrigger className="text-input !text-[20px]">
              <SelectValue placeholder="Can work be done during business hours?" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No - after hours only">
                No - after hours only
              </SelectItem>
              <SelectItem value="Weekends only">Weekends only</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        )}

      {getFieldError("timeline") && (
        <div className="text-red-500 text-sm">{getFieldError("timeline")}</div>
      )}

      <StepButton prevStep={prevStep} nextStep={nextStep} label="Next" />
    </div>
  );
};

export default SurveyFormStep3;
