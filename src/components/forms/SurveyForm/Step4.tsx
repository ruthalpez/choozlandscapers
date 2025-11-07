import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import React from "react";
import StepButton from "./StepButton";

interface Step4Props {
  formData: any;
  updateFormData: any;
  prevStep: any;
  nextStep: any;
  CheckboxItem: any;
  updateArrayField: any;
}

const SurveyFormStep4 = ({
  formData,
  updateFormData,
  prevStep,
  nextStep,
  CheckboxItem,
  updateArrayField,
}: Step4Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 4 OF 7
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {formData.projectType === "Commercial Property"
          ? "Any special requirements?"
          : "Any special considerations?"}
      </h2>

      <div className="space-y-3">
        {formData.projectType === "Commercial Property" ? (
          <>
            <CheckboxItem
              value="Need certificate of insurance"
              checked={
                formData.requirements?.includes(
                  "Need certificate of insurance",
                ) || false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "requirements",
                  "Need certificate of insurance",
                  checked,
                )
              }>
              Need certificate of insurance
            </CheckboxItem>
            <CheckboxItem
              value="Must work after hours"
              checked={
                formData.requirements?.includes("Must work after hours") ||
                false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "requirements",
                  "Must work after hours",
                  checked,
                )
              }>
              Must work after hours
            </CheckboxItem>
            <CheckboxItem
              value="Minimize disruption to customers"
              checked={
                formData.requirements?.includes(
                  "Minimize disruption to customers",
                ) || false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "requirements",
                  "Minimize disruption to customers",
                  checked,
                )
              }>
              Minimize disruption to customers
            </CheckboxItem>
            <CheckboxItem
              value="Multiple locations"
              checked={
                formData.requirements?.includes("Multiple locations") || false
              }
              onChange={(checked: boolean) =>
                updateArrayField("requirements", "Multiple locations", checked)
              }>
              Multiple locations
            </CheckboxItem>
          </>
        ) : (
          <>
            <CheckboxItem
              value="HOA approval needed"
              checked={
                formData.considerations?.includes("HOA approval needed") ||
                false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "considerations",
                  "HOA approval needed",
                  checked,
                )
              }>
              HOA approval needed
            </CheckboxItem>
            <CheckboxItem
              value="Someone home during day"
              checked={
                formData.considerations?.includes("Someone home during day") ||
                false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "considerations",
                  "Someone home during day",
                  checked,
                )
              }>
              Someone home during day
            </CheckboxItem>
            <CheckboxItem
              value="Need color consultation"
              checked={
                formData.considerations?.includes("Need color consultation") ||
                false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "considerations",
                  "Need color consultation",
                  checked,
                )
              }>
              Need color consultation
            </CheckboxItem>
            <CheckboxItem
              value="Pets in home"
              checked={
                formData.considerations?.includes("Pets in home") || false
              }
              onChange={(checked: boolean) =>
                updateArrayField("considerations", "Pets in home", checked)
              }>
              Pets in home
            </CheckboxItem>
            <CheckboxItem
              value="Need eco-friendly paint"
              checked={
                formData.considerations?.includes("Need eco-friendly paint") ||
                false
              }
              onChange={(checked: boolean) =>
                updateArrayField(
                  "considerations",
                  "Need eco-friendly paint",
                  checked,
                )
              }>
              Need eco-friendly paint
            </CheckboxItem>
          </>
        )}
      </div>

      <div className="input-group">
        <Label className="text-[20px]">
          Anything else we should know?{" "}
          <span className="optional-label">(optional)</span>
        </Label>
        <Textarea
          className="text-input"
          placeholder="Special requirements, concerns, or preferences..."
          value={formData.additionalRequirements}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateFormData("additionalRequirements", e.target.value)
          }
        />
      </div>

      <StepButton prevStep={prevStep} nextStep={nextStep} label="Next" />
    </div>
  );
};

export default SurveyFormStep4;
