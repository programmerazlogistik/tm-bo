"use client";

import { FormContainer, FormLabel } from "@muatmuat/ui/Form";

export function FormPreview() {
  return (
    <div className="max-w-md space-y-4">
      <FormContainer>
        <FormLabel required>First Name *</FormLabel>
        <input
          type="text"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          placeholder="John"
        />

        <FormLabel optional>Middle Name</FormLabel>
        <input
          type="text"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          placeholder="William"
        />

        <FormLabel required>Last Name *</FormLabel>
        <input
          type="text"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          placeholder="Doe"
        />

        <FormLabel required>Email Address *</FormLabel>
        <input
          type="email"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          placeholder="john@example.com"
        />

        <FormLabel optional>Phone Number</FormLabel>
        <input
          type="tel"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          placeholder="+62 812-3456-7890"
        />
      </FormContainer>
    </div>
  );
}
