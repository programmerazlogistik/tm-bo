# API Integration Service Generator Instructions

## Purpose

Generate a new API service following the project's established patterns for API integration using SWR hooks (useSWR for GET requests, useSWRMutation for POST/PUT/DELETE/PATCH).

## Input Requirements

### Option 1: User provides API Documentation in Markdown

The user will provide a structured markdown documentation with the following sections:

- **Endpoint**: HTTP Method and URL path
- **Parameters**: Query/Path/Body parameters with types and descriptions
- **Request Headers**: Required headers
- **Response Success**: Example success response with data structure
- **Error Responses**: All possible error responses (400, 401, 403, 404, 500, etc.)

Example:

```markdown
# Get Contract Requests List

## Endpoint

`GET /v1/international/buyer/contract-requests`

## Parameters

### Query Parameters

| Parameter | Tipe    | Wajib | Default | Deskripsi     |
| --------- | ------- | ----- | ------- | ------------- |
| status    | string  | Tidak | "all"   | Filter status |
| page      | integer | Tidak | 1       | Nomor halaman |

## Response Success (200 OK)

{
"Message": { "Code": 200, "Text": "Success" },
"Data": { ... }
}

## Error Responses

### 400 Bad Request

{
"Message": { "Code": 400, "Text": "Invalid parameters" },
"Data": { "errors": [...] }
}
```

### Option 2: User provides a cURL command

The user will provide a cURL command for the API endpoint. Example:

```bash
curl --request POST \
  --url https://apimparts-international-az.assetlogistik.com/v1/international/buyer/orders/shipping-cost \
  --header 'Authorization: ' \
  --header 'Content-Type: application/json' \
  --header 'languageid: en' \
  --data '{
  "sellerId": "ccb7e40b-b23e-443a-8838-231f648100e5",
  "destinationAddressId": 4885,
  "products": [
    {
      "id": "52dc14d2-a819-4d33-8bb9-0a7efa358316",
      "variantId": "72030b0d-7081-49fa-a5e6-57b62e0adef2",
      "qty": 1
    }
  ]
}'
```

### Option 3: (Optional) User provides success response example

For one-way endpoints (PUT, DELETE, etc.) where testing might be difficult, user may provide a success response example.

## Generation Steps

### Step 1: Extract Information from Input

**For Markdown Documentation Input:**

Extract from the markdown:

- **HTTP Method** and **Endpoint Path** (from `## Endpoint` section)
- **Query/Path/Body Parameters** (from `## Parameters` section)
- **Success Response Structure** (from `## Response Success` section)
- **Error Response Structures** (from `## Error Responses` section)
- **Which fetcher to use**:
  - **Default**: Use `fetcherMPPInter` unless the user explicitly requests a different fetcher
  - Only use other fetchers if user specifically mentions:
    - `fetcherMuatparts` for muatparts API
    - `fetcherInternal` for internal API
    - `fetcherMuatrans` for muatrans API
    - `fetcherPayment` for payment API

**For cURL Command Input:**

Extract from the cURL command:

- **HTTP Method** (GET, POST, PUT, DELETE, PATCH)
- **Endpoint URL** and path
- **Request payload structure** (from --data)
- **Which fetcher to use**:
  - **Default**: Use `fetcherMPPInter` unless the user explicitly requests a different fetcher
  - Only use other fetchers if user specifically mentions:
    - `fetcherMuatparts` for muatparts API
    - `fetcherInternal` for internal API
    - `fetcherMuatrans` for muatrans API
    - `fetcherPayment` for payment API

### Step 2: Test the Endpoint (RECOMMENDED for cURL)

**For cURL inputs**, run the command first to get actual API response structure:

```bash
# Execute the cURL command provided by the user
curl --request [METHOD] \
  --url [ENDPOINT_URL] \
  --header 'Content-Type: application/json' \
  --data '[PAYLOAD]'
```

**For Markdown documentation inputs**, skip testing and use the provided response examples directly.

If the endpoint requires authentication or cannot be tested:

- Use the provided success response example
- Create realistic mock data based on the response structure

### Step 3: Determine Service Location

Ask user where to create the service:

- **For Global/shared services**: Under `/src/services/Global/[Folder]/` (e.g., Checkout, Garage, Voucher, etc.)
- **For page-specific services**: Under `/src/services/[PageName]/` (e.g., Home, Cart, Product, etc.)
- Suggest creating a new folder if the category doesn't exist
- Service file should be named:
  - **GET requests**: `useGet[Entity].js` (e.g., `useGetBuyerBanners.js`, `useGetHomePageData.js`)
  - **POST requests**: `usePost[Entity].js` or `useCreate[Entity].js` (e.g., `usePostShippingCost.js`, `useCreateGarage.js`)
  - **PUT requests**: `usePut[Entity].js` or `useUpdate[Entity].js` (e.g., `useUpdateProfile.js`)
  - **DELETE requests**: `useDelete[Entity].js` (e.g., `useDeleteGarage.js`)
  - **PATCH requests**: `usePatch[Entity].js` or `useUpdate[Entity].js` (e.g., `useUpdateOrderStatus.js`)

