import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
  type?: "pickup" | "delivery" | "driver";
}

interface MapComponentProps {
  locations: MapLocation[];
  center?: MapLocation;
  zoom?: number;
  showRoute?: boolean;
  className?: string;
  onLocationSelect?: (location: MapLocation) => void;
}

const MapComponent = ({
  locations,
  center,
  zoom = 13,
  showRoute = false,
  className = "h-96",
  onLocationSelect,
}: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [mapCenter, setMapCenter] = useState(
    center || locations[0] || { lat: 37.7749, lng: -122.4194 },
  );

  // In production, this would initialize Mapbox GL JS
  useEffect(() => {
    if (!mapRef.current) return;

    // Mapbox initialization would go here:
    /*
    mapboxgl.accessToken = 'your-mapbox-token';
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mapCenter.lng, mapCenter.lat],
      zoom: mapZoom
    });
    
    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker({
        color: getMarkerColor(location.type)
      })
      .setLngLat([location.lng, location.lat])
      .addTo(map);
    });
    
    // Add route if requested
    if (showRoute && locations.length >= 2) {
      // Use Mapbox Directions API to show route
    }
    */

    console.log("Map would initialize here with Mapbox GL JS");
  }, [locations, mapCenter, mapZoom, showRoute]);

  const getMarkerColor = (type?: string) => {
    switch (type) {
      case "pickup":
        return "#10B981"; // green
      case "delivery":
        return "#EF4444"; // red
      case "driver":
        return "#F59E0B"; // orange
      default:
        return "#6366F1"; // indigo
    }
  };

  const handleZoomIn = () => {
    setMapZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setMapZoom((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden ${className}`}
    >
      {/* Map Container - In production, Mapbox would render here */}
      <div ref={mapRef} className="w-full h-full relative">
        {/* Mock Map Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Mock Route Line */}
        {showRoute && locations.length >= 2 && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <path
              d="M80 100 Q200 150 320 220"
              stroke="#3e0074"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              opacity="0.7"
            />
          </svg>
        )}

        {/* Mock Location Markers */}
        {locations.map((location, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
            style={{
              top: `${30 + index * 30}%`,
              left: `${20 + index * 40}%`,
            }}
            onClick={() => onLocationSelect?.(location)}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: getMarkerColor(location.type) }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            {location.label && (
              <div className="mt-2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                {location.label}
              </div>
            )}
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white shadow-lg"
            onClick={handleZoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white shadow-lg"
            onClick={handleZoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white shadow-lg">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Mock Info Banner */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">
                {locations.length} location{locations.length !== 1 ? "s" : ""}
              </span>
              {showRoute && (
                <span className="text-gray-600 ml-2">• Route displayed</span>
              )}
            </div>
            <div className="text-xs text-gray-500">Zoom: {mapZoom}x</div>
          </div>
        </div>
      </div>

      {/* Development Notice */}
      <div className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 rounded-lg p-2 text-xs text-yellow-800">
        🚧 Mock Map - Mapbox integration ready
      </div>
    </div>
  );
};

export default MapComponent;
