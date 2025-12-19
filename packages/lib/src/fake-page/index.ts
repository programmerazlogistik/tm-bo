// Core store and state management
export { useFakePageStore } from "./store";
export type { FakePageState } from "./store";

// Types
export type { FakePageHookReturn, FakePageProps } from "./types";

// Main hook for consuming components
export { useFakePage } from "./use-fake-page";

// URL synchronization component
export { FakePageSearchParamsSync } from "./url-sync";

// Main fake page component
export { FakePage } from "./fake-page";

// Re-export sync component with simpler name for layout usage
export { FakePageSearchParamsSync as FakePageSync } from "./url-sync";
