import { Cookie, ChevronDown, ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type CookieType =
  | "essential"
  | "functional"
  | "advertising"
  | "performance"
  | "unclassified";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  advertising: boolean;
  performance: boolean;
  unclassified: boolean;
}

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: CookiePreferences;
  onPreferenceChange: (type: CookieType, checked: boolean) => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  onSave: () => void;
  acceptCookies: () => void;
}

const CookiePreferencesModal = ({
  open,
  onOpenChange,
  preferences,
  onPreferenceChange,
  expandedSections,
  toggleSection,
  onSave,
  acceptCookies,
}: CookiePreferencesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium font-poppins">
            Your Cookie Preferences
          </DialogTitle>
        </DialogHeader>
        <div className=" pb-4">
          <p className="text-xs text-muted-foreground">
            We use cookies to improve your experience on this website. You may
            choose which types of cookies to allow and change your preferences
            at any time. Disabling cookies may impact your experience on this
            website. You can learn more by viewing our{" "}
            <a href="/privacy-policy" className="underline text-blue-700">
              Cookie Policy
            </a>
            .
          </p>

          <div className="space-y-5 pt-4">
            {/* Essential Cookies */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="essential"
                checked={preferences.essential}
                disabled
                className="mt-3"
              />
              <div className="space-y-1">
                <label
                  htmlFor="essential"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <b>Essential Cookies</b> (0)
                </label>
                <p className="text-xs text-muted-foreground">
                  Cookies required to enable basic website functionality.
                </p>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start space-x-3 ">
              <Checkbox
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  onPreferenceChange("functional", checked === true)
                }
                className="mt-3"
              />
              <div className="space-y-1">
                <label
                  htmlFor="functional"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <b>Functional Cookies</b> (0)
                </label>
                <p className="text-xs text-muted-foreground">
                  Cookies that are used to enhance the functionality of the
                  website.
                </p>
              </div>
            </div>

            {/* Advertising Cookies */}
            <div className="">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="advertising"
                  checked={preferences.advertising}
                  onCheckedChange={(checked) =>
                    onPreferenceChange("advertising", checked === true)
                  }
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="advertising"
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <b>Advertising Cookies</b> (2)
                    </label>
                    <button
                      onClick={() => toggleSection("advertising")}
                      className="flex items-center text-xs text-primary underline cursor-pointer">
                      {expandedSections.advertising ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cookies used to deliver advertising that is more relevant to
                    your interests.
                  </p>
                </div>
              </div>
              {expandedSections.advertising && (
                <div className="mt-3 border-t pt-3 pl-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Google Ads</p>
                    <p className="text-xs text-muted-foreground">
                      Used for targeted advertising
                    </p>
                    <p className="text-xs font-medium">Facebook Pixel</p>
                    <p className="text-xs text-muted-foreground">
                      Used for tracking conversions from Facebook ads
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Performance Cookies */}
            <div className="flex items-start space-x-3 ">
              <Checkbox
                id="performance"
                checked={preferences.performance}
                onCheckedChange={(checked) =>
                  onPreferenceChange("performance", checked === true)
                }
                className="mt-3"
              />
              <div className="space-y-1">
                <label
                  htmlFor="performance"
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <b>Performance Cookies</b> (0)
                </label>
                <p className="text-xs text-muted-foreground">
                  Cookies used to understand how the website is being used.
                </p>
              </div>
            </div>

            {/* Unclassified Cookies */}
            <div className="">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="unclassified"
                  checked={preferences.unclassified}
                  onCheckedChange={(checked) =>
                    onPreferenceChange("unclassified", checked === true)
                  }
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="unclassified"
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <b>Unclassified</b> (2)
                    </label>
                    <button
                      onClick={() => toggleSection("unclassified")}
                      className="flex items-center text-xs text-primary underline cursor-pointer">
                      {expandedSections.unclassified ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cookies that have not yet been categorised.
                  </p>
                </div>
              </div>
              {expandedSections.unclassified && (
                <div className="mt-3 border-t pt-3 pl-8">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">_ga_random</p>
                    <p className="text-xs text-muted-foreground">
                      Purpose unknown
                    </p>
                    <p className="text-xs font-medium">_session_id</p>
                    <p className="text-xs text-muted-foreground">
                      Purpose unknown
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <button
            className="button-border text-sm rounded-full! px-4! py-2! font-bold! border-gray-300! cursor-pointer"
            onClick={onSave}>
            Save Preferences
          </button>
          <button
            className="button-primary rounded-full! px-4! py-2! cursor-pointer"
            onClick={acceptCookies}>
            Accept All Cookies
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferencesModal;
