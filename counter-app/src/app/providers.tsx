"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

// Get the Convex URL from environment variables
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

// Preload connection immediately (outside of component)
const preloadConnection = async () => {
  try {
    // Preload both counter and actions data to establish connection
    await Promise.all([
      convex.query(api.counter.get),
      convex.query(api.counter.getActions)
    ]);
    console.log("Convex connection preloaded successfully");
  } catch (error) {
    // Connection errors are handled gracefully
    console.log("Preloading connection...", error);
  }
};

// Start preloading immediately when this module loads
preloadConnection();

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set up a connection health check
    const healthCheck = setInterval(async () => {
      try {
        await convex.query(api.counter.get);
      } catch (error) {
        console.log("Connection health check failed, attempting to reconnect...");
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(healthCheck);
  }, []);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
