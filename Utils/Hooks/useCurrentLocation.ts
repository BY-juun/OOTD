import { useEffect, useState } from "react";

type Location = { latitude: string; longitude: string };

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState("");
  const handleSuccess = (pos: any) => {
    const { latitude, longitude }: { latitude: string; longitude: string } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

export default useCurrentLocation;
