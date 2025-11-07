// utils/detectLocation.ts

import axios from "axios";

export interface LocationResult {
  city: string;
  state: string;
  zipCode: string;
  formattedAddress: string;
  displayText: string; // For search input display
}

export const detectLocation = async (): Promise<LocationResult | null> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by this browser.");
      resolve(null);
      return;
    }

    // First, try to get the user's permission and location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

          if (!apiKey) {
            console.error("Google Maps API key not found");
            resolve(null);
            return;
          }

          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
              params: {
                latlng: `${lat},${lng}`,
                key: apiKey,
                result_type: "street_address|postal_code", // Focus on detailed results
              },
            },
          );

          const data = response.data;

          if (data.status === "OK" && data.results.length > 0) {
            const result = data.results[0];
            const components = result.address_components;

            // Extract location components
            const city = components.find(
              (c: any) =>
                c.types.includes("locality") ||
                c.types.includes("sublocality") ||
                c.types.includes("postal_town"),
            )?.long_name;

            const state = components.find((c: any) =>
              c.types.includes("administrative_area_level_1"),
            );

            const zipCode = components.find((c: any) =>
              c.types.includes("postal_code"),
            )?.long_name;

            const neighborhood = components.find(
              (c: any) =>
                c.types.includes("neighborhood") ||
                c.types.includes("sublocality_level_1"),
            )?.long_name;

            if (city && state && zipCode) {
              const locationResult: LocationResult = {
                city: city,
                state: state.short_name,
                zipCode: zipCode,
                formattedAddress: result.formatted_address,
                displayText: `${city}, ${state.short_name}`,
              };

              console.log("Location detected:", locationResult);
              resolve(locationResult);
            } else if (neighborhood && state && zipCode) {
              // Fallback to neighborhood if city not found
              const locationResult: LocationResult = {
                city: neighborhood,
                state: state.short_name,
                zipCode: zipCode,
                formattedAddress: result.formatted_address,
                displayText: `${neighborhood}, ${state.short_name}`,
              };

              console.log("Location detected (fallback):", locationResult);
              resolve(locationResult);
            } else {
              console.warn("Incomplete location data:", {
                city,
                state: state?.short_name,
                zipCode,
              });
              resolve(null);
            }
          } else {
            console.warn(
              "Geocoding API failed:",
              data.status,
              data.error_message,
            );
            resolve(null);
          }
        } catch (error) {
          console.error(
            "Error fetching location from Google Geocoding API:",
            error,
          );
          // Don't reject, just resolve null to allow graceful fallback
          resolve(null);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);

        // Provide user-friendly error messages
        let errorMessage = "Unable to detect location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        console.warn(errorMessage);
        resolve(null); // Resolve null instead of rejecting to allow graceful fallback
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 300000, // Cache for 5 minutes
      },
    );
  });
};

// Fallback function using IP-based location detection
export const detectLocationByIP = async (): Promise<LocationResult | null> => {
  try {
    // Using a free IP geolocation service as fallback
    const response = await axios.get("https://ipapi.co/json/");
    const data = response.data;

    if (data.city && data.region_code && data.postal) {
      const locationResult: LocationResult = {
        city: data.city,
        state: data.region_code,
        zipCode: data.postal,
        formattedAddress: `${data.city}, ${data.region_code} ${data.postal}, ${data.country_name}`,
        displayText: `${data.city}, ${data.region_code}`,
      };

      console.log("IP-based location detected:", locationResult);
      return locationResult;
    }

    return null;
  } catch (error) {
    console.error("IP-based location detection failed:", error);
    return null;
  }
};

// Combined function that tries GPS first, then falls back to IP
export const detectLocationWithFallback =
  async (): Promise<LocationResult | null> => {
    try {
      // Try GPS-based location first
      const gpsLocation = await detectLocation();
      if (gpsLocation) {
        return gpsLocation;
      }

      // Fallback to IP-based location
      console.log("GPS location failed, trying IP-based detection...");
      const ipLocation = await detectLocationByIP();
      return ipLocation;
    } catch (error) {
      console.error("All location detection methods failed:", error);
      return null;
    }
  };