### Step 4: Generate Service File

Create a service file following the appropriate pattern based on HTTP method:

## Pattern A: GET Requests (useSWR)

```javascript
import useSWR from "swr";

import { [FETCHER_NAME] } from "@/lib/axios";

const USE_MOCK = false;
const API_ENDPOINT = "[ENDPOINT_PATH]";

// --- Constants ---

/**
 * Valid values for [parameter_name] (if applicable)
 * Example: Valid status values, sort values, etc.
 */
const VALID_[PARAMETER_NAMES] = [
  "value1",
  "value2",
  // ... all valid values from API documentation
];

/**
 * Default parameters
 */
const DEFAULT_PARAMS = {
  // Set defaults based on API documentation
  paramName: "defaultValue",
  page: 1,
  limit: 10,
  // ... other defaults
};

/**
 * Maximum/minimum limits (if applicable)
 */
const MAX_LIMIT = 50; // Adjust based on API documentation
const MIN_SEARCH_LENGTH = 3; // Minimum characters for search

// --- JSDoc Type Definitions ---

/**
 * @typedef {Object} [EntityType]
 * @property {type} field - Description
 * // ... all entity fields with types and descriptions
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message - API message object
 * @property {number} Message.Code - Response status code
 * @property {string} Message.Text - Response message text
 * @property {[EntityType]|[EntityType][]} Data - Response data (array or single object)
 * @property {string} Type - API response type
 */

/**
 * @typedef {Object} APIError
 * @property {Object} Message - Error message object
 * @property {number} Message.Code - Error status code
 * @property {string} Message.Text - Error message text
 * @property {Object} [Data] - Optional error data
 * @property {Array<{field: string, message: string}>} [Data.errors] - Validation errors
 * @property {string} Type - API error type
 */

// --- Utility Functions ---

/**
 * Validates and sanitizes query parameters
 * @param {Object} params - Raw parameters from user
 * @returns {Object} Sanitized and validated parameters
 */
const validateAndSanitizeParams = (params) => {
  if (!params || typeof params !== "object") {
    return { ...DEFAULT_PARAMS };
  }

  const sanitized = { ...DEFAULT_PARAMS };

  // Validate each parameter based on API requirements
  // Example for status filter:
  if (params.status && typeof params.status === "string") {
    if (VALID_STATUSES.includes(params.status)) {
      sanitized.status = params.status;
    }
  }

  // Example for page number:
  if (params.page && typeof params.page === "number" && params.page > 0) {
    sanitized.page = Math.floor(params.page);
  } else if (params.page && typeof params.page === "string") {
    const pageNum = parseInt(params.page, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      sanitized.page = pageNum;
    }
  }

  // Example for limit:
  if (params.limit && typeof params.limit === "number" && params.limit > 0) {
    sanitized.limit = Math.min(Math.floor(params.limit), MAX_LIMIT);
  }

  // Example for search (minimum length validation):
  if (params.search && typeof params.search === "string") {
    const trimmedSearch = params.search.trim();
    if (trimmedSearch.length >= MIN_SEARCH_LENGTH) {
      sanitized.search = trimmedSearch;
    }
  }

  // Example for date validation:
  if (params.start_date && typeof params.start_date === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(params.start_date)) {
      sanitized.start_date = params.start_date;
    }
  }

  // Validate date range logic (start before end):
  if (sanitized.start_date && sanitized.end_date) {
    const startDate = new Date(sanitized.start_date);
    const endDate = new Date(sanitized.end_date);
    if (startDate > endDate) {
      delete sanitized.start_date;
      delete sanitized.end_date;
    }
  }

  return sanitized;
};

/**
 * Builds query string from validated parameters
 * @param {Object} params - Validated parameters
 * @returns {string} Query string
 */
const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();

  // Only add parameters that differ from defaults or are explicitly set
  if (params.status !== DEFAULT_PARAMS.status) {
    queryParams.append("status", params.status);
  }

  if (params.page !== DEFAULT_PARAMS.page) {
    queryParams.append("page", params.page.toString());
  }

  // Add other parameters as needed
  if (params.search) {
    queryParams.append("search", params.search);
  }

  return queryParams.toString();
};

/**
 * Generates SWR cache key based on parameters
 * @param {Object} params - Validated parameters
 * @returns {string} Cache key
 */
const generateCacheKey = (params) => {
  const queryString = buildQueryString(params);
  return queryString ? `${API_ENDPOINT}?${queryString}` : API_ENDPOINT;
};

// --- Mock Data ---

/**
 * @type {APIResponse}
 */
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "[SUCCESS_MESSAGE]",
  },
  Data: [
    // Use the ACTUAL API response structure from documentation or cURL test
    // Copy the real data structure provided
  ],
  Type: "[TYPE_FROM_API]",
};

/**
 * Custom hook to fetch [entity description] using SWR
 *
 * @param {Object} [params] - Optional query parameters
 * @param {string} [params.paramName] - Parameter description
 * @returns {Object} SWR response object
 * @returns {[EntityType]|[EntityType][]} return.data - The response data
 * @returns {APIError} return.error - Error object if request fails
 * @returns {boolean} return.isLoading - Loading state
 * @returns {Function} return.mutate - Function to mutate the cache
 * @returns {boolean} return.isValidating - Whether the hook is currently validating
 *
 * @example
 * const { data, error, isLoading } = useGet[Entity]();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) {
 *   // Handle specific error codes
 *   if (error.Message?.Code === 400) {
 *     return <div>Invalid parameters: {error.Message.Text}</div>;
 *   }
 *   if (error.Message?.Code === 401) {
 *     return <div>Unauthorized. Please login.</div>;
 *   }
 *   return <div>Error: {error.Message?.Text || 'Unknown error'}</div>;
 * }
 *
 * return (
 *   <div>
 *     {data?.map(item => (
 *       <div key={item.id}>{item.name}</div>
 *     ))}
 *   </div>
 * );
 */
export const useGet[Entity] = (params) => {
  // Validate and sanitize parameters
  const validatedParams = validateAndSanitizeParams(params);

  // Generate cache key
  const cacheKey = generateCacheKey(validatedParams);

  return useSWR(
    cacheKey,
    USE_MOCK
      ? async () => {
          // Simulate network delay for mock
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Optional: Filter mock data based on parameters
          let filteredData = mockAPIResult.Data;

          // Example: Filter by status if applicable
          if (validatedParams.status && validatedParams.status !== 'all') {
            filteredData = {
              ...filteredData,
              items: filteredData.items?.filter(item => item.status === validatedParams.status)
            };
          }

          // Example: Apply search if applicable
          if (validatedParams.search) {
            const searchLower = validatedParams.search.toLowerCase();
            filteredData = {
              ...filteredData,
              items: filteredData.items?.filter(item =>
                item.name?.toLowerCase().includes(searchLower) ||
                item.code?.toLowerCase().includes(searchLower)
              )
            };
          }

          return filteredData;
        }
      : async (url) => {
          try {
            const response = await [FETCHER_NAME].get(url);
            return response.data.Data;
          } catch (error) {
            // Transform axios error to API error format
            const apiError = error.response?.data || {
              Message: {
                Code: error.response?.status || 500,
                Text: error.message || "An error occurred",
              },
              Data: null,
              Type: "ERROR",
            };
            throw apiError;
          }
        },
    {
      // SWR configuration
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      // Add error retry logic for specific cases
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.Message?.Code >= 400 && error?.Message?.Code < 500) {
          return;
        }
        // Retry up to 2 times for 5xx errors
        if (retryCount >= 2) return;
        setTimeout(() => revalidate({ retryCount }), 1000 * (retryCount + 1));
      },
    }
  );
};

// --- Additional Utility Functions ---

/**
 * Gets default parameters for the hook
 * @returns {Object} Default parameters
 */
export const getDefault[Entity]Params = () => {
  return { ...DEFAULT_PARAMS };
};

/**
 * Creates parameters for a specific filter (if applicable)
 * @param {string} filterValue - Filter value
 * @param {Object} [additionalParams] - Additional parameters
 * @returns {Object} Parameters object
 */
export const create[Filter]Params = (filterValue, additionalParams = {}) => {
  return {
    ...DEFAULT_PARAMS,
    filterField: VALID_FILTERS.includes(filterValue) ? filterValue : DEFAULT_PARAMS.filterField,
    ...additionalParams,
  };
};

/**
 * Creates parameters for search
 * @param {string} searchTerm - Search term (min 3 characters)
 * @param {Object} [additionalParams] - Additional parameters
 * @returns {Object} Parameters object
 */
export const createSearchParams = (searchTerm, additionalParams = {}) => {
  const trimmedSearch = searchTerm?.trim();
  return {
    ...DEFAULT_PARAMS,
    search: trimmedSearch && trimmedSearch.length >= MIN_SEARCH_LENGTH ? trimmedSearch : undefined,
    ...additionalParams,
  };
};

/**
 * Creates parameters for pagination
 * @param {number} page - Page number
 * @param {number} [limit] - Items per page
 * @param {Object} [additionalParams] - Additional parameters
 * @returns {Object} Parameters object
 */
export const createPaginationParams = (page, limit = DEFAULT_PARAMS.limit, additionalParams = {}) => {
  return {
    ...DEFAULT_PARAMS,
    page: Math.max(1, Math.floor(page || 1)),
    limit: Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit || DEFAULT_PARAMS.limit))),
    ...additionalParams,
  };
};

/**
 * Validates if a parameter object is valid for API call
 * @param {Object} params - Parameters to validate
 * @returns {boolean} Whether parameters are valid
 */
export const validate[Entity]Params = (params) => {
  if (!params || typeof params !== "object") return false;

  // Validate each parameter type and range
  if (params.page && (typeof params.page !== "number" || params.page < 1)) return false;
  if (params.limit && (typeof params.limit !== "number" || params.limit < 1 || params.limit > MAX_LIMIT)) return false;
  if (params.search && (typeof params.search !== "string" || params.search.trim().length < MIN_SEARCH_LENGTH)) return false;

  return true;
};
```

