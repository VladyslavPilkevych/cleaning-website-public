import React from "react";

type BoxProps = {
  children: React.ReactNode;
  css?: React.CSSProperties;
  width?: string;
  height?: string;
};

export default function Box({
  children,
  css,
  width = "100%",
  height = "auto",
}: BoxProps) {
  return (
    <div
      style={{
        width,
        height,
        ...css,
      }}
    >
      {children}
    </div>
  );
}
