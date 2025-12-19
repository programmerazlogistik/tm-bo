"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ListContent,
} from "@muatmuat/ui/Card";

export function CardPreview() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-lg font-semibold">Order #12345</h2>
        <p className="text-sm text-neutral-600">Status: In Progress</p>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm">
          Your shipment is currently being processed and will be ready for
          pickup soon.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Origin"
            value="Jakarta"
          />
          <ListContent
            icon="/icons/map-pin24.svg"
            title="Destination"
            value="Surabaya"
          />
          <ListContent
            icon="/icons/box16.svg"
            title="Weight"
            value="2.5 tons"
          />
          <ListContent
            icon="/icons/24-hours.svg"
            title="Duration"
            value="8 hours"
          />
        </div>
      </CardContent>
      <CardFooter>
        <button className="rounded bg-primary-500 px-4 py-2 text-white">
          Track Order
        </button>
        <button className="ml-2 rounded border px-4 py-2">
          Contact Support
        </button>
      </CardFooter>
    </Card>
  );
}
