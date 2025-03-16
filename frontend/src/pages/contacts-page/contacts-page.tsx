import React from "react";
import Flex from "../../components/flex";
import Icon from "../../components/icon";
import Title from "../../components/title";
import {
  AlignContent,
  AlignItems,
  FlexDirection,
  JustifyContent,
} from "../../components/flex/flex.constants";
import { TitleSize } from "../../components/title/title.constants";
import ThemeColors from "../../utils/theme/colors";
import Form from "../../components/contact-form";
import Box from "../../components/box";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

export default function ContactsPage() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <Box
        width="100%"
        height="100px"
        css={{ backgroundColor: ThemeColors.Dark }}
      />
      {!isMobile && <Flex>
        <Box css={{backgroundColor: ThemeColors.Primary, padding: "1rem"}}>
          <Title size={isMobile ? TitleSize.H4 : TitleSize.H2} color={ThemeColors.White}>
            {t("contact.title1")}
          </Title>
        </Box>
        <Box css={{ backgroundColor: ThemeColors.Background, padding: "1rem" }}>
          <Title size={isMobile ? TitleSize.H4 : TitleSize.H2} color={ThemeColors.Secondary}>
            {t("contact.title2")}
          </Title>
        </Box>
      </Flex>}
      <Flex width="100%" backgroundColor={ThemeColors.Primary} flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}>
        <Flex
          gap="2rem"
          width={isMobile ? "95%" : "50%"}
          flexDirection={FlexDirection.COLUMN}
          justifyContent={JustifyContent.START}
          alignContent={AlignContent.START}
          alignItems={AlignItems.START}
          height="100%"
          css={{ padding: "3rem" }}
        >
          <Flex gap="2rem">
            <Icon src="./icons/phone.png" />
            <Flex flexDirection={FlexDirection.COLUMN} alignItems={AlignItems.START}>
              <Title size={TitleSize.H5} color={ThemeColors.White}>
                +1(123) 456-789 (English, Slovak)
              </Title>
              <Title size={TitleSize.H5} color={ThemeColors.White}>
                +1(123) 456-789 (Ukrainian, Russian)
              </Title>
            </Flex>
          </Flex>
          <Flex gap="2rem">
            <Icon src="./icons/mail.png" />
            <Title size={TitleSize.H5} color={ThemeColors.White}>
              lexishine@gmail.com
            </Title>
          </Flex>
          <Flex gap="2rem">
            <Icon src="./icons/map-pin.png" />
            <Title size={TitleSize.H5} color={ThemeColors.White}>
              Bratislava, Stare Mesto XXXXXX
            </Title>
          </Flex>
        </Flex>
        <Flex
          backgroundColor={ThemeColors.Background}
          width={isMobile ? "95%" : "50%"}
          alignContent={AlignContent.CENTER}
          justifyContent={JustifyContent.CENTER}
          css={{ padding: "1rem 3rem 3rem" }}
          flexDirection={FlexDirection.COLUMN}
          gap="2rem"
        >
          <Form labelColor={ThemeColors.Secondary} />
        </Flex>
      </Flex>
      <Box
        width="100%"
        height="100px"
        css={{ backgroundColor: ThemeColors.Dark }}
      />
    </>
  );
}
