import React from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../components/title";
import { TitleSize } from "../../../components/title/title.constants";
import ThemeColors from "../../../utils/theme/colors";
import Box from "../../../components/box";
import Button from "../../../components/button";
import Flex from "../../../components/flex";
import { JustifyContent } from "../../../components/flex/flex.constants";
import { useMediaQuery } from "react-responsive";

export default function PaymentBtn() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Flex justifyContent={JustifyContent.CENTER} css={{ margin: "2rem 0 4rem" }}>
      <Button
        css={{
          backgroundColor: ThemeColors.Primary,
          padding: "3rem",
          borderRadius: isMobile ? "20px" : "50px",
        }}
        onClick={() => {}} // TODO
      >
        <Box css={{ display: "flex", gap: "3rem", alignItems: "center" }}>
          <Title color={ThemeColors.White}>{t("pricing.total")}</Title>
          <Title color={ThemeColors.White}>117.50 EUR</Title>
          <Title
            size={TitleSize.H4}
            color={ThemeColors.White}
            css={{ textDecoration: "line-through", opacity: 0.5 }}
          >
            180.00 EUR
          </Title>
        </Box>
      </Button>
    </Flex>
  );
}
