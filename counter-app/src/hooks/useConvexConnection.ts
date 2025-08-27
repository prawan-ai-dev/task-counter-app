import { useQuery } from "convex/react";
import { useState, useEffect, useMemo } from "react";
import { api } from "../../convex/_generated/api";

export function useConvexConnection() {
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a simple query to test connection
  const testQuery = useQuery(api.counter.get);
  
  // Memoize the connection status to avoid unnecessary re-renders
  const connectionState = useMemo(() => {
    if (testQuery !== undefined) {
      return { status: "connected" as const, loading: false };
    } else if (testQuery === null) {
      // Query returned null, but connection is working
      return { status: "connected" as const, loading: false };
    }
    return { status: "connecting" as const, loading: true };
  }, [testQuery]);

  useEffect(() => {
    setConnectionStatus(connectionState.status);
    setIsLoading(connectionState.loading);
  }, [connectionState]);

  const isConnected = connectionStatus === "connected";
  const isConnecting = connectionStatus === "connecting";

  return {
    connectionStatus,
    isConnected,
    isConnecting,
    isLoading,
  };
}
