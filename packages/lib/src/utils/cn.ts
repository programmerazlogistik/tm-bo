import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, any>;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs"],
    },
  },
});

/**
 * Utility function for merging Tailwind CSS classes with clsx.
 * Combines clsx and tailwind-merge for optimal class handling.
 * Resolves conflicts by giving priority to later classes.
 *
 * @param inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns Merged and optimized class string
 *
 * @example
 * cn("px-2 py-1", "px-4", { "bg-red-500": true, "bg-blue-500": false })
 * // Returns: "py-1 px-4 bg-red-500"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
