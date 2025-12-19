"use client";

import { Children, useEffect, useState } from "react";

import { ConditionalDivProps } from "./types";

export const ConditionalDiv = ({
  className,
  children,
  ...props
}: ConditionalDivProps): React.ReactElement | null => {
  const [hasChildren, setHasChildren] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const childElements = Children.toArray(children);
      const hasRenderedChildren = childElements.some(
        (child) => child !== null && child !== undefined
      );
      setHasChildren(hasRenderedChildren);
    }
  }, [children, mounted]);

  if (!hasChildren) return null;

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};
