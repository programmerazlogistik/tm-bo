"use client";

import { useState } from "react";

import { TagInput } from "@muatmuat/ui/Form";

export function TagInputPreview() {
  const [skills, setSkills] = useState(["JavaScript", "React", "TypeScript"]);
  const [interests, setInterests] = useState(["Design", "Music"]);
  const [categories, setCategories] = useState([]);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-medium">Skills</label>
        <TagInput
          tags={skills}
          onTagsChange={setSkills}
          placeholder="Add a skill..."
          maxTags={8}
          maxLength={20}
          allowDuplicates={false}
          withTagInputHelp={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Add your technical skills (max 8 tags)
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">Interests</label>
        <TagInput
          tags={interests}
          onTagsChange={setInterests}
          placeholder="Add an interest..."
          maxTags={5}
          maxLength={15}
          allowDuplicates={false}
          withTagInputHelp={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          What are you interested in? (max 5 tags)
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">Categories</label>
        <TagInput
          tags={categories}
          onTagsChange={setCategories}
          placeholder="Add categories..."
          maxTags={10}
          allowDuplicates={false}
          withTagInputHelp={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Enter categories to organize content
        </p>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Disabled Example
        </label>
        <TagInput
          tags={["Fixed", "Tag", "Example"]}
          onTagsChange={() => {}}
          disabled={true}
          withTagInputHelp={true}
        />
        <p className="mt-2 text-xs text-neutral-500">
          Tags cannot be modified in this state
        </p>
      </div>
    </div>
  );
}
