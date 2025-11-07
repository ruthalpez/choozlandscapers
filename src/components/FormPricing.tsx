import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormPricingProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  Form?: React.FC;
}

const FormPricing = ({ isOpen, setIsOpen, Form }: FormPricingProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 bg-[var(--clr-tertiary)] text-white border-none !max-w-[800px] w-[95%]">
        <DialogHeader className="p-0 gap-0">
          <DialogTitle></DialogTitle>
          <DialogDescription className="p-0 h-[90vh]">
            {Form && <Form />}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormPricing;
