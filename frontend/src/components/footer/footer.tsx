import React from "react";
import { NavLink } from "react-router-dom";
import Flex from "../flex";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "../flex/flex.constants";
import Title from "../title";
import { TitleSize } from "../title/title.constants";
import styled from "styled-components";
import ThemeColors from "../../utils/theme/colors";
import { useTranslation } from "react-i18next";
import { RouteNames } from "../../utils/routes/routes.constants";

export const CustomNavLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: ${ThemeColors.White};

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${ThemeColors.White};
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    cursor: default;
    font-weight: bold;
    color: ${ThemeColors.White};
    &::after {
      background-color: ${ThemeColors.White};
      width: 0% !important;
    }
  }
`;

export default function Footer() {
  const { t } = useTranslation("translation");
  return (
    <Flex
      flexDirection={FlexDirection.COLUMN}
      gap="3rem"
      backgroundColor={ThemeColors.Secondary}
      css={{ padding: "2rem" }}
    >
      <Flex
        justifyContent={JustifyContent.SPACE_AROUND}
        width="100%"
      >
        <Flex
          gap="1rem"
          flexDirection={FlexDirection.COLUMN}
          alignItems={AlignItems.START}
        >
          <Title size={TitleSize.H4} color={ThemeColors.White}>
            {t("footer.links")}
          </Title>
          <CustomNavLink to={RouteNames.HOME} end>
            <Title size={TitleSize.H6} color={ThemeColors.White}>
              {t("header.home")}
            </Title>
          </CustomNavLink>
          <CustomNavLink to={RouteNames.CONTACTS}>
            <Title size={TitleSize.H6} color={ThemeColors.White}>
              {t("header.contacts")}
            </Title>
          </CustomNavLink>
          <CustomNavLink to={RouteNames.ABOUT}>
            <Title size={TitleSize.H6} color={ThemeColors.White}>
              {t("header.about")}
            </Title>
          </CustomNavLink>
          <CustomNavLink to={RouteNames.PRICING}>
            <Title size={TitleSize.H6} color={ThemeColors.White}>
              {t("header.pricing")}
            </Title>
          </CustomNavLink>
        </Flex>
        {/* <Flex flexDirection={FlexDirection.COLUMN} >
        <Title size={TitleSize.H4} color={ThemeColors.White}>{t('footer.social-media')}</Title>
      </Flex> */}
        <Flex
          gap="1rem"
          flexDirection={FlexDirection.COLUMN}
          alignItems={AlignItems.END}
        >
          <Title size={TitleSize.H4} color={ThemeColors.White}>
            {t("footer.contact-info")}
          </Title>

          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {"+1(123) 456-789"}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {"+1(123) 456-789"}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {"lexishine@gmail.com"}
          </Title>
        </Flex>
      </Flex>
      <Title size={TitleSize.H6} color={ThemeColors.White}>
        {t("footer.license")}
      </Title>
    </Flex>
  );
}
