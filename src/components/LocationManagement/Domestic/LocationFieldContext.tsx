import { createContext, useContext } from "react";

import type { UseLocationMachineReturn } from "./LocationFieldProvider";

// Context for state machine value
export const LocationFieldContext = createContext<{
  machine: UseLocationMachineReturn;
} | null>(null);

export const useLocationFieldContext = () => {
  const context = useContext(LocationFieldContext);
  if (!context) {
    throw new Error(
      "useLocationFieldContext must be used within LocationFieldProvider"
    );
  }
  return context.machine;
};

// Backward compatibility alias
export const useLocationFieldStateMachineContext = useLocationFieldContext;
