import React from "react";
import { TitleSize } from "./title.constants";
import ThemeColors from "../../utils/theme/colors";
import { FontWeight } from "../../utils/theme/fonts";

type TitleProps = {
  children: string;
  css?: React.CSSProperties;
  size?: TitleSize;
  color?: ThemeColors;
  fontWeight?: number | FontWeight;
};

export default function Title({
  children,
  css,
  size = TitleSize.H3,
  color = ThemeColors.Primary,
}: TitleProps) {
  return (
    <p
      style={{
        fontFamily: "Montserrat",
        textDecoration: "none",
        lineHeight: "1.5",
        ...css,
        fontSize: size,
        color: color,
      }}
    >
      {children}
    </p>
  );
}
