import { Check } from "lucide-react";
import React from "react";

interface Step8Props {
  additionalText?: string;
}

const SurveyFormStep8 = ({ additionalText }: Step8Props) => {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-[#fd9c5f] to-[#fd4b00] rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={40} className="text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
      <p className="text-xl text-gray-600 mb-3">
        Your request has been submitted successfully.
      </p>
      {additionalText && <p className="text-gray-500">{additionalText}</p>}
    </div>
  );
};

export default SurveyFormStep8;
