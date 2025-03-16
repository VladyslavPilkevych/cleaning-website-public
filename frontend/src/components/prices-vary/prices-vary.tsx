import React from "react";
import { useTranslation } from "react-i18next";
import Flex from "../flex";
import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  TextAlign,
} from "../flex/flex.constants";
import ThemeColors from "../../utils/theme/colors";
import Title from "../title";
import { FontWeight } from "../../utils/theme/fonts";
import { TitleSize } from "../title/title.constants";
import ImageComponent from "../image";
import { useMediaQuery } from "react-responsive";

type PricesVaryProps = {
  showTitle?: boolean;
};

export default function PricesVary({ showTitle = true }: PricesVaryProps) {
  const { t } = useTranslation("translation");
  const isTablet = useMediaQuery({ query: "(max-width: 1324px)" });
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
      {showTitle && (
        <Title
          color={ThemeColors.White}
          fontWeight={FontWeight.Bold}
          size={isMobile ? TitleSize.H3 : TitleSize.H1}
        >
          {t("prices-vary.title")}
        </Title>
      )}
      <Title color={ThemeColors.White} size={TitleSize.H5}>
        {t("prices-vary.description")}
      </Title>
      <Flex
        gap={isTablet ? "2rem" : "7rem"}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
        flexWrap={isTablet ? FlexWrap.WRAP : FlexWrap.NOWRAP}
        justifyContent={JustifyContent.CENTER}
      >
        {[1, 2, 3, 4].map((number) => (
          <Flex
            textAlign={TextAlign.CENTER}
            gap="2rem"
            flexDirection={FlexDirection.COLUMN}
            width={isMobile ? "375px" : "250px"}
            key={number}
          >
            <ImageComponent src={`./images/${number}.png`} />
            <Title
              color={ThemeColors.White}
              size={TitleSize.H3}
              css={{ marginTop: "-6rem" }}
              fontWeight={FontWeight.Bold}
            >
              {t(`prices-vary.varies.${number}`)}
            </Title>
            <Title color={ThemeColors.White} size={TitleSize.H6}>
              {t(`prices-vary.varies.${number}-text`)}
            </Title>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
