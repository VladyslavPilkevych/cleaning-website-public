import React from "react";
import {
  FlexDirection,
  JustifyContent,
  AlignItems,
  AlignContent,
  FlexWrap,
} from "./flex.constants";

type FlexProps = {
  children: React.ReactNode;
  css?: React.CSSProperties;
  gap?: string;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  flexWrap?: FlexWrap;
  width?: string;
  height?: string;
};

export default function Flex({
  children,
  css,
  gap,
  flexDirection = FlexDirection.ROW,
  justifyContent = JustifyContent.START,
  alignItems = AlignItems.CENTER,
  alignContent = AlignContent.CENTER,
  flexWrap = FlexWrap.NOWRAP,
  width,
  height,
}: FlexProps) {
  return (
    <div
      style={{
        display: "flex",
        gap,
        width,
        height,
        flexDirection,
        justifyContent,
        alignItems,
        alignContent,
        flexWrap,
        ...css,
      }}
    >
      {children}
    </div>
  );
}
