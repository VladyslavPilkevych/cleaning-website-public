import React, { useState } from "react";
import DateCalendarValue from "./components/contact-info/calendar";
import TimePicker from "./components/contact-info/time-picker";
import Flex from "../../components/flex";
import {
  FlexDirection,
  JustifyContent,
} from "../../components/flex/flex.constants";
import Box from "../../components/box";
import CardContainer from "./components/common/card-container";
import Checkbox from "./components/common/checkbox";
import SvgIcon from "./components/common/svg-icon";
import { useTranslation } from "react-i18next";
import ThemeColors from "../../utils/theme/colors";
import AddressForm from "./components/contact-info/address-form";
import ContactForm from "./components/contact-info/contact-form";
import PaymentMethod from "./components/payment/payment-method";
import Title from "../../components/title";
import { TitleSize } from "../../components/title/title.constants";
import { FontWeight } from "../../utils/theme/fonts";
import ImageComponent from "../../components/image";
import PricesVary from "../../components/prices-vary";
import { chemicalCleaningCards, serviceCards } from "./helpers/constants";
import Separator from "../../components/separator";
import Chemics from "./components/additional-services/chemics";
import { useMediaQuery } from "react-responsive";
import Property from "./components/contact-info/property";
import Windows from "./components/additional-services/windows";
import {
  PricingPageFormData,
  PricingPageFormDataErrors,
  ServicesFormData,
} from "./helpers/types";
import { getDefaultPricingPageFormData } from "./helpers/utils";
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

  const [priceDeliveryExtra, setPriceDeliveryExtra] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState<PricingPageFormData>(() =>
    getDefaultPricingPageFormData()
  );
  const [formDataResetKey, setFormDataResetKey] = useState(0);

  const [formErrors, setFormErrors] = useState<PricingPageFormDataErrors>({});

  const restartForm = () => {
    setFormData(getDefaultPricingPageFormData());
    setFormErrors({});
    setFormDataResetKey((prev) => prev + 1);
    setPriceDeliveryExtra(null);
  };

  const handleChangeFormData = (name: string, value: HandleChangeValueType) => {
    const errorName = name.replace(/\.([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    setFormErrors((prev) => ({ ...prev, [errorName]: undefined }));

    setFormData((prev) => {
      const keys = name.split(".");
      const updatedFormData = { ...prev };

      let current = updatedFormData;
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
          translationPath="pricing.services.cards"
        />
      </Checkbox>

      <Separator />

      <AddressForm
        formData={formData}
        formErrors={formErrors}
        handleChangeFormData={handleChangeFormData}
        priceDeliveryExtra={priceDeliveryExtra}
        setPriceDeliveryExtra={setPriceDeliveryExtra}
        formDataResetKey={formDataResetKey}
        setFormErrors={setFormErrors}
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
        restartForm={restartForm}
        setFormErrors={setFormErrors}
        priceDeliveryExtra={priceDeliveryExtra}
      />

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
