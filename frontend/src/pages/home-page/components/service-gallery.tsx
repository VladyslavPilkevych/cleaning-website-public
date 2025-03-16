import React from "react";
import Flex from "../../../components/flex";
import ImageComponent from "../../../components/image";
import {
  FlexDirection,
  JustifyContent,
} from "../../../components/flex/flex.constants";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import { FontWeight } from "../../../utils/theme/fonts";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export function ServiceGallery() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <ImageComponent
        asBackground
        src="./images/resident-cleaning.png"
        height="300px"
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          height="100%"
          justifyContent={JustifyContent.CENTER}
          gap="2.5rem"
        >
          <Title
            size={isMobile ? TitleSize.H5 : TitleSize.H3}
            color={ThemeColors.White}
            fontWeight={FontWeight.Bold}
          >
            {t("home.services.resident-cleaning")}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {t("home.services.resident-text")}
          </Title>
        </Flex>
      </ImageComponent>
      <ImageComponent
        asBackground
        src="./images/office-cleaning.png"
        height="300px"
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          height="100%"
          justifyContent={JustifyContent.CENTER}
          gap="2.5rem"
        >
          <Title
            size={isMobile ? TitleSize.H5 : TitleSize.H3}
            color={ThemeColors.White}
            fontWeight={FontWeight.Bold}
          >
            {t("home.services.office-cleaning")}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {t("home.services.office-text")}
          </Title>
        </Flex>
      </ImageComponent>
      <ImageComponent
        asBackground
        src="./images/parties-cleaning.png"
        height="300px"
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          height="100%"
          justifyContent={JustifyContent.CENTER}
          gap="2.5rem"
        >
          <Title
            size={isMobile ? TitleSize.H5 : TitleSize.H3}
            color={ThemeColors.White}
            fontWeight={FontWeight.Bold}
          >
            {t("home.services.parties-cleaning")}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {t("home.services.parties-text")}
          </Title>
        </Flex>
      </ImageComponent>
      <ImageComponent
        asBackground
        src="./images/airbnb-cleaning.png"
        height="300px"
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          height="100%"
          justifyContent={JustifyContent.CENTER}
          gap="2.5rem"
        >
          <Title
            size={isMobile ? TitleSize.H5 : TitleSize.H3}
            color={ThemeColors.White}
            fontWeight={FontWeight.Bold}
          >
            {t("home.services.airbnb-cleaning")}
          </Title>
          <Title size={TitleSize.H6} color={ThemeColors.White}>
            {t("home.services.airbnb-text")}
          </Title>
        </Flex>
      </ImageComponent>
    </>
  );
}
