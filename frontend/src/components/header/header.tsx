import React from "react";
import { NavLink } from "react-router-dom";
import Flex from "../flex";
import { FlexDirection, JustifyContent } from "../flex/flex.constants";
import Title from "../title";
import { TitleSize } from "../title/title.constants";
import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../language-switcher";
import { RouteNames } from "../../utils/routes/routes.constants";
import { useMediaQuery } from "react-responsive";
import Logo from "../logo";

export const CustomNavLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: ${ThemeColors.Primary};

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${ThemeColors.Primary};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    cursor: default;
    font-weight: bold;
    color: ${ThemeColors.Secondary};
    &::after {
      background-color: ${ThemeColors.Secondary};
      width: 0% !important;
    }
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Header() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 820px)" });

  return (
    <Flex
      justifyContent={JustifyContent.SPACE_BETWEEN}
      css={{ padding: "1rem 3rem" }}
    >
      {isMobile ? (
        <>
          <Flex flexDirection={FlexDirection.COLUMN}>
            <NavLink to={RouteNames.HOME}>
              <Logo />
            </NavLink>
            <LanguageSwitcher />
          </Flex>
          <MobileMenu>
            <CustomNavLink to={RouteNames.HOME} end>
              <Title size={TitleSize.H4}>{t("header.home")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.CONTACTS}>
              <Title size={TitleSize.H4}>{t("header.contacts")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.ABOUT}>
              <Title size={TitleSize.H4}>{t("header.about")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.PRICING}>
              <Title size={TitleSize.H4}>{t("header.pricing")}</Title>
            </CustomNavLink>
          </MobileMenu>
        </>
      ) : (
        <>
          <NavLink to={RouteNames.HOME}>
            <Logo />
          </NavLink>
          <Flex gap="4rem">
            <CustomNavLink to={RouteNames.HOME} end>
              <Title size={TitleSize.H4}>{t("header.home")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.CONTACTS}>
              <Title size={TitleSize.H4}>{t("header.contacts")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.ABOUT}>
              <Title size={TitleSize.H4}>{t("header.about")}</Title>
            </CustomNavLink>
            <CustomNavLink to={RouteNames.PRICING}>
              <Title size={TitleSize.H4}>{t("header.pricing")}</Title>
            </CustomNavLink>
            <LanguageSwitcher />
          </Flex>
        </>
      )}
    </Flex>
  );
}
