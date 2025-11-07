import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepButton from "./StepButton";

interface Step6Props {
  formData: any;
  updateFormData: any;
  getFieldError: any;
  prevStep: any;
  nextStep: any;
}

const SurveyFormStep6 = ({
  formData,
  updateFormData,
  getFieldError,
  prevStep,
  nextStep,
}: Step6Props) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 6 OF 7
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
          value={formData.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const numbersOnly = e.target.value.replace(/\D+/g, "");
            const formatted = numbersOnly.replace(
              /^(\d{3})(\d{3})(\d{4})$/,
              "($1) $2-$3",
            );
            updateFormData("phone", formatted);
          }}
          pattern="^\d{10}$"
          inputMode="numeric"
          maxLength={10}
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
            Company Name <span className="optional-label">(optional)</span>
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
          onValueChange={(value) => updateFormData("contactMethod", value)}>
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
          <Label className="text-[20px]">Are you the decision maker?</Label>
          <Select
            value={formData.decisionMaker}
            onValueChange={(value) => updateFormData("decisionMaker", value)}>
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
  );
};

export default SurveyFormStep6;