## Pattern B: POST/PUT/PATCH/DELETE Requests (useSWRMutation)

```javascript
import useSWRMutation from "swr/mutation";

import { [FETCHER_NAME] } from "@/lib/axios";

const USE_MOCK = false;

// --- Constants (if needed for validation) ---

/**
 * Valid values for payload fields (if applicable)
 */
const VALID_[FIELD_VALUES] = ["value1", "value2"];

/**
 * Validation rules for payload
 */
const VALIDATION_RULES = {
  fieldName: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9]+$/,
  },
  // ... other field rules
};

/**
 * @typedef {Object} [PayloadType]
 * @property {type} field - Description
 * // ... all payload fields with types and descriptions
 */

/**
 * @typedef {Object} [DataType]
 * @property {type} field - Description
 * // ... all response data fields with types and descriptions
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {[DataType]} Data
 * @property {string} Type
 */

/**
 * @typedef {Object} APIError
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {Object} [Data]
 * @property {Array<{field: string, message: string}>} [Data.errors] - Validation errors
 * @property {string} Type
 */

// --- Utility Functions ---

/**
 * Validates payload before sending to API
 * @param {Object} payload - Payload to validate
 * @returns {Object} Validation result with { isValid: boolean, errors: Array }
 */
const validatePayload = (payload) => {
  const errors = [];

  // Validate required fields
  Object.keys(VALIDATION_RULES).forEach((field) => {
    const rule = VALIDATION_RULES[field];
    const value = payload[field];

    if (rule.required && !value) {
      errors.push({ field, message: `${field} is required` });
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors.push({ field, message: `${field} must be at least ${rule.minLength} characters` });
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors.push({ field, message: `${field} must not exceed ${rule.maxLength} characters` });
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors.push({ field, message: `${field} has invalid format` });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitizes payload before sending to API
 * @param {Object} payload - Payload to sanitize
 * @returns {Object} Sanitized payload
 */
const sanitizePayload = (payload) => {
  const sanitized = {};

  // Remove undefined/null values
  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined && payload[key] !== null) {
      sanitized[key] = payload[key];
    }
  });

  // Trim string values
  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitized[key].trim();
    }
  });

  return sanitized;
};

export const mockAPIResult = {
  data: {
    Message: { Code: 200, Text: "[SUCCESS_MESSAGE]" },
    Data: {
      // Mirror the actual API response structure
      // Use realistic mock data based on actual response
    },
    Type: "[ENDPOINT_PATH]",
  },
};

/**
 * Mock function to simulate [action description]
 * @param {string} url - API endpoint URL
 * @param {object} options - Request options with arg containing data
 * @returns {Promise<object>} Mock API response
 */
const [actionName]Fetcher = async (url, { arg }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Optional: Client-side validation for mock mode
  const validation = validatePayload(arg.payload || arg);
  if (!validation.isValid) {
    // Return validation error in mock mode
    throw {
      Message: {
        Code: 400,
        Text: "Validation failed",
      },
      Data: {
        errors: validation.errors,
      },
      Type: "VALIDATION_ERROR",
    };
  }

  // eslint-disable-next-line no-console
  console.log("[Action] Data:", arg);

  return mockAPIResult;
};

/**
 * Fetcher function for [action description]
 * @param {string} url - API endpoint URL
 * @param {object} options - Request options with arg containing payload
 * @returns {Promise<APIResponse>} The API response
 * @throws {APIError} Throws API error with validation details
 */
const [actionName]FetcherReal = async (url, { arg }) => {
  try {
    // For endpoints with dynamic IDs in URL (e.g., /orders/:orderId/accept)
    // Extract the ID from arg and construct URL
    const { [idField], payload } = arg;

    // Optional: Sanitize payload before sending
    const sanitizedPayload = sanitizePayload(payload || arg);

    // Optional: Client-side validation before API call
    const validation = validatePayload(sanitizedPayload);
    if (!validation.isValid) {
      throw {
        Message: {
          Code: 400,
          Text: "Validation failed",
        },
        Data: {
          errors: validation.errors,
        },
        Type: "VALIDATION_ERROR",
      };
    }

    const response = await [FETCHER_NAME].[method](
      `[ENDPOINT_PATH]${[idField] ? `/${[idField]}` : ''}`,
      sanitizedPayload
    );
    return response;
  } catch (error) {
    // Transform axios error to API error format
    const apiError = error.response?.data || {
      Message: {
        Code: error.response?.status || 500,
        Text: error.message || "An error occurred",
      },
      Data: null,
      Type: "ERROR",
    };
    throw apiError;
  }
};

/**
 * SWR Mutation hook for [action description]
 * @returns {import('swr/mutation').SWRMutationResponse} Hook return values
 * @returns {Function} return.trigger - Function to trigger the mutation
 * @returns {boolean} return.isMutating - Whether mutation is in progress
 * @returns {APIResponse} return.data - Response data from successful mutation
 * @returns {APIError} return.error - Error object if mutation fails
 *
 * @example
 * const { trigger, isMutating, data, error } = use[HookName]();
 *
 * const handle[Action] = async () => {
 *   try {
 *     const result = await trigger({
 *       // Example payload based on API documentation
 *     });
 *
 *     // Success handling
 *     console.log('Success:', result.data.Data);
 *   } catch (err) {
 *     // Error handling
 *     if (err.Message?.Code === 400) {
 *       // Handle validation errors
 *       err.Data?.errors?.forEach(error => {
 *         console.error(`${error.field}: ${error.message}`);
 *       });
 *     } else if (err.Message?.Code === 401) {
 *       // Handle unauthorized
 *       console.error('Unauthorized');
 *     } else {
 *       console.error('Error:', err.Message?.Text);
 *     }
 *   }
 * };
 *
 * // In JSX
 * return (
 *   <>
 *     <button onClick={handle[Action]} disabled={isMutating}>
 *       {isMutating ? 'Loading...' : '[Action Button Text]'}
 *     </button>
 *
 *     {error && (
 *       <div className="error">
 *         {error.Message?.Text}
 *         {error.Data?.errors && (
 *           <ul>
 *             {error.Data.errors.map((err, idx) => (
 *               <li key={idx}>{err.field}: {err.message}</li>
 *             ))}
 *           </ul>
 *         )}
 *       </div>
 *     )}
 *
 *     {data && <div className="success">Success!</div>}
 *   </>
 * );
 */
export const use[HookName] = () => {
  return useSWRMutation(
    USE_MOCK ? "/mock/[endpoint]" : "[ACTUAL_ENDPOINT]",
    USE_MOCK ? [actionName]Fetcher : [actionName]FetcherReal,
    {
      throwOnError: false,
      // Optional: Add custom error handling
      onError: (err) => {
        // Log errors or send to error tracking service
        console.error('[HookName] Error:', err);
      },
      // Optional: Add success callback
      onSuccess: (data) => {
        console.log('[HookName] Success:', data);
      },
    }
  );
};

// --- Additional Utility Functions ---

/**
 * Creates a validated payload for the mutation
 * @param {Object} data - Raw data object
 * @returns {Object} Validated and sanitized payload
 * @throws {Error} If validation fails
 */
export const create[Entity]Payload = (data) => {
  const sanitized = sanitizePayload(data);
  const validation = validatePayload(sanitized);

  if (!validation.isValid) {
    const error = new Error("Validation failed");
    error.validationErrors = validation.errors;
    throw error;
  }

  return sanitized;
};

/**
 * Validates payload without throwing
 * @param {Object} payload - Payload to validate
 * @returns {Object} Validation result
 */
export const validate[Entity]Payload = (payload) => {
  return validatePayload(payload);
};
```

