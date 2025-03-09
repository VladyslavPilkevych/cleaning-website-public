import React from "react";
import ThemeColors from "../../utils/theme/colors";
import { FontWeight } from "../../utils/theme/fonts";
import { TitleSize } from "../title/title.constants";

type IconTitleProps = {
  children: string;
  iconSrc: string;
  css?: React.CSSProperties;
  size?: TitleSize;
  color?: ThemeColors;
  fontWeight?: number | FontWeight;
};

export default function IconTitle({
  children,
  css,
  size = TitleSize.H3,
  color = ThemeColors.Primary,
  fontWeight,
  iconSrc,
}: IconTitleProps) {
  return (
    <p
      style={{
        fontFamily: "Montserrat",
        textDecoration: "none",
        lineHeight: "1.5",
        fontWeight,
        ...css,
        fontSize: size,
        color: color,
      }}
    >
      <img src={iconSrc} alt="icon" style={{ width: "24px", height: "24px", marginBottom: "-6px" }} />
      {children}
    </p>
  );
}
