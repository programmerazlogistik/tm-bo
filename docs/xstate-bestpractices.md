# XState v5 + React + TypeScript Tutorial (Markdown)

## Overview

**Goal:** Build React apps with **XState v5** and **TypeScript**, using best practices, especially for **async API calls**.

**Key ideas:**

- Model UI as **finite state machines / statecharts**
- Use **`setup()`** and **strict typing** for context, events, and actors
- Use **`fromPromise`** for async work, with clear **loading / success / error** states
- Integrate machines into React with **`@xstate/react`** hooks

---

## 1. Setup: Packages and Basic Machine

Install:

```bash
npm install xstate @xstate/react
# or
yarn add xstate @xstate/react
```

Basic structure for XState v5 + TS:

```ts
// src/machines/toggleMachine.ts
import { createMachine, setup } from "xstate";

export const toggleMachine = setup({
  types: {
    context: {} as {}, // no context
    events: {} as { type: "TOGGLE" },
  },
}).createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        TOGGLE: "active",
      },
    },
    active: {
      on: {
        TOGGLE: "inactive",
      },
    },
  },
});
```

React usage:

```tsx
// src/components/Toggle.tsx
import { useMachine } from "@xstate/react";

import { toggleMachine } from "../machines/toggleMachine";

export function Toggle() {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send({ type: "TOGGLE" })}>
      {state.matches("inactive") ? "Turn on" : "Turn off"}
    </button>
  );
}
```

---

## 2. Typing Context and Events Correctly

The **`setup()`** call is the recommended way in v5 to define types.

Example: fetching a user profile:

```ts
// src/machines/userMachine.ts
import { createMachine, setup } from "xstate";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContext {
  user: User | null;
  error: string | null;
}

type UserEvents = { type: "FETCH" } | { type: "RETRY" };

export const userMachine = setup({
  types: {
    context: {} as UserContext,
    events: {} as UserEvents,
  },
}).createMachine({
  id: "user",
  initial: "idle",
  context: {
    user: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      // will add async invocation soon
    },
    success: {},
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
});
```

Using `setup.types` ensures **full TS inference** for `context`, `event`, and `state.matches`.

---

## 3. Async API Calls with `fromPromise` (Best Practice)

XState v5 encourages using **actors** and helpers like **`fromPromise`** for async.

### 3.1. Simple Fetch with `fromPromise`

```ts
// src/machines/userMachine.ts
import { createMachine, fromPromise, setup } from "xstate";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContext {
  user: User | null;
  error: string | null;
}

type UserEvents = { type: "FETCH" } | { type: "RETRY" };

const fetchUser = async (): Promise<User> => {
  const res = await fetch("/api/user");
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};

export const userMachine = setup({
  types: {
    context: {} as UserContext,
    events: {} as UserEvents,
  },
  actors: {
    fetchUserActor: fromPromise(async () => {
      return await fetchUser();
    }),
  },
}).createMachine({
  id: "user",
  initial: "idle",
  context: {
    user: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      invoke: {
        src: "fetchUserActor",
        onDone: {
          target: "success",
          actions: ({ event, context }) => {
            context.user = event.output;
            context.error = null;
          },
        },
        onError: {
          target: "failure",
          actions: ({ event, context }) => {
            context.error =
              event.error instanceof Error
                ? event.error.message
                : "Unknown error";
          },
        },
      },
    },
    success: {
      type: "final",
    },
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
});
```

**Notes:**

- `actors.fetchUserActor` is typed automatically from `fromPromise`.
- `onDone` receives `event.output` as the resolved value.
- `onError` receives `event.error`.

### 3.2. React Component for That Machine

```tsx
// src/components/UserProfile.tsx
import { useMachine } from "@xstate/react";

import { userMachine } from "../machines/userMachine";

export function UserProfile() {
  const [state, send] = useMachine(userMachine);

  if (state.matches("idle")) {
    return <button onClick={() => send({ type: "FETCH" })}>Load user</button>;
  }

  if (state.matches("loading")) {
    return <p>Loading user...</p>;
  }

  if (state.matches("failure")) {
    return (
      <div>
        <p>Error: {state.context.error}</p>
        <button onClick={() => send({ type: "RETRY" })}>Retry</button>
      </div>
    );
  }

  if (state.matches("success") && state.context.user) {
    const { user } = state.context;
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }

  return null;
}
```

---

## 4. Best Practices for Async Handling

### 4.1. Separate “command” from “effect”

- Components send **events** (`FETCH`, `RETRY`).
- Machines own **effects** (HTTP calls via `invoke`/`fromPromise`).
- Components do **not** call `fetch` directly.

This keeps async logic **testable, reusable, and predictable**.

### 4.2. Use Explicit States: `idle` / `loading` / `success` / `failure`

