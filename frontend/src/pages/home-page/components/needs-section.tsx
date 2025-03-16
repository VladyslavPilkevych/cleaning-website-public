import React from "react";
import Flex from "../../../components/flex";
import ImageComponent from "../../../components/image";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
  TextAlign,
} from "../../../components/flex/flex.constants";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import { FontWeight } from "../../../utils/theme/fonts";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export default function NeedsSection() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Flex
      alignItems={AlignItems.CENTER}
      justifyContent={JustifyContent.CENTER}
      backgroundColor={ThemeColors.Primary}
      flexDirection={FlexDirection.COLUMN}
      css={{ padding: isMobile ? "2rem" : "5rem 10rem" }}
      gap="3.5rem"
    >
      <Title
        color={ThemeColors.White}
        fontWeight={FontWeight.Bold}
        size={isMobile ? TitleSize.H3 : TitleSize.H1}
      >
        {t("home.needs.title")}
      </Title>
      <Title color={ThemeColors.White} size={TitleSize.H5}>
        {t("home.needs.description")}
      </Title>
      <Flex
        css={{ padding: "5rem 5rem 0" }}
        width={isMobile ? "100%" : "80vw"}
        justifyContent={JustifyContent.SPACE_AROUND}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
        gap="2rem"
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          gap="2.5rem"
          textAlign={TextAlign.CENTER}
          width={isMobile ? "375px" : "250px"}
        >
          <ImageComponent src="./images/reason1.png" />
          <Title
            color={ThemeColors.White}
            size={TitleSize.H3}
            fontWeight={FontWeight.Bold}
          >
            {t("home.needs.reasons.1")}
          </Title>
          <Title color={ThemeColors.White} size={TitleSize.H5}>
            {t("home.needs.reasons.1-text")}
          </Title>
        </Flex>
        <Flex
          flexDirection={FlexDirection.COLUMN}
          gap="2.5rem"
          textAlign={TextAlign.CENTER}
          width="250px"
        >
          <ImageComponent src="./images/reason2.png" />
          <Title
            color={ThemeColors.White}
            size={TitleSize.H3}
            fontWeight={FontWeight.Bold}
          >
            {t("home.needs.reasons.2")}
          </Title>
          <Title color={ThemeColors.White} size={TitleSize.H5}>
            {t("home.needs.reasons.2-text")}
          </Title>
        </Flex>
        <Flex
          flexDirection={FlexDirection.COLUMN}
          gap="2.5rem"
          textAlign={TextAlign.CENTER}
          width="250px"
        >
          <ImageComponent src="./images/reason3.png" />
          <Title
            color={ThemeColors.White}
            size={TitleSize.H3}
            fontWeight={FontWeight.Bold}
          >
            {t("home.needs.reasons.3")}
          </Title>
          <Title color={ThemeColors.White} size={TitleSize.H5}>
            {t("home.needs.reasons.3-text")}
          </Title>
        </Flex>
      </Flex>
    </Flex>
  );
}