### Step 5: Create Index File

Create/update the `index.js` file in the service folder:

```javascript
export * from "./use[HookName]";
// ... other exports
```

### Step 6: Generate Usage Documentation

Provide clear usage examples based on the HTTP method:

## Usage Example: GET Requests

```javascript
import { useGet[Entity] } from "@/services/[Folder]/useGet[Entity]";

const MyComponent = () => {
  // Without parameters
  const { data, error, isLoading, mutate } = useGet[Entity]();

  // With parameters (note: wrap object in extra braces for JSX)
  const params = { paramName: "value" };
  const { data, error, isLoading } = useGet[Entity](params);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    // Handle different error types
    switch (error.Message?.Code) {
      case 400:
        return (
          <div className="error">
            <p>Invalid request:</p>
            {error.Data?.errors?.map((err, idx) => (
              <p key={idx}>{err.field}: {err.message}</p>
            ))}
          </div>
        );
      case 401:
        return <div>Please login to continue</div>;
      case 404:
        return <div>Data not found</div>;
      default:
        return <div>Error: {error.Message?.Text || 'An error occurred'}</div>;
    }
  }

  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Manually refetch data */}
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
};
```

## Usage Example: POST/PUT/PATCH/DELETE Requests

```javascript
import { use[HookName] } from "@/services/Global/[Folder]";

const MyComponent = () => {
  const { trigger, isMutating, data, error } = use[HookName]();

  const handle[Action] = async () => {
    try {
      const result = await trigger({
        // Payload structure from API documentation
      });

      // Success handling
      console.log('Success:', result.data.Data);
      // Show success message, navigate, etc.

    } catch (err) {
      // Error is also available in the error variable from hook
      // This catch block is for additional handling
      console.error('Error occurred:', err);
    }
  };

  return (
    <div>
      <button onClick={handle[Action]} disabled={isMutating}>
        {isMutating ? 'Loading...' : '[Action Button Text]'}
      </button>

      {/* Display validation errors */}
      {error?.Message?.Code === 400 && error.Data?.errors && (
        <div className="validation-errors">
          <h4>Please fix the following errors:</h4>
          <ul>
            {error.Data.errors.map((err, idx) => (
              <li key={idx}>
                <strong>{err.field}:</strong> {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display general errors */}
      {error && error.Message?.Code !== 400 && (
        <div className="error-message">
          {error.Message?.Code === 401 && 'Please login to continue'}
          {error.Message?.Code === 403 && 'You do not have permission to perform this action'}
          {error.Message?.Code === 404 && 'Resource not found'}
          {error.Message?.Code === 500 && 'Server error. Please try again later'}
          {![400, 401, 403, 404, 500].includes(error.Message?.Code) &&
            (error.Message?.Text || 'An error occurred')}
        </div>
      )}

      {/* Display success message */}
      {data && (
        <div className="success-message">
          {data.data.Message.Text}
        </div>
      )}
    </div>
  );
};
```

