import React from "react";
import Box from "../../components/box";
import ImageComponent from "../../components/image";
import Title from "../../components/title";
import { TitleSize } from "../../components/title/title.constants";
import Flex from "../../components/flex";
import ThemeColors from "../../utils/theme/colors";
import { AlignItems, FlexDirection } from "../../components/flex/flex.constants";
import { useTranslation } from "react-i18next";
import IconTitle from "../../components/icon-title";
import { useMediaQuery } from "react-responsive";

export default function AboutPage() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Box>
      <ImageComponent
        src="./images/about.png"
        asBackground
        fixedBg
        height="400px"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Title size={TitleSize.H1} color={ThemeColors.White}>
          {t("about.title")}
        </Title>
      </ImageComponent>
      <Box width="85%" css={{ padding: "2rem 1rem", margin: "0 auto" }}>
        <Title size={TitleSize.H5}>{t("about.text")}</Title>
        <Flex css={{ paddingTop: "2rem" }} gap="1rem" alignItems={AlignItems.START} flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}>
          <Box width="70%">
            <Title size={TitleSize.H3}>{t("about.title-section")}</Title>
            <Flex flexDirection={FlexDirection.COLUMN} gap="1rem" css={{marginTop: "1rem"}} alignItems={AlignItems.START}>
              {["0", "1", "2", "3", "4", "5", "6"].map((itemNumber) => (
                <IconTitle size={TitleSize.H6} iconSrc="./icons/check.png">
                  {t(`about.spaces-list.${itemNumber}`)}
                </IconTitle>
              ))}
            </Flex>
          </Box>
          <ImageComponent src="./images/about-img.png" />
        </Flex>
      </Box>
    </Box>
  );
}
