import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star, AlertTriangle } from "lucide-react";
import { validateServiceArea, geocodeUKAddress } from "@/lib/geographicService";

interface Address {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  type?: "home" | "work" | "recent" | "prediction";
  isInServiceArea?: boolean;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: Address) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  recentAddresses?: Address[];
  savedAddresses?: Address[];
  validateServiceArea?: boolean;
}

const AddressAutocomplete = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = "Enter UK address",
  icon,
  className,
  recentAddresses = [],
  savedAddresses = [],
  validateServiceArea: enableValidation = true,
}: AddressAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock UK address predictions for Kingston upon Thames area
  const mockPredictions: Address[] = [
    {
      id: "1",
      address: "123 High Street",
      city: "Kingston upon Thames",
      state: "Surrey",
      zipCode: "KT1 1AA",
      type: "prediction",
      coordinates: { lat: 51.4085, lng: -0.3064 },
      isInServiceArea: true,
    },
    {
      id: "2",
      address: "456 London Road",
      city: "Kingston upon Thames",
      state: "Surrey",
      zipCode: "KT2 6QL",
      type: "prediction",
      coordinates: { lat: 51.4127, lng: -0.2939 },
      isInServiceArea: true,
    },
    {
      id: "3",
      address: "789 Portsmouth Road",
      city: "Surbiton",
      state: "Surrey",
      zipCode: "KT6 4QU",
      type: "prediction",
      coordinates: { lat: 51.3916, lng: -0.3053 },
      isInServiceArea: true,
    },
    {
      id: "4",
      address: "321 Kingston Road",
      city: "New Malden",
      state: "Surrey",
      zipCode: "KT3 3AB",
      type: "prediction",
      coordinates: { lat: 51.4006, lng: -0.2578 },
      isInServiceArea: true,
    },
    {
      id: "5",
      address: "567 Raynes Park High Street",
      city: "Raynes Park",
      state: "London",
      zipCode: "SW20 9DR",
      type: "prediction",
      coordinates: { lat: 51.4088, lng: -0.2292 },
      isInServiceArea: true,
    },
    {
      id: "6",
      address: "234 The Broadway",
      city: "Wimbledon",
      state: "London",
      zipCode: "SW19 1SD",
      type: "prediction",
      coordinates: { lat: 51.4214, lng: -0.2063 },
      isInServiceArea: true,
    },
  ];

  // Mock recent UK addresses
  const mockRecentAddresses: Address[] = [
    {
      id: "recent-1",
      address: "12 Market Place",
      city: "Kingston upon Thames",
      state: "Surrey",
      zipCode: "KT1 1JT",
      type: "recent",
      isInServiceArea: true,
    },
    {
      id: "recent-2",
      address: "78 Coombe Road",
      city: "Kingston upon Thames",
      state: "Surrey",
      zipCode: "KT2 7AF",
      type: "recent",
      isInServiceArea: true,
    },
  ];

  // Mock saved UK addresses
  const mockSavedAddresses: Address[] = [
    {
      id: "saved-1",
      address: "45 Elm Road",
      city: "Kingston upon Thames",
      state: "Surrey",
      zipCode: "KT2 6HH",
      type: "home",
      isInServiceArea: true,
    },
    {
      id: "saved-2",
      address: "78 Business Park",
      city: "New Malden",
      state: "Surrey",
      zipCode: "KT3 4EP",
      type: "work",
      isInServiceArea: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (newValue: string) => {
    onChange(newValue);

    if (newValue.length > 2) {
      setIsLoading(true);

      try {
        // Filter mock predictions based on input
        let filteredPredictions = mockPredictions.filter(
          (addr) =>
            addr.address.toLowerCase().includes(newValue.toLowerCase()) ||
            addr.city.toLowerCase().includes(newValue.toLowerCase()) ||
            addr.zipCode.toLowerCase().includes(newValue.toLowerCase()),
        );

        // If service area validation is enabled, check each address
        if (enableValidation) {
          const predictionsWithValidation = await Promise.all(
            filteredPredictions.map(async (addr) => {
              if (addr.coordinates) {
                const validation = validateServiceArea(
                  `${addr.address}, ${addr.city}, ${addr.zipCode}`,
                  addr.coordinates,
                );
                return {
                  ...addr,
                  isInServiceArea: validation.isValid,
                };
              }
              return addr;
            }),
          );
          filteredPredictions = predictionsWithValidation;
        }

        setPredictions(filteredPredictions);
        setIsOpen(true);
      } catch (error) {
        console.error("Address validation error:", error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setPredictions([]);
      setIsOpen(newValue.length === 0); // Show saved/recent when empty
    }
  };

  const handleAddressSelect = (address: Address) => {
    const fullAddress = `${address.address}, ${address.city}, ${address.state} ${address.zipCode}`;
    onChange(fullAddress);
    onAddressSelect?.(address);
    setIsOpen(false);
  };

  const getAddressIcon = (type?: string) => {
    switch (type) {
      case "home":
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            🏠
          </div>
        );
      case "work":
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            🏢
          </div>
        );
      case "recent":
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAddressLabel = (type?: string) => {
    switch (type) {
      case "home":
        return "Home";
      case "work":
        return "Work";
      case "recent":
        return "Recent";
      default:
        return "";
    }
  };

  const getAllAddresses = () => {
    if (value.length > 2) {
      return predictions;
    }

    // When input is empty or short, show saved and recent addresses
    return [
      ...mockSavedAddresses,
      ...(mockRecentAddresses.length > 0
        ? [
            {
              id: "divider",
              address: "Recent",
              city: "",
              state: "",
              zipCode: "",
              type: "divider",
            } as Address,
          ]
        : []),
      ...mockRecentAddresses,
    ];
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={`${icon ? "pl-10" : ""} ${className}`}
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-80 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-violet mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">
                  Searching addresses...
                </p>
              </div>
            ) : (
              <div className="py-2">
                {getAllAddresses().map((address) => {
                  if (address.type === "divider") {
                    return (
                      <div key={address.id} className="px-4 py-2 border-t">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {address.address}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={address.id}
                      onClick={() => handleAddressSelect(address)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getAddressIcon(address.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 truncate">
                              {address.address}
                            </p>
                            {address.type && address.type !== "prediction" && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                {getAddressLabel(address.type)}
                              </span>
                            )}
                            {enableValidation &&
                              address.isInServiceArea === false && (
                                <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded flex items-center">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Outside service area
                                </span>
                              )}
                            {enableValidation &&
                              address.isInServiceArea === true && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                                  ✓ Service available
                                </span>
                              )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {getAllAddresses().length === 0 && value.length > 2 && (
                  <div className="p-4 text-center">
                    <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No addresses found</p>
                    <p className="text-xs text-gray-500">
                      Try a different search term
                    </p>
                  </div>
                )}

                {value.length === 0 && getAllAddresses().length === 0 && (
                  <div className="p-4 text-center">
                    <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Start typing an address
                    </p>
                    <p className="text-xs text-gray-500">
                      We'll help you find the right location
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddressAutocomplete;