## Important Pattern Rules

### 1. **HTTP Method Mapping**

- `GET` → Use `useSWR` hook with `fetcher.get(url)`
- `POST` → Use `useSWRMutation` with `fetcher.post(url, payload)`
- `PUT` → Use `useSWRMutation` with `fetcher.put(url, payload)`
- `PATCH` → Use `useSWRMutation` with `fetcher.patch(url, payload)`
- `DELETE` → Use `useSWRMutation` with `fetcher.delete(url, payload)`

### 2. **Mock Data Requirements**

- Must mirror actual API response structure exactly
- Use realistic data based on actual API response
- Include all nested objects and arrays
- Set `USE_MOCK = false` for production

### 3. **JSDoc Type Definitions**

- Define all payload fields with `@typedef`
- Define all response data fields with `@typedef`
- Include descriptions for each field
- Use proper TypeScript-compatible types

### 4. **Naming Conventions**

**For GET requests:**

- Hook name: `useGet[Entity]` (e.g., `useGetBuyerBanners`, `useGetHomePageData`)
- File name: Same as hook name in camelCase with `.js` extension
- No fetcher function names needed (inline in useSWR)

**For POST/PUT/PATCH/DELETE requests:**

- Hook name: `use[Action][Entity]` (e.g., `usePostShippingCost`, `useAcceptOrder`, `useUpdateProfile`, `useDeleteGarage`)
- Fetcher functions: `[action]Fetcher` and `[action]FetcherReal`
- File name: Same as hook name in camelCase with `.js` extension

