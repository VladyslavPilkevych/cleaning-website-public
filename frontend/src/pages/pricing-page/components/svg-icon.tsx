import React, { useEffect, useState } from "react";

type SvgIconProps = {
  src: string;
  css?: React.CSSProperties;
};

export default function SvgIcon({ src, css }: SvgIconProps) {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error("Failed to fetch SVG:", error);
      }
    };

    fetchSvg();
  }, [src]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ width: "70px", height: "70px", ...css }}
    />
  );
}
