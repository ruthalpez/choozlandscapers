import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepButtonProps {
  prevStep?: () => void;
  nextStep: () => void;
  label: string;
  noIcon?: boolean;
}

const StepButton: React.FC<StepButtonProps> = ({
  prevStep,
  nextStep,
  label,
  noIcon,
}) => {
  return (
    <div className="flex gap-3 mt-8">
      {prevStep && (
        <button
          onClick={prevStep}
          className="cursor-pointer flex items-center justify-center gap-2 text-[22px] bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all">
          <ChevronLeft size={30} />
          Back
        </button>
      )}
      <button onClick={nextStep} className="button-gradient-orange">
        {label}
        {!noIcon && <ChevronRight size={30} />}
      </button>
    </div>
  );
};

export default StepButton;
