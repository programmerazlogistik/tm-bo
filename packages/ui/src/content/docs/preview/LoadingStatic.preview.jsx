"use client";

import { LoadingStatic } from "@muatmuat/ui/Loading";

export function LoadingStaticPreview() {
  return (
    <div className="relative">
      <LoadingStatic />

      <div className="space-y-8 p-8">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold">Full Screen Loading</h3>
          <p className="mb-4 text-neutral-600">
            LoadingStatic always renders a full-screen overlay:
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h4 className="mb-2 font-medium text-blue-900">✅ Use Cases:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Server-side rendered applications</li>
            <li>• React Server Components</li>
            <li>• Suspense fallbacks</li>
            <li>• Static site generation</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-lg border p-4">
              <h3 className="font-medium">Card {item}</h3>
              <p className="text-sm text-neutral-500">
                Sample content behind overlay
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
