import React from "react";
import { TitleSize } from "./title.constants";
import ThemeColors from "../../utils/theme/colors";

type TitleProps = {
  children: string;
  css?: React.CSSProperties;
  size?: TitleSize;
  color?: ThemeColors;
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
        ...css,
        fontSize: size,
        color: color,
      }}
    >
      {children}
    </p>
  );
}
