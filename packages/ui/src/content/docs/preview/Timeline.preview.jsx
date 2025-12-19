"use client";

import { useState } from "react";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@muatmuat/ui/Timeline";

export function TimelinePreview() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Timeline
      value={currentStep}
      onValueChange={setCurrentStep}
      className="max-w-md"
    >
      <TimelineItem step={1}>
        <TimelineHeader>
          <TimelineDate>Jan 15, 2024</TimelineDate>
          <TimelineTitle>Order Created</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Order has been received and is being processed.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>

      <TimelineItem step={2}>
        <TimelineHeader>
          <TimelineDate>Jan 15, 2024</TimelineDate>
          <TimelineTitle>Driver Assigned</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Professional driver has been assigned to your delivery.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>

      <TimelineItem step={3}>
        <TimelineHeader>
          <TimelineDate>Jan 15, 2024</TimelineDate>
          <TimelineTitle>Pickup Completed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>
          Package has been picked up and is in transit.
        </TimelineContent>
        <TimelineSeparator />
        <TimelineIndicator />
      </TimelineItem>
    </Timeline>
  );
}
