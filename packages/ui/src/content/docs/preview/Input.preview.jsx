"use client";

import { useState } from "react";

import { Input } from "@muatmuat/ui/Form";

export function InputPreview() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("secret123");

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Email Address</label>
        <Input
          placeholder="Enter your email"
          type="email"
          icon={{ left: "/icons/email16.svg" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={
            email && !email.includes("@")
              ? "Please enter a valid email address"
              : ""
          }
          supportiveText="We'll never share your email"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>
        <Input
          placeholder="Create a password"
          type="password"
          icon={{ left: "/icons/lock16.svg" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          withReset={true}
          supportiveText="Must be at least 8 characters"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Amount</label>
        <Input
          placeholder="0.00"
          type="number"
          text={{ left: "$" }}
          supportiveText="Enter amount in USD"
        />
      </div>
    </div>
  );
}