### 5. **Dynamic URL Parameters**

For endpoints with dynamic parameters (e.g., `/orders/:orderId/accept`):

```javascript
const acceptOrderFetcherReal = async (url, { arg }) => {
  const { orderId, payload } = arg;
  const response = await fetcherMPPInter.put(
    `/v1/international/seller/orders/${orderId}/accept`,
    payload
  );
  return response;
};

// Usage:
await trigger({
  orderId: "123-456",
  payload: { notes: "..." },
});
```

### 6. **Response Data Access**

The SWR mutation returns the full axios response. To access the actual data:

- Full response: `result`
- API data: `result.data.Data`
- Status: `result.data.Message.Code`

## Verification Checklist

After generating the service, verify:

- [ ] **For Markdown input**: Extracted all information from documentation correctly
- [ ] **For cURL input**: Executed cURL command first to get actual API response
- [ ] File created in correct location under `/src/services/[Folder]/`
- [ ] Index file created/updated with export (if in a subfolder)
- [ ] Correct fetcher imported based on API URL pattern
- [ ] HTTP method matches documentation/cURL command
- [ ] Endpoint path is correct
- [ ] **Mock data structure matches actual API response exactly**
- [ ] All JSDoc types are complete and accurate, including APIError typedef
- [ ] Hook name follows naming convention (GET vs POST/PUT/DELETE/PATCH)
- [ ] Correct hook used (`useSWR` for GET, `useSWRMutation` for others)
- [ ] **Error handling implemented in fetcher with try/catch**
- [ ] **Error transformation to API error format included**
- [ ] **APIError typedef includes validation errors structure**
- [ ] Example usage includes comprehensive error handling (400, 401, 403, 404, 500)
- [ ] Example usage shows how to display validation errors (for 400 responses)
- [ ] `USE_MOCK` flag is set to `false`
- [ ] Query parameters handled correctly (for GET requests)
- [ ] SWR options configured (`revalidateOnFocus`, `shouldRetryOnError` for GET)
- [ ] Mutation options configured (`throwOnError: false`, optional `onError` callback)
- [ ] **Constants defined for valid values (statuses, sorts, etc.)**
- [ ] **Default parameters object created**
- [ ] **Parameter validation function implemented**
- [ ] **Query string building function implemented**
- [ ] **Cache key generation function implemented (for GET)**
- [ ] **Payload validation and sanitization functions (for POST/PUT/PATCH/DELETE)**
- [ ] **Utility functions exported (create params, validate params, etc.)**
- [ ] **Mock data filtering logic based on parameters (optional but recommended)**
- [ ] **Error retry logic with proper conditions (GET requests)**

