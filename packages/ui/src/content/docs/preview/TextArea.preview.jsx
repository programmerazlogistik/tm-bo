"use client";

import { useState } from "react";

import { TextArea } from "@muatmuat/ui/Form";

export function TextAreaPreview() {
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notes, setNotes] = useState("Initial note content");

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">
          Product Description
        </label>
        <TextArea
          placeholder="Describe your product in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          withCharCount={true}
          supportiveText="Include key features, benefits, and specifications"
          rows={4}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Customer Feedback
        </label>
        <TextArea
          placeholder="Share your experience with this product..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={200}
          withCharCount={true}
          errorMessage={
            feedback.length > 0 && feedback.length < 10
              ? "Feedback must be at least 10 characters"
              : ""
          }
          supportiveText="Your feedback helps us improve our products"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">Order Notes</label>
        <TextArea
          placeholder="Add special instructions for your order..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={100}
          withCharCount={true}
          supportiveText="Delivery instructions, gift messages, etc."
          rows={2}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Disabled Example
        </label>
        <TextArea
          placeholder="This textarea is disabled"
          value="This content cannot be edited"
          onChange={() => {}}
          disabled={true}
          rows={2}
        />
      </div>
    </div>
  );
}
