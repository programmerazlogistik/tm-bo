"use client";

import Link from "next/link";
import React from "react";

import { cn } from "@muatmuat/lib/utils";

import { tMockFn } from "../../lib/mock-t";
import { IconComponent } from "../IconComponent";
import { InfoTooltip } from "../Tooltip/InfoTooltip";

export interface AlertItemLink {
  link: string;
  label: string;
}

export interface AlertItemButton {
  label: string;
  onClick: () => void;
}

export interface AlertItemInfo {
  render: React.ReactNode;
}

export interface AlertItem {
  label: string;
  link?: AlertItemLink;
  button?: AlertItemButton;
  info?: AlertItemInfo;
}

export interface AlertMultilineProps {
  className?: string;
  items?: AlertItem[];
  t?: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

export const AlertMultiline: React.FC<AlertMultilineProps> = ({
  className,
  items = [],
  t = tMockFn,
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-y-3 rounded-xl bg-secondary-100 px-6 py-4",
        "text-xs font-medium leading-[1.2] text-neutral-900",
        className
      )}
    >
      {items.length > 1 ? (
        <>
          <div className="flex items-center gap-x-2">
            <IconComponent
              className="icon-stroke-warning-900"
              src="/icons/warning24.svg"
              size="medium"
            />
            <span className="capsize font-semibold">
              {t("AlertMultiline.notificationLabel", {}, "Pemberitahuan:")}
            </span>
          </div>

          <ul className="flex w-full list-disc flex-col gap-y-1 pl-10">
            {items.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex items-center gap-x-1">
                    <Item item={item} t={t} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : items.length === 1 ? (
        <div className="flex items-center gap-x-3">
          <IconComponent
            className="icon-stroke-warning-900"
            src="/icons/warning24.svg"
            size="medium"
          />

          <div className="flex items-center gap-x-1">
            <Item item={items[0]!} t={t} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

interface ItemProps {
  item: AlertItem;
  t: (
    key: string,
    options?: Record<string, any>,
    defaultValue?: string
  ) => string;
}

const Item: React.FC<ItemProps> = ({ item, t }) => {
  return (
    <>
      <span
        className="info-alert-content"
        dangerouslySetInnerHTML={{ __html: t(item.label) }}
      />

      {item.link ? (
        <Link
          className="text-xs font-medium text-primary-700"
          href={item.link.link}
        >
          {t(item.link.label)}
        </Link>
      ) : item.button ? (
        <button
          className="text-xs font-medium text-primary-700"
          onClick={item.button.onClick}
        >
          {t(item.button.label)}
        </button>
      ) : item.info ? (
        <InfoTooltip
          side="right"
          className="w-[336px]"
          appearance={{ iconClassName: "text-neutral-700" }}
        >
          {item.info.render}
        </InfoTooltip>
      ) : null}
    </>
  );
};
