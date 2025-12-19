"use client";

import { useState } from "react";

import { TagBubble } from "@muatmuat/ui/Badge";

export function TagBubblePreview() {
  const [tags, setTags] = useState([
    "Electronics",
    "Price: $100-$500",
    "Rating: 4+ Stars",
  ]);

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTag = () => {
    setTags([...tags, `New Tag ${tags.length + 1}`]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagBubble
            key={index}
            withRemove={{ onRemove: () => removeTag(index) }}
          >
            {tag}
          </TagBubble>
        ))}
        <TagBubble disabled>Disabled Tag</TagBubble>
      </div>

      <button
        onClick={addTag}
        className="rounded-md bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700"
      >
        Add Tag
      </button>

      <p className="text-sm text-gray-600">
        Click the × on any tag to remove it, or add new tags with the button.
      </p>
    </div>
  );
}