Avoid booleans like `isLoading`; instead, use state nodes:

- `idle` – nothing happening
- `loading` – pending
- `success` – loaded successfully
- `failure` – error and can retry

---

## 5. Example: Search with Debounced API and Proper Typing

Demonstrates:

- Context with query + results + error
- Debounced search via `after`
- Async actor with `fromPromise`
- React integration

```ts
// src/machines/searchMachine.ts
import { createMachine, fromPromise, setup } from "xstate";

interface SearchResult {
  id: string;
  title: string;
}

interface SearchContext {
  query: string;
  results: SearchResult[];
  error: string | null;
}

type SearchEvents =
  | { type: "CHANGE_QUERY"; query: string }
  | { type: "SEARCH" }
  | { type: "RETRY" };

const searchApi = async (query: string): Promise<SearchResult[]> => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Search failed");
  }
  return res.json();
};

export const searchMachine = setup({
  types: {
    context: {} as SearchContext,
    events: {} as SearchEvents,
  },
  actors: {
    searchActor: fromPromise(
      async ({ input }: { input: { query: string } }) => {
        return await searchApi(input.query);
      }
    ),
  },
}).createMachine({
  id: "search",
  initial: "idle",
  context: {
    query: "",
    results: [],
    error: null,
  },
  states: {
    idle: {
      on: {
        CHANGE_QUERY: {
          target: "debouncing",
          actions: ({ event, context }) => {
            context.query = event.query;
          },
        },
      },
    },
    debouncing: {
      after: {
        300: "searching", // debounce 300ms
      },
      on: {
        CHANGE_QUERY: {
          target: "debouncing",
          actions: ({ event, context }) => {
            context.query = event.query;
          },
        },
      },
    },
    searching: {
      invoke: {
        src: "searchActor",
        input: ({ context }) => ({ query: context.query }),
        onDone: {
          target: "success",
          actions: ({ event, context }) => {
            context.results = event.output;
            context.error = null;
          },
        },
        onError: {
          target: "failure",
          actions: ({ event, context }) => {
            context.error =
              event.error instanceof Error
                ? event.error.message
                : "Unknown error";
          },
        },
      },
    },
    success: {
      on: {
        CHANGE_QUERY: {
          target: "debouncing",
          actions: ({ event, context }) => {
            context.query = event.query;
          },
        },
      },
    },
    failure: {
      on: {
        RETRY: "searching",
        CHANGE_QUERY: {
          target: "debouncing",
          actions: ({ event, context }) => {
            context.query = event.query;
          },
        },
      },
    },
  },
});
```

React component:

```tsx
// src/components/SearchBox.tsx
import { useMachine } from "@xstate/react";

import { searchMachine } from "../machines/searchMachine";

export function SearchBox() {
  const [state, send] = useMachine(searchMachine);

  const { query, results, error } = state.context;

  return (
    <div>
      <input
        value={query}
        onChange={(e) => send({ type: "CHANGE_QUERY", query: e.target.value })}
        placeholder="Search..."
      />

      {state.matches("debouncing") && <p>Waiting...</p>}
      {state.matches("searching") && <p>Searching...</p>}
      {state.matches("failure") && (
        <div>
          <p>Error: {error}</p>
          <button onClick={() => send({ type: "RETRY" })}>Retry</button>
        </div>
      )}

      {results.length > 0 && (
        <ul>
          {results.map((r) => (
            <li key={r.id}>{r.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 6. Handling Multiple Async Calls with Parallel States

Example: load **user** and **settings** in parallel, show final UI when both done.

```ts
// src/machines/appLoaderMachine.ts
import { createMachine, fromPromise, setup } from "xstate";

interface User {
  id: string;
  name: string;
}

interface Settings {
  theme: "light" | "dark";
}

interface AppLoaderContext {
  user: User | null;
  settings: Settings | null;
}

type AppLoaderEvents = { type: "LOAD" } | { type: "RETRY" };

const fetchUser = async (): Promise<User> => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("User fetch failed");
  return res.json();
};

const fetchSettings = async (): Promise<Settings> => {
  const res = await fetch("/api/settings");
  if (!res.ok) throw new Error("Settings fetch failed");
  return res.json();
};

