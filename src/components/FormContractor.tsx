"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import ProfileForm from "./forms/ProfileForm";

interface FormContractorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contractorName: string;
}

const FormContractor = ({
  isOpen,
  setIsOpen,
  contractorName,
}: FormContractorProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[90vh] !max-w-xl p-0 gap-0 border-none overflow-y-auto">
        <DialogClose
          className="absolute top-3 right-3 cursor-pointer text-white"
          aria-label="Close">
          <X className="h-6 w-6" />
        </DialogClose>

        <DialogHeader className="hidden">
          <DialogTitle>Profile Form</DialogTitle>
        </DialogHeader>

        <ProfileForm contractorName={contractorName} />
      </DialogContent>
    </Dialog>
  );
};

export default FormContractor;
