import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star } from "lucide-react";

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
}

const AddressAutocomplete = ({
  value,
  onChange,
  onAddressSelect,
  placeholder = "Enter address",
  icon,
  className,
  recentAddresses = [],
  savedAddresses = [],
}: AddressAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock address predictions (in production, would use Google Places API)
  const mockPredictions: Address[] = [
    {
      id: "1",
      address: "123 Market Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      type: "prediction",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: "2",
      address: "456 Valencia Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      type: "prediction",
      coordinates: { lat: 37.7599, lng: -122.4213 },
    },
    {
      id: "3",
      address: "789 Castro Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94114",
      type: "prediction",
      coordinates: { lat: 37.7609, lng: -122.435 },
    },
    {
      id: "4",
      address: "321 Mission Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      type: "prediction",
      coordinates: { lat: 37.7879, lng: -122.3972 },
    },
  ];

  // Mock recent addresses
  const mockRecentAddresses: Address[] = [
    {
      id: "recent-1",
      address: "555 Howard Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      type: "recent",
    },
    {
      id: "recent-2",
      address: "777 Folsom Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      type: "recent",
    },
  ];

  // Mock saved addresses
  const mockSavedAddresses: Address[] = [
    {
      id: "saved-1",
      address: "123 Home Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      type: "home",
    },
    {
      id: "saved-2",
      address: "456 Office Plaza",
      city: "San Francisco",
      state: "CA",
      zipCode: "94104",
      type: "work",
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

  const handleInputChange = (newValue: string) => {
    onChange(newValue);

    if (newValue.length > 2) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Filter mock predictions based on input
        const filteredPredictions = mockPredictions.filter(
          (addr) =>
            addr.address.toLowerCase().includes(newValue.toLowerCase()) ||
            addr.city.toLowerCase().includes(newValue.toLowerCase()),
        );
        setPredictions(filteredPredictions);
        setIsLoading(false);
        setIsOpen(true);
      }, 300);
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