export const appLoaderMachine = setup({
  types: {
    context: {} as AppLoaderContext,
    events: {} as AppLoaderEvents,
  },
  actors: {
    userActor: fromPromise(async () => fetchUser()),
    settingsActor: fromPromise(async () => fetchSettings()),
  },
}).createMachine({
  id: "appLoader",
  initial: "idle",
  context: {
    user: null,
    settings: null,
  },
  states: {
    idle: {
      on: {
        LOAD: "loading",
      },
    },
    loading: {
      type: "parallel",
      states: {
        user: {
          initial: "pending",
          states: {
            pending: {
              invoke: {
                src: "userActor",
                onDone: {
                  target: "success",
                  actions: ({ event, context }) => {
                    context.user = event.output;
                  },
                },
                onError: "failure",
              },
            },
            success: { type: "final" },
            failure: {},
          },
        },
        settings: {
          initial: "pending",
          states: {
            pending: {
              invoke: {
                src: "settingsActor",
                onDone: {
                  target: "success",
                  actions: ({ event, context }) => {
                    context.settings = event.output;
                  },
                },
                onError: "failure",
              },
            },
            success: { type: "final" },
            failure: {},
          },
        },
      },
      onDone: "ready",
    },
    ready: {
      type: "final",
    },
  },
});
```

React usage:

```tsx
// src/components/AppLoader.tsx
import { useMachine } from "@xstate/react";

import { appLoaderMachine } from "../machines/appLoaderMachine";

export function AppLoader() {
  const [state, send] = useMachine(appLoaderMachine);

  if (state.matches("idle")) {
    return (
      <button onClick={() => send({ type: "LOAD" })}>Initialize app</button>
    );
  }

  if (state.matches("loading")) {
    return <p>Loading user and settings...</p>;
  }

  if (state.matches("ready")) {
    const { user, settings } = state.context;
    return (
      <div>
        <h1>Welcome, {user?.name}</h1>
        <p>Theme: {settings?.theme}</p>
      </div>
    );
  }

  return null;
}
```

---

## 7. Using `useSelector` and `useActor` for Performance

To avoid re-rendering on unrelated context changes, use **`useSelector`**.

```tsx
// src/components/OptimizedUserProfile.tsx
import { useMachine, useSelector } from "@xstate/react";

import { userMachine } from "../machines/userMachine";

export function OptimizedUserProfile() {
  const [state, send] = useMachine(userMachine);

  const user = useSelector(state, (s) => s.context.user);
  const error = useSelector(state, (s) => s.context.error);
  const isLoading = useSelector(state, (s) => s.matches("loading"));

  return (
    <div>
      <button onClick={() => send({ type: "FETCH" })}>Reload user</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
```

For spawned child machines/actors, use **`useActor`**:

```tsx
// pseudo-example
const [childSnapshot, childSend] = useActor(childRef);
```

---

## 8. Organizing Machines and React Code

Suggested structure:

```text
src/
  machines/
    userMachine.ts
    searchMachine.ts
    appLoaderMachine.ts
  components/
    UserProfile.tsx
    SearchBox.tsx
    AppLoader.tsx
  hooks/
    useUserMachine.ts
```

Example custom hook:

```ts
// src/hooks/useUserMachine.ts
import { useMachine } from "@xstate/react";

import { userMachine } from "../machines/userMachine";

export function useUserMachine() {
  const [state, send] = useMachine(userMachine);
  return {
    state,
    send,
    user: state.context.user,
    error: state.context.error,
    isIdle: state.matches("idle"),
    isLoading: state.matches("loading"),
    isFailure: state.matches("failure"),
    isSuccess: state.matches("success"),
  };
}
```

Use in React:

```tsx
// src/components/UserProfile.tsx
import { useUserMachine } from "../hooks/useUserMachine";

export function UserProfile() {
  const { user, error, isIdle, isLoading, isFailure, isSuccess, send } =
    useUserMachine();

  if (isIdle) {
    return <button onClick={() => send({ type: "FETCH" })}>Load</button>;
  }

  if (isLoading) return <p>Loading...</p>;

  if (isFailure) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => send({ type: "RETRY" })}>Retry</button>
      </div>
    );
  }

  if (isSuccess && user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }

  return null;
}
```

---

## 9. Error Handling and Retry Best Practices

- Use **separate states** for transient errors vs fatal ones if needed.
- Keep API errors in **context** (`error: string | null`).
- For retry:

```ts
failure: {
  on: {
    RETRY: 'loading',
  },
},
```

Optional exponential backoff can be represented with **retry counters** in context and timeouts (`after`).

---

## 10. Summary of XState v5 + React + TS Best Practices

- Use **`setup()`** and `types.context` / `types.events` for strict TypeScript.
- Handle async work with **`fromPromise`** + `invoke`, keeping side effects in the machine.
- Model async flows with explicit states: **`idle` → `loading` → `success` / `failure`**.
- For React:
  - Use **`useMachine`** in container components.
  - Use **`useSelector`** to optimize performance.
  - Wrap in custom hooks for reuse and cleaner components.
- For complex flows:
  - Use **parallel states** for independent async calls.
  - Use **`after`** and internal events for debouncing, timeouts, etc.

If you share your exact use case (e.g., form submission, CRUD list, wizard), the tutorial can be extended with a specific, fully-typed machine and React component tailored to it.
