// Geographic service area validation for Kingston upon Thames and surrounding areas
export interface ServiceArea {
  center: {
    lat: number;
    lng: number;
    name: string;
  };
  radiusMiles: number;
  postcodes: string[];
}

export interface LocationValidationResult {
  isValid: boolean;
  distance?: number;
  message: string;
  nearestServicePoint?: string;
}

// Kingston upon Thames coordinates and service area definition
export const KINGSTON_SERVICE_AREA: ServiceArea = {
  center: {
    lat: 51.4085,
    lng: -0.3064,
    name: "Kingston upon Thames",
  },
  radiusMiles: 5,
  postcodes: [
    // Kingston upon Thames area postcodes
    "KT1",
    "KT2",
    "KT3",
    "KT4",
    "KT5",
    "KT6",
    "KT7",
    "KT8",
    "KT9",
    // Surrounding areas within 5 miles
    "SW15",
    "SW16",
    "SW19",
    "SW20",
    "TW1",
    "TW2",
    "TW9",
    "TW10",
    "TW11",
    "TW12",
    "CR0",
    "CR4",
    "CR5",
    "SM1",
    "SM2",
    "SM3",
    "SM4",
    "SM5",
    "SM6",
  ],
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Extract postcode from UK address string
 */
export function extractPostcode(address: string): string | null {
  // UK postcode regex pattern
  const postcodeRegex = /([A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[1].replace(/\s/g, "") : null;
}

/**
 * Get postcode area (first part) from full postcode
 */
export function getPostcodeArea(postcode: string): string {
  return postcode.replace(/[0-9].*/, "");
}

/**
 * Validate if an address is within the service area
 */
export function validateServiceArea(
  address: string,
  coordinates?: { lat: number; lng: number },
): LocationValidationResult {
  // First check postcode if available
  const postcode = extractPostcode(address);
  if (postcode) {
    const postcodeArea = getPostcodeArea(postcode);
    const isPostcodeValid = KINGSTON_SERVICE_AREA.postcodes.some((validArea) =>
      postcodeArea.startsWith(validArea),
    );

    if (isPostcodeValid) {
      return {
        isValid: true,
        message: "Address is within our service area.",
      };
    }
  }

  // If coordinates are provided, check distance
  if (coordinates) {
    const distance = calculateDistance(
      coordinates.lat,
      coordinates.lng,
      KINGSTON_SERVICE_AREA.center.lat,
      KINGSTON_SERVICE_AREA.center.lng,
    );

    if (distance <= KINGSTON_SERVICE_AREA.radiusMiles) {
      return {
        isValid: true,
        distance,
        message: `Address is ${distance.toFixed(1)} miles from ${KINGSTON_SERVICE_AREA.center.name}.`,
      };
    } else {
      return {
        isValid: false,
        distance,
        message: `Sorry, this address is ${distance.toFixed(1)} miles from ${KINGSTON_SERVICE_AREA.center.name}. We only serve areas within ${KINGSTON_SERVICE_AREA.radiusMiles} miles.`,
        nearestServicePoint: KINGSTON_SERVICE_AREA.center.name,
      };
    }
  }

  // If no postcode match and no coordinates
  return {
    isValid: false,
    message: postcode
      ? `The postcode ${postcode} is outside our service area. We currently serve Kingston upon Thames and surrounding areas within ${KINGSTON_SERVICE_AREA.radiusMiles} miles.`
      : "Please provide a valid UK address with postcode to check service availability.",
  };
}

/**
 * Mock geocoding function for UK addresses
 * In production, this would use Google Maps Geocoding API or similar
 */
export async function geocodeUKAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  // Mock geocoding based on common Kingston area locations
  const mockLocations: Record<string, { lat: number; lng: number }> = {
    // Kingston upon Thames center
    "kingston upon thames": { lat: 51.4085, lng: -0.3064 },
    kt1: { lat: 51.4085, lng: -0.3064 },
    kt2: { lat: 51.4127, lng: -0.2939 },

    // Surrounding areas
    surbiton: { lat: 51.3916, lng: -0.3053 },
    kt6: { lat: 51.3916, lng: -0.3053 },
    "new malden": { lat: 51.4006, lng: -0.2578 },
    kt3: { lat: 51.4006, lng: -0.2578 },
    "raynes park": { lat: 51.4088, lng: -0.2292 },
    sw20: { lat: 51.4088, lng: -0.2292 },
    wimbledon: { lat: 51.4214, lng: -0.2063 },
    sw19: { lat: 51.4214, lng: -0.2063 },
    putney: { lat: 51.4607, lng: -0.209 },
    sw15: { lat: 51.4607, lng: -0.209 },
    richmond: { lat: 51.4613, lng: -0.3037 },
    tw9: { lat: 51.4613, lng: -0.3037 },
    twickenham: { lat: 51.4486, lng: -0.3262 },
    tw1: { lat: 51.4486, lng: -0.3262 },
    merton: { lat: 51.4098, lng: -0.1951 },
    sm4: { lat: 51.4098, lng: -0.1951 },
  };

  const searchKey = address.toLowerCase();

  // Try to find a match in our mock data
  for (const [key, coords] of Object.entries(mockLocations)) {
    if (searchKey.includes(key)) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return coords;
    }
  }

  // Extract postcode and provide approximate coordinates
  const postcode = extractPostcode(address);
  if (postcode) {
    const postcodeArea = getPostcodeArea(postcode);
    const mockCoord = mockLocations[postcodeArea.toLowerCase()];
    if (mockCoord) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        lat: mockCoord.lat + (Math.random() - 0.5) * 0.01, // Add small random offset
        lng: mockCoord.lng + (Math.random() - 0.5) * 0.01,
      };
    }
  }

  return null;
}

/**
 * Check if a driver's location is valid for service
 */
export function validateDriverLocation(
  driverAddress: string,
  coordinates?: { lat: number; lng: number },
): LocationValidationResult {
  return validateServiceArea(driverAddress, coordinates);
}

/**
 * Get list of supported postcode areas
 */
export function getSupportedPostcodes(): string[] {
  return [...KINGSTON_SERVICE_AREA.postcodes];
}

/**
 * Format service area description for display
 */
export function getServiceAreaDescription(): string {
  return `We currently serve ${KINGSTON_SERVICE_AREA.center.name} and surrounding areas within ${KINGSTON_SERVICE_AREA.radiusMiles} miles, including postcodes: ${KINGSTON_SERVICE_AREA.postcodes.slice(0, 5).join(", ")} and more.`;
}
