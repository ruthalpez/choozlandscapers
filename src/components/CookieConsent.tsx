"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, LucideCookie } from "lucide-react";
import CookiePreferencesModal from "./CookiePreferencesModal";

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

const CookieConsent = () => {
  const [consentState, setConsentState] = useState<
    "visible" | "minimized" | "hidden"
  >("hidden");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    advertising: false,
    unclassified: false,
  });
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Essential cookies are always enabled
    functional: false,
    advertising: false,
    performance: false,
    unclassified: false,
  });

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      setConsentState("visible");
    } else {
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(savedPreferences);
        setConsentState("minimized");
      } catch (e) {
        // If there's an error parsing, use default preferences
        setConsentState("minimized");
      }
    }
  }, []);

  const acceptCookies = () => {
    savePreferences();
    setConsentState("minimized");
  };

  const reopenConsent = () => {
    setConsentState("visible");
  };

  const openPreferences = () => {
    setPreferencesOpen(true);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePreferenceChange = (type: CookieType, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: checked,
    }));
  };

  const savePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setPreferencesOpen(false);
    setConsentState("minimized");
  };

  if (consentState === "hidden") return null;

  if (consentState === "minimized") {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={reopenConsent}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-foreground shadow-lg transition-transform hover:scale-110 cursor-pointer"
            aria-label="Cookie settings">
            <Cookie className="h-6 w-6" />
          </button>
        </div>
        <CookiePreferencesModal
          open={preferencesOpen}
          onOpenChange={setPreferencesOpen}
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          onSave={savePreferences}
          acceptCookies={acceptCookies}
        />
      </>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-6">
        <div className="mx-auto w-full max-w-[370px]">
          <div className="rounded-full bg-white p-2 shadow-lg border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs flex items-center gap-3">
                  <LucideCookie />
                  <span>This website uses cookies</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  className="button-border text-xs rounded-full px-3 py-1 font-bold border-gray-300 cursor-pointer"
                  onClick={openPreferences}>
                  Preferences
                </button>
                <button
                  className="button-primary text-xs! rounded-full! px-3! py-1! font-bold! cursor-pointer"
                  onClick={acceptCookies}>
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CookiePreferencesModal
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        onSave={savePreferences}
        acceptCookies={acceptCookies}
      />
    </>
  );
};

export default CookieConsent;
