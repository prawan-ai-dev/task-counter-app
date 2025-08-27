import { useState, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useOptimisticCounter() {
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const count = useQuery(api.counter.get) ?? 0;
  const actions = useQuery(api.counter.getActions) ?? [];
  
  const increment = useMutation(api.counter.increment);
  const decrement = useMutation(api.counter.decrement);
  const reset = useMutation(api.counter.reset);

  // Use optimistic count if available, otherwise use real count
  const displayCount = optimisticCount !== null ? optimisticCount : count;

  const handleIncrement = useCallback(async () => {
    if (isIncrementing) return; // Prevent multiple simultaneous calls
    
    setIsIncrementing(true);
    
    // Optimistic update
    setOptimisticCount(prev => (prev ?? count) + 1);
    
    try {
      await increment();
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticCount(null);
    } finally {
      setIsIncrementing(false);
      // Clear optimistic count after successful update
      setOptimisticCount(null);
    }
  }, [increment, count, isIncrementing]);

  const handleDecrement = useCallback(async () => {
    if (isDecrementing) return; // Prevent multiple simultaneous calls
    
    setIsDecrementing(true);
    
    // Optimistic update
    setOptimisticCount(prev => (prev ?? count) - 1);
    
    try {
      await decrement();
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticCount(null);
    } finally {
      setIsDecrementing(false);
      // Clear optimistic count after successful update
      setOptimisticCount(null);
    }
  }, [decrement, count, isDecrementing]);

  const handleReset = useCallback(async () => {
    if (isResetting) return; // Prevent multiple simultaneous calls
    
    setIsResetting(true);
    
    // Optimistic update
    setOptimisticCount(0);
    
    try {
      await reset();
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticCount(null);
    } finally {
      setIsResetting(false);
      // Clear optimistic count after successful update
      setOptimisticCount(null);
    }
  }, [reset, isResetting]);

  const isAnyPending = isIncrementing || isDecrementing || isResetting;

  return {
    count: displayCount,
    actions,
    handleIncrement,
    handleDecrement,
    handleReset,
    isIncrementing,
    isDecrementing,
    isResetting,
    isAnyPending,
  };
}