## Example Reference Files

For reference, see these existing services:

**GET Requests:**

- `/src/services/Home/useGetBuyerBanners.js` - Simple GET request returning array
- `/src/services/Home/useGetHomePageData.js` - GET request with complex nested response
- `/src/services/useGetVouchers.js` - GET request with query parameters

**POST/PUT/DELETE Requests:**

- `/src/services/Global/Checkout/usePostShippingCost.js` - POST request with complex response transformation
- `/src/services/Global/Garage/useCreateGarage.js` - Simple POST request
- Any service in `/src/services/Global/` folders

## Quick Reference: Method Decision Tree

```
Is it a GET request?
├─ YES → Use useSWR
│         - Import: import useSWR from "swr"
│         - Hook name: useGet[Entity]
│         - Returns: { data, error, isLoading, mutate, isValidating }
│         - Fetcher: inline async function in useSWR with try/catch
│         - Error handling: Transform axios error to API error format
│         - Mock delay: 500ms
│         - SWR options: { revalidateOnFocus: false, shouldRetryOnError: false }
│
└─ NO → Use useSWRMutation
          - Import: import useSWRMutation from "swr/mutation"
          - Hook name: use[Action][Entity]
          - Returns: { trigger, isMutating, data, error, reset }
          - Fetcher: separate functions (mockFetcher & realFetcher) with try/catch
          - Error handling: Transform axios error to API error format
          - Mock delay: 1000ms
          - Mutation options: { throwOnError: false, onError: (err) => {...} }
```

## Error Response Standards

All services should handle these common error codes:

- **400 Bad Request**: Validation errors with `Data.errors[]` array
- **401 Unauthorized**: Authentication required or token expired
- **403 Forbidden**: User doesn't have permission
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Standard API Error Structure

```javascript
{
  "Message": {
    "Code": 400,
    "Text": "Validation failed"
  },
  "Data": {
    "errors": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "Type": "ERROR"
}
```

## Notes

- **RECOMMENDED**: For markdown documentation inputs, use the provided response examples directly
- **RECOMMENDED**: For cURL inputs, run the command first to get actual API response
- **CRITICAL**: Copy the exact response structure into mock data
- For complex nested responses, create multiple `@typedef` definitions
- Include helpful comments for any data transformations
- GET requests use 500ms mock delay (fast data fetching)
- Mutation requests use 1000ms mock delay (realistic API latency)
- Console log in mock fetcher helps with debugging
- For GET requests with query params, use URLSearchParams
- For mutations with dynamic URLs, extract ID from arg and construct URL
- **Always include APIError typedef with validation errors structure**
- **Always implement try/catch in fetcher functions**
- **Always transform axios errors to API error format**
- **Always provide comprehensive error handling examples in JSDoc**

## Workflow for Markdown-based API Documentation

When user provides markdown documentation (most common use case):

1. **Parse the Markdown Structure**
   - Extract endpoint path and HTTP method from `## Endpoint` section
   - Extract parameters from tables in `## Parameters` section
   - Extract success response from `## Response Success` section
   - Extract all error responses from `## Error Responses` section

2. **Generate JSDoc Types**
   - Create `@typedef` for request payload (if POST/PUT/PATCH)
   - Create `@typedef` for response data structure
   - Create `@typedef` for API error including validation errors
   - Use the exact field names and types from the documentation

3. **Create Mock Data**
   - Use the success response example directly as mock data
   - Ensure the structure exactly matches the documentation
   - Include all nested objects and arrays

4. **Generate Error Handling**
   - Include all error codes from the documentation
   - Add specific handling for validation errors (400)
   - Add standard handling for auth errors (401, 403)
   - Add handling for not found (404) and server errors (500)

5. **Create Usage Examples**
   - Show error handling for all documented error codes
   - Demonstrate how to display validation errors
   - Show loading states and success states

### Example: Converting Markdown to Service

Given this markdown:

