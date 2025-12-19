import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  keys?: string | number;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface ListContentProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string | React.ComponentType<React.SVGAttributes<SVGElement>>;
  title: string;
  value: string;
}

export interface ConditionalDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
