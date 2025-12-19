"use client";

import * as React from "react";

import { cn } from "@muatmuat/lib/utils";
import { Drawer as BottomSheetPrimitive } from "vaul";

import { IconComponent } from "../IconComponent";

export interface BottomSheetProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Root>,
    "children" | "fadeFromIndex"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetTriggerProps
  extends Omit<
    React.ComponentProps<typeof BottomSheetPrimitive.Trigger>,
    "children"
  > {
  children?: React.ReactNode;
}

export interface BottomSheetContentProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export interface BottomSheetTitleProps
  extends React.ComponentProps<typeof BottomSheetPrimitive.Title> {
  className?: string;
}

export interface BottomSheetCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface BottomSheetFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = (props) => (
  <BottomSheetPrimitive.Root {...props} />
);

export const BottomSheetTrigger: React.FC<BottomSheetTriggerProps> = (
  props
) => <BottomSheetPrimitive.Trigger {...props} />;

const BottomSheetContentImplementation: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BottomSheetContentProps
> = (props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <BottomSheetPrimitive.Portal>
      <BottomSheetPrimitive.Overlay
        data-stack-item="true"
        className="fixed inset-0 z-50 bg-black/30"
      />
      <BottomSheetPrimitive.Content
        ref={ref}
        data-stack-content="true"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto max-h-[75dvh] flex-col rounded-t-[16px] bg-white",
          className
        )}
        {...otherProps}
      >
        <div className="mx-auto mt-1 h-1 w-12 flex-shrink-0 rounded-full bg-neutral-300" />
        {children}
      </BottomSheetPrimitive.Content>
    </BottomSheetPrimitive.Portal>
  );
};

export const BottomSheetContent = React.forwardRef(
  BottomSheetContentImplementation
);
BottomSheetContent.displayName = "BottomSheetContent";

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "relative flex min-h-[72px] w-full items-center p-4 pb-6 text-center",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
BottomSheetHeader.displayName = "BottomSheetHeader";

const BottomSheetTitleImplementation: React.ForwardRefRenderFunction<
  HTMLHeadingElement,
  BottomSheetTitleProps
> = (props, ref) => {
  const { className, ...otherProps } = props;

  return (
    <BottomSheetPrimitive.Title
      ref={ref}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 text-sm font-bold leading-[1.1] text-neutral-900",
        className
      )}
      {...otherProps}
    />
  );
};

export const BottomSheetTitle = React.forwardRef(
  BottomSheetTitleImplementation
);
BottomSheetTitle.displayName = "BottomSheetTitle";

export const BottomSheetClose: React.FC<BottomSheetCloseProps> = ({
  className,
}) => (
  <BottomSheetPrimitive.Close asChild>
    <button type="button" className={cn("", className)} aria-label="Close">
      <IconComponent
        src="/icons/close24.svg"
        className="h-6 w-6 text-primary-600"
        title="Close"
      />
    </button>
  </BottomSheetPrimitive.Close>
);
BottomSheetClose.displayName = "BottomSheetClose";

export const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
  className,
  ...props
}) => <div className={cn("mt-auto w-full p-4 pb-6", className)} {...props} />;
BottomSheetFooter.displayName = "BottomSheetFooter";
