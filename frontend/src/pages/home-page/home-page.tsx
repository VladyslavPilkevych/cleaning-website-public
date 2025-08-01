import React from "react";
import Flex from "../../components/flex";
import ImageComponent from "../../components/image";
import Box from "../../components/box";
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "../../components/flex/flex.constants";
import Title from "../../components/title";
import { TitleSize } from "../../components/title/title.constants";
import ThemeColors from "../../utils/theme/colors";
import { FontWeight } from "../../utils/theme/fonts";
import { useTranslation } from "react-i18next";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../utils/routes/routes.constants";
import { ServiceGallery } from "./components/service-gallery";
import NeedsSection from "./components/needs-section";
import PricesVary from "../../components/prices-vary";
import Form from "../../components/contact-form";
import { useMediaQuery } from "react-responsive";

export default function HomePage() {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Box>
      <ImageComponent
        asBackground
        src="/images/home.png"
        height="600px"
        fixedBg
      >
        <Flex
          flexDirection={FlexDirection.COLUMN}
          height="100%"
          justifyContent={JustifyContent.CENTER}
          gap="2.5rem"
        >
          <Title
            size={isMobile ? TitleSize.H4 : TitleSize.H2}
            color={ThemeColors.White}
            fontWeight={FontWeight.Bold}
          >
            {t("home.slogan")}
          </Title>
          <Button
            css={{
              borderRadius: "3rem",
              fontSize: "1.2rem",
              padding: "1rem 1.5rem",
            }}
            onClick={() => navigate(RouteNames.PRICING)}
          >
            {t("home.btn-check-prices")}
          </Button>
        </Flex>
      </ImageComponent>
      <Flex
        height="200px"
        alignItems={AlignItems.CENTER}
        justifyContent={JustifyContent.CENTER}
        backgroundColor={ThemeColors.Primary}
      >
        <Title
          color={ThemeColors.White}
          fontWeight={FontWeight.Bold}
          size={isMobile ? TitleSize.H4 : TitleSize.H2}
        >
          {t("home.services.title")}
        </Title>
      </Flex>

      <ServiceGallery />

      <Flex
        alignItems={AlignItems.CENTER}
        justifyContent={JustifyContent.CENTER}
        backgroundColor={ThemeColors.Primary}
        flexDirection={FlexDirection.COLUMN}
        css={{
          padding: isMobile ? "2rem 5%" : "2rem 15%",
        }}
        gap="2rem"
      >
        <Title
          color={ThemeColors.White}
          size={isMobile ? TitleSize.H6 : TitleSize.H5}
        >
          {t("home.text-info-1")}
        </Title>
        <Title
          color={ThemeColors.White}
          size={isMobile ? TitleSize.H6 : TitleSize.H5}
        >
          {t("home.text-info-2")}
        </Title>
      </Flex>

      <NeedsSection />

      <PricesVary />

      <ImageComponent
        asBackground
        fixedBg
        src="/images/contact-image.png"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? "2rem" : "7rem",
        }}
      >
        <Box
          css={{
            maxWidth: "600px",
            padding: "2.5rem",
            borderRadius: "10px",
            backdropFilter: "blur(10px)",
            background: "rgba(0, 0, 0, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Form />
        </Box>
      </ImageComponent>
    </Box>
  );
}
