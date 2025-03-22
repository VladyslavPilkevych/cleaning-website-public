import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Logo() {
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  return (
    <img alt={"logo"} src={`${process.env.PUBLIC_URL}/images/logo.png`} style={{width: isMobile ? "5rem" : "7rem", height: isMobile ? "5rem" : "7rem"}} />
  );
}

