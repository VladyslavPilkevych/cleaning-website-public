import React, { useState } from "react";
import DateCalendarValue from "./components/calendar";
import TimePicker from "./components/time-picker";
import Flex from "../../components/flex";
import {
  FlexDirection,
  JustifyContent,
} from "../../components/flex/flex.constants";
import Box from "../../components/box";
import CardContainer from "./components/card-container";
import Checkbox from "./components/checkbox";
import SvgIcon from "./components/svg-icon";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../utils/theme/colors";
import AddressForm from "./components/address-form";
import ContactForm from "./components/contact-form";
import PaymentMethod from "./components/payment-method";
import PaymentBtn from "./components/payment-btn";
import Title from "../../components/title";
import { TitleSize } from "../../components/title/title.constants";
import { FontWeight } from "../../utils/theme/fonts";
import ImageComponent from "../../components/image";
import PricesVary from "../../components/prices-vary";
import { chemicalCleaningCards, serviceCards } from "./helpers/constants";
import Separator from "../../components/separator";
import Chemics from "./components/chemics";
import { useMediaQuery } from "react-responsive";
import Property from "./components/property";
import Windows from "./components/windows";
import { PricingPageFormData, PricingPageFormDataErrors, ServicesFormData } from "./helpers/types";
import { defaultPricingPageFormData } from "./helpers/utils";
import { Dayjs } from "dayjs";

type HandleChangeValueType =
  | string
  | boolean
  | number
  | Dayjs
  | ServicesFormData[]
  | null;

export type ChangeFormDataType = (
  name: string,
  value: HandleChangeValueType
) => void;

export default function PricingPage() {
  const { t } = useTranslation("translation");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [formData, setFormData] = useState<PricingPageFormData>(
    defaultPricingPageFormData
  );

  const [formErrors, setFormErrors] = useState<PricingPageFormDataErrors>({});

  // const [formErrors, setFormErrors] = useState<FormErrors>({});

  // event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // const handleChangeFormData = (
  //   name: string,
  //   value: string | boolean | number | Dayjs | null
  // ) => {
  //   // setFormData((prev) => ({ ...prev, [name]: value }));
  //   setFormData((prev) => {
  //     const keys = name.split(".");
  //     const updatedFormData = { ...prev };

  //     let current = updatedFormData;
  //     for (let i = 0; i < keys.length - 1; i++) {
  //       const key = keys[i];

  //       if (!current[key]) {
  //         current[key] = {};
  //       }

  //       current = current[key];
  //     }

  //     current[keys[keys.length - 1]] = value;

  //     return updatedFormData;
  //   });
  // };

  const restartForm = () => {
    setFormData(defaultPricingPageFormData);
  };

  const handleChangeFormData = (name: string, value: HandleChangeValueType) => {
    const errorName = name.replace(/\.([a-z])/g, (_, letter) => letter.toUpperCase());
    setFormErrors((prev) => ({ ...prev, [errorName]: undefined }));

    setFormData((prev) => {
      const keys = name.split(".");
      const updatedFormData = { ...prev };

      let current: any = updatedFormData; // todo any
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (!current[key]) {
          current[key] = {};
        }

        current = current[key];
      }

      current[keys[keys.length - 1]] = value;

      return updatedFormData;
    });
  };

  return (
    <Box>
      <ImageComponent
        height="500px"
        asBackground
        src="/images/pricing-header.png"
      />

      <Flex
        justifyContent={JustifyContent.SPACE_EVENLY}
        css={{ margin: "4rem auto 0" }}
        flexDirection={isMobile ? FlexDirection.COLUMN : FlexDirection.ROW}
        gap="2rem"
      >
        <DateCalendarValue
          formData={formData}
          formErrors={formErrors}
          handleChangeFormData={handleChangeFormData}
        />
        <TimePicker
          formData={formData}
          handleChangeFormData={handleChangeFormData}
          formErrors={formErrors}
        />
      </Flex>

      <Property
        formErrors={formErrors}
        formData={formData}
        handleChangeFormData={handleChangeFormData}
      />

      <Separator />

      <Windows
        formData={formData}
        handleChangeFormData={handleChangeFormData}
      />

      <Separator />

      <Flex>
        <Title
          size={isMobile ? TitleSize.H4 : TitleSize.H2}
          fontWeight={FontWeight.Bold}
          css={{ margin: "4rem auto 0" }}
        >
          {t("pricing.services.title")}
        </Title>
      </Flex>
      <CardContainer
        formData={formData}
        handleChangeFormData={handleChangeFormData}
        cards={serviceCards}
        translationPath="pricing.services.cards"
      />

      <Checkbox
        text={t("pricing.vacuum-cleaner")}
        price="14.99 EUR"
        icon={<SvgIcon src="/icons/vacuum.svg" />}
        formData={formData.vacuum}
        handleChangeFormData={handleChangeFormData}
        name="vacuum"
      />

      <Chemics
        formData={formData}
        handleChangeFormData={handleChangeFormData}
      />

      <Separator />

      <Checkbox
        text={t("pricing.chemical-cleaning")}
        css={{ marginTop: "2rem" }}
      >
        <CardContainer
          formData={formData}
          handleChangeFormData={handleChangeFormData}
          cards={chemicalCleaningCards}
          translationPath="pricing.services.cleaning-cards"
        />
      </Checkbox>

      <Separator />

      <AddressForm
        formData={formData}
        formErrors={formErrors}
        handleChangeFormData={handleChangeFormData}
      />

      <ContactForm
        formData={formData}
        formErrors={formErrors}
        handleChangeFormData={handleChangeFormData}
      />

      <PaymentMethod
        formData={formData}
        formErrors={formErrors}
        handleChangeFormData={handleChangeFormData}
      />

      <Flex
        justifyContent={JustifyContent.CENTER}
        css={{ margin: "4rem 1rem 0" }}
      >
        <Title size={TitleSize.H5}>{t("pricing.prepayment-alert")}</Title>
      </Flex>
      <PaymentBtn formData={formData} restartForm={restartForm} setFormErrors={setFormErrors} />

      <Separator />

      <ImageComponent
        height={isMobile ? "300px" : "500px"}
        asBackground
        src="/images/pricing-vary.png"
        css={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL}/images/pricing-vary.png)`,
        }}
      >
        <Title
          size={isMobile ? TitleSize.H3 : TitleSize.H1}
          fontWeight={FontWeight.Bold}
          color={ThemeColors.White}
        >
          {t("prices-vary.title")}
        </Title>
      </ImageComponent>

      <PricesVary showTitle={false} />
    </Box>
  );
}
