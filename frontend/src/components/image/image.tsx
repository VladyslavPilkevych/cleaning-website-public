import React from "react";

type ImageProps = {
  alt?: string;
  src: string;
  css?: React.CSSProperties;
  width?: string;
  height?: string;
  asBackground?: boolean;
  children?: React.ReactNode;
  fixedBg?: boolean;
};

export default function ImageComponent(props: ImageProps) {
  if (props?.asBackground) {
    return <ImageBackground {...props} />;
  }

  return <Image {...props} />;
}

function Image({ alt, src, css, width, height }: ImageProps) {
  return (
    <img alt={alt ?? "image"} src={`${process.env.PUBLIC_URL}${src}`} style={{ width, height, ...css }} />
  );
}

function ImageBackground({ src, css, width, height, children, fixedBg }: ImageProps) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}${src})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: fixedBg ? "fixed" : "scroll",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width,
        height,
        ...css,
      }}
    >
      {children}
    </div>
  );
}
