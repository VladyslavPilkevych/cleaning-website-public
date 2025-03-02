import React from "react";

type ImageProps = {
  alt?: string;
  src: string;
  css?: React.CSSProperties;
  width?: string;
  height?: string;
  asBackground?: boolean;
  children?: React.ReactNode;
};

export default function ImageComponent(props: ImageProps) {
  if (props?.asBackground) {
    return <ImageBackground {...props} />;
  }

  return <Image {...props} />;
}

function Image({ alt, src, css, width, height }: ImageProps) {
  return (
    <img alt={alt ?? "image"} src={src} style={{ width, height, ...css }} />
  );
}

function ImageBackground({ src, css, width, height, children }: ImageProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height,
        ...css,
      }}
    >
      {children}
    </div>
  );
}
