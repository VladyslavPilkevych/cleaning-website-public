import React from "react";
import {
  FlexDirection,
  JustifyContent,
  AlignItems,
  AlignContent,
  FlexWrap,
  TextAlign,
} from "./flex.constants";
import ThemeColors from "../../utils/theme/colors";

type FlexProps = {
  children: React.ReactNode;
  css?: React.CSSProperties;
  gap?: string;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  textAlign?: TextAlign;
  flexWrap?: FlexWrap;
  width?: string;
  backgroundColor?: ThemeColors;
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
  textAlign = TextAlign.START,
  backgroundColor,
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
        textAlign,
        backgroundColor: backgroundColor ?? "none",
        ...css,
      }}
    >
      {children}
    </div>
  );
}
