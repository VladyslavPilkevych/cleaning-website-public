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

export default function HomePage() {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();

  return (
    <Box>
      <ImageComponent
        asBackground
        src="./images/home.png"
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
            size={TitleSize.H2}
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
          size={TitleSize.H2}
        >
          {t("home.services.title")}
        </Title>
      </Flex>

      <ServiceGallery />

      <NeedsSection />

      <PricesVary />

      <ImageComponent
        asBackground
        fixedBg
        src="./images/contact-image.png"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7rem",
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

      {/* <Box width="100%" height="50px" /> */}
    </Box>
  );
}