```markdown
## Endpoint

GET /v1/buyer/contracts

## Parameters

| Parameter | Type    | Required | Description      |
| --------- | ------- | -------- | ---------------- |
| status    | string  | No       | Filter by status |
| page      | integer | No       | Page number      |

## Response Success (200 OK)

{
"Message": { "Code": 200, "Text": "Success" },
"Data": {
"contracts": [...],
"pagination": {...}
}
}

## Error Responses

### 400 Bad Request

{
"Message": { "Code": 400, "Text": "Invalid params" },
"Data": {
"errors": [
{ "field": "status", "message": "Invalid status value" }
]
}
}

### 401 Unauthorized

{
"Message": { "Code": 401, "Text": "Unauthorized" }
}
```

Generate:

1. **Hook name**: `useGetContracts` (GET + entity name)
2. **Endpoint**: `/v1/buyer/contracts`
3. **Fetcher**: `fetcherMPPInter` (for `/v1/` paths)
4. **Parameters**: Create URLSearchParams for `status` and `page`
5. **Types**: Define `Contract`, `Pagination`, `ContractsData`, `APIError`
6. **Mock data**: Use the exact response structure from documentation
7. **Error handling**: Handle 400 (with validation errors) and 401
8. **Example**: Show all error cases in JSDoc example

## Important Notes

### Mock vs Real Data

- `USE_MOCK` flag controls data source
- Mock data **MUST** have the **EXACT** same structure as actual API response
- **ALWAYS** execute cURL command first to see actual structure (for cURL input)
- **ALWAYS** reference the API documentation response examples (for markdown input)
- **DO NOT GUESS** the response structure
- Mock data should include:
  - Same nested objects/arrays structure
  - Same property names (exact case)
  - Same data types for each field
  - Example values that make sense in context
  - **Filtering logic based on parameters (optional but recommended for testing)**

### Error Handling Philosophy

Services should **NOT** throw errors directly. Instead:

- **Wrap API calls in try/catch**
- **Transform errors to standard APIError format**
- **Return errors through SWR's error property**
- Let components handle error display
- For mutations, errors are passed to `onError` callback
- `throwOnError: false` ensures errors don't throw unhandled exceptions

This allows components to:

- Check `error.response?.status` for HTTP status codes
- Access `error.response?.data?.errors` for validation details
- Display appropriate messages based on error type
- Handle errors gracefully without crashes

### Parameter Validation Strategy

For GET requests:

- Define constants for valid values (statuses, sorts, etc.)
- Create default parameters object with sensible defaults
- Implement `validateAndSanitizeParams()` to:
  - Check parameter types (string, number, boolean)
  - Validate against allowed values (enums)
  - Check ranges (min/max for pagination)
  - Set defaults for missing values
- Use `buildQueryString()` to:
  - Only include non-default parameters
  - Prevent unnecessary cache keys
  - Keep URLs clean
- Create utility functions for common patterns:
  - `createStatusFilterParams()` - Handle status filtering
  - `createSearchParams()` - Handle search queries
  - `createPaginationParams()` - Handle page/limit
  - `validateParams()` - Quick validation wrapper
- Export these utilities for use in components

For POST/PUT/PATCH/DELETE requests:

- Define validation rules (required fields, min/max lengths, patterns)
- Create constants for valid field values
- Implement `validatePayload()` to:
  - Check required fields are present
  - Validate field formats (email, phone, etc.)
  - Validate against allowed values
  - Check string lengths
  - Return validation errors array
- Implement `sanitizePayload()` to:
  - Trim string values
  - Remove null/undefined values
  - Format values consistently
- Create utility functions:
  - `create[Entity]Payload()` - Build payload from form data
  - `validate[Entity]Payload()` - Wrapper for validation
- Perform client-side validation before API call
- Include validation in mock fetcher for testing

### Mock Data Filtering (Optional but Recommended)

For GET requests, implement filtering logic in mock fetcher:

```javascript
// Example: Filter by status
if (params.status && params.status !== DEFAULT_PARAMS.status) {
  filtered = filtered.filter((item) => item.status === params.status);
}

// Example: Search by query
if (params.q && params.q.length >= MIN_SEARCH_LENGTH) {
  const query = params.q.toLowerCase();
  filtered = filtered.filter(
    (item) =>
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query)
  );
}

// Example: Pagination
const start = (params.page - 1) * params.limit;
const end = start + params.limit;
const paginated = filtered.slice(start, end);
```

This allows testing filtering logic without hitting real API.

### Error Retry Strategy

For GET requests, implement smart retry logic:

```javascript
shouldRetryOnError: (error) => {
  // Don't retry on client errors (400-499)
  if (error?.response?.status >= 400 && error?.response?.status < 500) {
    return false;
  }
  // Retry on server errors (500-599) and network errors
  return true;
};
```

This prevents unnecessary retries on validation errors or not found errors.
