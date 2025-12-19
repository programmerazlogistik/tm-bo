"use client";

import { useState } from "react";

import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@muatmuat/ui/BottomSheet";

export function BottomSheetPreview() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <BottomSheet>
        <BottomSheetTrigger asChild>
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Open Bottom Sheet
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Welcome to Bottom Sheet</BottomSheetTitle>
            <BottomSheetClose />
          </BottomSheetHeader>
          <div className="flex-1 p-4">
            <p className="text-neutral-600">
              This is a basic bottom sheet with a title, close button, and some
              content. You can swipe down or click the backdrop to dismiss it.
            </p>
          </div>
        </BottomSheetContent>
      </BottomSheet>
    </div>
  );
}
