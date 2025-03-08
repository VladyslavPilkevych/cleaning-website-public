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

export default function ContactsPage() {
  return (
    <>
      <Box
        width="100%"
        height="100px"
        css={{ backgroundColor: ThemeColors.Dark }}
      />
      <Flex width="100%" backgroundColor={ThemeColors.Primary}>
        <Flex
          gap="2rem"
          width="50%"
          flexDirection={FlexDirection.COLUMN}
          justifyContent={JustifyContent.START}
          alignContent={AlignContent.START}
          alignItems={AlignItems.START}
          height="100%"
          css={{ padding: "3rem" }}
        >
          <Flex gap="2rem">
            <Icon src="./icons/phone.png" />
            <Flex flexDirection={FlexDirection.COLUMN}>
              <Title size={TitleSize.H5} color={ThemeColors.White}>
                +1(123) 456-789
              </Title>
              <Title size={TitleSize.H5} color={ThemeColors.White}>
                +1(123) 456-789
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
          backgroundColor={ThemeColors.Secondary}
          width="50%"
          alignContent={AlignContent.CENTER}
          justifyContent={JustifyContent.CENTER}
          css={{ padding: "3rem" }}
        >
          <Form />
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
