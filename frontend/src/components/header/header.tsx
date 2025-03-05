import React from "react";
import { NavLink } from "react-router-dom";
import Flex from "../flex";
import { JustifyContent } from "../flex/flex.constants";
import Title from "../title";
import { TitleSize } from "../title/title.constants";

export default function Header() {
  return (
    <Flex justifyContent={JustifyContent.SPACE_BETWEEN} css={{ padding: "3rem" }}>
      <NavLink to="/">logo</NavLink>
      <Flex gap="3rem">
        <NavLink to="/" end>
          <Title size={TitleSize.H6}>Home</Title>
        </NavLink>
        <NavLink to="/contacts">
        <Title size={TitleSize.H6}>Home</Title>
        </NavLink>
        <NavLink to="/about">
        <Title size={TitleSize.H6}>About</Title>
        </NavLink>
        <NavLink to="/pricing">
        <Title size={TitleSize.H6}>Pricing</Title>
        </NavLink>
      </Flex>
    </Flex>
  );
}
