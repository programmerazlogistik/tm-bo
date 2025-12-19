# Fake Page Module

A decoupled, modular fake page system for creating overlay pages with URL synchronization.

## Architecture

The module is structured with clear separation of concerns:

### Core Modules

- **`store.ts`** - Zustand state management with pure state logic
- **`types.ts`** - Centralized TypeScript interfaces
- **`use-fake-page.ts`** - Main consumer hook providing clean API
- **`use-url-sync.tsx`** - URL synchronization component (client-side only)
- **`fake-page.tsx`** - React component for rendering fake pages
- **`index.ts`** - Barrel exports for clean imports

### Key Decoupling Improvements

1. **State Management Separation**: Store contains only pure state logic
2. **URL Sync Isolation**: Router logic is completely separated and optional
3. **Component Decoupling**: UI component has no coupling to routing
4. **Type Safety**: Centralized types ensure consistency across modules
5. **Clean Exports**: Barrel exports provide clean public API

## Usage

```tsx
// In your layout or root component
import { FakePageSync } from "@muatmuat/lib/fake-page";
// In your component
import { FakePage, useFakePage } from "@muatmuat/lib/fake-page";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FakePageSync />
        <div id="app-layout">{children}</div>
        <div id="fake-page-portal" />
      </body>
    </html>
  );
}

function MyComponent() {
  const { next, back, close, isOpen, currentStep } = useFakePage();

  return (
    <div>
      <button onClick={() => next("step1")}>Open Step 1</button>

      <FakePage step="step1">
        <div>
          <h1>Step 1</h1>
          <button onClick={() => next("step2")}>Next</button>
          <button onClick={back}>Back</button>
          <button onClick={close}>Close</button>
        </div>
      </FakePage>

      <FakePage step="step2">
        <div>
          <h1>Step 2</h1>
          <button onClick={back}>Back</button>
          <button onClick={close}>Close</button>
        </div>
      </FakePage>
    </div>
  );
}
```

## API Reference

### `useFakePage()`

Returns an object with:

- `currentStep: string | null` - Currently active step
- `next: (step: string) => void` - Navigate to next step
- `back: () => void` - Go back to previous step
- `close: () => void` - Close fake page
- `isOpen: boolean` - Whether any fake page is open

### `FakePage` Component

Props:

- `step: string` - Step identifier
- `children: React.ReactNode` - Content to render
- `className?: string` - Additional CSS classes
- `hideMainContent?: boolean` - Hide main content when open (default: true)
- `containerId?: string` - Portal container ID (default: "fake-page-portal")
- `mainContentId?: string` - Main content element ID (default: "app-layout")

### `FakePageSync` Component

Required component that synchronizes state with URL parameters. Place in your root layout.

## URL Structure

The system automatically syncs with the `?step=` URL parameter:

- `?step=step1` - Shows step1 fake page
- No step parameter - No fake page shown
- Browser back/forward buttons work automatically

## Extensibility

The modular structure allows for:

- Custom state persistence strategies
- Alternative routing integrations
- Custom UI components
- Different animation systems
- Additional sync mechanisms
