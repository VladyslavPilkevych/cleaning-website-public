import React from "react";

type IconProps = {
  src: string;
  css?: React.CSSProperties;
  width?: string;
  height?: string;
};


export default function Icon({src, css, width = "40px", height = "40px" }: IconProps) {
  return (
    <img alt="icon" src={`${process.env.PUBLIC_URL}${src}`} style={{ width, height, ...css }} />
  );
}
