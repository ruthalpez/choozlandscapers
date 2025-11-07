import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import React from "react";
import StepButton from "./StepButton";

interface Step7Props {
  formData: any;
  updateFormData: any;
  getFieldError: any;
  prevStep: any;
  submitForm: any;
  isSubmitting: boolean;
}

const SurveyFormStep7 = ({
  formData,
  updateFormData,
  getFieldError,
  prevStep,
  submitForm,
  isSubmitting,
}: Step7Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 7 OF 7
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

      {formData.requirements?.includes("multiple-locations") && (
        <div className="input-group">
          <Label className="text-[20px]">
            Additional locations{" "}
            <span className="optional-label">(optional)</span>
          </Label>
          <Textarea
            className="text-input"
            placeholder="List any additional project locations..."
            value={formData.multiLocations}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateFormData("multiLocations", e.target.value)
            }
          />
        </div>
      )}

      <div className="input-group">
        <Label className="text-[20px]">
          Final details <span className="optional-label">(optional)</span>
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
          className="mt-1.5"
        />
        <label htmlFor="agreeTerms" className="text-[18px] text-gray-600">
          I agree to be contacted by up to 3 pre-screened landscapers regarding my
          project
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
        label={isSubmitting ? "Submitting..." : "Find Best Local Landscapers"}
        noIcon
      />
    </div>
  );
};

export default SurveyFormStep7;
