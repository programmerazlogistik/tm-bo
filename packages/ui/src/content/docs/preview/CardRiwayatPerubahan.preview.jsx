"use client";

import { CardRiwayatPerubahan } from "@muatmuat/ui/Card";

export function CardRiwayatPerubahanPreview() {
  return (
    <CardRiwayatPerubahan.Root title="Riwayat Aktivitas">
      <CardRiwayatPerubahan.Item
        isActive={true}
        timestamp="15 Mar 2024, 14:30"
        actor="System Admin"
        action="updated driver information"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <CardRiwayatPerubahan.ItemPerubahanDriver
            timestamp="15 Mar 2024, 14:30"
            before={{
              picture:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
              name: "Ahmad Subagyo",
            }}
            after={{
              picture:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
              name: "Budi Santoso",
            }}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>

      <CardRiwayatPerubahan.Item
        timestamp="14 Mar 2024, 09:15"
        actor="Fleet Manager"
        action="changed vehicle assignment"
      >
        <CardRiwayatPerubahan.ContentPerubahan>
          <CardRiwayatPerubahan.ItemPerubahanArmada
            timestamp="14 Mar 2024, 09:15"
            before={{
              picture:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=48&h=48&fit=crop",
              plate: "B 1234 ABC",
              name: "Hino Ranger",
            }}
            after={{
              picture:
                "https://images.unsplash.com/photo-1554625432-b4b434849e6c?w=48&h=48&fit=crop",
              plate: "B 5678 XYZ",
              name: "Isuzu Elf",
            }}
          />
        </CardRiwayatPerubahan.ContentPerubahan>
      </CardRiwayatPerubahan.Item>
    </CardRiwayatPerubahan.Root>
  );
}
